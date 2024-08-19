import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Student from '../components/student';
import Admin from '../components/admin';
import Hod from '../components/hod';
import Parent from '../components/parent';
import Faculty from '../components/faculty';
import StudentProfile from '../components/StudentProfile';
import SingleStudent from '../components/SingleStudent';
import CoCurricularList from '../components/CocurricularList';
import DocumentUploadForm from '../components/DocumentUploadForm';
import FilterDocument from '../components/FilterDocuments';
import FilterStudentMarks from '../components/FilterStudentMarks';
import DisplayStudentList from '../components/DisplayStudentList';
import EactivitiesList from '../components/EactivitiesList';

const Nav = () => {
    return (
        <div>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/student" element={<Student />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/hod" element={<Hod />} />
              <Route path="/parent" element={<Parent />} />
              <Route path="/" element={<Login />} />
              <Route path="/upload-documents" element={<DocumentUploadForm />} />
              <Route path="/view-documents" element={<FilterDocument />}/>
              <Route path='/student-profile' element={<DisplayStudentList/>}/>
              <Route path='/single-student-profile' element={<SingleStudent/>}/>
              <Route path='/cocurricular-activities-list' element={<CoCurricularList/>}/>
              <Route path='/view-marks' element={<FilterStudentMarks/>}/>
              <Route path="/admin-form" component={Admin} />
              <Route path="/student-details" component={Student} />
              <Route path='/list' element={<EactivitiesList/>}/>
              <Route path="/" component={Student} /> {/* Default to student details */}
          </Routes>
        </Router>
        </div>
    );
}

export default Nav; 