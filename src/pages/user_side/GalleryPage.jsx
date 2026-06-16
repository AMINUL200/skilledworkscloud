import React, { useState, useEffect } from 'react';
import {
  Search,
  Grid3x3,
  LayoutList,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Calendar,
  User,
  Tag,
  Download,
  ZoomIn,
  X,
  Image as ImageIcon,
  Video,
  Building2,
  ArrowDown,
} from 'lucide-react';

// Sample gallery data for company showcase
const galleryData = [
  {
    id: 1,
    title: "Corporate Headquarters",
    category: "Office",
    type: "image",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
    description: "Modern corporate headquarters featuring state-of-the-art facilities",
    date: "2024-06-15",
    author: "Marketing Team",
    views: 1247,
    likes: 89,
    tags: ["Headquarters", "Corporate", "Modern"]
  },
  {
    id: 2,
    title: "Team Collaboration Space",
    category: "Office",
    type: "image",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
    description: "Open collaborative workspace designed for innovation and teamwork",
    date: "2024-06-12",
    author: "Design Team",
    views: 983,
    likes: 67,
    tags: ["Workspace", "Collaboration", "Design"]
  },
  {
    id: 3,
    title: "Annual Company Event",
    category: "Events",
    type: "image",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop",
    description: "Annual company gathering celebrating achievements and milestones",
    date: "2024-06-10",
    author: "Events Team",
    views: 2156,
    likes: 156,
    tags: ["Event", "Celebration", "Team"]
  },
  {
    id: 4,
    title: "Executive Board Meeting",
    category: "Meetings",
    type: "image",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop",
    description: "Strategic board meeting discussing company vision and growth",
    date: "2024-06-08",
    author: "Executive Team",
    views: 876,
    likes: 54,
    tags: ["Meeting", "Strategy", "Leadership"]
  },
  {
    id: 5,
    title: "Product Launch Event",
    category: "Events",
    type: "image",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&auto=format&fit=crop",
    description: "Successful product launch showcasing innovation and excellence",
    date: "2024-06-05",
    author: "Product Team",
    views: 1543,
    likes: 112,
    tags: ["Launch", "Product", "Innovation"]
  },
  {
    id: 6,
    title: "Employee Wellness Program",
    category: "Culture",
    type: "image",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop",
    description: "Comprehensive wellness program promoting work-life balance",
    date: "2024-06-03",
    author: "HR Team",
    views: 654,
    likes: 43,
    tags: ["Wellness", "Culture", "Employee"]
  },
  {
    id: 7,
    title: "Innovation Lab",
    category: "Facilities",
    type: "image",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop",
    description: "Cutting-edge innovation lab driving technological advancement",
    date: "2024-05-30",
    author: "R&D Team",
    views: 765,
    likes: 56,
    tags: ["Innovation", "Research", "Technology"]
  },
  {
    id: 8,
    title: "Team Building Activity",
    category: "Culture",
    type: "image",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop",
    description: "Team building activities strengthening company culture and bonds",
    date: "2024-05-28",
    author: "Culture Team",
    views: 543,
    likes: 38,
    tags: ["Team Building", "Culture", "Activity"]
  },
  {
    id: 9,
    title: "Corporate Social Responsibility",
    category: "Community",
    type: "image",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
    description: "Community engagement through corporate social responsibility initiatives",
    date: "2024-05-25",
    author: "CSR Team",
    views: 432,
    likes: 29,
    tags: ["CSR", "Community", "Impact"]
  },
  {
    id: 10,
    title: "Award Ceremony",
    category: "Events",
    type: "image",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop",
    description: "Celebrating excellence and achievements at annual awards ceremony",
    date: "2024-05-22",
    author: "Awards Committee",
    views: 389,
    likes: 24,
    tags: ["Awards", "Recognition", "Excellence"]
  },
  {
    id: 11,
    title: "Modern Conference Room",
    category: "Facilities",
    type: "image",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&auto=format&fit=crop",
    description: "State-of-the-art conference room for client meetings and presentations",
    date: "2024-05-20",
    author: "Facilities Team",
    views: 892,
    likes: 71,
    tags: ["Conference", "Facilities", "Professional"]
  },
  {
    id: 12,
    title: "Global Team Celebration",
    category: "Culture",
    type: "image",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop",
    description: "Global team celebration connecting employees worldwide",
    date: "2024-05-18",
    author: "Global Team",
    views: 1234,
    likes: 98,
    tags: ["Global", "Celebration", "Team"]
  }
];

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortBy, setSortBy] = useState('latest');

  // Get unique categories
  const categories = ['All', ...new Set(galleryData.map(item => item.category))];

  // Filter and sort items
  const filteredItems = galleryData
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'popular') return b.views - a.views;
      if (sortBy === 'likes') return b.likes - a.likes;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const openLightbox = (item) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Half Screen Height */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
             

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Our <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Visual</span> Story
              </h1>
              
              <p className="text-base md:text-lg text-white/80 max-w-2xl mb-6 leading-relaxed">
                Explore moments that define our culture, innovation, and commitment to excellence. 
                A glimpse into our journey of growth and success.
              </p>

              {/* Stats Row - Compact */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="text-xl md:text-2xl font-bold text-white">50+</div>
                  <div className="text-xs md:text-sm text-white/60">Events Captured</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="text-xl md:text-2xl font-bold text-white">10+</div>
                  <div className="text-xs md:text-sm text-white/60">Years Journey</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="text-xl md:text-2xl font-bold text-white">200+</div>
                  <div className="text-xs md:text-sm text-white/60">Team Members</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="text-xl md:text-2xl font-bold text-white">1000+</div>
                  <div className="text-xs md:text-sm text-white/60">Projects Delivered</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 rounded-full bg-white/50" />
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="likes">Most Liked</option>
              </select>

              {/* View Mode */}
              <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <LayoutList size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentItems.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No images found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            {/* Items Counter */}
            <div className="text-sm text-gray-500 mb-6">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredItems.length)} of {filteredItems.length} items
            </div>

            {/* Grid/List View */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${
                    viewMode === 'list' ? 'flex gap-6 p-4' : ''
                  }`}
                >
                  {/* Image Container */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0 rounded-xl' : 'aspect-[4/3]'} bg-gradient-to-br from-gray-100 to-gray-200`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <button
                          onClick={() => openLightbox(item)}
                          className="w-full py-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white font-medium text-sm hover:bg-white/30 transition-all flex items-center justify-center gap-2"
                        >
                          <ZoomIn size={16} />
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs flex items-center gap-1">
                      {item.type === 'video' ? <Video size={12} /> : <ImageIcon size={12} />}
                      {item.type}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-blue-600/90 backdrop-blur-sm text-white text-xs font-medium">
                      {item.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
                    <h3 className={`font-semibold text-gray-800 mb-1 ${viewMode === 'list' ? 'text-lg' : 'text-base'} line-clamp-1`}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {item.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={12} className="fill-red-500 text-red-500" />
                        {item.likes}
                      </span>
                    </div>

                    {viewMode === 'list' && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {filteredItems.length > itemsPerPage && (
              <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600">Items per page:</label>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-white hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, idx) => {
                      const page = idx + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-xl font-medium transition-all ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                                : 'hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="w-10 h-10 flex items-center justify-center text-gray-400">
                            …
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-gray-200 hover:bg-white hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg p-4 animate-fadeIn"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
            >
              <X size={24} />
            </button>

            <div className="grid md:grid-cols-2 h-full">
              {/* Image */}
              <div className="relative bg-gray-100 min-h-[300px] md:min-h-0">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs">
                    {selectedImage.category}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs">
                    {selectedImage.type}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {selectedImage.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedImage.description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <User size={16} className="text-blue-600" />
                      {selectedImage.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar size={16} className="text-blue-600" />
                      {new Date(selectedImage.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-2">
                      <Eye size={16} className="text-gray-400" />
                      {selectedImage.views} views
                    </span>
                    <span className="flex items-center gap-2">
                      <Heart size={16} className="text-red-400" />
                      {selectedImage.likes} likes
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <Download size={18} />
                      Download Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-20px); }
          60% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;