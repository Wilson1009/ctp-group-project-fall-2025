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
                <div className="flex flex-col items-center gap-1 h-[445px] py-2 no-scrollbar">
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">7-8 AM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">8-9 AM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">9-10 AM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">10-11 AM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">11-12 PM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">1-2 PM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">2-3 PM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">3-4 PM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">4-5 PM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">5-6 PM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">6-7 PM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">7-8 PM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">8-9 PM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                    <div className="w-[75px] h-[33px] bg-[#DBA069] rounded-[25px] flex items-center justify-center text-white text-xs">9-10 PM<p className="m-0 text-xs text-[#4C2F1A]"></p></div>
                </div>
                <div className="col-span-6 h-[445px] bg-[#E6BD97] rounded-[10px] justify-self-center relative overflow-hidden w-[530px] mx-auto grid grid-cols-6 gap-1 p-2">
                    {/* Day columns with time-positioned class markers */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => {
                        const dayEvents = events.filter((evt) => evt && evt.day === day);
                        return (
                            <div key={day} className="relative h-full">
                                {/* Guide lines for each time slot (7 AM - 10 PM = 15 hours) */}
                                {Array.from({ length: 15 }).map((_, idx) => {
                                    const slotCount = 15;
                                    const topPercent = ((idx + 0.5) / slotCount) * 100;
                                    return (
                                        <div
                                            key={`line-${day}-${idx}`}
                                            className="absolute left-0 right-0 h-px bg-[#CFAE8F] opacity-40"
                                            style={{ top: `${topPercent}%`, transform: 'translateY(-50%)' }}
                                        />
                                    );
                                })}
                                {/* Class markers for this day */}
                                {dayEvents.map((evt, i) => {
                                    const timeStr = evt.time;
                                    const parts = timeStr.split(":");
                                    const h = parseInt(parts[0] || "0", 10);
                                    const m = parseInt(parts[1] || "0", 10);
                                    const minutes = (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
                                    const startMinutes = 7 * 60; // 7:00 AM
                                    const endMinutes = 22 * 60; // 10:00 PM
                                    const rangeMinutes = endMinutes - startMinutes; // 900 minutes = 15 hours
                                    const topPercent = ((minutes - startMinutes) / rangeMinutes) * 100;
                                    const bg = evt.color || '#a64d5d';
                                    const className = evt.class ? evt.class.split(':')[1] : 'Class';
                                    return (
                                        <div
                                            key={`marker-${day}-${i}`}
                                            className="absolute left-1 right-1 h-3 rounded-sm flex items-center justify-center text-xs font-semibold text-white overflow-hidden"
                                            style={{ top: `${topPercent}%`, transform: 'translateY(-50%)', background: bg }}
                                            title={`${evt.time} - ${className}`}
                                        >
                                            {className}
                                        </div>
                                    );
                                })}
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