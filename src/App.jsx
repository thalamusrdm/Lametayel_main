import { useEffect, useState } from "react";
import {
  contentPagesByPath,
  getContentTitle,
  infoSections,
  normalizeContentHref,
  pageMeta,
} from "./contentPages.js";

const OLD_SITE = "https://insurance.lametayel.co.il";
const PURCHASE_URL = "/legacy/buy/step1";
const SITE_ORIGIN = "https://lametayel-main.vercel.app";

function setMeta(name, content, attribute = "name") {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function usePageMetadata({ title, description, path, image, article, faq = [], keywords = [], sources = [] }) {
  useEffect(() => {
    const canonicalUrl = `${SITE_ORIGIN}${path}`;
    const imageUrl = image ? `${SITE_ORIGIN}${image}` : `${SITE_ORIGIN}/brand/lametayel-logo.png`;
    const pageType = article ? "article" : "website";

    document.title = title;
    document.documentElement.lang = "he";
    setMeta("description", description);
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMeta("og:locale", "he_IL", "property");
    setMeta("og:type", pageType, "property");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", imageUrl, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", imageUrl);
    if (keywords.length) setMeta("keywords", keywords.join(", "));
    if (article?.dateModified) setMeta("article:modified_time", article.dateModified, "property");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "דף הבית", item: SITE_ORIGIN },
        { "@type": "ListItem", position: 2, name: "מידע שימושי", item: `${SITE_ORIGIN}/info` },
        { "@type": "ListItem", position: 3, name: title.replace(/ \| למטייל ביטוח$/, ""), item: canonicalUrl },
      ],
    };
    const mainEntity = article ? {
      "@type": "BlogPosting",
      headline: article.headline,
      description,
      image: [imageUrl],
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      inLanguage: "he-IL",
      mainEntityOfPage: canonicalUrl,
      author: { "@type": "Organization", name: "צוות התוכן של למטייל ביטוח", url: `${SITE_ORIGIN}/aboutus` },
      publisher: {
        "@type": "Organization",
        name: "למטייל סוכנות לביטוח (1993) בע״מ",
        url: SITE_ORIGIN,
        logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/brand/lametayel-logo.png` },
      },
      keywords: keywords.join(", "),
      citation: sources.map((source) => source.href),
    } : {
      "@type": "WebPage",
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: "he-IL",
      primaryImageOfPage: image ? { "@type": "ImageObject", url: imageUrl } : undefined,
    };
    const graph = [mainEntity, breadcrumb];
    if (faq.length) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      });
    }

    let structuredData = document.getElementById("page-structured-data");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "page-structured-data";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  }, [article, description, faq, image, keywords, path, sources, title]);
}

const navItems = [
  ["רכישת ביטוח", "/buy/step1"],
  ["הארכה / ביטול פוליסה", "/bought_policies"],
  ["מידע שימושי", "/info"],
  ["מכשיר לוויני", "/sat"],
  ["צור קשר", "/contact"],
];

const benefits = [
  ["/brand/earth-icon.png", "ביטוח ביטול וקיצור נסיעה", "החזר על הוצאות נסיעה במקרה רפואי שמונע מכם לצאת או מחייב לקצר את הטיול."],
  ["/brand/clock-icon.png", "מוקד זמין 24/7", "ייעוץ רפואי, חוות דעת שנייה, הטסה וקשר עם צוות האיתור והחילוץ בכל שעה."],
  ["/brand/wallet-icon.png", "ללא השתתפות עצמית", "מבוטחי למטייל הראל אינם משלמים השתתפות עצמית עבור תביעות רפואיות."],
  ["/brand/money-icon.png", "תור לרופא באפליקציה", "קובעים תור דרך Air Doctor והראל משלמים לרופא ישירות, בלי להמתין להחזר."],
];

const testimonials = [
  ["במהלך כל חמשת ימי הטיפול הרגשנו שאיננו לבד במערכה. קיבלנו הנחיות ברורות, עדכונים וזמינות מלאה בדיוק ברגע שבו היינו צריכים אתכם.", "א.מ. (השם המלא שמור במערכת)"],
  ["אין מספיק מילים של תודה על הטיפול המהיר והיעיל בחילוץ. הצוות היה איתנו לכל אורך הדרך ונתן תחושה שאנחנו בידיים הטובות ביותר.", "א.ס. (השם המלא שמור במערכת)"],
  ["נותרתי המום מהמהירות שבה התביעה טופלה ומהפשטות שבה קיבלתי את מלוא ההוצאה. השירות הפך אירוע מלחיץ להרבה יותר קל.", "ל.מ. (השם המלא שמור במערכת)"],
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-accent" />
      <div className="header-inner">
        <a className="brand" href="/" aria-label="למטייל ביטוח - דף הבית"><img src="/brand/lametayel-logo.png" alt="למטייל ביטוח" /></a>
        <button
          className={open ? "menu-button is-open" : "menu-button"}
          type="button"
          aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav id="main-navigation" className={open ? "main-nav is-open" : "main-nav"}>
          {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <a className="login-link" href={`${OLD_SITE}/users/sign_in`}>התחברות</a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer"><div className="footer-inner">
      <img src="/brand/lametayel-logo.png" alt="למטייל ביטוח" />
      <div className="footer-links"><a href="/buy/step1">רכישת ביטוח</a><a href="/info">מידע שימושי</a><a href="/aboutus">אודות</a><a href="/contact">צור קשר</a><a href="/rules">תקנון האתר</a><a href="/negishut">הצהרת נגישות</a></div>
      <p>לבירורים והזמנות טלפוניות: <a href="tel:0773334566">077-3334566</a></p>
      <small>© 2026 למטייל סוכנות לביטוח (1993) בע״מ. כל הזכויות שמורות.</small>
    </div></footer>
  );
}

function ServiceCard() {
  return <aside className="service-card" aria-label="שירות לקוחות"><img src="/brand/service-avatar.png" alt="נציגת שירות למטייל" /><strong>״למטייל״ לשירותך</strong><span>מעוניינים בשיחה עם נציג?</span><a href="tel:0773334566">חזרו אלי בטלפון</a><small>או התקשרו 077-3334566</small></aside>;
}

function HomePage() {
  const [testimonial, setTestimonial] = useState(0);
  const [cookies, setCookies] = useState(true);
  useEffect(() => { const timer = window.setInterval(() => setTestimonial((i) => (i + 1) % testimonials.length), 7000); return () => window.clearInterval(timer); }, []);
  return <>
    <Header />
    <main>
      <section className="hero"><div className="hero-content"><p className="eyebrow">למטייל סוכנות לביטוח</p><h1>ביטוח נסיעות לחו״ל המקיף ביותר למטייל</h1><p className="hero-subtitle">אפליקציה שמלווה אותך בחו״ל לכל מקרה שלא יקרה</p><div className="contact-row"><a className="contact-pill phone" href="tel:0773334566"><img src="/brand/phone-icon.png" alt="" /> 077-3334566</a><a className="contact-pill whatsapp" href="tel:0548949957"><img src="/brand/whatsapp-icon.png" alt="" /> 054-8949957</a></div><a className="primary-cta" href="/buy/step1">לרכישת ביטוח</a></div></section>
      <section className="branches-strip">לרכישת ביטוח נסיעות לחו״ל גם בכל סניפי למטייל</section>
      <section id="benefits" className="benefits-section section-shell"><p className="eyebrow orange">נוסעים בראש שקט</p><h2>למה ביטוח נסיעות ב״למטייל״?</h2><div className="benefits-grid">{benefits.map(([icon, title, text]) => <article className="benefit-card" key={title}><img src={icon} alt="" /><h3>{title}</h3><p>{text}</p></article>)}</div><a className="primary-cta compact" href="/buy/step1">לרכישת ביטוח</a></section>
      <section className="app-section"><div className="app-content section-shell"><div className="app-copy"><p className="eyebrow">הכול במקום אחד</p><h2>אפליקציה אחת לכל מה שצריך מהביטוח בזמן הטיול</h2><p className="app-lead">בלי שיחות למוקד ובלי כאבי ראש</p><div className="app-points"><article><h3>תשלום מראש לטיפול רפואי</h3><p>קובעים תור באפליקציה, מגיעים לרופא והראל משלמים ישירות.</p></article><article><h3>איתור רופא ומרכז רפואי</h3><p>מוצאים רופאים ומרכזים רפואיים בקרבת מקום באמצעות Air Doctor.</p></article><article><h3>ייעוץ רפואי 24/7</h3><p>מגישים בקשה לחוות דעת שנייה מרופא מטעם הראל בכל שעה.</p></article></div></div></div></section>
      <section className="testimonials-section"><div className="testimonial-content section-shell"><p className="eyebrow">אנחנו איתכם גם כשאתם רחוקים</p><h2>איך אנחנו יכולים לדאוג לך</h2><blockquote>״{testimonials[testimonial][0]}״</blockquote><cite>{testimonials[testimonial][1]}</cite><div className="testimonial-tabs" role="tablist" aria-label="המלצות נוסעים">{testimonials.map((item, index) => <button key={item[1]} type="button" role="tab" aria-selected={testimonial === index} aria-label={`המלצה ${index + 1}`} onClick={() => setTestimonial(index)} />)}</div></div></section>
      <section className="bottom-cta"><h2>יוצאים לחו״ל? אנחנו כאן בשבילכם</h2><a className="primary-cta compact" href="/buy/step1">לרכישת ביטוח</a></section>
    </main>
    <Footer /><ServiceCard />
    {cookies && <aside className="cookie-banner" aria-label="הודעת עוגיות"><p>האתר משתמש בקובצי עוגיות. המשך הגלישה מהווה הסכמה.</p><button type="button" onClick={() => setCookies(false)}>אישור</button></aside>}
  </>;
}

function InfoHubPage() {
  usePageMetadata({
    title: "מידע שימושי ומדריכי ביטוח נסיעות | למטייל ביטוח",
    description: "מדריכי ביטוח נסיעות, פרטי פוליסות, מידע למשפחות ולמטיילים ושירות למבוטחי למטייל ביטוח.",
    path: "/info",
    image: "/article-images/travel-planning.jpg",
  });

  return <div className="content-site-page">
    <Header />
    <main className="info-main">
      <section className="info-hero">
        <div className="section-shell">
          <p className="eyebrow">כל המידע, במקום אחד</p>
          <h1>יוצאים לחו״ל מוכנים יותר</h1>
          <p>מדריכים, פרטי פוליסות, שירות למבוטחים ומידע רשמי שהועבר מהאתר המקורי למעטפת החדשה.</p>
        </div>
      </section>
      <div className="info-sections section-shell">
        {infoSections.map((section, sectionIndex) => <section className="info-section" key={section.title}>
          <div className="info-section-heading">
            <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
            <div><h2>{section.title}</h2><p>{section.description}</p></div>
          </div>
          <div className="info-card-grid">
            {section.paths.map((path, cardIndex) => {
              const meta = pageMeta[path];
              return <a className="info-card" href={path} key={path}>
                <span className="info-card-image"><img src={meta.image} alt="" loading="lazy" /></span>
                <span className="info-card-index">{String(cardIndex + 1).padStart(2, "0")}</span>
                <span className="info-card-body">
                  <span className="info-card-eyebrow">{meta.eyebrow}</span>
                  <h3>{meta.label}</h3>
                  <span className="info-card-summary">{meta.summary}</span>
                  <strong>לקריאה</strong>
                </span>
              </a>;
            })}
          </div>
        </section>)}
      </div>
      <section className="content-bottom-cta">
        <div><p>כבר יודעים איזה כיסוי אתם צריכים?</p><h2>אפשר לצאת לדרך</h2></div>
        <a className="primary-cta compact" href="/buy/step1">לרכישת ביטוח</a>
      </section>
    </main>
    <Footer /><ServiceCard />
  </div>;
}

function ContactPanel() {
  return <div className="contact-options">
    <a className="contact-option" href="tel:0773334566">
      <span>טלפון</span><strong dir="ltr">077-3334566</strong><small>לבירורים ולהזמנות</small>
    </a>
    <a className="contact-option whatsapp-option" href="https://wa.me/972548949957" target="_blank" rel="noreferrer">
      <span>WhatsApp</span><strong dir="ltr">054-8949957</strong><small>שיחה עם נציג</small>
    </a>
    <a className="contact-option" href="mailto:insurance@lametayel.co.il">
      <span>דואר אלקטרוני</span><strong>insurance@lametayel.co.il</strong><small>נחזור אליכם בהקדם</small>
    </a>
    <div className="contact-address">
      <span>כתובת למשלוח דואר</span>
      <strong>למטייל סוכנות לביטוח בע״מ</strong>
      <p>אימבר 7, קריית אריה, פתח תקווה 49511</p>
    </div>
  </div>;
}

function localOrExternalLinkProps(href) {
  const normalized = normalizeContentHref(href);
  const external = normalized?.startsWith("http");
  return {
    href: normalized,
    ...(external ? { target: "_blank", rel: "noreferrer" } : {}),
  };
}

function ContentBlock({ block, page, blockIndex }) {
  const anchorId = block.type === "heading" ? `section-${blockIndex}` : undefined;
  const blockLinks = (block.links || []).filter((link) => link.text && link.href);
  const matchingHeadingLink = block.type === "heading"
    ? page.links?.find((link) => link.text && block.text.includes(link.text))
    : null;

  if (block.type === "heading") {
    if (block.level === 1) return null;
    const Heading = block.level >= 3 ? "h3" : "h2";
    const headingContent = matchingHeadingLink
      ? <a {...localOrExternalLinkProps(matchingHeadingLink.href)}>{block.text}</a>
      : block.text;
    if (block.text.length > 125) return <p className="content-lead" id={anchorId}>{headingContent}</p>;
    return <Heading id={anchorId}>{headingContent}</Heading>;
  }

  if (block.type === "paragraph") {
    const isChecklist = block.text.startsWith("✅");
    const isNotice = block.text.startsWith("⛷");
    const text = block.text.replace(/^[✅⛷️\s]+/, "");
    return <div className={isNotice ? "content-notice" : isChecklist ? "content-check" : undefined}>
      <p>{text}</p>
      {blockLinks.length > 0 && <div className="content-inline-links">
        {blockLinks.map((link) => <a {...localOrExternalLinkProps(link.href)} key={`${link.href}-${link.text}`}>{link.text}</a>)}
      </div>}
    </div>;
  }

  if (block.type === "list") {
    const List = block.ordered ? "ol" : "ul";
    return <List className="content-list">{block.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</List>;
  }

  if (block.type === "table") {
    const [headings = [], ...rows] = block.rows;
    return <div className="content-table-wrap" role="region" aria-label="טבלת גבולות אחריות" tabIndex="0">
      <table className="content-table">
        <thead><tr>{headings.map((cell, index) => <th scope="col" key={`${cell}-${index}`}>{cell}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>;
  }

  if (block.type === "quote") return <blockquote className="content-quote">{block.text}</blockquote>;
  return null;
}

function AppDownloadLinks() {
  return <div className="app-download-links">
    <a href="https://play.google.com/store/apps/details?id=com.harel360rn&hl=iw" target="_blank" rel="noreferrer">הורדה ל־Android</a>
    <a href="https://apps.apple.com/il/app/id1493917180" target="_blank" rel="noreferrer">הורדה ל־iPhone</a>
  </div>;
}

function ArticleFaq({ items }) {
  if (!items?.length) return null;
  return <section className="article-faq" aria-labelledby="article-faq-title">
    <h2 id="article-faq-title">שאלות נפוצות</h2>
    <div className="article-faq-list">
      {items.map((item) => <article className="article-faq-item" key={item.question}>
        <h3>{item.question}</h3>
        <p>{item.answer}</p>
      </article>)}
    </div>
  </section>;
}

function ArticleSources({ sources }) {
  if (!sources?.length) return null;
  return <section className="article-sources" aria-labelledby="article-sources-title">
    <h2 id="article-sources-title">מקורות ועדכון מידע</h2>
    <p>המידע נבדק מול המקורות הרשמיים הבאים. תנאי הפוליסה ודף פרטי הביטוח שנמסרו למבוטח הם המחייבים.</p>
    <ul>{sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul>
  </section>;
}

function prepareContentBlocks(path, blocks) {
  if (path !== "/family") return blocks;

  let skippingDuplicateSummary = false;
  let skippedFirstSummary = false;
  return blocks.filter((block) => {
    if (!skippedFirstSummary && block.type === "heading" && block.text === "לסיכום") {
      skippingDuplicateSummary = true;
      skippedFirstSummary = true;
      return false;
    }
    if (skippingDuplicateSummary && block.type === "paragraph" && block.text.startsWith("האם ילדים")) {
      skippingDuplicateSummary = false;
      return true;
    }
    return !skippingDuplicateSummary;
  });
}

function ContentPage({ path, page }) {
  const meta = pageMeta[path] || {};
  const title = getContentTitle(path, page);
  const contentBlocks = prepareContentBlocks(path, page.blocks || []);
  const tocItems = contentBlocks
    .map((block, index) => ({ ...block, index }))
    .filter((block) => block.type === "heading" && block.level === 2 && block.text.length < 100)
    .slice(0, 8);

  const seoTitle = meta.seoTitle || `${title} | למטייל ביטוח`;
  const isBlogArticle = /^\/blog\/blog\d+$/.test(path);
  usePageMetadata({
    title: seoTitle,
    description: meta.seoDescription || meta.summary,
    path,
    image: meta.image,
    article: isBlogArticle ? {
      headline: title,
      datePublished: meta.datePublished,
      dateModified: meta.dateModified,
    } : null,
    faq: page.faq,
    keywords: meta.keywords,
    sources: page.sources,
  });

  return <div className={`content-site-page content-accent-${meta.accent || "default"}`}>
    <Header />
    <main className="content-main">
      <section className="content-hero">
        <div className="content-hero-inner section-shell">
          <div className="content-hero-copy">
            <nav className="breadcrumbs" aria-label="פירורי לחם"><a href="/">דף הבית</a><span>/</span><a href="/info">מידע שימושי</a></nav>
            <p className="eyebrow">{meta.eyebrow || "מידע למטייל"}</p>
            <h1>{title}</h1>
            <p className="content-hero-summary">{meta.summary}</p>
          </div>
          {meta.image && <figure className="content-hero-media">
            <img src={meta.image} alt={meta.imageAlt || ""} />
            <figcaption>צילום המחשה</figcaption>
          </figure>}
        </div>
      </section>

      {meta.archived && <div className="archive-notice section-shell"><strong>שימו לב:</strong> זהו תוכן ארכיון מהאתר המקורי. יש לבדוק הנחיות נסיעה ובריאות עדכניות לפני רכישה.</div>}
      {meta.policy && <div className="policy-notice section-shell">המידע בעמוד נועד לנוחות בלבד. תנאי הפוליסה המלאים והעדכניים הם המחייבים.</div>}

      <div className="content-layout section-shell">
        <article className={`content-article ${meta.legal ? "legal-content" : ""}`}>
          {meta.updatedAt && <div className="article-byline">
            <strong>צוות התוכן של למטייל ביטוח</strong>
            <span>עודכן לאחרונה: <time dateTime={meta.dateModified}>{meta.updatedAt}</time></span>
          </div>}
          {meta.special === "contact"
            ? <ContactPanel />
            : contentBlocks.map((block, index) => <ContentBlock block={block} page={page} blockIndex={index} key={`${block.type}-${index}`} />)}

          <ArticleFaq items={page.faq} />
          <ArticleSources sources={page.sources} />
          {meta.appLinks && <AppDownloadLinks />}
          {meta.sourceAction && <a className="content-source-action" href={page.finalUrl} target="_blank" rel="noreferrer">{meta.sourceAction}</a>}
        </article>

        <aside className="content-sidebar">
          {tocItems.length > 1 && <nav className="content-toc" aria-label="בעמוד זה">
            <strong>בעמוד זה</strong>
            {tocItems.map((item) => <a href={`#section-${item.index}`} key={`${item.text}-${item.index}`}>{item.text}</a>)}
          </nav>}
          <div className="sidebar-cta">
            <span>מוכנים לנסיעה?</span>
            <strong>רוכשים ביטוח בכמה דקות</strong>
            <a href="/buy/step1">לרכישת ביטוח</a>
          </div>
        </aside>
      </div>
    </main>
    <Footer /><ServiceCard />
  </div>;
}

