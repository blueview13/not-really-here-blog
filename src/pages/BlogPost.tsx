
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
  const processingRef = useRef(false);
  
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
    if (!contentRef.current || processingRef.current) return;
    
    // Set processing flag to prevent multiple simultaneous executions
    processingRef.current = true;
    
    try {
      const content = contentRef.current;
      console.log("Processing images for alignment and text flow");
      
      // Process all images and their containers
      const images = content.querySelectorAll('img');
      const containers = content.querySelectorAll('figure, .se-component, .se-image-container');
      
      // Process containers with images first
      containers.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;
        
        // Skip nested containers to avoid double processing
        const parentContainer = container.closest('figure, .se-component, .se-image-container');
        if (parentContainer && parentContainer !== container) return;
        
        // Determine alignment based on classes and style
        let alignment = 'none';
        const containerElement = container as HTMLElement;
        const imgElement = img as HTMLElement;
        const containerStyle = window.getComputedStyle(containerElement);
        
        // Check classes
        if (container.classList.contains('left-float') || 
            container.classList.contains('se-component-left-float') ||
            container.classList.contains('align-left')) {
          alignment = 'left';
        } else if (container.classList.contains('right-float') || 
                  container.classList.contains('se-component-right-float') ||
                  container.classList.contains('align-right')) {
          alignment = 'right';
        } else if (container.classList.contains('center-align') || 
                  container.classList.contains('se-component-center') ||
                  container.classList.contains('align-center')) {
          alignment = 'center';
        }
        
        // Check inline styles if no class-based alignment was found
        if (alignment === 'none') {
          const floatStyle = containerStyle.getPropertyValue('float') || 
                            containerElement.style.float || 
                            '';
          
          if (floatStyle.includes('left')) {
            alignment = 'left';
          } else if (floatStyle.includes('right')) {
            alignment = 'right';
          } else if (containerStyle.getPropertyValue('margin').includes('auto') || 
                    containerElement.style.margin?.includes('auto')) {
            alignment = 'center';
          }
        }
        
        // Apply appropriate classes based on alignment
        container.classList.remove('align-left', 'align-right', 'align-center');
        img.classList.remove('align-left', 'align-right', 'align-center');
        
        if (alignment === 'left') {
          container.classList.add('align-left');
          img.classList.add('align-left');
        } else if (alignment === 'right') {
          container.classList.add('align-right');
          img.classList.add('align-right');
        } else if (alignment === 'center') {
          container.classList.add('align-center');
          img.classList.add('align-center');
        }
      });
      
      // Process standalone images (not in containers)
      images.forEach(img => {
        // Skip images that are in containers we already processed
        const parentContainer = img.closest('figure, .se-component, .se-image-container');
        if (parentContainer) return;
        
        // Determine alignment based on classes and style
        let alignment = 'none';
        const imgElement = img as HTMLElement;
        const imgStyle = window.getComputedStyle(imgElement);
        
        // Check classes
        if (img.classList.contains('left-float') || 
            img.classList.contains('align-left')) {
          alignment = 'left';
        } else if (img.classList.contains('right-float') || 
                  img.classList.contains('align-right')) {
          alignment = 'right';
        } else if (img.classList.contains('center-align') || 
                  img.classList.contains('align-center')) {
          alignment = 'center';
        }
        
        // Check inline styles if no class-based alignment was found
        if (alignment === 'none') {
          const floatStyle = imgStyle.getPropertyValue('float') || 
                            imgElement.style.float || 
                            '';
          
          if (floatStyle.includes('left')) {
            alignment = 'left';
          } else if (floatStyle.includes('right')) {
            alignment = 'right';
          } else if (imgStyle.getPropertyValue('margin').includes('auto') || 
                    imgElement.style.margin?.includes('auto')) {
            alignment = 'center';
          }
        }
        
        // Apply appropriate classes based on alignment
        img.classList.remove('align-left', 'align-right', 'align-center');
        
        if (alignment === 'left') {
          img.classList.add('align-left');
        } else if (alignment === 'right') {
          img.classList.add('align-right');
        } else if (alignment === 'center') {
          img.classList.add('align-center');
        }
      });
      
      // Ensure there's a clearfix at the end
      let clearfix = content.querySelector('.image-clearfix');
      if (!clearfix) {
        clearfix = document.createElement('div');
        clearfix.className = 'image-clearfix';
        clearfix.style.clear = 'both';
        content.appendChild(clearfix);
      }
      
      console.log("Image processing complete");
    } catch (error) {
      console.error("Error processing images:", error);
    } finally {
      // Reset processing flag
      processingRef.current = false;
    }
  };
  
  useEffect(() => {
    if (!isLoading && post && contentRef.current) {
      // Process once content is loaded
      let initialProcessTimeout = setTimeout(() => {
        processImages();
      }, 100);
      
      // Also process after a delay to catch late-loading images
      let processingTimeouts = [500, 1000, 2000].map(delay => 
        setTimeout(processImages, delay)
      );
      
      // Create MutationObserver with debounced processing
      let debounceTimer: ReturnType<typeof setTimeout> | null = null;
      const observer = new MutationObserver(() => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          console.log("DOM mutation detected, reprocessing images");
          processImages();
        }, 200);
      });
      
      observer.observe(contentRef.current, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });
      
      // Handle window resize with debounce
      let resizeTimer: ReturnType<typeof setTimeout> | null = null;
      const handleResize = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(processImages, 200);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        if (initialProcessTimeout) clearTimeout(initialProcessTimeout);
        processingTimeouts.forEach(clearTimeout);
        if (debounceTimer) clearTimeout(debounceTimer);
        if (resizeTimer) clearTimeout(resizeTimer);
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
