export type Post = {
	slug: string;
	title: string;
	/** the title as it breaks on the home page; lines split on "|" */
	lines: string[];
	color: string;
	tldr: string;
	date: string;
	body: string;
};

const files = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
	string,
	string
>;

function parse(path: string, raw: string): Post {
	const slug = path.split('/').pop()!.replace(/\.md$/, '');
	const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
	const meta: Record<string, string> = {};
	for (const line of (match?.[1] ?? '').split('\n')) {
		const i = line.indexOf(':');
		if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
	}
	const title = meta.title ?? slug;
	return {
		slug,
		title,
		lines: (meta.lines ?? title).split('|').map((l) => l.trim()),
		color: meta.color ?? '#ff8a4b',
		tldr: meta.tldr ?? '',
		date: meta.date ?? '',
		body: (match?.[2] ?? raw).trim()
	};
}

export const posts: Post[] = Object.entries(files)
	.map(([path, raw]) => parse(path, raw))
	.sort((a, b) => a.date.localeCompare(b.date));
