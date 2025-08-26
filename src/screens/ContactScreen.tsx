import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
};

const ContactScreen: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setForm(initialForm);
      setSubmitted(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 flex items-center justify-center bg-blue-900 text-white">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-lg">Get in Touch with Our Mining Experts</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto mt-12 mb-16 bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-black">Send Us a Message</h2>
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">Thank you! Your message has been sent.</div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-black">Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.name && submitted ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.name && submitted && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>
            <div>
              <label className="block mb-1 font-medium text-black">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email && submitted ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.email && submitted && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>
            <div>
              <label className="block mb-1 font-medium text-black">Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-black">Company</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Enter your company name"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block mb-1 font-medium text-black">Message *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Type your message here"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.message && submitted ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.message && submitted && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
          </div>
          <button
            type="submit"
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Find Us Section */}
      <div className="max-w-4xl mx-auto mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-8 text-center text-black">Find Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Jodhpur Location */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <div>
                <div className="font-bold text-lg text-black">Earth Resource Technology</div>
                <div className="text-sm text-gray-700">'SUKIRAN', A-1, Vijay Nagar,<br/>New Pali Road, Jodhpur, Rajasthan - 342001</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-700 flex items-center gap-6">
                Email: <a href="mailto:sbhandari@earthresourcetechnology.com" className="text-blue-600 hover:underline">sbhandari@earthresourcetechnology.com</a><br/>
                 
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h9.04a2 2 0 001.83-1.3L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" /></svg>
              </span>
              <div className="text-sm text-gray-700">Phone: <a href="tel:0291-2624063" className="text-blue-600 hover:underline">0291 - 2624063</a></div>
            </div>
            <div className="mt-2">
              <div className="font-bold text-black">Prof. Sushil Bhandari</div>
              <div className="text-gray-700">Director</div>
            </div>
          </div>
          {/* Australia Location */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <div>
                <div className="font-bold text-lg text-black">Australia Office</div>
                <div className="text-sm text-gray-700">34 Gleeson Drive Bundoora, Victoria, Australia - 3083</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-700">Email: <a href="mailto:reema@earthresourcetechnology.com" className="text-blue-600 hover:underline">reema@earthresourcetechnology.com</a></div>
            </div>
            <div className="flex items-center gap-4 mt-4 justify-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg className="w-7 h-7 text-blue-600 hover:text-blue-800 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg className="w-7 h-7 text-blue-700 hover:text-blue-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.068 0-1.143.925-2.069 2.069-2.069 1.143 0 2.068.926 2.068 2.069 0 1.142-.925 2.068-2.068 2.068zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Map Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Our Location</h2>
        <div className="w-full h-96 rounded-xl overflow-hidden border border-gray-300 shadow">
          <iframe
            title="Google Map - Jodhpur"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3520.222857935548!2d73.0110223150616!3d26.27371498341095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418d6e0e0e0e0e%3A0x7e4e4e4e4e4e4e4e!2sNew%20Pali%20Road%2C%20Vijay%20Nagar%2C%20Jodhpur%2C%20Rajasthan%20342001%2C%20India!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen; 