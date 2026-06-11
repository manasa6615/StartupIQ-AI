// ============================================
// StartupIQ AI – Chart.js Wrapper Components
// ============================================

import Chart from 'chart.js/auto';

const chartInstances = new Map();

function destroyChart(id) {
  if (chartInstances.has(id)) {
    chartInstances.get(id).destroy();
    chartInstances.delete(id);
  }
}

function createCanvas(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return null;
  // Remove existing canvas
  const existing = container.querySelector('canvas');
  if (existing) existing.remove();
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  return canvas;
}

const defaultFont = { family: "'Inter', sans-serif", size: 12 };
const gridColor = 'rgba(148, 163, 184, 0.08)';
const textColor = '#94a3b8';

export function createRadarChart(containerId, data) {
  destroyChart(containerId);
  const canvas = createCanvas(containerId);
  if (!canvas) return;

  const chart = new Chart(canvas, {
    type: 'radar',
    data: {
      labels: data.labels,
      datasets: [{
        label: data.label || 'Score',
        data: data.values,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderColor: '#6366f1',
        borderWidth: 2,
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointRadius: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1e1b4b', titleFont: defaultFont, bodyFont: defaultFont } },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 20, color: textColor, backdropColor: 'transparent', font: { size: 10 } },
          grid: { color: gridColor },
          pointLabels: { color: textColor, font: { size: 11, family: defaultFont.family } },
          angleLines: { color: gridColor }
        }
      }
    }
  });
  chartInstances.set(containerId, chart);
  return chart;
}

export function createBarChart(containerId, data) {
  destroyChart(containerId);
  const canvas = createCanvas(containerId);
  if (!canvas) return;

  const datasets = data.datasets ? data.datasets.map(ds => ({
    label: ds.label,
    data: ds.data,
    backgroundColor: ds.color || '#6366f1',
    borderRadius: 6,
    borderSkipped: false,
    barPercentage: 0.7,
  })) : [{
    label: data.label || 'Value',
    data: data.values,
    backgroundColor: data.colors || data.values.map((_, i) => ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'][i % 7]),
    borderRadius: 6,
    borderSkipped: false,
    barPercentage: 0.7,
  }];

  const chart = new Chart(canvas, {
    type: 'bar',
    data: { labels: data.labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: datasets.length > 1, labels: { color: textColor, font: defaultFont, usePointStyle: true, padding: 16 } },
        tooltip: { backgroundColor: '#1e1b4b', titleFont: defaultFont, bodyFont: defaultFont }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: textColor, font: { size: 11 } } },
        y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } }, beginAtZero: true }
      }
    }
  });
  chartInstances.set(containerId, chart);
  return chart;
}

export function createLineChart(containerId, data) {
  destroyChart(containerId);
  const canvas = createCanvas(containerId);
  if (!canvas) return;

  const datasets = data.datasets ? data.datasets.map(ds => ({
    label: ds.label,
    data: ds.data,
    borderColor: ds.color || '#6366f1',
    backgroundColor: (ds.color || '#6366f1') + '15',
    fill: ds.fill !== undefined ? ds.fill : true,
    tension: 0.4,
    borderWidth: 2,
    pointRadius: 3,
    pointHoverRadius: 6,
    pointBackgroundColor: ds.color || '#6366f1',
  })) : [{
    label: data.label || 'Value',
    data: data.values,
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    fill: true,
    tension: 0.4,
    borderWidth: 2,
    pointRadius: 3,
    pointHoverRadius: 6,
    pointBackgroundColor: '#6366f1',
  }];

  const chart = new Chart(canvas, {
    type: 'line',
    data: { labels: data.labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: datasets.length > 1, labels: { color: textColor, font: defaultFont, usePointStyle: true, padding: 16 } },
        tooltip: { backgroundColor: '#1e1b4b', titleFont: defaultFont, bodyFont: defaultFont, mode: 'index', intersect: false }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: textColor, font: { size: 11 } } },
        y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } }, beginAtZero: true }
      },
      interaction: { mode: 'index', intersect: false }
    }
  });
  chartInstances.set(containerId, chart);
  return chart;
}

export function createDoughnutChart(containerId, data) {
  destroyChart(containerId);
  const canvas = createCanvas(containerId);
  if (!canvas) return;

  const chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: data.colors || ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '65%',
      plugins: {
        legend: { position: 'bottom', labels: { color: textColor, font: defaultFont, usePointStyle: true, padding: 16 } },
        tooltip: { backgroundColor: '#1e1b4b', titleFont: defaultFont, bodyFont: defaultFont }
      }
    }
  });
  chartInstances.set(containerId, chart);
  return chart;
}

export function createPieChart(containerId, data) {
  destroyChart(containerId);
  const canvas = createCanvas(containerId);
  if (!canvas) return;

  const chart = new Chart(canvas, {
    type: 'pie',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: data.colors || ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
        borderWidth: 0,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: textColor, font: defaultFont, usePointStyle: true, padding: 12 } },
        tooltip: { backgroundColor: '#1e1b4b', titleFont: defaultFont, bodyFont: defaultFont }
      }
    }
  });
  chartInstances.set(containerId, chart);
  return chart;
}

export function destroyAllCharts() {
  chartInstances.forEach(chart => chart.destroy());
  chartInstances.clear();
}
