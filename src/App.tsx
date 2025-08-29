import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import ServicesScreen from './screens/ServicesScreen';
import ClientScreen from './screens/ClientScreen';
import ContactScreen from './screens/ContactScreen';
import PeopleScreen from './screens/PeopleScreen';
import LibraryScreen from './screens/LibraryScreen';
import SoftwareScreen from './screens/SoftwareScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MiningConsultancyScreen from './screens/MiningConsultancyScreen';
import SoftwareDevelopmentScreen from './screens/SoftwareDevelopmentScreen';
import TrainingProgramsScreen from './screens/TrainingProgramsScreen';
import BlastInformationSystemScreen from './screens/BlastInformationSystemScreen';
import VibrationAnalyzerScreen from './screens/VibrationAnalyzerScreen';
import SurfaceOperationsDesignerScreen from './screens/SurfaceOperationsDesignerScreen';
import CloudDataSyncScreen from './screens/CloudDataSyncScreen';
import EquipmentRentalScreen from './screens/EquipmentRentalScreen';
import EnvironmentalAssessmentScreen from './screens/EnvironmentalAssessmentScreen';
import PatternAnalyserScreen from './screens/PatternAnalyserScreen';
import FlyrockPredictionScreen from './screens/FlyrockPredictionScreen';
import BlastManagementScreen from './screens/BlastManagementScreen';
import BlastInformationSystemUndergroundScreen from './screens/BlastInformationSystemUndergroundScreen';
import BlastDesignerScreen from './screens/BlastDesignerScreen';
import FragmentationPredictorScreen from './screens/FragmentationPredictorScreen';
import BlastDesignerTunnelScreen from './screens/BlastDesignerTunnelScreen';
import SushilBhandariResumeScreen from './screens/SushilBhandariResumeScreen';
import JobScreen from './screens/JobScreen';
import CourseRegistrationScreen from './screens/CourseRegistrationScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileSettingsPage from './screens/ProfileSettingsPage';
import OrderHistoryPage from './screens/OrderHistoryPage';
import WishlistPage from './screens/WishlistPage';
import SupportPage from './screens/SupportPage';
import NotificationsPage from './screens/NotificationsPage';
import ProfileTestPage from './screens/ProfileTestPage';
import PaymentProfilePage from './screens/PaymentProfilePage';

// Profile Components
import {
  ProfileSettings,
  OrderHistory,
  Wishlist,
  Support,
  Notifications
} from './components/profile';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - authToken:', localStorage.getItem('authToken'));
  
  if (!isAuthenticated) {
    console.log('ProtectedRoute - Redirecting to home due to no auth');
    // Redirect to home page which will show the login modal
    return <Navigate to="/" replace />;
  }
  
  console.log('ProtectedRoute - Allowing access to protected content');
  return <>{children}</>;
};

export default function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col overflow-x-hidden">
      <Router>
  <Header />
        <main className="flex-1 w-full">
          <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/services" element={<ServicesScreen />} />
          <Route path="/gallery" element={<ClientScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/people" element={<PeopleScreen />} />
          <Route path="/people/sushil-bhandari-resume" element={<SushilBhandariResumeScreen />} />
          <Route path="/library" element={<LibraryScreen />} />
          <Route path="/software" element={<SoftwareScreen />} />
          <Route path="/software/pattern-analyser" element={<PatternAnalyserScreen />} />
          <Route path="/software/flyrock-prediction" element={<FlyrockPredictionScreen />} />
          <Route path="/software/blast-management" element={<BlastManagementScreen />} />
          <Route path="/software/blast-information-underground" element={<BlastInformationSystemUndergroundScreen />} />
          {/* Redirect login and register to home since we use modals now */}
          <Route path="/login" element={<HomeScreen />} />
          <Route path="/register" element={<HomeScreen />} />
          <Route path="/mining-consultancy" element={<MiningConsultancyScreen />} />
          <Route path="/software-development" element={<SoftwareDevelopmentScreen />} />
          <Route path="/training-programs" element={<TrainingProgramsScreen />} />
          <Route path="/blast-information-system" element={<BlastInformationSystemScreen />} />
          <Route path="/vibration-analyzer" element={<VibrationAnalyzerScreen />} />
          <Route path="/surface-operations-designer" element={<SurfaceOperationsDesignerScreen />} />
          <Route path="/cloud-data-sync" element={<CloudDataSyncScreen />} />
          <Route path="/equipment-rental" element={<EquipmentRentalScreen />} />
          <Route path="/environmental-assessment" element={<EnvironmentalAssessmentScreen />} />
          <Route path="/software/blast-designer-surface" element={<BlastDesignerScreen />} />
          <Route path="/software/fragmentation-predictor" element={<FragmentationPredictorScreen />} />
          <Route path="/software/blast-designer-tunnel" element={<BlastDesignerTunnelScreen />} />
          <Route path="/jobs" element={<JobScreen />} />
          <Route path="/course-registration" element={<CourseRegistrationScreen />} />
          
          {/* Profile Section Routes - Protected and wrapped for consistent navigation */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          } />
          <Route path="/profile/test" element={
            <ProtectedRoute>
              <ProfileTestPage />
            </ProtectedRoute>
          } />
          <Route path="/profile/settings" element={
            <ProtectedRoute>
              <ProfileSettingsPage />
            </ProtectedRoute>
          } />
          <Route path="/profile/orders" element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          } />
          <Route path="/profile/order-history" element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          } />
          <Route path="/profile/wishlist" element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          } />
          <Route path="/profile/support" element={
            <ProtectedRoute>
              <SupportPage />
            </ProtectedRoute>
          } />
          <Route path="/profile/notifications" element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          } />
          <Route path="/profile/payment" element={
            <ProtectedRoute>
              <PaymentProfilePage />
            </ProtectedRoute>
          } />
          
          {/* Legacy routes for backward compatibility */}
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>
      <Footer />
    </Router>
    </div>
  );
}