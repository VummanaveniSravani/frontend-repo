import React, { useState } from 'react';
import axios from 'axios';
import CocurricularTabs from './CocurricularTabs';

const CocurricularList = ({ onActivityAdded = () => { } }) => {
   
    const [studentActivities, setStudentActivities] = useState([]);
    const fetchStudentActivities = async () => {
        try {
            const response = await axios.get('http://localhost:4000/activity');
            setStudentActivities(response.data);
        } catch (error) {
            console.error('Error fetching student activities:', error.message);
        }
    };

    React.useEffect(() => {
        fetchStudentActivities();
    }, []);

    return (
        <div>
            <div className='container-fluid pt-3'>
                <h4 className='text-center py-3'>All Student Activities</h4>
                <div className='pt-3'>
                    {studentActivities.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Roll No</th>
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
                                        <tr key={activity._id}>
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
                        <p>No activities found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CocurricularList;
