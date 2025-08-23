import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Catherine H Lab — B2B Catering Landing Page
 * Stack: React + Tailwind CSS (single-file component)
 * Theme: Bold Dark (high-contrast, premium feel)
 * Focus: Lead generation for B2B Catering (KPI: form submissions)
 *
 * Instructions:
 * 1) Replace WEBHOOK_URL with your n8n/Make/zapier webhook endpoint (POST JSON).
 * 2) Drop this file into your React app and render <LandingCatherineHLabB2B />.
 * 3) Ensure Tailwind is enabled. Suggested fonts: Pretendard or Inter.
 * 4) Add your analytics snippets (GA4/Meta) in the indicated placeholders.
 */

const WEBHOOK_URL = "https://YOUR-N8N-WEBHOOK-URL"; // TODO: set your webhook endpoint here

export default function LandingCatherineHLabB2B() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [utm, setUtm] = useState({ utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "" });
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    eventDate: "",
    headcount: "",
    budget: "",
    message: "",
    honeypot: "",
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  // Capture UTM params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const get = (k: string) => params.get(k) || "";
    setUtm({
      utm_source: get("utm_source"),
      utm_medium: get("utm_medium"),
      utm_campaign: get("utm_campaign"),
      utm_term: get("utm_term"),
      utm_content: get("utm_content"),
    });
  }, []);

  // Scroll helpers
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name || !form.email || !form.company) return "이름/회사/이메일은 필수입니다.";
    const emailOk = /.+@.+..+/.test(form.email);
    if (!emailOk) return "올바른 이메일 형식을 입력해주세요.";
    if (form.honeypot) return "스팸 감지"; // hidden field trap
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        ...utm,
        page: window.location.href,
        timestamp: new Date().toISOString(),
        source: "catherineh-lab-b2b-landing",
      };
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
      setSubmitted(true);
      // Basic event for analytics
      // window.gtag?.("event", "lead_submit", { method: "landing_form" });
      // fbq?.("track", "Lead");
      formRef.current?.reset();
    } catch (err: any) {
      setError(err.message || "제출 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const Stat = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col items-start">
      <span className="text-3xl md:text-4xl font-extrabold tracking-tight">{value}</span>
      <span className="text-sm opacity-70 mt-1">{label}</span>
    </div>
  );

  const Feature = ({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">{icon}</div>
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <p className="text-sm leading-relaxed opacity-80">{desc}</p>
    </div>
  );

  const SectionTitle = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => (
    <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
      {eyebrow && <p className="uppercase tracking-[.2em] text-xs text-white/60 mb-2">{eyebrow}</p>}
      <h3 className="text-2xl md:text-4xl font-extrabold leading-tight">{title}</h3>
      {subtitle && <p className="text-white/70 mt-3">{subtitle}</p>}
    </div>
  );

  const Input = ({ label, name, type = "text", placeholder, required = false, ...rest }: any) => (
    <label className="block">
      <span className="text-sm text-white/80">{label}{required && <span className="text-pink-400 ml-1">*</span>}</span>
      <input
        className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        {...rest}
      />
    </label>
  );

  const Textarea = ({ label, name, placeholder, rows = 4 }: any) => (
    <label className="block">
      <span className="text-sm text-white/80">{label}</span>
      <textarea
        className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-white/30"
        name={name}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
      />
    </label>
  );

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/10">
      {children}
    </span>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white selection:bg-pink-500/30">
      {/* SEO & JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Catherine H Lab",
            url: "https://catherineh-lab.com/",
            logo: "https://catherineh-lab.com/logo.png",
            description: "프리미엄 기업 케이터링 & VIP 도시락, 맞춤 메뉴 제안.",
            areaServed: "Seoul, KR",
            sameAs: [
              "https://www.instagram.com/catherineH-Lab",
              "https://www.linkedin.com/company/your-linkedin"
            ],
            serviceType: "B2B Catering",
          }),
        }}
      />

      {/* Top Bar */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-[#0B0B0F]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-fuchsia-600" />
            <span className="font-bold tracking-tight">Catherine H Lab</span>
            <span className="hidden md:inline text-white/50 text-sm">• B2B Catering</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button onClick={() => scrollToId("features")} className="hover:text-pink-300">서비스</button>
            <button onClick={() => scrollToId("packages")} className="hover:text-pink-300">패키지</button>
            <button onClick={() => scrollToId("process")} className="hover:text-pink-300">프로세스</button>
            <button onClick={() => scrollToId("gallery")} className="hover:text-pink-300">갤러리</button>
            <button onClick={() => scrollToId("faq")} className="hover:text-pink-300">FAQ</button>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => scrollToId("lead-form")} className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-white/90">
              견적 문의
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(236,72,153,0.15),rgba(11,11,15,0))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-10 md:pb-16">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 mb-6">
                <Pill>기업 전용</Pill>
                <Pill>프리미엄 케이터링</Pill>
                <Pill>VIP 도시락</Pill>
              </div>
              <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                프리미엄 <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-500">기업 케이터링</span>으로
                <br className="hidden md:block" />
                브랜드 행사에 품격을 더합니다
              </h1>
              <p className="mt-5 text-white/80 max-w-2xl">
                미쉐린 출신 셰프의 맞춤 메뉴 제안 · 철저한 현장 운영 · 시간 정확성. 창립기념식, 컨퍼런스, VIP 미팅까지 — 귀사만의 스토리를 담은 메뉴로 완성합니다.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button onClick={() => scrollToId("lead-form")} className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90">
                  지금 견적 받기
                </button>
                <button onClick={() => scrollToId("packages")} className="px-5 py-3 rounded-xl border border-white/20 hover:border-white/40">
                  패키지 보기
                </button>
              </div>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <Stat label="기업 행사 수행" value="200+" />
                <Stat label="평균 만족도" value="4.9/5" />
                <Stat label="정시 납품률" value="99.6%" />
                <Stat label="재주문율" value="68%" />
              </div>
              <div className="mt-8 text-sm text-white/60">
                레퍼런스: LG 상하이 VIP 도시락 · 구글캠퍼스 CTO 모임 외
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-2">
                <img
                  src="https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1200&auto=format&fit=crop"
                  alt="Premium corporate catering table"
                  className="rounded-2xl object-cover h-[360px] w-full"
                />
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur px-3 py-2 rounded-lg text-xs">
                  실제 현장 촬영 이미지 예시
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <section className="border-y border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-70 text-sm">
            <span>Trusted by</span>
            <span className="font-semibold">LG</span>
            <span className="font-semibold">Google Campus</span>
            <span className="font-semibold">Startup HQ</span>
            <span className="font-semibold">Art Gallery</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle
          eyebrow="What we do"
          title="기업 행사에 최적화된 풀서비스 케이터링"
          subtitle="컨셉 기획부터 메뉴 커스터마이즈, 현장 운영, 사후 리포트까지 한 번에."
        />
        <div className="grid md:grid-cols-3 gap-5">
          <Feature
            title="맞춤 메뉴 컨설팅"
            desc="브랜드/행사 목적에 맞는 테마 기획·알레르기/채식 옵션 반영·와인/음료 페어링 제안."
            icon={<span>🍽️</span>}
          />
          <Feature
            title="정교한 현장 운영"
            desc="타임라인 기반 운영·정시 납품·위생 기준 준수·VIP 대응 매뉴얼."
            icon={<span>🕒</span>}
          />
          <Feature
            title="투명한 커뮤니케이션"
            desc="사전 체크리스트 제공·담당 셰프 직통 소통·행사 후 만족도 리포트."
            icon={<span>🤝</span>}
          />
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="추천 패키지" subtitle="인원/예산/목적별로 바로 선택하거나, 완전 맞춤 제작 가능" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "VIP 도시락", price: "1.8만~", desc: "임원/게스트용 프리미엄 구성, 제철 재료 중심", points: ["개별 식단 커스텀", "브랜드 스티커/카드 동봉", "정시 픽업/납품"] },
            { name: "네트워킹 핑거푸드", price: "2.5만~", desc: "세미나/컨퍼런스 브레이크에 최적화", points: ["한입 사이즈 6~8종", "논알콜/와인 페어링", "현장 셋업 포함"] },
            { name: "올데이 뷔페", price: "3.9만~", desc: "런치/디너까지 풀코스 운영", points: ["핫/콜드 스테이션", "셰프 스태프 파견", "현장 마감 청소"] },
          ].map((p) => (
            <div key={p.name} className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col">
              <div className="flex items-baseline justify-between">
                <h4 className="text-xl font-bold">{p.name}</h4>
                <span className="text-pink-300 font-semibold">{p.price}</span>
              </div>
              <p className="text-sm text-white/80 mt-2">{p.desc}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2"><span className="mt-1 text-pink-300">●</span><span>{pt}</span></li>
                ))}
              </ul>
              <div className="mt-6">
                <button onClick={() => scrollToId("lead-form")} className="w-full px-4 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90">견적 문의</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle eyebrow="How it works" title="진행 프로세스" />
        <ol className="grid md:grid-cols-4 gap-6 counter-reset">
          {[
            { t: "요건 파악", d: "행사 목적/인원/예산/장소/알레르기 확인" },
            { t: "메뉴 제안", d: "테마/동선 고려한 맞춤 메뉴&셋업안 제출" },
            { t: "리허설/운영", d: "타임라인 확정·현장 셋업·서비스 운영" },
            { t: "리포트/후속", d: "만족도/개선점 피드백·재주문 컨설팅" },
          ].map((step, i) => (
            <li key={step.t} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-pink-300 text-sm font-semibold mb-2">STEP {i + 1}</div>
              <div className="text-lg font-bold">{step.t}</div>
              <p className="text-sm text-white/80 mt-2">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Gallery */}
      <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="현장 스냅샷" subtitle="브랜드 무드를 살린 연출과 디테일" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1514517255080-08c0722c3d42?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1468218620578-c8c97b75cf3b?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543345972-1bf75b6fe8ef?q=80&w=1200&auto=format&fit=crop",
          ].map((src) => (
            <div key={src} className="relative group overflow-hidden rounded-2xl border border-white/10">
              <img src={src} alt="Catering scene" className="h-52 w-full object-cover group-hover:scale-[1.03] transition" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle eyebrow="Social proof" title="고객의 목소리" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { q: "임원진 모두 만족했습니다. 시간·퀄리티·디테일 모두 완벽.", a: "대기업 홍보팀" },
            { q: "브랜드 컨셉을 메뉴에 잘 녹여냈어요. 사진도 정말 예뻤습니다.", a: "IT 스타트업 마케팅팀" },
            { q: "행사 동선까지 고려한 구성이라 운영이 수월했어요.", a: "이벤트 대행사 PD" },
          ].map((t) => (
            <div key={t.q} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-white/90">“{t.q}”</p>
              <div className="mt-4 text-sm text-white/60">— {t.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(236,72,153,0.20),rgba(11,11,15,0))]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <SectionTitle title="견적·상담 문의" subtitle="아래 정보를 남겨주시면 24시간 이내 회신드리겠습니다." />
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="이름" name="name" required placeholder="홍길동" />
                  <Input label="회사명" name="company" required placeholder="ABC Corp" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="이메일" name="email" type="email" required placeholder="you@company.com" />
                  <Input label="연락처" name="phone" type="tel" placeholder="010-0000-0000" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input label="행사일자" name="eventDate" type="date" />
                  <Input label="예상 인원" name="headcount" type="number" placeholder="50" />
                  <Input label="예산(만원)" name="budget" type="number" placeholder="300" />
                </div>
                {/* Honeypot */}
                <input className="hidden" name="honeypot" onChange={onChange} tabIndex={-1} autoComplete="off" />

                <Textarea label="요청사항 / 알레르기" name="message" placeholder="행사 목적, 장소, 브랜드 가이드, 알레르기/채식 등" />

                {/* UTM hidden */}
                <input type="hidden" name="utm_source" value={utm.utm_source} />
                <input type="hidden" name="utm_medium" value={utm.utm_medium} />
                <input type="hidden" name="utm_campaign" value={utm.utm_campaign} />
                <input type="hidden" name="utm_term" value={utm.utm_term} />
                <input type="hidden" name="utm_content" value={utm.utm_content} />

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-sm">{error}</div>
                )}
                {submitted ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200">
                    접수되었습니다! 담당자가 영업일 기준 24시간 이내 연락드리겠습니다.
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 disabled:opacity-60"
                  >
                    {submitting ? "전송 중..." : "견적 요청 보내기"}
                  </button>
                )}
                <p className="text-xs text-white/60">제출 시 개인정보 처리방침에 동의하는 것으로 간주합니다. 상업적 스팸 차단을 위해 제출 IP가 기록될 수 있습니다.</p>
              </form>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sticky top-24">
                <h4 className="text-xl font-bold">왜 캐서린에이치랩인가요?</h4>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex gap-3"><span>✔</span><span>브랜드/행사 목적에 맞춘 <b>완전 맞춤 메뉴</b></span></li>
                  <li className="flex gap-3"><span>✔</span><span><b>정시 납품 99.6%</b> — 타임라인 기반 운영</span></li>
                  <li className="flex gap-3"><span>✔</span><span>VIP/임원 대응 매뉴얼 — 디테일 중심</span></li>
                  <li className="flex gap-3"><span>✔</span><span>행사 후 <b>만족도 리포트</b> 제공</span></li>
                </ul>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                    <div className="text-white/60">평균 응답</div>
                    <div className="text-lg font-bold">2시간 이내</div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                    <div className="text-white/60">최소 인원</div>
                    <div className="text-lg font-bold">30인~</div>
                  </div>
                </div>
                <div className="mt-6 text-xs text-white/50">
                  * 실제 제공 메뉴/구성은 계절·수급에 따라 변동될 수 있습니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <SectionTitle title="자주 묻는 질문" />
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { q: "최소 주문 인원/금액은?", a: "도시락은 30인~, 핑거푸드는 50인~, 뷔페는 80인~ 권장합니다. 세부 기준은 행사 성격에 따라 조정 가능합니다." },
            { q: "맞춤 메뉴가 가능한가요?", a: "브랜드 가이드/행사 목적/알레르기/채식 여부를 반영하여 완전 맞춤 메뉴를 제안드립니다." },
            { q: "행사장 셋업과 스태프 파견도 포함되나요?", a: "네, 요청 시 셰프/서빙 스태프 파견 및 현장 셋업/철수까지 담당합니다." },
            { q: "결제/세금계산서는 어떻게 진행되나요?", a: "계약금+잔금 또는 행사 후 일괄 정산 방식 모두 가능하며, 전자세금계산서를 발행해드립니다." },
          ].map((f) => (
            <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/5 p-5">
              <summary className="cursor-pointer font-semibold marker:hidden flex justify-between items-center">
                <span>{f.q}</span>
                <span className="text-white/40 group-open:rotate-45 transition">＋</span>
              </summary>
              <p className="text-sm text-white/80 mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(236,72,153,0.15),rgba(11,11,15,0))]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-4xl font-extrabold">브랜드 가치를 높이는 케이터링, 지금 시작하세요</h3>
            <p className="text-white/70 mt-3">간단히 문의만 남겨주세요. 24시간 이내 맞춤 제안을 드립니다.</p>
            <div className="mt-6">
              <button onClick={() => scrollToId("lead-form")} className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90">견적 문의</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm flex flex-col md:flex-row gap-6 justify-between">
          <div className="space-y-2">
            <div className="font-bold">Catherine H Lab</div>
            <div className="text-white/60">서울시 · B2B 케이터링 & VIP 도시락</div>
            <div className="text-white/50">contact@catherineh-lab.com · 02-000-0000</div>
          </div>
          <div className="text-white/50">
            © {new Date().getFullYear()} Catherine H Lab. All rights reserved.
          </div>
        </div>
      </footer>
    </div>