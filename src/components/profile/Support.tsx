import React, { useState } from 'react';
import {
  FaQuestionCircle, FaEnvelope, FaPhone, FaComments, FaBook,
  FaVideo, FaDownload, FaSearch, FaChevronDown, FaChevronUp,
  FaExternalLinkAlt, FaHeadset, FaClock, FaCheckCircle
} from 'react-icons/fa';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  createdDate: string;
  lastUpdate: string;
}

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'help' | 'contact' | 'tickets'>('help');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    priority: 'medium',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I install the Blast Designer Pro software?',
      answer: 'Download the installer from your account dashboard, run it as administrator, and follow the installation wizard. Make sure your system meets the minimum requirements: Windows 10 or later, 8GB RAM, and 2GB free disk space.',
      category: 'Software'
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely through our encrypted payment gateway.',
      category: 'Billing'
    },
    {
      id: '3',
      question: 'How can I update my software to the latest version?',
      answer: 'Open your software and go to Help > Check for Updates, or download the latest version from your account dashboard. Your license will automatically work with the new version.',
      category: 'Software'
    },
    {
      id: '4',
      question: 'Do you offer training for new users?',
      answer: 'Yes! We provide comprehensive training programs including online tutorials, live webinars, and on-site training for enterprise customers. Check our Training section for available courses.',
      category: 'Training'
    },
    {
      id: '5',
      question: 'What is your refund policy?',
      answer: 'We offer a 30-day money-back guarantee for all software purchases. If you\'re not satisfied, contact our support team within 30 days of purchase for a full refund.',
      category: 'Billing'
    },
    {
      id: '6',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. The link expires in 24 hours for security.',
      category: 'Account'
    }
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: 'TKT-2024-001',
      subject: 'Software installation issue',
      category: 'Technical',
      priority: 'high',
      status: 'in-progress',
      createdDate: '2024-01-15',
      lastUpdate: '2024-01-16'
    },
    {
      id: 'TKT-2024-002',
      subject: 'License activation problem',
      category: 'Licensing',
      priority: 'medium',
      status: 'resolved',
      createdDate: '2024-01-10',
      lastUpdate: '2024-01-12'
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    alert('Your message has been sent! We\'ll get back to you within 24 hours.');
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      category: 'general',
      priority: 'medium',
      message: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Help & Support</h1>
        <p className="text-gray-600 text-sm sm:text-base">Get the help you need with our comprehensive support resources</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 mb-6 sm:mb-8 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('help')}
          className={`py-2 sm:py-3 px-3 sm:px-4 rounded-md font-medium transition-all duration-300 text-sm sm:text-base ${
            activeTab === 'help'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FaQuestionCircle className="inline mr-2" size={16} />
          Help Center
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`py-2 sm:py-3 px-3 sm:px-4 rounded-md font-medium transition-all duration-300 text-sm sm:text-base ${
            activeTab === 'contact'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FaEnvelope className="inline mr-2" size={16} />
          Contact Us
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
            activeTab === 'tickets'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FaHeadset className="inline mr-2" size={16} />
          My Tickets
        </button>
      </div>

      {/* Help Center Tab */}
      {activeTab === 'help' && (
        <div className="space-y-8">
          {/* Quick Help Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="text-center">
                <FaBook className="mx-auto text-blue-500 mb-4" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Documentation</h3>
                <p className="text-gray-600 text-sm">Comprehensive guides and manuals</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="text-center">
                <FaVideo className="mx-auto text-green-500 mb-4" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Video Tutorials</h3>
                <p className="text-gray-600 text-sm">Step-by-step video guides</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="text-center">
                <FaDownload className="mx-auto text-purple-500 mb-4" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Downloads</h3>
                <p className="text-gray-600 text-sm">Software and resources</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="text-center">
                <FaComments className="mx-auto text-orange-500 mb-4" size={32} />
                <h3 className="font-semibold text-gray-800 mb-2">Community</h3>
                <p className="text-gray-600 text-sm">User forums and discussions</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            
            {/* Search */}
            <div className="relative mb-6">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{faq.question}</h3>
                      <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {faq.category}
                      </span>
                    </div>
                    {expandedFAQ === faq.id ? (
                      <FaChevronUp className="text-gray-400" size={16} />
                    ) : (
                      <FaChevronDown className="text-gray-400" size={16} />
                    )}
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-4 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Us Tab */}
      {activeTab === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FaEnvelope className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Email Support</h3>
                    <p className="text-gray-600">support@miningtech.com</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FaPhone className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Phone Support</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaClock className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday</p>
                    <p className="text-sm text-gray-500">9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={contactForm.category}
                    onChange={(e) => setContactForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing</option>
                    <option value="training">Training</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) => setContactForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Please describe your issue or question..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 font-medium"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* My Tickets Tab */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          {supportTickets.length === 0 ? (
            <div className="text-center py-12">
              <FaHeadset className="mx-auto text-gray-300 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No support tickets</h3>
              <p className="text-gray-500">You haven't submitted any support tickets yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">{ticket.subject}</h3>
                      <p className="text-sm text-gray-600">Ticket ID: {ticket.id}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Category:</span> {ticket.category}
                    </div>
                    <div>
                      <span className="font-medium">Created:</span> {new Date(ticket.createdDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Last Update:</span> {new Date(ticket.lastUpdate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      View Details <FaExternalLinkAlt className="inline ml-1" size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Support;
