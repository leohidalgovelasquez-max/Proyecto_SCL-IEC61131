# 🌉 Siemens Logic Bridge

![Siemens Logic Bridge Hero](./siemens_logic_bridge_hero_1772215955669.png)

> **Modern SCL Engineering Environment for IEC 61131-3 Standard**

Siemens Logic Bridge is a professional development tool designed to bridge the gap between traditional Ladder Logic (KOP) and Structured Control Language (SCL). Built with an "Industrial Premium" aesthetic, it provides a high-performance environment for PLC programmers to design, translate, and manage logic blocks for TIA Portal.

---

## 🚀 Main Features

### ⚡ Intelligent KOP to SCL Translator
Convert contact logic descriptions into optimized SCL code instantly. The translator handles complex expressions, parentheses, and variable prefixing automatically.
- **Example**: `(Start OR Auto) AND NOT Stop = Motor_Run` ➡️ `#Motor_Run := (#Start OR #Auto) AND NOT #Stop;`

### 💻 Professional SCL Editor (Monaco Backend)
A custom-tailored version of the Monaco Editor (VS Code engine) with dedicated syntax highlighting for Siemens SCL.
- **Auto-completion**: Keywords like `IF`, `CASE`, `FOR`, `WHILE`.
- **Snippet support**: Boilerplate templates for Motors, Scaling, and standard Function Blocks.

### 🏢 Industrial UI/UX
Designed with Siemens Blue and Deep Charcoal aesthetics, providing a dashboard with real-time statistics and block management.

### 📦 Local Library & Exporting
- **SQLite Persistence**: Your programs are saved locally for persistent engineering.
- **TIA Portal Compatibility**: Export your code as `.scl` files ready to be used as external sources in TIA Portal.

---

## 🛠️ Tech Stack

- **Frontend**: [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Database**: [SQLite](https://www.sqlite.org/) via [Sequelize](https://sequelize.org/)
- **Styling**: Vanilla CSS (Tailored Design Tokens)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)

---

## 📦 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/leohidalgovelasquez-max/Proyecto_SCL-IEC61131.git
cd Proyecto_SCL-IEC61131
```

### 2. Install Dependencies
This project uses npm workspaces. Install everything with a single command from the root:
```bash
npm install
```

### 3. Run Development Servers
Start both the Frontend and Backend concurrently:
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

---

## 📂 Project Structure

```text
├── backend/            # Express server & SQLite database
│   ├── models/         # Sequelize schemas
│   └── index.js        # API endpoints
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Logic Translator & SCLEditor
│   │   └── App.tsx     # Main application shell
└── package.json        # Workspace configuration
```

---

## 🌐 GitHub Pages Deployment

The frontend of this project is prepared for deployment on GitHub Pages as a static demo.
1. Build the frontend: `npm run build --workspace=frontend`
2. Follow the instructions in the [Deployment Guide](DEPLOYMENT.md).

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Developed with ❤️ for the Automation Community.
