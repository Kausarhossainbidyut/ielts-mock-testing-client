import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Last updated: February 2026
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using IELTS Smart Practice ("we," "our," or "us"), you accept and agree to be bound 
              by the terms and provision of this agreement. If you do not agree to abide by these terms, please 
              do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              IELTS Smart Practice provides an online platform for IELTS preparation, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Mock IELTS tests (Listening, Reading, Writing, Speaking)</li>
              <li>Progress tracking and performance analytics</li>
              <li>Tips, strategies, and educational content</li>
              <li>Study materials and resources</li>
              <li>User account management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. User Accounts and Registration</h2>
            <div className="space-y-4 text-gray-600">
              <p>To access our services, you must create an account. When registering, you agree to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any changes to your information</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Be at least 13 years of age to create an account</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. User Conduct and Rules</h2>
            <p className="text-gray-600 mb-4">You agree not to use our service to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Upload or transmit viruses or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Share your account credentials with others</li>
              <li>Copy, modify, or distribute our content without permission</li>
              <li>Use the service for any unlawful purpose</li>
              <li>Harass, abuse, or harm other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Intellectual Property Rights</h2>
            <div className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                The content, design, graphics, and other materials on our Platform are owned by IELTS Smart Practice 
                or our licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not copy, reproduce, distribute, modify, display, or use our content without prior written 
                permission. All rights not expressly granted are reserved.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Payment and Subscriptions</h2>
            <div className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                Some features of our service require payment. By subscribing, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Pay all fees associated with your subscription</li>
                <li>Provide valid payment information</li>
                <li>Allow us to charge your payment method for recurring fees</li>
                <li>Understand that subscriptions automatically renew unless cancelled</li>
              </ul>
              <p>
                You may cancel your subscription at any time through your account settings. Refunds are subject to 
                our refund policy, which is available upon request.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed">
              OUR SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. 
              WE DO NOT GUARANTEE THAT OUR SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. 
              WE MAKE NO REPRESENTATIONS ABOUT THE ACCURACY, RELIABILITY, OR COMPLETENESS OF ANY RESULTS FROM 
              USING OUR SERVICE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IELTS SMART PRACTICE SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF 
              OUR SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SERVICE IN THE 
              TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Indemnification</h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to indemnify, defend, and hold harmless IELTS Smart Practice and its officers, directors, 
              employees, and agents from any claims, damages, losses, liabilities, costs, or expenses arising out 
              of or related to your use of our service or any violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Termination</h2>
            <p className="text-gray-600 leading-relaxed">
              We may terminate or suspend your account and access to our service immediately, without prior notice 
              or liability, for any reason, including breach of these Terms. Upon termination, your right to use 
              our service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the United States 
              and the State of Delaware, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will provide notice of material changes 
              by posting the updated Terms on our Platform and updating the "last updated" date. Your continued 
              use of our service after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>Email: legal@ieltssmartpractice.com</li>
              <li>Through our <Link to="/contact" className="text-blue-600 hover:underline">Contact page</Link></li>
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/contact" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
            Questions? Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;
