export const platformStats = [
  { label: 'Active Learners & Mentors', value: '14,200+' },
  { label: 'Skills Exchanged', value: '450+' },
  { label: 'Successful Matches', value: '28,500+' },
  { label: 'Satisfaction Rate', value: '98.6%' },
];

export const skillCategories = [
  {
    id: 'programming',
    name: 'Programming',
    icon: 'Code2',
    description: 'Master backend, algorithms, and system design in Java, Python, Go, and C++.',
    skillsCount: 64,
    usersCount: 3820,
    popular: ['Java', 'Python', 'C++', 'Go', 'Data Structures']
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    icon: 'Layout',
    description: 'Frontend frameworks, responsive interfaces, state management, and modern toolchains.',
    skillsCount: 82,
    usersCount: 4500,
    popular: ['React', 'Next.js', 'Tailwind CSS', 'Vue', 'TypeScript']
  },
  {
    id: 'data-science',
    name: 'Data Science',
    icon: 'BrainCircuit',
    description: 'Machine learning, predictive models, data analysis, and computer vision.',
    skillsCount: 48,
    usersCount: 2900,
    popular: ['Machine Learning', 'Pandas', 'SQL', 'TensorFlow', 'PowerBI']
  },
  {
    id: 'design',
    name: 'Design & UI/UX',
    icon: 'Palette',
    description: 'User experience research, wireframing, component design systems, and Figma craft.',
    skillsCount: 52,
    usersCount: 3100,
    popular: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping']
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: 'Languages',
    description: 'Native conversational fluency, pronunciation drills, grammar, and cultural idioms.',
    skillsCount: 36,
    usersCount: 2200,
    popular: ['Spanish', 'Japanese', 'French', 'German', 'Mandarin']
  },
  {
    id: 'music',
    name: 'Music & Audio',
    icon: 'Music',
    description: 'Acoustic and electric instruments, composition, MIDI arrangement, and mixing.',
    skillsCount: 29,
    usersCount: 1400,
    popular: ['Acoustic Guitar', 'Piano', 'Music Theory', 'Ableton Live']
  },
  {
    id: 'business',
    name: 'Business & Leadership',
    icon: 'Briefcase',
    description: 'Product management, strategic marketing, seed pitching, and leadership growth.',
    skillsCount: 41,
    usersCount: 2750,
    popular: ['Product Strategy', 'SEO', 'Public Speaking', 'Growth Marketing']
  },
  {
    id: 'photography',
    name: 'Photography & Video',
    icon: 'Camera',
    description: 'Manual camera exposure, composition, studio lighting, and color grading.',
    skillsCount: 24,
    usersCount: 1600,
    popular: ['Lightroom', 'Portrait Photography', 'Video Editing', 'Premiere Pro']
  }
];

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Create your profile',
    description: 'Set up your bio, avatar, learning availability, and goals in less than two minutes.'
  },
  {
    step: '02',
    title: 'Add skills you can teach',
    description: 'List your strengths, whether you are an expert engineer, bilingual speaker, or designer.'
  },
  {
    step: '03',
    title: 'Add skills you want to learn',
    description: 'Pick the technologies and crafts you want to level up with 1-on-1 peer guidance.'
  },
  {
    step: '04',
    title: 'Discover compatible people',
    description: 'Our smart matching engine pairs you with peers who hold complementary skills.'
  },
  {
    step: '05',
    title: 'Send a skill-swap request',
    description: 'Introduce yourself, propose mutual session times, and outline what you can exchange.'
  },
  {
    step: '06',
    title: 'Learn, teach & grow together',
    description: 'Host focused video sessions, share code reviews or feedback, and rate each other.'
  }
];

