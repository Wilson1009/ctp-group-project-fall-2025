// Simple sidebar showing course slots; currently static placeholders.
const SideBarCal = () => {
	const slots = Array.from({ length: 6 });

	return (
		<div className="bg-[#C58747] w-[330px] h-[578px] rounded-[18px] px-4 py-4 shadow-md flex flex-col">
			<h2 className="text-[#4C2F1A] text-2xl font-semibold mb-3">course</h2>

			<div className="bg-[#E8CCA7] h-24 rounded-[18px] border border-[#e0b67c] shadow-inner flex items-center justify-center text-[#A67A4D] text-sm mb-3">
				Add or drop a course
			</div>

			<div className="flex-1 overflow-y-auto space-y-3 pr-1">
				{slots.map((_, idx) => (
					<div
						key={`slot-${idx}`}
						className="bg-[#E8CCA7] min-h-[72px] rounded-[18px] border border-[#e0b67c] shadow-inner flex items-center justify-center text-[#CFAE8F] text-sm"
					>
						Empty slot
					</div>
				))}
			</div>
		</div>
	);
};

export default SideBarCal;