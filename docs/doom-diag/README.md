# Doom-Diag (Brutal-Truth Diagnostics)

![Doom-Diag Banner](../../public/images/doom-diag-banner.png)

## Overview

Brutal-Truth Diagnostics (Doom-Diag) is a financial analysis tool that provides harsh but actionable insights for businesses. It ingests financial data and produces brutally honest assessments, forecasts remaining runway with a Doom Clock, and suggests concrete actions to extend runway.

## Key Features

- **File Ingestion**: Drop-in support for CSV, XLSX, and PDF files up to 5MB, with server-side fallback for larger files
- **Financial Analysis**: Deep analysis of burn rate, revenue trends, and cost categorization
- **Brutal Headlines**: 5 brutally honest financial headlines with action items
- **Doom Clock**: Visual representation of days until financial failure
- **Fix Tracking**: Mark actions as completed to see the impact on runway
- **PDF Export**: Export complete reports for sharing
- **Local Processing**: Files are processed locally with no data sent to external servers (for files ≤5MB)

## Technical Specifications

- **Stack**: Next.js 14/15, TypeScript, Tailwind CSS, shadcn/ui
- **File Processing**: Browser-side parsing for CSV, Pyodide/camelot-wasm for PDF/XLSX
- **Large File Support**: Server-side parsing API route for files >5MB
- **LLM Integration**: OpenAI API with function calls (gpt-4o) for headline generation
- **No Persistence**: Raw files are never stored, only processed data

## Architecture

Doom-Diag follows a modular architecture with clear separation of concerns:

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
├── fixtures/            # Test data
└── api/                 # API routes for server-side processing
```

## Implementation

### File Processing

For CSV files, the data is parsed directly in the browser:

```typescript
// Sample CSV processing
async function processCsvFile(source: File | Blob): Promise<ExtractedData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const lines = csvData.split('\n');
        
        // Extract header and data
        // ...
        
        resolve({
          revenues,
          costs,
          dates: sortedDates,
          metadata: {
            fileName: source instanceof File ? source.name : 'unknown',
            extractionTime: new Date().toISOString(),
            rowCount: revenues.length + costs.length,
          }
        });
      } catch (error) {
        reject(error);
      }
    };
    
    reader.readAsText(source);
  });
}
```

For PDF and XLSX files, the MVP uses synthetic data, with plans to integrate Pyodide/camelot-wasm for local browser processing.

### Financial Analysis

The analyzer processes extracted data to calculate:

1. Total revenue and costs
2. Monthly burn rate
3. Remaining runway (in days)
4. Major cost categories and their trends

```typescript
// Sample analysis calculation
function calculateBurnRate(revenues: number[], costs: number[]): number {
  // Calculate average monthly cost
  const totalCosts = costs.reduce((sum, cost) => sum + cost, 0);
  const monthlyBurn = costs.length > 0 ? totalCosts / costs.length : 0;
  
  // Subtract average monthly revenue
  const totalRevenue = revenues.reduce((sum, rev) => sum + rev, 0);
  const monthlyRevenue = revenues.length > 0 ? totalRevenue / revenues.length : 0;
  
  return Math.max(0, monthlyBurn - monthlyRevenue);
}
```

### Doom Clock

The forecast module predicts when a company will run out of cash based on:

- Current runway calculation
- Burn rate variance analysis
- Multiple scenarios (optimistic, realistic, pessimistic)

```typescript
// Sample forecast calculation
function calculateDoomDays(cashReserves: number, burnRate: number): number {
  if (burnRate <= 0) return Infinity;
  return Math.ceil(cashReserves / burnRate);
}
```

### Brutal Headlines

Headlines are generated using:

1. OpenAI API with function calls
2. Financial analysis data as context
3. Specific prompt to ensure brutally honest but constructive feedback
4. Fallback headlines for offline/development use

Each headline includes:
- A brutal truth about the financial situation (≤90 chars)
- A single concrete action to fix the issue (≤140 chars)
- Expected impact (in currency or percentage)
- Confidence score (0-1)

```typescript
// Sample headline template
{
  headline: "Revenue in free-fall: 20% decline while costs surge 10%",
  action: "Conduct emergency pricing review and implement 15% increase on Product A",
  impact: 750, // RM
  confidence: 0.9
}
```

### PDF Export 

PDF generation uses:
- HTML to canvas conversion for visual fidelity
- Text-based fallback for server-side rendering
- Proper multi-page handling for long reports

## User Flow

1. User drops financial file onto the DropZone
2. File is processed locally (or via API if >5MB)
3. Analysis and forecast are generated
4. Brutal headlines are created (via OpenAI or fallback)
5. Report is displayed in the modal with the Doom Clock
6. User can mark actions as completed to see runway extension
7. Report can be exported as PDF
8. Report can be saved to workspace (in-memory for MVP)

## Development Guide

### Setup

1. Ensure environment variables are set up in `.env.local`:
   ```
   OPENAI_API_KEY=your-openai-key
   ```

2. Install dependencies and run the development server:
   ```bash
   npm install
   npm run dev
   ```

### Testing

Test fixtures are provided in the `fixtures` directory:
- `test_data_1_growing_company.csv` - Healthy company with growing revenue
- `test_data_2_cashflow_crisis.csv` - Company with major cash flow issues
- `test_data_3_startup_burnout.csv` - Startup with high burn rate
- `test_data_4_seasonal_business.csv` - Business with seasonal revenue patterns
- `test_data_5_smb_transition.csv` - SMB in transition phase

### Performance Considerations

- Bundle size is kept ≤150kB gzipped
- No network calls for local parsing
- PDF generation optimized for minimal memory usage
- Proper error handling for all failure modes

## Future Enhancements

1. **Real PDF/XLSX Parsing**: Implement Pyodide/camelot-wasm for browser-side parsing
2. **Persistent Storage**: Add database support for report storage
3. **User Authentication**: Add user accounts and role-based access
4. **Historical Comparison**: Compare multiple reports over time
5. **Advanced Visualizations**: Add charts and graphs for financial trends
