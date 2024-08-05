import React, { useState } from 'react';
import StudentForm from './StudentForm';
import StudentDataTwo from './StudentDataTwo';
import CocurricularActivitiewThree from './CocurricularActivitiewThree';
import FilterStudentMarksTwo from './FilterStudentMarksTwo';
import UploadMarksTwo from './UploadMarksTwo';

const ParentActivityTab = ({ role }) => {
    const [showForm1, setShowForm1] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [showForm3, setShowForm3] = useState(false);
    const [showForm4, setShowForm4] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

    const toggleForm = (formNumber) => {
        if (formNumber === 1) {
            setShowForm1(true);
            setShowForm2(false);
            setShowForm3(false);
            setShowForm4(false);
            setActiveButton(1);
        } else if (formNumber === 2) {
            setShowForm1(false);
            setShowForm2(true);
            setShowForm3(false);
            setShowForm4(false);
            setActiveButton(2);
        } else if (formNumber === 3) {
            setShowForm1(false);
            setShowForm2(false);
            setShowForm3(true);
            setShowForm4(false);
            setActiveButton(3);
        } else if (formNumber === 4) {
            setShowForm1(false);
            setShowForm2(false);
            setShowForm3(false);
            setShowForm4(true);
            setActiveButton(4);
        }
    };

    return (
        <div className='container text-center'>
            <div className='row py-4'>
                
                 <div className='col-md-4 mb-3'>
                        <button
                            type="button"
                            className={activeButton === 1 ? 'active' : ''}
                            onClick={() => toggleForm(1)}
                        >
                            View Your Semester Marks
                        </button>
                </div>
                <div className='col-md-4 mb-3'>
                    <button
                        type="button"
                        className={activeButton === 2 ? 'active' : ''}
                        onClick={() => toggleForm(2)}
                    >
                       View Your Academic Profile
                    </button>
                </div>
                <div className='col-md-4 mb-3'>
                    <button
                        type="button"
                        className={activeButton === 3 ? 'active' : ''}
                        onClick={() => toggleForm(3)}
                    >
                       View Co-curricular Activities
                    </button>
                </div>
            </div>
            <div className='row pt-3 text-center'>
               

                {showForm1 && (
                     <div>
                     <FilterStudentMarksTwo />
                     <UploadMarksTwo/>
                     </div>
                 )}
                {showForm2 && (
                                   <StudentDataTwo/>
                                )}

                {showForm3 && (
                    <CocurricularActivitiewThree />
                )}
            </div>
        </div>
    );
}

export default ParentActivityTab;
