# CoreframeAI API Reference

## Overview

This document provides detailed reference for the CoreframeAI platform APIs. These APIs allow developers to interact with the various components and features of the platform programmatically.

## API Endpoints

### Doom-Diag (Brutal-Truth Diagnostics)

#### Parse Financial Data

Parse financial data files (CSV, XLSX, or PDF) that exceed browser-side processing limits.

```
POST /api/projects/doom-diag/parse
```

**Request:**
- Content-Type: `multipart/form-data`
- Body Parameters:
  - `file`: The financial data file (required)
  - `format`: File format, one of `csv`, `xlsx`, or `pdf` (required)

**Response:**
```json
{
  "revenues": [
    {
      "amount": 10000,
      "date": "2025-01-15",
      "description": "Product A sales"
    }
  ],
  "costs": [
    {
      "amount": 8000,
      "date": "2025-01-10",
      "description": "Office rent"
    }
  ],
  "dates": ["2025-01-01", "2025-02-01", "2025-03-01"],
  "metadata": {
    "fileName": "financial_data.csv",
    "extractionTime": "2025-04-28T10:30:00.000Z",
    "rowCount": 10
  }
}
```

**Error Responses:**
- 400: Invalid request (missing file, unsupported format, file too large)
- 500: Server error processing file

#### API Error Format

All API errors follow this standard format:

```json
{
  "error": "Error message describing the issue"
}
```

## Core Module Exports

### Doom-Diag Modules

The Doom-Diag feature is organized into core modules that can be used programmatically:

#### Extractor Module

```typescript
import { extractFinancialData } from '@/features/doom-diag/core/extractor';

interface ExtractorOptions {
  source: File | Blob;
  format: 'pdf' | 'csv' | 'xlsx';
  maxSizeBytes: number;
}

interface ExtractedData {
  revenues: Array<{amount: number; date: string; description: string}>;
  costs: Array<{amount: number; date: string; description: string}>;
  dates: string[];
  metadata: {
    fileName: string;
    extractionTime: string;
    rowCount: number;
  };
}

// Extract financial data from a file
const data = await extractFinancialData({
  source: file,
  format: 'csv',
  maxSizeBytes: 5 * 1024 * 1024 // 5MB
});
```

#### Analyzer Module

```typescript
import { analyzeFinancialData } from '@/features/doom-diag/core/analyzer';

interface AnalysisResult {
  totalRevenue: number;
  totalCosts: number;
  burnRate: number;
  runway: number;
  costCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  }>;
}

// Analyze extracted financial data
const analysis = await analyzeFinancialData(extractedData);
```

#### Forecast Module

```typescript
import { generateForecast } from '@/features/doom-diag/core/forecast';

interface ForecastResult {
  doomDays: number;
  confidenceScore: number;
  scenarioProjections: {
    optimistic: number;
    realistic: number;
    pessimistic: number;
  };
}

// Generate forecast from analysis results
const forecast = generateForecast(analysis);
```

#### Report Module

```typescript
import { 
  assembleReport, 
  markActionCompleted, 
  exportReportToPdf, 
  saveReportToWorkspace 
} from '@/features/doom-diag/core/report';

interface DoomReport {
  id: string;
  createdAt: string;
  fileName: string;
  fileType: string;
  financialSummary: {
    totalRevenue: number;
    totalCosts: number;
    burnRate: number;
    runway: number;
  };
  doomClock: {
    daysRemaining: number;
    confidenceScore: number;
    projections: {
      optimistic: number;
      realistic: number;
      pessimistic: number;
    };
  };
  brutalHeadlines: Array<{
    headline: string;
    action: string;
    impact: number | string;
    confidence: number;
    completed?: boolean;
  }>;
  status: 'active' | 'archived';
  savedToWorkspace: boolean;
}

// Assemble a complete report
const report = assembleReport(
  { name: file.name, type: file.type },
  analysis,
  forecast,
  headlines
);

// Mark an action as completed
const updatedReport = markActionCompleted(report, headlineIndex);

// Export report to PDF
const pdfBlob = await exportReportToPdf(report, htmlElement);

// Save report to workspace
const savedReport = await saveReportToWorkspace(report);
```

#### Prompts Module

```typescript
import { generateBrutalHeadlines } from '@/features/doom-diag/core/prompts';

// Generate brutal headlines using OpenAI
const headlines = await generateBrutalHeadlines({
  ...analysis,
  ...extractedData
});
```

## UI Components

### Doom-Diag Components

```typescript
// DropZone.tsx - File upload component
import DropZone from '@/features/doom-diag/ui/DropZone';

<DropZone
  onFileAccepted={(file) => handleFile(file)}
  isProcessing={processing}
  maxSize={5 * 1024 * 1024} // 5MB
/>

// DoomClock.tsx - Visual representation of runway
import DoomClock from '@/features/doom-diag/ui/DoomClock';

<DoomClock
  daysRemaining={report.doomClock.daysRemaining}
  confidenceScore={report.doomClock.confidenceScore}
  optimisticDays={report.doomClock.projections.optimistic}
  pessimisticDays={report.doomClock.projections.pessimistic}
/>

// HeadlineCard.tsx - Display brutal headlines
import HeadlineCard from '@/features/doom-diag/ui/HeadlineCard';

<HeadlineCard
  headline={headline}
  onMarkDone={() => handleMarkDone(index)}
/>

// ReportModal.tsx - Display full report
import ReportModal from '@/features/doom-diag/ui/ReportModal';

<ReportModal
  report={report}
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onMarkActionDone={handleActionDone}
  onDownloadPdf={handleDownloadPdf}
  onSaveToWorkspace={handleSaveToWorkspace}
  getReportElement={setReportElement}
/>
```
