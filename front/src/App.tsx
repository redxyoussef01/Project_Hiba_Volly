import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import CourseDetails2 from './pages/CourseDetails2';
import CourseDetails3 from './pages/CourseDetails3';
import CourseDetails4 from './pages/CourseDetails4';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Certificate from './pages/Certificate';
import Test from './pages/Test';
import Admin from './pages/AdminDashboard';
import Level1 from './pages/Level1';
import Level2 from './pages/Level2';
import Level3 from './pages/Level3';
import Level4 from './pages/Level4';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/1" element={<CourseDetails />} />
              <Route path="/courses/2" element={<CourseDetails2 />} />
              <Route path="/courses/3" element={<CourseDetails3 />} />
              <Route path="/courses/4" element={<CourseDetails4 />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/test/:courseId" element={<Test />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/level1" element={<Level1 />} />
              <Route path="/level2" element={<Level2 />} />
              <Route path="/level3" element={<Level3 />} />
              <Route path="/level4" element={<Level4 />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 