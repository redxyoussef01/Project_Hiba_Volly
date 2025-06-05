import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface CertificateProps {
  quizTitle: string;
  score: number;
  totalQuestions: number;
  userName: string;
  date: Date;
}

const Certificate: React.FC<CertificateProps> = ({
  quizTitle,
  score,
  totalQuestions,
  userName,
  date,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const usernameString = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
  const downloadPDF = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('certificate.pdf');
    }
  };

  return (
    <div className="relative">
      <div ref={certificateRef} className="bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="border-4 border-blue-600 p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Certificate of Completion</h1>
            <p className="text-lg mb-4">This is to certify that</p>
            <p className="text-2xl font-bold mb-4">{usernameString}</p>
            <p className="text-lg mb-4">has successfully completed</p>
            <p className="text-xl font-bold mb-4">{quizTitle}</p>
            <p className="text-lg mb-4">with a score of</p>
            <p className="text-2xl font-bold mb-4">{score}/{totalQuestions}</p>
            <div className="mt-8">
              <p className="text-lg mb-2">Date: {date.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default Certificate; 