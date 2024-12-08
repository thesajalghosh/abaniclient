import React from 'react';
import Layout from '../../layout/Layout';
import './HelpPage.css';

const HelpPage = () => {
  return (
      <Layout headerEle={"Help"}>
    <div className="help-container">
     
      <form className="help-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" placeholder="Enter your message"></textarea>
        </div>
        <button type="submit" className="submit-button">Send</button>
      </form>
      <div className="urgent_help_section">
          <h2>For urgent</h2>
          <div className="urgent_help_phone_email">
              <p>Phone no.</p>
              <p>+91 833456787</p>
          </div>
          <div className="urgent_help_phone_email">
              <p>Email</p>
              <p>theabanistore@gmail.com</p>
          </div>
      </div>
    </div>
      </Layout>
  );
};

export default HelpPage;

