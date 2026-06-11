// ============================================
// StartupIQ AI – Analyzer Page (All 18 Modules)
// ============================================

import { store } from '../store.js';
import { router } from '../router.js';
import { generateFullReport, getScoreColor } from '../ai-engine.js';
import { createScoreCircle, createScoreCard, createProgressItem, createMetricCard } from '../components/score-card.js';
import { createRadarChart, createBarChart, createLineChart, createDoughnutChart, createPieChart, destroyAllCharts } from '../components/charts.js';
import { createDataTable } from '../components/data-table.js';
import { showToast } from '../components/toast.js';

const industries = ['Technology', 'Healthcare', 'FinTech', 'EdTech', 'E-commerce', 'SaaS', 'AI/ML', 'Blockchain', 'Clean Energy', 'Food & Beverage', 'Real Estate', 'Entertainment', 'Cybersecurity', 'Agriculture', 'Transportation', 'Social Media', 'Gaming', 'Other'];
const fundingStages = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Bootstrapped', 'Other'];
const teamSizes = ['1', '2-5', '6-10', '11-25', '26-50', '51-100', '100+'];
const businessModels = ['SaaS', 'Marketplace', 'Subscription', 'Freemium', 'E-commerce', 'Advertising', 'Licensing', 'Commission', 'Other'];

const moduleList = [
  { id: 'ideaValidation', name: 'Idea Validation', icon: '🎯', num: '01' },
  { id: 'innovationScore', name: 'Innovation Score', icon: '💡', num: '02' },
  { id: 'competitorAnalysis', name: 'Competitor Analysis', icon: '🔍', num: '03' },
  { id: 'riskDetection', name: 'Risk Detection', icon: '⚠️', num: '04' },
  { id: 'successPrediction', name: 'Success Prediction', icon: '📈', num: '05' },
  { id: 'revenueForecasting', name: 'Revenue Forecast', icon: '💰', num: '06' },
  { id: 'investorReadiness', name: 'Investor Readiness', icon: '🏦', num: '07' },
  { id: 'fundingRequirement', name: 'Funding Needs', icon: '💵', num: '08' },
  { id: 'patentPossibility', name: 'Patent Check', icon: '📜', num: '09' },
  { id: 'globalExpansion', name: 'Global Expansion', icon: '🌍', num: '10' },
  { id: 'timelineSimulation', name: 'Timeline Simulator', icon: '⏱️', num: '11' },
  { id: 'survivalPrediction', name: 'Survival Engine', icon: '🛡️', num: '12' },
  { id: 'unicornPotential', name: 'Unicorn Potential', icon: '🦄', num: '13' },
  { id: 'researchGaps', name: 'Research Gaps', icon: '🔬', num: '14' },
  { id: 'coFounderMatching', name: 'Co-Founder Match', icon: '👥', num: '15' },
  { id: 'pitchDeckEvaluation', name: 'Pitch Deck', icon: '📑', num: '16' },
  { id: 'analyticsInsights', name: 'Analytics', icon: '📊', num: '17' },
];

let currentReport = null;
let activeModule = 'ideaValidation';

export function renderAnalyzerPage(container, params = {}) {
  destroyAllCharts();

  // Check if loading existing project
  if (params.project) {
    const project = store.getProject(params.project);
    if (project && project.report) {
      currentReport = project.report;
      renderReport(container);
      return;
    }
  }

  renderForm(container, params);
}

function renderForm(container, params) {
  container.innerHTML = `
    <div class="container" style="padding-top:var(--space-8);padding-bottom:var(--space-16)">
      <div class="section-header">
        <h2>🚀 Startup <span class="text-gradient">Analyzer</span></h2>
        <p>Enter your startup details and our 18 AI engines will generate a comprehensive analysis report.</p>
      </div>

      <div class="analyzer-form">
        <div class="card-gradient" style="padding:var(--space-8)">
          <form id="analyzer-form">
            <div class="form-grid">
              <div class="form-group" style="grid-column:1/-1">
                <label class="form-label" for="startup-name">Startup Name *</label>
                <input class="form-input" type="text" id="startup-name" placeholder="e.g., TechVenture AI" required value="${params.name ? decodeURIComponent(params.name) : ''}" />
              </div>

              <div class="form-group" style="grid-column:1/-1">
                <label class="form-label" for="startup-desc">Description *</label>
                <textarea class="form-textarea" id="startup-desc" placeholder="Describe your startup idea, what problem it solves, and how it works..." required></textarea>
              </div>

              <div class="form-group">
                <label class="form-label" for="startup-industry">Industry *</label>
                <select class="form-select" id="startup-industry" required>
                  <option value="">Select industry</option>
                  ${industries.map(i => `<option value="${i}">${i}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="startup-audience">Target Audience</label>
                <input class="form-input" type="text" id="startup-audience" placeholder="e.g., Small businesses, Gen-Z" />
              </div>

              <div class="form-group">
                <label class="form-label" for="startup-model">Business Model</label>
                <select class="form-select" id="startup-model">
                  <option value="">Select model</option>
                  ${businessModels.map(m => `<option value="${m}">${m}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="startup-country">Country</label>
                <input class="form-input" type="text" id="startup-country" placeholder="e.g., United States" />
              </div>

              <div class="form-group">
                <label class="form-label" for="startup-funding">Funding Stage</label>
                <select class="form-select" id="startup-funding">
                  <option value="">Select stage</option>
                  ${fundingStages.map(f => `<option value="${f}">${f}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="startup-team">Team Size</label>
                <select class="form-select" id="startup-team">
                  <option value="">Select size</option>
                  ${teamSizes.map(t => `<option value="${t}">${t}</option>`).join('')}
                </select>
              </div>
            </div>

            <div style="margin-top:var(--space-6);text-align:center">
              <button type="submit" class="btn btn-primary btn-lg" id="generate-btn">
                🤖 Generate AI Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById('analyzer-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const startup = {
      name: document.getElementById('startup-name').value.trim(),
      description: document.getElementById('startup-desc').value.trim(),
      industry: document.getElementById('startup-industry').value,
      targetAudience: document.getElementById('startup-audience').value.trim(),
      businessModel: document.getElementById('startup-model').value,
      country: document.getElementById('startup-country').value.trim(),
      fundingStage: document.getElementById('startup-funding').value,
      teamSize: document.getElementById('startup-team').value,
    };

    if (!startup.name || !startup.description || !startup.industry) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    await runAnalysis(container, startup);
  });
}

