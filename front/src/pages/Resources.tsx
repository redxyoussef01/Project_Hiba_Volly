import { useState } from 'react';
import {
  FileText,
  Video,
  Image as ImageIcon,
  Download,
  Search,
  Filter,
} from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'image';
  size: string;
  category: string;
  url: string;
}

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'documents', 'videos', 'images'];

  const resources: Resource[] = [
    {
      id: 1,
      title: 'Course Syllabus',
      description: 'Complete course syllabus and learning objectives',
      type: 'pdf',
      size: '2.5 MB',
      category: 'documents',
      url: '#',
    },
    {
      id: 2,
      title: 'Introduction Video',
      description: 'Welcome video and course overview',
      type: 'video',
      size: '45 MB',
      category: 'videos',
      url: '#',
    },
    {
      id: 3,
      title: 'Course Materials',
      description: 'Additional reading materials and references',
      type: 'pdf',
      size: '5.2 MB',
      category: 'documents',
      url: '#',
    },
    {
      id: 4,
      title: 'Course Images',
      description: 'Visual aids and diagrams',
      type: 'image',
      size: '1.8 MB',
      category: 'images',
      url: '#',
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'video':
        return <Video className="h-6 w-6 text-blue-500" />;
      case 'image':
        return <ImageIcon className="h-6 w-6 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Learning Resources
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Access course materials, videos, and additional resources
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getResourceIcon(resource.type)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-500">{resource.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(resource.url, '_blank')}
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-4 text-gray-600">{resource.description}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {resource.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources; 