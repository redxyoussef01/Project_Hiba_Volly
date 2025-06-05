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
import Contact from './pages/Contact';
import Certificate from './pages/Certificate';
import Test from './pages/Test';
import Admin from './pages/AdminDashboard';
import Level1 from './pages/Level1';
import Level2 from './pages/Level2';
import Level3 from './pages/Level3';
import Level4 from './pages/Level4';
import Result from './pages/Result';
import Certificates from './pages/Certificates';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected Course Routes */}
              <Route 
                path="/courses" 
                element={
                  <ProtectedRoute>
                    <Courses />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/courses/1" 
                element={
                  <ProtectedRoute>
                    <CourseDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/courses/2" 
                element={
                  <ProtectedRoute>
                    <CourseDetails2 />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/courses/3" 
                element={
                  <ProtectedRoute>
                    <CourseDetails3 />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/courses/4" 
                element={
                  <ProtectedRoute>
                    <CourseDetails4 />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Certificate Routes */}
              <Route 
                path="/certificate" 
                element={
                  <ProtectedRoute>
                    <Certificate />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/certificates" 
                element={
                  <ProtectedRoute>
                    <Certificates />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Test Routes */}
              <Route 
                path="/test/:id" 
                element={
                  <ProtectedRoute>
                    <Test />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/result" 
                element={
                  <ProtectedRoute>
                    <Result />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Admin Route */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="Professeur">
                    <Admin />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Level Routes */}
              <Route 
                path="/level1" 
                element={
                  <ProtectedRoute>
                    <Level1 />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/level2" 
                element={
                  <ProtectedRoute>
                    <Level2 />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/level3" 
                element={
                  <ProtectedRoute>
                    <Level3 />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/level4" 
                element={
                  <ProtectedRoute>
                    <Level4 />
                  </ProtectedRoute>
                } 
              />

              {/* 404 Route - Must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 