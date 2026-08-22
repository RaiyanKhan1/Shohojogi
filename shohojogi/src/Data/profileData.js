

const profileData = {
  identity: {
    name: 'Raiyan.',
    title: 'Tutor',
    avatarUrl: 'https://img.magnific.com/premium-photo/young-brazilian-man-isolated-white-background-laughing_1368-362553.jpg?semt=ais_hybrid&w=740&q=80',
    location: 'Uttara, Dhaka',
    status: 'offline',
    verified: true,
  },

  credibility: {
    jobSuccess: 100,
    rating: 4.9,
    reviewCount: 7,
    badge: 'Trending',
    totalJobs: 23,
    totalHours: 42,
  },

  hire: {
    rate: '500tk',
    rateUnit: '/ job',
    consultationPrice: '500tk',
    
    availability: 'Available for new job',
    responseTime: 'Usually responds in a few hours',
  },

  about: {
    bio: "I'm on currently mentoring many students, teaching them from the basics",
      
    
    safetytags: [
      'NID Varified',
      'Police Varification',
      'Education Varified',
      'Location Varified',
    ],
  },

  skills: [
    { name: 'Seedance', level: 'Expert' },
    { name: 'Higgsfield', level: 'Expert' },
    { name: 'CapCut', level: 'Advanced' },
    { name: 'Adobe Premiere Pro', level: 'Advanced' },
    { name: 'Runway', level: 'Intermediate' },
    { name: 'ElevenLabs (voice)', level: 'Advanced' },
  ],

  portfolio: [
    { id: 1, title: 'Skincare Launch — UGC Bundle', category: 'UGC Ad', aspect: '9:16', duration: '0:28' },
    { id: 2, title: 'Sneaker Drop — Cinematic Spot', category: 'Cinematic', aspect: '16:9', duration: '0:45' },
    { id: 3, title: 'App Onboarding Teaser', category: 'Product Demo', aspect: '9:16', duration: '0:32' },
    { id: 4, title: 'Coffee Brand — Founder Story', category: 'Cinematic', aspect: '16:9', duration: '1:10' },
    { id: 5, title: 'Fitness App — Social Cutdown', category: 'Social', aspect: '1:1', duration: '0:15' },
    { id: 6, title: 'Furniture Reveal — AI B-roll', category: 'AI Generated', aspect: '16:9', duration: '0:38' },
  ],

  history: [
    {
      id: 1,
      client: 'DTC Skincare Brand',
      role: 'UGC Ad Creator',
      timeframe: 'Jun – Jul 2026',
      outcome: 'Delivered 12 vertical ad variants for paid social testing.',
      budget: '$450 fixed',
    },
    {
      id: 2,
      client: 'Footwear Startup',
      role: 'Cinematic Product Video',
      timeframe: 'Apr 2026',
      outcome: 'Produced a 45-second launch spot from concept to final grade.',
      budget: '$600 fixed',
    },
    {
      id: 3,
      client: 'SaaS Company',
      role: 'AI Explainer Clips',
      timeframe: 'Feb – Mar 2026',
      outcome: 'Built 8 short-form explainer cutdowns for onboarding.',
      budget: '$30/hr · 14 hrs',
    },
  ],

  reviews: [
    {
      id: 1,
      client: 'Sarah K.',
      role: 'E-commerce Founder',
      rating: 5.0,
      quote: 'Turnaround was fast and the ad felt native to the platform, not like an ad.',
      project: 'UGC Ad Bundle',
    },
    {
      id: 2,
      client: 'Daniel O.',
      role: 'Marketing Lead',
      rating: 5.0,
      quote: 'Cinematic quality without a full production budget — exactly what we needed for launch.',
      project: 'Product Launch Spot',
    },
    {
      id: 3,
      client: 'Priya R.',
      role: 'Growth Manager',
      rating: 4.8,
      quote: 'Communicative, organized, and quick with revisions.',
      project: 'Social Cutdowns',
    },
  ],
};

export default profileData;
