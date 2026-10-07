export const STUDIO_COLOR = '#ff5a1f';

export const INQUIRY_EMAIL = 'neset.kab@gmail.com';

export const INQUIRY_ENDPOINT = '';

export type Work = {
	title: string;
	kind: string;
	stack: string;
	image: string;
	live: string;
	more?: string;
};

export const work: Work[] = [
	{
		title: 'the hive',
		kind: 'website for a robotics team',
		stack: 'sveltekit, tailwind',
		image: '/notch/hive.jpg',
		live: 'https://hive3747.com',
		more: '/projects/the-hive'
	},
	{
		title: 'pitstop',
		kind: 'web app for FTC teams',
		stack: 'next.js, react',
		image: '/projects/pitstop-1.webp',
		live: 'https://www.ftcpitstop.com/',
		more: '/projects/pitstop'
	},
	{
		title: 'neşet',
		kind: 'personal site, this one',
		stack: 'sveltekit, motion design',
		image: '/notch/nesetk.jpg',
		live: '/'
	}
];

export type Service = { id: string; name: string; line: string; points: string[] };

export const services: Service[] = [
	{
		id: 'one page',
		name: 'one page',
		line: 'for an event, a club, or a simple business',
		points: ['custom design', 'works on every screen', 'contact form', 'live on your domain']
	},
	{
		id: 'full site',
		name: 'full site',
		line: 'a few pages that tell your whole story',
		points: ['everything in one page', 'up to around five pages', 'news or blog you can edit', 'search and social previews']
	},
	{
		id: 'web app',
		name: 'web app',
		line: 'dashboards, tools, and logins',
		points: ['built with sveltekit or next.js', 'database and accounts', 'live data from your apis', 'hosting set up for you']
	}
];

export const steps = [
	{ name: 'chat', text: 'a quick call or email about what you need and who it is for.' },
	{ name: 'design', text: 'you get a design to react to before any code is written.' },
	{ name: 'build', text: 'i build it, and you watch it come together on a live preview link.' },
	{ name: 'launch', text: 'it goes live on your domain, and i stick around for fixes.' }
];

export const faqs = [
	{
		q: 'how much does a site cost?',
		a: 'it depends on the size and what it needs to do. send the form below and i will reply with a quote.'
	},
	{
		q: 'how long does it take?',
		a: 'a simple site can be done in a couple of weeks. bigger ones take longer, and we set the timeline together up front.'
	},
	{
		q: 'can i update it myself later?',
		a: 'yes. i can set it up so you can change text and post updates without touching code, and show you how.'
	},
	{
		q: 'do you handle hosting and domains?',
		a: 'yes. i set up fast hosting and connect your domain, so it is one less thing to figure out.'
	},
	{
		q: 'who is behind notch?',
		a: 'neşet kablan, an electrical and computer engineering student at northeastern who designs and builds for the web.'
	}
];

export const needs = ['one page', 'full site', 'web app', 'not sure'];
export const budgets = ['under $500', '$500 to $1,500', '$1,500+', 'not sure'];
export const timelines = ['asap', 'in 1 to 2 months', 'no rush'];
