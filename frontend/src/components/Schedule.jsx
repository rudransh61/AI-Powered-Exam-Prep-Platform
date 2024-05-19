import React from 'react';

function Schedule({ schedule }) {
    return (
        <div className="schedule">
            <h2>Generated Study Schedule</h2>
            <p>{schedule}</p>
        </div>
    );
}

export default Schedule;
