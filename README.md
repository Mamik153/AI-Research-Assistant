# AI Research Assistant

<div align="center">

An AI-powered research assistant that provides comprehensive research reports with interactive visualizations, built with modern web technologies.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646cff.svg)](https://vitejs.dev/)

[Features](#features) • [Getting Started](#getting-started) • [Architecture](#architecture) • [Contributing](CONTRIBUTING.md) • [License](#license)

</div>

---

## Overview

AI Research Assistant is a modern, feature-rich web application that helps users conduct comprehensive research on any topic. With an intuitive chat-based interface, voice input support, and interactive visualizations, it transforms the research process into an engaging and efficient experience.

This is the **frontend application**. It expects a compatible backend API. The backend is not included in this repository; you must run your own backend that implements the API contract described in [Backend Integration](#backend-integration) and [API_ENDPOINT_CHANGES.md](API_ENDPOINT_CHANGES.md).

## Features

### Core Capabilities

- **Intelligent Research Interface**: Chat-based UI for natural research interactions
- **Voice Input**: Speak your research topics using Web Speech API (Chrome, Edge, Safari)
- **Rich Markdown Reports**: Beautifully formatted research results with syntax highlighting
- **Interactive Visualizations**: 
  - Mind maps with force-directed graphs
  - Flash cards for key concepts
  - Comparison charts and timelines
- **Export Options**: Download research as PDF or text files
- **Real-time Updates**: Live status tracking during research processing
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

### Technical Highlights

- **Modern React Architecture**: Feature-based structure with TypeScript
- **Component Library**: Integration with shadcn/ui and Kibo UI components
- **Smooth Animations**: Powered by Framer Motion
- **Accessible**: ARIA labels, keyboard navigation, semantic HTML
- **Type-Safe**: Full TypeScript coverage for enhanced developer experience

## Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **pnpm** (v8.0.0 or higher) - [Install pnpm](https://pnpm.io/installation)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Mamik153/AI-Research-Assistant.git
cd AI-Research-Assistant
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables (optional):
```bash
cp .env.example .env
# Edit .env if you have specific configuration needs
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

The built files will be in the `dist/` directory.

For production deployment, set `VITE_APP_URL` to your live site origin (e.g. `https://slickresearch.example.com`) so that canonical URLs, Open Graph tags, and `robots.txt`/`sitemap.xml` use the correct base URL for SEO.

### Preview Production Build

```bash
pnpm preview
```

## Architecture

The project follows a **feature-based architecture** with clear separation of concerns:

```
src/
├── core/               # Core configuration and utilities
│   ├── config/        # API and app configuration
│   ├── constants/     # Application constants
│   └── lib/           # Core utility functions
│
├── features/          # Feature modules
│   ├── chat/          # Chat interface components
│   ├── diagrams/      # Diagram visualization
│   ├── export/        # Export functionality (PDF, text)
│   ├── papers/        # Paper cards and grids
│   ├── research/      # Research form and logic
│   └── results/       # Research results display
│
└── shared/            # Shared resources
    ├── components/    # Reusable UI components
    │   ├── ui/       # shadcn/ui components
    │   └── kibo-ui/  # Kibo UI components
    ├── hooks/        # Custom React hooks
    ├── services/     # API and external services
    └── types/        # Shared TypeScript types
```

### Key Design Principles

- **Feature Isolation**: Each feature is self-contained with its own components, hooks, and types
- **Shared Resources**: Common functionality lives in the `shared/` directory
- **Type Safety**: Comprehensive TypeScript types throughout the codebase
- **Composability**: Reusable components and hooks for maintainability

## Technology Stack

### Core
- **React 19** - UI framework with modern hooks
- **TypeScript 5.8** - Type-safe JavaScript
- **Vite 6** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **Kibo UI** - Advanced components (code blocks, tables, trees)
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Data Visualization
- **Recharts** - Chart components
- **Mermaid** - Diagram rendering
- **Three.js** - 3D graphics capabilities

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - Type-aware linting rules

## Project Structure Deep Dive

### Feature Modules

Each feature follows a consistent structure:

```
features/
  feature-name/
    components/     # Feature-specific React components
    hooks/         # Feature-specific custom hooks
    services/      # Feature-specific API/service logic
    types/         # Feature-specific TypeScript types
    utils/         # Feature-specific utility functions
    index.ts       # Public API exports
```

### Example: Research Feature

```
features/research/
  ├── components/
  │   ├── AIInputComponent.tsx      # Voice-enabled input
  │   └── ResearchForm.tsx          # Main research form
  ├── hooks/
  │   ├── useResearch.ts            # Research execution logic
  │   ├── useResearchJob.ts         # Job status management
  │   └── useSearchSuggestions.ts   # Search suggestions
  ├── services/
  │   └── researchApi.ts            # API integration
  ├── types/
  │   └── research.types.ts         # Type definitions
  └── index.ts                      # Public exports
```

## Browser Compatibility

### Fully Supported
- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Feature Notes
- **Voice Input**: Available in Chrome, Edge, and Safari (requires microphone permissions)
- **3D Visualizations**: Requires WebGL support

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code of conduct
- Development workflow
- Pull request process
- Code style guidelines
- Testing requirements

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'feat: add amazing feature'`
4. Push to your fork: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Documentation

- [Component Reference](COMPONENT_REFERENCE.md) - UI component usage guide
- [Project Report](PROJECT_REPORT.md) - Detailed technical documentation
- [shadcn Integration](SHADCN_INTEGRATION_SUMMARY.md) - UI library integration details
- [Contributing Guidelines](CONTRIBUTING.md) - How to contribute
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community guidelines
- [Security Policy](SECURITY.md) - Reporting security issues

## Backend Integration

This frontend is designed to work with a backend API that provides research processing, job status, and result storage. **The backend is not included in this repo.** You need to run (or host) a compatible backend and configure this app to point at it via environment variables.

### Expected API contract

Your backend should expose at least:

```
POST   /api/research              # Submit research topic
GET    /api/research/{job_id}     # Check job status
GET    /api/research/{job_id}/result  # Retrieve results
```

For full request/response shapes, authentication (API key via `X-API-Key` or `Authorization: Bearer`), validation, and security headers, see [API_ENDPOINT_CHANGES.md](API_ENDPOINT_CHANGES.md).

### Self-hosting / Deployment

When deploying your own instance:

1. **Frontend**  
   Set `VITE_APP_URL` to your public site origin (e.g. `https://research.example.com`) so canonical URLs, Open Graph tags, `robots.txt`, and `sitemap.xml` use the correct base URL. Copy [.env.example](.env.example) to `.env` and configure as needed.

2. **BFF / proxy**  
   - **Node (recommended for self-hosted)**: Use [server.js](server.js). Set `PORT`, `API_BASE_URL` (your backend URL), and `API_KEY` in the environment. Run with `pnpm build` then `pnpm start`.  
   - **Vercel**: The [api/proxy.js](api/proxy.js) serverless function proxies `/api` and `/static` to your backend. Set `API_BASE_URL` and `API_KEY` in your Vercel project environment; there is no default production URL in code.

3. **Backend**  
   Run a backend that implements the endpoints described above and in [API_ENDPOINT_CHANGES.md](API_ENDPOINT_CHANGES.md). Configure CORS and security headers for your frontend origin.

You can customize the product name and meta tags in [index.html](index.html) for your own branding.

## Roadmap

- [ ] User authentication and profiles
- [ ] Research history and bookmarks
- [ ] Collaborative research features
- [ ] Advanced citation management
- [ ] Offline support with service workers
- [ ] Multi-language support
- [ ] Mobile app (React Native)

## Performance

The application is optimized for performance:

- **Fast Initial Load**: Optimized bundle size with code splitting
- **Smooth Animations**: 60fps animations with Framer Motion
- **Efficient Polling**: Smart status polling that stops when complete
- **Memory Management**: Proper cleanup of intervals and event listeners

## Security

We take security seriously. If you discover a security vulnerability, please follow our [Security Policy](SECURITY.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

## Support

- **Issues**: [GitHub Issues](https://github.com/Mamik153/AI-Research-Assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Mamik153/AI-Research-Assistant/discussions)
- **Documentation**: See the `/docs` folder for additional planning and reference docs (e.g. [Folder structure refactor plan](docs/folder-structure-refactor-plan.md)).

---

<div align="center">

Made with ❤️ by the AI Research Assistant team

[⬆ back to top](#ai-research-assistant)

</div>
