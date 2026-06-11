// ============================================
// StartupIQ AI – Modal Component
// ============================================

export function showModal(title, contentHtml, options = {}) {
  const container = document.getElementById('modal-container');
  container.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal" role="dialog" aria-modal="true" aria-label="${title}">
        <div class="modal-header">
          <h3 style="font-size:var(--text-lg)">${title}</h3>
          <button class="modal-close" id="modal-close-btn" aria-label="Close">✕</button>
        </div>
        <div class="modal-body">${contentHtml}</div>
        ${options.footer ? `<div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);justify-content:flex-end">${options.footer}</div>` : ''}
      </div>
    </div>
  `;

  const close = () => { container.innerHTML = ''; };
  document.getElementById('modal-close-btn').addEventListener('click', close);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') close();
  });

  // ESC key
  const escHandler = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); } };
  document.addEventListener('keydown', escHandler);

  return close;
}
