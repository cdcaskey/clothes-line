import { Navigation } from "@/components/Navigation";
import { CreateProjectForm } from '../components/forms/CreateProjectForm';
import { CreateBlogForm } from '../components/forms/CreateBlogForm';
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { toast } from "sonner";

const AdminFormsPage = () => {
  useScrollToTop(); // Scroll to top when navigating to this page

  const handleProjectSubmit = (data: any) => {
    toast.success("Project created successfully!", {
      description: `"${data.title}" has been added to your portfolio.`
    });
  };

  const handleBlogSubmit = (data: any) => {
    toast.success("Blog post created successfully!", {
      description: `"${data.title}" is ready to be published.`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-900/20">
      <Navigation />
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-lg text-muted-foreground">
              Create and manage your projects and blog posts
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create Project Form */}
            <div className="glass rounded-2xl p-6 lg:p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Create New Project
              </h2>
              <CreateProjectForm onSubmit={handleProjectSubmit} />
            </div>

            {/* Create Blog Form */}
            <div className="glass rounded-2xl p-6 lg:p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Create New Blog Post
              </h2>
              <CreateBlogForm onSubmit={handleBlogSubmit} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminFormsPage;
