/**
 * API route for server-side parsing of large financial files
 * Used as a fallback when files exceed browser-side processing limits (>5MB)
 */

import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { v4 as uuidv4 } from 'uuid';

// Mock extraction function to simulate Python+Camelot processing
// In the real implementation, this would use Python bindings
async function extractDataFromFile(filePath: string, fileType: string): Promise<any> {
  console.log(`Extracting data from ${fileType} file: ${filePath}`);
  
  // In a real implementation, this would use camelot-py or similar
  // For MVP, return synthetic data
  return {
    revenues: [
      { amount: 10000, date: '2025-01-15', description: 'Product A sales' },
      { amount: 9500, date: '2025-02-15', description: 'Product A sales' },
      { amount: 9000, date: '2025-03-15', description: 'Product A sales' }
    ],
    costs: [
      { amount: 8000, date: '2025-01-10', description: 'Office rent' },
      { amount: 8000, date: '2025-02-10', description: 'Office rent' },
      { amount: 8000, date: '2025-03-10', description: 'Office rent' },
      { amount: 7000, date: '2025-01-20', description: 'Salaries' },
      { amount: 7200, date: '2025-02-20', description: 'Salaries' },
      { amount: 7500, date: '2025-03-20', description: 'Salaries' },
      { amount: 1000, date: '2025-01-05', description: 'Marketing' },
      { amount: 1200, date: '2025-02-05', description: 'Marketing' },
      { amount: 1500, date: '2025-03-05', description: 'Marketing' }
    ],
    dates: ['2025-01-01', '2025-02-01', '2025-03-01', '2025-04-01'],
    metadata: {
      fileName: path.basename(filePath),
      extractionTime: new Date().toISOString(),
      rowCount: 12
    }
  };
}

export async function POST(request: NextRequest) {
  try {
    // Check if the request is multipart/form-data
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Request must be multipart/form-data' },
        { status: 400 }
      );
    }

    // Get the form data
    const formData = await request.formData();
    const file = formData.get('file') as unknown as { arrayBuffer(): Promise<ArrayBuffer>; name: string; size: number; type: string };
    const format = formData.get('format') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Verify file size and type
    if (file.size > 25 * 1024 * 1024) { // 25MB max for server processing
      return NextResponse.json(
        { error: 'File too large. Maximum size is 25MB.' },
        { status: 400 }
      );
    }

    // Check file type
    const allowedFormats = ['pdf', 'csv', 'xlsx'];
    if (!allowedFormats.includes(format)) {
      return NextResponse.json(
        { error: 'Unsupported file format. Must be PDF, CSV, or XLSX.' },
        { status: 400 }
      );
    }

    // Create a temporary directory to store the file
    const tempDir = path.join(os.tmpdir(), 'doom-diag-' + uuidv4());
    fs.mkdirSync(tempDir, { recursive: true });

    // Get file buffer and write to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(tempDir, file.name);
    fs.writeFileSync(filePath, buffer);

    try {
      // Process the file using our extraction function
      const extractedData = await extractDataFromFile(filePath, format);

      // Return the extracted data
      return NextResponse.json(extractedData);
    } finally {
      // Clean up the temporary file regardless of success/failure
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        if (fs.existsSync(tempDir)) {
          fs.rmdirSync(tempDir);
        }
      } catch (cleanupError) {
        console.error('Error cleaning up temporary files:', cleanupError);
      }
    }
  } catch (error) {
    console.error('Server error processing file:', error);
    return NextResponse.json(
      { error: 'Error processing file' },
      { status: 500 }
    );
  }
}
