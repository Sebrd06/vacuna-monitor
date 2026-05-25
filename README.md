# Vacuna Monitor

Sistema de monitoreo de vacunas (ESP32 + Firebase + React) que registra temperatura, genera alertas y muestra un panel web para visualización y configuración.

## Estado

- Estado: En desarrollo
- Componentes: `firmware` (ESP32), `frontend` (React + Vite), Firestore (Firebase)

## Estructura del repositorio

- `firmware/` — Código para ESP32 (PlatformIO)
- `frontend/` — Aplicación web React (Vite)
- `docs/` — Documentación y esquema de Firestore

## Requisitos

- Node.js (v16+ recomendado) y npm o yarn
- PlatformIO (para compilar y flashear el ESP32)
- Cuenta de Firebase con Firestore y credenciales

## Configuración rápida

1. Clona el repositorio (si no lo hiciste):

```bash
git clone https://github.com/Sebrd06/vacuna-monitor.git
cd vacuna-monitor
```

2. Copia y configura variables de entorno según `docs` o `frontend` (si aplica).

## Frontend — ejecución local

1. Entra a la carpeta `frontend`:

```bash
cd frontend
```

2. Instala dependencias y arranca el servidor de desarrollo:

```bash
npm install
npm run dev
# o con yarn
yarn
yarn dev
```

3. Abre `http://localhost:5173` (o la URL que muestre Vite).

## Firmware — compilar y flashear

1. Abre la carpeta `firmware` en PlatformIO (o usa la CLI):

```bash
cd firmware
# Compilar
pio run
# Subir al ESP32 (asegúrate de seleccionar el puerto correcto)
pio run --target upload
```

2. Configura las credenciales WiFi y Firebase dentro de los archivos correspondientes en `firmware/src/` antes de compilar.

## Firebase / Firestore

1. Crea un proyecto en Firebase y activa Firestore.
2. Añade las reglas y el esquema según `docs/firestore_schema.md`.
3. Genera las credenciales (API key / config) y pásalas al `frontend` y al `firmware` según se indique en los archivos de configuración.

## Flujo de datos

ESP32 (sensor) → Firebase Client (firmware) → Firestore → Frontend (suscripción a cambios) → UI y alertas

## Contribuir

1. Crea una rama nueva para tu cambio:

```bash
git checkout -b feat/mi-cambio
```

2. Haz commits claros y envía un PR al repositorio principal.

## Autores

- Diego Armando.
- Sebastián (Sebrd06) — compañero / repositorio original
- Andres Beltrán.

## Licencia

Indica aquí la licencia del proyecto (por ejemplo MIT) o consúltalo con los autores.

---

Si quieres, puedo: agregar badges (build, license), traducir el README al inglés o detallar el `docs/firestore_schema.md`.