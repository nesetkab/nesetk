const escape = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function safeHref(href: string) {
	const scheme = href.match(/^([a-z][a-z0-9+.-]*):/i)?.[1].toLowerCase();
	return !scheme || scheme === 'http' || scheme === 'https' || scheme === 'mailto';
}

function safeSrc(src: string) {
	const scheme = src.match(/^([a-z][a-z0-9+.-]*):/i)?.[1].toLowerCase();
	return !scheme || scheme === 'http' || scheme === 'https';
}

function inline(s: string, images: string[]) {
	const held: string[] = [];
	const hold = (html: string) => `\u0000${held.push(html) - 1}\u0000`;
	const out = escape(s)
		.replace(/`([^`]+)`/g, (_, c) => hold(`<code>${c}</code>`))
		.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_all, alt, src) => {
			if (!safeSrc(src)) return alt;
			const i = images.push(src) - 1;
			const label = alt ? `view image: ${alt}` : 'view image';
			return hold(
				`<button type="button" class="zoom" data-shot="${i}" aria-label="${label}"><img src="${src}" alt="${alt}" loading="lazy" /><span class="peek" aria-hidden="true"><span>view</span></span></button>`
			);
		})
		.replace(/\*\*(?=\S)([^*]*?\S)\*\*/g, '<strong>$1</strong>')
		.replace(/(^|[^*\w])\*(?=\S)([^*]*?\S)\*(?![*\w])/g, '$1<em>$2</em>')
		.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_all, text, href) => {
			if (!safeHref(href)) return text;
			const external = /^https?:/i.test(href);
			return `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
		});
	return out.replace(/\u0000(\d+)\u0000/g, (_, i) => held[+i]);
}

export function render(md: string) {
	const out: string[] = [];
	const images: string[] = [];
	const blocks = md.replace(/\r\n/g, '\n').split(/\n{2,}/);

	for (const block of blocks) {
		const b = block.trim();
		if (!b) continue;

		if (b.startsWith('```')) {
			const code = b.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
			out.push(`<pre><code>${escape(code)}</code></pre>`);
		} else if (/^#{1,3} /.test(b)) {
			const level = b.match(/^#+/)![0].length + 1;
			out.push(`<h${level}>${inline(b.replace(/^#+ /, ''), images)}</h${level}>`);
		} else if (/^[-*] /.test(b)) {
			const items = b.split('\n').map((l) => `<li>${inline(l.replace(/^[-*] /, ''), images)}</li>`);
			out.push(`<ul>${items.join('')}</ul>`);
		} else if (b.startsWith('> ')) {
			out.push(`<blockquote>${inline(b.replace(/^> ?/gm, ''), images)}</blockquote>`);
		} else if (/^!\[[^\]]*\]\([^)\s]+\)$/.test(b)) {
			out.push(`<figure>${inline(b, images)}</figure>`);
		} else {
			out.push(`<p>${inline(b, images).replace(/\n/g, '<br />')}</p>`);
		}
	}

	return { html: out.join('\n'), images };
}
