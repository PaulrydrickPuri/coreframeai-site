/**
 * Cypress End-to-End Tests for Brutal-Truth Diagnostics
 */
/// <reference types="cypress" />

describe('Brutal-Truth Diagnostics', () => {
  beforeEach(() => {
    // Visit the Doom-Diag page
    cy.visit('/projects/doom-diag');
    
    // Ensure the page has loaded
    cy.contains('Brutal-Truth Diagnostics');
  });

  it('should load the stub page correctly', () => {
    // The main title should be visible
    cy.contains('h1', 'Brutal-Truth Diagnostics').should('be.visible');
    
    // Should have the experimental badge
    cy.contains('EXPERIMENTAL').should('be.visible');
    
    // Should have the file upload zone
    cy.contains('Upload Financial Data').should('be.visible');
  });

  it('should allow file upload and show report modal in <15s', () => {
    // Create a sample financial PDF file for testing
    const testFile = {
      fileName: 'sample-financial.pdf',
      fileType: 'application/pdf',
      contents: Cypress.Buffer.from('test content')
    };
    
    // Stub the processing functions to avoid actual file processing
    cy.window().then((win) => {
      cy.stub(win, 'fetch').resolves({
        ok: true,
        json: () => Promise.resolve({
          revenues: [{ amount: 10000, date: '2025-01-01', description: 'Revenue' }],
          costs: [{ amount: 15000, date: '2025-01-01', description: 'Costs' }],
          dates: ['2025-01-01'],
          metadata: { fileName: 'test.pdf', extractionTime: '2025-01-01', rowCount: 2 }
        })
      });
    });
    
    // Upload the file by dropping it on the dropzone
    cy.get('[data-testid="file-dropzone"]').selectFile(testFile, { action: 'drag-drop' });
    
    // The report modal should appear within 15 seconds
    cy.get('[data-testid="report-modal"]', { timeout: 15000 }).should('be.visible');
    
    // DoomClock should be visible with a days number
    cy.get('[data-testid="doom-clock"]').within(() => {
      cy.get('[data-testid="days-remaining"]')
        .invoke('text')
        .should('match', /\d+/)
        .and('not.eq', '0');
    });
    
    // Should be able to see the 5 headlines
    cy.get('[data-testid="headline-card"]').should('have.length', 5);
    
    // Test that PDF download button exists
    cy.contains('Download PDF').should('be.visible');
  });
  
  it('should mark actions as done and update doom clock', () => {
    // Create a sample financial PDF file for testing
    const testFile = {
      fileName: 'sample-financial.pdf',
      fileType: 'application/pdf',
      contents: Cypress.Buffer.from('test content')
    };
    
    // Stub the processing functions to avoid actual file processing
    cy.window().then((win) => {
      cy.stub(win, 'fetch').resolves({
        ok: true,
        json: () => Promise.resolve({
          revenues: [{ amount: 10000, date: '2025-01-01', description: 'Revenue' }],
          costs: [{ amount: 15000, date: '2025-01-01', description: 'Costs' }],
          dates: ['2025-01-01'],
          metadata: { fileName: 'test.pdf', extractionTime: '2025-01-01', rowCount: 2 }
        })
      });
    });
    
    // Upload the file by dropping it on the dropzone
    cy.get('[data-testid="file-dropzone"]').selectFile(testFile, { action: 'drag-drop' });
    
    // The report modal should appear
    cy.get('[data-testid="report-modal"]', { timeout: 15000 }).should('be.visible');
    
    // Get the initial doom days value
    // Modify the modal to track days remaining
    let initialDays = 0;
    cy.get('[data-testid="doom-days"]').invoke('text').then((text) => {
      const matches = text.match(/\d+/);
      initialDays = matches ? parseInt(matches[0], 10) : 0;
    });
    
    // Click "Mark as Done" on the first headline
    cy.get('[data-testid="headline-card"]').first().within(() => {
      cy.contains('Mark as Done').click();
    });
    
    // Verify that the doom days value has increased
    cy.get('[data-testid="days-remaining"]')
      .invoke('text')
      .then((text) => {
        const newDays = parseInt(text);
        expect(newDays).to.be.greaterThan(initialDays);
      });
    
    // Verify that the action is now marked as completed
    cy.get('[data-testid="headline-card"]').first().within(() => {
      cy.contains('Completed').should('be.visible');
    });
  });
});
