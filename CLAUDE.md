# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a full-stack application with a React frontend and FastAPI backend:

- `frontend/` - React application with TypeScript, Vite, TailwindCSS, and Radix UI components
- `backend/` - FastAPI application with Python 3.13, using uvicorn server

The backend serves both the API endpoints (under `/api`) and the frontend static files (under `/`).

## Frontend Development Commands

All frontend commands should be run from the `frontend/` directory using `pnpm`:

```bash
cd frontend

# Install dependencies
pnpm i

# Start development server (http://localhost:5173)
pnpm run dev

# Build for production
pnpm run build

# Run linting
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Run tests
pnpm run test

# Type checking
pnpm run compile
```

## Backend Development Commands

All backend commands should be run from the `backend/` directory using `make`:

```bash
cd backend

# Setup virtual environment (one-time setup)
python3 -m venv .venv
direnv allow  # Auto-activate venv when entering backend/

# Install dependencies
make install/dev

# Start development server (http://localhost:8000)
make dev

# Run tests
make test

# Type checking and compilation
make compile

# Linting
make lint

# Fix linting issues
make lint/fix

# Update dependencies
make update
```

## Architecture

### Backend Architecture
- **FastAPI app structure**: Main app mounts API router at `/api` and static files at `/`
- **Error handling**: Custom validation error handlers in `src/errors/`
- **Routers**: API endpoints organized in `src/routers/` (e.g., `bonjour.py`)
- **CORS**: Configured for localhost:5173 frontend development
- **Health check**: Available at `/api/health`

### Frontend Architecture
- **React 19** with TypeScript and SWC compiler
- **Styling**: TailwindCSS v4 with Radix UI components
- **Testing**: Vitest with Testing Library and MSW for API mocking
- **API integration**: Custom hooks in `src/hooks/useApi.ts` for backend communication
- **Components**: UI components in `src/components/ui/`, app components in `src/components/`

## Development Workflow

1. Backend development: Use `make dev` in `backend/` directory
2. Frontend development: Use `pnpm run dev` in `frontend/` directory
3. Both servers run concurrently during development
4. Backend serves frontend static files in production

## Deployment

- Backend deploys automatically on merge to `main` branch
- Add `deploy-preview` tag to PR for preview deployment testing
- Backend includes built frontend static files in `static/` directory