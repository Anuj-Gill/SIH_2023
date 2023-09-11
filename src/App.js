import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./context/Appcontext";
import DashboardWrapper from "./components/common/DashboardWrapper";
// auth routesmale
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import FaSignUp from "./pages/auth/feauth/Fesignup";
// base tables
import Countries from "./pages/baseTables/Countries";
import States from "./pages/baseTables/States";
import Districts from "./pages/baseTables/Districts";
import Streams from "./pages/baseTables/Streams";
import Universities from "./pages/baseTables/Universities";
import Roles from "./pages/baseTables/Roles";
import Feidashboard from "./pages/fe/dashboard/dashboard";

import Organisations from "./pages/dashboard/Organisations";
import Departments from "./pages/dashboard/Departments";
import Users from "./pages/dashboard/Users";
import Hei from "./pages/dashboard/Hei";
import UgeAdmin from "./pages/Ugc/UploadCompetition"
//ugc
// Hei routes
import HeiDashboard from "./pages/fe/HeiDashboard";
import Heidashboard from "./pages/dashboard/Hei";
import Verification from "./pages/fe/dashboard/verifyhe";
 // UGc
 import Ugcdashboard from "./pages/Ugc/Ugcdashboard";
 import UploadCompetition from "./pages/Ugc/UploadCompetition";
//dashboard
import Fadashboard from "./pages/fe/dashboard/dashboard";
 
// grievances routes
import UploadCompetitions from "./pages/fe/UploadCompetitions";
import ViewCompetitons from "./pages/fe/ViewCompetitons";


import ProjectDetail from "./pages/fe/ProjectDetail";
import PendingProject from "./pages/fe/PendingProject";
import ResolvedGrievances from "./pages/fe/ResolvedGrievances";
import Competitions from "./pages/fe/competitons";
//verify routes
import verifyprojects from "./pages/auth/verfiy/verifyproject";
import Verifystudents from "./pages/auth/verfiy/verifystudents";

export default function App() {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <Router>
      <DashboardWrapper>
        <Routes>

          
           <Route path="/" element={<Login />}/>




          <Route path="/dashboard">
            <Route path="base_tables">
              <Route path="countries" element={<Countries />} />
              <Route path="states" element={<States />} />
              <Route path="districts" element={<Districts />} />
              <Route path="streams" element={<Streams />} />
              <Route path="universities" element={<Universities />} />
              <Route path="roles" element={<Roles />} />
            </Route>
             
            <Route path="organisations" element={<Organisations />} />
            <Route path="departments" element={<Departments />} />
            <Route path="users" element={<Users />} />
            <Route path="colleges" element={<Hei />} />
              

            <Route path="hei" element={<HeiDashboard />} />

            <Route path="hei">
              <Route path="Competitions" element={<UploadCompetitions/>} />
              <Route path="all" element={<ViewCompetitons />} />
              <Route path="pending" element={<PendingProject />} />
              <Route path="resolved" element={<ResolvedGrievances />} />
              <Route path="dashboard" element={<Heidashboard/>}/>
              <Route path="ded" element={<Verification/>}/>
               
              <Route path="competitions" element={<Competitions />} />
            </Route>
            <Route path="grievances/show/:id" element={<ProjectDetail />} />
          </Route>
          
          <Route path="fa" element={<Feidashboard/>}>
            
          </Route>


          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard/countries" /> : <Login />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard/countries" /> : <Register />} />
          <Route path="/fasignup" element={<FaSignUp/>}/>
          
          <Route path="ugc" element={<Ugcdashboard/>}>
            <Route path="upload competition"element={<UploadCompetitions/>}></Route>
 
          </Route>
          <Route exact path="*" element={<Navigate to="/dashboard/countries" />} />
        </Routes>
      </DashboardWrapper>
    </Router>
  );
}