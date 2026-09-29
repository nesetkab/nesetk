export type Link = { title: string; href?: string };

export type Project = {
	slug: string;
	title: string;
	tags: string;
	color: string;
	description: string;
	/** paths under /static; when empty the gallery draws a generated pattern instead */
	images: string[];
	links: Link[];
};

export const HOME_COLOR = '#007fff';

/** order matters: the home page lays these out in a zig-zag, bottom first */
export const projects: Project[] = [
	{
		slug: 'pitstop',
		title: 'pitstop',
		tags: 'SQL, react, tsx',
		color: '#ff7be5',
		description: 'a customizable dashboard for competitive robotics (FTC)',
		images: [],
		links: [{ title: 'github', href: 'https://github.com/nesetkab/ftc-pitstop' }]
	},
	{
		slug: 'philidor',
		title: 'philidor',
		tags: 'python, ML',
		color: '#1fc86b',
		description: 'a chess engine that plays for the draw against any opponent',
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
		slug: 'chip-design',
		title: 'chip design',
		tags: 'verilog, idk, something sum',
		color: '#00b8b0',
		description: 'an ongoing dive into digital logic and chip design',
		images: [],
		links: []
	}
];

export const links: Link[] = [
	{ title: 'discord', href: 'https://discord.com/users/1009005900821954644' },
	{ title: 'github', href: 'https://github.com/nesetkab' },
	{ title: 'linkedin', href: 'https://www.linkedin.com/in/neset-kablan' },
	{ title: 'twitter' }
];

/** every accent the site uses, for confetti and the hero color cycle */
export const palette = [HOME_COLOR, '#ff7be5', '#ff8a4b', '#ffc400', '#1fc86b', '#8a5cff', '#00b8b0', '#ff4d4d'];
