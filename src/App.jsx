import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import ResumePage from "./pages/ResumePage";
import RepositoriesPage from "./pages/RepositoriesPage";
import VideoIntroductionPage from "./pages/VideoIntroductionPage";
import LeetCodePage from "./pages/LeetCodePage";
import InteractivePage from "./pages/InteractivePage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import "./styles/responsive.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="repositories" element={<RepositoriesPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="video-introduction" element={<VideoIntroductionPage />} />
          <Route path="leetcode" element={<LeetCodePage />} />
          <Route path="interactive" element={<InteractivePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
