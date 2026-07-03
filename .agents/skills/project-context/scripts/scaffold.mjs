/**
 * Bootstrap five-layer project context files from templates.
 *
 * Usage (from repo root):
 *   node .agents/skills/project-context/scripts/scaffold.mjs
 *   node .agents/skills/project-context/scripts/scaffold.mjs --with-governance
 *   node .agents/skills/project-context/scripts/scaffold.mjs --dry-run
 *   node .agents/skills/project-context/scripts/scaffold.mjs --force
 *   node .agents/skills/project-context/scripts/scaffold.mjs --root /path/to/project
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.join(__dirname, "..");
const REFS = path.join(SKILL_ROOT, "references");
const MARKER = "<!-- project-context scaffold v2 -->";

const CORE_FILES = [
  { src: "AGENTS.template.md", dest: "AGENTS.md" },
  { src: "STATUS.template.md", dest: "docs/STATUS.md" },
  { src: "session-TEMPLATE.md", dest: "docs/sessions/_TEMPLATE.md" },
  { src: "gotchas.template.mdc", dest: ".cursor/rules/project-gotchas.mdc" },
  { src: "conventions.template.mdc", dest: ".cursor/rules/project-conventions.mdc" },
];

const GOVERNANCE_FILES = [
  { src: "collaboration-charter.template.md", dest: "docs/AI-COLLABORATION-CHARTER.md" },
  { src: "complex-task-gate.template.md", dest: "docs/COMPLEX-TASK-GATE.md" },
  { src: "multi-source-exec-plan.template.md", dest: "docs/MULTI-SOURCE-EXEC-PLAN.md" },
  { src: "doc-lifecycle.template.md", dest: "docs/DOC-LIFECYCLE.md" },
];

const DIRS = ["docs", "docs/sessions", ".cursor/rules", "guidelines"];

const DEFAULT_GITIGNORE = `# project-context scaffold
node_modules/
dist/
.env
.env.*
!.env.example
.DS_Store
Thumbs.db
`;

function parseArgs(argv) {
  const opts = { dryRun: false, force: false, withGovernance: false, root: null };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--force") opts.force = true;
    else if (arg === "--with-governance") opts.withGovernance = true;
    else if (arg === "--root") opts.root = argv[++i];
    else if (arg === "-h" || arg === "--help") {
      console.log(`Usage: node scaffold.mjs [options]

  --dry-run           Print actions without writing
  --force             Overwrite files that still contain the scaffold marker
  --with-governance   Also scaffold charter, COMPLEX-TASK-GATE, MULTI-SOURCE, DOC-LIFECYCLE
  --root PATH         Target project root (default: walk up from cwd)
`);
      process.exit(0);
    } else {
      console.error(`Unknown argument: ${arg}`);
      process.exit(1);
    }
  }
  return opts;
}

function findProjectRoot(startDir) {
  let dir = path.resolve(startDir);
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, "AGENTS.md")) || fs.existsSync(path.join(dir, ".git"))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return path.resolve(startDir);
}

function readTemplate(name) {
  const p = path.join(REFS, name);
  if (!fs.existsSync(p)) {
    throw new Error(`Missing template: ${p}`);
  }
  return fs.readFileSync(p, "utf8");
}

function applyPlaceholders(content, projectRoot) {
  const name = path.basename(projectRoot);
  const today = new Date().toISOString().slice(0, 10);
  return content
    .replaceAll("{{PROJECT_NAME}}", name)
    .replaceAll("{{YYYY-MM-DD}}", today)
    .replaceAll("{{OWNER}}", "maintainer")
    .replaceAll("{{TIMEZONE}}", "Asia/Shanghai")
    .replaceAll("{EXPLORE_DIR}", "design-demos")
    .replaceAll("{APP_DIR}", "src")
    .replaceAll("{{PRODUCT_MANUAL_DOC}}", "docs/PRODUCT-MANUAL.md")
    .replaceAll("{{DOMAIN_SKILL_PATH}}", ".agents/skills/example/SKILL.md")
    .replaceAll("{{DOMAIN_CONSTRAINT_DOC}}", "docs/DOMAIN-CONSTRAINTS.md")
    .replaceAll("{{SKILL_EXAMPLE}}", ".agents/skills/example/SKILL.md")
    .replaceAll("{{TOPIC_DOC_EXAMPLE}}", "docs/DOMAIN-CONSTRAINTS.md")
    .replaceAll("{{MANUAL_DOC}}", "docs/PRODUCT-MANUAL.md");
}

function injectMarker(content, isMdc) {
  if (isMdc) {
    const end = content.indexOf("---", 3);
    if (end === -1) return `${MARKER}\n\n${content}`;
    return `${content.slice(0, end + 3)}\n\n${MARKER}\n${content.slice(end + 3)}`;
  }
  return `${MARKER}\n\n${content}`;
}

function hasScaffoldMarker(content) {
  return content.includes("project-context scaffold");
}

function ensureDir(dirPath, dryRun) {
  if (fs.existsSync(dirPath)) return;
  if (dryRun) {
    console.log(`[dry-run] mkdir ${dirPath}`);
    return;
  }
  fs.mkdirSync(dirPath, { recursive: true });
  console.log(`created dir ${dirPath}`);
}

function writeFile(destPath, content, { dryRun, force, existing }) {
  const rel = path.relative(process.cwd(), destPath) || destPath;
  if (existing && !force) {
    console.log(`skip (exists) ${rel}`);
    return "skip";
  }
  if (existing && force && !hasScaffoldMarker(existing)) {
    console.log(`skip (customized) ${rel}`);
    return "skip-custom";
  }
  if (dryRun) {
    console.log(`[dry-run] write ${rel}${existing ? " (overwrite scaffold)" : ""}`);
    return existing ? "overwrite" : "create";
  }
  fs.writeFileSync(destPath, content, "utf8");
  console.log(`${existing ? "updated" : "created"} ${rel}`);
  return existing ? "overwrite" : "create";
}

function main() {
  const opts = parseArgs(process.argv);
  const projectRoot = opts.root ? path.resolve(opts.root) : findProjectRoot(process.cwd());
  const files = opts.withGovernance ? [...CORE_FILES, ...GOVERNANCE_FILES] : CORE_FILES;

  console.log(`Project root: ${projectRoot}`);
  console.log(`Templates: ${REFS}`);
  if (opts.withGovernance) console.log("Including governance docs (charter, gates, lifecycle)\n");
  if (opts.dryRun) console.log("(dry-run mode)\n");

  for (const d of DIRS) {
    ensureDir(path.join(projectRoot, d), opts.dryRun);
  }

  const stats = { create: 0, overwrite: 0, skip: 0, skipCustom: 0 };

  for (const { src, dest } of files) {
    const destPath = path.join(projectRoot, dest);
    const isMdc = dest.endsWith(".mdc");
    const existing = fs.existsSync(destPath) ? fs.readFileSync(destPath, "utf8") : null;

    let content = applyPlaceholders(readTemplate(src), projectRoot);
    if (!existing) {
      content = injectMarker(content, isMdc);
    }

    const result = writeFile(destPath, content, {
      dryRun: opts.dryRun,
      force: opts.force,
      existing,
    });
    if (result === "create") stats.create++;
    else if (result === "overwrite") stats.overwrite++;
    else if (result === "skip-custom") stats.skipCustom++;
    else stats.skip++;
  }

  const gitignorePath = path.join(projectRoot, ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    if (opts.dryRun) {
      console.log("[dry-run] write .gitignore");
      stats.create++;
    } else {
      fs.writeFileSync(gitignorePath, DEFAULT_GITIGNORE, "utf8");
      console.log("created .gitignore");
      stats.create++;
    }
  } else {
    console.log("skip (exists) .gitignore");
    stats.skip++;
  }

  console.log(
    `\nDone: ${stats.create} created, ${stats.overwrite} overwritten, ${stats.skip} skipped, ${stats.skipCustom} skipped (customized).`
  );
  console.log("Next: fill placeholders in AGENTS.md / gotchas / STATUS, then git commit.");
  if (!opts.withGovernance) {
    console.log("Tip: run with --with-governance to add charter + COMPLEX-TASK-GATE + MULTI-SOURCE + DOC-LIFECYCLE stubs.");
  }
}

main();
