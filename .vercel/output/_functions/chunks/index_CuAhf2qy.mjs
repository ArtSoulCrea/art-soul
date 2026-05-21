import { c as createComponent } from './astro-component_B12fwhR3.mjs';
import 'piccolore';
import { k as createRenderInstruction, j as addAttribute, s as renderHead, t as renderSlot, u as renderTemplate, p as maybeRenderHead, q as renderComponent } from './entrypoint_CDxjmMMF.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Art Soul — Justine",
    description = "Justine transforme les failles en lumière — peinture et dessin."
  } = Astro2.props;
  return renderTemplate`<html lang="fr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(description, "content")}><link rel="icon" type="image/x-icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/romai/Romain/Dev/Projets/art-soul/src/layouts/Layout.astro", void 0);

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const oeuvreHero = "/assets/hero-oeuvre.webp";
  return renderTemplate`${maybeRenderHead()}<section id="hero" class="relative min-h-screen flex flex-col overflow-hidden lg:flex-row"> <!-- Image en arrière-plan : mobile uniquement, masquée sur desktop --> <div class="absolute inset-0 lg:hidden overflow-hidden"> <img id="hero-bg-img"${addAttribute(oeuvreHero, "src")} alt="" aria-hidden="true" class="w-full h-full object-cover object-center"> <div class="absolute inset-0 bg-linear-to-b from-ink/85 via-ink/72 to-ink/95"></div> </div> <!-- Texte --> <div class="relative z-10 flex-1 flex flex-col justify-center items-center lg:items-start px-8 md:px-14 lg:px-20 xl:px-28 py-24 lg:py-0"> <span id="hero-prenom" class="font-sans text-paper/40 text-xs tracking-[0.4em] uppercase mb-6">
Justine
</span> <h1 id="hero-title" class="font-display font-bold leading-[0.9] mb-8"> <span class="block text-[clamp(3rem,12vw,6rem)] bg-gradient-to-r from-gold to-paper bg-clip-text text-transparent">
ARTSOUL
</span> </h1> <p id="hero-tagline" class="font-serif italic text-paper/70 text-xl lg:text-2xl mb-14 max-w-sm leading-relaxed">
Je transforme les failles en lumière
</p> <div id="hero-ctas" class="flex flex-col sm:flex-row gap-4"> <a href="#contact" class="font-sans text-xs tracking-[0.25em] uppercase font-semibold px-8 py-4 bg-gold text-ink hover:bg-gold/85 transition-colors duration-300 text-center">
Me contacter
</a> <a href="#oeuvres" class="font-sans text-xs tracking-[0.25em] uppercase font-medium px-8 py-4 border border-paper/25 text-paper/80 hover:border-paper/60 hover:text-paper transition-colors duration-300 text-center">
Voir les œuvres
</a> </div> </div> <!-- Image panel : desktop uniquement --> <div id="hero-image-panel" class="hidden lg:flex lg:w-[45%] shrink-0 items-center justify-center"> <img${addAttribute(oeuvreHero, "src")} alt="Œuvre de Justine" class="h-full max-h-screen w-full object-cover"> </div> </section> ${renderScript($$result, "C:/Users/romai/Romain/Dev/Projets/art-soul/src/components/sections/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/romai/Romain/Dev/Projets/art-soul/src/components/sections/Hero.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ` })}`;
}, "C:/Users/romai/Romain/Dev/Projets/art-soul/src/pages/index.astro", void 0);

const $$file = "C:/Users/romai/Romain/Dev/Projets/art-soul/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
