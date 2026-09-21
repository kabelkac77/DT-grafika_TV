/* @ds-bundle: {"format":4,"namespace":"DesignSystem_d54f35","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"ScheduleRow","sourcePath":"components/cards/ScheduleRow.jsx"},{"name":"Alert","sourcePath":"components/forms/Alert.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"FormField","sourcePath":"components/forms/FormField.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Header","sourcePath":"components/navigation/Header.jsx"},{"name":"PartnerWall","sourcePath":"components/partners/PartnerWall.jsx"},{"name":"SponsorPackage","sourcePath":"components/partners/SponsorPackage.jsx"},{"name":"Podium","sourcePath":"components/results/Podium.jsx"},{"name":"ResultsTable","sourcePath":"components/results/ResultsTable.jsx"},{"name":"Countdown","sourcePath":"components/stats/Countdown.jsx"},{"name":"StatBand","sourcePath":"components/stats/StatBand.jsx"},{"name":"StatCard","sourcePath":"components/stats/StatCard.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"a60691e2d2da","components/cards/Card.jsx":"8c4e109c2fce","components/cards/ScheduleRow.jsx":"e5759a73ac7f","components/forms/Alert.jsx":"136339455ec4","components/forms/Checkbox.jsx":"1a4ced33047e","components/forms/FormField.jsx":"07b2a9fb71d5","components/forms/RadioGroup.jsx":"f446a523756c","components/navigation/Footer.jsx":"57a88ce6e93e","components/navigation/Header.jsx":"307bb216d07c","components/partners/PartnerWall.jsx":"0a1ea8d11844","components/partners/SponsorPackage.jsx":"432e4260241c","components/results/Podium.jsx":"03a56a45ab0b","components/results/ResultsTable.jsx":"f00d0afdf6a5","components/stats/Countdown.jsx":"09103abc7608","components/stats/StatBand.jsx":"518554fa2e45","components/stats/StatCard.jsx":"6f53bab65966","ui_kits/website/Home.jsx":"f909e28390e6","ui_kits/website/Registration.jsx":"8e1fd49b8567"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_d54f35 = window.DesignSystem_d54f35 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
const {
  useState
} = React;
const FAMILIES = {
  primary: {
    bg: 'var(--svdt-brand)',
    hoverBg: 'var(--svdt-brand-hover)',
    color: '#fff',
    border: 'none',
    glow: '0 0 20px rgba(227,6,19,.5)'
  },
  secondary: {
    bg: 'var(--svdt-brand)',
    hoverBg: 'var(--svdt-brand-hover)',
    color: '#fff',
    border: '1px solid var(--svdt-line-strong)'
  },
  ghost: {
    bg: 'transparent',
    hoverBg: 'transparent',
    color: '#fff',
    hoverColor: 'var(--svdt-red)',
    border: '1px solid var(--svdt-line-strong)',
    hoverBorder: 'var(--svdt-red)'
  },
  quiet: {
    bg: 'transparent',
    hoverBg: 'transparent',
    color: 'var(--svdt-text-soft)',
    hoverColor: '#fff',
    border: 'none',
    padPill: '14px 6px'
  },
  block: {
    bg: 'var(--svdt-red-strong)',
    hoverBg: 'var(--svdt-brand)',
    color: '#fff',
    border: 'none',
    glow: '0 0 24px var(--svdt-red-glow)',
    sharp: true
  },
  'block-outline': {
    bg: 'transparent',
    hoverBg: 'var(--svdt-red-strong)',
    color: '#fff',
    border: 'inset 0 0 0 1px var(--svdt-line-strong)',
    sharp: true
  }
};
const SIZES = {
  sm: {
    fontSize: 11,
    padding: '10px 16px'
  },
  default: {
    fontSize: 13,
    padding: '14px 22px'
  },
  lg: {
    fontSize: 15,
    padding: '18px 32px'
  }
};

/** Two families: pills (header/hero) and sharp blocks (section CTAs). Never mix within one row. */
function Button({
  variant = 'primary',
  size = 'default',
  disabled = false,
  icon = null,
  children,
  onClick,
  href
}) {
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
    border: f.border && f.border.startsWith('inset') ? 0 : f.border || 0,
    boxShadow: f.border && f.border.startsWith('inset') ? f.border : hover && f.glow ? f.glow : 'none',
    borderRadius: isBlock ? 'var(--svdt-radius-sharp)' : 'var(--svdt-radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'var(--svdt-transition)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: isBlock ? 10 : 8,
    textDecoration: 'none',
    fontSize: isBlock ? 15 : s.fontSize,
    padding: variant === 'quiet' ? s.padding.split(' ')[0] + ' 6px' : isBlock ? '15px 26px' : s.padding,
    background: disabled ? 'var(--svdt-bg-card-soft)' : hover ? f.hoverBg : f.bg,
    color: disabled ? 'var(--svdt-text-muted)' : hover && f.hoverColor ? f.hoverColor : f.color
  };
  const Tag = href ? 'a' : 'button';
  return React.createElement(Tag, {
    style: base,
    disabled,
    href,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
const {
  useState
} = React;
/** Content container. Lifts 4px with a red glow on hover only when interactive (href/onClick present). */
function Card({
  variant = 'basic',
  label,
  title,
  children,
  image = false,
  tag,
  number,
  href,
  onClick
}) {
  const [hover, setHover] = useState(false);
  const interactive = !!(href || onClick);
  const glow = interactive && hover;
  const wrap = {
    background: glow ? 'var(--svdt-bg-card-soft)' : 'var(--svdt-bg-card)',
    border: '1px solid ' + (glow ? 'var(--svdt-red)' : 'var(--svdt-border)'),
    borderRadius: 'var(--svdt-radius)',
    overflow: 'hidden',
    transition: 'var(--svdt-transition)',
    transform: glow ? 'translateY(-4px)' : 'none',
    boxShadow: glow ? '0 0 24px var(--svdt-red-glow)' : 'none',
    cursor: interactive ? 'pointer' : 'default',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block'
  };
  const Tag = href ? 'a' : 'div';
  if (variant === 'media') {
    return React.createElement(Tag, {
      style: wrap,
      href,
      onClick,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 150,
        position: 'relative',
        background: 'radial-gradient(circle at 35% 40%,#4a5568 0,transparent 48%),linear-gradient(135deg,#5a6472,#171c22)'
      }
    }, tag && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 14,
        left: 14,
        background: 'var(--svdt-brand)',
        color: '#fff',
        fontSize: 10,
        fontWeight: 900,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        padding: '5px 11px',
        borderRadius: 'var(--svdt-radius-pill)',
        lineHeight: 1
      }
    }, tag), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg,rgba(5,6,10,0) 30%,rgba(5,6,10,.92) 100%)'
      }
    }), /*#__PURE__*/React.createElement("h3", {
      style: {
        position: 'absolute',
        left: 18,
        right: 18,
        bottom: 14,
        fontSize: 20,
        fontWeight: 900,
        textTransform: 'uppercase',
        lineHeight: 1.05,
        margin: 0,
        color: '#fff'
      }
    }, title)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 24
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 13.5,
        color: 'var(--svdt-text-soft)',
        lineHeight: 1.65
      }
    }, children)));
  }
  if (variant === 'spot') {
    return React.createElement(Tag, {
      style: wrap,
      href,
      onClick,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        padding: 20
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: '0 0 42px',
        height: 42,
        borderRadius: 'var(--svdt-radius-pill)',
        background: 'var(--svdt-brand)',
        display: 'grid',
        placeItems: 'center',
        fontSize: 16,
        fontWeight: 900,
        color: '#fff'
      }
    }, number), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 16,
        margin: '0 0 4px',
        fontWeight: 700
      }
    }, title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 13.5,
        color: 'var(--svdt-text-soft)',
        lineHeight: 1.65
      }
    }, children))));
  }
  return React.createElement(Tag, {
    style: wrap,
    href,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 900,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--svdt-red)',
      display: 'block',
      marginBottom: 10
    }
  }, label), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 8px',
      fontSize: 18,
      fontWeight: 700,
      lineHeight: 1.25
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13.5,
      color: 'var(--svdt-text-soft)',
      lineHeight: 1.65
    }
  }, children)));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/cards/ScheduleRow.jsx
