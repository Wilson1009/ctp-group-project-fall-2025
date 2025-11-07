import { useState } from "react";
import classes from "../../data/classes";

const Timer = ({ onAddTime }) => {
    const [hh, setHh] = useState("09");
    const [mm, setMm] = useState("00");
    const [selectedDay, setSelectedDay] = useState('Mon');

    // helper: keep only digits and max length
    const onlyDigits = (s = "", max = 2) => s.toString().replace(/\D/g, "").slice(0, max);
    const handlePasteSet = (pasteText, setter, max = 2) => setter(onlyDigits(pasteText, max));

    const [meridian, setMeridian] = useState("AM");
    const [selectedClass, setSelectedClass] = useState("");

    const submitTime = () => {
        // convert hh/mm + meridian to 24-hour HH:MM string so Calendar parsing works
        let hNum = parseInt(onlyDigits(hh, 2) || "0", 10);
        let mNum = parseInt(onlyDigits(mm, 2) || "0", 10);
        if (isNaN(hNum)) hNum = 0;
        if (isNaN(mNum)) mNum = 0;

        if (meridian === "PM" && hNum < 12) hNum += 12;
        if (meridian === "AM" && hNum === 12) hNum = 0; // 12 AM -> 00

        const h = String(hNum).padStart(2, "0");
        const m = String(mNum).padStart(2, "0");
        const timeStr = `${h}:${m}`;

        // 7-color palette (user-provided)
        const palette = ['#a64d5d', '#d96b76', '#4d6fa6', '#5da68f', '#7e4da6', '#f0a6b5', '#c7a987'];
        const color = palette[Math.floor(Math.random() * palette.length)];

        if (typeof onAddTime === "function") {
            onAddTime({ time: timeStr, day: selectedDay, class: selectedClass, color });
        }
    };

    return (
        <>
            <div className="bg-[#DBA069] w-[435px] h-[60px] flex items-center justify-start gap-3 px-4 rounded-[25px]">
                <div className="flex items-center space-x-3">
                    <div className="bg-[#F8E1CB] px-3 py-1 rounded-[25px] w-[100px] h-[30px] text-[#4C2F1A] flex items-center">
                        <input
                            value={hh}
                            onChange={(e) => setHh(onlyDigits(e.target.value, 2))}
                            onPaste={(e) => {
                                const p = (e.clipboardData || window.clipboardData).getData("text");
                                e.preventDefault();
                                handlePasteSet(p, setHh, 2);
                            }}
                            inputMode="numeric"
                            pattern="\\d*"
                            maxLength={2}
                            className="m-0 border-none text-[#A67A4D] bg-transparent outline-none focus:outline-none focus:ring-0 w-full text-center"
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center mx-1 space-y-1 -ml-2">
                        <div className="w-2 h-2 rounded-full bg-[#F8E1CB]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#F8E1CB]"></div>
                    </div>

                    <div className="bg-[#F8E1CB] px-3 py-1 rounded-[25px] w-[100px] h-[30px] text-[#4C2F1A] flex items-center">
                        <input
                            value={mm}
                            onChange={(e) => setMm(onlyDigits(e.target.value, 2))}
                            onPaste={(e) => {
                                const p = (e.clipboardData || window.clipboardData).getData("text");
                                e.preventDefault();
                                handlePasteSet(p, setMm, 2);
                            }}
                            inputMode="numeric"
                            pattern="\\d*"
                            maxLength={2}
                            className="m-0 border-none text-[#A67A4D] bg-transparent outline-none focus:outline-none focus:ring-0 w-full text-center"
                        />
                    </div>
                </div>

                {/* AM/PM toggles */}
                <div className="flex flex-col items-center justify-center ml-2">
                    <button
                        type="button"
                        onClick={() => setMeridian("AM")}
                        aria-pressed={meridian === "AM"}
                        className={`px-3 py-1 w-[30px] h-5 text-[12px] flex items-center justify-center rounded-t-[10px] ${meridian === "AM" ? 'bg-[#A67A4D] text-[#F8E1CB]' : 'bg-[#F8E1CB] text-[#4C2F1A]'}`}
                    >
                        AM
                    </button>
                    <button
                        type="button"
                        onClick={() => setMeridian("PM")}
                        aria-pressed={meridian === "PM"}
                        className={`px-3 py-1 w-[30px] h-5 text-[12px] flex items-center justify-center rounded-b-[10px] ${meridian === "PM" ? 'bg-[#A67A4D] text-[#F8E1CB]' : 'bg-[#F8E1CB] text-[#4C2F1A]'}`}
                    >
                        PM
                    </button>
                </div>

                {/* submit button */}
                <div className="ml-2">
                    <button
                        onClick={submitTime}
                        className="bg-[#A67A4D] text-[#F8E1CB] px-3 py-1 rounded-full text-sm"
                    >
                        Add
                    </button>
                </div>

                {/* Day and Class dropdowns */}

{/* Day and Class dropdowns - smaller to fit */}
<div className="flex flex-col gap-0.5">
    <label className="sr-only" htmlFor="day-select">Day</label>
    <div className="relative inline-block">
        <select
            id="day-select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="appearance-none bg-[#F8E1CB] text-[#A67A4D] px-3 py-0.5 rounded-full text-xs border-none text-center pr-6 focus:outline-none focus:ring-0 h-[26px] min-w-[60px]"
        >
            <option value="Mon">Mon</option>
            <option value="Tue">Tue</option>
            <option value="Wed">Wed</option>
            <option value="Thu">Thu</option>
            <option value="Fri">Fri</option>
            <option value="Sat">Sat</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#A67A4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
    </div>

    <label className="sr-only" htmlFor="class-select">Class</label>
    <div className="relative inline-block">
        <select
            id="class-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="appearance-none bg-[#F8E1CB] text-[#A67A4D] px-2 py-0.5 rounded-full text-xs border-none text-center pr-6 focus:outline-none focus:ring-0 h-[26px] min-w-[60px]"
        >
            <option value="">class... </option>
            {Object.entries(classes).map(([group, list]) => (
                <optgroup key={group} label={group}>
                    {list.map((c) => (
                        <option key={`${group}-${c}`} value={`${group}:${c}`}>{c}</option>
                    ))}
                </optgroup>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#A67A4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
    </div>
</div>           
 </div>
        </>
    );
};

export default Timer;