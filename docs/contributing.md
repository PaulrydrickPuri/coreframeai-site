# Contributing to CoreframeAI

Thank you for your interest in contributing to the CoreframeAI platform! This document provides guidelines for contributing to the project.

## Code of Conduct

Please help us keep the CoreframeAI project open and inclusive by following our code of conduct.

## How to Contribute

### Reporting Bugs

- Use the issue tracker to report bugs
- Describe the bug in detail including steps to reproduce
- Include browser/environment information
- Include screenshots if possible

### Suggesting Features

- Use the issue tracker to suggest features
- Clearly describe the feature and its value
- Include mockups or examples if possible

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes following the commit message convention
4. Push to your branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

## Development Process

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

### Commit Message Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

Example:
```
feat(doom-diag): add PDF export functionality

Implement PDF export for Doom-Diag reports using jsPDF and html2canvas.
PDF includes all brutal headlines, doom clock, and financial summary.

Closes #123
```

### Code Style

- Use ESLint and TypeScript for static code analysis
- Follow the existing code style
- Write clear, documented code
- Avoid any types wherever possible

### Testing

- Write tests for new features
- Ensure all tests pass before submitting a PR
- Maintain or improve code coverage

## PR Review Process

1. Automated checks must pass (TypeScript, ESLint, tests)
2. Code review by at least one maintainer
3. Changes requested must be addressed
4. Final approval from maintainer

## Development Setup

See the [Developer Guide](./developer-guide.md#setup-and-installation) for detailed setup instructions.

## Documentation

Please update documentation when adding or modifying features:

- Update relevant feature documentation
- Add JSDoc comments to functions and classes
- Update API reference for public APIs
- Add examples for new functionality

## License

By contributing to CoreframeAI, you agree that your contributions will be licensed under the project's license.
