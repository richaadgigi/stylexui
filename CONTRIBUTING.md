# Contributing to StyleXUI

Thank you for your interest in contributing to StyleXui! This document outlines how to contribute effectively to our CSS framework.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Development Setup](#development-setup)
3. [Project Structure](#project-structure)
4. [Contribution Workflow](#contribution-workflow)
5. [Testing in Projects](#testing-in-projects)
6. [Code Standards](#code-standards)
7. [Pull Request Guidelines](#pull-request-guidelines)
8. [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Git

### First-Time Setup
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/richaadgigi/stylexui.git
   cd stylexui
   ```

## Development Setup

### Installation
```bash
npm install
```

### Building the Project
```bash
npm run build
```

### Watching for Changes
```bash
npm run watch
```

## Project Structure
```
stylexui/
├── assets/          # Source files
│   ├── images/      # Image components
├── dist/            # Compiled assets
├── css/             # CSS components
├── js/              # JavaScript modules

```

## Contribution Workflow

### 1. Create a Branch
```bash
git checkout -b type/change-description
```
Branch type prefixes:
- `feat/`: New features
- `fix/`: Bug fixes
- `docs/`: Documentation
- `style/`: CSS improvements
- `refactor/`: Code improvements

### 2. Make Your Changes
Follow the [Code Standards](#code-standards) below

### 3. Commit Changes
```bash
git commit -m "type(scope): description of changes"
```

### 4. Push Changes
```bash
git push origin your-branch-name
```

### 5. Open a Pull Request
Create a PR against the `main` branch of the main repository

## Testing in Projects

### Framework Testing (React, Vue, etc.)
```bash
# In StyleXUI directory:
npm link

# In your project directory:
npm link @richaadgigi/stylexui
```

### Testing Commands
```bash
npm test       # Run all tests
npm run lint   # Check code style
```

## Code Standards

### CSS/SCSS Guidelines
- Use BEM naming convention
- Mobile-first responsive approach
- Keep selectors shallow (max 3 levels)
- Use variables for colors and spacing
- Add comments for complex components

### JavaScript Standards
- ES6+ syntax
- JSDoc comments for public methods
- Descriptive variable names
- Unit tests for new features

### Documentation
- Update README for new features
- Add usage examples
- Keep API documentation current

## Pull Request Guidelines

### Requirements
1. Clear, descriptive title
2. Detailed description of changes
3. References to related issues
4. Passing tests
5. Follows code standards
6. Includes necessary documentation updates

### Review Process
1. PRs will be reviewed within 3 business days
2. Two approvals required for merging
3. Maintainers may request changes
4. Squash commits before merging

## Community Guidelines

### Code of Conduct
All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md). Be respectful and inclusive in all interactions.

### Getting Help
For questions:
- Check the project documentation
- Open a discussion in GitHub

### Recognition
All significant contributions will be recognized in:
- Release notes
- Contributors list
- Project documentation

---

We appreciate your contributions to making StyleXui better! 🚀