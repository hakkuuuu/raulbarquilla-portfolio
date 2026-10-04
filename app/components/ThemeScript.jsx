/**
 * Pre-paint setup. architecture.md section 6.
 *
 * Two jobs, both of which must happen before the first paint:
 *
 * 1. Theme. Six options: 'light', 'dark', and four monochrome terminal
 *    variants. A terminal variant applies `dark t t-<name>`, so every `dark:`
 *    variant in the markup still resolves and only token values change.
 *    Resolution order: stored choice, then system preference, then dark.
 *
 * 2. The `js-motion` class. Scroll reveals start hidden, and that hidden state
 *    lives in CSS gated on this class rather than in inline styles. Reduced
 *    motion, or no JS, means the class is absent and all content is visible.
 *    See ADR-019.
 *
 * Rendered as the first child of <body> and executed synchronously.
 */
const script = `(function(){var r=document.documentElement;var T=['t-green','t-blue','t-amber','t-red'];try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'&&T.indexOf(t)<0){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}var term=T.indexOf(t)>=0;r.classList.toggle('dark',t==='dark'||term);r.classList.toggle('t',term);for(var i=0;i<T.length;i++){r.classList.toggle(T[i],T[i]===t)}r.style.colorScheme=t==='light'?'light':'dark'}catch(e){r.classList.add('dark');r.style.colorScheme='dark'}try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){r.classList.add('js-motion')}}catch(e){}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
