export interface ProjectImageConfig {
  src: string;
  fit?: 'contain' | 'cover';
  bg?: string;
}

export type ProjectImage = string | ProjectImageConfig | null;

export interface ProjectItem {
  slug: string;
  title: string;
  category: 'Products' | 'Open Source';
  summary: string;
  description: string;
  details: string | null;
  tags: string[];
  role: string;
  timeline: string;
  tools: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  codeNote?: string;
  images: ProjectImage[];
}

export interface NavLinkItem {
  label: string;
  target: string;
  count?: 'projects' | 'whatIDo' | 'journey';
}

export interface SocialItem {
  id: 'github' | 'linkedin' | 'email' | 'resume';
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
}

export interface ServiceItem {
  title: string;
  description: string;
  illustration: 'fullstack' | 'ai' | 'mobile' | 'problem-solving';
  image?: string;
}

export interface JourneyItem {
  title: string;
  subtitle: string;
  date: string;
}

export const SITE = {
  name: { first: 'Alex', last: 'Morgan' },
  role: 'Full Stack Developer',
  tagline: "I build products for problems I've actually run into.",
  status: 'Open to work & collaborations',
  photo: { alt: 'Portrait of Alex Morgan' },
  nav: [
    { label: 'Work', target: 'work', count: 'projects' },
    { label: 'What I do', target: 'what-i-do', count: 'whatIDo' },
    { label: 'Journey', target: 'journey', count: 'journey' },
    { label: 'Contact', target: 'contact' },
  ] as NavLinkItem[],
  menu: { label: 'Menu', open: 'Open menu', close: 'Close menu' },
  cta: {
    nav: { label: "Let's talk", target: 'contact' },
    hero: { label: "Let's collaborate", target: 'contact' },
  },
  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/alexmorgan-dev', external: true },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/alexmorgan-dev/', external: true },
    { id: 'email', label: 'Email', href: 'mailto:alex.morgan@example.com' },
    { id: 'resume', label: 'Resume', href: '/resume.pdf', download: true },
  ] as SocialItem[],
  work: {
    label: '/Selected Work',
    watermark: 'Portfolio',
    filters: ['All', 'Products', 'Open Source'] as const,
    initialCount: 4,
    viewAll: 'View All Work',
    showLess: 'Show Less',
    empty: 'No projects in this category yet.',
    more: '/More Work',
  },
  whatIDo: {
    label: '/What I do',
    watermark: 'Skills',
    close: 'Close',
    items: [
      {
        title: 'Full Stack Products',
        description:
          'I take an idea to a deployed app, with a React frontend, a Firebase or Node backend, and the data rules that keep it correct.',
        illustration: 'fullstack',
      },
      {
        title: 'AI Features That Hold Up',
        description:
          'Practical AI like smart recall and semantic search, with fallbacks for when an API goes down.',
        illustration: 'ai',
      },
      {
        title: 'Mobile Apps',
        description: 'Cross-platform apps with React Native; currently building Nylo.',
        illustration: 'mobile',
      },
      {
        title: 'Problem Solving',
        description:
          '400+ problems across LeetCode, Codeforces and CodeChef, so the logic underneath is solid.',
        illustration: 'problem-solving',
      },
    ] as ServiceItem[],
  },
  journey: {
    label: '/Journey',
    watermark: 'Journey',
    aside: 'San Francisco, CA',
    items: [
      { title: 'Nylo', subtitle: 'Co-builder', date: 'Sep 2026 – Present' },
      {
        title: 'Horizon Fest, Pacific Tech',
        subtitle: 'Core Member, Operations Team',
        date: 'Aug 2026 – Present',
      },
      { title: "HackSummit '26", subtitle: 'Finalist', date: 'Apr 2026' },
      { title: 'Amar Mart', subtitle: 'Freelance Full Stack Engineer', date: 'Dec 2025 – Jan 2026' },
      { title: 'PoojaOne', subtitle: 'Co-Founder', date: 'Nov 2025 – Mar 2026' },
      {
        title: 'Open Source Club, Pacific Tech',
        subtitle: 'Member',
        date: 'Aug 2025 – Nov 2025',
      },
      {
        title: 'Pacific Institute of Technology',
        subtitle: 'B.S. Computer Science, GPA 3.9',
        date: '2025 – 2029',
      },
      {
        title: 'National STEM Olympiad',
        subtitle: 'Top 2% Nationwide, 99th Percentile in Math',
        date: '2025',
      },
    ] as JourneyItem[],
  },
  contact: {
    heading: 'Have a project in mind?',
    text: "An internship, a freelance build or an idea worth working on together. If you're building something, I'd like to hear about it.",
    button: 'Contact Me',
    form: {
      title: 'Send me a message',
      name: 'Name',
      email: 'Email',
      topic: "What's it about?",
      topicPlaceholder: 'Choose one',
      topics: ['Internship', 'Freelance project', 'Collaboration', 'Something else'],
      message: 'Message',
      submit: 'Send Message',
      sending: 'Sending…',
      success: "Thanks! Your message is in. I'll get back to you soon.",
      close: 'Close',
      errors: {
        invalid: 'Please fix the highlighted fields.',
        offline: "Couldn't send your message. Check your connection and try again.",
        server: 'Something went wrong while sending. Please try again, or email me directly.',
        'not-configured':
          'The contact form is not connected yet. Please email me at alex.morgan@example.com.',
      },
    },
  },
  project: {
    back: 'Back',
    live: 'Live Preview',
    code: 'View Code',
    role: 'Role',
    timeline: 'Timeline',
    tools: 'Tools',
    about: 'About the project',
  },
  errors: {
    notFound: "That page doesn't exist.",
    home: 'Back to home',
  },
};

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'coderecall',
    title: 'CodeRecall',
    category: 'Products',
    summary: 'For students who lose track of the code they save',
    description:
      'For students who lose track of the code they save. A recall-priority algorithm resurfaces the snippets you need first, and a step-by-step execution visualizer for Java and C++, built from scratch, runs entirely in the browser. Built solo in a 7-day public sprint; switched the AI layer from Gemini to Groq mid-build, with multi-key fallback, after reliability issues.',
    details: null,
    tags: ['React', 'AI'],
    role: 'Solo developer',
    timeline: '7 days (Feb 2026)',
    tools: ['React', 'Firebase', 'Groq'],
    liveUrl: 'https://coderecall-demo.example.com',
    githubUrl: 'https://github.com/alexmorgan-dev/code-recall',
    images: [
      { src: 'coderecall.png', fit: 'contain', bg: '#0A0A0A' },
      { src: '/src/assets/images/coderecall_visualizer_1795460767394.jpg', fit: 'cover' },
    ],
  },
  {
    slug: 'amar-mart',
    title: 'Amar Mart',
    category: 'Products',
    summary: 'A full-stack store for a neighborhood shop going digital',
    description:
      "A neighborhood shop owner in San Jose wanted to go digital, so I built a full-stack store for the shop. It uses atomic transactions and role-based security rules. The code held up; adoption hit a usability barrier I hadn't planned for, and that taught me more than a clean launch would have.",
    details: null,
    tags: ['React', 'Firebase'],
    role: 'Freelance full stack engineer',
    timeline: 'Dec 2025 – Jan 2026',
    tools: ['React', 'Firebase'],
    liveUrl: null,
    githubUrl: null,
    codeNote: 'Private repo',
    images: [
      { src: 'amarmart.png', fit: 'contain', bg: '#FFFFFF' },
    ],
  },
  {
    slug: 'lostify',
    title: 'Lostify',
    category: 'Products',
    summary: 'A proper lost-and-found platform for campus',
    description:
      "Our campus lost-and-found group chat was unusable, so a friend and I built a proper platform for it. An automatic matching algorithm pairs lost reports with found items, so students don't have to scroll through every post.",
    details: null,
    tags: ['Full Stack', 'Matching Algorithm'],
    role: 'Co-developer',
    timeline: 'Oct 2025',
    tools: [],
    liveUrl: null,
    githubUrl: 'https://github.com/alexmorgan-dev/lostify',
    images: [
      { src: 'lostify.png', fit: 'contain', bg: '#192A44' },
    ],
  },
  {
    slug: 'nylo',
    title: 'Nylo',
    category: 'Products',
    summary: 'Send it. Forget it. Find it.',
    description:
      'Send it. Forget it. Find it. Nylo finds your saved Instagram Reels from what you remember about them, instead of endless scrolling. Building it with Jordan Lee; a web app is next.',
    details: null,
    tags: ['React Native', 'Semantic Search'],
    role: 'Co-builder',
    timeline: 'Sep 2026 – Present',
    tools: ['React Native', 'Python'],
    liveUrl: null,
    githubUrl: null,
    codeNote: 'Private repo',
    images: [
      { src: 'nylo.png', fit: 'contain', bg: '#CAF0DB' },
      { src: '/src/assets/images/nylo_semantic_search_1795460766556.jpg', fit: 'cover' },
    ],
  },
  {
    slug: 'campus-assignment-export',
    title: 'Campus++ Assignment Export',
    category: 'Open Source',
    summary: 'My first merged open-source contribution',
    description:
      'My first merged open-source contribution, to a Chrome extension university students use daily. It went through two weeks of review, real bug reports and a concurrency fix before it was merged.',
    details: null,
    tags: ['JavaScript', 'Chrome Extension'],
    role: 'Contributor',
    timeline: 'Jan 2026',
    tools: ['JavaScript', 'Google Chrome'],
    liveUrl: null,
    githubUrl: 'https://github.com/alexmorgan-dev/campus-extension',
    images: [
      { src: '/src/assets/images/scaler_extension_preview_1795460765592.jpg', fit: 'cover' },
    ],
  },
  {
    slug: 'poojaone',
    title: 'PoojaOne',
    category: 'Products',
    summary: 'Book verified specialists who follow your regional rituals',
    description:
      'Helps families who move to major cities book verified specialists who follow their own regional traditions. I co-founded it.',
    details: null,
    tags: ['React', 'TypeScript'],
    role: 'Co-founder',
    timeline: 'Nov 2025 – Mar 2026',
    tools: ['React', 'TypeScript'],
    liveUrl: null,
    githubUrl: 'https://github.com/alexmorgan-dev/poojaone',
    images: [
      { src: '/src/assets/images/poojaone_preview_1795460766636.jpg', fit: 'cover' },
    ],
  },
];
