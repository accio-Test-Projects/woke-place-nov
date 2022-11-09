// landing page "/"
// auth page "/auth"

// {
// candidateOnboarding page "/candidateOnboarding"
// employerOnboarding page "/employerOnboarding"
// employerProfile page "/employerProfile"
// candidateProfile page "/candidateProfile"
// empoyerJobs page "/employerJobs"
// candidateJobs page "/candidateJobs"
// application page "/application"
// applicants page "/applicants"
// employerConversation page "/employerConversation"
// candidateConversation page "/candidateConversation"
// }
import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import React from "react";
import LandingPage from "../Components/LandingPage";
import AuthPage from "../Components/AuthPage";
import CandidateOnboarding from "../Components/Candidate/CandidateOnboarding";
import CandidateProfile from "../Components/Candidate/CandidateProfile";
import CandidateJobs from "../Components/Candidate/CandidateJobs";
import CandidateConversation from "../Components/Candidate/CandidateConversation";
import Applications from "../Components/Candidate/Applications";
import EmployerOnboarding from "../Components/Employer/Onboarding";
import EmployerProfile from "../Components/Employer/Profile";
import EmployerJobs from "../Components/Employer/Jobs";
import EmployerConversation from "../Components/Employer/Conversation";
import Applicants from "../Components/Employer/Applicants";
function Navs() {
  const CandidateProtactedRoutes = () => {

    if ("a" === "a") {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };

  const EmployerProtactedRoutes = () => {
    if ("a" === "a") {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route element={<CandidateProtactedRoutes />}>
          <Route
            path="/candidateOnboarding"
            element={<CandidateOnboarding />}
          />
          <Route path="candidate/profile" element={<CandidateProfile />} />
          <Route path="candidate/jobs" element={<CandidateJobs />} />
          <Route
            path="candidate/conversation"
            element={<CandidateConversation />}
          />
          <Route path="candidate/application" element={<Applications />} />
        </Route>
        <Route element={<EmployerProtactedRoutes />}>
          <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
          <Route path="employer/profile" element={<EmployerProfile />} />
          <Route path="employer/jobs" element={<EmployerJobs />} />
          <Route
            path="employer/conversation"
            element={<EmployerConversation />}
          />
          <Route path="employer/applicants" element={<Applicants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navs;
