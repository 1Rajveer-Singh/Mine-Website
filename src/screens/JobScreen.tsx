import React from 'react';

export default function JobScreen() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl text-black mb-6 text-center">Job Opening</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
          <div className="font-semibold text-black">Position Required</div>
          <div className="text-black">Software Engineer</div>
          <div className="font-semibold text-black">Functional Area</div>
          <div className="text-black">IT Software - Application Programming, Maintenance</div>
          <div className="font-semibold text-black">Role</div>
          <div className="text-black">Software Developer, Manual Tester & Technical Writer.</div>
          <div className="font-semibold text-black">Key Skills</div>
          <div className="text-black">Win Forms (VB.Net, C#.Net), ASP.Net, Javascript, MS SQL.</div>
          <div className="font-semibold text-black">Posted Date</div>
          <div className="text-black">September 12, 2013</div>
        </div>
        <div className="mt-6 text-lg text-black text-center">
          Interested candidates please email your CV to{' '}
          <a href="mailto:career@earthresourcetechnology.com" className="text-blue-700 font-semibold underline">career@earthresourcetechnology.com</a>
        </div>
      </div>
    </div>
  );
} 