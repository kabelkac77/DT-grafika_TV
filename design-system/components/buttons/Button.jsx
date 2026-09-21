import React, { useState } from 'react';

const FAMILIES = {
  primary: { bg: 'var(--svdt-brand)', hoverBg: 'var(--svdt-brand-hover)', color: '#fff', border: 'none', glow: '0 0 20px rgba(227,6,19,.5)' },
  secondary: { bg: 'var(--svdt-brand)', hoverBg: 'var(--svdt-brand-hover)', color: '#fff', border: '1px solid var(--svdt-line-strong)' },
  ghost: { bg: 'transparent', hoverBg: 'transparent', color: '#fff', hoverColor: 'var(--svdt-red)', border: '1px solid var(--svdt-line-strong)', hoverBorder: 'var(--svdt-red)' },
  quiet: { bg: 'transparent', hoverBg: 'transparent', color: 'var(--svdt-text-soft)', hoverColor: '#fff', border: 'none', padPill: '14px 6px' },
  block: { bg: 'var(--svdt-red-strong)', hoverBg: 'var(--svdt-brand)', color: '#fff', border: 'none', glow: '0 0 24px var(--svdt-red-glow)', sharp: true },
  'block-outline': { bg: 'transparent', hoverBg: 'var(--svdt-red-strong)', color: '#fff', border: 'inset 0 0 0 1px var(--svdt-line-strong)', sharp: true },
};

const SIZES = { sm: { fontSize: 11, padding: '10px 16px' }, default: { fontSize: 13, padding: '14px 22px' }, lg: { fontSize: 15, padding: '18px 32px' } };

/** Two families: pills (header/hero) and sharp blocks (section CTAs). Never mix within one row. */
export function Button({ variant = 'primary', size = 'default', disabled = false, icon = null, children, onClick, href }) {
  const [hover, setHover] = useState(false);
  const f = FAMILIES[variant] || FAMILIES.primary;
  const isBlock = variant === 'block' || variant === 'block-outline';
  const s = SIZES[size] || SIZES.default;
  const base = {
    fontFamily: 'var(--svdt-font)',
    fontWeight: isBlock ? 700 : 900,
    letterSpacing: isBlock ? '.06em' : '.04em',
    textTransform: 'uppercase',
    lineHeight: 1,
    border: f.border && f.border.startsWith('inset') ? 0 : (f.border || 0),
    boxShadow: f.border && f.border.startsWith('inset') ? f.border : (hover && f.glow ? f.glow : 'none'),
    borderRadius: isBlock ? 'var(--svdt-radius-sharp)' : 'var(--svdt-radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'var(--svdt-transition)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: isBlock ? 10 : 8,
    textDecoration: 'none',
    fontSize: isBlock ? 15 : s.fontSize,
    padding: variant === 'quiet' ? (s.padding.split(' ')[0] + ' 6px') : (isBlock ? '15px 26px' : s.padding),
    background: disabled ? 'var(--svdt-bg-card-soft)' : (hover ? f.hoverBg : f.bg),
    color: disabled ? 'var(--svdt-text-muted)' : (hover && f.hoverColor ? f.hoverColor : f.color),
  };
  const Tag = href ? 'a' : 'button';
  return React.createElement(Tag, {
    style: base, disabled, href,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  }, icon, children);
}
