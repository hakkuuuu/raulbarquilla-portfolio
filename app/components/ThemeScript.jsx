/**
 * Pre-paint setup. Runs synchronously as the first child of <body>.
 *
 * 1. Theme: 'light' or 'dark'. Resolution order is the stored choice, then
 *    the system preference, then light (the reference design is light-first).
 *
 * 2. The `js-motion` class. Scroll reveals start hidden, and that hidden
 *    state lives in CSS gated on this class. Reduced motion, or no JS, means
 *    the class is absent and all content is visible.
 */
const script = `(function(){var r=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}r.classList.toggle('dark',t==='dark');r.style.colorScheme=t}catch(e){r.style.colorScheme='light'}try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){r.classList.add('js-motion')}}catch(e){}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
