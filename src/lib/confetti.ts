import { reduced } from './motion';

const notch = 'radial-gradient(7.19% 7.19% at 0 0, #0000 97%, #000 100%)';

export function burst(x: number, y: number, colors: string[], count = 36) {
	if (reduced()) return;

	for (let i = 0; i < count; i++) {
		const el = document.createElement('div');
		const size = 8 + Math.random() * 22;
		Object.assign(el.style, {
			position: 'fixed',
			left: `${x - size / 2}px`,
			top: `${y - size / 2}px`,
			width: `${size}px`,
			height: `${size}px`,
			background: colors[i % colors.length],
			borderRadius: '0 0 100% 0',
			pointerEvents: 'none',
			zIndex: '60'
		});
		el.style.setProperty('mask', notch);
		el.style.setProperty('-webkit-mask', notch);
		document.body.appendChild(el);

		const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.6;
		const speed = 260 + Math.random() * 520;
		const vx = Math.cos(angle) * speed;
		const vy = Math.sin(angle) * speed;
		const spin = (Math.random() - 0.5) * 1440;
		const duration = 1100 + Math.random() * 900;
		const steps = 12;
		const frames: Keyframe[] = [];
		for (let s = 0; s <= steps; s++) {
			const t = (s / steps) * (duration / 1000);
			const dx = vx * t;
			const dy = vy * t + 0.5 * 1500 * t * t;
			frames.push({
				transform: `translate(${dx}px, ${dy}px) rotate(${spin * (s / steps)}deg) scale(${1 - (s / steps) * 0.4})`,
				opacity: s > steps * 0.7 ? 1 - (s - steps * 0.7) / (steps * 0.3) : 1
			});
		}
		el.animate(frames, { duration, easing: 'linear' }).finished.then(() => el.remove());
	}
}
