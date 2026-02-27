# Plan de Implementación: Generador y Validador SCL (IEC 61131-3)

Este documento detalla los pasos para construir la plataforma pautada y organizada.

## 1. Arquitectura del Proyecto
- **Frontend**: React.js con Vite (Estética Premium, Industrial/Moderna).
- **Backend**: Node.js con Express.
- **Base de Datos**: SQLite (almacenamiento local de programas y plantillas).
- **Editor**: Monaco Editor (el motor de VS Code) configurado para SCL.

## 2. Fases de Desarrollo

### Fase 1: Estructura de Base y Diseño (Día 1)
- [x] Inicializar repositorio monorepo.
- [x] Configurar Frontend con un sistema de diseño "Industrial Premium".
- [x] Configurar Backend básico y conexión a DB.

### Fase 2: El Editor de SCL (Día 1-2)
- [x] Integrar Monaco Editor.
- [x] Configurar resaltado de sintaxis para SCL (Structured Control Language).
- [x] Implementar guardado automático en DB.

### Fase 3: Generador de Bloques (Día 2-3)
- [x] Crear plantillas para FB (Function Blocks), FC (Functions) y DB (Data Blocks).
- [x] Interfaz para rellenar parámetros y generar código SCL automáticamente.
- [x] Validador sintáctico básico (Frontend validation).

### Fase 4: Gestión y Exportación (Día 3)
- [x] Listado de programas guardados con metadatos.
- [x] Exportación a archivos `.scl` compatibles con TIA Portal.
- [x] Dashboard de estadísticas y estado.

## 3. Estética y UX
- Colores: Azul Siemens, Gris Oscuro, Acentos en Verde "Run" y Naranja "Warning".
- Tipografía: Inter o Roboto para claridad técnica.
- Animaciones: Transiciones suaves entre secciones.

---
*Este plan será actualizado a medida que avancemos.*
