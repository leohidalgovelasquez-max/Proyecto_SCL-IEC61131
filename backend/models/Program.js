const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Program = sequelize.define('Program', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('FB', 'FC', 'DB', 'OB'),
        defaultValue: 'FB'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    tags: {
        type: DataTypes.STRING, // Comma separated tags
        defaultValue: ''
    }
}, {
    timestamps: true
});

module.exports = Program;
