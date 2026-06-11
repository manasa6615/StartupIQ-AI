// ============================================
// StartupIQ AI – Score Card Component
// ============================================

import { getScoreColor, getScoreLabel } from '../ai-engine.js';

export function createScoreCircle(value, label, size = 120) {
  const r = (size - 16) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;
  const color = getScoreColor(value);

  return `
    <div class="score-circle" style="width:${size}px;height:${size}px">
      <svg viewBox="0 0 ${size} ${size}">
        <circle class="score-circle-bg" cx="${size / 2}" cy="${size / 2}" r="${r}" />
        <circle class="score-circle-fill" cx="${size / 2}" cy="${size / 2}" r="${r}"
          stroke="${color}"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${offset}"
        />
      </svg>
      <div class="score-circle-text">
        <div class="score-circle-value" style="color:${color}">${value}</div>
        <div class="score-circle-label">${label}</div>
      </div>
    </div>
  `;
}

export function createScoreCard(title, value, subtitle, icon = '📊') {
  const color = getScoreColor(value);
  const label = getScoreLabel(value);
  return `
    <div class="card hover-lift">
      <div class="flex items-center justify-between mb-4">
        <span style="font-size:1.5rem">${icon}</span>
        <span class="badge" style="background:${color}20;color:${color}">${label}</span>
      </div>
      <div class="stat-card-value" style="color:${color}">${value}<span style="font-size:var(--text-lg);color:var(--text-tertiary)">/100</span></div>
      <div style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary);margin-top:var(--space-1)">${title}</div>
      ${subtitle ? `<div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-top:var(--space-1)">${subtitle}</div>` : ''}
      <div class="progress-bar mt-3">
        <div class="progress-bar-fill" style="width:${value}%;background:${color}"></div>
      </div>
    </div>
  `;
}

export function createMetricCard(label, value, unit = '', trend = null, icon = '') {
  const trendHtml = trend !== null ? `
    <span class="stat-card-change ${trend >= 0 ? 'positive' : 'negative'}">
      ${trend >= 0 ? '↑' : '↓'} ${Math.abs(trend).toFixed(1)}%
    </span>
  ` : '';

  return `
    <div class="card stat-card">
      ${icon ? `<span style="font-size:1.25rem">${icon}</span>` : ''}
      <div class="stat-card-value">${value}<span style="font-size:var(--text-sm);color:var(--text-tertiary);font-weight:400">${unit}</span></div>
      <div class="stat-card-label">${label}</div>
      ${trendHtml}
    </div>
  `;
}

export function createProgressItem(label, value, color) {
  return `
    <div style="margin-bottom:var(--space-3)">
      <div class="flex justify-between mb-1">
        <span style="font-size:var(--text-sm);color:var(--text-secondary)">${label}</span>
        <span style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:${color || getScoreColor(value)}">${value}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width:${value}%;background:${color || getScoreColor(value)}"></div>
      </div>
    </div>
  `;
}