async function runAnalysis(container, startup) {
  // Show loading
  const steps = [
    'Validating startup idea...', 'Calculating innovation score...', 'Analyzing competitors...',
    'Detecting risks...', 'Predicting success probability...', 'Forecasting revenue...',
    'Evaluating investor readiness...', 'Computing funding needs...',
    'Checking patent possibilities...', 'Analyzing global expansion...',
    'Simulating timeline...', 'Predicting survival...', 'Analyzing unicorn potential...',
    'Finding research gaps...', 'Matching co-founders...', 'Evaluating pitch deck...',
    'Generating analytics...', 'Compiling report...'
  ];

  container.innerHTML = `
    <div class="container" style="padding:var(--space-16) 0;text-align:center">
      <h2 style="margin-bottom:var(--space-2)">🤖 Analyzing <span class="text-gradient">${startup.name}</span></h2>
      <p style="color:var(--text-tertiary);margin-bottom:var(--space-8)">Our 18 AI engines are working their magic...</p>
      <div class="analysis-progress" id="analysis-progress">
        ${steps.map((step, i) => `
          <div class="analysis-step" id="step-${i}">
            <div class="analysis-step-icon">⏳</div>
            <div class="analysis-step-text">${step}</div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top:var(--space-6)">
        <div class="progress-bar" style="max-width:500px;margin:0 auto">
          <div class="progress-bar-fill" id="analysis-progress-bar" style="width:0%;transition:width 0.3s ease"></div>
        </div>
      </div>
    </div>
  `;

  // Animate steps
  for (let i = 0; i < steps.length; i++) {
    await new Promise(r => setTimeout(r, 120));
    const stepEl = document.getElementById(`step-${i}`);
    if (!stepEl) return;
    // Complete previous
    if (i > 0) {
      const prev = document.getElementById(`step-${i - 1}`);
      if (prev) { prev.classList.remove('active'); prev.classList.add('completed'); prev.querySelector('.analysis-step-icon').textContent = '✓'; }
    }
    stepEl.classList.add('active');
    stepEl.querySelector('.analysis-step-icon').textContent = '⚙';
    const bar = document.getElementById('analysis-progress-bar');
    if (bar) bar.style.width = `${((i + 1) / steps.length) * 100}%`;
  }

  // Complete last step
  const lastStep = document.getElementById(`step-${steps.length - 1}`);
  if (lastStep) { lastStep.classList.remove('active'); lastStep.classList.add('completed'); lastStep.querySelector('.analysis-step-icon').textContent = '✓'; }

  await new Promise(r => setTimeout(r, 300));

  // Generate report
  currentReport = generateFullReport(startup);

  // Save to store
  const overallScore = currentReport.modules.ideaValidation.validationScore;
  const project = store.addProject({ startup, report: currentReport, overallScore });
  store.addToHistory({ name: startup.name, industry: startup.industry, score: overallScore });

  showToast('Analysis complete!', 'success');
  renderReport(container);
}

function renderReport(container) {
  if (!currentReport) return;
  const { startup, modules } = currentReport;
  activeModule = 'ideaValidation';

  container.innerHTML = `
    <div class="container" style="padding-top:var(--space-6);padding-bottom:var(--space-16)">
      <!-- Report Header -->
      <div class="card-gradient" style="padding:var(--space-6);margin-bottom:var(--space-6)">
        <div class="flex items-center justify-between" style="flex-wrap:wrap;gap:var(--space-4)">
          <div class="flex items-center gap-4">
            <div style="width:56px;height:56px;border-radius:var(--radius-xl);background:var(--gradient-accent);display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:white;font-weight:800">
              ${(startup.name || 'S').charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style="font-size:var(--text-2xl);margin-bottom:2px">${startup.name}</h2>
              <div class="flex gap-2" style="flex-wrap:wrap">
                <span class="badge badge-primary">${startup.industry}</span>
                ${startup.fundingStage ? `<span class="badge badge-info">${startup.fundingStage}</span>` : ''}
                ${startup.country ? `<span class="badge" style="background:rgba(255,255,255,0.05);color:var(--text-tertiary)">${startup.country}</span>` : ''}
              </div>
            </div>
          </div>
          <div class="flex gap-3">
            <button class="btn btn-secondary btn-sm" id="save-report-btn">💾 Save Report</button>
            <button class="btn btn-secondary btn-sm" id="export-pdf-btn">📄 Export PDF</button>
            <button class="btn btn-ghost btn-sm" id="new-analysis-btn">+ New Analysis</button>
          </div>
        </div>
      </div>

      <!-- Report Layout -->
      <div class="report-layout">
        <!-- Sidebar Navigation -->
        <nav class="report-nav" id="report-nav">
          ${moduleList.map(m => `
            <button class="report-nav-item ${m.id === activeModule ? 'active' : ''}" data-module="${m.id}">
              <span class="nav-num">${m.num}</span>
              <span class="nav-icon">${m.icon}</span>
              <span>${m.name}</span>
            </button>
          `).join('')}
        </nav>

        <!-- Module Content -->
        <div id="module-content"></div>
      </div>
    </div>
  `;

  // Render first module
  renderModuleContent(modules);

  // Nav clicks
  document.querySelectorAll('.report-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      activeModule = btn.dataset.module;
      document.querySelectorAll('.report-nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      destroyAllCharts();
      renderModuleContent(modules);
    });
  });

  // Actions
  document.getElementById('save-report-btn').addEventListener('click', () => {
    store.saveReport({ name: startup.name, report: currentReport });
    showToast('Report saved!', 'success');
  });

  document.getElementById('export-pdf-btn').addEventListener('click', async () => {
    showToast('Preparing PDF...', 'info');
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const el = document.getElementById('module-content');
      html2pdf().set({
        margin: [10, 10],
        filename: `${startup.name}-StartupIQ-Report.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(el).save();
      showToast('PDF exported!', 'success');
    } catch {
      showToast('PDF export requires html2pdf.js', 'error');
    }
  });

  document.getElementById('new-analysis-btn').addEventListener('click', () => {
    currentReport = null;
    destroyAllCharts();
    router.navigate('/analyzer');
  });
}

function renderModuleContent(modules) {
  const contentEl = document.getElementById('module-content');
  if (!contentEl) return;

  const renderers = {
    ideaValidation: renderIdeaValidation,
    innovationScore: renderInnovationScore,
    competitorAnalysis: renderCompetitorAnalysis,
    riskDetection: renderRiskDetection,
    successPrediction: renderSuccessPrediction,
    revenueForecasting: renderRevenueForecasting,
    investorReadiness: renderInvestorReadiness,
    fundingRequirement: renderFundingRequirement,
    patentPossibility: renderPatentPossibility,
    globalExpansion: renderGlobalExpansion,
    timelineSimulation: renderTimelineSimulation,
    survivalPrediction: renderSurvivalPrediction,
    unicornPotential: renderUnicornPotential,
    researchGaps: renderResearchGaps,
    coFounderMatching: renderCoFounderMatching,
    pitchDeckEvaluation: renderPitchDeckEvaluation,
    analyticsInsights: renderAnalyticsInsights,
  };

  const render = renderers[activeModule];
  if (render) {
    contentEl.innerHTML = '<div class="module-section active">' + render(modules) + '</div>';
    // Initialize charts after DOM update
    setTimeout(() => initModuleCharts(activeModule, modules), 50);
  }
}

// ---- MODULE RENDERERS ----

function renderIdeaValidation(m) {
  const d = m.ideaValidation;
  return `
    <div class="module-header">
      <div class="module-icon">🎯</div>
      <div>
        <div class="module-title">Idea Validation Engine</div>
        <div class="module-subtitle">Comprehensive feasibility and market fit analysis</div>
      </div>
      <div style="margin-left:auto">
        <span class="badge ${d.validationScore >= 70 ? 'badge-success' : d.validationScore >= 50 ? 'badge-warning' : 'badge-danger'}" style="font-size:var(--text-sm);padding:var(--space-2) var(--space-4)">
          ${d.overallVerdict}
        </span>
      </div>
    </div>

    <div class="metric-grid mb-6 stagger-children">
      ${createScoreCard('Validation Score', d.validationScore, 'Overall idea viability', '🎯')}
      ${createScoreCard('Strength Score', d.strengthScore, 'Key strengths rating', '💪')}
      ${createScoreCard('Weakness Score', d.weaknessScore, 'Areas for improvement', '🔧')}
    </div>

    <div class="charts-row mb-6">
      <div class="chart-container">
        <div class="chart-title">Validation Metrics</div>
        <div id="chart-validation-radar"></div>
      </div>
      <div class="chart-container">
        <div class="chart-title">Score Breakdown</div>
        <div id="chart-validation-bar"></div>
      </div>
    </div>

    <div class="grid grid-2">
      <div class="card" style="border-left:3px solid var(--success-500)">
        <h4 style="font-size:var(--text-base);color:var(--success-400);margin-bottom:var(--space-3)">💪 Strengths</h4>
        ${d.strengths.map(s => `<div style="font-size:var(--text-sm);color:var(--text-secondary);padding:var(--space-2) 0;border-bottom:1px solid var(--border-secondary)">✓ ${s}</div>`).join('')}
      </div>
      <div class="card" style="border-left:3px solid var(--warning-500)">
        <h4 style="font-size:var(--text-base);color:var(--warning-400);margin-bottom:var(--space-3)">⚠️ Weaknesses</h4>
        ${d.weaknesses.map(w => `<div style="font-size:var(--text-sm);color:var(--text-secondary);padding:var(--space-2) 0;border-bottom:1px solid var(--border-secondary)">△ ${w}</div>`).join('')}
      </div>
    </div>
  `;
}

function renderInnovationScore(m) {
  const d = m.innovationScore;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(139,92,246,0.1)">💡</div>
      <div><div class="module-title">Innovation Score Calculator</div><div class="module-subtitle">Novelty detection and uniqueness analysis</div></div>
    </div>
    <div class="flex items-center justify-center mb-6" style="gap:var(--space-8);flex-wrap:wrap">
      ${createScoreCircle(d.innovationScore, 'Innovation', 140)}
      ${createScoreCircle(d.uniqueness, 'Uniqueness', 110)}
      ${createScoreCircle(d.differentiation, 'Differentiation', 110)}
    </div>
    <div class="charts-row mb-6">
      <div class="chart-container"><div class="chart-title">Innovation Radar</div><div id="chart-innovation-radar"></div></div>
      <div class="chart-container"><div class="chart-title">Innovation Breakdown</div><div id="chart-innovation-bar"></div></div>
    </div>
    <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">Similar Startups</h4>
    ${createDataTable(['Name', 'Similarity', 'Key Difference'], d.similarStartups.map(s => [s.name, s.similarity + '%', s.diff]))}
  `;
}

function renderCompetitorAnalysis(m) {
  const d = m.competitorAnalysis;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(59,130,246,0.1)">🔍</div>
      <div><div class="module-title">Competitor Analysis Engine</div><div class="module-subtitle">Market positioning and opportunity discovery</div></div>
      <div style="margin-left:auto">${createScoreCircle(d.opportunityScore, 'Opportunity', 80)}</div>
    </div>
    <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">Top Competitors</h4>
    ${createDataTable(
      ['Competitor', 'Market Share', 'Revenue', 'Funding', 'Rating', 'Strengths'],
      d.competitors.map(c => [
        `<strong>${c.name}</strong>`,
        c.marketShare,
        c.revenue,
        c.funding,
        '⭐ ' + c.rating,
        c.strengths.join(', ')
      ])
    )}
    <div class="charts-row mt-6 mb-6">
      <div class="chart-container"><div class="chart-title">Market Positioning</div><div id="chart-competitor-bar"></div></div>
      <div class="chart-container"><div class="chart-title">Competitor Weaknesses</div><div id="chart-competitor-weakness"></div></div>
    </div>
    <div class="grid grid-2">
      <div class="card" style="border-left:3px solid var(--primary-500)">
        <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">🔓 Market Gaps</h4>
        ${d.marketGaps.map(g => `<div style="font-size:var(--text-sm);color:var(--text-secondary);padding:var(--space-2) 0">• ${g}</div>`).join('')}
      </div>
      <div class="card" style="border-left:3px solid var(--success-500)">
        <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">🎯 Untapped Opportunities</h4>
        ${d.untappedOpportunities.map(o => `<div style="font-size:var(--text-sm);color:var(--text-secondary);padding:var(--space-2) 0">• ${o}</div>`).join('')}
      </div>
    </div>
  `;
}

function renderRiskDetection(m) {
  const d = m.riskDetection;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(245,158,11,0.1)">⚠️</div>
      <div><div class="module-title">Risk Detection Engine</div><div class="module-subtitle">Multi-dimensional risk assessment</div></div>
      <div style="margin-left:auto">${createScoreCircle(100 - d.overallRisk, 'Safety', 80)}</div>
    </div>
    <div class="mb-6">
      <h4 style="font-size:var(--text-base);margin-bottom:var(--space-4)">Risk Heatmap</h4>
      <div style="display:grid;grid-template-columns:120px repeat(3,1fr);gap:var(--space-2)">
        <div></div>
        ${d.heatmapData.categories.map(c => `<div style="text-align:center;font-size:var(--text-xs);font-weight:var(--font-semibold);color:var(--text-tertiary);padding:var(--space-2)">${c}</div>`).join('')}
        ${d.heatmapData.risks.map(r => `
          <div style="font-size:var(--text-sm);font-weight:var(--font-medium);color:var(--text-secondary);padding:var(--space-2);display:flex;align-items:center">${r.name}</div>
          <div class="heat-cell ${r.impact >= 4 ? 'heat-critical' : r.impact >= 3 ? 'heat-high' : r.impact >= 2 ? 'heat-medium' : 'heat-low'}">${r.impact}/5</div>
          <div class="heat-cell ${r.likelihood >= 4 ? 'heat-critical' : r.likelihood >= 3 ? 'heat-high' : r.likelihood >= 2 ? 'heat-medium' : 'heat-low'}">${r.likelihood}/5</div>
          <div class="heat-cell ${r.urgency >= 4 ? 'heat-critical' : r.urgency >= 3 ? 'heat-high' : r.urgency >= 2 ? 'heat-medium' : 'heat-low'}">${r.urgency}/5</div>
        `).join('')}
      </div>
    </div>
    <div class="card mb-6" style="padding:var(--space-5)">
      <h4 style="font-size:var(--text-base);margin-bottom:var(--space-4)">Risk Levels</h4>
      ${d.riskEntries.map(r => createProgressItem(r.name, r.score, r.color)).join('')}
    </div>
    <div class="grid grid-2">
      <div class="card" style="border-left:3px solid var(--danger-500)">
        <h4 style="font-size:var(--text-base);color:var(--danger-400);margin-bottom:var(--space-3)">🚨 Red Flags</h4>
        ${d.redFlags.map(f => `<div style="font-size:var(--text-sm);color:var(--text-secondary);padding:var(--space-2) 0">• ${f}</div>`).join('')}
      </div>
      <div class="card" style="border-left:3px solid var(--success-500)">
        <h4 style="font-size:var(--text-base);color:var(--success-400);margin-bottom:var(--space-3)">🛡️ Mitigation Strategies</h4>
        ${d.mitigations.slice(0, 4).map(m => `<div style="font-size:var(--text-sm);color:var(--text-secondary);padding:var(--space-2) 0"><strong>${m.risk}:</strong> ${m.suggestion}</div>`).join('')}
      </div>
    </div>
  `;
}

function renderSuccessPrediction(m) {
  const d = m.successPrediction;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(16,185,129,0.1)">📈</div>
      <div><div class="module-title">Success Prediction Engine</div><div class="module-subtitle">${d.prediction}</div></div>
    </div>
    <div class="flex items-center justify-center mb-6" style="gap:var(--space-8);flex-wrap:wrap">
      ${createScoreCircle(d.successProbability, 'Success %', 140)}
      ${createScoreCircle(d.growthPotential, 'Growth', 110)}
      ${createScoreCircle(d.confidence, 'Confidence', 110)}
    </div>
    <div class="charts-row mb-6">
      <div class="chart-container"><div class="chart-title">Success vs Failure</div><div id="chart-success-doughnut"></div></div>
      <div class="chart-container"><div class="chart-title">Success Factors</div><div id="chart-success-bar"></div></div>
    </div>
    <div class="card">
      <h4 style="font-size:var(--text-base);margin-bottom:var(--space-4)">Contributing Factors</h4>
      ${d.factors.map(f => createProgressItem(`${f.name} (${f.weight}% weight)`, f.score, getScoreColor(f.score))).join('')}
    </div>
  `;
}

function renderRevenueForecasting(m) {
  const d = m.revenueForecasting;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(16,185,129,0.1)">💰</div>
      <div><div class="module-title">Revenue Forecasting Engine</div><div class="module-subtitle">5-year financial projections</div></div>
    </div>
    <div class="metric-grid mb-6 stagger-children">
      ${createMetricCard('Year 1 Revenue', d.year1Formatted, '', null, '📊')}
      ${createMetricCard('Year 3 Revenue', d.year3Formatted, '', null, '📈')}
      ${createMetricCard('Year 5 Revenue', d.year5Formatted, '', null, '🚀')}
      ${createMetricCard('Growth Rate', d.growthRate, '', null, '📉')}
    </div>
    <div class="charts-row mb-6">
      <div class="chart-container"><div class="chart-title">Revenue Forecast</div><div id="chart-revenue-line"></div></div>
      <div class="chart-container"><div class="chart-title">Revenue vs Profit</div><div id="chart-revenue-bar"></div></div>
    </div>
    <div class="grid grid-3">
      ${createMetricCard('Profit Margin', d.profitMargin, '', null, '💵')}
      ${createMetricCard('ROI', d.roi, '', null, '🎯')}
      ${createMetricCard('Profit Estimate (Y3)', d.profitEstimate, '', null, '💰')}
    </div>
  `;
}

function renderInvestorReadiness(m) {
  const d = m.investorReadiness;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(99,102,241,0.1)">🏦</div>
      <div><div class="module-title">Investor Readiness Analyzer</div><div class="module-subtitle">Level: ${d.fundingReadinessLevel} ${d.attractivenessRating}</div></div>
    </div>
    <div class="flex items-center justify-center mb-6">${createScoreCircle(d.readinessScore, 'Readiness', 150)}</div>
    <div class="chart-container mb-6"><div class="chart-title">Investor Readiness Radar</div><div id="chart-investor-radar"></div></div>
    <div class="card">
      <h4 style="font-size:var(--text-base);margin-bottom:var(--space-4)">📋 Improvement Suggestions</h4>
      ${d.suggestions.map((s, i) => `<div style="font-size:var(--text-sm);color:var(--text-secondary);padding:var(--space-2) 0;border-bottom:1px solid var(--border-secondary)"><span style="color:var(--primary-400);font-weight:600">${i + 1}.</span> ${s}</div>`).join('')}
    </div>
  `;
}