export const mockUsers = [
  {
    id: 'u-1',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    title: 'Full Stack Engineer at FinTech Corp',
    location: 'San Francisco, CA',
    bio: 'Senior Java & Spring Boot engineer eager to master React 19 and modern frontend component architecture in return.',
    rating: 4.95,
    reviewsCount: 38,
    availability: 'Evenings & Weekends (PST)',
    skillsTeach: [
      { name: 'Java', level: 'Advanced', category: 'Programming' },
      { name: 'Spring Boot', level: 'Advanced', category: 'Programming' },
      { name: 'Microservices', level: 'Intermediate', category: 'Programming' }
    ],
    skillsLearn: [
      { name: 'React', level: 'Beginner', category: 'Web Development' },
      { name: 'Tailwind CSS', level: 'Beginner', category: 'Web Development' }
    ],
    compatibility: 94
  },
  {
    id: 'u-2',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    title: 'Product Designer & UX Researcher',
    location: 'Berlin, Germany',
    bio: 'Lead product designer with 6+ years creating scalable design systems in Figma. Seeking to understand backend REST APIs and SQL fundamentals.',
    rating: 4.98,
    reviewsCount: 44,
    availability: 'Weekday Mornings (CET)',
    skillsTeach: [
      { name: 'Figma', level: 'Advanced', category: 'Design' },
      { name: 'UI/UX Design', level: 'Advanced', category: 'Design' },
      { name: 'Design Systems', level: 'Advanced', category: 'Design' }
    ],
    skillsLearn: [
      { name: 'SQL', level: 'Beginner', category: 'Data Science' },
      { name: 'REST APIs', level: 'Intermediate', category: 'Programming' }
    ],
    compatibility: 91
  },
  {
    id: 'u-3',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    title: 'Cloud Architect & DevOps Consultant',
    location: 'Austin, TX',
    bio: 'AWS Certified Solutions Architect. Happy to exchange deep AWS & Docker deployments for conversational Spanish or Python data manipulation.',
    rating: 4.88,
    reviewsCount: 27,
    availability: 'Flexible weekends (CST)',
    skillsTeach: [
      { name: 'AWS', level: 'Advanced', category: 'Cloud' },
      { name: 'Docker', level: 'Advanced', category: 'DevOps' },
      { name: 'CI/CD Pipelines', level: 'Intermediate', category: 'DevOps' }
    ],
    skillsLearn: [
      { name: 'Spanish', level: 'Beginner', category: 'Languages' },
      { name: 'Python', level: 'Beginner', category: 'Programming' }
    ],
    compatibility: 87
  },
  {
    id: 'u-4',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    title: 'Data Scientist & ML Researcher',
    location: 'Seattle, WA',
    bio: 'Building statistical models and deep learning pipelines. Want to learn guitar chord transitions and sound recording basics.',
    rating: 4.92,
    reviewsCount: 31,
    availability: 'Tuesday & Thursday evenings',
    skillsTeach: [
      { name: 'Machine Learning', level: 'Advanced', category: 'Data Science' },
      { name: 'Python', level: 'Advanced', category: 'Programming' },
      { name: 'Pandas', level: 'Advanced', category: 'Data Science' }
    ],
    skillsLearn: [
      { name: 'Acoustic Guitar', level: 'Beginner', category: 'Music' },
      { name: 'Music Theory', level: 'Beginner', category: 'Music' }
    ],
    compatibility: 89
  },
  {
    id: 'u-5',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    title: 'Frontend Lead & React Specialist',
    location: 'Toronto, Canada',
    bio: 'React and TypeScript wizard. Looking for a patient peer to teach me Java architecture patterns and MySQL database indexing.',
    rating: 4.96,
    reviewsCount: 52,
    availability: 'Mon-Wed afternoons (EST)',
    skillsTeach: [
      { name: 'React', level: 'Advanced', category: 'Web Development' },
      { name: 'TypeScript', level: 'Advanced', category: 'Web Development' },
      { name: 'Tailwind CSS', level: 'Advanced', category: 'Web Development' }
    ],
    skillsLearn: [
      { name: 'Java', level: 'Beginner', category: 'Programming' },
      { name: 'Spring Boot', level: 'Beginner', category: 'Programming' }
    ],
    compatibility: 96
  },
  {
    id: 'u-6',
    name: 'Sofia Alvarez',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    title: 'Bilingual Translator & Content Creator',
    location: 'Madrid, Spain',
    bio: 'Native Spanish and fluent English speaker. Passionate about helping developers practice technical Spanish in exchange for web development tutoring.',
    rating: 4.99,
    reviewsCount: 60,
    availability: 'Weekday Evenings (CET)',
    skillsTeach: [
      { name: 'Spanish', level: 'Native', category: 'Languages' },
      { name: 'Public Speaking', level: 'Advanced', category: 'Business' }
    ],
    skillsLearn: [
      { name: 'Web Development', level: 'Beginner', category: 'Web Development' },
      { name: 'Figma', level: 'Beginner', category: 'Design' }
    ],
    compatibility: 85
  }
];

