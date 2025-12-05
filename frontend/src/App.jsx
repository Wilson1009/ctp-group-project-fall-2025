import "./App.css";
import { useState } from "react";
import Timer from "./components/Calendar/Timer.jsx";
import Calendar from "./components/Calendar/Calendar.jsx";
import SideBarCal from "./components/Calendar/SideBarCal.jsx";

function App() {
  const [events, setEvents] = useState([]);

  // Add submitted times to shared events so calendar renders them.
  const addTime = (payload) => {
    if (typeof payload === "string") {
      setEvents((prev) => [...prev, { time: payload, color: "#a64d5d" }]);
      return;
    }
    setEvents((prev) => [...prev, payload]);
  };

  return (
    <div className="min-h-screen bg-[#f7eedb] flex flex-col items-center py-8 px-6 gap-4">
      <Timer onAddTime={addTime} />
      <div className="flex gap-6 items-start">
        <SideBarCal />
        <Calendar events={events} />
      </div>
    </div>
  );
}

export default App;
