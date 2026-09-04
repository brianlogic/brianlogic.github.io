import cold from './assets/cold.jpg'
import face from './assets/face.jpg'
import happiness from './assets/happiness.jpg'
import japan from './assets/japan.jpg'
import photoshoot from './assets/photoshoot.JPG'
import screen1 from './assets/screen1.png'
import screen2 from './assets/screen2.png'
import screen3 from './assets/screen3.png'
import screen4 from './assets/screen4.png'
import screen5 from './assets/screen5.png'

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
  about:
    "Hey! I'm a third year Computer Science student at the University of Virginia. I'm primarily a full-stack developer with experience building stateful web applications. I've interned the past 3 years at a subcontractor in a security-sensitive environment. I'm builidng up skills in deployment/DevOps and AI/ML.",
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
    description: 'Cursor/VS Code extension that checks for dependency version risks in JavaScript projects and rolls back the version if a risk is found.',
    did: 'Created extension using Typescript to query OSV.dev API for dependency version risks. Rolled back dependecy version if a risk is found. Utilized Cursor API to safely bump dependency versions in a project.',
    tags: ['TypeScript', 'Cursor API'],
    links: [
      { href: 'https://marketplace.visualstudio.com/items?itemName=BT23.dependency-version-risk', label: 'Live demo' },
    ],
    image: '',
    featured: true,
  },
  {
    title: 'Modeling Naval Systems',
    month: '',
    period: 'Feb 2025 - Jul 2025',
    description: 'Full-stack web application for modeling naval systems and visualizing them in SysML.',
    did: 'Built the Django and Django REST Framework backend, cleaned and normalized data from multiple sources, and visualized it in SysML.',
    tags: ['React', 'Python', 'Django', 'Django REST Framework', 'Docker', 'PostgreSQL', 'SysML'],
    links: [
      { href: 'https://github.com/brianlogic/Modeling-Navy-Computing/tree/main', label: 'Code' },
    ],
    image: '',
    featured: true,
  },
  {
    title: 'HoosMap',
    month: '',
    period: 'March 2025',
    description: 'Landing page and booking flow for a coastal cafe, built as a class project.',
    did: '',
    tags: ['Next.js', 'Tailwind'],
    links: [
      { href: 'https://github.com/brianlogic/HoosMap', label: 'Code' },
    ],
    image: '',
  },
  {
    title: 'Crisis Hotline Agent',
    month: '',
    period: '2024',
    description: 'A crisis-support platform where an AI agent handles incoming calls, provides initial counseling, and generates transcripts for human counselors. Counselors can review calls, notes, and follow-up needs, mark cases as resolved, and view caller histories and snapshots for repeat callers.',
    did: '',
    tags: ['Next.js', 'Tailwind'],
    links: [
      { href: 'https://github.com/YuDavidCao/hotline-agent', label: 'Code' },
    ],
    image: '',
  },
  {
    title: 'TheCourseForum',
    month: '',
    period: 'Sep 2024 - Feb 2026',
    description: 'Course reviews website at the University of Virginia.',
    did: 'Introduced a querying and filtering system. You can see it in action on the browse page.',
    tags: ['Python', 'Django', 'PostgreSQL', 'HTML', 'CSS'],
    links: [
      { href: 'https://thecourseforum.com/browse/', label: 'Live demo' },
    ],
    image: '',
    featured: true,
  },
]

