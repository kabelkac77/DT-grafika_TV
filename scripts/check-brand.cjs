// Browser-side geometry check shared by all three renderers.
module.exports=async page=>page.evaluate(()=>{
 const logo=document.querySelector('.event-wordmark');
 const relief=document.querySelector('.architecture');
 if(!logo||!relief)return false;
 const a=logo.getBoundingClientRect(),b=relief.getBoundingClientRect();
 const card=logo.closest('article').getBoundingClientRect();
 const intersects=r=>r.width&&r.height&&r.left<a.right&&r.right>a.left&&r.top<a.bottom&&r.bottom>a.top;
 const textCollision=[...document.querySelectorAll('.identity,.bib,.guest-name,.guest-role,.standings')].some(el=>{
   const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;
   while((n=walker.nextNode())){if(!n.textContent.trim())continue;const range=document.createRange();range.selectNodeContents(n);if([...range.getClientRects()].some(intersects))return true;}
   return false;
 });
 const sponsorCollision=[...document.querySelectorAll('.logo-slot')].some(el=>intersects(el.getBoundingClientRect()));
 return logo.complete&&logo.naturalWidth>0&&Math.abs((a.left+a.width/2)-(b.left+b.width/2))<1&&a.left>=card.left&&a.right<=card.right&&a.top>=card.top&&a.bottom<=card.bottom&&!textCollision&&!sponsorCollision;
});
