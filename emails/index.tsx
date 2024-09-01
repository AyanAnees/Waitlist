import * as React from "react";
import { Html, Body, Tailwind } from "@react-email/components";
// ? add more props
interface EmailTemplateProps {
  firstName: string;
  lastName: string;
}

export default function EmailTemplate({
  firstName = "User",
  lastName = "",
}: EmailTemplateProps) {
  return (
    <Tailwind>
      <div className="bg-gray-100 p-6 h-screen">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, {firstName} {lastName}!
          </h1>
          <p className="mt-4 text-gray-600">
            Thank you for joining the waitlist for Student Innovator Hub! We're
            excited to have you on board. You'll be the first to know when we
            launch. Stay tuned for more updates!
          </p>
          <div className="mt-6">
            <a
              href="/" // Href for the website here
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Visit Our Website
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            If you have any questions, feel free to reach out to us at
            {/*! change the email here */}
            support@yourwebsite.com.
          </p>
          <p className="mt-4 text-sm text-gray-500">Best regards,</p>
          {/* change the name here */}
          <p className="text-sm text-gray-500">
            The Student Innovator Hub Team
          </p>
        </div>
      </div>
    </Tailwind>
  );
}

// export default function EmailTemplate({
//   firstName,
//   lastName,
// }: EmailTemplateProps) {
//   return (
//     <Html>
//       <Body style={{ backgroundColor: '#f7fafc', padding: '24px' }}>
//         <div style={{
//           maxWidth: '600px',
//           margin: '0 auto',
//           backgroundColor: '#ffffff',
//           padding: '32px',
//           borderRadius: '8px',
//           boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//         }}>
//           <h1 style={{
//             fontSize: '24px',
//             fontWeight: '600',
//             color: '#2d3748',
//           }}>
//             Welcome, {firstName} {lastName}!
//           </h1>
//           <p style={{
//             marginTop: '16px',
//             fontSize: '16px',
//             color: '#4a5568',
//           }}>
//             Thank you for joining the waitlist for Student Innovator Hub! We're excited to have you on board. You'll be the first to know when we launch. Stay tuned for more updates!
//           </p>
//           <div style={{ marginTop: '24px' }}>
//             <a
//               href="/"
//               style={{
//                 display: 'inline-block',
//                 backgroundColor: '#3182ce',
//                 color: '#ffffff',
//                 padding: '12px 24px',
//                 borderRadius: '4px',
//                 textDecoration: 'none',
//                 fontWeight: '600',
//               }}
//             >
//               Visit Our Website
//             </a>
//           </div>
//           <p style={{
//             marginTop: '32px',
//             fontSize: '14px',
//             color: '#a0aec0',
//           }}>
//             If you have any questions, feel free to reach out to us at support@yourwebsite.com.
//           </p>
//           <p style={{
//             marginTop: '16px',
//             fontSize: '14px',
//             color: '#a0aec0',
//           }}>Best regards,</p>
//           <p style={{
//             fontSize: '14px',
//             color: '#a0aec0',
//           }}>The Student Innovator Hub Team</p>
//         </div>
//       </Body>
//     </Html>
//   );
// }
