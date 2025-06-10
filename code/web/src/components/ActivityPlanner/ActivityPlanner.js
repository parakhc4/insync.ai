import React, { useState, useEffect } from "react";
import './ActivityPlanner.css';

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
  <div className="activity-planner">
    <h2 className="section-title">📆 Activity Planner</h2>
    <form onSubmit={addActivity} className="activity-form">
      <input type="text" placeholder="Activity" value={activity} onChange={(e) => setActivity(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button type="submit">Add</button>
    </form>

    <div className="activity-list">
      {activities.length > 0 ? (
        activities.map((a, idx) => (
          <div className="activity-item" key={idx}>
            <strong>{a.activity}</strong>
            <span>{a.date} at {a.time}</span>
          </div>
        ))
      ) : (
        <p className="placeholder">No activities scheduled yet.</p>
      )}
    </div>
  </div>
);

}

export default ActivityPlanner;
