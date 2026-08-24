import { useEffect, useState } from "react";

const OLD_SITE = "https://insurance.lametayel.co.il";
const PURCHASE_URL = "/legacy/buy/step1";

const navItems = [
  ["רכישת ביטוח", "/buy/step1"],
  ["הארכה / ביטול פוליסה", `${OLD_SITE}/bought_policies`],
  ["מידע שימושי", "/#benefits"],
  ["מכשיר לוויני", "https://lametayel.magnus.co.il/checkout/"],
  ["צור קשר", `${OLD_SITE}/contact`],
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
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? "סגירה" : "תפריט"}</button>
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
      <div className="footer-links"><a href="/buy/step1">רכישת ביטוח</a><a href={`${OLD_SITE}/aboutus`}>אודות</a><a href={`${OLD_SITE}/contact`}>צור קשר</a><a href={`${OLD_SITE}/rules`}>תקנון האתר</a><a href={`${OLD_SITE}/negishut`}>הצהרת נגישות</a></div>
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
    {cookies && <aside className="cookie-banner" aria-label="הודעת עוגיות"><p>באתר נעשה שימוש בקבצי Cookies. המשך הגלישה מהווה הסכמה לשימוש זה.</p><button type="button" onClick={() => setCookies(false)}>אישור</button></aside>}
  </>;
}

function PurchasePage() {
  const [loaded, setLoaded] = useState(false);
  const [cleaned, setCleaned] = useState(false);
  const [frameHeight, setFrameHeight] = useState(null);

  const handleFrameLoad = (event) => {
    const frame = event.currentTarget;
    setLoaded(true);

    try {
      const doc = frame.contentDocument;
      const main = doc?.querySelector("main");
      if (!doc || !main) return;

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
  return path === "/buy/step1" ? <PurchasePage /> : <HomePage />;
}
