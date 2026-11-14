import NeuralField from "@/components/NeuralField";
import ScrambleText from "@/components/ScrambleText";
import SoulCore from "@/components/SoulCore";
import BootSequence from "@/components/BootSequence";
import Reveal from "@/components/Reveal";
import ContactForm, { WhatsAppIcon } from "@/components/ContactForm";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site, whatsappLink } from "@/lib/site";

const SIGNALS = [
  {
    id: "01",
    title: "Perceive",
    body: "Machines that see the world the way your best people do. Then notice what they miss.",
  },
  {
    id: "02",
    title: "Reason",
    body: "Intelligence that understands the job, not just the instruction.",
  },
  {
    id: "03",
    title: "Act",
    body: "Robotics that turn decisions into motion, on every floor, field and facility.",
  },
];

const INDUSTRIES = [
  "Manufacturing", "Healthcare", "Agriculture", "Logistics", "Construction",
  "Retail", "Energy", "Hospitality", "Education", "Marine", "Mining", "Your industry",
];

export default function Home() {
  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <div className="aurora a1" />
        <div className="aurora a2" />
        <div className="grid-floor" />
        <NeuralField />
        <div className="noise" />
        <div className="vignette" />
      </div>

      <SiteHeader />

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="pulse-dot" /> Transmission incoming · Kozhikode, Kerala
            </p>
            <h1 className="hero-title">
              <span className="line">Something</span>
              <span className="line">
                is <ScrambleText text="awakening" delay={400} className="gradient-text" />
              </span>
            </h1>
            <p className="hero-sub">
              {site.name} is building the intelligence and the machines that will change how people work.
              In every industry. Everywhere.
            </p>
            <p className="hero-cycle">
              <span className="mono">&gt;&nbsp;</span>
              <ScrambleText
                className="mono"
                delay={1600}
                text={[
                  "WORK, REIMAGINED.",
                  "HUMANS, AMPLIFIED.",
                  "INDUSTRY, REWIRED.",
                  "THE FUTURE, ASSEMBLED.",
                ]}
              />
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn-primary">Request early access</a>
              <a href="#vision" className="btn-ghost">Decode the signal ↓</a>
            </div>
          </div>
          <div className="hero-visual">
            <SoulCore />
            <BootSequence />
          </div>
          <div className="launch-meter" aria-label="Launch progress">
            <span className="mono">LAUNCH SEQUENCE</span>
            <div className="meter"><i /></div>
            <span className="mono status">CLASSIFIED</span>
          </div>
        </section>

        <section id="vision" className="vision">
          <Reveal>
            <p className="eyebrow">// The premise</p>
            <h2 className="section-title">
              Every job has a soul.
              <br />
              <span className="gradient-text">We&apos;re giving it a body.</span>
            </h2>
            <p className="section-lead">
              We can&apos;t say much yet. What we can say: we&apos;re fusing artificial intelligence with
              robotics to take on the work that slows people down, so people can do the work only people can do.
            </p>
          </Reveal>

          <ul className="signals">
            {SIGNALS.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 120} className="signal">
                <span className="signal-id mono">{s.id}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className="redacted" aria-hidden="true">
                  <i style={{ width: "92%" }} />
                  <i style={{ width: "64%" }} />
                  <i style={{ width: "78%" }} />
                </div>
                <span className="signal-tag mono">[ REDACTED ]</span>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="marquee" aria-label="Industries we will transform">
          <div className="marquee-track">
            {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
              <span key={i} aria-hidden={i >= INDUSTRIES.length}>
                {ind} <b>✦</b>
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <Reveal className="contact-intro">
            <p className="eyebrow">// Open channel</p>
            <h2 className="section-title">
              Be first through
              <br />
              <span className="gradient-text">the door.</span>
            </h2>
            <p className="section-lead">
              Partners, pioneers, investors and the endlessly curious: leave a message and we&apos;ll reach out
              before the world finds out.
            </p>
            <dl className="contact-list">
              <div>
                <dt className="mono">Base</dt>
                <dd>{site.address.locality}, {site.address.region}, India</dd>
              </div>
              <div>
                <dt className="mono">Email</dt>
                <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
              </div>
              <div>
                <dt className="mono">WhatsApp</dt>
                <dd>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="wa-link">
                    <WhatsAppIcon /> {site.whatsapp.display}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={150} className="contact-card">
            <ContactForm />
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
