
/**
 * Background image classes.
 *
 * @param {Object} attributes
 */
function BackgroundImageClasses( attributes ) {
	return [
		attributes.backgroundImgURL &&
		attributes.backgroundSize &&
		'no-repeat' === attributes.backgroundRepeat
			? 'pi-background-' + attributes.backgroundSize
			: null,
		attributes.backgroundImgURL && attributes.backgroundRepeat
			? 'pi-background-' + attributes.backgroundRepeat
			: null,
	];
}

export default BackgroundImageClasses;
