import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Send } from 'lucide-react';

interface FeedbackForm {
  rating: number;
  comment: string;
  recommend: boolean | null;
  improvements: string;
}

const Feedback = () => {
  const { courseId } = useParams();
  const [formData, setFormData] = useState<FeedbackForm>({
    rating: 0,
    comment: '',
    recommend: null,
    improvements: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecommendChange = (value: boolean) => {
    setFormData((prev) => ({ ...prev, recommend: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the feedback to your backend
    console.log('Feedback submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Thank You for Your Feedback!
            </h2>
            <p className="text-gray-600 mb-6">
              Your feedback helps us improve our courses and provide better learning
              experiences for all students.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Submit Another Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Course Feedback
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate this course?
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingChange(rating)}
                    className={`p-2 rounded-full ${
                      formData.rating >= rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    } hover:text-yellow-400 transition-colors`}
                  >
                    <Star className="h-8 w-8" fill={formData.rating >= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Comments
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                value={formData.comment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Share your thoughts about the course..."
                required
              />
            </div>

            {/* Would Recommend */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Would you recommend this course to others?
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleRecommendChange(true)}
                  className={`px-4 py-2 rounded-md ${
                    formData.recommend === true
                      ? 'bg-green-100 text-green-800 border-green-500'
                      : 'bg-white text-gray-700 border-gray-300'
                  } border-2`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleRecommendChange(false)}
                  className={`px-4 py-2 rounded-md ${
                    formData.recommend === false
                      ? 'bg-red-100 text-red-800 border-red-500'
                      : 'bg-white text-gray-700 border-gray-300'
                  } border-2`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Improvements */}
            <div>
              <label
                htmlFor="improvements"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                What could we improve?
              </label>
              <textarea
                id="improvements"
                name="improvements"
                rows={3}
                value={formData.improvements}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Share your suggestions for improvement..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback; 