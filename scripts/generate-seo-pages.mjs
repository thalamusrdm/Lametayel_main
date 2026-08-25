#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { updatedArticles } from "../src/data/updatedArticles.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(root, "dist", "client");
const templatePath = path.join(outputRoot, "index.html");
const template = readFileSync(templatePath, "utf8");
const siteOrigin = "https://lametayel-main.vercel.app";
const dateModified = "2026-08-24";

const seoMeta = {
  "/blog": {
    title: "מדריכי ביטוח נסיעות לחו״ל | למטייל ביטוח",
    description: "מדריכים עדכניים לביטוח נסיעות לחו״ל: בחירת פוליסה, ביטוח לילדים, ביטוח בהריון ותשובות לשאלות נפוצות.",
    image: "/article-images/travel-planning.jpg",
  },
  "/blog/blog1": {
    title: "איך לבחור ביטוח נסיעות לחו״ל? מדריך 2026",
    description: "מדריך מעודכן לבחירת ביטוח נסיעות לחו״ל: כיסוי רפואי, מצב רפואי קודם, כבודה, ספורט, ביטול נסיעה ושירות בחו״ל.",
    image: "/article-images/travel-planning.jpg",
  },
  "/blog/blog2": {
    title: "ביטוח נסיעות לילדים: מדריך להורים 2026",
    description: "מה חשוב לבדוק בביטוח נסיעות לילדים? כיסוי רפואי, מצב רפואי קודם, ספורט אתגרי, תרופות וטיפול בחו״ל.",
    image: "/article-images/family-travel.jpg",
  },
  "/blog/blog3": {
    title: "ביטוח נסיעות בהריון: עד איזה שבוע? מדריך 2026",
    description: "ביטוח נסיעות בהריון: עד איזה שבוע ניתן לרכוש הרחבה, מה חשוב לבדוק, אילו מסמכים לקחת ואיך מקבלים טיפול בחו״ל.",
    image: "/article-images/pregnancy-travel.jpg",
  },
  "/blog/blog5": {
    title: "ביטוח נסיעות לחו״ל: שאלות ותשובות 2026",
    description: "שאלות ותשובות עדכניות על ביטוח נסיעות: רופא בחו״ל, Air Doctor, מזוודה, מוקד חירום, מצב רפואי קודם והארכת הפוליסה.",
    image: "/article-images/travel-planning.jpg",
  },
};

const escapeHtml = (value = "") => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

function renderBlock(block) {
  if (block.type === "heading") {
    if (block.level === 1) return "";
    const tag = block.level >= 3 ? "h3" : "h2";
    return `<${tag}>${escapeHtml(block.text)}</${tag}>`;
  }
  if (block.type === "paragraph") {
    const links = (block.links || []).map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.text)}</a>`).join(" ");
    return `<p>${escapeHtml(block.text.replace(/^✅\s*/, ""))}</p>${links ? `<nav>${links}</nav>` : ""}`;
  }
  if (block.type === "list") {
    const tag = block.ordered ? "ol" : "ul";
    return `<${tag}>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</${tag}>`;
  }
  return "";
}

function renderFallback(page, meta, route) {
  const faq = (page.faq || []).map((item) => `<section><h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></section>`).join("");
  const sources = (page.sources || []).map((source) => `<li><a href="${escapeHtml(source.href)}">${escapeHtml(source.label)}</a></li>`).join("");
  return `<main class="seo-prerender" dir="rtl">
    <article>
      <p>למטייל ביטוח · תוכן מעודכן</p>
      <h1>${escapeHtml(page.title)}</h1>
      <p>${escapeHtml(meta.description)}</p>
      ${page.blocks.map(renderBlock).join("\n")}
      ${faq ? `<section><h2>שאלות נפוצות</h2>${faq}</section>` : ""}
      ${sources ? `<section><h2>מקורות ועדכון מידע</h2><ul>${sources}</ul></section>` : ""}
      <p><a href="${route}">לקריאת הכתבה באתר למטייל ביטוח</a></p>
    </article>
  </main>`;
}

function buildSchema(page, meta, route) {
  const canonical = `${siteOrigin}${route}`;
  const graph = [
    route === "/blog" ? {
      "@type": "CollectionPage",
      name: meta.title,
      description: meta.description,
      url: canonical,
      inLanguage: "he-IL",
    } : {
      "@type": "BlogPosting",
      headline: page.title,
      description: meta.description,
      image: [`${siteOrigin}${meta.image}`],
      datePublished: dateModified,
      dateModified,
      inLanguage: "he-IL",
      mainEntityOfPage: canonical,
      author: { "@type": "Organization", name: "צוות התוכן של למטייל ביטוח", url: `${siteOrigin}/aboutus` },
      publisher: { "@type": "Organization", name: "למטייל סוכנות לביטוח (1993) בע״מ", url: siteOrigin },
      citation: (page.sources || []).map((source) => source.href),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "דף הבית", item: siteOrigin },
        { "@type": "ListItem", position: 2, name: "מדריכים", item: `${siteOrigin}/blog` },
        { "@type": "ListItem", position: 3, name: page.title, item: canonical },
      ],
    },
  ];
  if (page.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c");
}

for (const [route, meta] of Object.entries(seoMeta)) {
  const page = updatedArticles[route];
  const canonical = `${siteOrigin}${route}`;
  const head = `
    <link rel="canonical" href="${canonical}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta property="og:locale" content="he_IL" />
    <meta property="og:type" content="${route === "/blog" ? "website" : "article"}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteOrigin}${meta.image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <script id="page-structured-data" type="application/ld+json">${buildSchema(page, meta, route)}</script>`;
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(meta.description)}" />`)
    .replace("</head>", `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${renderFallback(page, meta, route)}</div>`);
  const outputPath = path.join(outputRoot, "seo", `${route.slice(1).replaceAll("/", path.sep)}.html`);
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html);
}

console.log(`Generated ${Object.keys(seoMeta).length} SEO entry pages in dist/client/seo.`);
