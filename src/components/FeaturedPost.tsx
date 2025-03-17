
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../lib/types';
import { format } from 'date-fns';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <article className="relative overflow-hidden rounded-xl shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10"></div>
      
      <div className="relative aspect-[21/9] overflow-hidden">
        <img 
          src={post.featuredImage} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute top-4 left-4 z-20">
        <div className="px-3 py-1.5 bg-city-navy text-white text-xs font-semibold rounded-full flex items-center">
          <span className="animate-pulse-soft mr-1.5">●</span>
          Featured Article
        </div>
      </div>
      
      <div className="absolute inset-0 z-20 flex items-end">
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          <div className="flex items-center text-white/90 text-sm mb-2">
            <time dateTime={post.publishedDate}>
              {format(new Date(post.publishedDate), 'MMMM d, yyyy')}
            </time>
            <span className="mx-2">•</span>
            <span className="category-tag">{post.category}</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">
            {post.title}
          </h2>
          
          <p className="text-white/80 mb-6 max-w-3xl hidden sm:block">
            {post.excerpt}
          </p>
          
          <Link 
            to={`/blog/${post.slug}`} 
            className="inline-flex items-center px-4 py-2 bg-city-sky text-white rounded-md hover:bg-city-sky/90 transition-colors"
          >
            Continue Reading
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPost;
