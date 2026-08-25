import contentBatchOne from "./data/content-1.json";
import contentBatchTwo from "./data/content-2.json";
import { updatedArticles } from "./data/updatedArticles.js";

const REMOVED_ROUTES = new Set(["/blog/blog4"]);
const extractedPages = [...contentBatchOne, ...contentBatchTwo]
  .filter((page) => !REMOVED_ROUTES.has(page.route))
  .map((page) => updatedArticles[page.route] || page);

export const contentPagesByPath = Object.fromEntries(
  extractedPages.map((page) => [page.route, page]),
);

export const pageMeta = {
  "/aboutus": {
    label: "אודות למטייל ביטוח",
    eyebrow: "מכירים מקרוב",
    summary: "הסיפור, הניסיון והדרך של למטייל סוכנות לביטוח.",
    image: "/article-images/insurance-team.jpg",
    imageAlt: "צוות יועצי ביטוח מתכנן מסלול נסיעה יחד",
  },
  "/contact": {
    label: "צור קשר",
    eyebrow: "אנחנו כאן",
    summary: "טלפון, WhatsApp, דואר אלקטרוני וכל הדרכים לדבר עם הצוות שלנו.",
    image: "/article-images/insurance-team.jpg",
    imageAlt: "צוות יועצי למטייל ביטוח בעבודה משותפת",
    special: "contact",
  },
  "/bought_policies": {
    label: "טיפול בפוליסה קיימת",
    eyebrow: "כבר מבוטחים?",
    summary: "שינויים, הארכה, ביטול, תביעות והנחיות למקרה ביטוח.",
    image: "/article-images/travel-assistance.jpg",
    imageAlt: "מטייל יוצר קשר לקבלת סיוע במהלך השהייה בחו״ל",
    sourceAction: "למערכת שינוי פוליסה",
  },
  "/blog": {
    label: "מדריכי ביטוח נסיעות",
    eyebrow: "מידע שימושי",
    summary: "מדריכים מעודכנים לבחירת כיסוי, נסיעה עם ילדים, הריון ושירות בחו״ל.",
    seoTitle: "מדריכי ביטוח נסיעות לחו״ל | למטייל ביטוח",
    seoDescription: "מדריכים עדכניים לביטוח נסיעות לחו״ל: בחירת פוליסה, ביטוח לילדים, ביטוח בהריון ותשובות לשאלות נפוצות.",
    image: "/article-images/travel-planning.jpg",
    imageAlt: "מפה, דרכון ומחברת לקראת תכנון נסיעה לחו״ל",
  },
  "/blog/blog1": {
    label: "איך לבחור ביטוח נסיעות לחו״ל",
    eyebrow: "מדריך למטייל",
    summary: "מה כולל הכיסוי הבסיסי, אילו הרחבות לבדוק ואיך להתאים את הביטוח לנסיעה.",
    seoTitle: "איך לבחור ביטוח נסיעות לחו״ל? מדריך 2026",
    seoDescription: "מדריך מעודכן לבחירת ביטוח נסיעות לחו״ל: כיסוי רפואי, מצב רפואי קודם, כבודה, ספורט, ביטול נסיעה ושירות בחו״ל.",
    keywords: ["ביטוח נסיעות לחו״ל", "איך לבחור ביטוח נסיעות", "כיסוי רפואי בחו״ל", "הרחבות ביטוח נסיעות"],
    datePublished: "2026-08-24",
    dateModified: "2026-08-24",
    updatedAt: "24 באוגוסט 2026",
    image: "/article-images/travel-planning.jpg",
    imageAlt: "ציוד ותכנון מסודר לקראת נסיעה לחו״ל",
  },
  "/blog/blog2": {
    label: "ביטוח נסיעות לילדים: מה חשוב לבדוק",
    eyebrow: "טסים כמשפחה",
    summary: "כיסוי רפואי, מצב קודם, פעילויות, תרופות והכנה נכונה לטיסה משפחתית.",
    seoTitle: "ביטוח נסיעות לילדים: מדריך להורים 2026",
    seoDescription: "מה חשוב לבדוק בביטוח נסיעות לילדים? כיסוי רפואי, מצב רפואי קודם, ספורט אתגרי, תרופות וטיפול בחו״ל.",
    keywords: ["ביטוח נסיעות לילדים", "ביטוח נסיעות למשפחה", "טיסה עם ילדים", "טיפול רפואי לילד בחו״ל"],
    datePublished: "2026-08-24",
    dateModified: "2026-08-24",
    updatedAt: "24 באוגוסט 2026",
    image: "/article-images/family-travel.jpg",
    imageAlt: "משפחה עם ילדים ומזוודות בדרך לטיסה",
  },
  "/blog/blog3": {
    label: "ביטוח נסיעות בהריון: עד איזה שבוע?",
    eyebrow: "טסים בראש שקט",
    summary: "הרחבה עד שבוע 32 ובכפוף לגיל, חיתום ותנאי הפוליסה — כל מה שחשוב לבדוק.",
    seoTitle: "ביטוח נסיעות בהריון: עד איזה שבוע? מדריך 2026",
    seoDescription: "ביטוח נסיעות בהריון: עד איזה שבוע ניתן לרכוש הרחבה, מה חשוב לבדוק, אילו מסמכים לקחת ואיך מקבלים טיפול בחו״ל.",
    keywords: ["ביטוח נסיעות בהריון", "ביטוח טיסה בהריון", "טיסה בהריון שבוע 32", "הרחבת הריון ביטוח נסיעות"],
    datePublished: "2026-08-24",
    dateModified: "2026-08-24",
    updatedAt: "24 באוגוסט 2026",
    image: "/article-images/pregnancy-travel.jpg",
    imageAlt: "זוג מתכונן לטיסה במהלך ההיריון",
  },
  "/blog/blog5": {
    label: "ביטוח נסיעות: שאלות ותשובות",
    eyebrow: "תשובות לפני הטיסה",
    summary: "תשובות מעודכנות על מוקד חירום, רופא בחו״ל, כבודה, הארכה ומצב רפואי קודם.",
    seoTitle: "ביטוח נסיעות לחו״ל: שאלות ותשובות 2026",
    seoDescription: "שאלות ותשובות עדכניות על ביטוח נסיעות: רופא בחו״ל, Air Doctor, מזוודה, מוקד חירום, מצב רפואי קודם והארכת הפוליסה.",
    keywords: ["ביטוח נסיעות שאלות ותשובות", "מוקד חירום הראל בחו״ל", "Air Doctor", "הארכת ביטוח נסיעות"],
    datePublished: "2026-08-24",
    dateModified: "2026-08-24",
    updatedAt: "24 באוגוסט 2026",
    image: "/article-images/travel-planning.jpg",
    imageAlt: "מפת עולם, מחברת וטלפון לתכנון נסיעה",
  },
  "/negishut": {
    label: "הצהרת נגישות",
    eyebrow: "שירות לכולם",
    summary: "הסדרי הנגישות באתר ובשירותי למטייל סוכנות לביטוח.",
    image: "/article-images/policy-documents.jpg",
    imageAlt: "מסמכים מסודרים על שולחן עבודה",
    legal: true,
  },
  "/rules": {
    label: "תקנון האתר",
    eyebrow: "מידע משפטי",
    summary: "תנאי השימוש והרכישה באתר למטייל ביטוח.",
    image: "/article-images/policy-documents.jpg",
    imageAlt: "מסמכים רשמיים וכלי כתיבה על שולחן",
    legal: true,
  },
  "/claim-help": {
    label: "עזרה בהגשת תביעה",
    eyebrow: "ספיד למטייל",
    summary: "הנחיות קצרות שמסייעות להגיש תביעה מלאה ומדויקת.",
    image: "/article-images/travel-assistance.jpg",
    imageAlt: "מטייל מקבל סיוע טלפוני בחו״ל",
  },
  "/policies": {
    label: "הפוליסות שלנו",
    eyebrow: "ביטוח שמתאים לטיול",
    summary: "היכרות עם פוליסת FIRST CLASS והכיסויים המרכזיים.",
    image: "/article-images/policy-documents.jpg",
    imageAlt: "תיק מסמכי ביטוח נסיעות מסודר",
  },
  "/policy_first": {
    label: "דרכון FIRST CLASS",
    eyebrow: "עיקרי הפוליסה",
    summary: "כיסויים, הרחבות וגבולות אחריות של פוליסת FIRST CLASS.",
    image: "/article-images/policy-documents.jpg",
    imageAlt: "מסמכי פוליסה, דרכון וכלי כתיבה",
    policy: true,
  },
  "/sat": {
    label: "מכשיר לוויני למטייל",
    eyebrow: "מחוברים גם בשטח",
    summary: "תקשורת, איכון ולחצן מצוקה עם MAGNUS inReach Mini 2.",
    image: "/article-images/satellite-hiking.jpg",
    imageAlt: "מטייל משתמש במכשיר תקשורת לווייני בשטח הררי",
  },
  "/policy_lam": {
    label: "דרכון למטייל FIRST CLASS",
    eyebrow: "פרטי הפוליסה",
    summary: "טבלאות הכיסוי וההרחבות של דרכון למטייל FIRST CLASS.",
    image: "/article-images/policy-documents.jpg",
    imageAlt: "תיק מסמכי פוליסת נסיעות ודרכון",
    policy: true,
  },
  "/claims": {
    label: "הגשת תביעה",
    eyebrow: "מטפלים במהירות",
    summary: "מידע על תביעה דיגיטלית וקבלת סיוע דרך אפליקציית הראל.",
    image: "/article-images/travel-assistance.jpg",
    imageAlt: "מטייל יוצר קשר מהטלפון לקבלת עזרה בחו״ל",
  },
  "/forms": {
    label: "טפסים ואפליקציה",
    eyebrow: "הכול בדיגיטל",
    summary: "הגשת תביעות וקבלת שירות דרך אפליקציית הראל נסיעות לחו״ל.",
    image: "/article-images/travel-assistance.jpg",
    imageAlt: "שימוש בטלפון לקבלת שירות במהלך נסיעה",
    appLinks: true,
  },
  "/family": {
    label: "ביטוח לכל המשפחה",
    eyebrow: "משפחה מטיילת",
    summary: "כיסוי מותאם להורים, ילדים ותינוקות עם שירות אישי בעברית.",
    image: "/article-images/family-travel.jpg",
    imageAlt: "משפחה מטיילת יחד בשדה התעופה",
    accent: "family",
  },
  "/ski": {
    label: "ביטוח לחופשת סקי",
    eyebrow: "עולים על המסלול",
    summary: "הרחבת ספורט חורף, ציוד, חילוץ וכיסוי לימי גלישה שאבדו.",
    image: "/article-images/winter-sports.jpg",
    imageAlt: "גולש סקי מוכן על מסלול בהרי האלפים",
    accent: "ski",
  },
  "/agency": {
    label: "למה דווקא למטייל?",
    eyebrow: "יותר מסוכנות ביטוח",
    summary: "מעל 30 שנות התמחות בביטוחי נסיעות וליווי אנושי בארץ ובעולם.",
    image: "/article-images/insurance-team.jpg",
    imageAlt: "צוות מומחי ביטוח נסיעות בוחן מסלול יחד",
    accent: "agency",
  },
};

