import cold from './assets/cold.jpg'
import face from './assets/face.jpg'
import happiness from './assets/happiness.jpg'
import japan from './assets/japan.jpg'
import photoshoot from './assets/photoshoot.JPG'

export const PERSON = {
  first: 'Brian',
  last: 'Tran',
  name: 'Brian Tran',
  role: 'Student & Full Stack Developer',
  email: 'briantra23@gmail.com',
  location: 'Ashburn, VA',
  school: 'University of Virginia',
  focus: 'Computer Science',
  now: 'Studying Computer Science at UVA with an applied math minor',
  github: 'https://github.com/brianlogic',
  linkedin: 'https://www.linkedin.com/in/brian-tran-756508244/',
  quote: 'If you want to do extraordinary things, it shouldn\'t be easy',
  about:
    "Hey! I'm a student and full stack developer who likes quiet interfaces with a little personality. I care about type, motion that earns its place, and software that feels considered.",
  photo: face,
  photoCaption: 'Brian Tran',
}

export const TECH = [
  { id: 'python', label: 'Python' },
  { id: 'js', label: 'JavaScript' },
  { id: 'ts', label: 'TypeScript' },
  { id: 'react', label: 'React' },
  { id: 'sql', label: 'SQL' },
  { id: 'html', label: 'HTML/CSS' },
  { id: 'django', label: 'Django' },
  { id: 'next', label: 'Next.js' },
  { id: 'postgres', label: 'PostgreSQL' },
  { id: 'tailwind', label: 'Tailwind' },
  { id: 'ec2', label: 'AWS EC2' },
  { id: 'lambda', label: 'AWS Lambda' },
  { id: 's3', label: 'AWS S3' },
  { id: 'docker', label: 'Docker' },
  { id: 'java', label: 'Java' },
]

export const TIMELINE = [
  {
    title: 'Kashmir World Foundation Intern',
    dates: 'May 2023 - August 2023',
    body: `Frontend developer for Kashmir World Foundation (KWF)`,
  },
  {
    title: 'High School Graduation',
    dates: 'June 2024',
    body: `Graduated from Rock Ridge High School in Ashburn, VA. Some notable things I did there: 
    running my school\'s hackathon, getting 3rd place in regional science and engineering fair, and doing 13 AP classes.`,
  },
  {
    title: 'Starting first year at University of Virginia',
    dates: 'August 2024',
    body: 'Began studying Computer Science at the University of Virginia. ',
  },
  {
    title: 'Software Engineer Intern - NorthPoint Technology LLC',
    dates: 'June 2024 - August 2024',
    body: 'Software Engineer Intern at NorthPoint Technology LLC. Worked on webscraping tools to identify job openings in prime contractors',
  },
  {
    title: 'Granted Security Clearance',
    dates: 'January 2026',
    body: 'Received a Top Secret (TS) Security Clearance from the U.S. government.',
  },
  {
    title: 'Full Stack Developer - NorthPoint Technology LLC',
    dates: 'January 2026',
    body: 'Returned for a second internship at NorthPoint Technology LLC.',
  },
]

export const PROJECTS = [
  {
    title: 'Cursor Dependency Risk Extension',
    month: '',
    period: 'May 2026 - Present',
    blurb: 'A calm dashboard for a fictional logistics studio — charts, filters, and a dark UI.',
    tags: ['React', 'Vite', 'CSS'],
    links: [
      { href: 'https://marketplace.visualstudio.com/items?itemName=BT23.dependency-version-risk', label: 'Live demo' },
    ],
    image: '',
    featured: true,
  },
  {
    title: 'Modeling Naval Systems',
    month: '',
    period: '2024',
    blurb: 'A tiny markdown notebook with keyboard-first navigation and local-first storage.',
    tags: ['TypeScript', 'IndexedDB'],
    links: [
      { href: 'https://github.com/brianlogic/Modeling-Navy-Computing/tree/main', label: 'Code' },
    ],
    image: '',
    featured: true,
  },
  {
    title: 'HoosMap',
    month: '',
    period: '2024',
    blurb: 'Landing page and booking flow for a coastal cafe, built as a class project.',
    tags: ['Next.js', 'Tailwind'],
    links: [
      { href: 'https://github.com/brianlogic/HoosMap', label: 'Code' },
    ],
    image: '',
    featured: true,
  },
  {
    title: 'Crisis Hotline Agent',
    month: '',
    period: '2024',
    blurb: 'Landing page and booking flow for a coastal cafe, built as a class project.',
    tags: ['Next.js', 'Tailwind'],
    links: [
      { href: 'https://github.com/YuDavidCao/hotline-agent', label: 'Code' },
    ],
    image: '',
  },
  {
    title: 'TheCourseForum',
    month: '',
    period: '2024',
    blurb: 'Developed querying system for course reviews and ratings',
    tags: ['Python', 'Django', 'PostgreSQL', 'HTML', 'CSS'],
    links: [
      { href: 'https://thecourseforum.com/browse/', label: 'Live demo' },
    ],
    image: '',
  },
]

