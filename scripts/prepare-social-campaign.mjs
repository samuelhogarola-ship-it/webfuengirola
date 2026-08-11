import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const defaultPostsDir = path.join(root, "content", "posts");
const defaultOutDir = path.join(root, "dist", "social-campaign");

const args = parseArgs(process.argv.slice(2));
const postsDir = path.resolve(root, args["posts-dir"] ?? defaultPostsDir);
const outDir = path.resolve(root, args.out ?? defaultOutDir);
const imageDir = path.resolve(postsDir, args["images-dir"] ?? "images");
const defaultPlatforms = splitList(args.platforms ?? "");
const allowMissingImages = Boolean(args["allow-missing-images"]);

if (!fs.existsSync(postsDir)) {
  fail(`Posts directory not found: ${postsDir}`);
}

const postFiles = fs
  .readdirSync(postsDir)
  .filter((file) => /^post-\d{2}-.+\.md$/.test(file))
  .sort((a, b) => a.localeCompare(b, "en"));

if (postFiles.length === 0) {
  fail(`No post markdown files found in ${postsDir}`);
}

const posts = postFiles.map((file) => {
  const sourcePath = path.join(postsDir, file);
  const raw = fs.readFileSync(sourcePath, "utf8");
  const { frontmatter, body } = parseMarkdown(raw, sourcePath);
  const slug = file.replace(/\.md$/, "");
  const number = Number(
    frontmatter.post_number ?? slug.match(/^post-(\d{2})-/)?.[1],
  );
  const platforms = frontmatter.platforms?.length
    ? frontmatter.platforms
    : defaultPlatforms;
  const imagePath = path.join(imageDir, `${slug}.png`);

  return {
    number,
    slug,
    title: String(frontmatter.title ?? ""),
    date: String(frontmatter.date ?? ""),
    time: String(frontmatter.time ?? ""),
    platforms,
    sourcePath,
    imagePath,
    copy: section(body, "Copy"),
    imagePrompt: section(body, "Prompt para generar la foto"),
    altText:
      section(body, "Descripcion SEO (alt text)") ||
      section(body, "Descripción SEO (alt text)"),
    hashtags: section(body, "Hashtags"),
  };
});

const errors = [];
const warnings = [];

for (const post of posts) {
  if (!Number.isFinite(post.number))
    errors.push(`${post.slug}: missing post_number`);
  if (!post.title) errors.push(`${post.slug}: missing title`);
  if (!isIsoDate(post.date))
    errors.push(`${post.slug}: invalid date '${post.date}'`);
  if (!post.time) errors.push(`${post.slug}: missing time`);
  if (!post.copy) errors.push(`${post.slug}: missing ## Copy`);
  if (!post.imagePrompt)
    errors.push(`${post.slug}: missing ## Prompt para generar la foto`);
  if (!post.altText) errors.push(`${post.slug}: missing alt text section`);
  if (!post.hashtags) errors.push(`${post.slug}: missing ## Hashtags`);
  if (!post.platforms.length) errors.push(`${post.slug}: missing platforms`);
  if (!fs.existsSync(post.imagePath)) {
    const message = `${post.slug}: image not found at ${path.relative(root, post.imagePath)}`;
    if (allowMissingImages) warnings.push(message);
    else errors.push(message);
  }
}

const sortedPosts = [...posts].sort((a, b) => a.number - b.number);
for (let index = 1; index < sortedPosts.length; index += 1) {
  const previous = Date.parse(`${sortedPosts[index - 1].date}T00:00:00Z`);
  const current = Date.parse(`${sortedPosts[index].date}T00:00:00Z`);
  const diffDays = Math.round((current - previous) / 86_400_000);
  if (Number.isFinite(diffDays) && diffDays !== 2) {
    warnings.push(
      `${sortedPosts[index - 1].slug} -> ${sortedPosts[index].slug}: ${diffDays} days apart, expected 2`,
    );
  }
}

if (errors.length > 0) {
  fail(
    [
      "Social campaign validation failed:",
      ...errors.map((error) => `- ${error}`),
    ].join("\n"),
  );
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(outDir, "posts"), { recursive: true });

