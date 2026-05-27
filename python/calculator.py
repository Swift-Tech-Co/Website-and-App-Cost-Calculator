"""
Website & App Cost Calculator
Swift Tech Co. — https://swifttechco.com

Estimates build cost and timeline for websites and apps based on project type,
page count, design tier, and required integrations.
"""

PROJECT_TYPES = {
    "Custom Website":                   (3,  8),
    "Website Redesign":                 (2,  6),
    "E-Commerce Store":                 (5, 18),
    "Mobile App (iOS & Android)":       (15, 50),
    "Web App / Portal":                 (12, 45),
    "Chatbot Integration":              (4,  14),
    "Website + Mobile App Bundle":      (20, 60),
}

PAGE_RANGES = [
    "1 to 5 pages",
    "6 to 15 pages",
    "16 to 30 pages",
    "30+ pages / complex",
]
PAGE_MULTIPLIERS = [1.0, 1.3, 1.7, 2.4]

DESIGN_TIERS = [
    "Standard (template-based)",
    "Custom Design (unique UI)",
    "Premium (brand system + animations)",
    "Enterprise (design system + multi-brand)",
]
DESIGN_MULTIPLIERS = [1.0, 1.4, 1.9, 2.6]

INTEGRATIONS = [
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
]


def calculate(
    project_type: str,
    page_range: str,
    design_tier: str,
    integrations: list = None,
) -> dict:
    """
    Returns estimated cost range (USD thousands) and timeline (weeks).

    Args:
        project_type: One of PROJECT_TYPES keys.
        page_range: One of PAGE_RANGES.
        design_tier: One of DESIGN_TIERS.
        integrations: List of integration strings from INTEGRATIONS.

    Returns:
        dict with keys: low_k, high_k, weeks
    """
    if project_type not in PROJECT_TYPES:
        raise ValueError(f"Unknown project type: {project_type}")
    if page_range not in PAGE_RANGES:
        raise ValueError(f"Unknown page range: {page_range}")
    if design_tier not in DESIGN_TIERS:
        raise ValueError(f"Unknown design tier: {design_tier}")

    integrations = integrations or []
    lo, hi = PROJECT_TYPES[project_type]
    pi = PAGE_RANGES.index(page_range)
    di = DESIGN_TIERS.index(design_tier)
    pm = PAGE_MULTIPLIERS[pi]
    dm = DESIGN_MULTIPLIERS[di]
    im = 1 + len(integrations) * 0.15
    mobile = "Mobile" in project_type or "Bundle" in project_type
    weeks = round(4 + pi * 3 + di * 2 + len(integrations) * 0.5 + (6 if mobile else 0))

    return {
        "low_k":  round(lo * pm * dm * im),
        "high_k": round(hi * pm * dm * im),
        "weeks":  weeks,
    }
