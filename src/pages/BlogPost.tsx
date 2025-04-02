
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
  
  const processImages = () => {
    if (!contentRef.current) return;
    
    const content = contentRef.current;
    console.log("Processing images for alignment and text flow");
    
    // Process all images inside figures/containers first
    const figures = content.querySelectorAll('figure, .se-component, .se-image-container');
    figures.forEach((figure, i) => {
      const img = figure.querySelector('img');
      if (!img) return;
      
      const style = figure.getAttribute('style') || '';
      console.log(`Figure ${i} style: ${style}`);
      
      // Remove any existing alignment classes
      figure.classList.remove('left-float', 'right-float', 'center-align');
      
      // Apply appropriate class based on style
      if (style.includes('float: left') || style.includes('float:left')) {
        figure.classList.add('left-float');
        console.log(`Applied left-float to figure ${i}`);
        if (img) {
          img.classList.add('left-float');
        }
      } else if (style.includes('float: right') || style.includes('float:right')) {
        figure.classList.add('right-float');
        console.log(`Applied right-float to figure ${i}`);
        if (img) {
          img.classList.add('right-float');
        }
      } else if (style.includes('margin: auto')) {
        figure.classList.add('center-align');
        console.log(`Applied center-align to figure ${i}`);
        if (img) {
          img.classList.add('center-align');
        }
      }
    });
    
    // Process direct images
    const images = content.querySelectorAll('img');
    images.forEach((img, i) => {
      const style = img.getAttribute('style') || '';
      console.log(`Direct image ${i} style: ${style}`);
      
      // Skip if this image is inside a figure we already processed
      const isInProcessedFigure = 
        img.parentElement && 
        (img.parentElement.classList.contains('left-float') || 
         img.parentElement.classList.contains('right-float') || 
         img.parentElement.classList.contains('center-align'));
         
      if (isInProcessedFigure) {
        console.log(`Skipping image ${i} as it's in a processed figure`);
        return;
      }
      
      // Remove any existing alignment classes
      img.classList.remove('left-float', 'right-float', 'center-align');
      
      // Apply appropriate class based on style
      if (style.includes('float: left') || style.includes('float:left')) {
        img.classList.add('left-float');
        // Also explicitly set inline style to ensure it works
        img.style.float = 'left';
        console.log(`Applied left-float to image ${i}`);
      } else if (style.includes('float: right') || style.includes('float:right')) {
        img.classList.add('right-float');
        // Also explicitly set inline style to ensure it works
        img.style.float = 'right';
        console.log(`Applied right-float to image ${i}`);
      } else if (style.includes('margin: auto')) {
        img.classList.add('center-align');
        img.style.display = 'block';
        img.style.marginLeft = 'auto';
        img.style.marginRight = 'auto';
        console.log(`Applied center-align to image ${i}`);
      }
    });
    
    // Force DOM reflow by temporarily removing and reattaching content
    const parent = content.parentElement;
    if (parent) {
      const temp = document.createElement('div');
      parent.replaceChild(temp, content);
      parent.replaceChild(content, temp);
    }
  };
  
  useEffect(() => {
    if (!isLoading && post && contentRef.current) {
      // Run image processing multiple times to catch any late-rendering issues
      processImages();
      
      // Schedule multiple runs with increasing delays
      const timers = [
        setTimeout(processImages, 100),
        setTimeout(processImages, 300),
        setTimeout(processImages, 700),
        setTimeout(processImages, 1500)
      ];
      
      // Observe any DOM changes and reprocess as needed
      const observer = new MutationObserver(() => {
        console.log("DOM changed, reprocessing images");
        processImages();
      });
      
      observer.observe(contentRef.current, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
      
      return () => {
        timers.forEach(clearTimeout);
        observer.disconnect();
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
                className="blog-post-content"
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
