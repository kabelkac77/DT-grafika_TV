// Native SVG composition from the supplied logo pixels; no retracing of the mark.
const fs=require('fs'),path=require('path');
const asset=path.join(__dirname,'assets');
const source='data:image/png;base64,'+fs.readFileSync(path.join(asset,'logo-svdt.png')).toString('base64');
const filter='<filter id="white" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1 1 1 0 -2"/></filter>';
fs.writeFileSync(path.join(asset,'logo-ink.svg'),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="80 105 594 515"><defs>${filter}</defs><image href="${source}" width="754" height="754" filter="url(#white)"/></svg>`);
fs.writeFileSync(path.join(asset,'svata-hora-relief.svg'),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="232 104 290 148"><defs>${filter}<filter id="smooth" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1 1 1 0 -2"/><feGaussianBlur stdDeviation="0.65"/><feComponentTransfer><feFuncA type="linear" slope="2" intercept="-0.5"/></feComponentTransfer></filter><clipPath id="top"><rect x="232" y="104" width="290" height="137"/></clipPath></defs><image href="${source}" width="754" height="754" filter="url(#smooth)" clip-path="url(#top)"/><path d="M244 233H510V252H244Z" fill="white"/></svg>`);
fs.writeFileSync(path.join(__dirname,'relief-mask.css'),'.architecture i{mask-image:url("data:image/svg+xml;base64,'+fs.readFileSync(path.join(asset,'svata-hora-relief.svg')).toString('base64')+'")}');

