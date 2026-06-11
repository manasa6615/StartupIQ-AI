// ============================================
// StartupIQ AI – Navbar Component
// ============================================

import { store } from '../store.js';

export function renderNavbar() {
  const nav = document.getElementById('navbar');
  nav.innerHTML = `
    <div class="navbar">
      <a href="#/" class="navbar-brand" id="nav-brand">
        <div class="navbar-brand-icon">IQ</div>
        <span>Startup<span class="text-gradient">IQ</span> AI</span>
      </a>

      <div class="navbar-links" id="nav-links">
        <a href="#/" class="navbar-link" id="nav-home">Home</a>
        <a href="#/dashboard" class="navbar-link" id="nav-dashboard">Dashboard</a>
        <a href="#/analyzer" class="navbar-link" id="nav-analyzer">Analyzer</a>
        <a href="#/battle" class="navbar-link" id="nav-battle">Battle</a>
        <a href="#/analytics" class="navbar-link" id="nav-analytics">Analytics</a>
        <a href="#/admin" class="navbar-link" id="nav-admin">Admin</a>
      </div>

      <div class="navbar-actions">
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
          ${store.getTheme() === 'dark' ? '☀️' : '🌙'}
        </button>
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">☰</button>
      </div>
    </div>
  `;

  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const newTheme = store.toggleTheme();
    document.getElementById('theme-toggle').textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // Mobile menu
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-links').classList.remove('open');
    });
  });
}
