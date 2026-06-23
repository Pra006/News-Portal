export const authors = [
  {
    id: "1",
    name: "Sarah Mitchell",
    avatar: "https://i.pravatar.cc/40?img=1",
    role: "Senior Editor",
  },
  {
    id: "2",
    name: "James Rodriguez",
    avatar: "https://i.pravatar.cc/40?img=3",
    role: "Tech Reporter",
  },
  {
    id: "3",
    name: "Amelia Chen",
    avatar: "https://i.pravatar.cc/40?img=5",
    role: "World Correspondent",
  },
  {
    id: "4",
    name: "David Park",
    avatar: "https://i.pravatar.cc/40?img=7",
    role: "Sports Analyst",
  },
  {
    id: "5",
    name: "Priya Sharma",
    avatar: "https://i.pravatar.cc/40?img=9",
    role: "Political Reporter",
  },
  {
    id: "6",
    name: "Marcus Johnson",
    avatar: "https://i.pravatar.cc/40?img=11",
    role: "Business Editor",
  },
];

export const ARTICLE_CONTENT = `The implications of this development reverberate far beyond the immediate context, touching on fundamental questions about our future and the systems that govern our world.

Experts from across the field have weighed in on what this means for the months and years ahead. This is not just an incremental change. It represents a paradigm shift in how we think about this entire domain, said Dr. Elena Vasquez, a leading researcher at the Global Policy Institute.

For years, analysts had been watching for signs that such a milestone was approaching. The confluence of technological advancement, political will, and economic necessity has created a unique moment that few predicted would arrive so swiftly.

The groundwork was laid through years of painstaking collaboration between governments, research institutions, and private sector leaders who recognized that the status quo was no longer sustainable.

Implementation will be phased, with early milestones expected within six months. Monitoring committees will be established across all major participating regions, ensuring accountability and transparency throughout the process.

Critics have raised legitimate concerns about execution, particularly around equitable distribution of benefits and the risk of unintended consequences. These voices are being incorporated into the planning process, according to officials.

The response from the international community has been largely positive, though not without reservations. Markets responded with cautious optimism, while civil society organizations called for stronger enforcement mechanisms.

We welcome this progress, said UN Secretary-General Maria Santos. But we must ensure that ambition is matched by action, and that the most vulnerable populations are protected throughout this transition.

The coming months will be critical in determining whether this announcement translates into meaningful, lasting change, or becomes another entry in a long list of pledges that fell short of their promise.`;

export const heroArticles = [
  {
    id: "h1",
    title:
      "Global Leaders Reach Historic Climate Agreement at Emergency Summit",
    excerpt:
      "World leaders from 140 nations signed a landmark treaty pledging to cut carbon emissions by 60% by 2035, calling it the most significant step in combating climate change.",
    content: ARTICLE_CONTENT,
    image: "/images/hero2.jpg",
    category: "World",
    author: authors[2],
    publishedAt: "May 13, 2026",
    readTime: 5,
    isBreaking: true,
    isFeatured: true,
    tags: ["Climate", "Summit", "Environment"],
  },
  {
    id: "h2",
    title:
      "AI Revolution: New Model Surpasses Human Reasoning in Complex Tasks",
    excerpt:
      "Scientists at a leading research lab unveiled a breakthrough AI system that outperforms humans across a wide range of cognitive benchmarks, sparking debate on the future of work.",
    content: ARTICLE_CONTENT,
    image: "/images/hero3.jpg",
    category: "Tech",
    author: authors[1],
    publishedAt: "May 13, 2026",
    readTime: 4,
    isBreaking: true,
    isFeatured: true,
    tags: ["AI", "Technology", "Future"],
  },
  {
    id: "h3",
    title:
      "Megacity Infrastructure Bill Passes, Promising $2 Trillion in Urban Renewal",
    excerpt:
      "The sweeping infrastructure legislation will fund high-speed rail, smart city tech, and affordable housing across 50 major metropolitan areas over the next decade.",
    content: ARTICLE_CONTENT,
    image: "/images/hero1.jpg",
    category: "Politics",
    author: authors[4],
    publishedAt: "May 12, 2026",
    readTime: 6,
    isBreaking: true,
    isFeatured: true,
    tags: ["Infrastructure", "Politics", "Economy"],
  },
];

