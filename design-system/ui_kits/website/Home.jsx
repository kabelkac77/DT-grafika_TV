const { Header, Footer } = window.DesignSystem_d54f35;
const { Countdown, StatBand } = window.DesignSystem_d54f35;
const { Card, ScheduleRow } = window.DesignSystem_d54f35;
const { Podium, ResultsTable } = window.DesignSystem_d54f35;
const { PartnerWall } = window.DesignSystem_d54f35;
const { Button } = window.DesignSystem_d54f35;

const NAV = [{ label: 'Výsledky', href: '#results' }, { label: 'Pro diváky', href: '#visitors' }, { label: 'Závody', href: '#races' }, { label: 'Afterparty', href: '#after' }, { label: 'Partneři', href: '#partners' }];
const FOOTER_COLS = [
  { title: 'Závod', links: [{ label: 'Hlavní závod', href: '#' }, { label: 'Dětský závod', href: '#' }, { label: 'Propozice', href: '#' }] },
  { title: 'Návštěvník', links: [{ label: 'Pro diváky', href: '#' }, { label: 'Orientační plánek', href: '#' }, { label: 'Afterparty', href: '#' }] },
  { title: 'Kontakt', links: [{ label: 'COWÁRNA z.s.', href: '#' }, { label: 'info@svdtpribram.cz', href: '#' }, { label: 'Instagram', href: '#' }] },
];

function Section({ id, alt, children, style }) {
  return <section id={id} style={{ padding: '72px 32px', background: alt ? 'var(--svdt-bg-soft)' : 'var(--svdt-bg)', ...style }}><div style={{ maxWidth: 1200, margin: '0 auto' }}>{children}</div></section>;
}
function H2({ children }) {
  return <h2 style={{ fontSize: 12, fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--svdt-text-mid)', margin: '0 0 24px', paddingBottom: 10, borderBottom: '1px solid var(--svdt-line)' }}>{children}</h2>;
}

function Home({ onRegister }) {
  return (
    <div style={{ fontFamily: 'var(--svdt-font)', background: 'var(--svdt-bg)', color: '#fff' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10 }}><Header items={NAV} activeHref="#" ctaHref="#register" ctaLabel="Registrace" /></div>

      <Section style={{ position: 'relative', overflow: 'hidden', padding: '96px 32px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% -10%, rgba(255,26,26,.16), transparent 55%)' }} />
        <p style={{ position: 'relative', fontSize: 12, fontWeight: 900, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--svdt-red)', margin: '0 0 14px' }}>10. ročník · 23. května 2026</p>
        <h1 style={{ position: 'relative', fontSize: 64, fontWeight: 900, lineHeight: .95, textTransform: 'uppercase', margin: '0 0 20px' }}>Zažij <span style={{ color: 'var(--svdt-red)' }}>atmosféru.</span></h1>
        <p style={{ position: 'relative', maxWidth: 560, margin: '0 auto 32px', color: 'var(--svdt-text-soft)', fontSize: 17, lineHeight: 1.7 }}>Městský sjezd centrem Příbrami. Diváci mají přístup zdarma na všechna stanoviště podél trati.</p>
        <div style={{ position: 'relative', display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 48 }}>
          <Button variant="primary" size="lg" onClick={onRegister}>Registrace</Button>
          <Button variant="ghost" size="lg">Jdu jako divák</Button>
        </div>
        <div style={{ position: 'relative', maxWidth: 620, margin: '0 auto' }}>
          <Countdown heading="Start závodu za" days={128} hours={6} minutes={42} seconds={19} dateLine="Sobota 23. května 2026 · Příbram · Vstup zdarma" />
        </div>
      </Section>

      <Section alt>
        <StatBand stats={[{ value: 140, label: 'Jezdců na startu' }, { value: 100, label: 'Dětí v dětském závodě' }, { value: '25+', label: 'Překážek na trati' }, { value: '10.', label: 'Ročník závodu' }]} />
      </Section>

      <Section id="races">
        <H2>Program dne</H2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 40 }}>
          <Card label="Hlavní závod" title="Elite muži" href="#">Kvalifikace 11:00, finále 15:00. Startovné 700 Kč do 15. 5.</Card>
          <Card label="Dětský závod" title="Kids downtown" href="#">Zkrácená trať pro kategorie 6–14 let. Přilba povinná.</Card>
          <Card label="Afterparty" title="Klub Šachta" href="#">Živá kapela od 20:00, DJ set do 03:00.</Card>
        </div>
        <div style={{ border: '1px solid var(--svdt-border)', borderRadius: 10, overflow: 'hidden', background: 'var(--svdt-bg-card)' }}>
          <ScheduleRow time="09:00" title="Otevření depa" detail="Registrace a výdej startovních čísel" status="done" />
          <ScheduleRow time="11:00" title="Volný trénink" detail="Celá trať, po skupinách" status="done" />
          <ScheduleRow time="15:00" title="Hlavní závod — start" detail="Elite muži, ženy, junioři" status="live" now />
          <ScheduleRow time="19:00" title="Vyhlášení výsledků" detail="Náměstí T. G. Masaryka" status="soon" />
        </div>
      </Section>

      <Section id="results" alt>
        <H2>Výsledky · Elite muži</H2>
        <div style={{ marginBottom: 24 }}>
          <Podium first={{ name: 'Jakub Říha', team: 'SVDT Racing', time: '1:46.312' }} second={{ name: 'Tomáš Zíta', team: 'Rock Machine', time: '1:47.905' }} third={{ name: 'Martin Kraus', team: 'Bikepark Klínovec', time: '1:48.240' }} />
        </div>
        <ResultsTable caption="Elite muži, finále, SVDT 2026" rows={[
          { bib: 7, name: 'Jakub Říha', team: 'SVDT Racing', category: 'Elite muži', time: '1:46.312' },
          { bib: 14, name: 'Tomáš Zíta', team: 'Rock Machine', category: 'Elite muži', time: '1:47.905', gap: '+1.593' },
          { bib: 3, name: 'Martin Kraus', team: 'Bikepark Klínovec', category: 'Elite muži', time: '1:48.240', gap: '+1.928' },
          { bib: 18, name: 'Lukáš Beneš', team: 'Downhill Brno', category: 'Elite muži', dnf: true },
        ]} />
      </Section>

      <Section id="partners">
        <H2>Partneři</H2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <PartnerWall tier="main" label="Hlavní partneři" sublabel="3 sloupce · 110px" partners={['Hlavní A', 'Hlavní B', 'Hlavní C']} />
          <PartnerWall tier="support" label="Partneři" sublabel="5 sloupců · 78px" partners={['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4', 'Partner 5']} />
        </div>
      </Section>

      <Footer columns={FOOTER_COLS} bottomLeft="© 2026 COWÁRNA z.s. — všechna práva vyhrazena" bottomRight="Ochrana osobních údajů · Cookies" />
    </div>
  );
}
window.Home = Home;
