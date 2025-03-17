
import { BlogPost, Author } from './types';

export const authors: Author[] = [
  {
    id: '1',
    name: 'James Ducker',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: '2',
    name: 'Sam Lee',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: '3',
    name: 'Jonathan Smith',
    avatar: 'https://i.pravatar.cc/150?img=13'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Guardiola Extends Contract: "The Best is Yet to Come"',
    slug: 'guardiola-extends-contract',
    excerpt: 'Manchester City manager Pep Guardiola has signed a two-year extension to his contract, keeping him at the club until 2025.',
    content: `
      <p>Manchester City manager Pep Guardiola has signed a two-year extension to his contract, keeping him at the club until 2025.</p>
      
      <p>The Spaniard, who has won four Premier League titles, one FA Cup and four League Cups at City, will now oversee a decade at the club.</p>
      
      <p>"I am so pleased to be staying at Manchester City for another two years," said Guardiola in a statement.</p>
      
      <p>"I can't say thank you enough to everyone at the club for trusting me. I am happy and comfortable, and I have everything I need to do my job as best as possible."</p>
      
      <p>Guardiola added: "I know the next chapter of this club will be amazing for the next decade. It happened over the last ten years, and it will happen in the next ten years because this club is so stable."</p>
      
      <p>City chairman Khaldoon Al Mubarak said: "I am delighted that Pep's journey with Manchester City will continue."</p>
      
      <p>"He has already contributed so much to the success and fabric of this organization, and it's exciting to think what might be possible given the energy, hunger and ambition that he clearly still has."</p>
    `,
    category: 'Latest News',
    tags: ['Guardiola', 'Contract', 'Manager'],
    featuredImage: 'https://images.unsplash.com/photo-1624280157150-4d1ed8632989?q=80&w=1000',
    author: authors[0],
    publishedDate: '2023-11-23T12:00:00Z',
    status: 'published',
    isFeatured: true
  },
  {
    id: '2',
    title: 'De Bruyne Returns to Training Following Lengthy Injury',
    slug: 'de-bruyne-returns-to-training',
    excerpt: 'Manchester City's star midfielder Kevin De Bruyne has returned to first-team training after a three-month layoff due to a hamstring injury.',
    content: `
      <p>Manchester City's star midfielder Kevin De Bruyne has returned to first-team training after a three-month layoff due to a hamstring injury.</p>
      
      <p>The Belgian international was injured during City's opening Premier League fixture against Burnley in August and has been sidelined ever since.</p>
      
      <p>De Bruyne was spotted participating in a light training session with the rest of the squad on Thursday morning, raising hopes of a potential return to action before the busy festive period.</p>
      
      <p>City manager Pep Guardiola urged caution regarding the midfielder's return: "Kevin has just started training with us. It's good news, but we need to be patient. We won't rush him back."</p>
      
      <p>"When you have been out for three months with a hamstring problem, you need to take things step by step. But we are all delighted to see him back on the grass," added Guardiola.</p>
      
      <p>The 32-year-old playmaker's return will be a significant boost for City, who have missed his creative influence in midfield during his absence.</p>
      
      <p>City faces a congested fixture schedule in December, and De Bruyne's return could prove crucial as they compete across multiple competitions.</p>
    `,
    category: 'Latest News',
    tags: ['De Bruyne', 'Injury', 'Return'],
    featuredImage: 'https://images.unsplash.com/photo-1624280157150-4d1ed8632989?q=80&w=1000',
    author: authors[1],
    publishedDate: '2023-11-21T15:30:00Z',
    status: 'published',
    isFeatured: false
  },
  {
    id: '3',
    title: 'City Triumph in Manchester Derby with Haaland Hat-trick',
    slug: 'city-triumph-manchester-derby-haaland-hat-trick',
    excerpt: 'Erling Haaland scored a stunning hat-trick as Manchester City secured a convincing 4-1 victory over Manchester United at the Etihad Stadium.',
    content: `
      <p>Erling Haaland scored a stunning hat-trick as Manchester City secured a convincing 4-1 victory over Manchester United at the Etihad Stadium.</p>
      
      <p>The Norwegian striker continued his remarkable goalscoring form with three well-taken goals, while Phil Foden added another as City dominated their local rivals from start to finish.</p>
      
      <p>Haaland opened the scoring in the 10th minute, heading home from a Kevin De Bruyne corner. He doubled City's lead in the 37th minute with a powerful strike from just inside the box after being set up by Bernardo Silva.</p>
      
      <p>The 23-year-old completed his hat-trick early in the second half, converting from the penalty spot after Foden was brought down by Lisandro Martinez.</p>
      
      <p>Foden added a fourth for City in the 70th minute with a sublime finish from a tight angle, before Marcus Rashford scored a late consolation for United.</p>
      
      <p>City manager Pep Guardiola was full of praise for Haaland's performance: "Erling was exceptional today. His movement, his finishing, his work rate - everything was perfect. He is a special talent."</p>
      
      <p>The victory sees City maintain their position at the top of the Premier League table, three points ahead of second-placed Arsenal.</p>
    `,
    category: 'Match Reports',
    tags: ['Haaland', 'Manchester Derby', 'Match Report'],
    featuredImage: 'https://images.unsplash.com/photo-1624280157150-4d1ed8632989?q=80&w=1000',
    author: authors[2],
    publishedDate: '2023-11-18T19:45:00Z',
    status: 'published',
    isFeatured: false
  },
  {
    id: '4',
    title: 'Preview: City Face Tough Champions League Test Against Bayern Munich',
    slug: 'preview-city-face-bayern-munich-champions-league',
    excerpt: 'Manchester City prepare for a challenging Champions League quarter-final first leg against Bayern Munich at the Etihad Stadium.',
    content: `
      <p>Manchester City prepare for a challenging Champions League quarter-final first leg against Bayern Munich at the Etihad Stadium.</p>
      
      <p>The highly anticipated clash sees Pep Guardiola face his former club in what promises to be an enthralling tactical battle between two of Europe's elite teams.</p>
      
      <p>City enter the match in excellent form, having won their last eight games in all competitions. However, they face a Bayern side that has been equally impressive under Thomas Tuchel's management.</p>
      
      <p>Guardiola has a fully fit squad to choose from, with Kevin De Bruyne and Erling Haaland both expected to start. The only selection dilemma appears to be whether to opt for Kyle Walker or Rico Lewis at right-back.</p>
      
      <p>Bayern, meanwhile, will be without the injured Lucas Hernandez, but can call upon the likes of Harry Kane, Jamal Musiala, and Leroy Sané in attack.</p>
      
      <p>Speaking ahead of the game, Guardiola emphasized the importance of staying focused: "We need to be at our absolute best for the full 90 minutes. Bayern have incredible quality all over the pitch and can punish any mistakes."</p>
      
      <p>The return leg will be played at the Allianz Arena next week, with the winners facing either Real Madrid or Liverpool in the semi-finals.</p>
    `,
    category: 'Match Previews',
    tags: ['Champions League', 'Bayern Munich', 'Preview'],
    featuredImage: 'https://images.unsplash.com/photo-1624280157150-4d1ed8632989?q=80&w=1000',
    author: authors[0],
    publishedDate: '2023-11-14T09:15:00Z',
    status: 'published',
    isFeatured: false
  },
  {
    id: '5',
    title: 'City Set to Target Premier League Striker in January Transfer Window',
    slug: 'city-target-premier-league-striker-january-transfer',
    excerpt: 'Manchester City are reportedly preparing a January bid for one of the Premier League's most prolific strikers to provide competition for Erling Haaland.',
    content: `
      <p>Manchester City are reportedly preparing a January bid for one of the Premier League's most prolific strikers to provide competition for Erling Haaland.</p>
      
      <p>According to sources close to the club, City's recruitment team has identified several potential targets, with Brentford's Ivan Toney believed to be at the top of their shortlist.</p>
      
      <p>Toney, who recently returned to action following a suspension, has been in impressive form for the Bees and is seen as an ideal alternative to Haaland, offering a different profile in attack.</p>
      
      <p>City's interest comes amid concerns about their squad depth in the striker position, with Julián Álvarez often deployed in a more withdrawn role by Pep Guardiola.</p>
      
      <p>The Premier League champions are expected to face competition from Arsenal and Chelsea for Toney's signature, with Brentford likely to demand in excess of £50 million for their star forward.</p>
      
      <p>When questioned about potential January transfers, Guardiola remained tight-lipped: "My focus is only on the players we have right now. The club will always look at possibilities to improve the squad, but I am very happy with what we have."</p>
      
      <p>Any move for a new striker would likely signal a change in formation or approach from Guardiola, who has predominantly used a system built around a single central forward this season.</p>
    `,
    category: 'Transfer News',
    tags: ['Transfers', 'January Window', 'Striker'],
    featuredImage: 'https://images.unsplash.com/photo-1624280157150-4d1ed8632989?q=80&w=1000',
    author: authors[1],
    publishedDate: '2023-11-12T11:20:00Z',
    status: 'published',
    isFeatured: false
  },
  {
    id: '6',
    title: 'The Evolution of Rodri: How City's Midfield Maestro Became World-Class',
    slug: 'evolution-rodri-city-midfield-maestro',
    excerpt: 'An in-depth analysis of Rodri's development at Manchester City and how he has established himself as one of the world's premier defensive midfielders.',
    content: `
      <p>When Rodri arrived at Manchester City in the summer of 2019 as the club's record signing at the time, he was viewed as the long-term successor to Fernandinho. Four years later, the Spanish international has not only filled those sizeable boots but arguably surpassed his predecessor's impact.</p>
      
      <p>Rodri's evolution under Pep Guardiola's guidance has been remarkable. Initially struggling with the pace and physicality of the Premier League, he has transformed into the metronome of City's midfield, dictating play with his exceptional passing range and tactical intelligence.</p>
      
      <p>The 27-year-old's improvement in defensive positioning has been particularly noteworthy. In his first season, Rodri would often find himself caught out of position during opposition counter-attacks. Now, his anticipation and reading of the game have developed to such an extent that he regularly snuffs out dangerous situations before they materialize.</p>
      
      <p>Statistically, Rodri's influence is evident. Last season, he completed more passes than any other Premier League player, maintained a pass completion rate of over 90%, and significantly increased his goal contribution, including several crucial strikes.</p>
      
      <p>His crowning moment came in the Champions League final against Inter Milan, where his second-half goal secured City's historic treble. That strike epitomized Rodri's development – arriving at the perfect moment to finish with the composure of a seasoned striker.</p>
      
      <p>Former City midfielder Yaya Touré recently described Rodri as "the complete modern midfielder" and suggested he deserves serious consideration for the Ballon d'Or. High praise indeed, but few would argue against Rodri's credentials as one of the world's elite midfielders.</p>
      
      <p>As City continue their pursuit of domestic and European honors this season, Rodri's importance cannot be overstated. In a team full of stars, he has become the irreplaceable foundation upon which Guardiola's tactical masterplan is built.</p>
    `,
    category: 'Features',
    tags: ['Rodri', 'Analysis', 'Midfield'],
    featuredImage: 'https://images.unsplash.com/photo-1624280157150-4d1ed8632989?q=80&w=1000',
    author: authors[2],
    publishedDate: '2023-11-10T14:00:00Z',
    status: 'published',
    isFeatured: false
  },
  {
    id: '7',
    title: 'City Unveil Plans for Etihad Stadium Expansion',
    slug: 'city-unveil-plans-etihad-stadium-expansion',
    excerpt: 'Manchester City have revealed ambitious plans to increase the capacity of the Etihad Stadium to 60,000 seats and enhance fan amenities.',
    content: `
      <p>Manchester City have revealed ambitious plans to increase the capacity of the Etihad Stadium to 60,000 seats and enhance fan amenities.</p>
      
      <p>The proposed expansion, which is subject to planning permission, would primarily focus on the North Stand, adding approximately 7,000 new seats to the stadium's current capacity.</p>
      
      <p>In addition to the increased seating, the development plans include a new club museum, an enhanced fan zone, and improved hospitality facilities.</p>
      
      <p>City's Chief Operating Officer, Omar Berrada, outlined the club's vision: "The Etihad Stadium has been our home for 20 years, and this development will ensure it remains a world-class venue for decades to come."</p>
      
      <p>"We've carefully considered feedback from supporters and local residents to create plans that will benefit everyone. This isn't just about adding more seats; it's about creating a better matchday experience for all fans and further integrating the stadium into the local community," Berrada added.</p>
      
      <p>The expansion project is expected to take approximately two years to complete, with construction likely to begin at the end of the current season if planning approval is granted.</p>
      
      <p>City have confirmed that the work will be phased to minimize disruption to matches, with most of the construction taking place during off-season periods.</p>
    `,
    category: 'Latest News',
    tags: ['Etihad Stadium', 'Expansion', 'Infrastructure'],
    featuredImage: 'https://images.unsplash.com/photo-1624280157150-4d1ed8632989?q=80&w=1000',
    author: authors[0],
    publishedDate: '2023-11-08T16:45:00Z',
    status: 'published',
    isFeatured: false
  }
];

export function getRecentPosts(count = 6): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, count);
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find(post => post.isFeatured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostsByCategory(category: string, count?: number): BlogPost[] {
  const filtered = blogPosts.filter(post => post.category === category);
  return count ? filtered.slice(0, count) : filtered;
}
