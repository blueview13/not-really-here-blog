
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { blogPosts } from '../lib/blogData';
import { ArrowLeft, Save } from 'lucide-react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      const post = blogPosts.find(post => post.id === id);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
      } else {
        toast({
          title: "Post not found",
          description: "The post you're trying to edit doesn't exist.",
          variant: "destructive",
        });
        navigate('/admin');
      }
    }
    setIsLoading(false);
  }, [id, navigate, toast]);

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

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
    
    // Find and update the post in the blogPosts array
    if (id) {
      const postIndex = blogPosts.findIndex(post => post.id === id);
      if (postIndex !== -1) {
        blogPosts[postIndex] = {
          ...blogPosts[postIndex],
          title,
          content,
          category: category as any,
          excerpt: content.replace(/<[^>]*>/g, '').substring(0, 120) + "...",
        };
      }
    }
    
    // Simulate API save delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Post updated",
      description: "Your post has been updated successfully.",
      variant: "default",
    });
    
    navigate('/admin');
  };

  // SunEditor options
  const editorOptions = {
    buttonList: [
      ['undo', 'redo'],
      ['font', 'fontSize', 'formatBlock'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['removeFormat'],
      ['fontColor', 'hiliteColor'],
      ['outdent', 'indent'],
      ['align', 'horizontalRule', 'list', 'table'],
      ['link', 'image', 'video'],
      ['fullScreen', 'showBlocks', 'codeView'],
    ],
    height: '400px',
  };

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
            <h1 className="text-2xl font-bold">Edit Post</h1>
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
                <label htmlFor="editor" className="block text-sm font-medium text-gray-700 mb-1">
                  Content *
                </label>
                <SunEditor
                  id="editor"
                  setContents={content}
                  onChange={handleEditorChange}
                  setOptions={editorOptions}
                  placeholder="Write your post content here..."
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
                  Save Changes
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

export default EditPost;
