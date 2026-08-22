

const profileData = {
  identity: {
    name: 'Shakib',
    title: 'Delivery parcel, grocery shopping',
    avatarUrl: 'https://img.magnific.com/premium-photo/young-brazilian-man-isolated-white-background-laughing_1368-362553.jpg?semt=ais_hybrid&w=740&q=80',
    location: 'Uttara, Dhaka',
    status: 'online',
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
    bio: "Hey, I have been doing grocery shopping for long time (certified by my mom). You can trust me that I will pick the best and fresh items from the shop for you! ",
      
    
    safetytags: [
      'NID Varified',
      'Police Varification',
      'Education Varified',
      'Location Varified',
    ],
  },

  skills: [
    { name: 'Communiaction', level: 'Expert' },
    { name: 'English Speaking', level: 'Expert' },
    { name: 'Time management', level: 'Intermediate' },
   
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
      client: 'Raiyan',
      role: 'Grocery shopping',
      timeframe: 'Jul 2026',
      rating: '5 star',
      feedback: 'loved his work',
      budget: '500tk',
    },
    {
      id: 2,
      client: 'Sumaiya Joya',
      role: 'Delivering a percel',
      timeframe: 'Apr 2026',
      rating: '5 star',
      feedback: 'loved his work',
      budget: '1000tk',
    },
    {
      id: 3,
      client: 'Delivering a letter',
      role: 'Ahanf',
      timeframe: 'Feb 2026',
      rating: '5 star',
      feedback: 'loved his work',
      budget: '900tk',
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
