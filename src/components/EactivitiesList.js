import React, { useState } from 'react';
import axios from 'axios';
function EactivitiesList({ onActivityAdded = () => { } }) {
    
    const [studentActivities, setStudentActivities] = useState([]);
    const fetchStudentActivities = async () => {
        try {
            const response = await axios.get('http://localhost:4000/eactivity');
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
                                        <th>Arts</th>
                                        <th>Sports</th>
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
                                        <tr key={eactivity._id}>
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
                        <p>No activities found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EactivitiesList;