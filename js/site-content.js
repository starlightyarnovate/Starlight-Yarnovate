/*
 * Editable site content for Starlight Yarnovate.
 *
 * Edit this file to update text, links, and the gallery. No build step needed.
 *
 * Rules:
 * - Any string that starts with "[" is an unresolved placeholder. The page
 *   will NOT display it; it shows a neutral fallback instead.
 * - Empty arrays (gallery, socialLinks) hide their section gracefully.
 * - Only add social links whose URLs you have verified.
 */
window.SITE_CONTENT = {
  brand: {
    name: "Starlight Yarnovate",
    category: "Online Crochet Education",
    tagline: "Learn crochet, one stitch at a time.",
    instagramBio: "Learn crochet, one stitch at a time. Inspiring creativity through crochet.",
    // Set to a real logo path once the official asset is supplied, e.g. "assets/logo/logo.png".
    // Leave empty to use the temporary text wordmark.
    logo: "",
    logoAlt: "Starlight Yarnovate logo",
    email: "starlightyarnovate@gmail.com",
    phoneDisplay: "+91 9865323502",
    phoneDigits: "919865323502"
  },

  hero: {
    headline: "Discover the Art of Crochet",
    description: "Learn, create, and bring beautiful ideas to life, one stitch at a time.",
    ctaLabel: "Get in Touch",
    ctaTarget: "#contact",
    image: "assets/images/hero-yarn.svg",
    imageAlt: ""
  },

  intro: {
    heading: "A Little About Us",
    description: "Starlight Yarnovate is an online crochet learning space built around one idea: every beautiful handmade piece starts with a single stitch. Whether you are picking up a hook for the first time or looking to refine your technique, the aim is to make crochet feel welcoming, clear, and inspiring."
  },

  // Crochet creations. Each item: { src, alt, caption (optional) }.
  // Add photographs of the owner's own work here. Leave empty to hide the section.
  // Example:
  // { src: "assets/images/gallery/granny-square.webp", alt: "Crocheted granny square blanket in warm cream and gold yarn", caption: "" }
  gallery: {
    heading: "Crochet Creations",
    description: "A glimpse of handmade pieces from the Starlight Yarnovate studio.",
    items: []
  },

  learning: {
    heading: "Your Crochet Journey Starts Here",
    description: "[Replace with owner-approved learning information]",
    fallbackDescription: "Learning with Starlight Yarnovate is guided and step by step. Get in touch to find out how lessons can support your crochet goals, whether you are a complete beginner or an experienced hobbyist."
  },

  about: {
    heading: "Meet the Instructor",
    instructorName: "[Add instructor name after approval]",
    instructorBiography: "[Add verified biography after approval]",
    fallbackBiography: "Starlight Yarnovate is run by a passionate crochet instructor who believes creativity grows when people feel supported. A full introduction is coming soon.",
    image: "",
    imageAlt: ""
  },

  contact: {
    heading: "Ready to Begin?",
    description: "Send a message with your questions or goals, and we will get back to you. Choose whichever way you prefer to reach out."
  },

  // Verified social links only. Shape: { label, url }.
  socialLinks: [],

  seo: {
    title: "Starlight Yarnovate | Online Crochet Learning",
    description: "Discover crochet, explore handmade creations, and connect with Starlight Yarnovate to learn more about online crochet classes."
  }
};
