// a very small markdown renderer: headings, lists, quotes, code blocks, paragraphs, and inline marks

const escape = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(s: string) {
	return escape(s)
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
		.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
		.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
			const external = /^https?:/.test(href);
			return `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
		});
}

export function render(md: string) {
	const out: string[] = [];
	const blocks = md.replace(/\r\n/g, '\n').split(/\n{2,}/);

	for (const block of blocks) {
		const b = block.trim();
		if (!b) continue;

		if (b.startsWith('```')) {
			const code = b.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
			out.push(`<pre><code>${escape(code)}</code></pre>`);
		} else if (/^#{1,3} /.test(b)) {
			const level = b.match(/^#+/)![0].length + 1;
			out.push(`<h${level}>${inline(b.replace(/^#+ /, ''))}</h${level}>`);
		} else if (/^[-*] /.test(b)) {
			const items = b.split('\n').map((l) => `<li>${inline(l.replace(/^[-*] /, ''))}</li>`);
			out.push(`<ul>${items.join('')}</ul>`);
		} else if (b.startsWith('> ')) {
			out.push(`<blockquote>${inline(b.replace(/^> ?/gm, ''))}</blockquote>`);
		} else {
			out.push(`<p>${inline(b).replace(/\n/g, '<br />')}</p>`);
		}
	}

	return out.join('\n');
}
