import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from '../lib/blogData';
import { BlogPost } from '../lib/types';
import { Edit, Trash2, Plus, LogOut } from 'lucide-react';

const Admin = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const timer = setTimeout(() => {
      setPosts(blogPosts);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      variant: "default",
    });
    navigate('/');
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Post deleted",
      description: "The post has been successfully deleted.",
      variant: "default",
    });
  };

  const handleNewPost = () => {
    navigate('/admin/new-post');
  };

  const handleEditPost = (id: string) => {
    navigate(`/admin/edit-post/${id}`);
  };

  const filteredPosts = selectedCategory 
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  const categories = Array.from(new Set(posts.map(post => post.category)));

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button 
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-city-sky transition-colors"
            >
              <LogOut size={18} className="mr-1.5" />
              Logout
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-panel rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2">Total Posts</h2>
              <p className="text-3xl font-bold text-city-navy">{posts.length}</p>
            </div>
            
            <div className="glass-panel rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2">Categories</h2>
              <p className="text-3xl font-bold text-city-navy">{categories.length}</p>
            </div>
            
            <div className="glass-panel rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2">Published</h2>
              <p className="text-3xl font-bold text-city-navy">
                {posts.filter(post => post.status === 'published').length}
              </p>
            </div>
          </div>
          
          <div className="glass-panel rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Manage Posts</h2>
              <button 
                onClick={handleNewPost} 
                className="btn btn-primary flex items-center"
              >
                <Plus size={18} className="mr-1.5" />
                New Post
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === null
                      ? 'bg-city-sky text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-city-sky text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map(post => (
                    <tr key={post.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium">{post.title}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded-full">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            post.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : post.status === 'draft'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(post.publishedDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditPost(post.id)}
                            className="p-1 text-gray-600 hover:text-city-sky transition-colors"
                            aria-label="Edit post"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                            aria-label="Delete post"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No posts found in this category.
                </div>
              )}
            </div>
          </div>
          
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Manage Categories</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(category => (
                <div
                  key={category}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                >
                  <span className="font-medium">{category}</span>
                  <div className="flex space-x-2">
                    <button
                      className="p-1 text-gray-600 hover:text-city-sky transition-colors"
                      aria-label="Edit category"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-1 text-gray-600 hover:text-red-600 transition-colors"
                      aria-label="Delete category"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              <button className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-gray-500 hover:text-city-sky hover:border-city-sky transition-colors">
                <Plus size={16} className="mr-1.5" />
                Add Category
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
