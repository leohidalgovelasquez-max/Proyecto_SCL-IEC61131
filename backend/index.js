const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Program = require('./models/Program');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Synchronize Database
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Failed to sync database:', err);
});

// API Routes
app.get('/api/programs', async (req, res) => {
    try {
        const programs = await Program.findAll({ order: [['updatedAt', 'DESC']] });
        res.json(programs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/programs', async (req, res) => {
    try {
        const program = await Program.create(req.body);
        res.json(program);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/programs/:id', async (req, res) => {
    try {
        const program = await Program.findByPk(req.params.id);
        if (program) res.json(program);
        else res.status(404).json({ error: 'Program not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/programs/:id', async (req, res) => {
    try {
        const program = await Program.findByPk(req.params.id);
        if (program) {
            await program.update(req.body);
            res.json(program);
        } else {
            res.status(404).json({ error: 'Program not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/programs/:id', async (req, res) => {
    try {
        const program = await Program.findByPk(req.params.id);
        if (program) {
            await program.destroy();
            res.json({ message: 'Program deleted' });
        } else {
            res.status(404).json({ error: 'Program not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
