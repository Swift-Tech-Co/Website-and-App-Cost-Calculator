#!/usr/bin/env python3
"""
Website & App Cost Calculator — CLI
Swift Tech Co. — https://swifttechco.com
"""

from calculator import PROJECT_TYPES, PAGE_RANGES, DESIGN_TIERS, INTEGRATIONS, calculate


def interactive():
    print("\nWebsite & App Cost Calculator")
    print("Swift Tech Co. — https://swifttechco.com")
    print("=" * 48)

    types = list(PROJECT_TYPES.keys())
    print("\nProject type:")
    for i, t in enumerate(types, 1):
        print(f"  {i}. {t}")
    idx = int(input(f"Select (1-{len(types)}): ")) - 1
    project_type = types[idx]

    print("\nNumber of pages / screens:")
    for i, p in enumerate(PAGE_RANGES, 1):
        print(f"  {i}. {p}")
    idx = int(input(f"Select (1-{len(PAGE_RANGES)}): ")) - 1
    page_range = PAGE_RANGES[idx]

    print("\nDesign tier:")
    for i, d in enumerate(DESIGN_TIERS, 1):
        print(f"  {i}. {d}")
    idx = int(input(f"Select (1-{len(DESIGN_TIERS)}): ")) - 1
    design_tier = DESIGN_TIERS[idx]

    print("\nIntegrations needed (comma-separated numbers, or leave blank):")
    for i, n in enumerate(INTEGRATIONS, 1):
        print(f"  {i}. {n}")
    raw = input("Select integrations: ").strip()
    integrations = []
    if raw:
        for n in raw.split(","):
            n = n.strip()
            if n.isdigit():
                integrations.append(INTEGRATIONS[int(n) - 1])

    result = calculate(project_type, page_range, design_tier, integrations)
    print("\n" + "=" * 48)
    print("Your Estimate")
    print(f"  Build cost:  ${result['low_k']}K to ${result['high_k']}K USD")
    print(f"  Timeline:    {result['weeks']} weeks")
    print("\nGet a detailed quote: https://swifttechco.com/contact")


if __name__ == "__main__":
    interactive()
