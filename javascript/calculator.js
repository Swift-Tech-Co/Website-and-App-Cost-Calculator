/**
 * Website & App Cost Calculator
 * Swift Tech Co. — https://swifttechco.com
 */

const PROJECT_TYPES = {
  "Custom Website":               [3,  8],
  "Website Redesign":             [2,  6],
  "E-Commerce Store":             [5, 18],
  "Mobile App (iOS & Android)":   [15, 50],
  "Web App / Portal":             [12, 45],
  "Chatbot Integration":          [4,  14],
  "Website + Mobile App Bundle":  [20, 60],
};

const PAGE_RANGES = [
  "1 to 5 pages",
  "6 to 15 pages",
  "16 to 30 pages",
  "30+ pages / complex",
];
const PAGE_MULTIPLIERS = [1.0, 1.3, 1.7, 2.4];

const DESIGN_TIERS = [
  "Standard (template-based)",
  "Custom Design (unique UI)",
  "Premium (brand system + animations)",
  "Enterprise (design system + multi-brand)",
];
const DESIGN_MULTIPLIERS = [1.0, 1.4, 1.9, 2.6];

const INTEGRATIONS = [
  "CMS (WordPress/Contentful)",
  "Payment gateway",
  "CRM / HubSpot",
  "Email marketing",
  "Analytics & tracking",
  "Social media feeds",
  "Live chat / chatbot",
  "Booking / scheduling",
  "Multi-language",
  "API / third-party integration",
];

/**
 * @param {string} projectType
 * @param {string} pageRange
 * @param {string} designTier
 * @param {string[]} [integrations]
 * @returns {{ lowK: number, highK: number, weeks: number }}
 */
function calculate(projectType, pageRange, designTier, integrations = []) {
  if (!PROJECT_TYPES[projectType]) throw new Error(`Unknown project type: ${projectType}`);
  const pi = PAGE_RANGES.indexOf(pageRange);
  if (pi === -1) throw new Error(`Unknown page range: ${pageRange}`);
  const di = DESIGN_TIERS.indexOf(designTier);
  if (di === -1) throw new Error(`Unknown design tier: ${designTier}`);

  const [lo, hi] = PROJECT_TYPES[projectType];
  const pm = PAGE_MULTIPLIERS[pi];
  const dm = DESIGN_MULTIPLIERS[di];
  const im = 1 + integrations.length * 0.15;
  const mobile = projectType.includes("Mobile") || projectType.includes("Bundle");
  const weeks = Math.round(4 + pi * 3 + di * 2 + integrations.length * 0.5 + (mobile ? 6 : 0));

  return {
    lowK:  Math.round(lo * pm * dm * im),
    highK: Math.round(hi * pm * dm * im),
    weeks,
  };
}

module.exports = { PROJECT_TYPES, PAGE_RANGES, DESIGN_TIERS, INTEGRATIONS, calculate };
