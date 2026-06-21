import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hls from "hls.js";
import { ArrowRight, Check, Menu, X } from "lucide-react";
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

type ServiceType = "design" | "development" | "both";
type TimelineType = "regular" | "fast" | "rush";

const packages: PackageCard[] = [
  {
    name: "Essential",
    description: "لمن يريد بداية مرتبة ودعم مستمر",
    bullets: [
      "دعم أساسي عند الحاجة",
      "استجابة سريعة للاستفسارات",
      "كلام إيجابي وتحفيز مستمر",
      "أولوية بسيطة في تقديم الخدمة",
      "تجربة سهلة وواضحة بدون تعقيد",
    ],
    priceLines: [
      "١٬٩٩٩ درهم إماراتي / شهريًا",
      "≈ ٢٬٠٤٢ ريال سعودي",
      "≈ ١٦٨ دينار كويتي",
    ],
  },
  {
    name: "Plus",
    description: "الخيار الأكثر توازنًا لمن يريد اهتمامًا أكبر وتجربة أفضل",
    bullets: [
      "كل مزايا Essential",
      "أولوية أعلى في الخدمة",
      "متابعة أكثر انتظامًا",
      "دعم موسع وتجربة أكثر سلاسة",
      "مزايا إضافية وحصرية للأعضاء",
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
    description: "تجربة كاملة بأعلى مستوى من الاهتمام والعناية",
    bullets: [
      "جميع مزايا Plus",
      "أعلى أولوية في الخدمة",
      "تجربة مخصصة حسب احتياجاتك",
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
  { label: "الباقات", href: "#packages" },
  { label: "عن الخدمة", href: "#about" },
];

const featureCards = [
  { title: "وضوح", copy: "كل شيء مرتب ومباشر" },
  { title: "فخامة", copy: "تفاصيل هادئة ولمسة راقية" },
  { title: "سلاسة", copy: "تجربة سهلة بدون ضجيج" },
];

const contacts: ContactCard[] = [
  { role: "Founder / CEO 3z", handle: "@0idw", featured: true },
  { role: "Co-Founder 71", handle: "@9_nl" },
  { role: "Co-Founder Dark", handle: "@x.6d" },
  { role: "Co-Founder / CTO myth", handle: "@2vw." },
];

const employees: EmployeeCard[] = [
  { name: "Dr-yoyo", username: "iconiiicc" },
  { name: "Dr-misa", username: "lil.doodd" },
  { name: "Dr-Mia / .56", username: "a7xiilx" },
];

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

    const source =
      "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls({
        autoStartLoad: true,
        enableWorker: true,
      });
      hls.loadSource(source);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
      void video.play().catch(() => undefined);
    }
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [employeesOpen, setEmployeesOpen] = useState(false);
  const [serviceType, setServiceType] = useState<ServiceType>("both");
  const [pages, setPages] = useState(5);
  const [needContent, setNeedContent] = useState(false);
  const [needSEO, setNeedSEO] = useState(false);
  const [timeline, setTimeline] = useState<TimelineType>("regular");
  const studioPrice = calculatePrice(serviceType, pages, needContent, needSEO, timeline);
  const agencyPrice = calculateAgencyCost(serviceType, pages);
  const freelancerPrice = calculateFreelancerCost(serviceType, pages);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    scrollToId(href);
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased" dir="rtl">
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
                alt="Aziz logo"
                className="h-11 w-11 object-contain brightness-[2.25] contrast-[1.22] saturate-0 drop-shadow-[0_0_16px_rgba(255,255,255,0.38)]"
              />
              <span className="apple-brand text-[0.95rem] text-white/84">
                عيادة العزايز
              </span>
            </button>

            <button
              type="button"
              className="flex items-center md:opacity-0"
              onClick={() => scrollToId("#hero")}
            >
              <img
                src="/aziz-logo.png"
                alt="Aziz logo"
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
                    alt="Aziz logo"
                    className="h-9 w-9 object-contain brightness-[2.25] contrast-[1.22] saturate-0"
                  />
                  <span className="apple-brand text-[0.95rem] text-white/84">
                    عيادة العزايز
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
            className="mx-auto flex min-h-screen max-w-7xl items-start px-4 pb-20 pt-24 sm:px-6 lg:px-8"
          >
            <div className="mx-auto w-full max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[40px] border border-white/8 px-4 py-5 sm:px-6 sm:py-6 lg:px-6 lg:py-6"
              >
                <div className="absolute inset-4 z-0 overflow-hidden rounded-[28px] sm:inset-6 lg:hidden">
                  <div className="absolute inset-0 bg-[#020202]" />
                  <HeroHlsVideo className="absolute inset-0 h-full w-full object-cover opacity-54 brightness-[0.56] contrast-[1.04] saturate-[0.72]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.56)_52%,rgba(0,0,0,0.86)_100%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.08)_46%,rgba(0,0,0,0.62)_100%)]" />
                </div>

                <div className="relative z-10 min-h-[19rem] lg:grid lg:min-h-[19.5rem] lg:grid-cols-[minmax(0,1.6fr)_minmax(20rem,0.95fr)] lg:items-center lg:gap-10 lg:[direction:ltr]">
                  <div className="hidden h-full min-h-[18.5rem] overflow-hidden rounded-[30px] lg:relative lg:block">
                    <div className="absolute inset-0 bg-[#020202]" />
                    <HeroHlsVideo className="absolute inset-0 h-full w-full object-cover opacity-60 brightness-[0.58] contrast-[1.04] saturate-[0.74]" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.22)_36%,rgba(0,0,0,0.28)_68%,rgba(0,0,0,0.84)_100%)]" />
                    <div className="absolute inset-y-0 right-0 w-[28%] bg-[linear-gradient(270deg,rgba(0,0,0,0.82),rgba(0,0,0,0))]" />
                  </div>

                  <div className="flex h-full items-center justify-end [direction:rtl]">
                    <div className="w-full max-w-[20rem] p-5 text-right sm:p-7 lg:max-w-[21rem] lg:p-0">
                      <h1 className="bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(214,221,228,0.9)_36%,rgba(112,124,136,0.74)_100%)] bg-clip-text font-[Instrument_Serif] text-5xl leading-[1.02] text-transparent sm:text-6xl lg:text-[4.4rem]">
                        نقدم لك الأفضل
                      </h1>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/[0.06]"
                          onClick={() => setContactOpen(true)}
                        >
                          تواصل معنا
                        </button>
                        <button
                          type="button"
                          className="liquid-glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition hover:bg-white/[0.05]"
                          onClick={() => scrollToId("#packages")}
                        >
                          عرض الباقات
                          <ArrowRight size={16} />
                        </button>
                      </div>

                      <div className="mt-3 flex justify-end">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/[0.06]"
                          onClick={() => setEmployeesOpen(true)}
                        >
                          الموظفين
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
            className="mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-6 md:grid-cols-3 lg:px-8"
          >
            {featureCards.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="liquid-glass rounded-[32px] p-8"
              >
                <p className="text-sm tracking-[0.28em] text-white/45">{item.title}</p>
                <p className="mt-4 text-xl text-white/86">{item.copy}</p>
              </motion.article>
            ))}
          </section>

          <section
            id="packages"
            className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
          >
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
              <p className="mt-5 text-lg text-white/68">
                خيارات بسيطة وقيمة واضحة
              </p>
            </motion.div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {packages.map((pkg, index) => (
                <motion.article
                  key={pkg.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`liquid-glass flex min-h-[520px] flex-col rounded-[36px] p-8 transition-transform ${
                    pkg.featured ? "ring-1 ring-white/20" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm tracking-[0.3em] text-white/45">{pkg.name}</p>
                      {pkg.featured ? (
                        <span className="liquid-glass rounded-full px-3 py-1 text-xs text-white/80">
                          الأكثر طلبًا
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-5 space-y-2">
                      <p className="bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(214,221,228,0.88)_36%,rgba(112,124,136,0.72)_100%)] bg-clip-text font-[Instrument_Serif] text-4xl text-transparent">
                        {pkg.priceLines[0]}
                      </p>
                      <p className="text-sm text-white/56">{pkg.priceLines[1]}</p>
                      <p className="text-sm text-white/56">{pkg.priceLines[2]}</p>
                    </div>
                    <p className="mt-6 text-lg leading-8 text-white/82">{pkg.description}</p>
                  </div>

                  <div className="mt-10">
                    <p className="text-sm text-white/48">ما تتضمنه الباقة</p>
                  </div>

                  <div className="mt-6 flex-1 space-y-4">
                    {pkg.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-center gap-3 text-white/76">
                        <span className="liquid-glass inline-flex rounded-full p-2">
                          <Check size={14} />
                        </span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 border-t border-white/10 pt-8">
                    <button
                      type="button"
                      className="liquid-glass inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.05]"
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
            className="bg-black px-4 py-16 md:px-16 md:py-28"
          >
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs tracking-[0.38em] text-white/42">
                  احسبها بسرعة
                </p>
                <h2 className="mt-5 font-[Instrument_Serif] text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl">
                  اعرف التكلفة المناسبة لك قبل ما تبدأ
                </h2>
              </div>

              <div className="mt-12 grid overflow-hidden rounded-[32px] border border-white/10 lg:grid-cols-2">
                <div className="bg-[#0D0D0D] p-8 lg:p-12">
                  <div className="divide-y divide-[#1E1E1E]">
                    <div className="pb-8">
                      <h3 className="text-xl text-white">وش نوع الخدمة اللي تحتاجها؟</h3>
                      <div className="mt-6 space-y-4">
                        {[
                          { label: "حل اختبار", value: "design" as const },
                          { label: "تأهيل", value: "development" as const },
                          { label: "تأهيلك والحل أيضًا", value: "both" as const },
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className="flex w-full items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-right transition hover:bg-white/[0.04]"
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

                    <div className="py-8">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xl text-[#FF5656]">{pages}</span>
                        <h3 className="text-xl text-white">كم اختبار رح تطلب نساعدك؟</h3>
                      </div>

                      <div className="mt-6">
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

                    <div className="py-8">
                      <h3 className="text-xl text-white">إضافات ممكن تحتاجها</h3>
                      <div className="mt-6 space-y-4">
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
                            className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-right transition hover:bg-white/[0.04]"
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

                    <div className="pt-8">
                      <h3 className="text-xl text-white">متى تحتاج ننجز لك؟</h3>
                      <div className="mt-6 space-y-4">
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
                            className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-right transition hover:bg-white/[0.04]"
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

                <div className="min-h-[718px] border-t border-white/10 p-8 lg:min-h-[717.98px] lg:rounded-r-[32px] lg:border-l lg:border-t-0 lg:p-12">
                  <h3 className="text-2xl text-white">التكلفة التقديرية</h3>
                  <p className="mt-4 max-w-lg text-base leading-7 text-white/62">
                    غيّر نوع الخدمة وعدد الاختبارات والسرعة، وشوف الفرق بين الأسعار المعتادة والسعر
                    الأنسب مع عزيز.
                  </p>

                  <div className="mt-10 space-y-5">
                    <div className="rounded-[24px] bg-white/[0.04] p-6">
                      <p className="text-sm text-white/50">سعر الجهات التقليدية يبدأ من</p>
                      <p className="mt-3 font-[Instrument_Serif] text-4xl font-bold text-white">
                        {formatPrice(agencyPrice)}
                      </p>
                      <p className="text-sm text-white/46">+ وقت أكثر وتكلفة إضافية مع كل طلب</p>
                    </div>

                    <div className="rounded-[24px] bg-white/[0.04] p-6">
                      <p className="text-sm text-white/50">سعر المستقل العادي يبدأ من</p>
                      <p className="mt-3 font-[Instrument_Serif] text-4xl font-bold text-white">
                        {formatPrice(freelancerPrice)}
                      </p>
                      <p className="text-sm text-white/46">+ صداع أكثر وردود كثيرة ذهابًا وإيابًا</p>
                    </div>

                    <div className="rounded-[24px] bg-gradient-to-r from-pink-500 to-orange-500 p-6 text-white">
                      <p className="text-sm text-white/82">with aziz</p>
                      <p className="mt-3 font-[Instrument_Serif] text-5xl font-bold">
                        {formatPrice(studioPrice)}
                      </p>
                      <p className="text-sm text-white/86">أوفر عليك الوقت والجهد واللفة الطويلة</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="about"
            className="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 lg:px-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.7 }}
              className="liquid-glass rounded-[40px] px-8 py-12 sm:px-12 sm:py-16"
            >
              <p className="text-sm tracking-[0.35em] text-white/45">عن الخدمة</p>
              <h2 className="mt-4 font-[Instrument_Serif] text-5xl leading-tight sm:text-6xl">
                مبني على الوضوح
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/70">
                كل شيء بسيط ومركز وسهل الفهم
              </p>
            </motion.div>
          </section>
        </main>

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
                className="fixed inset-x-4 top-1/2 z-50 mx-auto w-full max-w-md -translate-y-1/2"
              >
                <div className="liquid-glass rounded-[18px] border border-white/10 bg-black/55 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.48)] sm:p-5">
                  <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-5">
                    <div>
                      <p className="text-sm tracking-[0.3em] text-white/45">للشراء تواصل مع الإدارة عبر الديسكورد</p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                      onClick={() => setContactOpen(false)}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    {contacts.map((contact) => (
                      <div
                        key={contact.handle}
                        className={`w-full rounded-[16px] border bg-white/[0.03] p-4 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${
                          contact.featured
                            ? "border-white/18 bg-white/[0.05]"
                            : "border-white/8"
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
                              className={`mt-3 font-[Instrument_Serif] tracking-tight ${
                                contact.featured ? "text-[1.8rem] text-white" : "text-[1.65rem] text-white/92"
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
                className="fixed inset-x-4 top-1/2 z-50 mx-auto w-full max-w-lg -translate-y-1/2"
              >
                <div className="liquid-glass rounded-[18px] border border-white/10 bg-black/55 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.48)] sm:p-7">
                  <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-5">
                    <div>
                      <p className="text-sm tracking-[0.3em] text-white/45">الموظفين</p>
                      <p className="mt-3 text-base leading-7 text-white/72">
                        الموظفين الرسميين لدى عيادة العزايز
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

                  <div className="mt-6 grid gap-3">
                    {employees.map((employee) => (
                      <div
                        key={employee.username}
                        className="rounded-[16px] border border-white/8 bg-white/[0.03] p-5 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.04] text-white">
                            <FaDiscord size={16} />
                          </span>

                          <div className="flex-1">
                            <p className="text-lg text-white/95">{employee.name}</p>
                            <p
                              dir="ltr"
                              className="mt-2 font-[Instrument_Serif] text-[1.65rem] tracking-tight text-white/72"
                            >
                              {employee.username}
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
