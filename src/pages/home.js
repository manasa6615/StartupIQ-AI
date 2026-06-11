// ============================================
// StartupIQ AI – Home Page
// ============================================

import { router } from '../router.js';

export function renderHomePage(container) {
  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero" id="hero-section">
      <div class="hero-bg-effects">
        <div class="hero-orb hero-orb-1"></div>
        <div class="hero-orb hero-orb-2"></div>
        <div class="hero-orb hero-orb-3"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge">
          <span>⚡</span>
          <span>AI-Powered Startup Intelligence Platform</span>
        </div>
        <h1>Validate Your <span class="text-gradient">Startup Idea</span> With AI Precision</h1>
        <p class="hero-subtitle">
          Get comprehensive business analysis, success predictions, competitor insights, and investor readiness scores — all powered by advanced AI in seconds.
        </p>
        <div class="hero-search">
          <input type="text" class="hero-search-input" id="hero-search-input" placeholder="Enter your startup idea..." aria-label="Enter startup idea" />
          <button class="btn btn-primary btn-lg" id="hero-analyze-btn">
            🚀 Analyze Now
          </button>
        </div>
        <p style="font-size:var(--text-sm);color:var(--text-tertiary);animation:fadeSlideUp 0.6s ease 0.35s both">
          18 AI modules • Instant results • No credit card required
        </p>
        <div class="hero-stats">
          <div>
            <div class="hero-stat-value" id="stat-startups">12,500+</div>
            <div class="hero-stat-label">Startups Analyzed</div>
          </div>
          <div>
            <div class="hero-stat-value" id="stat-accuracy">94.7%</div>
            <div class="hero-stat-label">Prediction Accuracy</div>
          </div>
          <div>
            <div class="hero-stat-value" id="stat-modules">18</div>
            <div class="hero-stat-label">AI Modules</div>
          </div>
          <div>
            <div class="hero-stat-value" id="stat-countries">50+</div>
            <div class="hero-stat-label">Countries</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section" id="features-section">
      <div class="container">
        <div class="section-header">
          <h2>Powerful <span class="text-gradient">AI Modules</span></h2>
          <p>Comprehensive startup analysis powered by 18 specialized AI engines working together to give you actionable insights.</p>
        </div>
        <div class="features-grid stagger-children">
          <div class="card feature-card hover-lift">
            <div class="feature-icon" style="background:rgba(99,102,241,0.1)">🎯</div>
            <h3>Idea Validation</h3>
            <p>Validate your startup idea with feasibility analysis, market demand scoring, and product-market fit assessment.</p>
          </div>
          <div class="card feature-card hover-lift">
            <div class="feature-icon" style="background:rgba(16,185,129,0.1)">📈</div>
            <h3>Success Prediction</h3>
            <p>AI-powered success probability prediction with growth forecasting and confidence indicators.</p>
          </div>
          <div class="card feature-card hover-lift">
            <div class="feature-icon" style="background:rgba(59,130,246,0.1)">🔍</div>
            <h3>Competitor Analysis</h3>
            <p>Discover competitors, analyze market gaps, and find untapped opportunities in your industry.</p>
          </div>
          <div class="card feature-card hover-lift">
            <div class="feature-icon" style="background:rgba(245,158,11,0.1)">⚠️</div>
            <h3>Risk Detection</h3>
            <p>Identify market, technical, financial, and operational risks with mitigation strategies.</p>
          </div>
          <div class="card feature-card hover-lift">
            <div class="feature-icon" style="background:rgba(139,92,246,0.1)">💰</div>
            <h3>Revenue Forecasting</h3>
            <p>5-year revenue projections with profit estimation, ROI calculation, and financial modeling.</p>
          </div>
          <div class="card feature-card hover-lift">
            <div class="feature-icon" style="background:rgba(244,63,94,0.1)">🦄</div>
            <h3>Unicorn Potential</h3>
            <p>Discover if your startup has the potential to reach unicorn status with valuation projections.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section stats-section" id="stats-section">
      <div class="container">
        <div class="stats-grid stagger-children">
          <div class="card-glass text-center" style="padding:var(--space-8)">
            <div style="font-size:var(--text-4xl);font-weight:var(--font-extrabold);color:var(--primary-400)">18</div>
            <div style="font-size:var(--text-sm);color:var(--text-tertiary);margin-top:var(--space-2)">AI Analysis Modules</div>
          </div>
          <div class="card-glass text-center" style="padding:var(--space-8)">
            <div style="font-size:var(--text-4xl);font-weight:var(--font-extrabold);color:var(--success-400)">94.7%</div>
            <div style="font-size:var(--text-sm);color:var(--text-tertiary);margin-top:var(--space-2)">Prediction Accuracy</div>
          </div>
          <div class="card-glass text-center" style="padding:var(--space-8)">
            <div style="font-size:var(--text-4xl);font-weight:var(--font-extrabold);color:var(--accent-400)">2.5s</div>
            <div style="font-size:var(--text-sm);color:var(--text-tertiary);margin-top:var(--space-2)">Average Analysis Time</div>
          </div>
          <div class="card-glass text-center" style="padding:var(--space-8)">
            <div style="font-size:var(--text-4xl);font-weight:var(--font-extrabold);color:var(--violet-400)">50+</div>
            <div style="font-size:var(--text-sm);color:var(--text-tertiary);margin-top:var(--space-2)">Countries Supported</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section" id="how-it-works">
      <div class="container">
        <div class="section-header">
          <h2>How It <span class="text-gradient">Works</span></h2>
          <p>Three simple steps to get your complete AI-powered startup analysis report.</p>
        </div>
        <div class="grid grid-3 stagger-children" style="max-width:900px;margin:0 auto">
          <div class="card-gradient text-center hover-lift" style="padding:var(--space-8)">
            <div style="font-size:2.5rem;margin-bottom:var(--space-4)">📝</div>
            <div style="font-size:var(--text-xs);font-weight:var(--font-bold);color:var(--primary-400);margin-bottom:var(--space-2)">STEP 1</div>
            <h4 style="font-size:var(--text-lg);margin-bottom:var(--space-2)">Describe Your Idea</h4>
            <p style="font-size:var(--text-sm)">Enter your startup name, description, industry, target audience, and business model.</p>
          </div>
          <div class="card-gradient text-center hover-lift" style="padding:var(--space-8)">
            <div style="font-size:2.5rem;margin-bottom:var(--space-4)">🤖</div>
            <div style="font-size:var(--text-xs);font-weight:var(--font-bold);color:var(--primary-400);margin-bottom:var(--space-2)">STEP 2</div>
            <h4 style="font-size:var(--text-lg);margin-bottom:var(--space-2)">AI Analysis</h4>
            <p style="font-size:var(--text-sm)">Our 18 AI engines analyze your startup across multiple dimensions simultaneously.</p>
          </div>
          <div class="card-gradient text-center hover-lift" style="padding:var(--space-8)">
            <div style="font-size:2.5rem;margin-bottom:var(--space-4)">📊</div>
            <div style="font-size:var(--text-xs);font-weight:var(--font-bold);color:var(--primary-400);margin-bottom:var(--space-2)">STEP 3</div>
            <h4 style="font-size:var(--text-lg);margin-bottom:var(--space-2)">Get Report</h4>
            <p style="font-size:var(--text-sm)">Receive a comprehensive report with scores, charts, insights, and actionable recommendations.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section" id="testimonials-section" style="background:var(--bg-secondary);border-top:1px solid var(--border-secondary);border-bottom:1px solid var(--border-secondary)">
      <div class="container">
        <div class="section-header">
          <h2>Trusted by <span class="text-gradient">Founders</span></h2>
          <p>See what entrepreneurs and investors say about StartupIQ AI.</p>
        </div>
        <div class="testimonials-grid stagger-children">
          <div class="card testimonial-card hover-lift">
            <p class="testimonial-text">"StartupIQ AI helped us validate our fintech idea and identify market gaps we never considered. The competitor analysis alone was worth it. We secured $2M in seed funding using the insights."</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">SK</div>
              <div>
                <div class="testimonial-name">Sarah Kim</div>
                <div class="testimonial-role">CEO, PayFlow</div>
              </div>
            </div>
          </div>
          <div class="card testimonial-card hover-lift">
            <p class="testimonial-text">"The success prediction engine was incredibly accurate. It predicted our growth trajectory within 5% margin. The investor readiness module helped us prepare for our Series A."</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar" style="background:linear-gradient(135deg,#10b981,#3b82f6)">MR</div>
              <div>
                <div class="testimonial-name">Marcus Rodriguez</div>
                <div class="testimonial-role">Founder, DataStream</div>
              </div>
            </div>
          </div>
          <div class="card testimonial-card hover-lift">
            <p class="testimonial-text">"As an angel investor, I use StartupIQ AI to evaluate pitches. The 18-module analysis gives me a comprehensive view I can't get anywhere else. It's become my go-to due diligence tool."</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar" style="background:linear-gradient(135deg,#f59e0b,#ef4444)">AP</div>
              <div>
                <div class="testimonial-name">Alex Patel</div>
                <div class="testimonial-role">Angel Investor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section" id="cta-section">
      <div class="container">
        <div class="cta-section">
          <h2>Ready to Validate Your <span class="text-gradient">Startup?</span></h2>
          <p>Get your comprehensive AI analysis report in under 60 seconds. No signup required.</p>
          <button class="btn btn-primary btn-lg" id="cta-analyze-btn">
            🚀 Start Free Analysis
          </button>
        </div>
      </div>
    </section>
  `;

  // Event handlers
  document.getElementById('hero-analyze-btn').addEventListener('click', () => {
    const idea = document.getElementById('hero-search-input').value.trim();
    if (idea) {
      router.navigate(`/analyzer?name=${encodeURIComponent(idea)}`);
    } else {
      router.navigate('/analyzer');
    }
  });

  document.getElementById('hero-search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('hero-analyze-btn').click();
    }
  });

  document.getElementById('cta-analyze-btn').addEventListener('click', () => {
    router.navigate('/analyzer');
  });
}
