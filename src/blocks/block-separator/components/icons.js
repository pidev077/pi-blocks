export const renderIcon = (type, size) => {
	const s = size || 16;
	switch (type) {
		case "star":
			return (
				<svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" />
				</svg>
			);
		case "cross":
			return (
				<svg width={s} height={s} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<rect x="8.5" y="0" width="3" height="20" rx="1.5" />
					<rect x="0" y="8.5" width="20" height="3" rx="1.5" />
				</svg>
			);
		case "fleur":
			return (
				<svg width={s} height={s} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<circle cx="10" cy="10" r="2" />
					<ellipse cx="10" cy="3.5" rx="1.8" ry="3" />
					<ellipse cx="10" cy="16.5" rx="1.8" ry="3" />
					<ellipse cx="3.5" cy="10" rx="3" ry="1.8" />
					<ellipse cx="16.5" cy="10" rx="3" ry="1.8" />
				</svg>
			);
		case "diamond":
		default:
			return (
				<svg width={s} height={s} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 0 C10 0 11.5 7 20 10 C11.5 13 10 20 10 20 C10 20 8.5 13 0 10 C8.5 7 10 0 10 0Z" />
				</svg>
			);
	}
};
