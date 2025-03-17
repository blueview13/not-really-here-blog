
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeaturedPost from '../components/FeaturedPost';
import BlogCard from '../components/BlogCard';
import { getFeaturedPost, getRecentPosts } from '../lib/blogData';

const Index = () => {
  const featuredPost = getFeaturedPost();
  const recentPosts = getRecentPosts(6).filter(post => post.id !== featuredPost?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Featured Post Section */}
        <section className="my-8 px-4 max-w-7xl mx-auto">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to <span className="text-city-navy">Not</span> <span className="text-city-sky">Really</span> <span className="text-city-navy">Here</span>
            </h1>
            <p className="text-gray-600 mt-2">
              A fan blog dedicated to Manchester City FC - bringing you the latest news, match reports, and insights.
            </p>
          </div>
          
          {featuredPost && <FeaturedPost post={featuredPost} />}
        </section>
        
        {/* Recent Posts Grid */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            <Link to="/archive" className="text-city-navy hover:text-city-sky transition-colors font-medium">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <div key={post.id} className="opacity-100" style={{ animationDelay: `${index * 100}ms` }}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </section>
        
        {/* Categories Showcase */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Explore Categories</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {['Latest News', 'Match Reports', 'Match Previews', 'Transfer News', 'Features'].map((category, index) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase().replace(/ /g, '-')}`}
                  className="glass-panel p-6 rounded-lg text-center hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="font-bold text-lg mb-2">{category}</h3>
                  <p className="text-sm text-gray-600">
                    Explore all {category.toLowerCase()} articles
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 px-4 bg-city-navy text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8 text-gray-300">
              Subscribe to our newsletter to receive the latest Manchester City news, match reports, and exclusives directly in your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-md py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-city-sky"
                required
              />
              <button
                type="submit"
                className="bg-city-sky text-white rounded-md px-6 py-3 hover:bg-city-light transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-xs mt-4 text-gray-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
