#!/usr/bin/env node
/**
 * Website & App Cost Calculator — CLI
 * Swift Tech Co. — https://swifttechco.com
 */

const { PROJECT_TYPES, PAGE_RANGES, DESIGN_TIERS, INTEGRATIONS, calculate } = require("./calculator");
const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(r => rl.question(q, r));

async function interactive() {
  console.log("\nWebsite & App Cost Calculator");
  console.log("Swift Tech Co. — https://swifttechco.com");
  console.log("=".repeat(48));

  const types = Object.keys(PROJECT_TYPES);
  console.log("\nProject type:");
  types.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
  const tIdx = parseInt(await ask(`Select (1-${types.length}): `), 10) - 1;

  console.log("\nNumber of pages / screens:");
  PAGE_RANGES.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
  const pIdx = parseInt(await ask(`Select (1-${PAGE_RANGES.length}): `), 10) - 1;

  console.log("\nDesign tier:");
  DESIGN_TIERS.forEach((d, i) => console.log(`  ${i + 1}. ${d}`));
  const dIdx = parseInt(await ask(`Select (1-${DESIGN_TIERS.length}): `), 10) - 1;

  console.log("\nIntegrations needed (comma-separated numbers, or leave blank):");
  INTEGRATIONS.forEach((n, i) => console.log(`  ${i + 1}. ${n}`));
  const intRaw = await ask("Select integrations: ");
  const integrations = intRaw.trim()
    ? intRaw.split(",").map(s => INTEGRATIONS[parseInt(s.trim(), 10) - 1]).filter(Boolean)
    : [];

  rl.close();

  const result = calculate(types[tIdx], PAGE_RANGES[pIdx], DESIGN_TIERS[dIdx], integrations);
  console.log("\n" + "=".repeat(48));
  console.log("Your Estimate");
  console.log(`  Build cost:  $${result.lowK}K to $${result.highK}K USD`);
  console.log(`  Timeline:    ${result.weeks} weeks`);
  console.log("\nGet a detailed quote: https://swifttechco.com/contact");
}

interactive().catch(e => { console.error(e.message); process.exit(1); });
