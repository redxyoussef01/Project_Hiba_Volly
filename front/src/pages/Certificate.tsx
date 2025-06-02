import React from 'react';
import { useParams } from 'react-router-dom';
import { Download, Share2, Printer } from 'lucide-react';

const Certificate = () => {
  const { courseId } = useParams();

  // Mock certificate data - in a real app, this would come from an API
  const certificateData = {
    studentName: 'John Doe',
    courseName: 'Web Development Bootcamp',
    completionDate: 'March 15, 2024',
    certificateId: 'CERT-2024-001',
    instructor: 'Jane Smith',
    grade: 'A+',
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading certificate...');
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    console.log('Sharing certificate...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Certificate Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Certificate Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center">
              Certificate of Completion
            </h1>
          </div>

          {/* Certificate Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-2">This is to certify that</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {certificateData.studentName}
              </h2>
              <p className="text-gray-600 mb-4">has successfully completed the course</p>
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                {certificateData.courseName}
              </h3>
              <p className="text-gray-600">
                with a grade of <span className="font-semibold">{certificateData.grade}</span>
              </p>
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Certificate ID</p>
                  <p className="font-medium">{certificateData.certificateId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date of Completion</p>
                  <p className="font-medium">{certificateData.completionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Instructor</p>
                  <p className="font-medium">{certificateData.instructor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Grade</p>
                  <p className="font-medium">{certificateData.grade}</p>
                </div>
              </div>
            </div>

            {/* Certificate Footer */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-5 w-5 mr-2" />
                Download
              </button>
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Printer className="h-5 w-5 mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Verification */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Verify Certificate
          </h2>
          <p className="text-gray-600 mb-4">
            To verify the authenticity of this certificate, please visit our verification
            page and enter the Certificate ID:
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={certificateData.certificateId}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm"
            />
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate; 