const manifest = sortedPosts.map((post) => {
  const postOutDir = path.join(outDir, "posts", post.slug);
  fs.mkdirSync(postOutDir, { recursive: true });

  const imageOutPath = path.join(postOutDir, `${post.slug}.png`);
  if (fs.existsSync(post.imagePath))
    fs.copyFileSync(post.imagePath, imageOutPath);

  const caption = buildCaption(post);
  for (const platform of post.platforms) {
    if (platform === "facebook") continue;
    fs.writeFileSync(
      path.join(postOutDir, `${platform}-caption.txt`),
      caption,
      "utf8",
    );
  }

  fs.writeFileSync(
    path.join(postOutDir, "alt.txt"),
    `${post.altText}\n`,
    "utf8",
  );
  fs.writeFileSync(
    path.join(postOutDir, "image-prompt.txt"),
    `${post.imagePrompt}\n`,
    "utf8",
  );

  return {
    post_number: post.number,
    slug: post.slug,
    title: post.title,
    scheduled_at: `${post.date} ${post.time}`,
    platforms: post.platforms.filter((platform) => platform !== "facebook"),
    source: rel(post.sourcePath),
    image: fs.existsSync(post.imagePath) ? rel(imageOutPath) : null,
    alt_text: post.altText,
    copy_source: rel(post.sourcePath),
  };
});

fs.writeFileSync(
  path.join(outDir, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);
fs.writeFileSync(path.join(outDir, "calendar.csv"), buildCsv(manifest), "utf8");
fs.writeFileSync(
  path.join(outDir, "image-prompts.json"),
  `${JSON.stringify(
    sortedPosts.map((post) => ({
      post_number: post.number,
      slug: post.slug,
      prompt: post.imagePrompt,
      output: rel(path.join(imageDir, `${post.slug}.png`)),
    })),
    null,
    2,
  )}\n`,
  "utf8",
);

const lines = [
  `Prepared ${manifest.length} social posts in ${rel(outDir)}`,
  `Calendar: ${rel(path.join(outDir, "calendar.csv"))}`,
  `Manifest: ${rel(path.join(outDir, "manifest.json"))}`,
  `Image prompts: ${rel(path.join(outDir, "image-prompts.json"))}`,
];

if (warnings.length > 0) {
  lines.push("", "Warnings:", ...warnings.map((warning) => `- ${warning}`));
}

console.log(lines.join("\n"));

function buildCaption(post) {
  return (
    [post.copy.trim(), post.hashtags.trim()].filter(Boolean).join("\n\n") + "\n"
  );
}

function buildCsv(rows) {
  const header = [
    "post_number",
    "date",
    "time",
    "platforms",
    "title",
    "source",
    "image",
    "alt_text",
  ];
  const body = rows.map((row) => {
    const [date, ...timeParts] = row.scheduled_at.split(" ");
    return [
      row.post_number,
      date,
      timeParts.join(" "),
      row.platforms.join("|"),
      row.title,
      row.source,
      row.image ?? "",
      row.alt_text,
    ]
      .map(csvCell)
      .join(",");
  });
  return `${header.join(",")}\n${body.join("\n")}\n`;
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function parseMarkdown(raw, sourcePath) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) fail(`Missing frontmatter in ${sourcePath}`);
  return {
    frontmatter: parseFrontmatter(match[1]),
    body: match[2],
  };
}

function parseFrontmatter(raw) {
  const result = {};
  for (const line of raw.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    const value = rawValue.trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      result[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else if (/^\d+$/.test(value)) {
      result[key] = Number(value);
    } else {
      result[key] = value.replace(/^["']|["']$/g, "");
    }
  }
  return result;
}

function section(body, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = body.match(
    new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`, "m"),
  );
  return match?.[1].trim() ?? "";
}

function splitList(value) {
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseArgs(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 1) {
    const arg = values[index];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = values[index + 1];
    if (!next || next.startsWith("--")) parsed[key] = true;
    else {
      parsed[key] = next;
      index += 1;
    }
  }
  return parsed;
}

function isIsoDate(value) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
  );
}

function rel(filePath) {
  return path.relative(root, filePath);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
