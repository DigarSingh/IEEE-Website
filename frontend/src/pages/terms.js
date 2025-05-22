import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <Layout>
      <Head>
        <title>Terms of Service | IEEE GEU</title>
        <meta name="description" content="Terms and conditions for using IEEE GEU services and website" />
      </Head>

      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-10 text-center">
              <h1 className="mb-2 text-4xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-sm">
              <div className="prose prose-lg max-w-none">
                <h2>Introduction</h2>
                <p>
                  Welcome to IEEE GEU Student Branch website. These Terms of Service ("Terms") govern your access to and use of 
                  our website, services, and applications (collectively, the "Services"), including any content, functionality, 
                  and services offered on or through our website.
                </p>
                <p>
                  By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, 
                  you must not access or use our Services.
                </p>

                <h2>User Accounts and Registration</h2>
                <h3>Account Creation</h3>
                <p>
                  To access certain features of our Services, you may be required to register for an account. When you register, 
                  you agree to provide accurate, current, and complete information as prompted by our registration forms.
                </p>
                <p>
                  You are responsible for:
                </p>
                <ul>
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Immediately notifying us of any unauthorized use of your account</li>
                </ul>

                <h3>Login and Authentication</h3>
                <p>
                  Our login system is designed to protect your account information. When using our authentication services:
                </p>
                <ul>
                  <li>Never share your password with anyone</li>
                  <li>Use a strong, unique password</li>
                  <li>Log out from your account when using shared computers</li>
                  <li>Report any suspicious activity immediately</li>
                </ul>
                <p>
                  We may implement additional security measures, such as two-factor authentication, to protect your account.
                </p>

                <h2>Membership Terms</h2>
                <p>
                  If you apply for IEEE GEU membership through our Services:
                </p>
                <ul>
                  <li>Membership is subject to eligibility requirements and approval</li>
                  <li>Membership fees, if applicable, are non-refundable unless otherwise stated</li>
                  <li>Members must comply with IEEE code of conduct and policies</li>
                  <li>Membership may be terminated for violation of these Terms or IEEE policies</li>
                </ul>

                <h2>Intellectual Property Rights</h2>
                <p>
                  The Services and their entire contents, features, and functionality (including but not limited to all information, 
                  software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof), are owned 
                  by IEEE GEU Student Branch, its licensors, or other providers of such material and are protected by copyright, 
                  trademark, and other intellectual property laws.
                </p>
                <p>
                  You may not:
                </p>
                <ul>
                  <li>Reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, 
                  download, store, or transmit any of the material on our Services without our express written consent</li>
                  <li>Use any illustrations, photographs, video or audio sequences, or any graphics separately from the accompanying text</li>
                  <li>Delete or alter any copyright, trademark, or other proprietary rights notices from copies of materials from the Services</li>
                </ul>

                <h2>Prohibited Uses</h2>
                <p>
                  You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to use our Services:
                </p>
                <ul>
                  <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
                  <li>To impersonate or attempt to impersonate IEEE GEU, an IEEE employee, another user, or any other person or entity</li>
                  <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services</li>
                  <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Services, the server on which the 
                  Services are stored, or any server, computer, or database connected to the Services</li>
                  <li>To attack the Services via a denial-of-service attack or a distributed denial-of-service attack</li>
                  <li>To use automated means (such as harvesting bots, robots, spiders, or scrapers) to access or collect data from the Services</li>
                </ul>

                <h2>User Contributions</h2>
                <p>
                  Our Services may contain message boards, forums, bulletin boards, and other interactive features that allow users to post, 
                  submit, publish, display, or transmit content or materials. Any content you post to the Services will be considered non-confidential.
                </p>
                <p>
                  You represent and warrant that:
                </p>
                <ul>
                  <li>You own or control all rights in and to the content you post</li>
                  <li>All content you post complies with these Terms</li>
                  <li>Content you post does not violate the rights of any third party</li>
                </ul>
                <p>
                  We reserve the right to remove or refuse to post any user contributions for any reason.
                </p>

                <h2>Third-Party Links and Services</h2>
                <p>
                  Our Services may contain links to third-party websites or services that are not owned or controlled by IEEE GEU. 
                  We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party 
                  websites or services. You acknowledge and agree that IEEE GEU shall not be responsible or liable for any damage or loss 
                  caused by or in connection with the use of any such content, goods, or services available on or through any such websites or services.
                </p>

                <h2>Disclaimer of Warranties</h2>
                <p>
                  Your use of our Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis, without 
                  warranties of any kind, either express or implied. IEEE GEU disclaims all warranties, including but not limited to implied 
                  warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
                <p>
                  We do not warrant that:
                </p>
                <ul>
                  <li>The Services will meet your requirements</li>
                  <li>The Services will be uninterrupted, timely, secure, or error-free</li>
                  <li>The results that may be obtained from the use of the Services will be accurate or reliable</li>
                </ul>

                <h2>Limitation of Liability</h2>
                <p>
                  In no event shall IEEE GEU, its officers, directors, employees, or agents be liable for any indirect, incidental, special, 
                  consequential, or punitive damages arising out of or relating to your use of, or inability to use, the Services.
                </p>

                <h2>Termination</h2>
                <p>
                  We may terminate or suspend your account and bar access to our Services immediately, without prior notice or liability, 
                  for any reason whatsoever, including without limitation if you breach these Terms.
                </p>
                <p>
                  Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may 
                  simply discontinue using the Services or contact us to request account deletion.
                </p>

                <h2>Changes to These Terms</h2>
                <p>
                  We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately when 
                  we post them. Your continued use of the Services following the posting of revised Terms means that you accept and agree to the changes.
                </p>

                <h2>Governing Law and Jurisdiction</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes relating to these Terms or your use of the Services shall be subject to the exclusive jurisdiction of the courts located in Dehradun, Uttarakhand.
                </p>

                <h2>Contact Information</h2>
                <p>
                  Questions about these Terms should be sent to us at:
                </p>
                <p>
                  <strong>Email:</strong> geu.ieee.studenbranch@gmail.com<br />
                  <strong>Address:</strong> 566/6, Bell Road, Society Area, Clement Town, Dehradun, Uttarakhand, PIN: 248002
                </p>

                <hr />
                <p className="text-center">
                  By using our Services, you acknowledge that you have read and understood these Terms and agree to be bound by them.
                </p>
                <p className="text-center">
                  For information about how we collect, use, and share your personal data, please see our{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
