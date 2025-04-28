"use client";

import { useState, useCallback } from 'react';
import { extractFinancialData } from '@/features/doom-diag/core/extractor';
import { analyzeFinancialData } from '@/features/doom-diag/core/analyzer';
import { generateForecast } from '@/features/doom-diag/core/forecast';
import { generateBrutalHeadlines } from '@/features/doom-diag/core/prompts';
import { assembleReport, markActionCompleted, exportReportToPdf, saveReportToWorkspace } from '@/features/doom-diag/core/report';
import DropZone from '@/features/doom-diag/ui/DropZone';
import ReportModal from '@/features/doom-diag/ui/ReportModal';
import { motion } from 'framer-motion';

export default function DoomDiagnostics() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [report, setReport] = useState<any | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  const handleFileAccepted = useCallback(async (file: File) => {
    setIsProcessing(true);
    setErrorMessage(null);
    
    try {
      // Extract financial data from the file
      const extractedData = await extractFinancialData({
        source: file,
        format: file.type.includes('pdf') ? 'pdf' : 
                file.type.includes('csv') ? 'csv' : 'xlsx',
        maxSizeBytes: 5 * 1024 * 1024 // 5MB
      });
      
      // Analyze the extracted data
      const analysis = await analyzeFinancialData(extractedData);
      
      // Generate forecast and doom clock
      const forecast = generateForecast(analysis);
      
      // Generate brutal headlines with LLM
      const headlines = await generateBrutalHeadlines({
        ...analysis,
        ...extractedData
      });
      
      // Assemble the final report
      const finalReport = assembleReport(
        { name: file.name, type: file.type },
        analysis,
        forecast,
        headlines
      );
      
      // Set the report and open the modal
      setReport(finalReport);
      setIsReportOpen(true);
    } catch (error) {
      console.error('Error processing file:', error);
      setErrorMessage('Failed to process file. Please try again with a different file.');
    } finally {
      setIsProcessing(false);
    }
  }, []);
  
  const handleMarkActionDone = useCallback((headlineIndex: number) => {
    if (!report) return;
    
    // Update the report with the marked action
    const updatedReport = markActionCompleted(report, headlineIndex);
    setReport(updatedReport);
  }, [report]);
  
  const handleDownloadPdf = useCallback(async () => {
    if (!report) return;
    
    try {
      const pdfBlob = await exportReportToPdf(report);
      
      // Create a download link
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `doom-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('PDF export is not yet implemented');
    }
  }, [report]);
  
  const handleSaveToWorkspace = useCallback(async () => {
    if (!report) return;
    
    try {
      const savedReport = await saveReportToWorkspace(report);
      setReport(savedReport);
    } catch (error) {
      console.error('Failed to save report:', error);
      alert('Failed to save report to workspace.');
    }
  }, [report]);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-200 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4 mb-4"
        >
          <h1 className="text-3xl font-bold">💀 Brutal-Truth Diagnostics</h1>
          <div className="text-sm px-2 py-1 bg-red-900/30 text-red-400 rounded">EXPERIMENTAL</div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 max-w-3xl"
        >
          Drop in your financial data and get the brutal truth: 5 brutal headlines, a Doom Clock forecasting days to failure, and 90-minute fixes for each issue.
        </motion.p>
      </div>
      
      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-8 shadow-xl border border-gray-800"
      >
        <h2 className="text-2xl font-bold mb-6">Upload Financial Data</h2>
        
        <DropZone
          onFileAccepted={handleFileAccepted}
          isProcessing={isProcessing}
          maxSize={5 * 1024 * 1024} // 5MB
        />
        
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-900/30 text-red-300 rounded-lg">
            {errorMessage}
          </div>
        )}
      </motion.div>
      
      {/* Report Modal */}
      {report && (
        <ReportModal
          report={report}
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          onMarkActionDone={handleMarkActionDone}
          onDownloadPdf={handleDownloadPdf}
          onSaveToWorkspace={handleSaveToWorkspace}
        />
      )}
    </main>
  );
}
