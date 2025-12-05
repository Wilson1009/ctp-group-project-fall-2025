const Calendar = ({ events = [] }) => {
    return(
        <div className="w-[685px]">
            <div className="bg-[#C58747] w-full rounded-[25px] h-[578px] flex items-center justify-center">
            <div className="w-full max-w-[640px] grid grid-cols-8 gap-3 text-center items-center rounded-[25px]">
                <div className="bg-[#A67A4D] rounded-[25px] w-[76px] h-[30px] flex items-center justify-center text-[#F8E1CB]">
                    <p className="m-0">Time</p>
                </div>
                {/* header badges: placed in their own cell next to Time so you can align them separately */}
                <div className="col-span-6">
                    <div className="w-[530px] mx-auto flex items-center justify-between">
                        <div className="w-[76px] bg-[#F8E1CB] rounded-[25px] h-[30px] flex items-center justify-center"><p className="m-0">Mon</p></div>
                        <div className="w-[76px] bg-[#F8E1CB] rounded-[25px] h-[30px] flex items-center justify-center"><p className="m-0">Tue</p></div>
                        <div className="w-[76px] bg-[#F8E1CB] rounded-[25px] h-[30px] flex items-center justify-center"><p className="m-0">Wed</p></div>
                        <div className="w-[76px] bg-[#F8E1CB] rounded-[25px] h-[30px] flex items-center justify-center"><p className="m-0">Thu</p></div>
                        <div className="w-[76px] bg-[#F8E1CB] rounded-[25px] h-[30px] flex items-center justify-center"><p className="m-0">Fri</p></div>
                        <div className="w-[76px] bg-[#F8E1CB] rounded-[25px] h-[30px] flex items-center justify-center"><p className="m-0">Sat</p></div>
                    </div>
                </div>
                <div></div>
                {/* second row: left column is the time column (stacked boxes); columns 2–7 are tall day blocks */}
                <div className="flex flex-col items-center gap-3 h-[445px] overflow-auto py-2 no-scrollbar">
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">8:00-9:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">9:00-10:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">10:00-11:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">11:00-12:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">13:00-14:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">14:00-15:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">15:00-16:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">16:00-17:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">17:00-18:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">18:00-19:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">19:00-20:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">20:00-21:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[60px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white">21:00-22:00<p className="m-0 text-sm text-[#4C2F1A]"></p></div>
                </div>
                <div className="col-span-6 h-[445px] bg-[#E6BD97] rounded-[10px] justify-self-center relative overflow-hidden w-[530px] mx-auto">
                    {/* Wide day area — faint horizontal guide lines matching left time boxes */}
                    {Array.from({ length: 13 }).map((_, idx) => {
                        const slotCount = 13;
                        const topPercent = ((idx + 0.5) / slotCount) * 100; // center of each left slot
                        return (
                            <div
                                key={`line-${idx}`}
                                className="absolute left-2 right-2 h-px bg-[#CFAE8F] opacity-40"
                                style={{ top: `${topPercent}%`, transform: 'translateY(-50%)' }}
                            />
                        );
                    })}

                    {/* Wide day area — render colored timestamp markers mapped by time-of-day */}
                    {events.map((evt, i) => {
                        if (!evt) return null;
                        // evt can be a string (legacy) or an object {time, color, day, class}
                        const timeStr = typeof evt === 'string' ? evt : evt.time;
                        const parts = timeStr.split(":");
                        const h = parseInt(parts[0] || "0", 10);
                        const m = parseInt(parts[1] || "0", 10);
                        const minutes = (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
                        const topPercent = (minutes / 1440) * 100; // position in the full day
                        const bg = (evt && evt.color) || '#a64d5d';
                        const labelText = typeof evt === 'string' ? evt : `${evt.time}${evt.class ? ' • ' + evt.class : ''}`;
                        return (
                            <div
                                key={`marker-${i}`}
                                className="absolute left-3 right-3 h-4 rounded-md flex items-center justify-center text-xs text-[#F8E1CB]"
                                style={{ top: `${topPercent}%`, transform: "translateY(-50%)", background: bg }}
                            >
                                {labelText}
                            </div>
                        );
                    })}
                </div>
                <div></div>
                
            </div>
            </div>
        </div>
    )
}

export default Calendar;