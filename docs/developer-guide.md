# CoreframeAI Developer Guide

## Introduction

CoreframeAI is a platform focused on cognitive workflow exploration and development. It provides tools for reasoning exploration, agent development, and deployment. This documentation provides technical reference for developers working on the platform.

## Architecture Overview

The CoreframeAI platform is built using the following technologies:

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui component library
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

The codebase follows a feature-based architecture with clear separation of concerns.

## Project Structure

```
coreframeai-site/
├── src/                      # Source code
│   ├── app/                  # Next.js app directory
│   │   ├── api/              # API routes
│   │   ├── projects/         # Project pages
│   │   └── tools/            # Tools pages
│   ├── features/             # Feature modules
│   │   ├── doom-diag/        # Brutal-Truth Diagnostics
│   │   └── ...               # Other features
│   ├── lib/                  # Shared libraries
│   │   └── supabaseClient.ts # Supabase client
│   └── shared/               # Shared components
│       ├── components/       # UI components
│       ├── hooks/            # Custom React hooks
│       └── utils/            # Utility functions
├── public/                   # Static assets
└── docs/                     # Documentation
```

## Development Guide

### Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PaulrydrickPuri/coreframeai-site.git
   cd coreframeai-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   OPENAI_API_KEY=your-openai-api-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Build and Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to Vercel:
   ```bash
   npx vercel
   ```

## Coding Standards

### TypeScript

- Use strict typing wherever possible
- Avoid using `any` type
- Prefer interfaces over types for public APIs
- Use type inference when it doesn't affect readability

### Component Structure

- Use functional components with hooks
- Follow the React component naming convention (PascalCase)
- Keep components focused on a single responsibility
- Use composition over inheritance

### CSS/Styling

- Use Tailwind CSS for styling
- Follow the project's color palette and design system
- Use appropriate responsive design patterns

### Testing

- Write unit tests for complex logic
- Use React Testing Library for component tests
- Run tests before submitting PRs

## Contributing

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "feat: Your feature description"
   ```

3. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request
