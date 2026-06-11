// ============================================
// StartupIQ AI – AI Simulation Engine
// All 18 modules with deterministic scoring
// ============================================

// Seed-based pseudo-random number generator
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash);
}

function seededRandom(seed, index = 0) {
  const x = Math.sin(seed + index * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function seededRange(seed, idx, min, max) {
  return Math.floor(seededRandom(seed, idx) * (max - min + 1)) + min;
}

function seededFloat(seed, idx, min, max) {
  return +(seededRandom(seed, idx) * (max - min) + min).toFixed(1);
}

// Industry multipliers
const industryFactors = {
  'Technology': 1.15, 'Healthcare': 1.1, 'FinTech': 1.12, 'EdTech': 1.05,
  'E-commerce': 1.0, 'SaaS': 1.18, 'AI/ML': 1.2, 'Blockchain': 0.95,
  'Clean Energy': 1.08, 'Food & Beverage': 0.92, 'Real Estate': 0.95,
  'Entertainment': 0.9, 'Cybersecurity': 1.15, 'Agriculture': 0.88,
  'Transportation': 1.0, 'Social Media': 0.85, 'Gaming': 0.93, 'Other': 0.95
};

const fundingFactors = {
  'Pre-seed': 0.85, 'Seed': 0.92, 'Series A': 1.05, 'Series B': 1.15,
  'Series C+': 1.2, 'Bootstrapped': 0.9, 'Other': 0.95
};

const teamSizeFactors = {
  '1': 0.75, '2-5': 0.88, '6-10': 1.0, '11-25': 1.1,
  '26-50': 1.15, '51-100': 1.18, '100+': 1.2
};

function getSeed(startup) {
  const key = `${startup.name}|${startup.description}|${startup.industry}|${startup.country}`;
  return hashString(key);
}

function getMultiplier(startup) {
  const ind = industryFactors[startup.industry] || 1.0;
  const fund = fundingFactors[startup.fundingStage] || 1.0;
  const team = teamSizeFactors[startup.teamSize] || 1.0;
  return (ind + fund + team) / 3;
}

function clamp(val, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(val)));
}

function getScoreColor(score) {
  if (score >= 80) return '#10b981';
  if (score >= 60) return '#3b82f6';
  if (score >= 40) return '#f59e0b';
  return '#ef4444';
}

function getScoreLabel(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Work';
}

function getRiskLevel(score) {
  if (score >= 75) return 'Critical';
  if (score >= 50) return 'High';
  if (score >= 25) return 'Medium';
  return 'Low';
}

function getRiskHeatClass(score) {
  if (score >= 75) return 'heat-critical';
  if (score >= 50) return 'heat-high';
  if (score >= 25) return 'heat-medium';
  return 'heat-low';
}

// ============================================
// MODULE 1: Idea Validation Engine
// ============================================
export function analyzeIdeaValidation(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const feasibility = clamp(seededRange(seed, 1, 45, 85) * m);
  const marketDemand = clamp(seededRange(seed, 2, 40, 90) * m);
  const problemSolutionFit = clamp(seededRange(seed, 3, 50, 88) * m);
  const productMarketFit = clamp(seededRange(seed, 4, 35, 82) * m);
  const scalability = clamp(seededRange(seed, 5, 40, 90) * m);
  const readiness = clamp(seededRange(seed, 6, 30, 85) * m);

  const validationScore = clamp((feasibility + marketDemand + problemSolutionFit + productMarketFit + scalability + readiness) / 6);
  const strengthScore = clamp(seededRange(seed, 7, 50, 90) * m);
  const weaknessScore = clamp(100 - strengthScore + seededRange(seed, 8, -10, 10));

  const strengths = [
    feasibility > 65 ? 'Strong feasibility with current technology stack' : null,
    marketDemand > 70 ? 'High market demand in target segment' : null,
    problemSolutionFit > 60 ? 'Clear problem-solution alignment' : null,
    scalability > 65 ? 'Good scalability potential' : null,
    productMarketFit > 60 ? 'Promising product-market fit signals' : null,
    `${startup.industry} sector shows positive growth trajectory`,
  ].filter(Boolean);

  const weaknesses = [
    feasibility < 55 ? 'Feasibility concerns need addressing' : null,
    marketDemand < 50 ? 'Market demand validation recommended' : null,
    problemSolutionFit < 50 ? 'Problem-solution fit needs refinement' : null,
    readiness < 50 ? 'Startup readiness level needs improvement' : null,
    weaknessScore > 40 ? 'Competitive differentiation could be stronger' : null,
  ].filter(Boolean);

  if (weaknesses.length === 0) weaknesses.push('Minor operational optimizations recommended');

  return {
    validationScore, feasibility, marketDemand, problemSolutionFit,
    productMarketFit, scalability, readiness, strengthScore, weaknessScore,
    strengths, weaknesses,
    overallVerdict: validationScore >= 70 ? 'Strong Potential' : validationScore >= 50 ? 'Moderate Potential' : 'Needs Refinement',
    metrics: [
      { label: 'Feasibility', value: feasibility },
      { label: 'Market Demand', value: marketDemand },
      { label: 'Problem-Solution Fit', value: problemSolutionFit },
      { label: 'Product-Market Fit', value: productMarketFit },
      { label: 'Scalability', value: scalability },
      { label: 'Readiness', value: readiness }
    ]
  };
}

