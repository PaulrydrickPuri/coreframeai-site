/**
 * Tests for extractor.ts
 * Verifies file extraction functionality
 */

import { extractFinancialData } from '../extractor';

// Add Jest types for testing
import { expect, jest, describe, test, beforeEach } from '@jest/globals';

// Mock fetch for server-side extraction
// @ts-ignore - Mocking fetch for tests
global.fetch = jest.fn();

describe('Financial Data Extractor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          revenues: [{ amount: 1000, date: '2025-01-01', description: 'Test Revenue' }],
          costs: [{ amount: 500, date: '2025-01-02', description: 'Test Cost' }],
          dates: ['2025-01-01'],
          metadata: { fileName: 'test.pdf', extractionTime: '2025-01-01', rowCount: 2 }
        })
      })
    );
  });

  test('should handle different file sizes and formats', async () => {
    // Small PDF file (local processing)
    const smallPdfFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    Object.defineProperty(smallPdfFile, 'size', { value: 1024 * 1024 }); // 1MB
    
    const pdfResult = await extractFinancialData({
      source: smallPdfFile,
      format: 'pdf',
      maxSizeBytes: 5 * 1024 * 1024
    });
    
    expect(pdfResult).toBeDefined();
    expect(pdfResult.metadata.fileName).toBe('test.pdf');
    expect(global.fetch).not.toHaveBeenCalled();
    
    // CSV file
    const csvFile = new File(['test,content'], 'test.csv', { type: 'text/csv' });
    Object.defineProperty(csvFile, 'size', { value: 1024 * 1024 });
    
    const csvResult = await extractFinancialData({
      source: csvFile,
      format: 'csv',
      maxSizeBytes: 5 * 1024 * 1024
    });
    
    expect(csvResult).toBeDefined();
    expect(csvResult.metadata.fileName).toBe('test.csv');
  });
  
  test('should use server-side extraction for large files', async () => {
    // Large PDF file (server processing)
    const largePdfFile = new File(['test content'], 'large.pdf', { type: 'application/pdf' });
    Object.defineProperty(largePdfFile, 'size', { value: 6 * 1024 * 1024 }); // 6MB
    
    const result = await extractFinancialData({
      source: largePdfFile,
      format: 'pdf',
      maxSizeBytes: 5 * 1024 * 1024
    });
    
    expect(result).toBeDefined();
    expect(global.fetch).toHaveBeenCalledWith('/api/projects/doom-diag/parse', expect.any(Object));
  });
  
  test('should handle server errors gracefully', async () => {
    (global.fetch as jest.Mock).mockImplementation(() => 
      Promise.resolve({
        ok: false,
        statusText: 'Server Error'
      })
    );
    
    const mockFile = new File(['test content'], 'large.pdf', { type: 'application/pdf' });
    Object.defineProperty(mockFile, 'size', { value: 6 * 1024 * 1024 }); // 6MB
    
    await expect(extractFinancialData({
      source: mockFile,
      format: 'pdf',
      maxSizeBytes: 5 * 1024 * 1024
    })).rejects.toThrow('Server extraction failed');
  });
});
