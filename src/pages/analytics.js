// ============================================
// StartupIQ AI – Analytics & Insights Center
// ============================================

import { store } from '../store.js';
import { createBarChart, createLineChart, createDoughnutChart, destroyAllCharts } from '../components/charts.js';
import { createMetricCard } from '../components/score-card.js';

export function renderAnalyticsPage(container) {
  destroyAllCharts();
  const projects = store.get('projects') || [];
  const history = store.get('history') || [];

  // Aggregate stats
  const totalAnalyses = projects.length;
  const avgScore = totalAnalyses > 0 ? Math.round(projects.reduce((s, p) => s + (p.overallScore || 0), 0) / totalAnalyses) : 0;
  const topIndustries = {};
  projects.forEach(p => {
    const ind = p.startup?.industry || 'Other';
    topIndustries[ind] = (topIndustries[ind] || 0) + 1;
  });

  // Monthly analysis counts
  const monthCounts = Array(12).fill(0);
  projects.forEach(p => {
    const d = new Date(p.createdAt);
    if (d.getFullYear() === new Date().getFullYear()) {
      monthCounts[d.getMonth()]++;
    }
  });

  container.innerHTML = `
    <div class="container" style="padding-top:var(--space-8);padding-bottom:var(--space-16)">
      <div class="section-header" style="margin-bottom:var(--space-8)">
        <h2>📊 Analytics & <span class="text-gradient">Insights Center</span></h2>
        <p>Track your analysis patterns, performance metrics, and AI-generated insights across all your projects.</p>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-4 mb-8 stagger-children">
        ${createMetricCard('Total Analyses', totalAnalyses, '', null, '📊')}
        ${createMetricCard('Average Score', avgScore || '—', totalAnalyses > 0 ? '/100' : '', null, '⭐')}
        ${createMetricCard('Best Score', totalAnalyses > 0 ? Math.max(...projects.map(p => p.overallScore || 0)) : '—', '', null, '🏆')}
        ${createMetricCard('Industries', Object.keys(topIndustries).length, '', null, '🏭')}
      </div>

      <!-- Charts -->
      <div class="charts-row mb-8">
        <div class="chart-container">
          <div class="chart-title">Monthly Analysis Trend</div>
          <div id="chart-analytics-monthly"></div>
        </div>
        <div class="chart-container">
          <div class="chart-title">Score Distribution</div>
          <div id="chart-analytics-scores"></div>
        </div>
      </div>

      <div class="charts-row mb-8">
        <div class="chart-container">
          <div class="chart-title">Industry Breakdown</div>
          <div id="chart-analytics-industry"></div>
        </div>
        <div class="chart-container">
          <div class="chart-title">Analysis Performance</div>
          <div id="chart-analytics-performance"></div>
        </div>
      </div>

      <!-- AI Insights -->
      <h3 style="font-size:var(--text-lg);margin-bottom:var(--space-4)">🤖 AI-Generated Insights</h3>
      <div class="grid grid-2 stagger-children">
        <div class="card" style="border-left:3px solid var(--success-500);padding:var(--space-5)">
          <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--success-400);margin-bottom:var(--space-2)">📈 Growth Trend</div>
          <p style="font-size:var(--text-sm)">Your analysis volume has ${totalAnalyses > 3 ? 'increased' : 'room to grow'}. ${totalAnalyses > 0 ? `Average score of ${avgScore}/100 indicates ${avgScore >= 70 ? 'strong' : avgScore >= 50 ? 'moderate' : 'developing'} startup quality.` : 'Start analyzing to see trends.'}</p>
        </div>
        <div class="card" style="border-left:3px solid var(--primary-500);padding:var(--space-5)">
          <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--primary-400);margin-bottom:var(--space-2)">💡 Recommendation</div>
          <p style="font-size:var(--text-sm)">${totalAnalyses === 0 ? 'Start with your first startup analysis to unlock insights.' : totalAnalyses < 5 ? 'Analyze more startups to build meaningful patterns.' : 'Consider using the Battle Simulator to compare your top ideas.'}</p>
        </div>
        <div class="card" style="border-left:3px solid var(--violet-500);padding:var(--space-5)">
          <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--violet-400);margin-bottom:var(--space-2)">🏭 Industry Focus</div>
          <p style="font-size:var(--text-sm)">${Object.keys(topIndustries).length > 0 ? `Your most analyzed industry is ${Object.entries(topIndustries).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}. Consider diversifying your portfolio analysis.` : 'No industry data yet. Analyze startups across different sectors.'}</p>
        </div>
        <div class="card" style="border-left:3px solid var(--warning-500);padding:var(--space-5)">
          <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--warning-400);margin-bottom:var(--space-2)">⚡ Quick Action</div>
          <p style="font-size:var(--text-sm)">Export your best-scoring reports to share with investors and stakeholders. Use the Dashboard to manage saved reports.</p>
        </div>
      </div>

      ${totalAnalyses === 0 ? `
        <div class="card empty-state mt-8">
          <div class="empty-state-icon">📊</div>
          <div class="empty-state-title">No analytics data yet</div>
          <div class="empty-state-text">Analyze at least one startup to see charts and insights here.</div>
          <a href="#/analyzer" class="btn btn-primary mt-4">🚀 Start Analyzing</a>
        </div>
      ` : ''}
    </div>
  `;

  // Initialize charts
  setTimeout(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    createLineChart('chart-analytics-monthly', {
      labels: months, values: monthCounts, label: 'Analyses'
    });

    // Score distribution
    const scoreBuckets = [0, 0, 0, 0, 0]; // 0-20, 21-40, 41-60, 61-80, 81-100
    projects.forEach(p => {
      const s = p.overallScore || 0;
      const idx = Math.min(4, Math.floor(s / 20));
      scoreBuckets[idx]++;
    });
    createBarChart('chart-analytics-scores', {
      labels: ['0-20', '21-40', '41-60', '61-80', '81-100'],
      values: scoreBuckets,
      label: 'Count',
      colors: ['#ef4444', '#f59e0b', '#3b82f6', '#6366f1', '#10b981']
    });

    // Industry breakdown
    const indLabels = Object.keys(topIndustries).slice(0, 6);
    const indValues = indLabels.map(l => topIndustries[l]);
    if (indLabels.length > 0) {
      createDoughnutChart('chart-analytics-industry', {
        labels: indLabels, values: indValues
      });
    }

    // Performance over time
    const perfData = projects.slice(0, 12).reverse().map(p => p.overallScore || 0);
    const perfLabels = projects.slice(0, 12).reverse().map((p, i) => `#${i + 1}`);
    createLineChart('chart-analytics-performance', {
      labels: perfLabels, values: perfData, label: 'Score'
    });
  }, 100);
}
