# 🌉 Siemens Logic Bridge 
### *Industrial Engineering 4.0 Presentation*

---

![Hero Cover](./siemens_logic_bridge_hero_1772215955669.png)

> **"Uniendo la automatización clásica con la ingeniería de software moderna."**

---

## 📽️ Presentación del Proyecto

### 01. El Problema y la Solución
En la industria, la transición de Ladder (KOP) a SCL puede ser lenta y propensa a errores. **Siemens Logic Bridge** actúa como un acelerador digital, permitiendo a los ingenieros concentrarse en la arquitectura mientras el sistema maneja la sintaxis.

| 🗲 Transformación Visual | 🏭 Infraestructura |
| :--- | :--- |
| ![Traductor](./infografica_traductor_scl_1772216833429.png) | ![Arquitectura](./infografica_arquitectura_bridge_1772216847612.png) |
| **Traducción en tiempo real** de lógica KOP a estándar IEC 61131-3. | **Puente Digital** entre TIA Portal y desarrollo Web moderno. |

---

### 02. Capacidades de Ingeniería
El sistema no es solo un traductor, es un entorno completo de preparación de datos para PLC S7-1200 y S7-1500.

![Entorno](./infografica_entorno_ingenieria_1772216864177.png)

---

## 🛠️ Especificaciones Técnicas

```mermaid
graph TD
    A[Lógica KOP / Usuario] -->|Entrada Texto| B(Traductor Inteligente)
    B -->|Generación de Tokens| C{Validador SCL}
    C -->|Éxito| D[Monaco Editor]
    C -->|Error| E[Feedback Visual UI]
    D -->|Persistencia| F[(SQLite DB)]
    F -->|Exportación| G[.SCL External Source]
```

### Stack Tecnológico
- **Frontend**: UX Premium con React y Framer Motion.
- **Backend**: Node.js + Sequelize.
- **Editor**: Kernel de VS Code (Monaco Editor).
- **Estándar**: Totalmente compatible con Siemens TIA Portal.

---

## 📦 Instalación Rápida

1. **Clonar**: `git clone https://github.com/leohidalgovelasquez-max/Proyecto_SCL-IEC61131.git`
2. **Instalar**: `npm install`
3. **Lanzar**: `npm run dev`

---

## 🌐 Demo Online
Explora la presentación interactiva del proyecto en:
👉 **[https://leohidalgovelasquez-max.github.io/Proyecto_SCL-IEC61131/](https://leohidalgovelasquez-max.github.io/Proyecto_SCL-IEC61131/)**

---

© 2026 Desarrollado por **Leo Hidalgo Velasquez**.
