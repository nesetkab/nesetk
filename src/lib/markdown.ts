const escape = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function safeHref(href: string) {
	const scheme = href.match(/^([a-z][a-z0-9+.-]*):/i)?.[1].toLowerCase();
	return !scheme || scheme === 'http' || scheme === 'https' || scheme === 'mailto';
}

function inline(s: string) {
	const code: string[] = [];
	const out = escape(s)
		.replace(/`([^`]+)`/g, (_, c) => `\u0000${code.push(`<code>${c}</code>`) - 1}\u0000`)
		.replace(/\*\*(?=\S)([^*]*?\S)\*\*/g, '<strong>$1</strong>')
		.replace(/(^|[^*\w])\*(?=\S)([^*]*?\S)\*(?![*\w])/g, '$1<em>$2</em>')
		.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_all, text, href) => {
			if (!safeHref(href)) return text;
			const external = /^https?:/i.test(href);
			return `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
		});
	return out.replace(/\u0000(\d+)\u0000/g, (_, i) => code[+i]);
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
