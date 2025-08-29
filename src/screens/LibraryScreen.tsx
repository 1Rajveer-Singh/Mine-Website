import React, { useEffect, useState } from 'react';
import { FaFilePdf, FaChartBar, FaVideo, FaFileAlt, FaBook } from 'react-icons/fa';
import PublishedScreen from './PublishedScreen';
import PaperCard from './PaperCard';
import ResourceCard from './ResourceCard';

const bookImage = 'https://api.a0.dev/assets/book.avif';

const resources = [
  {
    title: 'Sustainable Mining Practices Guide',
    description: 'Comprehensive guide to implementing environmentally responsible mining operations.',
    type: 'PDF Guide',
    size: '4.2 MB',
    icon: <FaFilePdf size={32} color="#F44336" />,
    category: 'Technical Guides',
    author: 'Dr S Bhandari',
    image: '/assets/earthresource2.jpg',
    viewLink: '/assets/book1.pdf',
    downloadLink: '/assets/book1.pdf',
  },
  {
    title: 'Gold Mine Optimization Case Study',
    description: 'How we helped increase extraction efficiency by 35% at a major gold mine in Australia.',
    type: 'Case Study',
    size: '2.8 MB',
    icon: <FaChartBar size={32} color="#4CAF50" />,
    category: 'Case Studies',
    author: '',
    image: '/assets/pdf-icon.png',
    viewLink: '',
    downloadLink: '',
  },
  {
    title: 'Blast Design Optimization Webinar',
    description: 'Recorded webinar on advanced techniques for optimizing blast patterns and reducing environmental impact.',
    type: 'Video',
    size: '45 min',
    icon: <FaVideo size={32} color="#FF9800" />,
    category: 'Other',
    author: '',
    image: '/assets/pdf-icon.png',
    viewLink: '',
    downloadLink: '',
  },
  {
    title: 'Environmental Impact Assessment Framework',
    description: 'Standardized framework for conducting comprehensive environmental impact assessments for mining projects.',
    type: 'White Paper',
    size: '3.5 MB',
    icon: <FaFileAlt size={32} color="#1E88E5" />,
    category: 'White Papers',
    author: '',
    image: '/assets/pdf-icon.png',
    viewLink: '',
    downloadLink: '',
  },
  {
    title: 'Safety Protocols for Underground Mining',
    description: 'Comprehensive safety guidelines and protocols for underground mining operations.',
    type: 'PDF Guide',
    size: '5.1 MB',
    icon: <FaFilePdf size={32} color="#F44336" />,
    category: 'Technical Guides',
    author: 'Dr S Bhandari',
    image: '/assets/earthresource2.jpg',
    viewLink: '/assets/book1.pdf',
    downloadLink: '/assets/book1.pdf',
  },
  {
    title: 'Water Management in Copper Mining',
    description: 'Case study on implementing sustainable water management practices at a copper mine in Chile.',
    type: 'Case Study',
    size: '3.2 MB',
    icon: <FaChartBar size={32} color="#4CAF50" />,
    category: 'Case Studies',
    author: '',
    image: '/assets/pdf-icon.png',
    viewLink: '',
    downloadLink: '',
  },
  {
    title: 'Blast Information Management System Manual',
    description: 'Comprehensive user manual for our Blast Information Management System software.',
    type: 'Manual',
    size: '8.7 MB',
    icon: <FaBook size={32} color="#9C27B0" />,
    category: 'Technical Guides',
    author: '',
    image: '/assets/pdf-icon.png',
    viewLink: '',
    downloadLink: '',
  },
  {
    title: 'Vibration Pattern Analyzer Guide',
    description: 'Technical documentation for using our Vibration Pattern Analyzer software.',
    type: 'Manual',
    size: '6.3 MB',
    icon: <FaBook size={32} color="#9C27B0" />,
    category: 'Technical Guides',
    author: '',
    image: '/assets/pdf-icon.png',
    viewLink: '',
    downloadLink: '',
  },
  {
    title: 'Surface Operations Designer Documentation',
    description: 'Technical guide for implementing and using our Surface Operations Designer software.',
    type: 'Manual',
    size: '7.5 MB',
    icon: <FaBook size={32} color="#9C27B0" />,
    category: 'Technical Guides',
    author: '',
    image: '/assets/pdf-icon.png',
    viewLink: '',
    downloadLink: '',
  },
];

const categories = ['All', 'Published', 'Research'];

// Add publication data for Published section
const publications = [
  {
    title: 'Burden and Spacing Relationships in the design of Blasting Patterns',
    authors: '',
  },
  {
    title: 'Post-blast studies of jointed rocks',
    authors: 'S. Bhandari, and R. Badal',
  },
  {
    title: 'On the role of stress waves and quasi-static gas pressure in rock fragmentation by blasting',
    authors: 'Bhandari',
  },
  {
    title: 'Controlled Fracture Growth by Blasting While Protecting Damages to Remaining Rock',
    authors: 'S. S. Rathore and S. Bhandari',
  },
  {
    title: 'Modelling of Near-Source Dust Dispersal from Surface Mine Blasting in Weak Wind and Tropical conditions',
    authors: '',
  },
];