try { (() => {
const PILL_STYLES = {
  live: {
    background: 'var(--svdt-brand)',
    color: '#fff'
  },
  soon: {
    background: 'rgba(255,255,255,.08)',
    color: 'var(--svdt-text-soft)'
  },
  done: {
    background: 'transparent',
    color: 'var(--svdt-text-muted)',
    boxShadow: 'inset 0 0 0 1px var(--svdt-border)'
  }
};

/** One row of a day schedule. `now` highlights the active row with a left red bar. */
function ScheduleRow({
  time,
  title,
  detail,
  status = 'soon',
  now = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '96px 1fr auto',
      gap: 18,
      alignItems: 'center',
      padding: '16px 22px',
      borderBottom: '1px solid var(--svdt-line)',
      background: now ? 'rgba(227,6,19,.09)' : 'transparent',
      boxShadow: now ? 'inset 3px 0 0 var(--svdt-red)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("time", {
    style: {
      fontSize: 19,
      fontWeight: 900,
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums'
    }
  }, time), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      display: 'block',
      lineHeight: 1.3
    }
  }, title), /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: 12.5,
      color: 'var(--svdt-text-muted)',
      display: 'block',
      lineHeight: 1.4
    }
  }, detail)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 900,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      padding: '5px 11px',
      borderRadius: 'var(--svdt-radius-pill)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...PILL_STYLES[status]
    }
  }, status === 'live' ? 'Právě teď' : status === 'done' ? 'Hotovo' : 'Následuje'));
}
Object.assign(__ds_scope, { ScheduleRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ScheduleRow.jsx", error: String((e && e.message) || e) }); }

// components/forms/Alert.jsx
try { (() => {
const KIND = {
  error: {
    bg: 'rgba(227,6,19,.1)',
    bar: 'var(--svdt-brand)',
    titleColor: '#ff6b6b',
    icon: '✕'
  },
  ok: {
    bg: 'rgba(46,224,138,.08)',
    bar: 'var(--svdt-ok, #2ee08a)',
    titleColor: 'var(--svdt-ok, #2ee08a)',
    icon: '✓'
  },
  warn: {
    bg: 'rgba(252,185,0,.08)',
    bar: 'var(--svdt-warn, #fcb900)',
    titleColor: 'var(--svdt-warn, #fcb900)',
    icon: '!'
  }
};

/** Status message. The green/yellow pair here are the only colours in the system outside the core red/black palette. */
function Alert({
  kind = 'ok',
  title,
  children
}) {
  const k = KIND[kind] || KIND.ok;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      padding: '16px 20px',
      borderRadius: 'var(--svdt-radius)',
      fontSize: 13.5,
      lineHeight: 1.6,
      background: k.bg,
      boxShadow: `inset 3px 0 0 ${k.bar}`,
      color: 'var(--svdt-text-mid)',
      fontFamily: 'var(--svdt-font)'
    }
  }, /*#__PURE__*/React.createElement("span", null, k.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      marginBottom: 3,
      color: k.titleColor
    }
  }, title), children));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Alert.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Checkbox with a full-label click target (min 44px tall) — never a bare 19px box. */
