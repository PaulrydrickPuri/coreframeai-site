/**
 * Simple test parser for Doom-Diag CSV files
 * Uses Node.js instead of browser APIs to test our data structure
 */

const fs = require('fs');
const path = require('path');

/**
 * Process a CSV file and extract financial data
 */
function processCSV(filePath) {
  try {
    console.log(`\n\n========= Processing ${path.basename(filePath)} =========`);
    
    // Read file content
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Parse header
    const header = lines[0].split(',');
    const dateIndex = header.indexOf('Date');
    const typeIndex = header.indexOf('Type');
    const categoryIndex = header.indexOf('Category');
    const descriptionIndex = header.indexOf('Description');
    const amountIndex = header.indexOf('Amount');
    
    // Extract data
    const revenues = [];
    const costs = [];
    const datesSet = new Set();
    
    // Process each line
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',');
      const date = values[dateIndex];
      const type = values[typeIndex];
      const category = values[categoryIndex];
      const description = values[descriptionIndex];
      const amount = parseFloat(values[amountIndex]);
      
      // Add to dates set
      if (date) {
        datesSet.add(date.substr(0, 10)); // YYYY-MM-DD format
      }
      
      // Add to revenues or costs
      if (type && type.toLowerCase() === 'revenue') {
        revenues.push({
          amount,
          date,
          description: `${category} - ${description}`
        });
      } else if (type && type.toLowerCase() === 'cost') {
        costs.push({
          amount,
          date,
          description: `${category} - ${description}`
        });
      }
    }
    
    // Sort dates
    const dates = Array.from(datesSet).sort();
    
    // Basic analysis
    const totalRevenue = revenues.reduce((sum, item) => sum + item.amount, 0);
    const totalCosts = costs.reduce((sum, item) => sum + item.amount, 0);
    const burnRate = totalCosts / (dates.length > 1 ? dates.length - 1 : 1); // Monthly burn rate
    const runway = (totalRevenue / burnRate) * 30; // Days of runway
    
    // Output analysis
    console.log(`File: ${path.basename(filePath)}`);
    console.log(`Revenues: ${revenues.length} entries, total $${totalRevenue.toFixed(2)}`);
    console.log(`Costs: ${costs.length} entries, total $${totalCosts.toFixed(2)}`);
    console.log(`Dates: ${dates.join(', ')}`);
    console.log(`Burn Rate: $${burnRate.toFixed(2)}/month`);
    console.log(`Runway: ${Math.floor(runway)} days`);
    console.log(`Doom Clock: ${Math.floor(runway)} days remaining`);
    
    // Calculate and output major cost categories
    const costsByCategory = {};
    costs.forEach(cost => {
      const category = cost.description.split(' - ')[0];
      if (!costsByCategory[category]) costsByCategory[category] = 0;
      costsByCategory[category] += cost.amount;
    });
    
    console.log('\nTop Cost Categories:');
    const categories = Object.entries(costsByCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    
    categories.forEach(([category, amount], index) => {
      const percentage = (amount / totalCosts * 100).toFixed(1);
      console.log(`  ${index + 1}. ${category}: $${amount.toFixed(2)} (${percentage}%)`);
    });
    
    // Generate mock headlines
    console.log('\nBrutal Headlines:');
    
    // Headline 1: Cash runway
    console.log(`  1. Cash zero in ${Math.floor(runway)} days at current burn rate`);
    
    // Headline 2: Biggest cost leak
    const [topCategory, topAmount] = categories[0];
    console.log(`  2. ${topCategory} bleeding ${(topAmount / totalCosts * 100).toFixed(1)}% of budget: $${topAmount.toFixed(2)}/month`);
    
    // Headline 3: Revenue vs costs
    const cashflow = totalRevenue - totalCosts;
    if (cashflow < 0) {
      console.log(`  3. Monthly deficit: Spending $${Math.abs(cashflow).toFixed(2)} more than earning`);
    } else {
      console.log(`  3. Barely profitable: Only $${cashflow.toFixed(2)} positive cashflow`);
    }
    
    return {
      revenues,
      costs,
      dates,
      analysis: {
        totalRevenue,
        totalCosts,
        burnRate,
        runway: Math.floor(runway)
      }
    };
  } catch (error) {
    console.error('Error processing CSV file:', error);
    throw error;
  }
}

/**
 * Run tests on all CSV files
 */
function runTests() {
  try {
    const fixturesDir = path.join(__dirname, '../fixtures');
    const files = fs.readdirSync(fixturesDir)
                    .filter(file => file.endsWith('.csv'))
                    .map(file => path.join(fixturesDir, file));
    
    files.forEach(file => {
      processCSV(file);
    });
    
    console.log('\nAll CSV files processed successfully!');
  } catch (error) {
    console.error('Test runner error:', error);
  }
}

// Run the tests
runTests();