export const EXPERIENCE = [
  {
    id: 'northpoint-2026',
    org: 'NorthPoint Technology LLC',
    role: 'Full Stack Developer Intern',
    dates: 'January 2026 – Present',
    summary:
      'Built an internal forms platform: Entra sign-in, a configurable form catalog, and a review path from draft to accepted. I owned the app, the data layer, Microsoft Graph integrations, and the Docker path onto EC2.',
    highlights: [
      'Form catalog with sections, typed fields, and per-role visibility so submitters, reviewers, and admins do not see the same questions.',
      'Two workflow shapes: complete alone, or submitter → reviewer → admin, with reject-and-comment back to the author.',
      'NextAuth against Entra ID (database sessions, role re-read from Postgres), Prisma, Graph for mail and files, GitHub Actions to GHCR, EC2 runs the image.',
    ],
    stack: [
      'Next.js',
      'NextAuth',
      'Prisma',
      'PostgreSQL',
      'Microsoft Graph',
      'Docker',
      'GitHub Actions',
      'AWS EC2',
    ],
    sections: [
      {
        heading: 'The product',
        body: 'Staff sign in and work from role-specific dashboards. Admins compose forms; people fill them; reviewers and admins move each packet through status until it is accepted or sent back. Completed packets can be exported as PDFs and handed to mail or a document library through Graph.',
      },
      {
        heading: 'How it fit together',
        body: 'Next.js server actions talk to Prisma on PostgreSQL. Identity is Entra via NextAuth; mutations trust the role in the database, not the cookie. Locally the app and Postgres run in Compose. On merge, Actions lints, builds, and publishes a signed image that EC2 pulls.',
      },
    ],
    diagram: {
      caption: 'Stack interactions, the Entra-to-admin review path, and how a merge reaches EC2.',
      layers: [
        {
          id: 'stack',
          kind: 'stackmap',
          kicker: 'Tech stack',
          title: 'How the pieces talk',
          blurb: 'Next.js is the hub. Entra signs people in, Prisma writes Postgres, Graph handles mail and files.',
          nodes: [
            { slot: 'entra', label: 'Entra ID', detail: 'OAuth 2.0 / SSO' },
            { slot: 'graph', label: 'Microsoft Graph', detail: 'Mail + files' },
            { slot: 'browser', label: 'Browser', detail: 'Staff UI' },
            { slot: 'hub', label: 'Next.js', detail: 'App Router + server actions' },
            { slot: 'orm', label: 'Prisma', detail: 'ORM' },
            { slot: 'db', label: 'PostgreSQL', detail: 'On-site database' },
          ],
          links: [
            { from: 'browser', to: 'hub', label: 'HTTPS' },
            { from: 'hub', to: 'entra', label: 'OIDC' },
            { from: 'hub', to: 'graph', label: 'Graph' },
            { from: 'hub', to: 'orm', label: 'Prisma' },
            { from: 'orm', to: 'db', label: 'SQL' },
          ],
        },
        {
          id: 'workflow',
          kind: 'flowchart',
          kicker: 'Workflow',
          title: 'User, reviewer, admin',
          blurb: 'Both reviewer and admin can leave notes. Reject sends the packet back to the author.',
          chart: {
            start: [
              { label: 'Sign in', detail: 'Microsoft Entra ID' },
              { label: 'Fill out form', detail: 'Enter data' },
              { label: 'Reviewer', detail: 'Checks work and leaves notes' },
            ],
            reviewerGate: 'Accept?',
            afterReviewer: [{ label: 'Admin', detail: 'Reviews again and leaves notes' }],
            adminGate: 'Accept?',
            back: 'Returned',
            done: 'Accepted',
          },
        },
        {
          id: 'ship',
          kind: 'strip',
          kicker: 'CI/CD',
          title: 'Build and deploy',
          blurb: 'PRs lint. Main builds a signed image. EC2 pulls it and runs Docker — it does not build from source.',
          nodes: [
            { id: 'compose', label: 'Docker Compose', detail: 'Local app + Postgres', lane: 'local' },
            { id: 'gha', label: 'GitHub Actions', detail: 'Lint on PR, image on main', lane: 'ship' },
            { id: 'ghcr', label: 'GHCR', detail: 'Signed container', lane: 'ship' },
            { id: 'ec2', label: 'AWS EC2', detail: 'Pulls image, runs Docker', lane: 'ship' },
          ],
        },
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
    images: [
      {
        src: screen2,
        alt: 'Create a new camera station form',
        caption: 'Create a camera station',
      },
      {
        src: screen1,
        alt: 'Camera station update form with field data',
        caption: 'Update station status',
      },
      {
        src: screen4,
        alt: 'Snow leopard study with sightings list',
        caption: 'Study and sightings',
      },
      {
        src: screen3,
        alt: 'Wildlife sighting form for a snow leopard',
        caption: 'Log a wildlife sighting',
      },
      {
        src: screen5,
        alt: 'Rebait form for updating a camera station in the field',
        caption: 'Rebait a station',
      },
    ],
  },
]

export const ABOUT = {
  body: 'Thanks for checking out my portfolio! Outside of internships, classes, and projects, I like to watch basketball, play games, and be active. I lift weights and enjoy most sports. Don\'t hesitate to reach out!',
  photos: [
    { src: photoshoot, alt: 'Brian in a suit outdoors' },
    { src: japan, alt: 'Brian in Japan' },
    { src: happiness, alt: 'Brian on a summer afternoon' },
    { src: cold, alt: 'Brian in a coat at night' },
  ],
  links: [
    { label: 'Email', href: `mailto:${PERSON.email}`, display: PERSON.email },
    { label: 'GitHub', href: PERSON.github, display: PERSON.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') },
    { label: 'LinkedIn', href: PERSON.linkedin, display: PERSON.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') },
  ],
}
