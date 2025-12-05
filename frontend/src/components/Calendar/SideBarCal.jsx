const SideBarCal = ({ events = [] }) => {
    const maxSlots = 6;
    const slots = Array.from({ length: maxSlots }).map((_, i) => events[i] || null);

    return (
        <div className="bg-[#C58747] w-[330px] h-[578px] rounded-[18px] px-4 py-4 shadow-md flex flex-col">
            <h2 className="text-[#4C2F1A] text-2xl font-semibold mb-3">course</h2>

            <div className="bg-[#E8CCA7] h-20 rounded-[18px] border border-[#e0b67c] shadow-inner flex items-center justify-center text-[#A67A4D] text-sm mb-3">
                Add or drop a course
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {slots.map((slot, idx) => (
                    <div
                        key={`slot-${idx}`}
                        className="bg-[#E8CCA7] h-20 rounded-[18px] border border-[#e0b67c] shadow-inner flex items-center justify-center px-3 text-sm"
                    >
                        {slot ? (
                            <div className="text-[#4C2F1A] text-center leading-tight">
                                <div className="font-semibold">{slot.class || "Class"}</div>
                                <div className="text-xs text-[#7a5a38]">{slot.day || "--"} • {slot.time || "--:--"}</div>
                            </div>
                        ) : (
                            <span className="text-[#CFAE8F]">Empty slot</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBarCal;