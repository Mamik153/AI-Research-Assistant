# AI Research Assistant

An AI-powered research interface that allows users to submit research topics and receive comprehensive research reports. Built with React, TypeScript, and Vite.

## Features

- **Simple Research Submission**: Enter any topic and let AI conduct comprehensive research
- **Real-time Status Updates**: Monitor research progress with automatic status polling
- **Responsive Split-Screen Layout**: View research form and results simultaneously
- **Formatted Research Reports**: Clean, readable presentation of research findings
- **Error Handling**: Graceful error management with user-friendly messages

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- A running backend API server on `localhost:8000`

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## API Integration

The application communicates with a backend API with the following endpoints:

- `POST /api/research` - Submit a research topic
- `GET /api/research/{job_id}` - Check job status
- `GET /api/research/{job_id}/result` - Retrieve completed research

## Project Structure

```
src/
├── components/
│   ├── ResearchFormContainer.tsx    # Main form and status container
│   ├── ResearchResponseData.tsx     # Results panel
│   ├── ResearchResult.tsx           # Research report display
│   ├── JobStatus.tsx                # Status monitoring
│   └── ErrorBoundary.tsx            # Error handling
├── hooks/
│   └── useResearchJob.ts            # Research job management
├── App.tsx                          # Main application with layout management
└── index.css                        # Global styles
```

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## How It Works

1. User enters a research topic in the input field
2. Application submits the topic to the backend API
3. Interface transitions to split-screen layout (30% form, 70% results)
4. Status is polled every 3 seconds until completion
5. Completed research report is displayed in the results panel
6. User can start a new research while maintaining the split-screen layout
