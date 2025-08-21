import React, { useState } from 'react';

export default function CourseRegistrationScreen() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    company: '',
    city: '',
    country: '',
    state: '',
    course: 'workshop',
    payment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setForm({
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      company: '',
      city: '',
      country: '',
      state: '',
      course: 'workshop',
      payment: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration submitted! (No backend yet)');
  };

  return (
    <div className="min-h-screen py-8 text-black bg-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-2 text-black">Course Registration Form</h1>
        <p className="mb-6 text-lg text-black">Please fill all the details below:</p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-black">First Name:
              <input name="firstName" value={form.firstName} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1 text-black" />
            </label>
            <label className="font-semibold text-black">Contact Number:
              <input name="contactNumber" value={form.contactNumber} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1 text-black" />
            </label>
            <label className="font-semibold text-black">Company Name:
              <input name="company" value={form.company} onChange={handleChange} className="block w-full border rounded px-2 py-1 mt-1 text-black" />
            </label>
            <label className="font-semibold text-black">City:
              <input name="city" value={form.city} onChange={handleChange} className="block w-full border rounded px-2 py-1 mt-1 text-black" />
            </label>
            <div>
              <div className="font-semibold text-black">Course(s) you are registering for:</div>
              <label className="flex items-center mt-1 text-black">
                <input type="radio" name="course" value="workshop" checked={form.course === 'workshop'} onChange={handleChange} className="mr-2" />
                Workshop on Advanced technology for blasting with emphasis on computer and mobile application
              </label>
            </div>
            <div className="text-red-600 mt-2">* Required Fields</div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-black">Last Name:
              <input name="lastName" value={form.lastName} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1 text-black" />
            </label>
            <label className="font-semibold text-black">Email ID:
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1 text-black" />
            </label>
            <label className="font-semibold text-black">Country:
              <select name="country" value={form.country} onChange={handleChange} required className="block w-full border rounded px-2 py-1 mt-1 text-black">
                <option value="">--Select--</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label className="font-semibold text-black">State:
              <input name="state" value={form.state} onChange={handleChange} className="block w-full border rounded px-2 py-1 mt-1 text-black" />
            </label>
            <div>
              <div className="font-semibold text-black">Payment option:</div>
              <label className="flex items-center mt-1 text-black">
                <input type="radio" name="payment" value="draft" checked={form.payment === 'draft'} onChange={handleChange} className="mr-2" />
                Draft\Cheque
              </label>
              <label className="flex items-center mt-1 text-black">
                <input type="radio" name="payment" value="netbanking" checked={form.payment === 'netbanking'} onChange={handleChange} className="mr-2" />
                NetBanking
              </label>
            </div>
          </div>
          <div className="col-span-2 flex gap-4 mt-4">
            <button type="submit" className="bg-cyan-600 text-white px-6 py-2 rounded shadow hover:bg-cyan-700 font-bold">Register</button>
            <button type="button" onClick={handleReset} className="bg-cyan-400 text-white px-6 py-2 rounded shadow hover:bg-cyan-500 font-bold">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
} 