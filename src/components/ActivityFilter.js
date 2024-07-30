import React, { useState } from 'react';
import SingleStudentActivity from './SingleStudentActivity';
const ActivityFilter = () => {
    const [newActivity, setNewActivity] = useState(null);
    const [rollNoFilter, setRollNoFilter] = useState('');
  
    const handleActivityAdded = (activity) => {
      setNewActivity(activity);
    };
  
    const handleRollNoChange = (e) => {
      setRollNoFilter(e.target.value);
    };
  
    return (
      <div>
        {/* <StudentForm onStudentAdded={handleStudentAdded} /> */}
        <div className='container-fluid w-100'>
          <h5>Filter by Roll No:</h5>
          <input type="text" value={rollNoFilter} onChange={handleRollNoChange} placeholder='Roll No' />
        </div>
        <SingleStudentActivity rollNoFilter={rollNoFilter} />
      </div>
    );
  };

export default  ActivityFilter