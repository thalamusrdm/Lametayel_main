import contentBatchOne from "./data/content-1.json";
import contentBatchTwo from "./data/content-2.json";

const extractedPages = [...contentBatchOne, ...contentBatchTwo];

export const contentPagesByPath = Object.fromEntries(
  extractedPages.map((page) => [page.route, page]),
);

export const pageMeta = {
  "/aboutus": {
    label: "אודות למטייל ביטוח",
    eyebrow: "מכירים מקרוב",
    summary: "הסיפור, הניסיון והדרך של למטייל סוכנות לביטוח.",
  },
  "/contact": {
    label: "צור קשר",
    eyebrow: "אנחנו כאן",
    summary: "טלפון, WhatsApp, דואר אלקטרוני וכל הדרכים לדבר עם הצוות שלנו.",
    special: "contact",
  },
  "/bought_policies": {
    label: "טיפול בפוליסה קיימת",
    eyebrow: "כבר מבוטחים?",
    summary: "שינויים, הארכה, ביטול, תביעות והנחיות למקרה ביטוח.",
    sourceAction: "למערכת שינוי פוליסה",
  },
  "/blog": {
    label: "מדריכי ביטוח נסיעות",
    eyebrow: "מידע שימושי",
    summary: "כל מה שכדאי לדעת לפני שבוחרים ביטוח נסיעות לחו״ל.",
  },
  "/blog/blog1": {
    label: "איך בוחרים ביטוח נסיעות",
    eyebrow: "מדריך למטייל",
    summary: "המלצות וטיפים לרכישת הפוליסה שמתאימה לאופי הנסיעה שלכם.",
  },
  "/blog/blog2": {
    label: "ביטוח נסיעות לילדים",
    eyebrow: "טסים כמשפחה",
    summary: "הכיסויים והשאלות שחשוב להכיר כשילדים טסים לחו״ל.",
  },
  "/blog/blog3": {
    label: "ביטוח נסיעות בהריון",
    eyebrow: "טסים בראש שקט",
    summary: "מה כולל הביטוח, עד איזה שבוע ניתן להצטרף ואיך להתכונן לטיסה.",
  },
  "/blog/blog4": {
    label: "ביטוח נסיעות בתקופת הקורונה",
    eyebrow: "תוכן ארכיון",
    summary: "המידע שנשמר באתר המקורי מתקופת הקורונה.",
    archived: true,
  },
  "/blog/blog5": {
    label: "שאלות ותשובות",
    eyebrow: "תשובות לפני הטיסה",
    summary: "מענה מרוכז לשאלות הנפוצות ביותר על ביטוח נסיעות לחו״ל.",
  },
  "/negishut": {
    label: "הצהרת נגישות",
    eyebrow: "שירות לכולם",
    summary: "הסדרי הנגישות באתר ובשירותי למטייל סוכנות לביטוח.",
    legal: true,
  },
  "/rules": {
    label: "תקנון האתר",
    eyebrow: "מידע משפטי",
    summary: "תנאי השימוש והרכישה באתר למטייל ביטוח.",
    legal: true,
  },
  "/claim-help": {
    label: "עזרה בהגשת תביעה",
    eyebrow: "ספיד למטייל",
    summary: "הנחיות קצרות שמסייעות להגיש תביעה מלאה ומדויקת.",
  },
  "/policies": {
    label: "הפוליסות שלנו",
    eyebrow: "ביטוח שמתאים לטיול",
    summary: "היכרות עם פוליסת FIRST CLASS והכיסויים המרכזיים.",
  },
  "/policy_first": {
    label: "דרכון FIRST CLASS",
    eyebrow: "עיקרי הפוליסה",
    summary: "כיסויים, הרחבות וגבולות אחריות של פוליסת FIRST CLASS.",
    policy: true,
  },
  "/sat": {
    label: "מכשיר לוויני למטייל",
    eyebrow: "מחוברים גם בשטח",
    summary: "תקשורת, איכון ולחצן מצוקה עם MAGNUS inReach Mini 2.",
  },
  "/policy_lam": {
    label: "דרכון למטייל FIRST CLASS",
    eyebrow: "פרטי הפוליסה",
    summary: "טבלאות הכיסוי וההרחבות של דרכון למטייל FIRST CLASS.",
    policy: true,
  },
  "/claims": {
    label: "הגשת תביעה",
    eyebrow: "מטפלים במהירות",
    summary: "מידע על תביעה דיגיטלית וקבלת סיוע דרך אפליקציית הראל.",
  },
  "/forms": {
    label: "טפסים ואפליקציה",
    eyebrow: "הכול בדיגיטל",
    summary: "הגשת תביעות וקבלת שירות דרך אפליקציית הראל נסיעות לחו״ל.",
    appLinks: true,
  },
  "/family": {
    label: "ביטוח לכל המשפחה",
    eyebrow: "משפחה מטיילת",
    summary: "כיסוי מותאם להורים, ילדים ותינוקות עם שירות אישי בעברית.",
    accent: "family",
  },
  "/ski": {
    label: "ביטוח לחופשת סקי",
    eyebrow: "עולים על המסלול",
    summary: "הרחבת ספורט חורף, ציוד, חילוץ וכיסוי לימי גלישה שאבדו.",
    accent: "ski",
  },
  "/agency": {
    label: "למה דווקא למטייל?",
    eyebrow: "יותר מסוכנות ביטוח",
    summary: "מעל 30 שנות התמחות בביטוחי נסיעות וליווי אנושי בארץ ובעולם.",
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
    paths: ["/blog/blog1", "/blog/blog2", "/blog/blog3", "/blog/blog5", "/blog/blog4"],
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