function Checkbox({
  label,
  defaultChecked,
  id
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id || label,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: 'pointer',
      padding: '4px 0',
      fontFamily: 'var(--svdt-font)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: id || label,
    type: "checkbox",
    defaultChecked: defaultChecked,
    style: {
      width: 19,
      height: 19,
      flex: '0 0 19px',
      accentColor: 'var(--svdt-brand)',
      marginTop: 2,
      padding: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'var(--svdt-text-soft)',
      lineHeight: 1.55
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/FormField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const base = {
  width: '100%',
  fontFamily: 'var(--svdt-font)',
  fontSize: 15,
  color: '#fff',
  background: 'var(--svdt-bg-soft)',
  border: '1px solid var(--svdt-border)',
  borderRadius: 'var(--svdt-radius-sm)',
  padding: '13px 15px',
  transition: 'var(--svdt-transition)',
  lineHeight: 1.4,
  boxSizing: 'border-box'
};

/** Labelled text/email/select/textarea field. Label always sits above the field — never a placeholder standing in for it. */
function FormField({
  label,
  required,
  type = 'text',
  placeholder,
  value,
  options,
  hint,
  error,
  id
}) {
  const [focus, setFocus] = useState(false);
  const fieldId = id || label;
  const style = {
    ...base,
    borderColor: error ? 'var(--svdt-brand)' : focus ? 'var(--svdt-red)' : 'var(--svdt-border)',
    boxShadow: error ? '0 0 0 3px rgba(227,6,19,.16)' : focus ? '0 0 0 3px rgba(255,26,26,.14)' : 'none'
  };
  const focusProps = {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20,
      fontFamily: 'var(--svdt-font)'
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'block',
      fontSize: 11,
      fontWeight: 900,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--svdt-text-soft)',
      marginBottom: 8
    }
  }, label, " ", required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--svdt-red)'
    }
  }, "*")), type === 'textarea' ? /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    placeholder: placeholder,
    defaultValue: value,
    style: {
      ...style,
      resize: 'vertical',
      minHeight: 96
    }
  }, focusProps)) : type === 'select' ? /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    defaultValue: value,
    style: style
  }, focusProps), (options || []).map(o => /*#__PURE__*/React.createElement("option", {
    key: o
  }, o))) : /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    placeholder: placeholder,
    defaultValue: value,
    style: style
  }, focusProps)), hint && !error && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--svdt-text-muted)',
      margin: '7px 0 0',
      lineHeight: 1.5
    }
  }, hint), error && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--svdt-err, #ff6b6b)',
      margin: '7px 0 0',
      lineHeight: 1.5,
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u2715"), /*#__PURE__*/React.createElement("span", null, error)));
}
Object.assign(__ds_scope, { FormField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FormField.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
const {
  useState
} = React;
/** Segmented pill radio group (e.g. shirt size). Selected pill fills brand red. */
function RadioGroup({
  name,
  options = [],
  defaultValue
}) {
  const [val, setVal] = useState(defaultValue || options[0]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${options.length},1fr)`,
      gap: 10,
      fontFamily: 'var(--svdt-font)'
    }
  }, options.map(o => /*#__PURE__*/React.createElement("label", {
    key: o,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    checked: val === o,
    onChange: () => setVal(o),
    style: {
      position: 'absolute',
      opacity: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      textAlign: 'center',
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      padding: '14px 10px',
      borderRadius: 'var(--svdt-radius-sm)',
      border: '1px solid ' + (val === o ? 'transparent' : 'var(--svdt-border)'),
      color: val === o ? '#fff' : 'var(--svdt-text-soft)',
      background: val === o ? 'var(--svdt-brand)' : 'transparent',
      cursor: 'pointer',
      transition: 'var(--svdt-transition)'
    }
  }, o))));
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
/** Site footer. Top border is the only place brand red is used as a divider line. */
function Footer({
  columns = [],
  bottomLeft,
  bottomRight
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '44px 28px 26px',
      background: 'var(--svdt-bg-soft)',
      borderTop: '2px solid var(--svdt-brand)',
      fontFamily: 'var(--svdt-font)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `1.4fr repeat(${columns.length}, 1fr)`,
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("svg", {
    width: "44",
    height: "44",
    viewBox: "0 0 150 150",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "75",
    cy: "75",
    r: "72",
    fill: "#e30613"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "75",
    cy: "75",
    r: "60",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "75",
    y: "88",
    textAnchor: "middle",
    fill: "#fff",
    fontFamily: "Exo,Arial",
    fontSize: "38",
    fontWeight: "900"
  }, "SVDT")), /*#__PURE__*/React.createElement("p", {
    style: {
      lineHeight: 1.7,
      margin: 0,
      fontSize: 13.5,
      color: 'var(--svdt-text-soft)'
    }
  }, "M\u011Bstsk\xFD sjezd centrem P\u0159\xEDbrami.", /*#__PURE__*/React.createElement("br", null), "10. ro\u010Dn\xEDk \u2014 23. kv\u011Btna 2026.")), columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: 11,
      fontWeight: 900,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--svdt-red)',
      margin: '0 0 14px'
    }
  }, col.title), col.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    style: {
      display: 'block',
      fontSize: 13.5,
      color: 'var(--svdt-text-soft)',
      textDecoration: 'none',
      lineHeight: 2
    }
  }, l.label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      paddingTop: 20,
      borderTop: '1px solid var(--svdt-line)',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 12,
      color: 'var(--svdt-text-muted)',
      flexWrap: 'wrap',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", null, bottomLeft), /*#__PURE__*/React.createElement("span", null, bottomRight)));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Header.jsx
try { (() => {
/** Sticky translucent header. One primary CTA only; active item marked with a red underline, never a filled background. */
function Header({
  items = [],
  activeHref,
  ctaLabel = 'Registrace',
  ctaHref = '#',
  lang = 'EN'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '14px 24px',
      background: 'rgba(10,10,10,.92)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--svdt-line)',
      fontFamily: 'var(--svdt-font)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "38",
    height: "38",
    viewBox: "0 0 150 150"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "75",
    cy: "75",
    r: "72",
    fill: "#e30613"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "75",
    cy: "75",
    r: "60",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "75",
    y: "88",
    textAnchor: "middle",
    fill: "#fff",
    fontFamily: "Exo,Arial",
    fontSize: "38",
    fontWeight: "900"
  }, "SVDT")), /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 15,
      fontWeight: 900,
      textTransform: 'uppercase',
      lineHeight: 1.05,
      color: '#fff'
    }
  }, "Svatohorsk\xFD", /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      fontSize: 8.5,
      fontWeight: 700,
      letterSpacing: '.22em',
      color: 'var(--svdt-text-muted)'
    }
  }, "Downtown P\u0159\xEDbram"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 2,
      marginLeft: 'auto',
      alignItems: 'center'
    }
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.href,
    href: it.href,
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: it.href === activeHref ? '#fff' : 'var(--svdt-text-mid)',
      textDecoration: 'none',
      padding: '9px 13px',
      borderRadius: 6,
      position: 'relative',
      whiteSpace: 'nowrap',
      borderBottom: it.href === activeHref ? '2px solid var(--svdt-red)' : '2px solid transparent'
    }
  }, it.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      marginLeft: 14
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 11,
      fontWeight: 900,
      letterSpacing: '.08em',
      color: 'var(--svdt-text-muted)',
      padding: 8,
      textDecoration: 'none'
    }
  }, lang), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    href: ctaHref
  }, ctaLabel)));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Header.jsx", error: String((e && e.message) || e) }); }

// components/partners/PartnerWall.jsx
try { (() => {
const {
  useState
} = React;
const TIER_CFG = {
  general: {
    cols: 1,
    height: 150,
    fontSize: 30
  },
  main: {
    cols: 3,
    height: 110,
    fontSize: 20
  },
  support: {
    cols: 5,
    height: 78,
    fontSize: 13
  },
  media: {
    cols: 6,
    height: 62,
    fontSize: 11
  }
};

/** One tier of the partner wall. Tier is expressed by tile size only — never by border colour. Logos keep original colours; never recolour to brand red. */
function PartnerWall({
  tier = 'main',
  label,
  sublabel,
  partners = []
}) {
  const cfg = TIER_CFG[tier] || TIER_CFG.main;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--svdt-font)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 11,
      fontWeight: 900,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: 'var(--svdt-red)',
      whiteSpace: 'nowrap'
    }
  }, label), /*#__PURE__*/React.createElement("i", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--svdt-line)'
    }
  }), /*#__PURE__*/React.createElement("small", {
    style: {
      fontFamily: 'ui-monospace,Consolas,monospace',
      fontSize: 10.5,
      color: 'var(--svdt-text-muted)'
    }
  }, sublabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cfg.cols},1fr)`,
      gap: 14
    }
  }, partners.map(p => /*#__PURE__*/React.createElement(Tile, {
    key: p,
    name: p,
    height: cfg.height,
    fontSize: cfg.fontSize
  }))));
}
function Tile({
  name,
  height,
  fontSize
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: hover ? 'var(--svdt-bg-card-soft)' : 'var(--svdt-bg-card)',
      border: '1px solid ' + (hover ? 'var(--svdt-red)' : 'var(--svdt-border)'),
      borderRadius: 'var(--svdt-radius)',
      height,
      display: 'grid',
      placeItems: 'center',
      transition: 'var(--svdt-transition)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      color: hover ? '#fff' : 'var(--svdt-text-muted)',
      fontSize,
      textAlign: 'center',
      padding: '0 12px',
      transition: 'var(--svdt-transition)'
    }
  }, name));
}
Object.assign(__ds_scope, { PartnerWall });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/partners/PartnerWall.jsx", error: String((e && e.message) || e) }); }

