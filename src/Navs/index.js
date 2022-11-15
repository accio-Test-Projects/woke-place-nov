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
import CandidateHoc from "../Components/HOC/CandidateHoc";
import EmployerHoc from "../Components/HOC/EmployerHoc";

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
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/candidate/auth" element={<AuthPage type="candidate" />} />
        <Route path="/employer/auth" element={<AuthPage type="employer" />} />

        <Route element={<CandidateProtactedRoutes />}>
          <Route
            path="/candidate/onboarding"
            element={<CandidateOnboarding />}
          />
          <Route
            path="candidate/profile"
            element={
              <CandidateHoc>
                <CandidateProfile />
              </CandidateHoc>
            }
          />
          <Route
            path="candidate/jobs"
            element={
              <CandidateHoc>
                <CandidateJobs />
              </CandidateHoc>
            }
          />
          <Route
            path="candidate/conversation"
            element={
              <CandidateHoc>
                <CandidateConversation />
              </CandidateHoc>
            }
          />
          <Route
            path="candidate/application"
            element={
              <CandidateHoc>
                <Applications />
              </CandidateHoc>
            }
          />
        </Route>
        <Route element={<EmployerProtactedRoutes />}>
          <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
          <Route
            path="employer/profile"
            element={
              <EmployerHoc>
                <EmployerProfile />
              </EmployerHoc>
            }
          />
          <Route
            path="employer/jobs"
            element={
              <EmployerHoc>
                <EmployerJobs />
              </EmployerHoc>
            }
          />
          <Route
            path="employer/conversation"
            element={
              <EmployerHoc>
                <EmployerConversation />
              </EmployerHoc>
            }
          />
          <Route
            path="employer/applicants"
            element={
              <EmployerHoc>
                <Applicants />
              </EmployerHoc>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navs;