// ============================================
// MODULE 2: Innovation Score Calculator
// ============================================
export function calculateInnovationScore(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const novelty = clamp(seededRange(seed, 10, 35, 92) * m);
  const uniqueness = clamp(seededRange(seed, 11, 30, 88) * m);
  const differentiation = clamp(seededRange(seed, 12, 40, 90) * m);
  const technicalInnovation = clamp(seededRange(seed, 13, 35, 85) * m);
  const marketDisruption = clamp(seededRange(seed, 14, 30, 88) * m);
  const creativeSolution = clamp(seededRange(seed, 15, 40, 90) * m);

  const innovationScore = clamp((novelty + uniqueness + differentiation + technicalInnovation + marketDisruption + creativeSolution) / 6);
  const uniquenessPercentage = uniqueness;
  const competitiveDifferentiation = differentiation;

  const similarStartups = [
    { name: `${startup.industry} Leader A`, similarity: seededRange(seed, 16, 25, 65), diff: `Lacks ${startup.name}'s unique approach` },
    { name: `${startup.industry} Competitor B`, similarity: seededRange(seed, 17, 20, 55), diff: 'Different target audience' },
    { name: `Startup ${startup.industry.slice(0, 4)}X`, similarity: seededRange(seed, 18, 15, 50), diff: 'Less advanced technology' },
  ];

  return {
    innovationScore, novelty, uniqueness: uniquenessPercentage,
    differentiation: competitiveDifferentiation,
    technicalInnovation, marketDisruption, creativeSolution,
    similarStartups,
    radarData: {
      labels: ['Novelty', 'Uniqueness', 'Differentiation', 'Tech Innovation', 'Market Disruption', 'Creative Solution'],
      values: [novelty, uniquenessPercentage, competitiveDifferentiation, technicalInnovation, marketDisruption, creativeSolution]
    }
  };
}

// ============================================
// MODULE 3: Competitor Analysis Engine
// ============================================
export function analyzeCompetitors(startup) {
  const seed = getSeed(startup);
  const competitors = [];
  const names = ['AlphaVenture', 'NexGen Solutions', 'Pinnacle Tech', 'BlueWave Inc', 'CoreShift'];

  for (let i = 0; i < 5; i++) {
    competitors.push({
      name: names[i],
      industry: startup.industry,
      marketShare: seededRange(seed, 20 + i, 5, 25) + '%',
      revenue: '$' + seededRange(seed, 25 + i, 2, 50) + 'M',
      funding: '$' + seededRange(seed, 30 + i, 5, 100) + 'M',
      employees: seededRange(seed, 35 + i, 20, 500),
      rating: seededFloat(seed, 40 + i, 3.2, 4.8),
      strengths: [
        ['Strong brand', 'Large user base', 'Well-funded'][i % 3],
        ['Good UX', 'Fast growth', 'Strong team'][i % 3]
      ],
      weaknesses: [
        ['Slow innovation', 'High prices', 'Limited markets'][i % 3],
        ['Poor mobile UX', 'Customer churn', 'Tech debt'][i % 3]
      ]
    });
  }

  const marketGaps = [
    `Underserved ${startup.targetAudience || 'customer'} segment in ${startup.country || 'global'} market`,
    `Lack of AI-powered solutions in ${startup.industry}`,
    `Poor mobile experience among existing players`,
    `Limited personalization in current offerings`,
  ];

  const opportunityScore = clamp(seededRange(seed, 45, 50, 90) * getMultiplier(startup));

  return {
    competitors, marketGaps, opportunityScore,
    untappedOpportunities: [
      `${startup.industry} automation for small businesses`,
      `Cross-platform integration services`,
      `Data-driven decision making tools`,
    ],
    positioningData: {
      labels: competitors.map(c => c.name).concat([startup.name]),
      innovation: competitors.map((_, i) => seededRange(seed, 50 + i, 30, 80)).concat([seededRange(seed, 55, 60, 95)]),
      marketPresence: competitors.map((_, i) => seededRange(seed, 60 + i, 40, 90)).concat([seededRange(seed, 65, 20, 60)])
    }
  };
}

