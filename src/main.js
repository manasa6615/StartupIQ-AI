// ============================================
// StartupIQ AI – Main Entry Point
// ============================================

import { router } from './router.js';
import { store } from './store.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHomePage } from './pages/home.js';
import { renderDashboardPage } from './pages/dashboard.js';
import { renderAnalyzerPage } from './pages/analyzer.js';
import { renderBattlePage } from './pages/battle.js';
import { renderAnalyticsPage } from './pages/analytics.js';
import { renderAdminPage } from './pages/admin.js';

// Initialize theme
document.documentElement.setAttribute('data-theme', store.getTheme());

// Render persistent components
renderNavbar();
renderFooter();

// Register routes
router.register('/', renderHomePage);
router.register('/dashboard', renderDashboardPage);
router.register('/analyzer', renderAnalyzerPage);
router.register('/battle', renderBattlePage);
router.register('/analytics', renderAnalyticsPage);
router.register('/admin', renderAdminPage);

// Initialize router
router.init('#app');

console.log('%c🚀 StartupIQ AI', 'font-size:20px;font-weight:bold;color:#6366f1');
console.log('%cIntelligent Startup Success & Innovation Analyzer', 'font-size:12px;color:#94a3b8');