// components/partners/SponsorPackage.jsx
try { (() => {
/** Sponsorship package card. Set `highlighted` on at most one package per screen. */
function SponsorPackage({
  name,
  price,
  priceUnit,
  features = [],
  highlighted = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--svdt-bg-card)',
      border: '1px solid ' + (highlighted ? 'var(--svdt-brand)' : 'var(--svdt-border)'),
      borderRadius: 'var(--svdt-radius)',
      padding: 26,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--svdt-font)',
      color: '#fff'
    }
  }, highlighted && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      background: 'var(--svdt-brand)',
      color: '#fff',
      fontSize: 9.5,
      fontWeight: 900,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      padding: '6px 12px',
      borderRadius: '0 0 0 8px'
    }
  }, "Nej\u017E\xE1dan\u011Bj\u0161\xED"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 4px',
      fontSize: 13,
      fontWeight: 900,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--svdt-red)'
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 34,
      fontWeight: 900,
      lineHeight: 1,
      margin: '0 0 18px',
      fontVariantNumeric: 'tabular-nums'
    }
  }, price, priceUnit && /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--svdt-text-muted)'
    }
  }, " ", priceUnit)), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none'
    }
  }, features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: f,
    style: {
      fontSize: 13,
      color: 'var(--svdt-text-soft)',
      lineHeight: 1.5,
      padding: '9px 0 9px 22px',
      borderBottom: i < features.length - 1 ? '1px solid var(--svdt-line)' : 'none',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 15,
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: 'var(--svdt-brand)'
    }
  }), f))));
}
Object.assign(__ds_scope, { SponsorPackage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/partners/SponsorPackage.jsx", error: String((e && e.message) || e) }); }

// components/results/Podium.jsx
try { (() => {
/** Podium for the top 3. Gold/silver/bronze colours are never used — SVDT ranks purely by fading brand red. */
function Podium({
  second,
  first,
  third
}) {
  const Slot = ({
    data,
    rank,
    big
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--svdt-bg-card)',
      border: '1px solid var(--svdt-border)',
      borderRadius: 'var(--svdt-radius)',
      padding: big ? '30px 18px 26px' : '22px 18px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--svdt-font)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 3,
      background: rank === 1 ? 'var(--svdt-brand)' : rank === 2 ? 'rgba(227,6,19,.55)' : 'rgba(227,6,19,.3)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: big ? 58 : 44,
      fontWeight: 900,
      lineHeight: 1,
      color: 'var(--svdt-red)',
      fontVariantNumeric: 'tabular-nums',
      marginBottom: 10
    }
  }, rank), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      textTransform: 'uppercase',
      lineHeight: 1.15,
      color: '#fff',
      marginBottom: 4
    }
  }, data.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--svdt-text-muted)',
      marginBottom: 12
    }
  }, data.team), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 900,
      fontVariantNumeric: 'tabular-nums',
      color: '#fff'
    }
  }, data.time));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.15fr 1fr',
      gap: 16,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(Slot, {
    data: second,
    rank: 2
  }), /*#__PURE__*/React.createElement(Slot, {
    data: first,
    rank: 1,
    big: true
  }), /*#__PURE__*/React.createElement(Slot, {
    data: third,
    rank: 3
  }));
}
Object.assign(__ds_scope, { Podium });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/results/Podium.jsx", error: String((e && e.message) || e) }); }

