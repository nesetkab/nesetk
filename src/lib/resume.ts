// the text of static/resume.pdf, for the /resume page; update both together

export const RESUME_COLOR = '#1fc86b';

export type Entry = {
	title: string;
	tags?: string;
	where?: string;
	when: string;
	points: string[];
};

export const education: Entry[] = [
	{
		title: 'Northeastern University',
		tags: 'Bachelor of Science in Electrical and Computer Engineering',
		where: 'Boston, MA',
		when: 'Sep 2026 – expected May 2030',
		points: []
	},
	// on the page only, not in the pdf
	{
		title: 'Beehive Science & Technology Academy',
		tags: 'High school',
		where: 'Sandy, UT',
		when: 'graduated 2026',
		points: []
	}
];

export const work: Entry[] = [
	{
		title: 'Closed-Loop Motor Controller ASIC',
		tags: 'Verilog, OpenLane, Tiny Tapeout',
		when: 'Aug 2026 – present',
		points: [
			'Designed a closed-loop motor controller in Verilog and taped it out on SkyWater 130 nm silicon through a multi-project wafer shuttle',
			'Implemented control arithmetic in fixed point, closing timing at 50 MHz after synthesis',
			'Verified with a self-checking testbench and gate-level simulation, then brought up the returned die on hardware'
		]
	},
	{
		title: 'Robot Autonomous and Shooting Systems',
		tags: 'Java, Kotlin, Limelight 3A',
		when: 'Sep 2025 – May 2026',
		points: [
			'Derived a shoot-on-the-move solver that projects robot state forward across system latency, then binary searches time of flight to solve turret heading and flywheel RPM',
			'Built an autonomous framework that cut 12 competition routines to 20–30 lines each, with alliance mirroring generating red field geometry from blue definitions',
			'Integrated Limelight AprilTag relocalization behind a staleness gate to correct odometry drift mid-match',
			'Modeled turret torque and flywheel spin-up to size the shooter motor and gearing'
		]
	},
	{
		title: 'Philidor',
		tags: 'Python, python-chess, UCI, Lichess database',
		when: 'Aug 2026 – present',
		points: [
			'Building a chess agent that plays for draws, selecting moves by highest draw probability from engine win-draw-loss evaluation',
			'Wrote a threaded UCI engine wrapper with timeout handling, and a board subclass with incremental Zobrist hashing for fast repetition detection, covered by unit tests',
			'Training a network on Lichess games with a reward function ranking draws above wins, as a research project'
		]
	},
	{
		title: 'Artifact Tracker',
		tags: 'Python, OpenCV, NumPy, Raspberry Pi',
		when: 'Aug 2025 – May 2026',
		points: [
			'Built a Raspberry Pi vision system that counts game elements by HSV color thresholding and blob area, with debounce to reject duplicate detections',
			'Wrote an interactive calibration tool that samples ball colors by click and writes thresholds, region of interest, and alliance to a configuration file',
			'Removed venue-specific retuning from the code path, so lighting changes need no rebuild'
		]
	}
];

export const experience: Entry[] = [
	{
		title: 'Team Captain',
		tags: 'FIRST Tech Challenge Team 3747, The Hive',
		where: 'Sandy, UT',
		when: 'Aug 2024 – Jun 2026',
		points: [
			'Captained a 15-student team, owning software architecture, robot design, and competition strategy',
			'Led the team to back-to-back-to-back appearances at the World Championship, winning two awards there'
		]
	},
	{
		title: 'Program Delivery Partner Assistant',
		tags: 'FIRST LEGO League Utah',
		where: 'Sandy, UT',
		when: 'Jun 2025 – Jul 2026',
		points: ['Supported statewide program delivery and competition events for participating teams']
	},
	{
		title: 'Barista',
		tags: 'Starbucks',
		where: 'Sandy, UT',
		when: 'Jan 2026 – Sep 2026',
		points: [
			'Worked 35 hours per week through a full school year while leading a robotics team and carrying a full course load'
		]
	}
];

export const skills: { label: string; value: string }[] = [
	{
		label: 'hardware',
		value: 'Verilog, digital logic design, closed-loop control, motor drivers, Raspberry Pi, Limelight vision'
	},
	{ label: 'software', value: 'Java, Python, TypeScript, SQL (PostgreSQL), OpenCV, NumPy, Git, Gradle, Linux' },
	{
		label: 'awards',
		value: 'National Merit Scholar, AP Scholar with Honor, Congressional Award Gold Medal, TSA Utah First Place in Essays in Technology'
	},
	{ label: 'languages', value: 'English, Turkish' }
];