export const newsArticles = [
  {
    id: "1",
    title: "Electric Vehicle Sales Surge 340% as Battery Costs Plummet",
    excerpt:
      "New manufacturing breakthroughs have dramatically reduced battery production costs, making EVs price-competitive with traditional combustion engine vehicles for the first time.",
    content: ARTICLE_CONTENT,
    image: "/images/news3.jpg",
    category: "Tech",
    author: authors[1],
    publishedAt: "May 13, 2026",
    readTime: 3,
    isPopular: true,
    tags: ["EV", "Technology", "Green Energy"],
  },
  {
    id: "2",
    title:
      "Champions League Final Ends in Historic 5-5 Draw, Decided by Penalties",
    excerpt:
      "In one of the most dramatic finals in European football history, two titans clashed through extra time before a nail-biting penalty shootout decided the champion.",
    content: ARTICLE_CONTENT,
    image: "/images/news4.jpg",
    category: "Sports",
    author: authors[3],
    publishedAt: "May 13, 2026",
    readTime: 4,
    isPopular: true,
    tags: ["Football", "Champions League", "Sports"],
  },
  {
    id: "3",
    title:
      "Global Markets Rally as Inflation Data Shows Fastest Cooling in a Decade",
    excerpt:
      "Stock markets worldwide surged after the release of new inflation figures pointing to a rapid easing of price pressures, fueling hopes for central bank rate cuts.",
    content: ARTICLE_CONTENT,
    image: "/images/news1.jpg",
    category: "Business",
    author: authors[5],
    publishedAt: "May 13, 2026",
    readTime: 3,
    tags: ["Markets", "Economy", "Finance"],
  },
  {
    id: "4",
    title:
      "Scientists Confirm First Successful Mars Habitat Test for Human Habitation",
    excerpt:
      "A team of six researchers emerged from a year-long simulated Mars habitat proving that long-duration missions are physiologically and psychologically viable.",
    content: ARTICLE_CONTENT,
    image: "/images/news2.jpg",
    category: "Science",
    author: authors[2],
    publishedAt: "May 12, 2026",
    readTime: 5,
    isFeatured: true,
    tags: ["Mars", "Space", "Science"],
  },
  {
    id: "5",
    title: "Supreme Court Rules on Landmark Digital Privacy Case",
    excerpt:
      "The court unanimous decision establishes new constitutional protections for citizens digital data, requiring warrants for government access to cloud-stored information.",
    content: ARTICLE_CONTENT,
    image: "/images/news6.jpg",
    category: "Politics",
    author: authors[4],
    publishedAt: "May 12, 2026",
    readTime: 4,
    tags: ["Privacy", "Law", "Technology"],
  },
  {
    id: "6",
    title:
      "Renewable Energy Now Covers 70% of Global Electricity Demand",
    excerpt:
      "A milestone report from the International Energy Agency confirms that solar, wind, and hydro power now collectively supply the majority of the world electricity needs.",
    content: ARTICLE_CONTENT,
    image: "/images/news5.jpg",
    category: "Science",
    author: authors[0],
    publishedAt: "May 12, 2026",
    readTime: 3,
    isPopular: true,
    tags: ["Energy", "Climate", "Environment"],
  },
  {
    id: "7",
    title:
      "Tech Giants Face New Antitrust Regulations Across the EU and US",
    excerpt:
      "Coordinated regulatory actions on both sides of the Atlantic are set to reshape how the world largest technology companies operate their platforms and data businesses.",
    content: ARTICLE_CONTENT,
    image: "/images/news1.jpg",
    category: "Tech",
    author: authors[1],
    publishedAt: "May 11, 2026",
    readTime: 5,
    tags: ["Regulation", "Big Tech", "Antitrust"],
  },
  {
    id: "8",
    title:
      "World Health Org Declares New Pandemic Preparedness Framework Adopted",
    excerpt:
      "After years of negotiations following the COVID-19 pandemic, 194 member nations signed a binding agreement to coordinate future pandemic responses more effectively.",
    content: ARTICLE_CONTENT,
    image: "/images/news5.jpg",
    category: "Health",
    author: authors[2],
    publishedAt: "May 11, 2026",
    readTime: 4,
    tags: ["Health", "WHO", "Pandemic"],
  },
  {
    id: "9",
    title:
      "Olympic Committee Confirms 2032 Games Will Feature New Digital Sport Events",
    excerpt:
      "Esports and virtual reality competitions will make their Olympic debut in Brisbane 2032, following a unanimous vote by the International Olympic Committee.",
    content: ARTICLE_CONTENT,
    image: "/images/news4.jpg",
    category: "Sports",
    author: authors[3],
    publishedAt: "May 11, 2026",
    readTime: 3,
    tags: ["Olympics", "Esports", "Gaming"],
  },
  {
    id: "10",
    title:
      "Central Banks Signal Era of Low Interest Rates Is Returning",
    excerpt:
      "Federal Reserve and ECB chairs hinted at coordinated rate reductions beginning in Q3 2026, marking what analysts call the great monetary pivot of the decade.",
    content: ARTICLE_CONTENT,
    image: "/images/news1.jpg",
    category: "Business",
    author: authors[5],
    publishedAt: "May 10, 2026",
    readTime: 4,
    tags: ["Finance", "Economy", "Interest Rates"],
  },
  {
    id: "11",
    title:
      "Cultural Renaissance: Street Art Movement Transforms Urban Landscapes Worldwide",
    excerpt:
      "From Sao Paulo to Seoul, a new generation of muralists is turning city walls into open-air galleries, sparking conversations on identity, justice, and beauty.",
    content: ARTICLE_CONTENT,
    image: "/images/news5.jpg",
    category: "Culture",
    author: authors[0],
    publishedAt: "May 10, 2026",
    readTime: 3,
    tags: ["Art", "Culture", "Cities"],
  },
  {
    id: "12",
    title:
      "Quantum Computing Startup Achieves Breakthrough in Drug Discovery",
    excerpt:
      "Using a 1,000-qubit processor, researchers modeled complex protein interactions, dramatically accelerating the identification of potential treatments for rare diseases.",
    content: ARTICLE_CONTENT,
    image: "/images/news2.jpg",
    category: "Tech",
    author: authors[1],
    publishedAt: "May 10, 2026",
    readTime: 5,
    isFeatured: true,
    tags: ["Quantum", "Medicine", "Tech"],
  },
];

export const trendingArticles = newsArticles.slice(0, 5);

export const categories = [
  "World",
  "Politics",
  "Tech",
  "Sports",
  "Business",
  "Science",
  "Health",
  "Culture",
];

export const categoryColors = {
  World:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Politics:
    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  Tech:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Sports:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Business:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  Science:
    "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  Health:
    "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  Culture:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
};