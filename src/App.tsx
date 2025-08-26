import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
          <Route path="/register" element={<RegisterScreen />} />
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
        </Routes>
      </main>
      <Footer />
    </Router>
    </div>
  );
}