export const mockMatches = [
  {
    id: 'm-1',
    user: mockUsers[4], // David Kim
    matchScore: 96,
    theyTeach: 'React & Tailwind CSS',
    youWant: 'React',
    youTeach: 'Java & Spring Boot',
    theyWant: 'Java',
    locationMatch: 'High (Same timezone overlap)',
    levelMatch: 'Balanced (Both senior engineers switching focus)',
    status: 'Suggested',
    notes: 'Perfect reciprocal match: David is a seasoned React engineer looking to learn Java.'
  },
  {
    id: 'm-2',
    user: mockUsers[1], // Elena Rostova
    matchScore: 91,
    theyTeach: 'Figma & UI/UX Design',
    youWant: 'UI/UX Design',
    youTeach: 'REST APIs & Architecture',
    theyWant: 'REST APIs',
    locationMatch: 'Good (CET/US early slot)',
    levelMatch: 'High compatibility',
    status: 'Suggested',
    notes: 'Elena will review your UI mockups while you guide her through backend endpoint design.'
  },
  {
    id: 'm-3',
    user: mockUsers[2], // Marcus Vance
    matchScore: 87,
    theyTeach: 'AWS & Cloud Deployment',
    youWant: 'AWS',
    youTeach: 'Backend Microservices',
    theyWant: 'Microservices',
    locationMatch: 'Excellent (US Central)',
    levelMatch: 'Peer Level',
    status: 'Pending',
    notes: 'Swap request sent yesterday for 1 hr weekend sessions.'
  }
];

export const mockTestimonials = [
  {
    id: 't-1',
    quote: 'SkillSwap solved my biggest challenge: I was a seasoned backend developer struggling with modern React hooks. Within 3 weeks of swapping with David, I shipped my first full-stack dashboard.',
    author: 'Michael R.',
    role: 'Senior Backend Engineer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    skillExchanged: 'Java exchanged for React'
  },
  {
    id: 't-2',
    quote: 'Instead of watching 40 hours of passive video courses, I learned Figma hands-on from a product designer in Berlin while helping her master SQL queries.',
    author: 'Sarah Jenkins',
    role: 'Data Analyst',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    skillExchanged: 'SQL exchanged for Figma'
  },
  {
    id: 't-3',
    quote: 'The reciprocal nature makes both sides accountable. When you teach someone a skill, you solidify your own understanding while gaining genuine mentorship.',
    author: 'Carlos Gomez',
    role: 'DevOps Specialist',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    skillExchanged: 'Docker exchanged for Spanish'
  }
];

export const mockDashboardData = {
  profileCompletion: 85,
  skillsTeach: [
    { name: 'Java', level: 'Advanced', endorsements: 14 },
    { name: 'Spring Boot', level: 'Advanced', endorsements: 12 },
    { name: 'REST APIs', level: 'Intermediate', endorsements: 9 }
  ],
  skillsLearn: [
    { name: 'React', targetLevel: 'Proficient', progress: 65 },
    { name: 'Tailwind CSS', targetLevel: 'Intermediate', progress: 50 },
    { name: 'Figma', targetLevel: 'Beginner', progress: 20 }
  ],
  pendingRequests: [
    {
      id: 'req-1',
      fromUser: mockUsers[1], // Elena
      proposedSkill: 'Figma ↔ REST APIs',
      message: 'Hi! Loved your profile. Would love to trade Figma design systems for backend architecture pointers!',
      date: '2 hours ago'
    }
  ],
  upcomingSessions: [
    {
      id: 'sess-1',
      peer: mockUsers[4], // David Kim
      topic: 'React 19 State & Custom Hooks deep dive',
      time: 'Tomorrow at 6:30 PM',
      duration: '60 mins',
      platform: 'Google Meet'
    },
    {
      id: 'sess-2',
      peer: mockUsers[2], // Marcus Vance
      topic: 'AWS IAM & ECS Deployment Strategy',
      time: 'Saturday at 11:00 AM',
      duration: '45 mins',
      platform: 'Zoom'
    }
  ],
  recentActivity: [
    { id: 'act-1', text: 'You completed a 60-minute session with David Kim', time: 'Yesterday' },
    { id: 'act-2', text: 'Elena Rostova sent you a Skill-Swap proposal', time: '2 hours ago' },
    { id: 'act-3', text: 'You added "Tailwind CSS" to your learning wishlist', time: '3 days ago' },
    { id: 'act-4', text: 'Alex Chen left you a 5-star review for Java mentoring', time: '5 days ago' }
  ]
};
