export const renderIcon = (type, size) => {
	const s = size || 16;
	switch (type) {
		case "star":
			return (
				<svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<polygon points="12,2 14.4,9.2 22,9.2 16,13.8 18.4,21 12,16.4 5.6,21 8,13.8 2,9.2 9.6,9.2" />
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
					<circle cx="10" cy="10" r="2.2" />
					<ellipse cx="10" cy="3" rx="2" ry="3" />
					<ellipse cx="10" cy="17" rx="2" ry="3" />
					<ellipse cx="3" cy="10" rx="3" ry="2" />
					<ellipse cx="17" cy="10" rx="3" ry="2" />
				</svg>
			);
		case "diamond":
		default:
			return (
				<svg width={s} height={s} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path d="M8 0L10.1607 5.83927L16 8L10.1607 10.1607L8 16L5.83927 10.1607L0 8L5.83927 5.83927L8 0Z" />
				</svg>
			);
	}
};