// components/results/ResultsTable.jsx
try { (() => {
/** Results table. Times/gaps use tabular numerals and right alignment; top 3 get a fading red left bar, gap-to-leader is the only accent-red figure. */
function ResultsTable({
  caption,
  rows = []
}) {
  const posColor = i => i < 3 ? 'var(--svdt-red)' : '#fff';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--svdt-border)',
      borderRadius: 'var(--svdt-radius)',
      overflow: 'hidden',
      background: 'var(--svdt-bg-card)',
      fontFamily: 'var(--svdt-font)'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, caption && /*#__PURE__*/React.createElement("caption", {
    style: {
      captionSide: 'top',
      textAlign: 'left',
      padding: '12px 18px',
      fontSize: 12,
      color: 'var(--svdt-text-muted)'
    }
  }, caption), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Poř.', 'Č.', 'Jezdec', 'Kategorie', 'Čas', 'Ztráta'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: i >= 4 ? 'right' : 'left',
      fontSize: 10.5,
      fontWeight: 900,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--svdt-text-muted)',
      padding: '16px 18px',
      background: 'var(--svdt-bg-soft)',
      borderBottom: '1px solid var(--svdt-border)',
      whiteSpace: 'nowrap'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r.bib,
    style: {
      background: i === 0 ? 'linear-gradient(90deg,rgba(227,6,19,.16),transparent 55%)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '15px 18px',
      borderBottom: '1px solid var(--svdt-line)',
      fontSize: 19,
      fontWeight: 900,
      fontVariantNumeric: 'tabular-nums',
      color: posColor(i),
      width: '1%',
      boxShadow: i < 3 ? `inset 3px 0 0 rgba(227,6,19,${i === 0 ? 1 : i === 1 ? .55 : .3})` : 'none'
    }
  }, r.dnf ? '—' : i + 1), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '15px 18px',
      borderBottom: '1px solid var(--svdt-line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-grid',
      placeItems: 'center',
      minWidth: 34,
      height: 26,
      padding: '0 7px',
      borderRadius: 5,
      background: 'var(--svdt-bg-soft)',
      border: '1px solid var(--svdt-border)',
      fontSize: 12.5,
      fontWeight: 900,
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--svdt-text-soft)'
    }
  }, r.bib)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '15px 18px',
      borderBottom: '1px solid var(--svdt-line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontWeight: 700,
      fontSize: 15,
      display: 'block'
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--svdt-text-muted)'
    }
  }, r.team)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '15px 18px',
      borderBottom: '1px solid var(--svdt-line)',
      color: 'var(--svdt-text-mid)',
      fontSize: 14
    }
  }, r.category), r.dnf ? /*#__PURE__*/React.createElement("td", {
    colSpan: 2,
    style: {
      padding: '15px 18px',
      borderBottom: '1px solid var(--svdt-line)',
      color: 'var(--svdt-text-muted)',
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: '.1em',
      textAlign: 'right'
    }
  }, "DNF") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '15px 18px',
      borderBottom: '1px solid var(--svdt-line)',
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 900,
      color: '#fff',
      fontSize: 15,
      textAlign: 'right',
      whiteSpace: 'nowrap'
    }
  }, r.time), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '15px 18px',
      borderBottom: '1px solid var(--svdt-line)',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--svdt-red)',
      fontSize: 13,
      textAlign: 'right',
      fontWeight: 700,
      whiteSpace: 'nowrap'
    }
  }, r.gap || '—')))))));
}
Object.assign(__ds_scope, { ResultsTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/results/ResultsTable.jsx", error: String((e && e.message) || e) }); }

// components/stats/Countdown.jsx
try { (() => {
/** Hero countdown — one per page, white numerals + red unit labels, always tabular/zero-padded. */
function Countdown({
  heading,
  days,
  hours,
  minutes,
  seconds,
  dateLine
}) {
  const pad = n => String(n).padStart(2, '0');
  const Unit = ({
    v,
    label
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 112,
      background: 'var(--svdt-bg-soft)',
      border: '1px solid var(--svdt-border)',
      borderRadius: 'var(--svdt-radius)',
      padding: '20px 14px'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontSize: 52,
      fontWeight: 900,
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-.02em'
    }
  }, typeof v === 'number' && label !== 'Dní' ? pad(v) : v), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 11,
      fontWeight: 900,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: 'var(--svdt-red)',
      marginTop: 10
    }
  }, label));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--svdt-bg-card)',
      border: '1px solid var(--svdt-border)',
      borderRadius: 'var(--svdt-radius)',
      padding: '44px 28px',
      textAlign: 'center',
      fontFamily: 'var(--svdt-font)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 50,
      fontWeight: 900,
      textTransform: 'uppercase',
      lineHeight: 1,
      margin: '0 0 28px'
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Unit, {
    v: days,
    label: "Dn\xED"
  }), /*#__PURE__*/React.createElement(Unit, {
    v: hours,
    label: "Hodin"
  }), /*#__PURE__*/React.createElement(Unit, {
    v: minutes,
    label: "Minut"
  }), /*#__PURE__*/React.createElement(Unit, {
    v: seconds,
    label: "Sekund"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '26px 0 0',
      fontSize: 13,
      fontWeight: 900,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--svdt-text-soft)'
    }
  }, dateLine));
}
Object.assign(__ds_scope, { Countdown });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/stats/Countdown.jsx", error: String((e && e.message) || e) }); }

