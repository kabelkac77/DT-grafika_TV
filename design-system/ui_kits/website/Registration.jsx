const { useState } = React;
const { Header, Footer, FormField, RadioGroup, Checkbox, Alert, Button } = window.DesignSystem_d54f35;

const NAV = [{ label: 'Výsledky', href: '#' }, { label: 'Pro diváky', href: '#' }, { label: 'Závody', href: '#' }, { label: 'Afterparty', href: '#' }, { label: 'Partneři', href: '#' }];

function Registration({ onBack }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={{ fontFamily: 'var(--svdt-font)', background: 'var(--svdt-bg)', color: '#fff', minHeight: '100%' }}>
      <Header items={NAV} ctaHref="#" ctaLabel="Registrace" />
      <div style={{ maxWidth: 660, margin: '0 auto', padding: '56px 32px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 0, color: 'var(--svdt-text-soft)', fontSize: 12, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer', padding: 0, marginBottom: 24 }}>← Zpět na web</button>
        <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--svdt-red)', margin: '0 0 10px' }}>Registrace</p>
        <h1 style={{ fontSize: 40, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, margin: '0 0 32px' }}>Registrace jezdce</h1>

        {submitted ? (
          <Alert kind="ok" title="Registrace přijata">Startovní číslo 47. Potvrzení jsme poslali na tvůj e-mail.</Alert>
        ) : (
          <div style={{ background: 'var(--svdt-bg-card)', border: '1px solid var(--svdt-border)', borderRadius: 'var(--svdt-radius)', padding: 30 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label="Jméno" required placeholder="Jakub" />
              <FormField label="Příjmení" required placeholder="Říha" />
            </div>
            <FormField label="E-mail" required type="email" placeholder="jakub.riha@email.cz" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label="Rok narození" required placeholder="1998" />
              <FormField label="Tým / klub" placeholder="Nepovinné" />
            </div>
            <FormField label="Kategorie" required type="select" options={['Elite muži', 'Elite ženy', 'Junioři 15–18', 'Masters 40+', 'Dětský závod 6–14']} hint="Kategorii určuje rok narození." />
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--svdt-text-soft)', margin: '0 0 8px' }}>Velikost trika</p>
            <div style={{ marginBottom: 20 }}><RadioGroup name="size" options={['S', 'M', 'L', 'XL', 'XXL']} defaultValue="M" /></div>
            <FormField label="Poznámka pro pořadatele" type="textarea" placeholder="Alergie, zdravotní omezení, cokoliv dalšího…" />
            <Checkbox label="Souhlasím s propozicemi závodu a startuji na vlastní nebezpečí." />
            <Checkbox label="Souhlasím se zpracováním osobních údajů." />
            <div style={{ display: 'flex', gap: 12, marginTop: 26 }}>
              <Button variant="primary" onClick={() => setSubmitted(true)}>Odeslat registraci</Button>
              <Button variant="ghost">Uložit a dokončit později</Button>
            </div>
          </div>
        )}
      </div>
      <Footer columns={[{ title: 'Kontakt', links: [{ label: 'info@svdtpribram.cz', href: '#' }] }]} bottomLeft="© 2026 COWÁRNA z.s." bottomRight="Cookies" />
    </div>
  );
}
window.Registration = Registration;
