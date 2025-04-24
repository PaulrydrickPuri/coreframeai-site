# Project Structure

```
src/
├── app/                    # Next.js app directory with pages and layouts
├── features/              # Feature-based components and logic
├── shared/               # Shared components, layouts, and UI elements
├── utils/                # Utility functions and helpers
├── types/                # TypeScript type definitions
├── config/               # Configuration files and constants
├── hooks/                # Custom React hooks
├── services/             # API services and external integrations
├── constants/            # Application constants and enums
├── styles/               # Global styles and theme configuration
└── tests/                # Test files
```

## Directory Purpose

- `app`: Contains Next.js pages and layouts using the App Router
- `features`: Feature-specific components and logic, organized by domain
- `shared`: Reusable components and layouts used across features
- `utils`: Helper functions and utility code
- `types`: TypeScript interfaces, types, and type guards
- `config`: Environment configuration and feature flags
- `hooks`: Custom React hooks for shared functionality
- `services`: API client code and external service integrations
- `constants`: Application-wide constants and enumerations
- `styles`: Global styles, theme configuration, and style utilities
- `tests`: Test files following the same structure as the source
