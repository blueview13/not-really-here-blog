
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
    
    // Function to determine alignment class based on style or class
    const getAlignmentClass = (element: Element): string | null => {
      const style = element.getAttribute('style') || '';
      
      if (style.includes('float: left') || style.includes('float:left')) {
        return 'align-left';
      } else if (style.includes('float: right') || style.includes('float:right')) {
        return 'align-right';
      } else if (style.includes('margin: auto') || style.includes('margin:auto')) {
        return 'align-center';
      }
      
      // Check for pre-existing alignment classes
      if (element.classList.contains('left-float') || element.classList.contains('se-component-left-float')) {
        return 'align-left';
      } else if (element.classList.contains('right-float') || element.classList.contains('se-component-right-float')) {
        return 'align-right';
      } else if (element.classList.contains('center-align') || element.classList.contains('se-component-center')) {
        return 'align-center';
      }
      
      return null;
    };

    // Find and process all image containers
    const containers = content.querySelectorAll('figure, .se-component, .se-image-container, div[class*="se-"]');
    containers.forEach((container) => {
      // Skip processing if this container is inside another container we've already processed
      const parentContainer = container.closest('figure, .se-component, .se-image-container');
      if (parentContainer && parentContainer !== container) {
        return;
      }
      
      const img = container.querySelector('img');
      if (!img) return;
      
      // Determine alignment from container
      const alignClass = getAlignmentClass(container);
      
      if (alignClass) {
        // Remove old alignment classes
        container.classList.remove('left-float', 'right-float', 'center-align', 'align-left', 'align-right', 'align-center');
        img.classList.remove('left-float', 'right-float', 'center-align', 'align-left', 'align-right', 'align-center');
        
        // Add new alignment class
        container.classList.add(alignClass);
        img.classList.add(alignClass);
        
        // Enforce float with inline styles as well for maximum compatibility
        if (alignClass === 'align-left') {
          (container as HTMLElement).style.cssText += '; float: left !important; margin-right: 1em !important; max-width: 50% !important;';
          (img as HTMLElement).style.cssText += '; float: left !important;';
          console.log('Applied left alignment to container and image');
        } else if (alignClass === 'align-right') {
          (container as HTMLElement).style.cssText += '; float: right !important; margin-left: 1em !important; max-width: 50% !important;';
          (img as HTMLElement).style.cssText += '; float: right !important;';
          console.log('Applied right alignment to container and image');
        } else if (alignClass === 'align-center') {
          (container as HTMLElement).style.cssText += '; float: none !important; margin-left: auto !important; margin-right: auto !important;';
          (img as HTMLElement).style.cssText += '; float: none !important; margin-left: auto !important; margin-right: auto !important;';
          console.log('Applied center alignment to container and image');
        }
      }
    });
    
    // Process direct images (not in containers)
    const images = content.querySelectorAll('img');
    images.forEach((img) => {
      // Skip if this image is inside a container we already processed
      const parentContainer = img.closest('figure, .se-component, .se-image-container');
      if (parentContainer) {
        return;
      }
      
      const alignClass = getAlignmentClass(img);
      
      if (alignClass) {
        // Remove old alignment classes
        img.classList.remove('left-float', 'right-float', 'center-align', 'align-left', 'align-right', 'align-center');
        
        // Add new alignment class
        img.classList.add(alignClass);
        
        // Enforce float with inline styles
        if (alignClass === 'align-left') {
          (img as HTMLElement).style.cssText += '; float: left !important; margin-right: 1em !important; max-width: 50% !important;';
          console.log('Applied left alignment to direct image');
        } else if (alignClass === 'align-right') {
          (img as HTMLElement).style.cssText += '; float: right !important; margin-left: 1em !important; max-width: 50% !important;';
          console.log('Applied right alignment to direct image');
        } else if (alignClass === 'align-center') {
          (img as HTMLElement).style.cssText += '; float: none !important; display: block !important; margin-left: auto !important; margin-right: auto !important;';
          console.log('Applied center alignment to direct image');
        }
      }
    });

    // Insert a special clearfix element after the content to ensure proper layout
    const existingClearfix = content.querySelector('.image-clearfix');
    if (!existingClearfix) {
      const clearfix = document.createElement('div');
      clearfix.className = 'image-clearfix';
      clearfix.style.clear = 'both';
      content.appendChild(clearfix);
    }

    // Trigger reflow
    const oldHeight = content.style.minHeight;
    content.style.minHeight = '0';
    setTimeout(() => { content.style.minHeight = oldHeight; }, 0);
  };
  
  useEffect(() => {
    if (!isLoading && post && contentRef.current) {
      // Multiple processing passes to catch any rendering issues
      const processingTimes = [0, 100, 300, 800, 1500, 3000];
      
      const timers = processingTimes.map(time => 
        setTimeout(() => {
          console.log(`Processing images at ${time}ms`);
          processImages();
        }, time)
      );
      
      // Create MutationObserver to watch for changes to the DOM
      const observer = new MutationObserver((mutations) => {
        console.log("DOM mutation detected, reprocessing images");
        processImages();
      });
      
      observer.observe(contentRef.current, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
      
      // Ensure the content is visible and laid out properly
      if (contentRef.current) {
        contentRef.current.style.visibility = 'visible';
        contentRef.current.style.display = 'block';
      }
      
      // Add window resize handler to ensure layout recalculation
      const handleResize = () => processImages();
      window.addEventListener('resize', handleResize);
      
      return () => {
        timers.forEach(clearTimeout);
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
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
                style={{ overflow: 'visible' }}
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
