import React, { useState } from 'react';
import axios from 'axios';
import ExtraCurricularTabs from './ExtraCurricularTabs';

const ExtraCuricullarActivities = ({ onActivityAdded = () => {} }) => {
  const [sname, setStudentname] = useState('');
  const [rno, setRollno] = useState('');
  const [branch, setBranch] = useState('');
  const [aname, setArt] = useState('');
  const [mname, setMusic] = useState('');
  const [pname, setSports] = useState('');
  const [acname, setAcademic] = useState('');
  const [date, setDate] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [host, setHost] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [studentActivities, setStudentActivities] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    if (!sname) newErrors.sname = 'Student name is required';
    if (!rno) newErrors.rno = 'Roll number is required';
    if (!branch) newErrors.branch = 'Branch is required';
    if (!aname) newErrors.aname = 'Activity name is required';
    if (!pname) newErrors.pname = 'Activity name is required';
    if (!mname) newErrors.mname = 'Activity name is required';
    if (!acname) newErrors.acname = 'Activity name is required';
    if (!date) newErrors.date = 'Date is required';
    if (!year) newErrors.year = 'Academic Year is required';
    if (!description) newErrors.description = 'Description is required';
    if (!host) newErrors.host = 'Host Name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);

    if (!validateForm()) {
      return;
    }

    const eActivity = { sname,rno,branch,aname,pname,mname,acname,date,year,description,host };

    try {
      const response = await axios.post('http://localhost:4000/eactivity', eActivity, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      onActivityAdded(response.data);
      setSubmitted(true);
      // Clear form fields
      setStudentname('');
      setRollno('');
      setBranch('');
      setDate('');
      setArt('');
      setMusic('')
      setSports('');
      setAcademic('');
      setYear('');
      setDescription('');
      setHost('');
    } catch (error) {
      console.error('Error adding activity:', error.message);
      setSubmitted(false);
    }
  };

  const fetchStudentActivities = async (rollNo) => {
    try {
      const response = await axios.get(`http://localhost:4000/eactivity?rollNo=${rollNo}`);
      setStudentActivities(response.data);
    } catch (error) {
      console.error('Error fetching student activities:', error.message);
    }
  };

  return (
    <div>
      <div className='container width-35'>
        <h4>Enter Activities</h4>
        <form className='row' onSubmit={handleSubmit}>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <label className="form-label"></label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder='Student Name'
              value={sname}
              onChange={(e) => setStudentname(e.target.value)}
            />
            {errors.sname && <span style={{ color: 'red' }}>{errors.sname}</span>}
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <label className="form-label"></label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder='Roll No'
              value={rno}
              onChange={(e) => setRollno(e.target.value)}
            />
            {errors.rno && <span style={{ color: 'red' }}>{errors.rno}</span>}
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <label className="form-label"></label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder='Branch'
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
            {errors.branch && <span style={{ color: 'red' }}>{errors.branch}</span>}
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <label className="form-label"></label>
            <select className="form-control mb-3 form-select" value={pname}
              onChange={(e) => setSports(e.target.value)}>
              <option value="">Sports</option>
              <option value="Soccer">Soccer</option>
              <option value="Basketball">Basketball</option>
              <option value="Vallyball">Vallyball</option>
              <option value="Tennis">Tennis  </option>
              <option value="Swimming">Swimming</option>
              <option value="Cricket">Cricket</option>
            </select>
            {/* {errors.pname && <span style={{ color: 'red' }}>{errors.pname}</span>} */}
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <label className="form-label"></label>
            <select className="form-control mb-3 form-select" value={aname}
              onChange={(e) => setArt(e.target.value)}>
              <option value="">Arts</option>
              <option value="Painting">Painting</option>
              <option value="Drawing">Drawing</option>
              <option value="Sculpting">Sculpting</option>
              <option value="Photography">Photography  </option>
              <option value="Graphic design">Graphic design</option>
              <option value="None">None</option>
            </select>
            {/* {errors.aname && <span style={{ color: 'red' }}>{errors.aname}</span>} */}
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <label className="form-label"></label>
            <select className="form-control mb-3 form-select" value={mname}
              onChange={(e) => setMusic(e.target.value)}>
              <option value="">Music</option>
              <option value="Playing an instrument">Playing an instrument</option>
              <option value="Choir">Choir</option>
              <option value="Orchestra">Orchestra</option>
              <option value="None">None</option>
            </select>
            {errors.mname && <span style={{ color: 'red' }}>{errors.mname}</span>}
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <label className="form-label"></label>
            <select className="form-control mb-3 form-select" value={acname}
              onChange={(e) => setAcademic(e.target.value)}>
              <option value="">Academic Club</option>
              <option value="Debate club">Debate club</option>
              <option value="Robotics club">Robotics club</option>
              <option value="Literature club">Literature club</option>
              <option value="None">None</option>
            </select>
            {/* {errors.acname && <span style={{ color: 'red' }}>{errors.acname}</span>} */}
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <label className="form-label"></label>
            <input
              type="date"
              className="form-control rounded-0"
              placeholder='Date of event'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <label className="form-label"></label>
            <select className="form-control mb-3 form-select" value={year}
              onChange={(e) => setYear(e.target.value)}>
              <option value="">Academic Year</option>
              <option value="2024 July-2025 June">2024 July-2025 June</option>
              <option value="2025 July-2026 June">2025 July-2026 June</option>
              <option value="2026 July-2027 June">2026 July-2027 June</option>
              <option value="2027 July-2028 June">2027 July-2028 June</option>
              <option value="2028 July-2029 June">2028 July-2029 June</option>
              <option value="2029 July-2030 June">2029 July-2030 June</option>
              <option value="2030 July-2031 June">2030 July-2031 June</option>
            </select>
            {errors.year && <span style={{ color: 'red' }}>{errors.year}</span>}
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <label className="form-label"></label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <label className="form-label"></label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder='Hosted By'
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
            {errors.host && <span style={{ color: 'red' }}>{errors.host}</span>}
          </div>
          <div className="col-12 text-center pt-4">
            <button className="btn btn-primary btn-text rounded-0 width-25" type="submit">
              Submit
            </button>
          </div>
        </form>
        {submitted && (
          <div className="col-12 pt-3">
            <div className="alert alert-success" role="alert">
              Details Submitted successfully!
            </div>
          </div>
        )}
      </div>
      <ExtraCurricularTabs/>
    </div>
  );
};

export default ExtraCuricullarActivities;
