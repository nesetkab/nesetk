export type Link = { title: string; href?: string };

export type Project = {
	slug: string;
	title: string;
	tags: string;
	color: string;
	description: string;
	images: string[];
	links: Link[];
};

export const HOME_COLOR = '#007fff';

export const projects: Project[] = [
	{
		slug: 'pitstop',
		title: 'pitstop',
		tags: 'SQL, react, tsx',
		color: '#ff7be5',
		description: 'a customizable dashboard for competitive robotics (FTC)',
		images: ['/projects/pitstop-1.webp'],
		links: [{ title: 'github', href: 'https://github.com/nesetkab/ftc-pitstop' }]
	},
	{
		slug: 'philidor',
		title: 'philidor',
		tags: 'python, ML',
		color: '#1fc86b',
		description: 'a chess agent that plays for draws, picking the move with the highest draw probability',
		images: [],
		links: [{ title: 'github', href: 'https://github.com/nesetkab/philidor' }]
	},
	{
		slug: 'classbar',
		title: 'classbar',
		tags: 'objective c',
		color: '#8a5cff',
		description: 'a macos menu bar app for my classes and assignments',
		images: [],
		links: [{ title: 'github', href: 'https://github.com/nesetkab/classbar' }]
	},
	{
		slug: 'the-hive',
		title: 'the hive',
		tags: 'svelte',
		color: '#ffc400',
		description: 'the website for my robotics team',
		images: [],
		links: [{ title: 'github', href: 'https://github.com/nesetkab/thehive' }]
	},
	{
		slug: 'motor-asic',
		title: 'motor asic',
		tags: 'verilog, openlane, tiny tapeout',
		color: '#00b8b0',
		description: 'a closed-loop motor controller in Verilog, taped out on SkyWater 130 nm silicon',
		images: [],
		links: []
	},
	{
		slug: 'filler-pixel-clock',
		title: 'pixel clock',
		tags: 'c, esp32',
		color: '#ff4d4d',
		description: 'Filler project. An LED matrix clock.',
		images: [],
		links: [{ title: 'github', href: 'https://github.com/nesetkab' }]
	},
	{
		slug: 'filler-tiny-gpu',
		title: 'tiny gpu',
		tags: 'verilog',
		color: '#ff8a4b',
		description:
			'Filler project with a longer description, to see how the hover card handles text that runs a few lines longer than the others.',
		images: [],
		links: []
	},
	{
		slug: 'filler-notes',
		title: 'notes',
		tags: 'rust',
		color: '#1fc86b',
		description: 'Filler. Short.',
		images: [],
		links: []
	},
	{
		slug: 'filler-long-name',
		title: 'long project name',
		tags: 'typescript, next, tailwind, postgres',
		color: '#8a5cff',
		description: 'Filler project with a long name and many tags.',
		images: [],
		links: [
			{ title: 'github', href: 'https://github.com/nesetkab' },
			{ title: 'website', href: 'https://example.com' }
		]
	},
	{
		slug: 'filler-robot-arm',
		title: 'robot arm',
		tags: 'c++, ROS',
		color: '#007fff',
		description: 'Filler project. A six-axis arm made of 3D printed parts.',
		images: [],
		links: [{ title: 'discord' }, { title: 'github', href: 'https://github.com/nesetkab' }]
	}
];

export const links: Link[] = [
	{ title: 'discord', href: 'https://discord.com/users/1009005900821954644' },
	{ title: 'github', href: 'https://github.com/nesetkab' },
	{ title: 'linkedin', href: 'https://www.linkedin.com/in/neset-kablan' },
	{ title: 'resume', href: '/resume' }
];

export const palette = [HOME_COLOR, '#ff7be5', '#ff8a4b', '#ffc400', '#1fc86b', '#8a5cff', '#00b8b0', '#ff4d4d'];
