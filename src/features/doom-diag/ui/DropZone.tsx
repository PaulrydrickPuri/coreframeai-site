/**
 * DropZone component for file upload
 * Handles drag-drop for PDF/CSV/XLSX files ≤5 MB
 */

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropZoneProps {
  onFileAccepted: (file: File) => void;
  isProcessing: boolean;
  maxSize?: number; // In bytes
}

export default function DropZone({ 
  onFileAccepted, 
  isProcessing, 
  maxSize = 5 * 1024 * 1024 // 5MB default
}: DropZoneProps) {
  const [error, setError] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Clear previous errors
    setError(null);
    
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const { code } = rejectedFiles[0].errors[0];
      if (code === 'file-too-large') {
        setError(`File is too large. Max size is ${maxSize / (1024 * 1024)}MB.`);
      } else if (code === 'file-invalid-type') {
        setError('Invalid file type. Please upload PDF, CSV, or XLSX.');
      } else {
        setError('Error uploading file. Please try again.');
      }
      return;
    }
    
    // Handle accepted files
    if (acceptedFiles.length > 0) {
      onFileAccepted(acceptedFiles[0]);
    }
  }, [onFileAccepted, maxSize]);
  
  const { 
    getRootProps, 
    getInputProps, 
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxSize,
    disabled: isProcessing,
    multiple: false
  });
  
  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all
          ${isDragActive ? 'bg-gray-800 border-blue-500' : 'bg-gray-900 border-gray-700 hover:border-gray-500'}
          ${isDragAccept ? 'border-green-500' : ''}
          ${isDragReject ? 'border-red-500' : ''}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center h-full">
          {isProcessing ? (
            <>
              <div className="text-4xl mb-4">⏳</div>
              <p className="text-xl font-medium text-gray-300">Processing file...</p>
              <p className="text-sm text-gray-400 mt-2">Hang tight, extracting data...</p>
            </>
          ) : (
            <>
              <div className="text-4xl mb-4">📊</div>
              <p className="text-xl font-medium text-gray-300">
                {isDragActive
                  ? isDragAccept
                    ? "Drop the file here..."
                    : "This file type is not supported"
                  : "Drag & drop a financial file here"
                }
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Support for PDF, CSV, or XLSX up to 5MB
              </p>
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-white"
                onClick={e => e.stopPropagation()}
              >
                Browse Files
              </button>
            </>
          )}
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 mt-2 text-sm">
          {error}
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        <p>All files are processed locally in your browser. Files over 5MB will be processed on the server.</p>
      </div>
    </div>
  );
}