// components/stats/StatBand.jsx
try { (() => {
/** Quick-glance stat strip below a hero. 3–4 figures max — a 5th breaks the rhythm. */
function StatBand({
  stats = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${stats.length},1fr)`,
      border: '1px solid var(--svdt-border)',
      borderRadius: 'var(--svdt-radius)',
      overflow: 'hidden',
      background: 'var(--svdt-bg-card)',
      fontFamily: 'var(--svdt-font)'
    }
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      padding: '32px 22px',
      textAlign: 'center',
      borderRight: i < stats.length - 1 ? '1px solid var(--svdt-line)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontSize: 38,
      fontWeight: 900,
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums',
      color: '#fff'
    }
  }, s.value), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 11,
      fontWeight: 900,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--svdt-text-soft)',
      marginTop: 10,
      lineHeight: 1.5
    }
  }, s.label))));
}
Object.assign(__ds_scope, { StatBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/stats/StatBand.jsx", error: String((e && e.message) || e) }); }

// components/stats/StatCard.jsx
try { (() => {
const {
  useState
} = React;
/** Stat with supporting context copy — for partner decks and press materials. Left brand-red bar; glows red on hover. */
function StatCard({
  value,
  label,
  children
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--svdt-bg-card)',
      border: '1px solid ' + (hover ? 'var(--svdt-red)' : 'var(--svdt-border)'),
      borderRadius: 'var(--svdt-radius)',
      padding: 26,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'var(--svdt-font)',
      boxShadow: hover ? '0 0 24px var(--svdt-red-glow)' : 'none',
      transition: 'var(--svdt-transition)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      background: 'var(--svdt-brand)'
    }
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontSize: 44,
      fontWeight: 900,
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums',
      marginBottom: 8,
      color: '#fff'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--svdt-red)',
      lineHeight: 1.4
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 13,
      color: 'var(--svdt-text-soft)',
      lineHeight: 1.6
    }
  }, children));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/stats/StatCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  Header,
  Footer
} = window.DesignSystem_d54f35;
const {
  Countdown,
  StatBand
} = window.DesignSystem_d54f35;
const {
  Card,
  ScheduleRow
} = window.DesignSystem_d54f35;
const {
  Podium,
  ResultsTable
} = window.DesignSystem_d54f35;
const {
  PartnerWall
} = window.DesignSystem_d54f35;
const {
  Button
} = window.DesignSystem_d54f35;
const NAV = [{
  label: 'Výsledky',
  href: '#results'
}, {
  label: 'Pro diváky',
  href: '#visitors'
}, {
  label: 'Závody',
  href: '#races'
}, {
  label: 'Afterparty',
  href: '#after'
}, {
  label: 'Partneři',
  href: '#partners'
}];
const FOOTER_COLS = [{
  title: 'Závod',
  links: [{
    label: 'Hlavní závod',
    href: '#'
  }, {
    label: 'Dětský závod',
    href: '#'
  }, {
    label: 'Propozice',
    href: '#'
  }]
}, {
  title: 'Návštěvník',
  links: [{
    label: 'Pro diváky',
    href: '#'
  }, {
    label: 'Orientační plánek',
    href: '#'
  }, {
    label: 'Afterparty',
    href: '#'
  }]
}, {
  title: 'Kontakt',
  links: [{
    label: 'COWÁRNA z.s.',
    href: '#'
  }, {
    label: 'info@svdtpribram.cz',
    href: '#'
  }, {
    label: 'Instagram',
    href: '#'
  }]
}];
function Section({
  id,
  alt,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      padding: '72px 32px',
      background: alt ? 'var(--svdt-bg-soft)' : 'var(--svdt-bg)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, children));
}
function H2({
  children
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--svdt-text-mid)',
      margin: '0 0 24px',
      paddingBottom: 10,
      borderBottom: '1px solid var(--svdt-line)'
    }
  }, children);
}
function Home({
  onRegister
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--svdt-font)',
      background: 'var(--svdt-bg)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(Header, {
    items: NAV,
    activeHref: "#",
    ctaHref: "#register",
    ctaLabel: "Registrace"
  })), /*#__PURE__*/React.createElement(Section, {
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: '96px 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 50% -10%, rgba(255,26,26,.16), transparent 55%)'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      position: 'relative',
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: 'var(--svdt-red)',
      margin: '0 0 14px'
    }
  }, "10. ro\u010Dn\xEDk \xB7 23. kv\u011Btna 2026"), /*#__PURE__*/React.createElement("h1", {
    style: {
      position: 'relative',
      fontSize: 64,
      fontWeight: 900,
      lineHeight: .95,
      textTransform: 'uppercase',
      margin: '0 0 20px'
    }
  }, "Za\u017Eij ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--svdt-red)'
    }
  }, "atmosf\xE9ru.")), /*#__PURE__*/React.createElement("p", {
    style: {
      position: 'relative',
      maxWidth: 560,
      margin: '0 auto 32px',
      color: 'var(--svdt-text-soft)',
      fontSize: 17,
      lineHeight: 1.7
    }
  }, "M\u011Bstsk\xFD sjezd centrem P\u0159\xEDbrami. Div\xE1ci maj\xED p\u0159\xEDstup zdarma na v\u0161echna stanovi\u0161t\u011B pod\xE9l trati."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      gap: 12,
      justifyContent: 'center',
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onRegister
  }, "Registrace"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg"
  }, "Jdu jako div\xE1k")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 620,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Countdown, {
    heading: "Start z\xE1vodu za",
    days: 128,
    hours: 6,
    minutes: 42,
    seconds: 19,
    dateLine: "Sobota 23. kv\u011Btna 2026 \xB7 P\u0159\xEDbram \xB7 Vstup zdarma"
  }))), /*#__PURE__*/React.createElement(Section, {
    alt: true
  }, /*#__PURE__*/React.createElement(StatBand, {
    stats: [{
      value: 140,
      label: 'Jezdců na startu'
    }, {
      value: 100,
      label: 'Dětí v dětském závodě'
    }, {
      value: '25+',
      label: 'Překážek na trati'
    }, {
      value: '10.',
      label: 'Ročník závodu'
    }]
  })), /*#__PURE__*/React.createElement(Section, {
    id: "races"
  }, /*#__PURE__*/React.createElement(H2, null, "Program dne"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(Card, {
    label: "Hlavn\xED z\xE1vod",
    title: "Elite mu\u017Ei",
    href: "#"
  }, "Kvalifikace 11:00, fin\xE1le 15:00. Startovn\xE9 700 K\u010D do 15. 5."), /*#__PURE__*/React.createElement(Card, {
    label: "D\u011Btsk\xFD z\xE1vod",
    title: "Kids downtown",
    href: "#"
  }, "Zkr\xE1cen\xE1 tra\u0165 pro kategorie 6\u201314 let. P\u0159ilba povinn\xE1."), /*#__PURE__*/React.createElement(Card, {
    label: "Afterparty",
    title: "Klub \u0160achta",
    href: "#"
  }, "\u017Div\xE1 kapela od 20:00, DJ set do 03:00.")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--svdt-border)',
      borderRadius: 10,
      overflow: 'hidden',
      background: 'var(--svdt-bg-card)'
    }
  }, /*#__PURE__*/React.createElement(ScheduleRow, {
    time: "09:00",
    title: "Otev\u0159en\xED depa",
    detail: "Registrace a v\xFDdej startovn\xEDch \u010D\xEDsel",
    status: "done"
  }), /*#__PURE__*/React.createElement(ScheduleRow, {
    time: "11:00",
    title: "Voln\xFD tr\xE9nink",
    detail: "Cel\xE1 tra\u0165, po skupin\xE1ch",
    status: "done"
  }), /*#__PURE__*/React.createElement(ScheduleRow, {
    time: "15:00",
    title: "Hlavn\xED z\xE1vod \u2014 start",
    detail: "Elite mu\u017Ei, \u017Eeny, junio\u0159i",
    status: "live",
    now: true
  }), /*#__PURE__*/React.createElement(ScheduleRow, {
    time: "19:00",
    title: "Vyhl\xE1\u0161en\xED v\xFDsledk\u016F",
    detail: "N\xE1m\u011Bst\xED T. G. Masaryka",
    status: "soon"
  }))), /*#__PURE__*/React.createElement(Section, {
    id: "results",
    alt: true
  }, /*#__PURE__*/React.createElement(H2, null, "V\xFDsledky \xB7 Elite mu\u017Ei"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Podium, {
    first: {
      name: 'Jakub Říha',
      team: 'SVDT Racing',
      time: '1:46.312'
    },
    second: {
      name: 'Tomáš Zíta',
      team: 'Rock Machine',
      time: '1:47.905'
    },
    third: {
      name: 'Martin Kraus',
      team: 'Bikepark Klínovec',
      time: '1:48.240'
    }
  })), /*#__PURE__*/React.createElement(ResultsTable, {
    caption: "Elite mu\u017Ei, fin\xE1le, SVDT 2026",
    rows: [{
      bib: 7,
      name: 'Jakub Říha',
      team: 'SVDT Racing',
      category: 'Elite muži',
      time: '1:46.312'
    }, {
      bib: 14,
      name: 'Tomáš Zíta',
      team: 'Rock Machine',
      category: 'Elite muži',
      time: '1:47.905',
      gap: '+1.593'
    }, {
      bib: 3,
      name: 'Martin Kraus',
      team: 'Bikepark Klínovec',
      category: 'Elite muži',
      time: '1:48.240',
      gap: '+1.928'
    }, {
      bib: 18,
      name: 'Lukáš Beneš',
      team: 'Downhill Brno',
      category: 'Elite muži',
      dnf: true
    }]
  })), /*#__PURE__*/React.createElement(Section, {
    id: "partners"
  }, /*#__PURE__*/React.createElement(H2, null, "Partne\u0159i"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(PartnerWall, {
    tier: "main",
    label: "Hlavn\xED partne\u0159i",
    sublabel: "3 sloupce \xB7 110px",
    partners: ['Hlavní A', 'Hlavní B', 'Hlavní C']
  }), /*#__PURE__*/React.createElement(PartnerWall, {
    tier: "support",
    label: "Partne\u0159i",
    sublabel: "5 sloupc\u016F \xB7 78px",
    partners: ['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4', 'Partner 5']
  }))), /*#__PURE__*/React.createElement(Footer, {
    columns: FOOTER_COLS,
    bottomLeft: "\xA9 2026 COW\xC1RNA z.s. \u2014 v\u0161echna pr\xE1va vyhrazena",
    bottomRight: "Ochrana osobn\xEDch \xFAdaj\u016F \xB7 Cookies"
  }));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Registration.jsx
try { (() => {
const {
  useState
} = React;
const {
  Header,
  Footer,
  FormField,
  RadioGroup,
  Checkbox,
  Alert,
  Button
} = window.DesignSystem_d54f35;
const NAV = [{
  label: 'Výsledky',
  href: '#'
}, {
  label: 'Pro diváky',
  href: '#'
}, {
  label: 'Závody',
  href: '#'
}, {
  label: 'Afterparty',
  href: '#'
}, {
  label: 'Partneři',
  href: '#'
}];
function Registration({
  onBack
}) {
  const [submitted, setSubmitted] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--svdt-font)',
      background: 'var(--svdt-bg)',
      color: '#fff',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement(Header, {
    items: NAV,
    ctaHref: "#",
    ctaLabel: "Registrace"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 660,
      margin: '0 auto',
      padding: '56px 32px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: 'none',
      border: 0,
      color: 'var(--svdt-text-soft)',
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      cursor: 'pointer',
      padding: 0,
      marginBottom: 24
    }
  }, "\u2190 Zp\u011Bt na web"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--svdt-red)',
      margin: '0 0 10px'
    }
  }, "Registrace"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 40,
      fontWeight: 900,
      textTransform: 'uppercase',
      lineHeight: 1,
      margin: '0 0 32px'
    }
  }, "Registrace jezdce"), submitted ? /*#__PURE__*/React.createElement(Alert, {
    kind: "ok",
    title: "Registrace p\u0159ijata"
  }, "Startovn\xED \u010D\xEDslo 47. Potvrzen\xED jsme poslali na tv\u016Fj e-mail.") : /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--svdt-bg-card)',
      border: '1px solid var(--svdt-border)',
      borderRadius: 'var(--svdt-radius)',
      padding: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Jm\xE9no",
    required: true,
    placeholder: "Jakub"
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "P\u0159\xEDjmen\xED",
    required: true,
    placeholder: "\u0158\xEDha"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "E-mail",
    required: true,
    type: "email",
    placeholder: "jakub.riha@email.cz"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Rok narozen\xED",
    required: true,
    placeholder: "1998"
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "T\xFDm / klub",
    placeholder: "Nepovinn\xE9"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Kategorie",
    required: true,
    type: "select",
    options: ['Elite muži', 'Elite ženy', 'Junioři 15–18', 'Masters 40+', 'Dětský závod 6–14'],
    hint: "Kategorii ur\u010Duje rok narozen\xED."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      fontWeight: 900,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--svdt-text-soft)',
      margin: '0 0 8px'
    }
  }, "Velikost trika"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(RadioGroup, {
    name: "size",
    options: ['S', 'M', 'L', 'XL', 'XXL'],
    defaultValue: "M"
  })), /*#__PURE__*/React.createElement(FormField, {
    label: "Pozn\xE1mka pro po\u0159adatele",
    type: "textarea",
    placeholder: "Alergie, zdravotn\xED omezen\xED, cokoliv dal\u0161\xEDho\u2026"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Souhlas\xEDm s propozicemi z\xE1vodu a startuji na vlastn\xED nebezpe\u010D\xED."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Souhlas\xEDm se zpracov\xE1n\xEDm osobn\xEDch \xFAdaj\u016F."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setSubmitted(true)
  }, "Odeslat registraci"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Ulo\u017Eit a dokon\u010Dit pozd\u011Bji")))), /*#__PURE__*/React.createElement(Footer, {
    columns: [{
      title: 'Kontakt',
      links: [{
        label: 'info@svdtpribram.cz',
        href: '#'
      }]
    }],
    bottomLeft: "\xA9 2026 COW\xC1RNA z.s.",
    bottomRight: "Cookies"
  }));
}
window.Registration = Registration;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Registration.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ScheduleRow = __ds_scope.ScheduleRow;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.FormField = __ds_scope.FormField;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.PartnerWall = __ds_scope.PartnerWall;

__ds_ns.SponsorPackage = __ds_scope.SponsorPackage;

__ds_ns.Podium = __ds_scope.Podium;

__ds_ns.ResultsTable = __ds_scope.ResultsTable;

__ds_ns.Countdown = __ds_scope.Countdown;

__ds_ns.StatBand = __ds_scope.StatBand;

__ds_ns.StatCard = __ds_scope.StatCard;

})();