// Minimal paper data for card rendering
const papers = [
  {
    title: 'Engineering Rock Blasting Operations',
    authors: 'Dr S Bhandari',
    image: '/assets/earthresource2.jpg',
    download: '/assets/book1.pdf',
  },
  {
    title: 'Controlling Adverse Environmental Effects of Blasting',
    authors: '',
    image: '/assets/pdf-icon.png',
    download: '/assets/controlling_adverse.pdf',
  },
  {
    title: 'Improving blasting operations using data Management and Analysis',
    authors: '',
    image: '/assets/pdf-icon.png',
    download: '/assets/improving_blasting.pdf',
  },
  {
    title: 'Controlling Measures of Damages due to Various Blasting Techniques in Spittable Sandstone Quarry during Extracting',
    authors: 'Dr SS Rathore and Dr S Bhandari [http://www.ieindia.org]',
    image: '/assets/pdf-icon.png',
    download: '/assets/controlling_measures.pdf',
  },
  {
    title: 'Influence of Joint Directions in Blasting- Dr. Sushil Bhandari',
    authors: '[www.isee.org]',
    image: '/assets/pdf-icon.png',
    download: '/assets/influence_joint_directions.pdf',
  },
  {
    title: 'Technology for safety And environment control in blasting operations',
    authors: '4th Asia Pacific Symposium On Blasting Techniques,New Development on Engineering Blasting,2014',
    image: '/assets/pdf-icon.png',
    download: '/assets/technology_for_safety.pdf',
  },
  {
    title: 'Data Management For Improved Blasting & Productivity',
    authors: '',
    image: '/assets/pdf-icon.png',
    download: '/assets/data_management.pdf',
  },
  {
    title: 'Managing Blasting and Sociological Impact',
    authors: '',
    image: '/assets/pdf-icon.png',
    download: '/assets/managing_blasting.pdf',
  },
];

export default function LibraryScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [localCartItems, setLocalCartItems] = useState<any[]>([]);

  // Listen for cart updates from the Header
  useEffect(() => {
    const handleCartUpdate = (event: any) => {
      setLocalCartItems(event.detail.cartItems || []);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    // Initialize with current cart items
    if ((window as any).getCartItems) {
      setLocalCartItems((window as any).getCartItems());
    }

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Filter resources by selected category
  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter(r => r.category === selectedCategory);

  const handleAddToCart = (paper: any, idx: number) => {
    const cartItem = {
      id: idx + 1000, // Unique ID for papers
      name: paper.title,
      price: 0, // Free resources
      image: paper.image,
      type: 'Research Paper'
    };

    if ((window as any).addToCart) {
      (window as any).addToCart(cartItem);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Removed rotating background images, replaced with static book background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" style={{ zIndex: 1 }} />
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-16">
          <div className="relative w-full flex items-center justify-center" style={{ minHeight: '320px' }}>
            <div className="relative z-10 w-full flex flex-col items-center justify-center py-16">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg text-center">Resource Library</h1>
              <p className="text-2xl text-orange-300 font-medium mb-2 text-center">Mining Knowledge & Technical Resources</p>
              <h2 className="text-2xl font-extrabold text-blue-700 text-center mt-2">
                <a href="/course-registration" className="hover:underline hover:text-blue-900 transition-colors">Online Course Registration</a>
              </h2>
            </div>
          </div>
        </section>
        {/* Search Section */}
        <section className="max-w-3xl mx-auto p-4 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search resources..."
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition">Search</button>
        </section>
        {/* Resource Categories */}
        <section className="max-w-3xl mx-auto p-4 flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full font-bold border ${selectedCategory === cat ? 'bg-orange-500 text-white border-orange-500' : 'bg-transparent text-white border-white'} hover:scale-105 transition-transform`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </section>
        {/* Library Paper Cards - With Add to Cart Button */}
        <div className="max-w-5xl mx-auto mt-8">
          {papers.map((paper, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white rounded-xl shadow p-4 mb-4">
              <img src={paper.image} alt={paper.title} className="w-10 h-10 object-cover rounded mt-1" />
              <div className="flex-1">
                <div className="font-bold text-lg text-gray-900">{paper.title}</div>
                {paper.authors && <div className="text-gray-700 text-sm mb-1">Author(s): {paper.authors}</div>}
                <div className="flex gap-2 mt-2">
                  <a
                    href={paper.download}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                  >
                    View
                  </a>
                  <a
                    href={paper.download}
                    download
                    className="inline-block bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => handleAddToCart(paper, idx)}
                    className="inline-block bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Research Papers Section */}
        {/* Removed Featured Research Papers section as requested */}
        {/* Can't Find Resource Section */}
        <section className="w-full py-6">
          <div className="max-w-7xl mx-auto rounded-2xl shadow-xl px-8 py-6 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-white">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-center text-white mb-6">Our team can help you find the specific mining resources you need. Contact us with your requirements, and we'll assist you in locating the right information.</p>
            <a href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-2xl px-10 py-4 rounded-lg shadow transition">Request Resource</a>
          </div>
        </section>
      </div>
    </div>
  );
} 