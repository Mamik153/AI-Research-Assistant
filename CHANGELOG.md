# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-03-01

### Fix
- Removed hardcoded production URLs from [api/proxy.js](api/proxy.js) and [vite.config.ts](vite.config.ts) for open-source and self-hosting; defaults are now localhost for development.

### Minor change
- Self-hosting and backend expectations documented in README (Backend Integration, Self-hosting / Deployment).
- [API_ENDPOINT_CHANGES.md](API_ENDPOINT_CHANGES.md): added note that CORS/origins are example settings; deployers must configure their own backend CORS and security headers.
- Default product name in [index.html](index.html) set to "AI Research Assistant" for an unbranded open-source build (deployers can override for their own branding).

---

## [1.0.0] - 2026-02-04

### BREAKING CHANGE
- Initial public release as open-source project under MIT License

### Major change
- Feature-based architecture implementation with clean separation of concerns
- Comprehensive TypeScript type system across the entire application
- Integration with shadcn/ui and Kibo UI component libraries
- Real-time research job status polling with automatic updates
- Voice input support using Web Speech API (Chrome, Edge, Safari)
- PDF and text export functionality for research reports
- Responsive design supporting desktop, tablet, and mobile devices
- Error boundary implementation for graceful error handling

### UI change
- Chat-based interface with smooth animations powered by Framer Motion
- Animated AI input component with multi-line support
- Research results display with custom markdown rendering
- Interactive mind map visualizations using force-directed graphs
- 3D flip card animations for flash cards
- Dynamic layout transitions from centered to chat mode
- Loading states with skeleton components
- Syntax-highlighted code blocks in markdown reports

### Minor change
- Auto-expanding textarea with height limits
- Keyboard navigation and accessibility (ARIA labels)
- Debounced search suggestions
- Automatic cleanup of event listeners and intervals
- Browser compatibility checks for Web Speech API
- Configuration for API client with environment variable support

### Fix
- Memory leak prevention in D3.js force simulations
- Proper cleanup on component unmount for polling hooks
- Speech recognition state management across re-renders
- Interim and final transcript handling in voice input

### Internal
- ESLint configuration with TypeScript support
- Vite build optimization and code splitting
- Project structure refactoring to feature-based organization
- Comprehensive documentation (README, PROJECT_REPORT, COMPONENT_REFERENCE)
- Git workflow and commit history establishment

---

## Project Metadata

- **Repository**: https://github.com/Mamik153/AI-Research-Assistant
- **License**: MIT
- **Initial Release Date**: 2026-02-04

---

## Notes

This changelog will be updated with each release. All changes, including breaking changes, new features, bug fixes, and improvements will be documented here with appropriate timestamps and version numbers.