function NotFoundPage() {
  return <div className="content-site-page"><Header /><main className="not-found-page"><p className="eyebrow orange">404</p><h1>העמוד שחיפשת לא נמצא</h1><p>אפשר לחזור למרכז המידע או לדף הבית.</p><div><a className="primary-cta compact" href="/info">למרכז המידע</a><a href="/">לדף הבית</a></div></main><Footer /></div>;
}

function PurchasePage() {
  const [loaded, setLoaded] = useState(false);
  const [cleaned, setCleaned] = useState(false);
  const [frameHeight, setFrameHeight] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleFrameLoad = (event) => {
    const frame = event.currentTarget;
    setLoaded(true);

    try {
      const doc = frame.contentDocument;
      const main = doc?.querySelector("main");
      if (!doc || !main) return;

      const embeddedPath = frame.contentWindow?.location?.pathname || "";
      const embeddedStep = embeddedPath.match(/step[-/]?(\d+)/i)?.[1];
      if (embeddedStep) setCurrentStep(Math.min(6, Math.max(1, Number(embeddedStep))));

      let cleanupStyles = doc.getElementById("embedded-purchase-cleanup");
      if (!cleanupStyles) {
        cleanupStyles = doc.createElement("style");
        cleanupStyles.id = "embedded-purchase-cleanup";
        cleanupStyles.textContent = `
          .full-page-container > header,
          .full-page-container > footer,
          .call-me-container,
          #cookie-banner { display: none !important; }
          html, body, .full-page-container { min-height: 0 !important; height: auto !important; }
          .full-page-container > main { margin-top: 0 !important; }
        `;
        doc.head.appendChild(cleanupStyles);
      }

      const updateHeight = () => {
        setFrameHeight(Math.ceil(main.getBoundingClientRect().height) + 2);
      };

      frame.__purchaseResizeObserver?.disconnect();
      const FrameResizeObserver = doc.defaultView?.ResizeObserver;
      frame.__purchaseResizeObserver = FrameResizeObserver
        ? new FrameResizeObserver(updateHeight)
        : null;
      frame.__purchaseResizeObserver?.observe(main);
      updateHeight();
      setCleaned(true);
    } catch {
      setCleaned(false);
      setFrameHeight(null);
    }
  };

  const frameClass = ["purchase-frame", loaded && "is-loaded", cleaned && "is-cleaned"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="purchase-page">
      <Header />
      <main className="purchase-main">
        <nav className="purchase-progress" aria-label="שלבי רכישת הביטוח">
          <ol>
            {Array.from({ length: 6 }, (_, index) => {
              const step = index + 1;
              return <li className={step === currentStep ? "is-current" : step < currentStep ? "is-complete" : ""} key={step} aria-current={step === currentStep ? "step" : undefined}>
                <span>{step}</span>
                <small>שלב {step}</small>
              </li>;
            })}
          </ol>
        </nav>
        <div className={frameClass} style={frameHeight ? { height: `${frameHeight}px` } : undefined}>
          {!loaded && <div className="frame-loader">טוענים את טופס הרכישה…</div>}
          <iframe
            src={PURCHASE_URL}
            title="טופס רכישת ביטוח נסיעות למטייל"
            onLoad={handleFrameLoad}
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path === "/") return <HomePage />;
  if (path === "/buy/step1") return <PurchasePage />;
  if (path === "/info") return <InfoHubPage />;
  if (contentPagesByPath[path]) return <ContentPage path={path} page={contentPagesByPath[path]} />;
  return <NotFoundPage />;
}
