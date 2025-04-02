import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, getRecentPosts } from '../lib/blogData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import '../styles/editor.css';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = getRecentPosts(3).filter(p => p.id !== post?.id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [slug]);
  
  useEffect(() => {
    if (!isLoading && !post) {
      navigate('/not-found', { replace: true });
    }
  }, [isLoading, post, navigate]);
  
  const processImagesForTextFlow = () => {
    if (!contentRef.current || !post) return;
    
    const content = contentRef.current;
    
    // Process all images in the blog post content
    const images = content.querySelectorAll('img');
    console.log(`Processing ${images.length} images for text flow`);
    
    images.forEach((img, index) => {
      // Check for style or parent attributes that indicate alignment
      const style = img.getAttribute('style') || '';
      console.log(`Image ${index+1} style: ${style}`);
      
      // Apply direct inline float to ensure alignment works
      if (style.includes('float: left') || style.includes('float:left')) {
        img.classList.add('align-left');
        img.style.float = 'left';
        console.log(`Applied left alignment to image ${index+1}`);
      } else if (style.includes('float: right') || style.includes('float:right')) {
        img.classList.add('align-right');
        img.style.float = 'right';
        console.log(`Applied right alignment to image ${index+1}`);
      } else if (style.includes('margin: auto')) {
        img.classList.add('align-center');
        img.style.display = 'block';
        console.log(`Applied center alignment to image ${index+1}`);
      }
      
      // Process parent elements (figures) in SunEditor
      const parentElement = img.parentElement;
      if (parentElement) {
        console.log(`Parent element tag: ${parentElement.tagName}, class: ${parentElement.className}`);
        
        // Handle figure elements with alignment styles
        if (parentElement.tagName === 'FIGURE' || parentElement.classList.contains('se-component')) {
          const parentStyle = parentElement.getAttribute('style') || '';
          console.log(`Parent style: ${parentStyle}`);
          
          // Apply alignment classes and inline styles to ensure proper rendering
          if (parentStyle.includes('float: left') || parentStyle.includes('float:left')) {
            parentElement.classList.add('align-left');
            parentElement.style.float = 'left';
            img.classList.add('align-left');
            img.style.float = 'left';
            console.log('Applied left alignment to parent and image');
          } else if (parentStyle.includes('float: right') || parentStyle.includes('float:right')) {
            parentElement.classList.add('align-right');
            parentElement.style.float = 'right';
            img.classList.add('align-right');
            img.style.float = 'right';
            console.log('Applied right alignment to parent and image');
          } else if (parentStyle.includes('margin: auto')) {
            parentElement.classList.add('align-center');
            img.classList.add('align-center');
            console.log('Applied center alignment to parent and image');
          }
        }
      }
    });
    
    // Make sure all paragraphs properly wrap around floated images
    const paragraphs = content.querySelectorAll('p');
    console.log(`Processing ${paragraphs.length} paragraphs for flow-root`);
    paragraphs.forEach(p => {
      p.style.display = 'flow-root';
    });
    
    // Force a reflow of the DOM to ensure styles are applied
    content.style.display = 'none';
    // Force layout recalculation
    void content.offsetHeight;
    content.style.display = 'flow-root';
  };
  
  useEffect(() => {
    if (!isLoading && post) {
      // Process images after content is loaded with multiple attempts
      // to ensure dynamic content is properly handled
      processImagesForTextFlow();
      
      // Run several times to catch any delayed rendering issues
      const timer1 = setTimeout(processImagesForTextFlow, 100);
      const timer2 = setTimeout(processImagesForTextFlow, 500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isLoading, post]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-city-sky border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return null; // Will be redirected by the effect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="relative h-[50vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10"></div>
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl animate-fade-in">
              <div className="inline-block category-tag mb-4">{post.category}</div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
                {post.title}
              </h1>
              <div className="flex items-center justify-center text-white/90 text-sm space-x-4">
                <div className="flex items-center">
                  <User size={16} className="mr-1.5" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1.5" />
                  <time dateTime={post.publishedDate}>
                    {format(new Date(post.publishedDate), 'MMMM d, yyyy')}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Link 
              to="/" 
              className="inline-flex items-center text-city-navy hover:text-city-sky transition-colors mb-8"
            >
              <ArrowLeft size={16} className="mr-1.5" />
              Back to Home
            </Link>
            
            <article className="blog-content">
              <div 
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: post.content }} 
                className="blog-post-content prose prose-lg max-w-none"
              />
            </article>
            
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex items-center">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-medium">Written by {post.author.name}</h3>
                  <p className="text-sm text-gray-500">Sports Journalist</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Articles */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post, index) => (
                <div key={post.id} className={`animate-fade-up animate-delay-${index * 100}`}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Comment Section */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
            
            <div className="mb-8">
              <form className="space-y-4">
                <div>
                  <label htmlFor="comment" className="block mb-2 font-medium">
                    Leave a comment
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-city-sky focus:border-transparent"
                    placeholder="Share your thoughts..."
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-city-sky focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-city-sky focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Post Comment
                </button>
              </form>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
