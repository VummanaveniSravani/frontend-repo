import React, { useState } from 'react';
import StudentForm from './StudentForm';
import AcadamicsProfile from './AcadamicsProfile';
import CocurricularActivities from './CocurricularActivities';
import EnterMarks from './EnterMarks';
import FilterStudentMarks from './FilterStudentMarks';
import WholeStudentProfile from './WholeStudentProfile';
import UploadStudentDetails from './UploadStudentDetails';
import ExtraCuricullarActivities from './ExtraCuricullarActivities';

const AllTabs = ({ role }) => {
    const [showForm1, setShowForm1] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [showForm3, setShowForm3] = useState(false);
    const [showForm4, setShowForm4] = useState(false);
    const [showForm5, setShowForm5] = useState(false);
    const [showForm6, setShowForm6] = useState(false);
    const [showForm7, setShowForm7] = useState(false);

    const [activeButton, setActiveButton] = useState(null);

    const toggleForm = (formNumber) => {
        if (formNumber === 1) {
            setShowForm1(true);
            setShowForm2(false);
            setShowForm3(false);
            setShowForm4(false);
            setShowForm5(false);
            setShowForm6(false);
            setShowForm7(false);
            setActiveButton(1);
        } else if (formNumber === 2) {
            setShowForm1(false);
            setShowForm2(true);
            setShowForm3(false);
            setShowForm4(false);
            setShowForm5(false);
            setShowForm6(false);
            setShowForm7(false);
            setActiveButton(2);
        } else if (formNumber === 3) {
            setShowForm1(false);
            setShowForm2(false);
            setShowForm3(true);
            setShowForm4(false);
            setShowForm5(false);
            setShowForm6(false);
            setShowForm7(false);
            setActiveButton(3);
        } else if (formNumber === 4) {
            setShowForm1(false);
            setShowForm2(false);
            setShowForm3(false);
            setShowForm4(true);
            setShowForm5(false);
            setShowForm6(false);
            setShowForm7(false);
            setActiveButton(4);
        }
        else if (formNumber === 5) {
            setShowForm1(false);
            setShowForm2(false);
            setShowForm3(false);
            setShowForm4(false);
            setShowForm5(true);
            setShowForm6(false);
            setShowForm7(false);
            setActiveButton(5);
        }
        else if (formNumber === 6) {
            setShowForm1(false);
            setShowForm2(false);
            setShowForm3(false);
            setShowForm4(false);
            setShowForm5(false);
            setShowForm6(true);
            setShowForm7(false);
            setActiveButton(6);
        }
        else if (formNumber === 7) {
            setShowForm1(false);
            setShowForm2(false);
            setShowForm3(false);
            setShowForm4(false);
            setShowForm5(false);
            setShowForm6(false);
            setShowForm7(true);
            setActiveButton(7);
        }
    };

    return (
        <div className='container text-center'>
            <div className='d-flex gap-2 align-items-center justify-content-center py-4'>
                {role === 'admin' && (
                    <div className='mb-3'>
                        <button
                            type="button"
                            className={activeButton === 3 ? 'active' : ''}
                            onClick={() => toggleForm(3)}
                        >
                            Add Student Details
                        </button>
                    </div>
                )}
                 <div className='mb-3'>
                        <button
                            type="button"
                            className={activeButton === 4 ? 'active' : ''}
                            onClick={() => toggleForm(4)}
                        >
                            Add Student Marks
                        </button>
                </div>
                <div className='mb-3'>
                        <button
                            type="button"
                            className={activeButton === 5 ? 'active' : ''}
                            onClick={() => toggleForm(5)}
                        >
                            View Academics Profile 
                        </button>
                </div>

                {/* <button className='btn btn-secondary'><Link to="/view-marks">View Marks</Link></button> */}

                <div className='mb-3'>
                    <button
                        type="button"
                        className={activeButton === 1 ? 'active' : ''}
                        onClick={() => toggleForm(1)}
                    >
                        View Student Details
                    </button>
                </div>
                <div className='mb-3'>
                    <button
                        type="button"
                        className={activeButton === 2 ? 'active' : ''}
                        onClick={() => toggleForm(2)}
                    >
                        Co-curricular Activities
                    </button>
                </div>
                <div className='mb-3'>
                    <button
                        type="button"
                        className={activeButton === 6 ? 'active' : ''}
                        onClick={() => toggleForm(6)}
                    >
                        Extra-curricular Activities
                    </button>
                </div>
                <div className='mb-3'>
                    <button
                        type="button"
                        className={activeButton === 7 ? 'active' : ''}
                        onClick={() => toggleForm(7)}
                    >
                       Student Profile
                    </button>
                </div>
            </div>
            <div className='row pt-3 text-center'>
                {showForm1 && (
                    <AcadamicsProfile role={role} />
                )}

                {showForm4 && (
                    <EnterMarks />
                 )}
                 {showForm5 && (
                    <FilterStudentMarks />
                )}
                {showForm2 && (
                    <CocurricularActivities />
                )}

                {showForm3 && (
                    <div>
                    <StudentForm />
                    <UploadStudentDetails/>
                    </div>
                )}
                 {showForm6 && (
                    <ExtraCuricullarActivities/>
                )}
                  {showForm7 && (
                    <WholeStudentProfile />
                )}
            </div>
        </div>
    );
}

export default AllTabs;