function renderFundingRequirement(m) {
  const d = m.fundingRequirement;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(245,158,11,0.1)">💵</div>
      <div><div class="module-title">Funding Requirement Predictor</div><div class="module-subtitle">Total: ${d.totalFormatted}</div></div>
    </div>
    <div class="charts-row mb-6">
      <div class="chart-container"><div class="chart-title">Cost Breakdown</div><div id="chart-funding-pie"></div></div>
      <div class="chart-container"><div class="chart-title">Quarterly Budget</div><div id="chart-funding-bar"></div></div>
    </div>
    <div class="card">
      <h4 style="font-size:var(--text-base);margin-bottom:var(--space-4)">Budget Breakdown</h4>
      ${d.breakdown.map(b => `
        <div class="flex items-center justify-between" style="padding:var(--space-3) 0;border-bottom:1px solid var(--border-secondary)">
          <div class="flex items-center gap-3">
            <div style="width:12px;height:12px;border-radius:50%;background:${b.color}"></div>
            <span style="font-size:var(--text-sm);color:var(--text-primary)">${b.name}</span>
          </div>
          <div class="flex items-center gap-4">
            <span style="font-size:var(--text-sm);font-weight:var(--font-semibold)">${b.formatted}</span>
            <span class="badge badge-primary">${b.percent}%</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderPatentPossibility(m) {
  const d = m.patentPossibility;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(139,92,246,0.1)">📜</div>
      <div><div class="module-title">Patent Possibility Checker</div><div class="module-subtitle">Intellectual property analysis</div></div>
    </div>
    <div class="flex items-center justify-center mb-6" style="gap:var(--space-6);flex-wrap:wrap">
      ${createScoreCircle(d.patentEligibility, 'Eligibility', 120)}
      ${createScoreCircle(d.ipOpportunity, 'IP Opportunity', 120)}
      ${createScoreCircle(d.novelConcept, 'Novel Concept', 120)}
    </div>
    <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">IP Opportunities</h4>
    <div class="grid grid-2 mb-6">
      ${d.opportunities.map(o => `
        <div class="card hover-lift">
          <div class="flex justify-between items-center mb-2">
            <span style="font-weight:var(--font-semibold);font-size:var(--text-sm)">${o.type}</span>
            <span class="badge" style="background:${getScoreColor(o.potential)}20;color:${getScoreColor(o.potential)}">${o.potential}%</span>
          </div>
          <p style="font-size:var(--text-xs);color:var(--text-tertiary)">${o.description}</p>
          <div class="progress-bar mt-2"><div class="progress-bar-fill" style="width:${o.potential}%;background:${getScoreColor(o.potential)}"></div></div>
        </div>
      `).join('')}
    </div>
    <div class="card">
      <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">🛡️ Recommendations</h4>
      ${d.recommendations.map(r => `<div style="font-size:var(--text-sm);color:var(--text-secondary);padding:var(--space-2) 0">• ${r}</div>`).join('')}
    </div>
  `;
}

function renderGlobalExpansion(m) {
  const d = m.globalExpansion;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(6,182,212,0.1)">🌍</div>
      <div><div class="module-title">Global Expansion Predictor</div><div class="module-subtitle">Expansion Score: ${d.expansionScore}/100</div></div>
    </div>
    <div class="chart-container mb-6"><div class="chart-title">Market Suitability by Country</div><div id="chart-expansion-bar"></div></div>
    ${createDataTable(
      ['Rank', 'Country', 'Region', 'Suitability', 'Market Size', 'Growth', 'Challenges'],
      d.rankings.map((r, i) => [
        `#${i + 1}`,
        `<strong>${r.name}</strong>`,
        r.region,
        `<span class="badge" style="background:${getScoreColor(r.suitability)}20;color:${getScoreColor(r.suitability)}">${r.suitability}</span>`,
        r.marketSize + '%', r.growth + '%',
        r.challenges.join(', ')
      ]),
      { title: 'Country Rankings' }
    )}
  `;
}

function renderTimelineSimulation(m) {
  const d = m.timelineSimulation;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(99,102,241,0.1)">⏱️</div>
      <div><div class="module-title">Startup Timeline Simulator</div><div class="module-subtitle">Multi-scenario growth projection</div></div>
    </div>
    <div class="chart-container mb-6"><div class="chart-title">Growth Scenarios (5 Years)</div><div id="chart-timeline-line"></div></div>
    <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">Key Milestones</h4>
    <div class="grid grid-3 stagger-children">
      ${d.milestones.map(ms => `
        <div class="card hover-lift text-center" style="padding:var(--space-5)">
          <div style="font-size:2rem;margin-bottom:var(--space-2)">${ms.icon}</div>
          <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">${ms.event}</div>
          <div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-top:var(--space-1)">${ms.time}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderSurvivalPrediction(m) {
  const d = m.survivalPrediction;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(16,185,129,0.1)">🛡️</div>
      <div><div class="module-title">Startup Survival Engine</div><div class="module-subtitle">Verdict: ${d.verdict}</div></div>
    </div>
    <div class="flex items-center justify-center mb-6" style="gap:var(--space-6);flex-wrap:wrap">
      ${createScoreCircle(d.survival1yr, '1-Year', 120)}
      ${createScoreCircle(d.survival3yr, '3-Year', 120)}
      ${createScoreCircle(d.survival5yr, '5-Year', 120)}
    </div>
    <div class="chart-container mb-6"><div class="chart-title">Survival Probability Over Time</div><div id="chart-survival-line"></div></div>
    <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">Risk Timeline</h4>
    <div class="card">
      ${d.riskTimeline.map(r => `
        <div class="flex items-center justify-between" style="padding:var(--space-3) 0;border-bottom:1px solid var(--border-secondary)">
          <div><span style="font-size:var(--text-sm);font-weight:var(--font-medium);color:var(--text-primary)">${r.period}</span> <span class="badge badge-primary" style="margin-left:var(--space-2)">${r.phase}</span></div>
          <div class="flex items-center gap-3">
            <div class="progress-bar" style="width:100px"><div class="progress-bar-fill" style="width:${r.risk}%;background:${getScoreColor(100 - r.risk)}"></div></div>
            <span style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:${getScoreColor(100 - r.risk)}">${r.risk}%</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderUnicornPotential(m) {
  const d = m.unicornPotential;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(139,92,246,0.1)">🦄</div>
      <div><div class="module-title">Unicorn Potential Analyzer</div><div class="module-subtitle">${d.category}</div></div>
    </div>
    <div class="flex items-center justify-center mb-6">${createScoreCircle(d.unicornScore, 'Unicorn Score', 160)}</div>
    <div class="metric-grid mb-6">
      ${createMetricCard('Current Valuation', d.currentValuation, '', null, '💰')}
      ${createMetricCard('Projected (5yr)', d.projectedValuation, '', null, '📈')}
      ${createMetricCard('Multiplier', d.valuationMultiplier, '', null, '🔢')}
    </div>
    <div class="chart-container mb-6"><div class="chart-title">Valuation Growth Trajectory</div><div id="chart-unicorn-line"></div></div>
    <div class="card">
      <h4 style="font-size:var(--text-base);margin-bottom:var(--space-4)">Contributing Factors</h4>
      ${d.factors.map(f => createProgressItem(f.name, f.score, getScoreColor(f.score))).join('')}
    </div>
  `;
}

function renderResearchGaps(m) {
  const d = m.researchGaps;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(6,182,212,0.1)">🔬</div>
      <div><div class="module-title">Research Gap & Opportunity Finder</div><div class="module-subtitle">Innovation opportunity discovery system</div></div>
    </div>
    <div class="metric-grid mb-6 stagger-children">
      ${d.dashboardScores.map(s => `
        <div class="card hover-lift text-center" style="padding:var(--space-5)">
          ${createScoreCircle(s.value, s.label, 90)}
        </div>
      `).join('')}
    </div>
    <div class="charts-row mb-6">
      <div class="chart-container"><div class="chart-title">Opportunity Radar</div><div id="chart-research-radar"></div></div>
      <div class="chart-container"><div class="chart-title">Emerging Tech Opportunities</div><div id="chart-research-bar"></div></div>
    </div>
    <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">Research Gaps Identified</h4>
    <div class="grid grid-2 mb-6">
      ${d.gaps.map(g => `
        <div class="card hover-lift" style="border-left:3px solid ${getScoreColor(g.score)}">
          <div class="flex justify-between items-center mb-1">
            <span style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">${g.area}</span>
            <span class="badge" style="background:${getScoreColor(g.score)}20;color:${getScoreColor(g.score)}">${g.score}</span>
          </div>
          <p style="font-size:var(--text-xs);color:var(--text-tertiary)">${g.gap}</p>
        </div>
      `).join('')}
    </div>
    <div class="card">
      <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">🚀 High-Potential Directions</h4>
      ${d.highPotentialDirections.map(h => `<div style="font-size:var(--text-sm);color:var(--text-secondary);padding:var(--space-2) 0">→ ${h}</div>`).join('')}
    </div>
  `;
}

function renderCoFounderMatching(m) {
  const d = m.coFounderMatching;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(244,63,94,0.1)">👥</div>
      <div><div class="module-title">Co-Founder Matching Engine</div><div class="module-subtitle">Team completeness: ${d.completeness}%</div></div>
    </div>
    <div class="flex items-center justify-center mb-6">${createScoreCircle(d.teamReadiness, 'Team Readiness', 140)}</div>
    <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">Ideal Team Structure</h4>
    <div class="grid grid-auto-fit mb-6 stagger-children" style="--min-col:200px">
      ${d.roles.map(r => `
        <div class="card hover-lift text-center" style="padding:var(--space-5);border-top:3px solid ${r.filled ? 'var(--success-500)' : 'var(--warning-500)'}">
          <div style="font-size:2rem;margin-bottom:var(--space-2)">${r.icon}</div>
          <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">${r.title}</div>
          <div class="badge ${r.filled ? 'badge-success' : 'badge-warning'}" style="margin-top:var(--space-2)">${r.filled ? 'Filled' : 'Needed'}</div>
          <div style="margin-top:var(--space-2);font-size:var(--text-xs);color:var(--text-tertiary)">${r.skills.join(' • ')}</div>
        </div>
      `).join('')}
    </div>
    ${d.hiringRecommendations.length > 0 ? `
      <div class="card">
        <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">📋 Hiring Recommendations</h4>
        ${d.hiringRecommendations.map(h => `
          <div style="padding:var(--space-3) 0;border-bottom:1px solid var(--border-secondary)">
            <div class="flex items-center justify-between">
              <span style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">${h.role}</span>
              <div class="flex gap-2">
                <span class="badge ${h.priority === 'Critical' ? 'badge-danger' : h.priority === 'High' ? 'badge-warning' : 'badge-info'}">${h.priority}</span>
                <span style="font-size:var(--text-xs);color:var(--text-tertiary)">${h.timeline}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

function renderPitchDeckEvaluation(m) {
  const d = m.pitchDeckEvaluation;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(245,158,11,0.1)">📑</div>
      <div><div class="module-title">AI Pitch Deck Evaluator</div><div class="module-subtitle">Investor attractiveness: ${d.investorAttractiveness}/100</div></div>
    </div>
    <div class="flex items-center justify-center mb-6" style="gap:var(--space-6)">
      ${createScoreCircle(d.overallScore, 'Deck Score', 140)}
      ${createScoreCircle(d.investorAttractiveness, 'Investor Appeal', 110)}
    </div>
    <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">Slide-by-Slide Feedback</h4>
    <div class="flex flex-col gap-3 mb-6">
      ${d.slides.map(s => `
        <div class="card" style="padding:var(--space-4)">
          <div class="flex items-center justify-between mb-2">
            <span style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">${s.name}</span>
            <span class="badge" style="background:${getScoreColor(s.score)}20;color:${getScoreColor(s.score)}">${s.score}/100</span>
          </div>
          <div class="progress-bar mb-2"><div class="progress-bar-fill" style="width:${s.score}%;background:${getScoreColor(s.score)}"></div></div>
          <p style="font-size:var(--text-xs);color:var(--text-tertiary)">${s.feedback}</p>
        </div>
      `).join('')}
    </div>
    <div class="card">
      <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">💡 Improvement Suggestions</h4>
      ${d.improvements.map(i => `<div style="font-size:var(--text-sm);color:var(--text-secondary);padding:var(--space-2) 0">• ${i}</div>`).join('')}
    </div>
  `;
}

function renderAnalyticsInsights(m) {
  const d = m.analyticsInsights;
  return `
    <div class="module-header">
      <div class="module-icon" style="background:rgba(99,102,241,0.1)">📊</div>
      <div><div class="module-title">Analytics & Insights Center</div><div class="module-subtitle">AI-generated startup intelligence</div></div>
    </div>
    <div class="metric-grid mb-6 stagger-children">
      ${d.kpis.map(k => createMetricCard(k.label, k.value, k.unit, k.trend, '📈')).join('')}
    </div>
    <div class="chart-container mb-6"><div class="chart-title">Monthly Performance</div><div id="chart-analytics-line"></div></div>
    <h4 style="font-size:var(--text-base);margin-bottom:var(--space-3)">AI-Generated Insights</h4>
    <div class="flex flex-col gap-3 stagger-children">
      ${d.insights.map(ins => `
        <div class="alert alert-${ins.type === 'opportunity' ? 'success' : ins.type === 'warning' ? 'warning' : ins.type === 'recommendation' ? 'info' : 'info'}">
          <div>
            <div style="font-weight:var(--font-semibold);margin-bottom:var(--space-1)">${ins.title}</div>
            <div style="font-size:var(--text-sm);opacity:0.9">${ins.text}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ---- CHART INITIALIZATION ----

function initModuleCharts(moduleId, modules) {
  const m = modules;

  switch (moduleId) {
    case 'ideaValidation': {
      const d = m.ideaValidation;
      createRadarChart('chart-validation-radar', { labels: d.metrics.map(m => m.label), values: d.metrics.map(m => m.value), label: 'Score' });
      createBarChart('chart-validation-bar', { labels: d.metrics.map(m => m.label), values: d.metrics.map(m => m.value), label: 'Score' });
      break;
    }
    case 'innovationScore': {
      const d = m.innovationScore;
      createRadarChart('chart-innovation-radar', d.radarData);
      createBarChart('chart-innovation-bar', { labels: d.radarData.labels, values: d.radarData.values, label: 'Score' });
      break;
    }
    case 'competitorAnalysis': {
      const d = m.competitorAnalysis;
      createBarChart('chart-competitor-bar', {
        labels: d.positioningData.labels,
        datasets: [
          { label: 'Innovation', data: d.positioningData.innovation, color: '#6366f1' },
          { label: 'Market Presence', data: d.positioningData.marketPresence, color: '#10b981' }
        ]
      });
      createBarChart('chart-competitor-weakness', {
        labels: d.competitors.map(c => c.name),
        values: d.competitors.map((_, i) => 100 - d.positioningData.innovation[i]),
        label: 'Weakness Score',
        colors: d.competitors.map(() => '#ef4444')
      });
      break;
    }
    case 'successPrediction': {
      const d = m.successPrediction;
      createDoughnutChart('chart-success-doughnut', { labels: ['Success', 'Failure'], values: [d.successProbability, d.failureRisk], colors: ['#10b981', '#ef4444'] });
      createBarChart('chart-success-bar', { labels: d.factors.map(f => f.name), values: d.factors.map(f => f.score), label: 'Factor Score' });
      break;
    }
    case 'revenueForecasting': {
      const d = m.revenueForecasting;
      createLineChart('chart-revenue-line', { labels: d.chartData.labels, datasets: [
        { label: 'Revenue', data: d.chartData.revenue, color: '#6366f1' },
        { label: 'Profit', data: d.chartData.profit, color: '#10b981' }
      ]});
      createBarChart('chart-revenue-bar', { labels: d.chartData.labels, datasets: [
        { label: 'Revenue', data: d.chartData.revenue, color: '#3b82f6' },
        { label: 'Profit', data: d.chartData.profit, color: '#10b981' }
      ]});
      break;
    }
    case 'investorReadiness': {
      const d = m.investorReadiness;
      createRadarChart('chart-investor-radar', d.radarData);
      break;
    }
    case 'fundingRequirement': {
      const d = m.fundingRequirement;
      createPieChart('chart-funding-pie', { labels: d.breakdown.map(b => b.name), values: d.breakdown.map(b => b.value), colors: d.breakdown.map(b => b.color) });
      createBarChart('chart-funding-bar', { labels: d.budgetTimeline.labels, values: d.budgetTimeline.values, label: 'Budget' });
      break;
    }
    case 'globalExpansion': {
      const d = m.globalExpansion;
      createBarChart('chart-expansion-bar', { labels: d.chartData.labels, datasets: [
        { label: 'Suitability', data: d.chartData.suitability, color: '#6366f1' },
        { label: 'Growth', data: d.chartData.growth, color: '#10b981' }
      ]});
      break;
    }
    case 'timelineSimulation': {
      const d = m.timelineSimulation;
      createLineChart('chart-timeline-line', { labels: d.chartData.labels, datasets: d.chartData.datasets.map(ds => ({ ...ds, fill: false })) });
      break;
    }
    case 'survivalPrediction': {
      const d = m.survivalPrediction;
      createLineChart('chart-survival-line', { labels: d.chartData.labels, datasets: [
        { label: 'Survival', data: d.chartData.survival, color: '#10b981' },
        { label: 'Risk', data: d.chartData.risk, color: '#ef4444' }
      ]});
      break;
    }
    case 'unicornPotential': {
      const d = m.unicornPotential;
      createLineChart('chart-unicorn-line', { labels: d.growthTrajectory.labels, values: d.growthTrajectory.values, label: 'Valuation' });
      break;
    }
    case 'researchGaps': {
      const d = m.researchGaps;
      createRadarChart('chart-research-radar', d.radarData);
      createBarChart('chart-research-bar', { labels: d.emergingTech.map(t => t.name), values: d.emergingTech.map(t => t.opportunity), label: 'Opportunity Score' });
      break;
    }
    case 'analyticsInsights': {
      const d = m.analyticsInsights;
      createLineChart('chart-analytics-line', { labels: d.monthlyData.labels, datasets: [
        { label: 'Health Score', data: d.monthlyData.scores, color: '#6366f1' },
        { label: 'Growth %', data: d.monthlyData.growth, color: '#10b981', fill: false }
      ]});
      break;
    }
  }
}