export const infoSections = [
  {
    title: "מתכננים את הנסיעה",
    description: "מדריכים וכיסויים לפי סוג הטיול והנוסעים.",
    paths: ["/blog", "/family", "/ski", "/sat", "/policies", "/agency"],
  },
  {
    title: "מדריכים מקצועיים",
    description: "תשובות מפורטות לנושאים שמעסיקים נוסעים לפני היציאה לחו״ל.",
    paths: ["/blog/blog1", "/blog/blog2", "/blog/blog3", "/blog/blog5"],
  },
  {
    title: "שירות למבוטחים",
    description: "טיפול בפוליסה, תביעות, אפליקציה ויצירת קשר.",
    paths: ["/bought_policies", "/claims", "/claim-help", "/forms", "/contact"],
  },
  {
    title: "פוליסות ומידע רשמי",
    description: "פרטי הכיסוי, תנאי השימוש, נגישות ומידע על הסוכנות.",
    paths: ["/policy_first", "/policy_lam", "/aboutus", "/rules", "/negishut"],
  },
];

export function normalizeContentHref(href) {
  if (!href) return null;

  if (href.startsWith("http://images.lametayel.co.il")) {
    return href.replace("http://", "https://");
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.hostname === "insurance.lametayel.co.il") {
      if (/\/(?:travel_ins\/)?buy\/step1/.test(url.pathname)) return "/buy/step1";
      if (contentPagesByPath[url.pathname]) return url.pathname;
      if (url.pathname === "/") return "/";
    }
  } catch {
    return href;
  }

  return href;
}

export function getContentTitle(path, page) {
  return pageMeta[path]?.label || page?.headings?.[0]?.text || "מידע למטייל";
}
