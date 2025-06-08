import React, { useState, useEffect } from "react";

function ActivityPlanner() {
    const [activity, setActivity] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('activities');
        if (saved) {
            try {
                setActivities(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse saved activities');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(activities));
    }, [activities]);

    const addActivity = (e) => {
        e.preventDefault();
        if (!activity || !date || !time) return;
        setActivities([...activities, { activity, date, time }]);
        setActivity("");
        setDate("");
        setTime("");
    };

    return (
        <div>
            <h2>Activity Planner</h2>
            <form onSubmit={addActivity} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Activity"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <button type="submit">Add</button>
            </form>
            {activities.length > 0 && (
                <ul>
                    {activities.map((a, idx) => (
                        <li key={idx}>{`${a.activity} - ${a.date} ${a.time}`}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ActivityPlanner;
