# Contributing to AI Research Assistant

Thank you for your interest in contributing to AI Research Assistant! We welcome contributions from the community and are grateful for your support.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Conventions](#commit-message-conventions)
- [Testing Requirements](#testing-requirements)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)
- [Questions and Discussions](#questions-and-discussions)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **pnpm** (v8.0.0 or higher) - [Installation guide](https://pnpm.io/installation)
- **Git** for version control

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/AI-Research-Assistant.git
   cd AI-Research-Assistant
   ```

3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/Mamik153/AI-Research-Assistant.git
   ```

4. **Install dependencies**:
   ```bash
   pnpm install
   ```

5. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start the development server**:
   ```bash
   pnpm dev
   ```

## Development Workflow

### Project Structure

The project follows a **feature-based architecture**:

```
src/
├── core/           # Core configuration, constants, utilities
├── features/       # Feature modules (chat, research, results, etc.)
└── shared/         # Shared components, hooks, services, types
```

Each feature module contains:
- `components/` - React components
- `hooks/` - Custom React hooks
- `services/` - API and service logic
- `types/` - TypeScript type definitions
- `utils/` - Utility functions
- `index.ts` - Public API exports

### Key Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## How to Contribute

### Types of Contributions

We welcome many types of contributions:

- **Bug fixes** - Fix issues and improve stability
- **New features** - Add new functionality
- **Documentation** - Improve or add documentation
- **UI/UX improvements** - Enhance user interface and experience
- **Performance optimizations** - Improve speed and efficiency
- **Tests** - Add or improve test coverage
- **Code refactoring** - Improve code quality

### Before You Start

1. **Check existing issues** - Look for existing issues or discussions related to your contribution
2. **Create an issue** - If none exists, create one to discuss your proposed changes
3. **Get feedback** - Wait for maintainer feedback before starting major work
4. **Keep it focused** - One feature or fix per pull request

## Pull Request Process

### 1. Prepare Your Changes

- Write clean, readable code following our style guidelines
- Add or update tests as needed
- Update documentation if you're changing functionality
- Ensure your code passes linting: `pnpm lint`
- Test your changes thoroughly

### 2. Commit Your Changes

Follow our [commit message conventions](#commit-message-conventions):

```bash
git add .
git commit -m "feat: add amazing new feature"
```

### 3. Keep Your Branch Updated

Regularly sync with the upstream repository:

```bash
git fetch upstream
git rebase upstream/main
```

### 4. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 5. Create a Pull Request

1. Go to the [AI Research Assistant repository](https://github.com/Mamik153/AI-Research-Assistant)
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template completely
5. Link any related issues

### 6. Code Review Process

- A maintainer will review your PR
- Address any requested changes
- Keep the conversation constructive and respectful
- Once approved, a maintainer will merge your PR

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define types explicitly; avoid `any`
- Use interfaces for object shapes
- Export types from feature-level `types/` directories

```typescript
// Good
interface ResearchResult {
  id: string;
  title: string;
  content: string;
}

// Avoid
const result: any = {...};
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use meaningful component and prop names

```typescript
// Good
export const ResearchForm: React.FC<ResearchFormProps> = ({ onSubmit }) => {
  const { handleResearch } = useResearch();
  // ...
};
```

### File Organization

- One component per file
- Co-locate related files within feature directories
- Use `index.ts` for public exports
- Keep feature-specific code within feature directories

### Styling

- Use Tailwind CSS utility classes
- Follow existing component patterns
- Ensure responsive design (mobile-first)
- Use CSS variables from theme for colors

```tsx
// Good
<div className="flex flex-col gap-4 p-6 bg-background rounded-lg">
  <h2 className="text-2xl font-bold">Title</h2>
</div>
```

### Naming Conventions

- **Components**: PascalCase (`ResearchForm.tsx`)
- **Hooks**: camelCase with "use" prefix (`useResearch.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`ResearchResult`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)

## Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

### Examples

```bash
feat(research): add voice input support for research topics

fix(chat): resolve message scroll behavior on new messages

docs(readme): update installation instructions for pnpm

refactor(results): extract result parsing logic into utility function
```

### Guidelines

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep subject line under 72 characters
- Reference issues and PRs in the footer

## Testing Requirements

Currently, the project is setting up its testing infrastructure. When contributing:

1. **Manual Testing**: Thoroughly test your changes manually
2. **Browser Testing**: Test in Chrome, Firefox, and Safari if possible
3. **Responsive Testing**: Test on different screen sizes
4. **Edge Cases**: Consider and test edge cases

### Future Testing

We plan to add:
- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright

## Reporting Bugs

### Before Submitting a Bug Report

1. **Check existing issues** - Your bug may already be reported
2. **Update to latest** - Ensure you're using the latest version
3. **Reproduce the bug** - Confirm you can consistently reproduce it

### Submitting a Bug Report

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:

- **Clear title** - Concise description of the bug
- **Steps to reproduce** - Detailed steps to recreate the issue
- **Expected behavior** - What should happen
- **Actual behavior** - What actually happens
- **Environment** - Browser, OS, Node.js version
- **Screenshots** - If applicable
- **Additional context** - Any other relevant information

## Requesting Features

### Before Submitting a Feature Request

1. **Check existing requests** - Your feature may already be requested
2. **Consider scope** - Ensure it fits the project's goals
3. **Think about users** - How will this benefit users?

### Submitting a Feature Request

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) and include:

- **Clear title** - Concise description of the feature
- **Problem statement** - What problem does this solve?
- **Proposed solution** - How should it work?
- **Alternatives** - Other approaches you've considered
- **Additional context** - Examples, mockups, etc.

## Questions and Discussions

- **Questions**: Use [GitHub Discussions](https://github.com/Mamik153/AI-Research-Assistant/discussions)
- **Real-time chat**: Check if there's a Discord/Slack (if applicable)
- **Documentation**: Check existing docs first

## Recognition

Contributors will be recognized in:

- GitHub's contributor graph
- Release notes for significant contributions
- Project documentation (if applicable)

## License

By contributing to AI Research Assistant, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to AI Research Assistant! Your efforts help make this project better for everyone.

## Need Help?

If you need help with anything, don't hesitate to:

- Open a discussion on GitHub
- Ask in the pull request comments
- Reach out to maintainers

We're here to help you contribute successfully!