// ============================================
// MODULE 4: Risk Detection Engine
// ============================================
export function detectRisks(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const risks = {
    market: clamp(seededRange(seed, 70, 15, 75) / m),
    technical: clamp(seededRange(seed, 71, 10, 70) / m),
    financial: clamp(seededRange(seed, 72, 20, 80) / m),
    operational: clamp(seededRange(seed, 73, 15, 65) / m),
    legal: clamp(seededRange(seed, 74, 10, 60) / m),
    competition: clamp(seededRange(seed, 75, 20, 75) / m),
    scaling: clamp(seededRange(seed, 76, 15, 70) / m),
  };

  const overallRisk = clamp(Object.values(risks).reduce((a, b) => a + b, 0) / 7);

  const riskEntries = Object.entries(risks).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1) + ' Risk',
    score: value,
    level: getRiskLevel(value),
    heatClass: getRiskHeatClass(value),
    color: getScoreColor(100 - value),
  }));

  const redFlags = riskEntries.filter(r => r.score >= 60).map(r => `${r.name}: ${r.level} - Immediate attention required`);
  if (redFlags.length === 0) redFlags.push('No critical red flags detected');

  const mitigations = [
    { risk: 'Market', suggestion: 'Conduct regular customer surveys and market trend analysis' },
    { risk: 'Technical', suggestion: 'Invest in robust architecture and regular code reviews' },
    { risk: 'Financial', suggestion: 'Maintain 12-month runway and diversify revenue streams' },
    { risk: 'Operational', suggestion: 'Implement scalable processes and automation early' },
    { risk: 'Legal', suggestion: 'Engage legal counsel for compliance and IP protection' },
    { risk: 'Competition', suggestion: 'Focus on unique value proposition and customer retention' },
    { risk: 'Scaling', suggestion: 'Build modular architecture with horizontal scaling capability' },
  ];

  return {
    risks, overallRisk, riskEntries, redFlags, mitigations,
    heatmapData: {
      categories: ['Impact', 'Likelihood', 'Urgency'],
      risks: Object.keys(risks).map((key, i) => ({
        name: key,
        impact: seededRange(seed, 80 + i, 1, 5),
        likelihood: seededRange(seed, 87 + i, 1, 5),
        urgency: seededRange(seed, 94 + i, 1, 5),
      }))
    }
  };
}

// ============================================
// MODULE 5: Success Prediction Engine
// ============================================
export function predictSuccess(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const successProbability = clamp(seededRange(seed, 100, 35, 85) * m);
  const failureRisk = clamp(100 - successProbability + seededRange(seed, 101, -5, 5));
  const growthPotential = clamp(seededRange(seed, 102, 40, 92) * m);
  const confidence = clamp(seededRange(seed, 103, 60, 95));

  const factors = [
    { name: 'Team Quality', score: clamp(seededRange(seed, 104, 50, 90) * m), weight: 20 },
    { name: 'Market Size', score: clamp(seededRange(seed, 105, 40, 90) * m), weight: 20 },
    { name: 'Product Quality', score: clamp(seededRange(seed, 106, 45, 88) * m), weight: 20 },
    { name: 'Business Model', score: clamp(seededRange(seed, 107, 40, 85) * m), weight: 15 },
    { name: 'Timing', score: clamp(seededRange(seed, 108, 35, 90) * m), weight: 10 },
    { name: 'Funding', score: clamp(seededRange(seed, 109, 30, 85) * m), weight: 15 },
  ];

  return {
    successProbability, failureRisk, growthPotential, confidence, factors,
    prediction: successProbability >= 70 ? 'High Success Likelihood' :
      successProbability >= 50 ? 'Moderate Success Likelihood' : 'Challenging Path Ahead',
    chartData: {
      labels: ['Success', 'Failure'],
      values: [successProbability, failureRisk]
    }
  };
}

