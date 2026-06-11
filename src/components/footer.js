// ============================================
// StartupIQ AI – Footer Component
// ============================================

export function renderFooter() {
  const footer = document.getElementById('footer-root');
  footer.innerHTML = `
    <footer class="footer">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="navbar-brand" style="margin-bottom:var(--space-2)">
            <div class="navbar-brand-icon">IQ</div>
            <span style="font-size:var(--text-lg);font-weight:700;color:var(--text-primary)">StartupIQ AI</span>
          </div>
          <p>Empowering entrepreneurs with AI-driven insights to build successful startups. Analyze, predict, and grow with confidence.</p>
        </div>

        <div>
          <h4 class="footer-heading">Product</h4>
          <ul class="footer-links">
            <li><a href="#/analyzer">Startup Analyzer</a></li>
            <li><a href="#/battle">Battle Simulator</a></li>
            <li><a href="#/analytics">Analytics Center</a></li>
            <li><a href="#/dashboard">Dashboard</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Resources</h4>
          <ul class="footer-links">
            <li><a href="#/">Documentation</a></li>
            <li><a href="#/">API Reference</a></li>
            <li><a href="#/">Blog</a></li>
            <li><a href="#/">Case Studies</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">Company</h4>
          <ul class="footer-links">
            <li><a href="#/">About Us</a></li>
            <li><a href="#/">Careers</a></li>
            <li><a href="#/">Privacy Policy</a></li>
            <li><a href="#/">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} StartupIQ AI. All rights reserved.</span>
        <div class="footer-social">
          <a href="#" aria-label="Twitter">𝕏</a>
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="GitHub">⌘</a>
          <a href="#" aria-label="Discord">💬</a>
        </div>
      </div>
    </footer>
  `;
}
