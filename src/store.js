// ============================================
// StartupIQ AI – State Management (localStorage)
// ============================================

const STORAGE_KEY = 'startupiq_data';

const defaultState = {
  user: {
    name: 'Entrepreneur',
    email: 'user@startupiq.ai',
    avatar: null,
    joinedDate: new Date().toISOString()
  },
  projects: [],
  history: [],
  savedReports: [],
  settings: {
    theme: 'dark',
    notifications: true
  },
  admin: {
    totalUsers: 2847,
    totalReports: 12563,
    activeToday: 347,
    feedbackCount: 89
  }
};

class Store {
  constructor() {
    this.state = this.load();
    this.listeners = [];
  }

  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return { ...defaultState, ...JSON.parse(data) };
      }
    } catch (e) {
      console.warn('Failed to load state:', e);
    }
    return { ...defaultState };
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }

  get(key) {
    return key.split('.').reduce((obj, k) => obj?.[k], this.state);
  }

  set(key, value) {
    const keys = key.split('.');
    let obj = this.state;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    this.save();
    this.notify(key);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(key) {
    this.listeners.forEach(l => l(key, this.state));
  }

  // Project management
  addProject(project) {
    const id = 'proj_' + Date.now();
    const newProject = {
      id,
      createdAt: new Date().toISOString(),
      ...project
    };
    this.state.projects.unshift(newProject);
    this.save();
    this.notify('projects');
    return newProject;
  }

  getProject(id) {
    return this.state.projects.find(p => p.id === id);
  }

  deleteProject(id) {
    this.state.projects = this.state.projects.filter(p => p.id !== id);
    this.save();
    this.notify('projects');
  }

  // History
  addToHistory(entry) {
    this.state.history.unshift({
      id: 'hist_' + Date.now(),
      date: new Date().toISOString(),
      ...entry
    });
    if (this.state.history.length > 50) {
      this.state.history = this.state.history.slice(0, 50);
    }
    this.save();
    this.notify('history');
  }

  // Saved reports
  saveReport(report) {
    const id = 'rpt_' + Date.now();
    this.state.savedReports.unshift({
      id,
      savedAt: new Date().toISOString(),
      ...report
    });
    this.save();
    this.notify('savedReports');
    return id;
  }

  deleteReport(id) {
    this.state.savedReports = this.state.savedReports.filter(r => r.id !== id);
    this.save();
    this.notify('savedReports');
  }

  // Theme
  getTheme() {
    return this.state.settings.theme;
  }

  setTheme(theme) {
    this.state.settings.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    this.save();
    this.notify('settings.theme');
  }

  toggleTheme() {
    const newTheme = this.state.settings.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  }
}

export const store = new Store();