// ============================================
// MODULE 6: Revenue Forecasting Engine
// ============================================
export function forecastRevenue(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const baseRevenue = seededRange(seed, 110, 50, 500) * 1000 * m;
  const growthRate = seededFloat(seed, 111, 1.3, 3.5);

  const year1 = Math.round(baseRevenue);
  const year2 = Math.round(year1 * growthRate);
  const year3 = Math.round(year2 * (growthRate * 0.9));
  const year5 = Math.round(year3 * Math.pow(growthRate * 0.85, 2));

  const profitMargin = seededFloat(seed, 112, -15, 35);
  const roi = seededFloat(seed, 113, 50, 400);

  const formatCurrency = (val) => {
    if (val >= 1000000) return '$' + (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return '$' + (val / 1000).toFixed(0) + 'K';
    return '$' + val;
  };

  return {
    year1, year2, year3, year5,
    year1Formatted: formatCurrency(year1),
    year2Formatted: formatCurrency(year2),
    year3Formatted: formatCurrency(year3),
    year5Formatted: formatCurrency(year5),
    growthRate: ((growthRate - 1) * 100).toFixed(0) + '%',
    profitMargin: profitMargin.toFixed(1) + '%',
    roi: roi.toFixed(0) + '%',
    profitEstimate: formatCurrency(Math.round(year3 * Math.max(0, profitMargin / 100))),
    chartData: {
      labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
      revenue: [year1, year2, year3, Math.round((year3 + year5) / 2), year5],
      profit: [
        Math.round(year1 * Math.max(0, (profitMargin - 10) / 100)),
        Math.round(year2 * Math.max(0, (profitMargin - 5) / 100)),
        Math.round(year3 * Math.max(0, profitMargin / 100)),
        Math.round(((year3 + year5) / 2) * Math.max(0, (profitMargin + 3) / 100)),
        Math.round(year5 * Math.max(0, (profitMargin + 5) / 100))
      ]
    }
  };
}

// ============================================
// MODULE 7: Investor Readiness Analyzer
// ============================================
export function analyzeInvestorReadiness(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const scalability = clamp(seededRange(seed, 120, 40, 90) * m);
  const revenueModel = clamp(seededRange(seed, 121, 35, 88) * m);
  const teamStrength = clamp(seededRange(seed, 122, 45, 92) * m);
  const marketSize = clamp(seededRange(seed, 123, 40, 90) * m);
  const competitiveAdvantage = clamp(seededRange(seed, 124, 35, 85) * m);
  const traction = clamp(seededRange(seed, 125, 30, 80) * m);

  const readinessScore = clamp((scalability + revenueModel + teamStrength + marketSize + competitiveAdvantage + traction) / 6);

  const levels = ['Not Ready', 'Early Stage', 'Developing', 'Ready', 'Highly Attractive'];
  const levelIdx = Math.min(4, Math.floor(readinessScore / 20));

  const suggestions = [
    readinessScore < 80 ? 'Strengthen revenue model with multiple streams' : null,
    teamStrength < 70 ? 'Build advisory board with industry experts' : null,
    traction < 60 ? 'Focus on demonstrable traction metrics (MRR, DAU)' : null,
    scalability < 65 ? 'Document clear scaling strategy' : null,
    competitiveAdvantage < 60 ? 'Develop stronger moat (patents, network effects)' : null,
    'Prepare investor-ready financial projections',
    'Create compelling pitch narrative with market data',
  ].filter(Boolean);

  return {
    readinessScore, scalability, revenueModel, teamStrength,
    marketSize, competitiveAdvantage, traction,
    fundingReadinessLevel: levels[levelIdx],
    attractivenessRating: readinessScore >= 75 ? '⭐⭐⭐⭐⭐' : readinessScore >= 60 ? '⭐⭐⭐⭐' : readinessScore >= 45 ? '⭐⭐⭐' : '⭐⭐',
    suggestions,
    radarData: {
      labels: ['Scalability', 'Revenue Model', 'Team', 'Market Size', 'Competitive Advantage', 'Traction'],
      values: [scalability, revenueModel, teamStrength, marketSize, competitiveAdvantage, traction]
    }
  };
}

// ============================================
// MODULE 8: Funding Requirement Predictor
// ============================================
export function predictFunding(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const development = Math.round(seededRange(seed, 130, 50, 400) * 1000 * m);
  const infrastructure = Math.round(seededRange(seed, 131, 20, 150) * 1000 * m);
  const marketing = Math.round(seededRange(seed, 132, 30, 250) * 1000 * m);
  const operations = Math.round(seededRange(seed, 133, 20, 120) * 1000 * m);
  const hiring = Math.round(seededRange(seed, 134, 40, 300) * 1000 * m);

  const total = development + infrastructure + marketing + operations + hiring;

  const formatCurrency = (val) => {
    if (val >= 1000000) return '$' + (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return '$' + (val / 1000).toFixed(0) + 'K';
    return '$' + val;
  };

  return {
    development, infrastructure, marketing, operations, hiring, total,
    totalFormatted: formatCurrency(total),
    breakdown: [
      { name: 'Development', value: development, formatted: formatCurrency(development), percent: Math.round(development / total * 100), color: '#6366f1' },
      { name: 'Infrastructure', value: infrastructure, formatted: formatCurrency(infrastructure), percent: Math.round(infrastructure / total * 100), color: '#3b82f6' },
      { name: 'Marketing', value: marketing, formatted: formatCurrency(marketing), percent: Math.round(marketing / total * 100), color: '#10b981' },
      { name: 'Operations', value: operations, formatted: formatCurrency(operations), percent: Math.round(operations / total * 100), color: '#f59e0b' },
      { name: 'Hiring', value: hiring, formatted: formatCurrency(hiring), percent: Math.round(hiring / total * 100), color: '#8b5cf6' },
    ],
    budgetTimeline: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      values: [
        Math.round(total * 0.35),
        Math.round(total * 0.28),
        Math.round(total * 0.22),
        Math.round(total * 0.15)
      ]
    }
  };
}

// ============================================
// MODULE 9: Patent Possibility Checker
// ============================================
export function checkPatentPossibility(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const patentEligibility = clamp(seededRange(seed, 140, 25, 85) * m);
  const ipOpportunity = clamp(seededRange(seed, 141, 30, 88) * m);
  const novelConcept = clamp(seededRange(seed, 142, 20, 80) * m);

  const opportunities = [
    { type: 'Utility Patent', potential: clamp(seededRange(seed, 143, 30, 85) * m), description: 'Core algorithm or process methodology' },
    { type: 'Design Patent', potential: clamp(seededRange(seed, 144, 20, 75) * m), description: 'Unique UI/UX design elements' },
    { type: 'Trade Secret', potential: clamp(seededRange(seed, 145, 40, 90) * m), description: 'Proprietary data processing methods' },
    { type: 'Trademark', potential: clamp(seededRange(seed, 146, 50, 95) * m), description: 'Brand name and logo protection' },
  ];

  const recommendations = [
    patentEligibility > 60 ? 'File provisional patent application for core technology' : 'Focus on trade secrets over patents',
    'Register trademarks for brand protection',
    ipOpportunity > 50 ? 'Consider IP portfolio strategy' : 'Build proprietary dataset as competitive moat',
    'Document all inventions with timestamps',
    'Consult patent attorney for freedom-to-operate analysis',
  ];

  return {
    patentEligibility, ipOpportunity, novelConcept,
    opportunities, recommendations,
    overallScore: clamp((patentEligibility + ipOpportunity + novelConcept) / 3)
  };
}

// ============================================
// MODULE 10: Global Expansion Predictor
// ============================================
export function predictGlobalExpansion(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const countries = [
    { name: 'United States', code: 'US', region: 'North America' },
    { name: 'United Kingdom', code: 'GB', region: 'Europe' },
    { name: 'Germany', code: 'DE', region: 'Europe' },
    { name: 'India', code: 'IN', region: 'Asia' },
    { name: 'Singapore', code: 'SG', region: 'Asia' },
    { name: 'Australia', code: 'AU', region: 'Oceania' },
    { name: 'Canada', code: 'CA', region: 'North America' },
    { name: 'Japan', code: 'JP', region: 'Asia' },
    { name: 'Brazil', code: 'BR', region: 'South America' },
    { name: 'UAE', code: 'AE', region: 'Middle East' },
  ];

  const rankings = countries.map((country, i) => ({
    ...country,
    suitability: clamp(seededRange(seed, 150 + i, 35, 95) * m),
    marketSize: seededRange(seed, 160 + i, 40, 95),
    ease: seededRange(seed, 170 + i, 30, 90),
    growth: seededRange(seed, 180 + i, 35, 92),
    challenges: [
      ['Regulatory compliance', 'High competition', 'Cultural adaptation'][i % 3],
      ['Localization costs', 'Tax complexity', 'Talent acquisition'][i % 3],
    ]
  })).sort((a, b) => b.suitability - a.suitability);

  const expansionScore = clamp(rankings.slice(0, 3).reduce((s, r) => s + r.suitability, 0) / 3);

  return {
    rankings, expansionScore,
    topMarkets: rankings.slice(0, 5),
    chartData: {
      labels: rankings.slice(0, 7).map(r => r.name),
      suitability: rankings.slice(0, 7).map(r => r.suitability),
      growth: rankings.slice(0, 7).map(r => r.growth)
    }
  };
}

// ============================================
// MODULE 11: Startup Battle Simulator
// ============================================
export function simulateBattle(startup1, startup2) {
  const seed1 = getSeed(startup1);
  const seed2 = getSeed(startup2);
  const m1 = getMultiplier(startup1);
  const m2 = getMultiplier(startup2);

  const categories = ['Innovation', 'Revenue Potential', 'Market Demand', 'Competition Edge', 'Funding Appeal', 'Growth Rate'];
  const scores1 = categories.map((_, i) => clamp(seededRange(seed1, 200 + i, 35, 90) * m1));
  const scores2 = categories.map((_, i) => clamp(seededRange(seed2, 200 + i, 35, 90) * m2));

  const total1 = scores1.reduce((a, b) => a + b, 0);
  const total2 = scores2.reduce((a, b) => a + b, 0);

  const winner = total1 >= total2 ? startup1.name : startup2.name;
  const margin = Math.abs(total1 - total2);

  return {
    startup1: { name: startup1.name, scores: scores1, total: total1, average: Math.round(total1 / 6) },
    startup2: { name: startup2.name, scores: scores2, total: total2, average: Math.round(total2 / 6) },
    categories, winner, margin,
    verdicts: categories.map((cat, i) => ({
      category: cat,
      winner: scores1[i] >= scores2[i] ? startup1.name : startup2.name,
      score1: scores1[i],
      score2: scores2[i]
    })),
    competitiveAdvantage: total1 > total2 ?
      `${startup1.name} has stronger ${categories[scores1.indexOf(Math.max(...scores1))].toLowerCase()}` :
      `${startup2.name} has stronger ${categories[scores2.indexOf(Math.max(...scores2))].toLowerCase()}`
  };
}

// ============================================
// MODULE 12: Timeline Simulator
// ============================================
export function simulateTimeline(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const baseGrowth = seededFloat(seed, 210, 1.2, 2.5) * m;
  const quarters = [];

  for (let y = 1; y <= 5; y++) {
    for (let q = 1; q <= 4; q++) {
      const idx = (y - 1) * 4 + q;
      const growth = Math.pow(baseGrowth, idx / 4);
      quarters.push({
        label: `Y${y}Q${q}`,
        base: Math.round(100 * growth),
        increasedFunding: Math.round(100 * growth * 1.3),
        reducedCompetition: Math.round(100 * growth * 1.15),
        largerTeam: Math.round(100 * growth * 1.2),
        internationalExpansion: Math.round(100 * growth * (idx > 8 ? 1.5 : 1.1)),
      });
    }
  }

  const milestones = [
    { time: 'Q2 Year 1', event: 'Product Launch', icon: '🚀' },
    { time: 'Q4 Year 1', event: 'First 1K Users', icon: '👥' },
    { time: 'Q2 Year 2', event: 'Revenue Milestone', icon: '💰' },
    { time: 'Q1 Year 3', event: 'Series A Target', icon: '📈' },
    { time: 'Q3 Year 4', event: 'Market Expansion', icon: '🌍' },
    { time: 'Q4 Year 5', event: 'Profitability', icon: '✅' },
  ];

  return {
    quarters, milestones,
    scenarios: ['Base', 'Increased Funding', 'Reduced Competition', 'Larger Team', 'International Expansion'],
    chartData: {
      labels: quarters.filter((_, i) => i % 2 === 0).map(q => q.label),
      datasets: [
        { label: 'Base', data: quarters.filter((_, i) => i % 2 === 0).map(q => q.base), color: '#6366f1' },
        { label: 'Increased Funding', data: quarters.filter((_, i) => i % 2 === 0).map(q => q.increasedFunding), color: '#10b981' },
        { label: 'Larger Team', data: quarters.filter((_, i) => i % 2 === 0).map(q => q.largerTeam), color: '#3b82f6' },
        { label: 'International', data: quarters.filter((_, i) => i % 2 === 0).map(q => q.internationalExpansion), color: '#f59e0b' },
      ]
    }
  };
}

// ============================================
// MODULE 13: Survival Engine
// ============================================
export function predictSurvival(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const survival1yr = clamp(seededRange(seed, 220, 55, 95) * m);
  const survival3yr = clamp(seededRange(seed, 221, 35, 80) * m);
  const survival5yr = clamp(seededRange(seed, 222, 20, 70) * m);
  const sustainabilityScore = clamp((survival1yr + survival3yr + survival5yr) / 3);

  const riskTimeline = [
    { period: '0-6 months', risk: clamp(100 - survival1yr + seededRange(seed, 223, -5, 10)), phase: 'Launch' },
    { period: '6-12 months', risk: clamp(100 - survival1yr + seededRange(seed, 224, 0, 15)), phase: 'Growth' },
    { period: '1-2 years', risk: clamp(100 - ((survival1yr + survival3yr) / 2) + seededRange(seed, 225, 0, 10)), phase: 'Scaling' },
    { period: '2-3 years', risk: clamp(100 - survival3yr + seededRange(seed, 226, -5, 10)), phase: 'Maturity' },
    { period: '3-5 years', risk: clamp(100 - survival5yr + seededRange(seed, 227, -5, 15)), phase: 'Sustainability' },
  ];

  return {
    survival1yr, survival3yr, survival5yr, sustainabilityScore, riskTimeline,
    verdict: sustainabilityScore >= 65 ? 'Strong Survivor' : sustainabilityScore >= 45 ? 'Moderate Risk' : 'High Risk',
    chartData: {
      labels: ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years'],
      survival: [survival1yr, clamp((survival1yr + survival3yr) / 2), survival3yr, clamp((survival3yr + survival5yr) / 2), survival5yr],
      risk: [100 - survival1yr, 100 - clamp((survival1yr + survival3yr) / 2), 100 - survival3yr, 100 - clamp((survival3yr + survival5yr) / 2), 100 - survival5yr]
    }
  };
}

// ============================================
// MODULE 14: Unicorn Potential Analyzer
// ============================================
export function analyzeUnicornPotential(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const unicornScore = clamp(seededRange(seed, 230, 15, 85) * m);
  const valuationMultiplier = seededFloat(seed, 231, 2, 50);
  const baseValuation = seededRange(seed, 232, 100, 5000) * 1000;
  const projectedValuation = Math.round(baseValuation * valuationMultiplier);

  let category, categoryColor;
  if (unicornScore >= 80) { category = 'Unicorn Candidate 🦄'; categoryColor = '#8b5cf6'; }
  else if (unicornScore >= 60) { category = 'High Growth Startup 🚀'; categoryColor = '#10b981'; }
  else if (unicornScore >= 40) { category = 'Startup 📈'; categoryColor = '#3b82f6'; }
  else { category = 'Small Business 🏢'; categoryColor = '#f59e0b'; }

  const formatVal = (val) => {
    if (val >= 1000000000) return '$' + (val / 1000000000).toFixed(1) + 'B';
    if (val >= 1000000) return '$' + (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return '$' + (val / 1000).toFixed(0) + 'K';
    return '$' + val;
  };

  const factors = [
    { name: 'Market Opportunity', score: clamp(seededRange(seed, 233, 30, 90) * m) },
    { name: 'Scalability', score: clamp(seededRange(seed, 234, 35, 92) * m) },
    { name: 'Network Effects', score: clamp(seededRange(seed, 235, 20, 85) * m) },
    { name: 'Team Caliber', score: clamp(seededRange(seed, 236, 40, 88) * m) },
    { name: 'Revenue Growth', score: clamp(seededRange(seed, 237, 30, 90) * m) },
    { name: 'Innovation', score: clamp(seededRange(seed, 238, 35, 90) * m) },
  ];

  return {
    unicornScore, category, categoryColor,
    currentValuation: formatVal(baseValuation),
    projectedValuation: formatVal(projectedValuation),
    valuationMultiplier: valuationMultiplier.toFixed(1) + 'x',
    factors,
    growthTrajectory: {
      labels: ['Now', 'Year 1', 'Year 2', 'Year 3', 'Year 5'],
      values: [
        baseValuation,
        Math.round(baseValuation * Math.pow(valuationMultiplier, 0.2)),
        Math.round(baseValuation * Math.pow(valuationMultiplier, 0.4)),
        Math.round(baseValuation * Math.pow(valuationMultiplier, 0.6)),
        projectedValuation
      ]
    }
  };
}

// ============================================
// MODULE 15: Research Gap & Opportunity Finder
// ============================================
export function findResearchGaps(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const researchGapScore = clamp(seededRange(seed, 240, 40, 90) * m);
  const opportunityScore = clamp(seededRange(seed, 241, 35, 88) * m);
  const whiteSpaceScore = clamp(seededRange(seed, 242, 30, 85) * m);
  const emergingMarketScore = clamp(seededRange(seed, 243, 35, 92) * m);
  const innovationPotential = clamp(seededRange(seed, 244, 40, 90) * m);

  const gaps = [
    { area: 'Customer Pain Points', gap: `Unresolved ${startup.targetAudience || 'user'} frustrations in ${startup.industry}`, score: seededRange(seed, 245, 40, 90) },
    { area: 'Feature Gaps', gap: 'Missing AI-powered automation in existing solutions', score: seededRange(seed, 246, 35, 85) },
    { area: 'Market Segments', gap: `Underserved SMB segment in ${startup.country || 'target'} market`, score: seededRange(seed, 247, 30, 80) },
    { area: 'Technology', gap: 'Limited use of advanced ML models by competitors', score: seededRange(seed, 248, 35, 88) },
    { area: 'Pricing', gap: 'No freemium model available from major competitors', score: seededRange(seed, 249, 25, 75) },
  ];

  const emergingTech = [
    { name: 'Artificial Intelligence', opportunity: seededRange(seed, 250, 60, 95) },
    { name: 'Machine Learning', opportunity: seededRange(seed, 251, 55, 90) },
    { name: 'Green Energy', opportunity: seededRange(seed, 252, 40, 85) },
    { name: 'Healthcare Tech', opportunity: seededRange(seed, 253, 45, 88) },
    { name: 'FinTech', opportunity: seededRange(seed, 254, 50, 90) },
    { name: 'Cybersecurity', opportunity: seededRange(seed, 255, 55, 92) },
    { name: 'AgriTech', opportunity: seededRange(seed, 256, 35, 80) },
    { name: 'Smart Cities', opportunity: seededRange(seed, 257, 40, 85) },
  ].sort((a, b) => b.opportunity - a.opportunity);

  const highPotentialDirections = [
    `AI-powered ${startup.industry.toLowerCase()} for ${startup.targetAudience || 'enterprises'}`,
    `Cross-platform ${startup.industry.toLowerCase()} analytics dashboard`,
    `Automated compliance solution for ${startup.industry.toLowerCase()}`,
    `Personalized ${startup.industry.toLowerCase()} recommendation engine`,
  ];

  return {
    researchGapScore, opportunityScore, whiteSpaceScore, emergingMarketScore, innovationPotential,
    gaps, emergingTech, highPotentialDirections,
    dashboardScores: [
      { label: 'Research Gap', value: researchGapScore, color: '#6366f1' },
      { label: 'Opportunity', value: opportunityScore, color: '#3b82f6' },
      { label: 'White Space', value: whiteSpaceScore, color: '#10b981' },
      { label: 'Emerging Market', value: emergingMarketScore, color: '#f59e0b' },
      { label: 'Innovation Potential', value: innovationPotential, color: '#8b5cf6' },
    ],
    radarData: {
      labels: ['Gap Detection', 'Opportunity', 'White Space', 'Emerging Tech', 'Innovation', 'Market Need'],
      values: [researchGapScore, opportunityScore, whiteSpaceScore, emergingMarketScore, innovationPotential, clamp(seededRange(seed, 258, 40, 90) * m)]
    }
  };
}

// ============================================
// MODULE 16: Co-Founder Matching Engine
// ============================================
export function matchCoFounders(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const teamReadiness = clamp(seededRange(seed, 260, 30, 85) * m);

  const roles = [
    { title: 'CEO / Visionary Leader', icon: '👔', importance: clamp(seededRange(seed, 261, 70, 95)), filled: seededRandom(seed, 262) > 0.5, skills: ['Leadership', 'Strategy', 'Fundraising'] },
    { title: 'CTO / Technical Lead', icon: '💻', importance: clamp(seededRange(seed, 263, 75, 98)), filled: seededRandom(seed, 264) > 0.6, skills: ['Architecture', 'Engineering', 'Tech Strategy'] },
    { title: 'Marketing Lead', icon: '📣', importance: clamp(seededRange(seed, 265, 60, 90)), filled: seededRandom(seed, 266) > 0.55, skills: ['Growth', 'Branding', 'Content'] },
    { title: 'Product Manager', icon: '📋', importance: clamp(seededRange(seed, 267, 65, 92)), filled: seededRandom(seed, 268) > 0.5, skills: ['Product Strategy', 'User Research', 'Roadmap'] },
    { title: 'Data Analyst', icon: '📊', importance: clamp(seededRange(seed, 269, 50, 85)), filled: seededRandom(seed, 270) > 0.45, skills: ['Analytics', 'ML', 'Data Engineering'] },
  ];

  const missingRoles = roles.filter(r => !r.filled);
  const filledRoles = roles.filter(r => r.filled);

  const hiringRecommendations = missingRoles.map(r => ({
    role: r.title,
    priority: r.importance >= 80 ? 'Critical' : r.importance >= 60 ? 'High' : 'Medium',
    skills: r.skills,
    timeline: r.importance >= 80 ? 'Immediately' : r.importance >= 60 ? 'Within 3 months' : 'Within 6 months',
  }));

  return {
    teamReadiness, roles, missingRoles, filledRoles, hiringRecommendations,
    completeness: Math.round((filledRoles.length / roles.length) * 100)
  };
}

// ============================================
// MODULE 17: Pitch Deck Evaluator
// ============================================
export function evaluatePitchDeck(startup, deckDetails = {}) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const slides = [
    { name: 'Problem Statement', score: clamp(seededRange(seed, 280, 40, 92) * m), feedback: '' },
    { name: 'Solution', score: clamp(seededRange(seed, 281, 45, 90) * m), feedback: '' },
    { name: 'Market Opportunity', score: clamp(seededRange(seed, 282, 35, 88) * m), feedback: '' },
    { name: 'Business Model', score: clamp(seededRange(seed, 283, 40, 85) * m), feedback: '' },
    { name: 'Traction', score: clamp(seededRange(seed, 284, 30, 82) * m), feedback: '' },
    { name: 'Competition', score: clamp(seededRange(seed, 285, 35, 85) * m), feedback: '' },
    { name: 'Team', score: clamp(seededRange(seed, 286, 45, 90) * m), feedback: '' },
    { name: 'Financial Projections', score: clamp(seededRange(seed, 287, 30, 85) * m), feedback: '' },
    { name: 'Ask / Use of Funds', score: clamp(seededRange(seed, 288, 35, 88) * m), feedback: '' },
  ];

  // Generate feedback for each slide
  slides.forEach(s => {
    if (s.score >= 80) s.feedback = 'Excellent! Clear and compelling presentation.';
    else if (s.score >= 60) s.feedback = 'Good foundation. Add more specific data points and metrics.';
    else if (s.score >= 40) s.feedback = 'Needs improvement. Include concrete examples and evidence.';
    else s.feedback = 'Significant revision needed. Focus on clarity and supporting data.';
  });

  const overallScore = clamp(slides.reduce((a, s) => a + s.score, 0) / slides.length);
  const investorAttractiveness = clamp(seededRange(seed, 289, 40, 90) * m);

  const improvements = [
    overallScore < 80 ? 'Add more quantitative data throughout' : null,
    'Include customer testimonials or case studies',
    'Show clear competitive differentiation matrix',
    'Add detailed financial model with unit economics',
    'Include team credentials and relevant experience',
  ].filter(Boolean);

  return { overallScore, investorAttractiveness, slides, improvements };
}

// ============================================
// MODULE 18: Analytics & Insights Center
// ============================================
export function generateAnalytics(startup) {
  const seed = getSeed(startup);
  const m = getMultiplier(startup);

  const kpis = [
    { label: 'Startup Health Score', value: clamp(seededRange(seed, 290, 45, 88) * m), unit: '/100', trend: seededFloat(seed, 291, -5, 15) },
    { label: 'Market Readiness', value: clamp(seededRange(seed, 292, 40, 90) * m), unit: '%', trend: seededFloat(seed, 293, -3, 12) },
    { label: 'Innovation Index', value: clamp(seededRange(seed, 294, 35, 85) * m), unit: '/100', trend: seededFloat(seed, 295, -2, 10) },
    { label: 'Growth Velocity', value: clamp(seededRange(seed, 296, 30, 95) * m), unit: '%', trend: seededFloat(seed, 297, -8, 20) },
  ];

  const insights = [
    { type: 'opportunity', title: `Strong ${startup.industry} Growth`, text: `The ${startup.industry} market is projected to grow ${seededRange(seed, 298, 15, 45)}% annually. ${startup.name} is well-positioned to capture this opportunity.`, priority: 'high' },
    { type: 'warning', title: 'Competitive Pressure', text: `${seededRange(seed, 299, 3, 12)} new competitors entered the market recently. Differentiation strategy is critical.`, priority: 'medium' },
    { type: 'recommendation', title: 'Revenue Optimization', text: `Consider implementing tiered pricing. Data suggests ${seededRange(seed, 300, 20, 40)}% revenue uplift potential.`, priority: 'high' },
    { type: 'info', title: 'Team Scaling', text: `Current team size is optimal for ${startup.fundingStage || 'early'} stage. Plan hiring for next phase.`, priority: 'low' },
  ];

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    scores: Array.from({ length: 12 }, (_, i) => clamp(seededRange(seed, 301 + i, 40, 90) * m)),
    growth: Array.from({ length: 12 }, (_, i) => seededFloat(seed, 313 + i, -5, 25)),
  };

  return { kpis, insights, monthlyData };
}

// ============================================
// FULL REPORT GENERATOR
// ============================================
export function generateFullReport(startup) {
  return {
    startup,
    generatedAt: new Date().toISOString(),
    modules: {
      ideaValidation: analyzeIdeaValidation(startup),
      innovationScore: calculateInnovationScore(startup),
      competitorAnalysis: analyzeCompetitors(startup),
      riskDetection: detectRisks(startup),
      successPrediction: predictSuccess(startup),
      revenueForecasting: forecastRevenue(startup),
      investorReadiness: analyzeInvestorReadiness(startup),
      fundingRequirement: predictFunding(startup),
      patentPossibility: checkPatentPossibility(startup),
      globalExpansion: predictGlobalExpansion(startup),
      timelineSimulation: simulateTimeline(startup),
      survivalPrediction: predictSurvival(startup),
      unicornPotential: analyzeUnicornPotential(startup),
      researchGaps: findResearchGaps(startup),
      coFounderMatching: matchCoFounders(startup),
      pitchDeckEvaluation: evaluatePitchDeck(startup),
      analyticsInsights: generateAnalytics(startup),
    }
  };
}

// Utility exports
export { getScoreColor, getScoreLabel, getRiskLevel };
