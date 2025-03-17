
import { BlogPost, Category, Author } from './types';

// Mock authors data
const authors: Author[] = [
  {
    id: '1',
    name: 'James Wilson',
    avatar: '/avatar-1.jpg'
  },
  {
    id: '2',
    name: 'Sarah Parker',
    avatar: '/avatar-2.jpg'
  },
  {
    id: '3',
    name: 'Michael Thompson',
    avatar: '/avatar-3.jpg'
  }
];

// Mock blog data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Pep Guardiola Extends Contract Until 2025',
    slug: 'pep-guardiola-extends-contract',
    excerpt: 'Manchester City manager Pep Guardiola has signed a two-year contract extension that will keep him at the club until 2025.',
    content: `
      <p>Manchester City is delighted to announce that Pep Guardiola has signed a new two-year contract.</p>
      
      <p>The contract, which now runs until the summer of 2025, marks the continuation of a partnership that has delivered four Premier League titles, one FA Cup, four Carabao Cups, two Community Shields, and the Club's first Champions League trophy.</p>
      
      <p>Guardiola joined City in 2016 and has overseen the most successful period in the club's history, winning 11 major trophies during his six years in Manchester.</p>
      
      <p>The 51-year-old has taken charge of 374 games at the Club, winning 271 of them and scoring 921 goals - all three stats being the highest of any Premier League manager during their time with City.</p>
      
      <p>Across all competitions, he has a stunning win percentage of 72.4%.</p>
      
      <p>His 181 Premier League wins over the past six seasons is 14 more than any other manager during that same period.</p>
      
      <p>Everyone at Manchester City is delighted that Pep's journey with the Club will continue and we look forward to what can be achieved together.</p>
    `,
    category: 'Latest News',
    tags: ['pep guardiola', 'contract', 'manager'],
    featuredImage: 'https://placehold.co/600x400/6CADDF/1C2C5B?text=Pep+Guardiola+Contract',
    author: authors[0],
    publishedDate: '2022-11-23T09:00:00.000Z',
    status: 'published',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Manchester City 4-1 Arsenal: Champions Showcase Title Credentials',
    slug: 'manchester-city-4-1-arsenal',
    excerpt: 'Manchester City produced a dominant display to defeat title rivals Arsenal 4-1 at the Etihad Stadium.',
    content: `
      <p>Manchester City laid down a marker in the Premier League title race with a commanding 4-1 victory over Arsenal at the Etihad Stadium.</p>
      
      <p>Kevin De Bruyne opened the scoring after just 5 minutes, finishing clinically after a sublime through ball from Erling Haaland.</p>
      
      <p>John Stones doubled City's advantage on the stroke of half-time, heading home from a Riyad Mahrez corner.</p>
      
      <p>Arsenal pulled one back through Rob Holding, but City's dominance continued as Haaland added a third with a powerful strike from the edge of the box.</p>
      
      <p>Phil Foden completed the scoring with a spectacular long-range effort that left Aaron Ramsdale with no chance.</p>
      
      <p>The result moves City just two points behind Arsenal with a game in hand, putting Pep Guardiola's side in prime position to retain their Premier League crown.</p>
    `,
    category: 'Match Reports',
    tags: ['arsenal', 'premier league', 'match report'],
    featuredImage: 'https://placehold.co/600x400/6CADDF/1C2C5B?text=City+4-1+Arsenal',
    author: authors[1],
    publishedDate: '2023-04-26T21:45:00.000Z',
    status: 'published',
    isFeatured: false
  },
  {
    id: '3',
    title: 'Transfer Rumor: City Target Bundesliga Midfielder',
    slug: 'city-target-bundesliga-midfielder',
    excerpt: 'Manchester City are reportedly monitoring the situation of a highly-rated Bundesliga midfielder ahead of a potential summer move.',
    content: `
      <p>Manchester City are keeping close tabs on a rising Bundesliga star as Pep Guardiola looks to strengthen his midfield options this summer.</p>
      
      <p>According to reports in Germany, City scouts have been regular attendees at matches featuring the 23-year-old, who has been impressing with his performances in the German top flight.</p>
      
      <p>The midfielder, known for his exceptional passing range and ability to control the tempo of games, is seen as a potential long-term successor to Rodri in City's engine room.</p>
      
      <p>With two years remaining on his current contract, his club may consider offers in the region of £45 million for their prized asset.</p>
      
      <p>City face competition from several European giants, with Real Madrid and Bayern Munich also monitoring the situation.</p>
      
      <p>The player himself is believed to favor a move to the Premier League, giving City an advantage in negotiations.</p>
    `,
    category: 'Transfer News',
    tags: ['transfers', 'rumor', 'bundesliga'],
    featuredImage: 'https://placehold.co/600x400/6CADDF/1C2C5B?text=Transfer+Rumor',
    author: authors[2],
    publishedDate: '2023-05-15T14:30:00.000Z',
    status: 'published',
    isFeatured: false
  },
  {
    id: '4',
    title: 'Tactical Analysis: How City Dominated the Madrid Midfield',
    slug: 'tactical-analysis-city-madrid-midfield',
    excerpt: "A deep dive into how Manchester City's midfield masterclass was key to their victory over Real Madrid in the Champions League.",
    content: `
      <p>Manchester City's emphatic victory over Real Madrid in the Champions League semi-final showcased Pep Guardiola's tactical genius and the team's ability to execute his vision to perfection.</p>
      
      <p>Central to City's dominance was their control of the midfield battle. Rodri, operating as the deepest of City's midfielders, was instrumental in dictating the tempo of the game. The Spanish international completed an impressive 94% of his passes and made 7 ball recoveries.</p>
      
      <p>Alongside him, Kevin De Bruyne and Bernardo Silva formed a fluid midfield trio that consistently bypassed Madrid's press. De Bruyne's positioning was particularly noteworthy, as he frequently dropped deep to create overloads before making late runs into attacking areas.</p>
      
      <p>City's approach to pressing was equally impressive. Rather than pressing aggressively from the front, they adopted a more patient approach, cutting off passing lanes and forcing Madrid into uncomfortable areas. This strategy effectively nullified the threat of Luka Modric and Toni Kroos, who struggled to find their rhythm.</p>
      
      <p>The heat map below illustrates City's territorial dominance, with significant concentration in the middle third of the pitch.</p>
      
      <p>Another key aspect was the positioning of City's full-backs. When in possession, they would often invert into midfield positions, creating numerical superiority and providing additional passing options. This tactical wrinkle confused Madrid's defensive structure and created space for City's wingers to exploit in one-on-one situations.</p>
      
      <p>Guardiola's constant tweaking of his system throughout the match also prevented Madrid from adapting, with subtle changes in pressing triggers and build-up patterns keeping the opposition guessing.</p>
      
      <p>This masterclass in midfield control serves as a blueprint for how City might approach future encounters against Europe's elite teams, and highlights why they remain favorites to lift the Champions League trophy.</p>
    `,
    category: 'Features',
    tags: ['tactical analysis', 'real madrid', 'champions league'],
    featuredImage: 'https://placehold.co/600x400/6CADDF/1C2C5B?text=Tactical+Analysis',
    author: authors[0],
    publishedDate: '2023-05-17T12:00:00.000Z',
    status: 'published',
    isFeatured: false
  },
  {
    id: '5',
    title: 'Match Preview: Manchester City vs Liverpool',
    slug: 'match-preview-manchester-city-liverpool',
    excerpt: "Everything you need to know ahead of Sunday's crucial Premier League clash between Manchester City and Liverpool at the Etihad Stadium.",
    content: `
      <p>Manchester City host Liverpool this Sunday in what could be a pivotal match in the Premier League title race. With just one point separating the two sides at the top of the table, the outcome could have significant implications for the destination of the trophy.</p>
      
      <p><strong>Team News</strong></p>
      
      <p>City will be boosted by the return of Kevin De Bruyne, who has recovered from the minor hamstring issue that kept him out of Belgium's recent World Cup qualifiers. However, John Stones remains doubtful after picking up a knock on international duty.</p>
      
      <p>For Liverpool, Alisson Becker and Fabinho are expected to start despite their late return from Brazil, while Diogo Jota faces a late fitness test.</p>
      
      <p><strong>Tactical Preview</strong></p>
      
      <p>The tactical battle between Pep Guardiola and Jürgen Klopp has become one of the most fascinating in modern football. City will likely look to dominate possession and break down Liverpool's high press, while the visitors will aim to exploit transition moments with their rapid front three.</p>
      
      <p>A key battleground will be the wide areas, where City's full-backs will need to balance their attacking instincts with defensive responsibilities against Mohamed Salah and Sadio Mané.</p>
      
      <p><strong>Key Stats</strong></p>
      
      <p>City have won their last 10 Premier League matches at the Etihad, scoring 33 goals and conceding just 4.</p>
      
      <p>Liverpool are unbeaten in their last 20 league games, their longest such run under Klopp.</p>
      
      <p>The last five Premier League meetings between these sides have produced 18 goals.</p>
      
      <p><strong>Predicted Line-ups</strong></p>
      
      <p>City (4-3-3): Ederson; Walker, Dias, Laporte, Cancelo; Rodri, De Bruyne, Bernardo; Mahrez, Sterling, Grealish.</p>
      
      <p>Liverpool (4-3-3): Alisson; Alexander-Arnold, Matip, Van Dijk, Robertson; Henderson, Fabinho, Thiago; Salah, Jota, Mané.</p>
      
      <p>This promises to be another classic encounter between two sides who have defined English football in recent years. Kick-off is at 16:30 BST, with live coverage on Sky Sports Main Event.</p>
    `,
    category: 'Match Previews',
    tags: ['liverpool', 'premier league', 'match preview'],
    featuredImage: 'https://placehold.co/600x400/6CADDF/1C2C5B?text=City+vs+Liverpool',
    author: authors[1],
    publishedDate: '2023-05-20T09:15:00.000Z',
    status: 'published',
    isFeatured: false
  },
  {
    id: '6',
    title: 'Fan Favorite Announces Retirement from Football',
    slug: 'fan-favorite-announces-retirement',
    excerpt: 'Former Manchester City midfielder and fan favorite has announced his retirement from professional football at the age of 36.',
    content: `
      <p>A former Manchester City midfielder, widely regarded as one of the club's most popular players during the early years of the Sheikh Mansour era, has announced his retirement from professional football.</p>
      
      <p>The 36-year-old, who made 260 appearances for City between 2009 and 2017, confirmed his decision in an emotional social media post this morning.</p>
      
      <p>"After 18 wonderful years as a professional footballer, I have decided to hang up my boots," he wrote. "I have been fortunate to play for some incredible clubs, but my time at Manchester City will always hold a special place in my heart."</p>
      
      <p>During his time at the Etihad, he won two Premier League titles, an FA Cup, two League Cups, and a Community Shield, establishing himself as a key figure in the club's transformation into a footballing powerhouse.</p>
      
      <p>Known for his technical ability, vision, and spectacular goals, he became a favorite among the City faithful, who affectionately nicknamed him based on his ball-playing abilities.</p>
      
      <p>After leaving City in 2017, he had spells in Spain and Italy before finishing his career in MLS with a two-year stint at an Eastern Conference club.</p>
      
      <p>City chairman Khaldoon Al Mubarak was among the first to pay tribute: "Everyone at Manchester City would like to congratulate him on an outstanding career and thank him for his contribution to our club. He will always be welcome at the Etihad Stadium, and we look forward to seeing him again soon."</p>
      
      <p>Former teammates and fans have flooded social media with messages of support and appreciation, reflecting the high esteem in which he is held by the City community.</p>
      
      <p>As for his future plans, the player has indicated an interest in coaching and has already begun work on his UEFA licenses.</p>
    `,
    category: 'Latest News',
    tags: ['retirement', 'midfielder', 'fan favorite'],
    featuredImage: 'https://placehold.co/600x400/6CADDF/1C2C5B?text=Retirement+News',
    author: authors[2],
    publishedDate: '2023-05-21T16:45:00.000Z',
    status: 'published',
    isFeatured: false
  }
];

export const getFeaturedPost = (): BlogPost | undefined => {
  return blogPosts.find(post => post.isFeatured);
};

export const getRecentPosts = (count: number, excludeIds: string[] = []): BlogPost[] => {
  return blogPosts
    .filter(post => !excludeIds.includes(post.id) && post.status === 'published')
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, count);
};

export const getPostsByCategory = (category: Category, count?: number): BlogPost[] => {
  const filtered = blogPosts
    .filter(post => post.category === category && post.status === 'published')
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  
  return count ? filtered.slice(0, count) : filtered;
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (post: BlogPost, count: number = 3): BlogPost[] => {
  // Get posts with the same category, excluding the current post
  return blogPosts
    .filter(p => p.id !== post.id && p.category === post.category && p.status === 'published')
    .sort(() => 0.5 - Math.random())  // Simple random sort
    .slice(0, count);
};
