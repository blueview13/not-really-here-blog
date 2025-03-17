
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { blogPosts } from '../lib/blogData';

const NewPost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !category) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    // Create a new post object
    const newPost = {
      id: (blogPosts.length + 1).toString(),
      title,
      slug: title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
      excerpt: content.substring(0, 120) + "...",
      content,
      category: category as any,
      tags: [],
      featuredImage: `https://placehold.co/600x400/6CADDF/1C2C5B?text=${encodeURIComponent(title)}`,
      author: {
        id: "1",
        name: "Admin User",
        avatar: "/avatar-1.jpg"
      },
      publishedDate: new Date().toISOString(),
      status: 'published' as const,
      isFeatured: false
    };
    
    // Add the new post to the blogPosts array
    blogPosts.unshift(newPost);
    
    // Simulate API save delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Post saved",
      description: "Your post has been saved successfully.",
      variant: "default",
    });
    
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin')}
              className="mr-4"
            >
              <ArrowLeft size={18} />
              <span className="ml-2">Back</span>
            </Button>
            <h1 className="text-2xl font-bold">Create New Post</h1>
          </div>
          
          <div className="glass-panel rounded-lg p-6">
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-city-sky focus:border-transparent"
                  placeholder="Enter post title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-city-sky focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Latest News">Latest News</option>
                  <option value="Match Reports">Match Reports</option>
                  <option value="Transfer News">Transfer News</option>
                  <option value="Features">Features</option>
                  <option value="Match Previews">Match Previews</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content *
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md h-64 focus:outline-none focus:ring-2 focus:ring-city-sky focus:border-transparent"
                  placeholder="Write your post content here..."
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Save size={18} className="mr-2" />
                  )}
                  Save Post
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewPost;
