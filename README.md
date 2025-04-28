# CoreframeAI Platform

![CoreframeAI](./public/images/coreframe-logo.png)

## About

CoreframeAI is a cognitive workflow platform focused on reasoning exploration, agent development, and deployment. It provides a suite of tools to map, encode, navigate, test, amplify, and learn from AI reasoning processes.

## Features

### Brutal-Truth Diagnostics (Doom-Diag)

Drop in your financial data and get the brutal truth: 5 brutal headlines, a Doom Clock forecasting days to failure, and 90-minute fixes for each issue.

- **File Support**: CSV, XLSX, PDF (up to 5MB)
- **Local Processing**: No network calls for small files
- **Actionable Insights**: Each brutal headline comes with a concrete action
- **Doom Clock**: Visual representation of days until financial failure
- **PDF Export**: Share your brutal truths and action plan

[Learn more about Doom-Diag](./docs/doom-diag/README.md)

### Research Tools

- **Prompt Explorer**: Explore prompt mutations and task phrasing
- **Dataset Converter**: Convert PDFs or tables into structured JSON
- **MENTAL Visualizer**: Interactive diagram viewer to explain reasoning loops

### Agent Builders

- **MCP Playground**: Drag-and-drop cognition builder
- **RunCFAI Trainer**: Trigger model fine-tuning workflows
- **TraceCFAI Evaluator**: See reasoning diffs and detect cognition plateaus

### Deployment Tools

- **Deploy Agent to API**: Expose agent logic as inference endpoint
- **Embed Anywhere**: Generate plugins, widgets, or iframe embeds
- **Results Page**: View past logs, checkpoints, and evaluations

## Technology Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui component library
- **State Management**: React Context API and custom hooks
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Deployment**: Vercel

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
├── docs/                     # Documentation
└── cypress/                  # E2E tests
```

## Feature-Specific Structure

### Doom-Diag (Brutal-Truth Diagnostics)

```
features/doom-diag/
├── core/                # Core business logic
│   ├── analyzer.ts      # Financial analysis 
│   ├── extractor.ts     # File data extraction
│   ├── forecast.ts      # Doom Clock prediction
│   ├── prompts.ts       # LLM integration
│   └── report.ts        # Report assembly
├── ui/                  # React components
│   ├── ActionCard.tsx   # Action item cards
│   ├── DoomClock.tsx    # Doom Clock visualization
│   ├── DropZone.tsx     # File upload UI
│   ├── HeadlineCard.tsx # Headline display
│   └── ReportModal.tsx  # Full report display
└── fixtures/            # Test data
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

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

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key
```

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Documentation

Comprehensive documentation is available in the [docs](./docs) directory:

- [Developer Guide](./docs/developer-guide.md)
- [API Reference](./docs/api-reference.md)
- [Contributing Guide](./docs/contributing.md)
- [Doom-Diag Documentation](./docs/doom-diag/README.md)

## Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run cypress
```

## Deployment

The app is deployed on Vercel. To deploy your own instance:

```bash
npx vercel
```

## Contributing

Please read our [Contributing Guide](./docs/contributing.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
