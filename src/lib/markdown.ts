import { Marked, type RendererObject, type Tokens } from 'marked';

const ALLOWED_TAGS = new Set(['small', 'sub', 'sup', 'kbd', 'mark', 'u', 's', 'del', 'br']);

const escape = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const escapeText = (s: string) => s.replace(/&(?!#?\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const scheme = (url: string) => url.match(/^([a-z][a-z0-9+.-]*):/i)?.[1].toLowerCase();

const allowed = (url: string, schemes: string[]) => {
	const s = scheme(url);
	return !s || schemes.includes(s);
};

export const safeHref = (href: string) => allowed(href, ['http', 'https', 'mailto']);
export const safeSrc = (src: string) => allowed(src, ['http', 'https']);

function clean(url: string) {
	try {
		return encodeURI(url).replace(/%25/g, '%');
	} catch {
		return null;
	}
}

function sanitize(html: string) {
	return html.replace(
		/<!--[\s\S]*?(?:-->|$)|<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>|[^<]+|</g,
		(part, tag: string | undefined) => {
			if (part.startsWith('<!--')) return '';
			if (tag) {
				const name = tag.toLowerCase();
				if (!ALLOWED_TAGS.has(name)) return escape(part);
				if (name === 'br') return '<br />';
				return part.startsWith('</') ? `</${name}>` : `<${name}>`;
			}
			return escapeText(part);
		}
	);
}

export function render(md: string) {
	const images: string[] = [];
	const alts: string[] = [];
	let linkDepth = 0;

	const renderer: RendererObject = {
		heading({ tokens, depth }: Tokens.Heading) {
			const level = Math.min(depth + 1, 6);
			return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>\n`;
		},

		code({ text, lang, escaped }: Tokens.Code) {
			const language = lang?.match(/^\S+/)?.[0];
			const body = (escaped ? text : escape(text)).replace(/\n$/, '');
			return `<pre><code${language ? ` class="language-${escape(language)}"` : ''}>${body}</code></pre>\n`;
		},

		paragraph({ tokens }: Tokens.Paragraph) {
			const inner = this.parser.parseInline(tokens);
			const [only] = tokens;
			const lone = tokens.length === 1 && only.type === 'image' && safeSrc((only as Tokens.Image).href);
			return lone ? `<figure>${inner}</figure>\n` : `<p>${inner}</p>\n`;
		},

		link({ href, title, tokens }: Tokens.Link) {
			linkDepth++;
			const inner = this.parser.parseInline(tokens);
			linkDepth--;
			const url = clean(href);
			if (!url || !safeHref(url)) return inner;
			const external = /^https?:/i.test(url);
			const attrs = [
				`href="${escape(url)}"`,
				title ? `title="${escape(title)}"` : '',
				external ? 'target="_blank" rel="noopener noreferrer"' : ''
			].filter(Boolean);
			return `<a ${attrs.join(' ')}>${inner}</a>`;
		},

		image({ href, title, text, tokens }: Tokens.Image) {
			const alt = tokens ? this.parser.parseInline(tokens, this.parser.textRenderer) : text;
			const url = clean(href);
			if (!url || !safeSrc(url)) return escape(alt);
			const img = `<img src="${escape(url)}" alt="${escape(alt)}"${title ? ` title="${escape(title)}"` : ''} loading="lazy" />`;
			if (linkDepth > 0) return img;
			const i = images.push(url) - 1;
			alts.push(alt);
			const label = escape(alt ? `view image: ${alt}` : 'view image');
			return `<button type="button" class="zoom" data-shot="${i}" aria-label="${label}">${img}<span class="peek" aria-hidden="true"><span>view</span></span></button>`;
		},

		html({ text }: Tokens.HTML | Tokens.Tag) {
			return sanitize(text);
		}
	};

	const html = new Marked({ gfm: true, breaks: true, renderer }).parse(md, { async: false });
	return { html, images, alts };
}
