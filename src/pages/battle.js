// ============================================
// StartupIQ AI – Battle Simulator Page
// ============================================

import { simulateBattle } from '../ai-engine.js';
import { createBarChart, createRadarChart, destroyAllCharts } from '../components/charts.js';
import { createScoreCircle } from '../components/score-card.js';
import { showToast } from '../components/toast.js';

const industries = ['Technology', 'Healthcare', 'FinTech', 'EdTech', 'E-commerce', 'SaaS', 'AI/ML', 'Blockchain', 'Clean Energy', 'Food & Beverage', 'Real Estate', 'Entertainment', 'Cybersecurity', 'Agriculture', 'Transportation', 'Social Media', 'Gaming', 'Other'];
const fundingStages = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Bootstrapped'];
const teamSizes = ['1', '2-5', '6-10', '11-25', '26-50', '51-100', '100+'];

export function renderBattlePage(container) {
  destroyAllCharts();

  container.innerHTML = `
    <div class="container" style="padding-top:var(--space-8);padding-bottom:var(--space-16)">
      <div class="battle-header">
        <h2>⚔️ Startup <span class="text-gradient">Battle Simulator</span></h2>
        <p style="color:var(--text-secondary);max-width:600px;margin:var(--space-3) auto 0">Compare two startup ideas head-to-head across 6 key dimensions. May the best idea win!</p>
      </div>

      <div class="battle-layout" id="battle-form-area">
        <!-- Startup 1 -->
        <div class="card-gradient" style="padding:var(--space-6)">
          <h3 style="font-size:var(--text-lg);margin-bottom:var(--space-4);color:var(--primary-400)">🔵 Startup A</h3>
          <div class="flex flex-col gap-4">
            <div class="form-group">
              <label class="form-label">Name *</label>
              <input class="form-input" id="b-name-1" placeholder="Startup name" />
            </div>
            <div class="form-group">
              <label class="form-label">Description *</label>
              <textarea class="form-textarea" id="b-desc-1" placeholder="Describe the idea..." style="min-height:80px"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Industry</label>
              <select class="form-select" id="b-industry-1">
                ${industries.map(i => `<option value="${i}">${i}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Funding Stage</label>
              <select class="form-select" id="b-funding-1">
                ${fundingStages.map(f => `<option value="${f}">${f}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Team Size</label>
              <select class="form-select" id="b-team-1">
                ${teamSizes.map(t => `<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- VS -->
        <div class="battle-vs">VS</div>

        <!-- Startup 2 -->
        <div class="card-gradient" style="padding:var(--space-6)">
          <h3 style="font-size:var(--text-lg);margin-bottom:var(--space-4);color:var(--success-400)">🟢 Startup B</h3>
          <div class="flex flex-col gap-4">
            <div class="form-group">
              <label class="form-label">Name *</label>
              <input class="form-input" id="b-name-2" placeholder="Startup name" />
            </div>
            <div class="form-group">
              <label class="form-label">Description *</label>
              <textarea class="form-textarea" id="b-desc-2" placeholder="Describe the idea..." style="min-height:80px"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Industry</label>
              <select class="form-select" id="b-industry-2">
                ${industries.map(i => `<option value="${i}">${i}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Funding Stage</label>
              <select class="form-select" id="b-funding-2">
                ${fundingStages.map(f => `<option value="${f}">${f}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Team Size</label>
              <select class="form-select" id="b-team-2">
                ${teamSizes.map(t => `<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div style="text-align:center;margin-top:var(--space-8)">
        <button class="btn btn-primary btn-lg" id="battle-start-btn">⚔️ Start Battle</button>
      </div>

      <div id="battle-results"></div>
    </div>
  `;

  document.getElementById('battle-start-btn').addEventListener('click', () => {
    const s1 = {
      name: document.getElementById('b-name-1').value.trim() || 'Startup A',
      description: document.getElementById('b-desc-1').value.trim() || 'A new startup idea',
      industry: document.getElementById('b-industry-1').value,
      fundingStage: document.getElementById('b-funding-1').value,
      teamSize: document.getElementById('b-team-1').value,
      country: 'US', targetAudience: '', businessModel: ''
    };
    const s2 = {
      name: document.getElementById('b-name-2').value.trim() || 'Startup B',
      description: document.getElementById('b-desc-2').value.trim() || 'Another startup idea',
      industry: document.getElementById('b-industry-2').value,
      fundingStage: document.getElementById('b-funding-2').value,
      teamSize: document.getElementById('b-team-2').value,
      country: 'US', targetAudience: '', businessModel: ''
    };

    if (!s1.name || !s2.name) {
      showToast('Please enter names for both startups', 'error');
      return;
    }

    const result = simulateBattle(s1, s2);
    renderBattleResults(result);
  });
}

function renderBattleResults(result) {
  const resultsEl = document.getElementById('battle-results');
  const isS1Winner = result.startup1.total >= result.startup2.total;

  resultsEl.innerHTML = `
    <div class="battle-result" style="animation:fadeSlideUp 0.5s ease">
      <div class="battle-winner-badge">🏆 Winner</div>
      <div class="battle-winner-name text-gradient">${result.winner}</div>
      <p style="color:var(--text-tertiary);margin-top:var(--space-2)">Won by ${result.margin} points • ${result.competitiveAdvantage}</p>
    </div>

    <div class="grid grid-2 mt-8 mb-6">
      <div class="card text-center" style="border-top:3px solid ${isS1Winner ? 'var(--success-500)' : 'var(--border-secondary)'}">
        <h4 style="color:var(--primary-400);margin-bottom:var(--space-3)">${result.startup1.name}</h4>
        ${createScoreCircle(result.startup1.average, 'Average', 100)}
        <div style="font-size:var(--text-sm);color:var(--text-tertiary);margin-top:var(--space-2)">Total: ${result.startup1.total}</div>
      </div>
      <div class="card text-center" style="border-top:3px solid ${!isS1Winner ? 'var(--success-500)' : 'var(--border-secondary)'}">
        <h4 style="color:var(--success-400);margin-bottom:var(--space-3)">${result.startup2.name}</h4>
        ${createScoreCircle(result.startup2.average, 'Average', 100)}
        <div style="font-size:var(--text-sm);color:var(--text-tertiary);margin-top:var(--space-2)">Total: ${result.startup2.total}</div>
      </div>
    </div>

    <div class="charts-row mb-6">
      <div class="chart-container"><div class="chart-title">Head-to-Head Comparison</div><div id="chart-battle-bar"></div></div>
      <div class="chart-container"><div class="chart-title">Radar Comparison</div><div id="chart-battle-radar"></div></div>
    </div>

    <div class="card">
      <h4 style="font-size:var(--text-base);margin-bottom:var(--space-4)">Category Breakdown</h4>
      ${result.verdicts.map(v => `
        <div class="flex items-center justify-between" style="padding:var(--space-3) 0;border-bottom:1px solid var(--border-secondary)">
          <span style="font-size:var(--text-sm);color:var(--text-primary);font-weight:var(--font-medium)">${v.category}</span>
          <div class="flex items-center gap-4">
            <span style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:${v.score1 >= v.score2 ? 'var(--primary-400)' : 'var(--text-tertiary)'}">${v.score1}</span>
            <div class="progress-bar" style="width:120px">
              <div style="height:100%;width:${v.score1}%;background:var(--primary-500);border-radius:var(--radius-full) 0 0 var(--radius-full);float:left"></div>
            </div>
            <div class="progress-bar" style="width:120px">
              <div style="height:100%;width:${v.score2}%;background:var(--success-500);border-radius:var(--radius-full) 0 0 var(--radius-full);float:left"></div>
            </div>
            <span style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:${v.score2 >= v.score1 ? 'var(--success-400)' : 'var(--text-tertiary)'}">${v.score2}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Charts
  setTimeout(() => {
    createBarChart('chart-battle-bar', {
      labels: result.categories,
      datasets: [
        { label: result.startup1.name, data: result.startup1.scores, color: '#6366f1' },
        { label: result.startup2.name, data: result.startup2.scores, color: '#10b981' }
      ]
    });

    createRadarChart('chart-battle-radar', {
      labels: result.categories,
      values: result.startup1.scores,
      label: result.startup1.name
    });
  }, 100);
}
