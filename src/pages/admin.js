// ============================================
// StartupIQ AI – Admin Panel
// ============================================

import { store } from '../store.js';
import { createMetricCard } from '../components/score-card.js';
import { createBarChart, createLineChart, destroyAllCharts } from '../components/charts.js';
import { showToast } from '../components/toast.js';

export function renderAdminPage(container) {
  destroyAllCharts();
  const admin = store.get('admin');
  const projects = store.get('projects') || [];
  const savedReports = store.get('savedReports') || [];

  // Mock users data
  const mockUsers = [
    { id: 1, name: 'Sarah Kim', email: 'sarah@payflow.io', plan: 'Pro', analyses: 47, joined: '2025-08-15', status: 'Active' },
    { id: 2, name: 'Marcus Rodriguez', email: 'marcus@datastream.com', plan: 'Enterprise', analyses: 89, joined: '2025-06-22', status: 'Active' },
    { id: 3, name: 'Alex Patel', email: 'alex@venture.fund', plan: 'Pro', analyses: 34, joined: '2025-09-10', status: 'Active' },
    { id: 4, name: 'Emily Chen', email: 'emily@techlab.ai', plan: 'Free', analyses: 12, joined: '2025-11-03', status: 'Inactive' },
    { id: 5, name: 'David Wilson', email: 'david@startup.co', plan: 'Pro', analyses: 56, joined: '2025-07-18', status: 'Active' },
    { id: 6, name: 'Lisa Thompson', email: 'lisa@innovate.io', plan: 'Enterprise', analyses: 78, joined: '2025-05-30', status: 'Active' },
    { id: 7, name: 'James Lee', email: 'james@growth.vc', plan: 'Free', analyses: 8, joined: '2026-01-15', status: 'Active' },
    { id: 8, name: 'Nina Garcia', email: 'nina@scaleup.com', plan: 'Pro', analyses: 41, joined: '2025-10-22', status: 'Inactive' },
  ];

  // Mock feedback
  const mockFeedback = [
    { user: 'Sarah Kim', rating: 5, text: 'Incredible tool! The competitor analysis is spot-on.', date: '2026-06-10' },
    { user: 'Marcus Rodriguez', rating: 4, text: 'Great insights. Would love more export options.', date: '2026-06-09' },
    { user: 'Emily Chen', rating: 5, text: 'The unicorn potential analyzer is amazing!', date: '2026-06-08' },
    { user: 'David Wilson', rating: 4, text: 'Very useful for our investor presentations.', date: '2026-06-07' },
  ];

  container.innerHTML = `
    <div class="container" style="padding-top:var(--space-8);padding-bottom:var(--space-16)">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2>🛡️ Admin <span class="text-gradient">Panel</span></h2>
          <p style="color:var(--text-tertiary);font-size:var(--text-sm)">Platform management and analytics monitoring</p>
        </div>
        <div class="flex gap-3">
          <button class="btn btn-secondary btn-sm" id="admin-export-btn">📊 Export Data</button>
          <button class="btn btn-primary btn-sm" id="admin-refresh-btn">🔄 Refresh</button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="admin-stats stagger-children">
        <div class="card admin-stat-card hover-lift">
          <div class="admin-stat-icon" style="background:rgba(99,102,241,0.1);color:var(--primary-400)">👥</div>
          <div class="stat-card-value">${admin.totalUsers.toLocaleString()}</div>
          <div class="stat-card-label">Total Users</div>
          <span class="stat-card-change positive">↑ 12.5%</span>
        </div>
        <div class="card admin-stat-card hover-lift">
          <div class="admin-stat-icon" style="background:rgba(16,185,129,0.1);color:var(--success-400)">📊</div>
          <div class="stat-card-value">${admin.totalReports.toLocaleString()}</div>
          <div class="stat-card-label">Total Reports</div>
          <span class="stat-card-change positive">↑ 8.3%</span>
        </div>
        <div class="card admin-stat-card hover-lift">
          <div class="admin-stat-icon" style="background:rgba(59,130,246,0.1);color:var(--accent-400)">🟢</div>
          <div class="stat-card-value">${admin.activeToday}</div>
          <div class="stat-card-label">Active Today</div>
          <span class="stat-card-change positive">↑ 5.2%</span>
        </div>
        <div class="card admin-stat-card hover-lift">
          <div class="admin-stat-icon" style="background:rgba(245,158,11,0.1);color:var(--warning-400)">💬</div>
          <div class="stat-card-value">${admin.feedbackCount}</div>
          <div class="stat-card-label">Feedback</div>
          <span class="stat-card-change positive">↑ 15.0%</span>
        </div>
      </div>

      <!-- Charts -->
      <div class="charts-row mb-8">
        <div class="chart-container">
          <div class="chart-title">User Growth (Monthly)</div>
          <div id="chart-admin-users"></div>
        </div>
        <div class="chart-container">
          <div class="chart-title">Reports Generated (Monthly)</div>
          <div id="chart-admin-reports"></div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs mb-6" id="admin-tabs">
        <button class="tab-btn active" data-tab="users">👥 Users</button>
        <button class="tab-btn" data-tab="reports">📊 Reports</button>
        <button class="tab-btn" data-tab="feedback">💬 Feedback</button>
        <button class="tab-btn" data-tab="settings">⚙️ Settings</button>
      </div>

      <!-- Tab Content -->
      <div id="admin-tab-content">
        <!-- Users Tab (default) -->
        <div class="card" style="overflow-x:auto;padding:0">
          <div style="padding:var(--space-4);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border-secondary)">
            <h4 style="font-size:var(--text-base)">User Management</h4>
            <input class="form-input" style="max-width:250px" placeholder="Search users..." id="admin-search-users" />
          </div>
          <table class="data-table" id="admin-users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Analyses</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${mockUsers.map(u => `
                <tr>
                  <td style="font-weight:var(--font-medium);color:var(--text-primary)">${u.name}</td>
                  <td>${u.email}</td>
                  <td><span class="badge ${u.plan === 'Enterprise' ? 'badge-primary' : u.plan === 'Pro' ? 'badge-success' : 'badge-info'}">${u.plan}</span></td>
                  <td>${u.analyses}</td>
                  <td>${u.joined}</td>
                  <td><span class="badge ${u.status === 'Active' ? 'badge-success' : 'badge-warning'}">${u.status}</span></td>
                  <td><button class="btn btn-ghost btn-sm">⋮</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAdminTab(btn.dataset.tab, mockUsers, mockFeedback, projects, savedReports);
    });
  });

  // Search
  document.getElementById('admin-search-users')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('#admin-users-table tbody tr').forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  });

  // Buttons
  document.getElementById('admin-export-btn').addEventListener('click', () => showToast('Data exported successfully', 'success'));
  document.getElementById('admin-refresh-btn').addEventListener('click', () => {
    showToast('Data refreshed', 'info');
    renderAdminPage(container);
  });

  // Charts
  setTimeout(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    createLineChart('chart-admin-users', {
      labels: months,
      values: [180, 220, 310, 420, 530, 680, 850, 1020, 1350, 1780, 2280, 2847],
      label: 'Users'
    });
    createBarChart('chart-admin-reports', {
      labels: months,
      values: [450, 620, 880, 1100, 1320, 1580, 1900, 2100, 2450, 2800, 3250, 3800],
      label: 'Reports'
    });
  }, 100);
}

