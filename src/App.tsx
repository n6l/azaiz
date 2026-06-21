import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  MessageSquareQuote,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa6";

type PackageCard = {
  name: string;
  description: string;
  bullets: string[];
  priceLines: string[];
  featured?: boolean;
};

type ContactCard = {
  role: string;
  handle: string;
  featured?: boolean;
};

type EmployeeCard = {
  name: string;
  username: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type Testimonial = {
  name: string;
  role: string;
  rating: number;
  quote: string;
  highlight: string;
};

type ServiceType = "design" | "development" | "both";
type TimelineType = "regular" | "fast" | "rush";

const packages: PackageCard[] = [
  {
    name: "Essential",
    description: "لمن يريد بداية مرتبة ودعم مستمر بخطوات واضحة وسريعة.",
    bullets: [
      "متابعة أساسية عند الحاجة",
      "استجابة سريعة للاستفسارات",
      "تجربة مرتبة بدون تعقيد",
      "وضوح في التسليم والتواصل",
      "أساس قوي للانطلاق",
    ],
    priceLines: [
      "١٬٩٩٩ درهم إماراتي / شهريًا",
      "≈ ٢٬٠٤٢ ريال سعودي",
      "≈ ١٦٨ دينار كويتي",
    ],
  },
  {
    name: "Plus",
    description: "الخيار الأكثر توازنًا لمن يريد عناية أكبر وسرعة أوضح في الإنجاز.",
    bullets: [
      "كل مزايا Essential",
      "أولوية أعلى في الخدمة",
      "متابعة أكثر انتظامًا",
      "دعم موسع وتجربة أكثر سلاسة",
      "مزايا إضافية للأعضاء",
    ],
    priceLines: [
      "٣٬٩٩٩ درهم إماراتي / شهريًا",
      "≈ ٤٬٠٨٥ ريال سعودي",
      "≈ ٣٣٦ دينار كويتي",
    ],
    featured: true,
  },
  {
    name: "Premium",
    description: "تجربة كاملة بأعلى مستوى من الاهتمام مع متابعة خاصة وخدمة مخصصة.",
    bullets: [
      "جميع مزايا Plus",
      "أعلى أولوية في الخدمة",
      "تجربة مخصصة حسب احتياجك",
      "اهتمام ومتابعة خاصة",
      "وصول إلى جميع المزايا الحصرية",
      "أفضل تجربة نقدمها لك",
    ],
    priceLines: [
      "٧٬٩٩٩ درهم إماراتي / شهريًا",
      "≈ ٨٬١٧١ ريال سعودي",
      "≈ ٦٧٢ دينار كويتي",
    ],
  },
];

const navLinks = [
  { label: "المزايا", href: "#features" },
  { label: "كيف نبدأ", href: "#process" },
  { label: "الباقات", href: "#packages" },
  { label: "الآراء", href: "#reviews" },
  { label: "الأسئلة", href: "#faq" },
  { label: "عن العيادة", href: "#about" },
];

const featureCards = [
  {
    title: "سرعة محسوبة",
    copy: "مسار واضح من البداية حتى التسليم.",
  },
  {
    title: "تنسيق احترافي",
    copy: "عرض مرتب وواضح من أول نظرة.",
  },
  {
    title: "تواصل مباشر",
    copy: "تواصل مباشر ورد واضح.",
  },
];

const contacts: ContactCard[] = [
  { role: "Founder / CEO", handle: "@0idw", featured: true },
  { role: "Co-Founder", handle: "@9_nl" },
  { role: "Co-Founder", handle: "@x.6d" },
  { role: "Co-Founder / CTO", handle: "@2vw." },
];

const employees: EmployeeCard[] = [
  { name: "dr-yoyo", username: "iconiiicc" },
  { name: "dr-misa", username: "lil.doodd" },
  { name: "dr-mia", username: "a7xiilx" },
];

const testimonials: Testimonial[] = [
  {
    name: "سُبات",
    role: "عميل",
    rating: 5,
    quote: "افضل موقع وافضل عيادة وربي ما في بعدها",
    highlight: "رأي مباشر وواضح",
  },
  {
    name: "asa",
    role: "مراجعة موثقة",
    rating: 5,
    quote:
      "صراحة انا مريضه عند الدكتوره يويو قمه فالاخلاق وسهوله في فهم المريض دخلت عندها طلعت انا شخص ثاني تماما اشكرك يويو ❤️❤️❤️",
    highlight: "تجربة إنسانية مميزة",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "ما الذي تقدمه عيادة فك الزنقة بالضبط؟",
    answer:
      "نقدم خدمة منظمة وواضحة، مع باقات محددة وتواصل مباشر من البداية حتى التسليم.",
  },
  {
    question: "كيف أختار الباقة المناسبة لي؟",
    answer:
      "إذا كنت تريد نقطة بداية مرتبة فابدأ بـ Essential، وإذا كنت تريد عناية أكبر وسرعة أوضح فـ Plus هو الأنسب، أما Premium فهو للخدمة المخصصة والمتابعة المكثفة.",
  },
  {
    question: "كيف يتم التواصل بعد الطلب؟",
    answer:
      "يتم التواصل مع الإدارة مباشرة عبر القنوات المحددة داخل الموقع، ثم يتم ترتيب التفاصيل حسب الباقة ونوع الخدمة والموعد المتوقع للتسليم.",
  },
  {
    question: "هل الآراء المعروضة حقيقية وثابتة؟",
    answer:
      "نعم، قسم آراء العملاء هنا ثابت ومختار بعناية ليعكس تجربة الخدمة بشكل واضح ومحترف، ولا يتم تعديله من الزوار داخل الموقع.",
  },
];

const brandTagline = "حل أنظف، أسرع، وأوضح";
const brandPromise = "تجربة مرتبة من أول نقرة حتى آخر تسليم";

type HeroHlsVideoProps = {
  className: string;
};

function scrollToId(id: string) {
  const element = document.querySelector(id);
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function formatPrice(value: number) {
  return `${value.toLocaleString()} د.إ`;
}

function calculatePrice(
  serviceType: ServiceType,
  pages: number,
  needContent: boolean,
  needSEO: boolean,
  timeline: TimelineType,
) {
  const config = {
    design: { base: 399, perPage: 100 },
    development: { base: 199, perPage: 100 },
    both: { base: 499, perPage: 200 },
  } satisfies Record<ServiceType, { base: number; perPage: number }>;

  const selected = config[serviceType];
  let total = Math.max(selected.base, selected.base + (pages - 1) * selected.perPage);

  if (needContent) total += pages * 50;
  if (needSEO) total += pages * 50;
  if (timeline === "rush") total += pages * 100;
  if (timeline === "fast") total += pages * 25;

  return total;
}

function calculateAgencyCost(serviceType: ServiceType, pages: number) {
  const perPage = serviceType === "both" ? 1000 : 400;
  return 8000 + (pages - 1) * perPage;
}

function calculateFreelancerCost(serviceType: ServiceType, pages: number) {
  const perPage = serviceType === "both" ? 500 : 200;
  return 3000 + (pages - 1) * perPage;
}

function HeroHlsVideo({ className }: HeroHlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const media = video;

    const source =
      "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

    let cleanup: (() => void) | undefined;

    async function loadVideo() {
      const hlsModule = await import("hls.js");
      const Hls = hlsModule.default;

      if (Hls.isSupported()) {
        const hls = new Hls({
          autoStartLoad: true,
          enableWorker: true,
        });
        hls.loadSource(source);
        hls.attachMedia(media);
        cleanup = () => hls.destroy();
        return;
      }

      if (media.canPlayType("application/vnd.apple.mpegurl")) {
        media.src = source;
        void media.play().catch(() => undefined);
      }
    }

    void loadVideo();

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    />
  );
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-[#FFB84D]">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          className={index < rating ? "fill-current" : "text-white/20"}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [employeesOpen, setEmployeesOpen] = useState(false);
  const [serviceType, setServiceType] = useState<ServiceType>("both");
  const [pages, setPages] = useState(5);
  const [needContent, setNeedContent] = useState(false);
  const [needSEO, setNeedSEO] = useState(false);
  const [timeline, setTimeline] = useState<TimelineType>("regular");
  const [openFaq, setOpenFaq] = useState(0);
  const studioPrice = calculatePrice(serviceType, pages, needContent, needSEO, timeline);
  const agencyPrice = calculateAgencyCost(serviceType, pages);
  const freelancerPrice = calculateFreelancerCost(serviceType, pages);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    scrollToId(href);
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased" dir="rtl">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(255,110,64,0.16),transparent_58%)]" />
        <div className="absolute bottom-0 left-[-10%] h-[22rem] w-[22rem] rounded-full bg-[#7C2D12]/20 blur-3xl" />
        <div className="absolute right-[-6%] top-[20%] h-[18rem] w-[18rem] rounded-full bg-[#831843]/15 blur-3xl" />
      </div>

      <div className="relative isolate">
        <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-2 py-3 sm:px-4">
            <div className="hidden items-center gap-8 text-sm text-white/68 md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  className="transition hover:text-white"
                  onClick={() => handleNavClick(link.href)}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-[38%] flex-col items-center gap-1 md:flex"
              onClick={() => scrollToId("#hero")}
            >
              <img
                src="/aziz-logo.png"
                alt="شعار عيادة فك الزنقة"
                className="h-11 w-11 object-contain brightness-[2.25] contrast-[1.22] saturate-0 drop-shadow-[0_0_16px_rgba(255,255,255,0.38)]"
              />
              <span className="apple-brand text-[0.95rem] text-white/84">
                عيادة فك الزنقة
              </span>
            </button>

            <button
              type="button"
              className="flex items-center md:opacity-0"
              onClick={() => scrollToId("#hero")}
            >
              <img
                src="/aziz-logo.png"
                alt="شعار عيادة فك الزنقة"
                className="h-11 w-11 object-contain brightness-[2.25] contrast-[1.22] saturate-0 drop-shadow-[0_0_16px_rgba(255,255,255,0.38)]"
              />
            </button>

            <button
              type="button"
              className="liquid-glass inline-flex rounded-full p-2 text-white md:hidden"
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="liquid-glass mx-auto mt-3 flex max-w-7xl flex-col gap-2 rounded-[28px] p-4 md:hidden"
              >
                <div className="mb-2 flex flex-col items-center justify-center gap-1">
                  <img
                    src="/aziz-logo.png"
                    alt="شعار عيادة فك الزنقة"
                    className="h-9 w-9 object-contain brightness-[2.25] contrast-[1.22] saturate-0"
                  />
                  <span className="apple-brand text-[0.95rem] text-white/84">
                    عيادة فك الزنقة
                  </span>
                </div>

                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    className="rounded-2xl px-3 py-3 text-right text-white/80 transition hover:bg-white/5 hover:text-white"
                    onClick={() => handleNavClick(link.href)}
                  >
                    {link.label}
                  </button>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </header>

        <main>
          <section
            id="hero"
            className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl items-start px-4 pb-14 pt-20 sm:min-h-screen sm:pb-20 sm:pt-24 sm:px-6 lg:px-8"
          >
            <div className="mx-auto w-full max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[32px] border border-white/8 px-4 py-4 sm:rounded-[40px] sm:px-6 sm:py-6 lg:px-6 lg:py-6"
              >
                <div className="absolute inset-3 z-0 overflow-hidden rounded-[24px] sm:inset-6 lg:hidden">
                  <div className="absolute inset-0 bg-[#020202]" />
                  <HeroHlsVideo className="absolute inset-0 h-full w-full object-cover opacity-54 brightness-[0.56] contrast-[1.04] saturate-[0.72]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.58)_52%,rgba(0,0,0,0.88)_100%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.64)_0%,rgba(0,0,0,0.12)_46%,rgba(0,0,0,0.64)_100%)]" />
                </div>

                <div className="relative z-10 min-h-[18rem] lg:grid lg:min-h-[24rem] lg:grid-cols-[minmax(0,1.55fr)_minmax(20rem,0.95fr)] lg:items-center lg:gap-10 lg:[direction:ltr]">
                  <div className="hidden h-full min-h-[21rem] overflow-hidden rounded-[30px] lg:relative lg:block">
                    <div className="absolute inset-0 bg-[#020202]" />
                    <HeroHlsVideo className="absolute inset-0 h-full w-full object-cover opacity-60 brightness-[0.58] contrast-[1.04] saturate-[0.74]" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.24)_36%,rgba(0,0,0,0.28)_68%,rgba(0,0,0,0.86)_100%)]" />
                    <div className="absolute inset-y-0 right-0 w-[28%] bg-[linear-gradient(270deg,rgba(0,0,0,0.82),rgba(0,0,0,0))]" />
                  </div>

                  <div className="flex h-full items-center justify-end [direction:rtl]">
                    <div className="w-full max-w-[24rem] p-3 text-right sm:p-7 lg:max-w-[25rem] lg:p-0">
                      <h1 className="mt-4 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(214,221,228,0.9)_36%,rgba(112,124,136,0.74)_100%)] bg-clip-text font-[Instrument_Serif] text-[2.45rem] leading-[1.02] text-transparent sm:mt-6 sm:text-6xl lg:text-[4.6rem]">
                        عيادة فك الزنقة
                      </h1>

                      <p className="mt-3 text-sm leading-7 text-white/72 sm:mt-5 sm:text-lg sm:leading-8">
                        {brandPromise}. واجهة واضحة وباقات مفهومة وانطباع قوي من أول زيارة.
                      </p>

                      <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-end">
                        <button
                          type="button"
                          className="liquid-glass inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition hover:bg-white/[0.05] md:min-h-0 md:w-auto"
                          onClick={() => setContactOpen(true)}
                        >
                          تواصل مع الإدارة
                          <ArrowRight size={16} />
                        </button>
                        <button
                          type="button"
                          className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/[0.06] md:min-h-0 md:w-auto"
                          onClick={() => scrollToId("#reviews")}
                        >
                          شاهد آراء العملاء
                        </button>
                      </div>

                      <div className="mt-3 flex flex-col gap-3 md:flex-row md:justify-end">
                        <button
                          type="button"
                          className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/[0.06] md:min-h-0 md:w-auto"
                          onClick={() => setEmployeesOpen(true)}
                        >
                          استعراض الفريق الرسمي
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section
            id="features"
            className="mx-auto grid max-w-7xl gap-4 px-4 pb-20 sm:gap-6 sm:px-6 md:grid-cols-3 lg:px-8"
          >
            {featureCards.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="liquid-glass rounded-[28px] p-6 sm:rounded-[32px] sm:p-8"
              >
                <p className="text-sm tracking-[0.28em] text-white/45">{item.title}</p>
                <p className="mt-4 text-xl leading-9 text-white/86">{item.copy}</p>
              </motion.article>
            ))}
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-6">
                <p className="text-sm tracking-[0.28em] text-[#FFB48C]">سياسة العمل</p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-white/70 sm:text-base">
                  <p>يتم اعتماد الطلب بعد مراجعة التفاصيل وتأكيد نطاق الخدمة بشكل واضح.</p>
                  <p>يُعتمد السداد قبل بدء العمل، ويُعد جزءًا من إجراءات اعتماد الطلب.</p>
                  <p>يتم التواصل والمتابعة عبر القنوات الرسمية المعتمدة لدى العيادة فقط.</p>
                  <p>يتم تنسيق الطلب مع العضو الأنسب من الفريق الرسمي حسب طبيعة الخدمة والمتاح.</p>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="process" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="text-sm tracking-[0.35em] text-white/45">كيف نمشي معك</p>
              <h2 className="mt-4 font-[Instrument_Serif] text-5xl leading-tight sm:text-6xl">
                3 خطوات وتكون الزنقة انحلّت
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/68">
                3 خطوات واضحة من الطلب حتى النتيجة.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "ترسل الطلب",
                  copy: "تدخل، تفهم الباقة، ثم تتواصل معنا مباشرة بالطريقة الواضحة داخل الموقع.",
                },
                {
                  step: "02",
                  title: "نرتب التفاصيل",
                  copy: "نحدد المطلوب، نرتب الخطوات، ونوضح لك المسار والمدة بدون لخبطة أو غموض.",
                },
                {
                  step: "03",
                  title: "تستلم النتيجة",
                  copy: "تأخذ النتيجة بشكل مرتب وواضح مع تجربة تعطيك إحساس ثقة من البداية للنهاية.",
                },
              ].map((item, index) => (
                <motion.article
                  key={item.step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="liquid-glass rounded-[26px] p-5 sm:rounded-[30px] sm:p-7"
                >
                  <p className="text-sm tracking-[0.35em] text-[#FFB48C]">{item.step}</p>
                  <h3 className="mt-4 text-2xl text-white">{item.title}</h3>
                  <p className="mt-4 text-base leading-8 text-white/68">{item.copy}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="packages" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <p className="text-sm tracking-[0.35em] text-white/45">الباقات</p>
              <h2 className="mt-4 font-[Instrument_Serif] text-5xl leading-tight sm:text-6xl">
                اختر الباقة التي تناسبك
              </h2>
              <p className="mt-5 text-lg text-white/68">خيارات واضحة وتجربة مرتبة.</p>
            </motion.div>

            <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-3">
              {packages.map((pkg, index) => (
                <motion.article
                  key={pkg.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`liquid-glass flex min-h-[unset] flex-col rounded-[28px] p-5 transition-transform sm:min-h-[520px] sm:rounded-[36px] sm:p-8 ${
                    pkg.featured
                      ? "ring-1 ring-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]"
                      : ""
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm tracking-[0.3em] text-white/45">{pkg.name}</p>
                      {pkg.featured ? (
                        <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/80 sm:text-xs">
                          الأكثر طلبًا
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-4 space-y-1.5 sm:mt-5 sm:space-y-2">
                      <p className="bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(214,221,228,0.88)_36%,rgba(112,124,136,0.72)_100%)] bg-clip-text font-[Instrument_Serif] text-[2rem] text-transparent sm:text-4xl">
                        {pkg.priceLines[0]}
                      </p>
                      <p className="text-xs text-white/56 sm:text-sm">{pkg.priceLines[1]}</p>
                      <p className="text-xs text-white/56 sm:text-sm">{pkg.priceLines[2]}</p>
                    </div>
                    <p className="mt-5 text-base leading-7 text-white/82 sm:mt-6 sm:text-lg sm:leading-8">{pkg.description}</p>
                  </div>

                  <div className="mt-8 sm:mt-10">
                    <p className="text-xs tracking-[0.22em] text-white/48 sm:text-sm sm:tracking-normal">
                      ما تتضمنه الباقة
                    </p>
                  </div>

                  <div className="mt-5 flex-1 space-y-3 sm:mt-6 sm:space-y-4">
                    {pkg.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-3 text-sm text-white/76 sm:text-base">
                        <span className="liquid-glass inline-flex rounded-full p-2">
                          <Check size={14} />
                        </span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
                    <button
                      type="button"
                      className="liquid-glass inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.05]"
                      onClick={() => setContactOpen(true)}
                    >
                      ابدأ الآن
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <div className="liquid-glass h-px w-full max-w-4xl opacity-60" />
            </div>
          </section>

          <section
            id="calculator-section"
            className="bg-black px-4 py-14 sm:py-16 md:px-16 md:py-28"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs tracking-[0.38em] text-white/42">احسبها بسرعة</p>
                <h2 className="mt-5 font-[Instrument_Serif] text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl">
                  اعرف التكلفة المناسبة لك قبل ما تبدأ
                </h2>
              </div>

              <div className="mt-10 grid overflow-hidden rounded-[28px] border border-white/10 sm:mt-12 sm:rounded-[32px] lg:grid-cols-2">
                <div className="bg-[#0D0D0D] p-5 sm:p-8 lg:p-12">
                  <div className="divide-y divide-[#1E1E1E]">
                    <div className="pb-6 sm:pb-8">
                      <h3 className="text-xl text-white">وش نوع الخدمة اللي تحتاجها؟</h3>
                      <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
                        {[
                          { label: "حل اختبار", value: "design" as const },
                          { label: "تأهيل", value: "development" as const },
                          { label: "تأهيلك والحل أيضًا", value: "both" as const },
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className="flex min-h-12 w-full items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-right transition hover:bg-white/[0.04]"
                            onClick={() => setServiceType(option.value)}
                          >
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                serviceType === option.value ? "border-[#FF5656]" : "border-white/28"
                              }`}
                            >
                              {serviceType === option.value ? (
                                <span className="h-2 w-2 rounded-full bg-[#FF5656]" />
                              ) : null}
                            </span>
                            <span className="text-base text-white/88">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="py-6 sm:py-8">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xl text-[#FF5656]">{pages}</span>
                        <h3 className="text-xl text-white">كم اختبار رح تطلب نساعدك؟</h3>
                      </div>

                      <div className="mt-5 sm:mt-6">
                        <input
                          type="range"
                          min={1}
                          max={30}
                          step={1}
                          value={pages}
                          onChange={(event) => setPages(Number(event.target.value))}
                          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/12 accent-[#FF5656]"
                        />
                        <div className="mt-3 flex items-center justify-between text-sm text-white/42">
                          <span>30</span>
                          <span>1</span>
                        </div>
                      </div>
                    </div>

                    <div className="py-6 sm:py-8">
                      <h3 className="text-xl text-white">إضافات ممكن تحتاجها</h3>
                      <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
                        {[
                          {
                            label: "أحتاج مساعدة في تجهيز المحتوى",
                            price: "+50 د.إ / لكل اختبار",
                            checked: needContent,
                            onToggle: () => setNeedContent((value) => !value),
                          },
                          {
                            label: "أبغى ترتيب وتنظيم أفضل للنتيجة",
                            price: "+50 د.إ / لكل اختبار",
                            checked: needSEO,
                            onToggle: () => setNeedSEO((value) => !value),
                          },
                        ].map((option) => (
                          <button
                            key={option.label}
                            type="button"
                            className="flex min-h-12 w-full items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-right transition hover:bg-white/[0.04]"
                            onClick={option.onToggle}
                          >
                            <span className="text-sm text-[#FF5656]">{option.price}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-base text-white/88">{option.label}</span>
                              <span
                                className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                                  option.checked
                                    ? "border-[#FF5656] bg-[#FF5656]"
                                    : "border-white/28 bg-transparent"
                                }`}
                              >
                                {option.checked ? <Check size={12} className="text-white" /> : null}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 sm:pt-8">
                      <h3 className="text-xl text-white">متى تحتاج ننجز لك؟</h3>
                      <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
                        {[
                          { label: "خلال 7 أيام", value: "rush" as const, price: "+100 د.إ / لكل اختبار" },
                          { label: "خلال 14 يوم", value: "fast" as const, price: "+25 د.إ / لكل اختبار" },
                          {
                            label: "بالسرعة المعتادة حسب الاتفاق",
                            value: "regular" as const,
                            price: "بدون تكلفة إضافية",
                          },
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className="flex min-h-12 w-full items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-right transition hover:bg-white/[0.04]"
                            onClick={() => setTimeline(option.value)}
                          >
                            <span
                              className={`text-sm ${
                                option.value === "regular" ? "text-white/48" : "text-[#FF5656]"
                              }`}
                            >
                              {option.price}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="text-base text-white/88">{option.label}</span>
                              <span
                                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                  timeline === option.value ? "border-[#FF5656]" : "border-white/28"
                                }`}
                              >
                                {timeline === option.value ? (
                                  <span className="h-2 w-2 rounded-full bg-[#FF5656]" />
                                ) : null}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="min-h-[unset] border-t border-white/10 p-5 sm:p-8 lg:min-h-[717.98px] lg:rounded-r-[32px] lg:border-l lg:border-t-0 lg:p-12">
                  <div className="flex items-center gap-3 text-white/80">
                    <ShieldCheck size={18} />
                    <p className="text-sm tracking-[0.2em]">تقدير واضح قبل البدء</p>
                  </div>
                  <h3 className="mt-4 text-[1.45rem] text-white sm:mt-5 sm:text-2xl">التكلفة التقديرية</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-white/62 sm:mt-4 sm:text-base">
                    غيّر نوع الخدمة وعدد الاختبارات والسرعة، وشوف الفرق بين الأسعار المعتادة والسعر
                    الأنسب مع عيادة فك الزنقة.
                  </p>

                  <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
                    <div className="rounded-[20px] bg-white/[0.04] p-4 sm:rounded-[24px] sm:p-6">
                      <p className="text-sm text-white/50">سعر الجهات التقليدية يبدأ من</p>
                      <p className="mt-3 font-[Instrument_Serif] text-[2rem] font-bold text-white sm:text-4xl">
                        {formatPrice(agencyPrice)}
                      </p>
                      <p className="text-sm text-white/46">+ وقت أكثر وتكلفة إضافية مع كل طلب</p>
                    </div>

                    <div className="rounded-[20px] bg-white/[0.04] p-4 sm:rounded-[24px] sm:p-6">
                      <p className="text-sm text-white/50">سعر المستقل العادي يبدأ من</p>
                      <p className="mt-3 font-[Instrument_Serif] text-[2rem] font-bold text-white sm:text-4xl">
                        {formatPrice(freelancerPrice)}
                      </p>
                      <p className="text-sm text-white/46">+ صداع أكثر وردود كثيرة ذهابًا وإيابًا</p>
                    </div>

                    <div className="rounded-[20px] bg-gradient-to-r from-pink-500 to-orange-500 p-4 text-white sm:rounded-[24px] sm:p-6">
                      <p className="text-sm text-white/82">مع عيادة فك الزنقة</p>
                      <p className="mt-3 font-[Instrument_Serif] text-[2.35rem] font-bold sm:text-5xl">
                        {formatPrice(studioPrice)}
                      </p>
                      <p className="text-sm text-white/86">أوفر عليك الوقت والجهد واللفة الطويلة</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="reviews" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-start">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-sm tracking-[0.35em] text-white/45">آراء العملاء</p>
                  <h2 className="mt-4 font-[Instrument_Serif] text-5xl leading-tight sm:text-6xl">
                    آراء العملاء
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                    لإرسال رأيك، يمكنك إرساله إلى المدير ميث وسيتم نشره عبر الموقع.
                  </p>
                </motion.div>

                <div className="mt-10 grid gap-5 md:max-w-xl">
                  {testimonials.map((item, index) => (
                    <motion.article
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: index * 0.08 }}
                      className="liquid-glass rounded-[28px] p-6"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg text-white">{item.name}</p>
                          <p className="mt-1 text-sm text-white/46">{item.role}</p>
                        </div>
                        <MessageSquareQuote size={18} className="text-white/28" />
                      </div>
                      <div className="mt-5">
                        <RatingStars rating={item.rating} />
                      </div>
                      <p className="mt-5 text-sm tracking-[0.25em] text-[#FFB48C]">
                        {item.highlight}
                      </p>
                      <p className="mt-4 text-base leading-8 text-white/78">{item.quote}</p>
                    </motion.article>
                  ))}
                </div>
              </div>

              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="liquid-glass rounded-[28px] p-5 sm:rounded-[32px] sm:p-7"
                >
                  <div className="flex items-center gap-3 text-white/78">
                    <ShieldCheck size={18} />
                    <p className="text-sm tracking-[0.2em]">آراء مختارة بعناية</p>
                  </div>
                  <h3 className="mt-5 font-[Instrument_Serif] text-4xl text-white">
                    آراء ثابتة
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/62">
                    آراء ثابتة وواضحة داخل الموقع.
                  </p>

                  <div className="mt-6 space-y-4">
                    {[
                      "الآراء المعروضة ثابتة ولا يمكن للزائر تعديلها.",
                      "يمكن إرسال الرأي إلى المدير ميث لاعتماده ونشره.",
                      "يمكن تحديث الآراء يدويًا متى لزم ذلك.",
                    ].map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white/68"
                    >
                      <span className="mt-1 inline-flex rounded-full bg-white/[0.06] p-2 text-white/80">
                        <Check size={14} />
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/[0.06]"
                  onClick={() => setContactOpen(true)}
                >
                  تواصل مع الإدارة
                </button>
              </motion.aside>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="text-sm tracking-[0.35em] text-white/45">الأسئلة الشائعة</p>
              <h2 className="mt-4 font-[Instrument_Serif] text-5xl leading-tight sm:text-6xl">
                ماذا نكتب هنا؟
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/68">
                أكثر الأسئلة التي يحتاجها الزائر قبل اتخاذ القرار.
              </p>
            </motion.div>

            <div className="mt-10 space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.div
                    key={item.question}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="liquid-glass overflow-hidden rounded-[28px]"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right"
                      onClick={() => setOpenFaq((current) => (current === index ? -1 : index))}
                    >
                      <span className="text-lg text-white/92">{item.question}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-white/54 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 leading-8 text-white/68">{item.answer}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section id="about" className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 sm:pb-28 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.7 }}
              className="liquid-glass rounded-[32px] px-5 py-8 sm:rounded-[40px] sm:px-12 sm:py-16"
            >
              <p className="text-sm tracking-[0.35em] text-white/45">عن العيادة</p>
              <h2 className="mt-4 font-[Instrument_Serif] text-5xl leading-tight sm:text-6xl">
                مبني على الوضوح
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/70">
                صفحة واضحة ومرتبة تدعم الثقة وسهولة القرار.
              </p>
            </motion.div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,102,82,0.18),rgba(255,255,255,0.04))] p-5 sm:rounded-[36px] sm:p-8 lg:p-10"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="text-right">
                  <p className="text-sm tracking-[0.3em] text-white/52">الخطوة الأخيرة</p>
                  <h2 className="mt-4 font-[Instrument_Serif] text-4xl leading-tight text-white sm:text-5xl">
                    ابدأ طلبك عبر القنوات الرسمية
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                    كل ما يحتاجه الزائر أصبح واضحًا. هنا يبدأ التواصل الرسمي.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <button
                    type="button"
                    className="liquid-glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition hover:bg-white/[0.06]"
                    onClick={() => setContactOpen(true)}
                  >
                    تقديم طلب
                    <ArrowRight size={16} />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/[0.06]"
                    onClick={() => scrollToId("#packages")}
                  >
                    استعراض الباقات
                  </button>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="mx-auto max-w-7xl px-4 pb-32 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-6 text-center md:flex-row md:text-right">
              <div>
                <p className="font-[Instrument_Serif] text-3xl text-white">عيادة فك الزنقة</p>
                <p className="mt-2 text-sm tracking-[0.24em] text-white/48">{brandTagline}</p>
              </div>
              <p className="max-w-xl text-sm leading-7 text-white/56">{brandPromise}</p>
            </div>
          </footer>
        </main>

        <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1.25rem)] max-w-md -translate-x-1/2 md:bottom-5 md:w-auto md:max-w-none md:translate-x-0 md:left-auto md:right-6">
          <button
            type="button"
            className="liquid-glass inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition hover:bg-white/[0.05] md:min-h-0 md:w-auto"
            onClick={() => setContactOpen(true)}
          >
            تواصل الآن
            <ArrowRight size={16} />
          </button>
        </div>

        <AnimatePresence>
          {contactOpen ? (
            <>
              <motion.button
                type="button"
                aria-label="Close contact popup"
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setContactOpen(false)}
              />

              <motion.aside
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.24 }}
                className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full md:inset-x-4 md:top-24 md:bottom-auto md:max-w-md"
              >
                <div className="liquid-glass max-h-[85vh] overflow-y-auto rounded-t-[24px] border border-white/10 bg-black/90 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.48)] md:max-h-[78vh] md:rounded-[18px] md:bg-black/55 md:p-5">
                  <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/12 md:hidden" />
                  <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-4 md:pb-5">
                    <div>
                      <p className="text-sm tracking-[0.3em] text-white/45">
                        تواصل مع الإدارة عبر الديسكورد
                      </p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                      onClick={() => setContactOpen(false)}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 md:mt-6">
                    {contacts.map((contact) => (
                      <div
                        key={contact.handle}
                        className={`w-full rounded-[16px] border bg-white/[0.03] p-3.5 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-4 ${
                          contact.featured ? "border-white/18 bg-white/[0.05]" : "border-white/8"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.04] text-white">
                            <FaDiscord size={16} />
                          </span>

                          <div className="flex-1">
                            <p
                              className={`text-sm tracking-[0.22em] ${
                                contact.featured ? "text-white/55" : "text-white/45"
                              }`}
                            >
                              {contact.role}
                            </p>
                            <p
                              dir="ltr"
                              className={`mt-2 font-[Instrument_Serif] tracking-tight ${
                                contact.featured
                                  ? "text-[1.45rem] text-white md:text-[1.8rem]"
                                  : "text-[1.3rem] text-white/92 md:text-[1.65rem]"
                              }`}
                            >
                              {contact.handle.replace("@", "")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {employeesOpen ? (
            <>
              <motion.button
                type="button"
                aria-label="Close employees popup"
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEmployeesOpen(false)}
              />

              <motion.aside
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.24 }}
                className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full md:inset-x-4 md:top-24 md:bottom-auto md:max-w-3xl"
              >
                <div className="liquid-glass max-h-[88vh] overflow-y-auto rounded-t-[24px] border border-white/10 bg-black/92 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.48)] md:max-h-[80vh] md:rounded-[18px] md:bg-black/55 md:p-6">
                  <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/12 md:hidden" />
                  <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-4 md:pb-5">
                    <div>
                      <p className="text-sm tracking-[0.3em] text-white/45">الفريق الرسمي</p>
                      <p className="mt-2 text-sm leading-6 text-white/72 md:mt-3 md:text-base md:leading-7">
                        الكادر المعتمد لدى عيادة فك الزنقة للتواصل والمتابعة والتنفيذ.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                      onClick={() => setEmployeesOpen(false)}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3 md:mt-6 md:grid-cols-2 lg:grid-cols-3">
                    {employees.map((employee) => (
                      <div
                        key={employee.username}
                        className="rounded-[18px] border border-white/8 bg-white/[0.03] p-3.5 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:rounded-[20px] md:p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.04] text-white md:h-10 md:w-10">
                            <FaDiscord size={16} />
                          </span>

                          <div className="flex-1">
                            <p
                              dir="ltr"
                              className="text-[1rem] font-semibold tracking-tight text-white/95 md:text-[1.05rem]"
                            >
                              {employee.name}
                            </p>
                            <p
                              dir="ltr"
                              className="mt-1.5 font-[Instrument_Serif] text-[1.25rem] tracking-tight text-white/72 md:mt-2 md:text-[1.45rem]"
                            >
                              {employee.username}
                            </p>
                            <p className="mt-2 text-xs leading-6 text-white/56 md:mt-3 md:text-sm">
                              عضو رسمي ضمن الكادر المعتمد.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
