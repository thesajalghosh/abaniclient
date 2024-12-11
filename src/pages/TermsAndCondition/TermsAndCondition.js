import React from 'react'
import Layout from '../../layout/Layout'
import "./TermsAndCondition.css"

const TermsAndCondition = () => {
  return (
   <Layout headerEle={"Terms And Conditions"} backButton={true}>
       <div className="terms_and_condition_container">
          <p>Last update 10/12/2024</p>
          <p>Welcome to The Abani By accessing or using our website theabani.com, you agree to be bound by the following terms and conditions. Please read them carefully.</p>
          <h2>Acceptance of Terms</h2>
          <p>By using our website, you agree to comply with and be bound by these terms and conditions. If you do not agree with these terms, you should not use our website.</p>
          <h2>Eligibility</h2>
          <p>You must be at least 18 years old or have the consent of a parent or guardian to use our services. By placing an order, you represent that you meet these requirements.</p>
          <h2>Products and Services</h2>
          <ul>
              <li>Availability: All products are subject to availability. We reserve the right to limit quantities or discontinue any product without prior notice.</li>
              <li>Product Descriptions: We strive to ensure that the descriptions and images of products are accurate, but we do not guarantee that all information is error-free.</li>
              <li>Pricing: Prices are subject to change without notice. We are not responsible for typographical or pricing errors.</li>
          </ul>
          <h2>Orders and Payment</h2>
          <ul>
              <li>Order Confirmation: Once you place an order, you will receive an email confirmation. This does not guarantee acceptance of your order.</li>
              <li>Payment: We accept [list of accepted payment methods]. Payments must be completed before shipping.</li>
              <li>Cancellations: Orders can only be canceled before they are shipped.</li>

          </ul>
          <h2>Shipping and Delivery</h2>
          <ul>
              <li>Shipping Policy: Shipping costs and delivery times are calculated at checkout.</li>
              <li>Delays: We are not responsible for delays caused by external factors, such as courier delays or customs clearance.</li>
              <li>International Shipping: Customers are responsible for any customs duties, taxes, or additional fees.</li>
          </ul>
          <h2>Returns and Refunds</h2>
          <ul>
              <li>Return Policy: Products can be returned within [number] days of delivery if they meet our return conditions.</li>
              <li>Refunds: Refunds will be processed within [number] days after the returned item is received and inspected.</li>
              <li>Non-Returnable Items: Certain items, such as [list items], are not eligible for return or refund.</li>

          </ul>
          <h2>User Accounts</h2>
          <ul>
              <li>Account Creation: You may be required to create an account to access certain features.</li>
              <li>Responsibility: You are responsible for maintaining the confidentiality of your account details.</li>
              <li>Termination: We reserve the right to suspend or terminate your account for any breach of these terms.</li>
          </ul>
          <h2>Intellectual Property</h2>
          <p>All content on this website, including text, graphics, logos, and images, is the property of [Your Website Name] and is protected by copyright laws. You may not reproduce, distribute, or modify any content without written consent.</p>
          <h2>Limitation of Liability</h2>
          <p>We are not liable for any indirect, incidental, or consequential damages arising from your use of our website or purchase of products.</p>
          <h2>Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes will be resolved in the courts of India.</p>
          <h2>Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Any changes will be posted on this page with the updated date.</p>
          <h2>Contact Us</h2>
          <p>If you have any questions about these terms, please contact us at:</p>
          <ul>
              <li>Email: theabanistore@gmail.com</li>
              <li>Phone: +91 9609238676</li>
              <li>Address: Dumdum</li>
          </ul>
          <p>By using our website, you acknowledge that you have read, understood, and agreed to these terms and conditions.</p>
       </div>
   </Layout>
  )
}

export default TermsAndCondition