function renderAdminTab(tab, users, feedback, projects, reports) {
  const content = document.getElementById('admin-tab-content');

  switch (tab) {
    case 'users':
      // Re-render users table (already shown by default, refresh page)
      content.innerHTML = `
        <div class="card" style="overflow-x:auto;padding:0">
          <div style="padding:var(--space-4);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border-secondary)">
            <h4 style="font-size:var(--text-base)">User Management</h4>
          </div>
          <table class="data-table">
            <thead><tr><th>User</th><th>Email</th><th>Plan</th><th>Analyses</th><th>Status</th></tr></thead>
            <tbody>
              ${users.map(u => `<tr><td style="font-weight:500;color:var(--text-primary)">${u.name}</td><td>${u.email}</td><td><span class="badge ${u.plan === 'Enterprise' ? 'badge-primary' : u.plan === 'Pro' ? 'badge-success' : 'badge-info'}">${u.plan}</span></td><td>${u.analyses}</td><td><span class="badge ${u.status === 'Active' ? 'badge-success' : 'badge-warning'}">${u.status}</span></td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      `;
      break;

    case 'reports':
      content.innerHTML = `
        <div class="card" style="overflow-x:auto;padding:0">
          <div style="padding:var(--space-4);border-bottom:1px solid var(--border-secondary)">
            <h4 style="font-size:var(--text-base)">Report Management (${projects.length + reports.length} total)</h4>
          </div>
          <table class="data-table">
            <thead><tr><th>Startup</th><th>Industry</th><th>Score</th><th>Date</th><th>Type</th></tr></thead>
            <tbody>
              ${projects.slice(0, 10).map(p => `
                <tr>
                  <td style="font-weight:500;color:var(--text-primary)">${p.startup?.name || '—'}</td>
                  <td>${p.startup?.industry || '—'}</td>
                  <td><span class="badge ${(p.overallScore || 0) >= 70 ? 'badge-success' : 'badge-warning'}">${p.overallScore || '—'}</span></td>
                  <td>${new Date(p.createdAt).toLocaleDateString()}</td>
                  <td><span class="badge badge-primary">Analysis</span></td>
                </tr>
              `).join('')}
              ${projects.length === 0 ? '<tr><td colspan="5" style="text-align:center;padding:var(--space-8);color:var(--text-tertiary)">No reports yet</td></tr>' : ''}
            </tbody>
          </table>
        </div>
      `;
      break;

    case 'feedback':
      content.innerHTML = `
        <div class="flex flex-col gap-4">
          ${feedback.map(f => `
            <div class="card" style="padding:var(--space-5)">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                  <div style="width:36px;height:36px;border-radius:50%;background:var(--gradient-accent);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:var(--text-sm)">${f.user.charAt(0)}</div>
                  <div>
                    <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">${f.user}</div>
                    <div style="font-size:var(--text-xs);color:var(--text-tertiary)">${f.date}</div>
                  </div>
                </div>
                <div style="color:var(--warning-400)">${'⭐'.repeat(f.rating)}</div>
              </div>
              <p style="font-size:var(--text-sm);color:var(--text-secondary)">${f.text}</p>
            </div>
          `).join('')}
        </div>
      `;
      break;

    case 'settings':
      content.innerHTML = `
        <div class="card" style="padding:var(--space-6);max-width:600px">
          <h4 style="font-size:var(--text-base);margin-bottom:var(--space-6)">Platform Settings</h4>
          <div class="flex flex-col gap-6">
            <div class="flex items-center justify-between">
              <div><div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">Email Notifications</div><div style="font-size:var(--text-xs);color:var(--text-tertiary)">Send email alerts for new signups</div></div>
              <label class="toggle"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
            </div>
            <div class="divider" style="margin:0"></div>
            <div class="flex items-center justify-between">
              <div><div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">Maintenance Mode</div><div style="font-size:var(--text-xs);color:var(--text-tertiary)">Temporarily disable platform access</div></div>
              <label class="toggle"><input type="checkbox" /><span class="toggle-slider"></span></label>
            </div>
            <div class="divider" style="margin:0"></div>
            <div class="flex items-center justify-between">
              <div><div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">Auto-backup</div><div style="font-size:var(--text-xs);color:var(--text-tertiary)">Daily automatic data backups</div></div>
              <label class="toggle"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
            </div>
            <div class="divider" style="margin:0"></div>
            <div class="flex items-center justify-between">
              <div><div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary)">Rate Limiting</div><div style="font-size:var(--text-xs);color:var(--text-tertiary)">Limit API requests per user</div></div>
              <label class="toggle"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
            </div>
          </div>
        </div>
      `;
      break;
  }
}
