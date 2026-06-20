import React from "react";
import BlogFirstSection from "./BlogFirstSection";
import BlogSecondSection from "./BlogSecondSection";

const ManageBlog = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>
        <p className="text-gray-600 mt-2">
          Manage different sections of your blog page independently
        </p>
      </div>

      <div className="space-y-8">
        <BlogFirstSection />
        <BlogSecondSection />
      </div>
    </div>
  );
};

export default ManageBlog;
