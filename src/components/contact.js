import React, { useState, useEffect } from 'react';
import '../styles/contact.css'; // Import your CSS file
import { submitContactForm } from './apiComponents/api-contact'; // Import the function for submitting contact form
import contactData from './jsonData/contactData.json'; // Import the contact data

const Contact = () => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: ''
  });

  const toggleUserMenu = () => {
    setUserMenuVisible((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, data, error } = await submitContactForm(formData);

    if (success) {
      console.log('Form Submitted:', data);
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
    <div>
      <main>
        <div className="contact-info">
          <div className="line">
            <span>{contactData.contactInfo.title}</span>
          </div>
          <p>{contactData.contactInfo.content}</p>
        </div>
        <div className="user-input">
          <form onSubmit={handleSubmit}>
            <div className="left">
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First name"
                value={formData.first_name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="subject" style={{ color: 'black' }}>Please choose a subject:</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="" disabled>Please choose a subject</option>
                <option value="complain">Complain</option>
                <option value="compliment">Compliment</option>
                <option value="suggestion">Suggestion</option>
              </select>
            </div>
            <div className="right">
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contact;
