const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { RangeControl } = wp.components;

export default function Padding(props) {
	const {
		// Padding props
		padding,
		paddingTitle,
		paddingHelp,
		paddingMin,
		paddingMax,
		paddingEnable,
		onChangePadding = () => { },

		// Padding top props
		paddingTop,
		paddingTopMin,
		paddingTopMax,
		paddingEnableTop,
		onChangePaddingTop = () => { },

		// Padding right props
		paddingRight,
		paddingRightMin,
		paddingRightMax,
		paddingEnableRight,
		onChangePaddingRight = () => { },

		// Padding bottom props
		paddingBottom,
		paddingBottomMin,
		paddingBottomMax,
		paddingEnableBottom,
		onChangePaddingBottom = () => { },

		// Padding left props
		paddingLeft,
		paddingLeftMin,
		paddingLeftMax,
		paddingEnableLeft,
		onChangePaddingLeft = () => { },

		// Padding vertical props
		paddingVertical,
		paddingVerticalLabel,
		paddingEnableVertical,
		paddingVerticalMin,
		paddingVerticalMax,
		onChangePaddingVertical = () => { },

		// Padding horizontal props
		paddingHorizontal,
		paddingEnableHorizontal,
		paddingHorizontalMin,
		paddingHorizontalMax,
		onChangePaddingHorizontal = () => { },
	} = props;

	return (
		<Fragment>
			{paddingEnableTop && (
				<RangeControl
					label={__('Padding Top', 'pi-blocks')}
					value={paddingTop}
					min={paddingTopMin}
					max={paddingTopMax}
					onChange={onChangePaddingTop}
					__nextHasNoMarginBottom
				/>
			)}
			{paddingEnableRight && (
				<RangeControl
					label={__('Padding Right', 'pi-blocks')}
					value={paddingRight}
					min={paddingRightMin}
					max={paddingRightMax}
					onChange={onChangePaddingRight}
					__nextHasNoMarginBottom
				/>
			)}
			{paddingEnableBottom && (
				<RangeControl
					label={__('Padding Bottom', 'pi-blocks')}
					value={paddingBottom}
					min={paddingBottomMin}
					max={paddingBottomMax}
					onChange={onChangePaddingBottom}
					__nextHasNoMarginBottom
				/>
			)}
			{paddingEnableLeft && (
				<RangeControl
					label={__('Padding Left', 'pi-blocks')}
					value={paddingLeft}
					min={paddingLeftMin}
					max={paddingLeftMax}
					onChange={onChangePaddingLeft}
					__nextHasNoMarginBottom
				/>
			)}
			{paddingEnableVertical && (
				<RangeControl
					label={
						paddingVerticalLabel
							? paddingVerticalLabel
							: __('Padding Vertical', 'pi-blocks')
					}
					value={paddingVertical}
					min={paddingVerticalMin}
					max={paddingVerticalMax}
					onChange={onChangePaddingVertical}
					__nextHasNoMarginBottom
				/>
			)}
			{paddingEnableHorizontal && (
				<RangeControl
					label={__('Padding Horizontal', 'pi-blocks')}
					value={paddingHorizontal}
					min={paddingHorizontalMin}
					max={paddingHorizontalMax}
					onChange={onChangePaddingHorizontal}
					__nextHasNoMarginBottom
				/>
			)}

			{paddingEnable && (
				<RangeControl
					label={__('Padding', 'pi-blocks')}
					value={padding}
					min={paddingMin}
					max={paddingMax}
					onChange={onChangePadding}
					__nextHasNoMarginBottom
				/>
			)}
		</Fragment>
	);
}
