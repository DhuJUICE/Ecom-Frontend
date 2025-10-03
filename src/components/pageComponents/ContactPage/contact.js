import React, { useState } from 'react';
import { submitContactForm } from '../../apiComponents/api-contact';
import contactData from './contactData.json';

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, data, error } = await submitContactForm(formData);

    if (success) {
      alert('Thank you for reaching out! We will get back to you soon.');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message, please try again later.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-2">{contactData.contactInfo.title}</h2>
          <p className="text-gray-700">{contactData.contactInfo.content}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left side */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <label htmlFor="subject" className="text-gray-700 font-semibold">
              Please choose a subject:
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="" disabled>
                Please choose a subject
              </option>
              <option value="complain">Complain</option>
              <option value="compliment">Compliment</option>
              <option value="suggestion">Suggestion</option>
            </select>
          </div>

          {/* Right side */}
          <div className="flex flex-col gap-4">
            <textarea
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              className="w-full h-full min-h-[200px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Contact;
