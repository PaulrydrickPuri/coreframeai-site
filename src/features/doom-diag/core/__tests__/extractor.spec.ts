/**
 * Tests for extractor.ts
 * Verifies correct row extraction from fixture PDFs
 */

import { extractFinancialData } from '../extractor';

// Mock fetch for server-side extraction
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

  test('should extract data from PDF file locally for small files', async () => {
    // Create a mock File smaller than 5MB
    const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    Object.defineProperty(mockFile, 'size', { value: 1024 * 1024 }); // 1MB
    
    const result = await extractFinancialData({
      source: mockFile,
      format: 'pdf',
      maxSizeBytes: 5 * 1024 * 1024
    });
    
    expect(result).toBeDefined();
    expect(result.metadata.fileName).toBe('test.pdf');
    expect(global.fetch).not.toHaveBeenCalled();
  });
  
  test('should use server-side extraction for large files', async () => {
    // Create a mock File larger than 5MB
    const mockFile = new File(['test content'], 'large.pdf', { type: 'application/pdf' });
    Object.defineProperty(mockFile, 'size', { value: 6 * 1024 * 1024 }); // 6MB
    
    const result = await extractFinancialData({
      source: mockFile,
      format: 'pdf',
      maxSizeBytes: 5 * 1024 * 1024
    });
    
    expect(result).toBeDefined();
    expect(global.fetch).toHaveBeenCalledWith('/api/projects/doom-diag/parse', expect.any(Object));
  });
  
  test('should handle CSV format', async () => {
    const mockFile = new File(['test,content'], 'test.csv', { type: 'text/csv' });
    Object.defineProperty(mockFile, 'size', { value: 1024 * 1024 }); // 1MB
    
    const result = await extractFinancialData({
      source: mockFile,
      format: 'csv',
      maxSizeBytes: 5 * 1024 * 1024
    });
    
    expect(result).toBeDefined();
    expect(result.metadata.fileName).toBe('test.csv');
  });
  
  test('should handle XLSX format', async () => {
    const mockFile = new File(['test content'], 'test.xlsx', { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    Object.defineProperty(mockFile, 'size', { value: 1024 * 1024 }); // 1MB
    
    const result = await extractFinancialData({
      source: mockFile,
      format: 'xlsx',
      maxSizeBytes: 5 * 1024 * 1024
    });
    
    expect(result).toBeDefined();
    expect(result.metadata.fileName).toBe('test.xlsx');
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