export const EXPERIENCE = [
  {
    id: 'northpoint-2026',
    org: 'NorthPoint Technology LLC',
    role: 'Full Stack Developer Intern',
    dates: 'January 2026 – Present',
    summary:
      'Returned for a second internship. Expand this with the systems you own, the problems you solved, and how the work shipped.',
    highlights: [
      'Add a concrete outcome or metric.',
      'Add a second highlight — a feature, a fix, or a decision.',
    ],
    stack: ['Python', 'JavaScript', 'SQL'],
    sections: [
      {
        heading: 'What I worked on',
        body: 'Describe the product surface and the slice you owned. What did a week of work look like?',
      },
      {
        heading: 'How it fit together',
        body: 'Walk through the architecture. The diagram below is a starting point — swap the nodes or replace it with an image.',
      },
    ],
    diagram: {
      caption: 'Replace this with your real pipeline',
      nodes: [
        { id: 'in', label: 'Source data' },
        { id: 'app', label: 'Service' },
        { id: 'store', label: 'Database' },
        { id: 'ui', label: 'Interface' },
      ],
    },
    images: [],
  },
  {
    id: 'northpoint-2024',
    org: 'NorthPoint Technology LLC',
    role: 'Software Engineer Intern',
    dates: 'June 2024 – August 2024',
    summary:
      'Built web scraping tools to find job openings across prime contractors and surface them for the team.',
    highlights: [
      'Collected and normalized listings from contractor career pages.',
      'Turned noisy HTML into structured openings the team could search.',
    ],
    stack: ['Python', 'Web scraping', 'Data cleaning'],
    sections: [
      {
        heading: 'The problem',
        body: 'Prime contractor job pages were scattered and inconsistent. The team needed a single place to see what was open without checking each site by hand.',
      },
      {
        heading: 'The pipeline',
        body: 'Scrapers pulled listings, a cleaner normalized titles and locations, and a simple view made the results usable. Adjust this write-up with the real stack and edge cases you hit.',
      },
    ],
    diagram: {
      caption: 'Job-opening pipeline',
      nodes: [
        { id: 'sites', label: 'Career pages' },
        { id: 'scrape', label: 'Scraper' },
        { id: 'clean', label: 'Normalize' },
        { id: 'view', label: 'Searchable list' },
      ],
    },
    images: [],
  },
  {
    id: 'kwf-2023',
    org: 'Kashmir World Foundation',
    role: 'Frontend Developer Intern',
    dates: 'May 2023 – August 2023',
    summary: 'Frontend work for Kashmir World Foundation. Add the pages, components, and constraints you actually shipped.',
    highlights: [
      'Add what you built on the site.',
      'Add who it was for and what changed.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    sections: [
      {
        heading: 'What I shipped',
        body: 'Name the screens and interactions. If you have a screenshot, drop it in public/experience/ and add it to images below.',
      },
    ],
    diagram: {
      caption: 'Site flow',
      nodes: [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'act', label: 'Get involved' },
      ],
    },
    images: [],
  },
]

export const ABOUT = {
  lead: 'Outside of internships and class, I like building things with a little personality — and I take on more than I probably should.',
  photos: [
    { src: photoshoot, alt: 'Brian in a suit outdoors' },
    { src: japan, alt: 'Brian in Japan' },
    { src: happiness, alt: 'Brian on a summer afternoon' },
    { src: cold, alt: 'Brian in a coat at night' },
  ],
  cards: [
    {
      title: 'Hackathons',
      body: 'Ran my high school hackathon. Add the story: scale, what you organized, what you’d do differently.',
    },
    {
      title: 'Science fair',
      body: '3rd place in the regional science and engineering fair. Drop in the project title and a one-liner on what it was.',
    },
    {
      title: 'Course load',
      body: '13 AP classes in high school. Not a personality, just a fact — replace this with whatever you actually want people to know.',
    },
    {
      title: 'Now',
      body: 'Computer Science at UVA with an applied math minor. Add clubs, teams, or the random stuff filling the calendar.',
    },
  ],
  likes: ['Quiet interfaces', 'Type', 'Motion that earns its place', 'Tools people actually use'],
}
