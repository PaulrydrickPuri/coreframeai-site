/**
 * ReportModal component
 * Display the complete doom report with download/save options
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DoomReport } from '../core/report';
import HeadlineCard from './HeadlineCard';
import DoomClock from './DoomClock';
import confetti from 'canvas-confetti';

interface ReportModalProps {
  report: DoomReport;
  isOpen: boolean;
  onClose: () => void;
  onMarkActionDone: (headlineIndex: number) => void;
  onDownloadPdf: () => void;
  onSaveToWorkspace: () => void;
  getReportElement?: (element: HTMLDivElement | null) => void;
}

export default function ReportModal({
  report,
  isOpen,
  onClose,
  onMarkActionDone,
  onDownloadPdf,
  onSaveToWorkspace,
  getReportElement
}: ReportModalProps) {
  // Create a ref for the report content to use with PDF export
  const reportContentRef = useRef<HTMLDivElement>(null);
  const [hasShownConfetti, setHasShownConfetti] = useState(false);
  
  // Trigger confetti on first open (once per session)
  useEffect(() => {
    if (isOpen && !hasShownConfetti) {
      // Fire the confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
      setHasShownConfetti(true);
    }
  }, [isOpen, hasShownConfetti]);

  // Provide the report content element to the parent component when available
  useEffect(() => {
    if (isOpen && reportContentRef.current && getReportElement) {
      getReportElement(reportContentRef.current);
    }
  }, [isOpen, getReportElement]);
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative bg-gray-900 rounded-lg max-w-4xl w-full mx-auto shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-900 to-red-700 p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Brutal-Truth Diagnostics</h2>
                <button
                  onClick={onClose}
                  className="text-gray-300 hover:text-white"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
              <div className="text-gray-300 text-sm">
                {report.fileName} • Generated on {new Date(report.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              {/* Summary and Doom Clock section */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Financial summary */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-4">Financial Overview</h3>
                  <div ref={reportContentRef} className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-10">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400">Revenue</div>
                        <div className="text-lg text-white">
                          {new Intl.NumberFormat('en-MY', { 
                            style: 'currency', 
                            currency: 'MYR',
                            maximumFractionDigits: 0
                          }).format(report.financialSummary.totalRevenue)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Costs</div>
                        <div className="text-lg text-white">
                          {new Intl.NumberFormat('en-MY', { 
                            style: 'currency', 
                            currency: 'MYR',
                            maximumFractionDigits: 0
                          }).format(report.financialSummary.totalCosts)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Monthly Burn</div>
                        <div className="text-lg text-white">
                          {new Intl.NumberFormat('en-MY', { 
                            style: 'currency', 
                            currency: 'MYR',
                            maximumFractionDigits: 0
                          }).format(report.financialSummary.burnRate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Runway</div>
                        <div className="text-lg text-white">
                          {report.financialSummary.runway} days
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Doom Clock */}
                <div className="flex-1 flex justify-center">
                  <DoomClock
                    daysRemaining={report.doomClock.daysRemaining}
                    confidenceScore={report.doomClock.confidenceScore}
                    optimisticDays={report.doomClock.projections.optimistic}
                    pessimisticDays={report.doomClock.projections.pessimistic}
                  />
                </div>
              </div>
              
              {/* Brutal Headlines */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Brutal Financial Truths
                </h3>
                
                <div className="space-y-4">
                  {report.brutalHeadlines.map((headline, index) => (
                    <HeadlineCard 
                      key={index}
                      headline={headline}
                      index={index}
                      onMarkDone={() => onMarkActionDone(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Footer / Actions */}
            <div className="border-t border-gray-800 p-4 flex justify-between">
              <div className="text-sm text-gray-400">
                Complete actions to extend your Doom Clock
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onDownloadPdf}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center"
                >
                  <span className="mr-2">📄</span> Download PDF
                </button>
                
                <button
                  onClick={onSaveToWorkspace}
                  className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-md flex items-center"
                >
                  <span className="mr-2">💾</span> Save to Workspace
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
