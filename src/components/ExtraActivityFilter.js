import React, { useState } from 'react';
import axios from 'axios';

const ExtraActivityFilter = ({ onActivityAdded = () => { } }) => {
  const [studentActivities, setStudentActivities] = useState([]);
  const [rollNoFilter, setRollNoFilter] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchStudentActivities = async (rollNo) => {
    if (rollNo.trim() === '') {
      // Clear the activities if the roll number is empty
      setStudentActivities([]);
      return;
    }

    try {
      console.log('Fetching activities for rollNo:', rollNo); // Debugging line
      const response = await axios.get(`https://improved-fiesta-9rxvp57wwrqh464-3000.app.github.dev/eactivity`, {
        params: { rollNo }
      });
      console.log('Activities response:', response.data); // Debugging line
      setStudentActivities(response.data);
    } catch (error) {
      console.error('Error fetching student activities:', error.message);
    }
  };

  const handleRollNoChange = (e) => {
    const rollNo = e.target.value;
    setRollNoFilter(rollNo);
    fetchStudentActivities(rollNo);
  };

  return (
    <div className='container-fluid'>
      <div className='row py-4'>
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          <input
            type="text"
            className="form-control rounded-0"
            placeholder='Enter Roll No to filter'
            value={rollNoFilter}
            onChange={handleRollNoChange}
          />
        </div>
        <div className='col-md-3'></div>
      </div>

      <div className=''>
        {studentActivities.length > 0 ? (
          <div className="table-responsive">
            <h5>Student Activities</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>RollNo</th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Sports</th>
                  <th>Arts</th>
                  <th>Music</th>
                  <th>Academic Club</th>
                  <th>Participation Date</th>
                  <th>Participation Year</th>
                  <th>Description</th>
                  <th>Hosted By</th>
                </tr>
              </thead>
              <tbody>
                {studentActivities.map(eactivity => (
                  <tr key={eactivity._id} className="activity-card">
                    <td>{eactivity.rno}</td>
                    <td>{eactivity.sname}</td>
                    <td>{eactivity.branch}</td>
                    <td>{eactivity.aname}</td>
                    <td>{eactivity.pname}</td>
                    <td>{eactivity.mname}</td>
                    <td>{eactivity.acname}</td>
                    <td>{new Date(eactivity.date).toLocaleDateString()}</td>
                    <td>{eactivity.year}</td>
                    <td>{eactivity.description}</td>
                    <td>{eactivity.host}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No activities found</p>
        )}
      </div>
    </div>
  );
};

export default ExtraActivityFilter;
