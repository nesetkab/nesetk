import { error } from '@sveltejs/kit';
import { posts } from '$lib/posts';
import { render } from '$lib/markdown';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => posts.map((p) => ({ slug: p.slug }));

export const load: PageServerLoad = ({ params }) => {
	const post = posts.find((p) => p.slug === params.slug);
	if (!post) error(404, 'no such post');
	const { body, ...meta } = post;
	return { post: meta, body: render(body) };
};
