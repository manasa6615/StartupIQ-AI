// ============================================
// StartupIQ AI – Data Table Component
// ============================================

export function createDataTable(headers, rows, options = {}) {
  const id = options.id || 'data-table-' + Date.now();
  const headerHtml = headers.map(h =>
    `<th>${typeof h === 'string' ? h : h.label}</th>`
  ).join('');

  const rowsHtml = rows.map(row => {
    const cells = row.map(cell => `<td>${cell}</td>`).join('');
    return `<tr>${cells}</tr>`;
  }).join('');

  return `
    <div class="card" style="overflow-x:auto;padding:0">
      ${options.title ? `<div style="padding:var(--space-4) var(--space-4) 0"><h4 style="font-size:var(--text-base);font-weight:var(--font-semibold)">${options.title}</h4></div>` : ''}
      <table class="data-table" id="${id}">
        <thead><tr>${headerHtml}</tr></thead>
        <tbody>${rowsHtml || '<tr><td colspan="' + headers.length + '" style="text-align:center;padding:var(--space-8);color:var(--text-tertiary)">No data available</td></tr>'}</tbody>
      </table>
    </div>
  `;
}
