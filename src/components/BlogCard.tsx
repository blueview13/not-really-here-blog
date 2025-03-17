
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../lib/types';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  isCompact?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, className, isCompact = false }) => {
  return (
    <article 
      className={cn(
        'blog-card group h-full flex flex-col',
        className
      )}
    >
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden relative">
        <div className="aspect-[16/9] overflow-hidden">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-3 left-3">
          <span className="category-tag">{post.category}</span>
        </div>
      </Link>
      
      <div className="flex-1 p-4 flex flex-col">
        <div className="mb-2 text-sm text-gray-500">
          {format(new Date(post.publishedDate), 'MMMM d, yyyy')}
        </div>
        
        <Link to={`/blog/${post.slug}`} className="block mb-2">
          <h3 className={cn(
            "font-bold text-gray-900 group-hover:text-city-sky transition-colors text-balance",
            isCompact ? "text-lg" : "text-xl"
          )}>
            {post.title}
          </h3>
        </Link>
        
        {!isCompact && (
          <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
        )}
        
        <div className="mt-auto">
          <Link 
            to={`/blog/${post.slug}`} 
            className="inline-flex items-center text-sm font-medium text-city-navy hover:text-city-sky transition-colors"
          >
            Read more
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
