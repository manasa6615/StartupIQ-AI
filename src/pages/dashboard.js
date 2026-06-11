// ============================================
// StartupIQ AI – Dashboard Page
// ============================================

import { store } from '../store.js';
import { router } from '../router.js';
import { createScoreCard, createMetricCard } from '../components/score-card.js';
import { showToast } from '../components/toast.js';

export function renderDashboardPage(container) {
  const user = store.get('user');
  const projects = store.get('projects') || [];
  const history = store.get('history') || [];
  const savedReports = store.get('savedReports') || [];

  const totalAnalyses = projects.length;
  const avgScore = projects.length > 0
    ? Math.round(projects.reduce((s, p) => s + (p.overallScore || 0), 0) / projects.length)
    : 0;

  container.innerHTML = `
    <div class="container" style="padding-top:var(--space-8);padding-bottom:var(--space-8)">
      <!-- Welcome -->
      <div class="dashboard-welcome">
        <div class="dashboard-avatar">${(user.name || 'U').charAt(0).toUpperCase()}</div>
        <div>
          <h2>Welcome back, ${user.name || 'Entrepreneur'}</h2>
          <p style="color:var(--text-tertiary)">Here's an overview of your startup analyses and insights.</p>
        </div>
        <div style="margin-left:auto">
          <button class="btn btn-primary" id="dash-new-analysis">🚀 New Analysis</button>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-4 mb-8 stagger-children">
        ${createMetricCard('Total Analyses', totalAnalyses, '', null, '📊')}
        ${createMetricCard('Average Score', avgScore || '—', totalAnalyses > 0 ? '/100' : '', null, '⭐')}
        ${createMetricCard('Saved Reports', savedReports.length, '', null, '💾')}
        ${createMetricCard('This Month', projects.filter(p => {
          const d = new Date(p.createdAt);
          const now = new Date();
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).length, '', null, '📅')}
      </div>

      <div class="grid grid-2" style="gap:var(--space-6)">
        <!-- Projects List -->
        <div>
          <h3 style="font-size:var(--text-lg);margin-bottom:var(--space-4)">Recent Projects</h3>
          <div class="flex flex-col gap-3" id="projects-list">
            ${projects.length > 0 ? projects.slice(0, 8).map(p => `
              <div class="card project-card" data-id="${p.id}">
                <div class="project-icon">🚀</div>
                <div class="project-info">
                  <div class="project-name">${p.startup?.name || 'Unnamed'}</div>
                  <div class="project-date">${new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${p.startup?.industry || 'General'}</div>
                </div>
                <div class="project-score" style="color:${(p.overallScore || 0) >= 70 ? 'var(--success-400)' : (p.overallScore || 0) >= 50 ? 'var(--warning-400)' : 'var(--danger-400)'}">
                  ${p.overallScore || '—'}
                </div>
              </div>
            `).join('') : `
              <div class="card empty-state">
                <div class="empty-state-icon">📋</div>
                <div class="empty-state-title">No projects yet</div>
                <div class="empty-state-text">Create your first startup analysis to see it here.</div>
                <button class="btn btn-primary mt-4" id="empty-new-analysis">Start Analysis</button>
              </div>
            `}
          </div>
        </div>

        <!-- Right Column -->
        <div>
          <!-- Saved Reports -->
          <h3 style="font-size:var(--text-lg);margin-bottom:var(--space-4)">Saved Reports</h3>
          <div class="flex flex-col gap-3 mb-8" id="saved-reports-list">
            ${savedReports.length > 0 ? savedReports.slice(0, 5).map(r => `
              <div class="card flex items-center gap-4" style="padding:var(--space-4)">
                <div style="font-size:1.25rem">📄</div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.name || 'Report'}</div>
                  <div style="font-size:var(--text-xs);color:var(--text-tertiary)">${new Date(r.savedAt).toLocaleDateString()}</div>
                </div>
                <button class="btn btn-ghost btn-sm delete-report-btn" data-id="${r.id}">🗑️</button>
              </div>
            `).join('') : `
              <div class="card" style="padding:var(--space-6);text-align:center">
                <p style="font-size:var(--text-sm);color:var(--text-tertiary)">No saved reports yet</p>
              </div>
            `}
          </div>

          <!-- AI Recommendations -->
          <h3 style="font-size:var(--text-lg);margin-bottom:var(--space-4)">AI Recommendations</h3>
          <div class="flex flex-col gap-3 stagger-children">
            <div class="card" style="padding:var(--space-4);border-left:3px solid var(--primary-500)">
              <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">💡 Try the Battle Simulator</div>
              <p style="font-size:var(--text-xs);margin-top:var(--space-1)">Compare two startup ideas head-to-head to find the stronger concept.</p>
            </div>
            <div class="card" style="padding:var(--space-4);border-left:3px solid var(--success-500)">
              <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">📊 Explore Analytics</div>
              <p style="font-size:var(--text-xs);margin-top:var(--space-1)">View detailed analytics and AI-generated insights for your projects.</p>
            </div>
            <div class="card" style="padding:var(--space-4);border-left:3px solid var(--violet-500)">
              <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">🦄 Unicorn Check</div>
              <p style="font-size:var(--text-xs);margin-top:var(--space-1)">Run a full analysis to discover your startup's unicorn potential.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Analysis History -->
      ${history.length > 0 ? `
        <div style="margin-top:var(--space-8)">
          <h3 style="font-size:var(--text-lg);margin-bottom:var(--space-4)">Analysis History</h3>
          <div class="card" style="overflow-x:auto;padding:0">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Startup</th>
                  <th>Industry</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                ${history.slice(0, 10).map(h => `
                  <tr>
                    <td style="font-weight:var(--font-medium);color:var(--text-primary)">${h.name || '—'}</td>
                    <td>${h.industry || '—'}</td>
                    <td><span class="badge ${(h.score || 0) >= 70 ? 'badge-success' : (h.score || 0) >= 50 ? 'badge-warning' : 'badge-danger'}">${h.score || '—'}</span></td>
                    <td>${new Date(h.date).toLocaleDateString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Events
  document.getElementById('dash-new-analysis')?.addEventListener('click', () => router.navigate('/analyzer'));
  document.getElementById('empty-new-analysis')?.addEventListener('click', () => router.navigate('/analyzer'));

  // Project click
  document.querySelectorAll('.project-card[data-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      router.navigate(`/analyzer?project=${id}`);
    });
  });

  // Delete report
  document.querySelectorAll('.delete-report-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      store.deleteReport(btn.dataset.id);
      showToast('Report deleted', 'success');
      renderDashboardPage(container);
    });
  });
}
