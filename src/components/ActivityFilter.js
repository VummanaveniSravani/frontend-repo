import React, { useState } from 'react';
import axios from 'axios';

const ActivityFilter = ({ onActivityAdded = () => { } }) => {
  const [studentActivities, setStudentActivities] = useState([]);
  const [rollNoFilter, setRollNoFilter] = useState('');

  const fetchStudentActivities = async (rollNo) => {
    if (rollNo.trim() === '') {
      // Clear the activities if the roll number is empty
      setStudentActivities([]);
      return;
    }

    try {
      console.log('Fetching activities for rollNo:', rollNo); // Debugging line
      const response = await axios.get('http://localhost:4000/activity', {
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
                  <th>Activity Name</th>
                  <th>Participation Date</th>
                  <th>Participation Year</th>
                  <th>Description</th>
                  <th>Hosted By</th>
                </tr>
              </thead>
              <tbody>
                {studentActivities.map(activity => (
                  <tr key={activity._id} className="activity-card">
                    <td>{activity.rno}</td>
                    <td>{activity.sname}</td>
                    <td>{activity.branch}</td>
                    <td>{activity.aname}</td>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
                    <td>{activity.year}</td>
                    <td>{activity.description}</td>
                    <td>{activity.host}</td>
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

export default ActivityFilter;
