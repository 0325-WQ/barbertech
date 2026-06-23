# BarberTech - Sistema Web Desplegado en la Nube ☁️

Este repositorio contiene el código fuente y la configuración de arquitectura para **BarberTech**, una plataforma de suministros de barbería premium diseñada bajo un enfoque desacoplado y desplegada en la infraestructura cloud de Amazon Web Services (AWS).

## 📁 Estructura del Repositorio
La organización jerárquica del proyecto está dividida de la siguiente manera:

```text
cloudproject/
├── frontend/             # Código fuente de las interfaces de usuario web (vistas)
│   └── index.html        # Portal interactivo con menú, catálogo dinámico y formulario
├── backend/              # Lógica de la API REST y sentencias parametrizadas
│   ├── config/           # Parámetros y strings de conexión cifrada a AWS RDS
│   ├── models/           # Mapeo, relaciones y esquemas de tablas relacionales
│   ├── server.js         # Servidor principal Node.js / Express
│   └── package.json      # Dependencias del sistema (express, mysql2, dotenv, cors)
├── docs/                 # Documentación técnica obligatoria
│   └── documento-tecnico.pdf
├── .gitignore            # Archivos excluidos del control de versiones (node_modules, .env)
└── .env                  # Plantilla estructurada con las variables de entorno de AWS