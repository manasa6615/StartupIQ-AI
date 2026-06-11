// ============================================
// StartupIQ AI – SPA Router
// ============================================

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.appEl = null;
  }

  init(appSelector) {
    this.appEl = document.querySelector(appSelector);
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  register(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path) {
    window.location.hash = path;
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, query] = hash.split('?');

    const params = {};
    if (query) {
      query.split('&').forEach(p => {
        const [k, v] = p.split('=');
        params[decodeURIComponent(k)] = decodeURIComponent(v || '');
      });
    }

    const handler = this.routes[path] || this.routes['/'];

    if (handler && this.appEl) {
      this.currentRoute = path;
      // Clear and render
      this.appEl.innerHTML = '';
      this.appEl.className = 'page-enter';
      handler(this.appEl, params);
      // Update active nav links
      document.querySelectorAll('.navbar-link').forEach(link => {
        const linkPath = link.getAttribute('href')?.replace('#', '') || '/';
        link.classList.toggle('active', linkPath === path);
      });
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}

export const router = new Router();
