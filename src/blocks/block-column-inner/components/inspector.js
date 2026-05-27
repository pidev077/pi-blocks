/**
 * Internal dependencies.
 */
import Margin from "../../../utils/components/margin";
import Padding from "../../../utils/components/padding";
import BackgroundImagePanel from "../../../utils/components/background-image/inspector";
import RenderSettingControl from "../../../utils/components/settings/renderSettingControl";

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const { PanelBody, ToggleControl, SelectControl, RangeControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component.
 */
const Inspector = (props) => {
	const { attributes, setAttributes } = props;

	const {
		marginUnit,
		marginSync,
		marginTop,
		marginBottom,
		margin,
		padding,
		paddingUnit,
		paddingSync,
		paddingTop,
		paddingLeft,
		paddingBottom,
		paddingRight,

		marginUnitTL,
		marginSyncTL,
		marginTopTL,
		marginBottomTL,
		marginTL,
		paddingTL,
		paddingUnitTL,
		paddingSyncTL,
		paddingTopTL,
		paddingLeftTL,
		paddingBottomTL,
		paddingRightTL,

		marginUnitMB,
		marginSyncMB,
		marginTopMB,
		marginBottomMB,
		marginMB,
		paddingMB,
		paddingUnitMB,
		paddingSyncMB,
		paddingTopMB,
		paddingLeftMB,
		paddingBottomMB,
		paddingRightMB,

		borderRadius,
		isBoxshadow,
		backgroundColor,
		isBorder,
		borderColor,
		borderWidth,
		borderTop,
		borderRight,
		borderBottom,
		borderLeft,
		isSticky,
	} = attributes;

	/* CSS Units. */
	const cssUnits = [
		{ value: "px", label: __("Pixel (px)", "pi-blocks") },
		{ value: "%", label: __("Percent (%)", "pi-blocks") },
		{ value: "em", label: __("Em (em)", "pi-blocks") },
	];

	return (
		<InspectorControls key="inspector">
			<PanelBody title={__("General", "pi-blocks")}>
				<RangeControl
					value={borderRadius}
					label={__("Border Radius", "pi-blocks")}
					onChange={(value) => setAttributes({ borderRadius: value })}
					__nextHasNoMarginBottom
					min={0}
					max={999}
					step={1}
				/>

				<ToggleControl
					label={__("Box Shadow", "pi-blocks")}
					help={__("Enable box shadow effect", "pi-blocks")}
					checked={isBoxshadow}
					onChange={() => setAttributes({ isBoxshadow: !isBoxshadow })}
				/>

				<ToggleControl
					label={__("Border", "pi-blocks")}
					help={__("Enable border", "pi-blocks")}
					checked={isBorder}
					onChange={() => setAttributes({ isBorder: !isBorder })}
				/>
				{isBorder && (
					<>
						<RangeControl
							value={borderWidth}
							label={__("Border Width (px)", "pi-blocks")}
							onChange={(value) =>
								setAttributes({ borderWidth: value })
							}
							__nextHasNoMarginBottom
							min={1}
							max={10}
							step={1}
						/>
						<p style={{ marginBottom: 4, fontWeight: 500 }}>
							{__("Border Sides (bỏ trống = tất cả)", "pi-blocks")}
						</p>
						<ToggleControl
							label={__("Top", "pi-blocks")}
							checked={borderTop}
							onChange={() =>
								setAttributes({ borderTop: !borderTop })
							}
						/>
						<ToggleControl
							label={__("Right", "pi-blocks")}
							checked={borderRight}
							onChange={() =>
								setAttributes({ borderRight: !borderRight })
							}
						/>
						<ToggleControl
							label={__("Bottom", "pi-blocks")}
							checked={borderBottom}
							onChange={() =>
								setAttributes({ borderBottom: !borderBottom })
							}
						/>
						<ToggleControl
							label={__("Left", "pi-blocks")}
							checked={borderLeft}
							onChange={() =>
								setAttributes({ borderLeft: !borderLeft })
							}
						/>
					</>
				)}
				<ToggleControl
					label={__("Sticky Column", "pi-blocks")}
					checked={isSticky}
					onChange={() => setAttributes({ isSticky: !isSticky })}
				/>
			</PanelBody>
			<RenderSettingControl id="pi_column_inner_marginPadding">
				<PanelBody
					title={__("Margin and Padding", "pi-blocks")}
					initialOpen={false}
				>
					<SelectControl
						label={__("Margin Unit", "pi-blocks")}
						help={__(
							"Choose between pixel, percent, or em units.",
							"pi-blocks"
						)}
						options={cssUnits}
						value={marginUnit}
						onChange={(value) =>
							setAttributes({
								marginUnit: value,
							})
						}
					/>
					<ToggleControl
						label={__("Sync Margin", "pi-blocks")}
						help={__(
							"Top and bottom margins will have the same value.",
							"pi-blocks"
						)}
						checked={marginSync}
						onChange={() =>
							setAttributes({
								marginSync: !marginSync,
							})
						}
					/>
					{!marginSync ? (
						<Margin
							/* Margin top. */
							marginEnableTop={true}
							marginTop={marginTop}
							marginTopMin="0"
							marginTopMax="200"
							onChangeMarginTop={(marginTop) =>
								setAttributes({ marginTop })
							}
							/* Margin bottom. */
							marginEnableBottom={true}
							marginBottom={marginBottom}
							marginBottomMin="0"
							marginBottomMax="200"
							onChangeMarginBottom={(marginBottom) =>
								setAttributes({ marginBottom })
							}
						/>
					) : (
						<Margin
							/* Margin top/bottom. */
							marginEnableVertical={true}
							marginVerticalLabel={__(
								"Margin Top/Bottom",
								"pi-blocks"
							)}
							marginVertical={margin}
							marginVerticalMin="0"
							marginVerticalMax="200"
							onChangeMarginVertical={(margin) =>
								setAttributes({ margin })
							}
						/>
					)}
					<hr />
					<SelectControl
						label={__("Padding Unit", "pi-blocks")}
						help={__(
							"Choose between pixel, percent, or em units.",
							"pi-blocks"
						)}
						options={cssUnits}
						value={paddingUnit}
						onChange={(value) =>
							setAttributes({
								paddingUnit: value,
							})
						}
					/>
					<ToggleControl
						label={__("Sync Padding", "pi-blocks")}
						help={__(
							"Padding on all sides will have the same value.",
							"pi-blocks"
						)}
						checked={paddingSync}
						onChange={() =>
							setAttributes({
								paddingSync: !paddingSync,
							})
						}
					/>
					{!paddingSync ? (
						<Padding
							/* Padding top. */
							paddingEnableTop={true}
							paddingTop={paddingTop}
							paddingTopMin="0"
							paddingTopMax="200"
							onChangePaddingTop={(paddingTop) =>
								setAttributes({ paddingTop })
							}
							/* Padding right. */
							paddingEnableRight={true}
							paddingRight={paddingRight}
							paddingRightMin="0"
							paddingRightMax="200"
							onChangePaddingRight={(paddingRight) =>
								setAttributes({ paddingRight })
							}
							/* Padding bottom. */
							paddingEnableBottom={true}
							paddingBottom={paddingBottom}
							paddingBottomMin="0"
							paddingBottomMax="200"
							onChangePaddingBottom={(paddingBottom) =>
								setAttributes({ paddingBottom })
							}
							/* Padding left. */
							paddingEnableLeft={true}
							paddingLeft={paddingLeft}
							paddingLeftMin="0"
							paddingLeftMax="200"
							onChangePaddingLeft={(paddingLeft) =>
								setAttributes({ paddingLeft })
							}
						/>
					) : (
						<Padding
							/* Padding. */
							paddingEnable={true}
							padding={padding}
							paddingMin="0"
							paddingMax="200"
							onChangePadding={(padding) => setAttributes({ padding })}
						/>
					)}
				</PanelBody>
			</RenderSettingControl>

			<RenderSettingControl id="pi_column_inner_marginpadding">
				<PanelBody
					title={__("Margin and Padding Tablet", "pi-blocks")}
					initialOpen={false}
				>
					<SelectControl
						label={__("Margin Unit", "pi-blocks")}
						help={__(
							"Choose between pixel, percent, or em units.",
							"pi-blocks"
						)}
						options={cssUnits}
						value={marginUnitTL}
						onChange={(value) =>
							setAttributes({
								marginUnitTL: value,
							})
						}
					/>
					<ToggleControl
						label={__("Sync Margin", "pi-blocks")}
						help={__(
							"Top and bottom margins will have the same value.",
							"pi-blocks"
						)}
						checked={marginSyncTL}
						onChange={() =>
							setAttributes({
								marginSyncTL: !marginSyncTL,
							})
						}
					/>
					{!marginSyncTL ? (
						<Margin
							/* Margin top. */
							marginEnableTop={true}
							marginTop={marginTopTL}
							marginTopMin="0"
							marginTopMax="200"
							onChangeMarginTop={(marginTopTL) =>
								setAttributes({ marginTopTL })
							}
							/* Margin bottom. */
							marginEnableBottom={true}
							marginBottom={marginBottomTL}
							marginBottomMin="0"
							marginBottomMax="200"
							onChangeMarginBottom={(marginBottomTL) =>
								setAttributes({ marginBottomTL })
							}
						/>
					) : (
						<Margin
							/* Margin top/bottom. */
							marginEnableVertical={true}
							marginVerticalLabel={__(
								"Margin Top/Bottom",
								"pi-blocks"
							)}
							marginVertical={marginTL}
							marginVerticalMin="0"
							marginVerticalMax="200"
							onChangeMarginVertical={(marginTL) =>
								setAttributes({ marginTL })
							}
						/>
					)}
					<hr />
					<SelectControl
						label={__("Padding Unit", "pi-blocks")}
						help={__(
							"Choose between pixel, percent, or em units.",
							"pi-blocks"
						)}
						options={cssUnits}
						value={paddingUnitTL}
						onChange={(value) =>
							setAttributes({
								paddingUnitTL: value,
							})
						}
					/>
					<ToggleControl
						label={__("Sync Padding", "pi-blocks")}
						help={__(
							"Padding on all sides will have the same value.",
							"pi-blocks"
						)}
						checked={paddingSyncTL}
						onChange={() =>
							setAttributes({
								paddingSyncTL: !paddingSyncTL,
							})
						}
					/>
					{!paddingSyncTL ? (
						<Padding
							/* Padding top. */
							paddingEnableTop={true}
							paddingTop={paddingTopTL}
							paddingTopMin="0"
							paddingTopMax="200"
							onChangePaddingTop={(paddingTopTL) =>
								setAttributes({ paddingTopTL })
							}
							/* Padding right. */
							paddingEnableRight={true}
							paddingRight={paddingRightTL}
							paddingRightMin="0"
							paddingRightMax="200"
							onChangePaddingRight={(paddingRightTL) =>
								setAttributes({ paddingRightTL })
							}
							/* Padding bottom. */
							paddingEnableBottom={true}
							paddingBottom={paddingBottomTL}
							paddingBottomMin="0"
							paddingBottomMax="200"
							onChangePaddingBottom={(paddingBottomTL) =>
								setAttributes({ paddingBottomTL })
							}
							/* Padding left. */
							paddingEnableLeft={true}
							paddingLeft={paddingLeftTL}
							paddingLeftMin="0"
							paddingLeftMax="200"
							onChangePaddingLeft={(paddingLeftTL) =>
								setAttributes({ paddingLeftTL })
							}
						/>
					) : (
						<Padding
							/* Padding. */
							paddingEnable={true}
							padding={paddingTL}
							paddingMin="0"
							paddingMax="200"
							onChangePadding={(paddingTL) =>
								setAttributes({ paddingTL })
							}
						/>
					)}
				</PanelBody>
			</RenderSettingControl>

			<RenderSettingControl id="pi_column_inner_marginpadding">
				<PanelBody
					title={__("Margin and Padding Mobile", "pi-blocks")}
					initialOpen={false}
				>
					<SelectControl
						label={__("Margin Unit", "pi-blocks")}
						help={__(
							"Choose between pixel, percent, or em units.",
							"pi-blocks"
						)}
						options={cssUnits}
						value={marginUnitMB}
						onChange={(value) =>
							setAttributes({
								marginUnitMB: value,
							})
						}
					/>
					<ToggleControl
						label={__("Sync Margin", "pi-blocks")}
						help={__(
							"Top and bottom margins will have the same value.",
							"pi-blocks"
						)}
						checked={marginSyncMB}
						onChange={() =>
							setAttributes({
								marginSyncMB: !marginSyncMB,
							})
						}
					/>
					{!marginSyncMB ? (
						<Margin
							/* Margin top. */
							marginEnableTop={true}
							marginTop={marginTopMB}
							marginTopMin="0"
							marginTopMax="200"
							onChangeMarginTop={(marginTopMB) =>
								setAttributes({ marginTopMB })
							}
							/* Margin bottom. */
							marginEnableBottom={true}
							marginBottom={marginBottomMB}
							marginBottomMin="0"
							marginBottomMax="200"
							onChangeMarginBottom={(marginBottomMB) =>
								setAttributes({ marginBottomMB })
							}
						/>
					) : (
						<Margin
							/* Margin top/bottom. */
							marginEnableVertical={true}
							marginVerticalLabel={__(
								"Margin Top/Bottom",
								"pi-blocks"
							)}
							marginVertical={marginMB}
							marginVerticalMin="0"
							marginVerticalMax="200"
							onChangeMarginVertical={(marginMB) =>
								setAttributes({ marginMB })
							}
						/>
					)}
					<hr />
					<SelectControl
						label={__("Padding Unit", "pi-blocks")}
						help={__(
							"Choose between pixel, percent, or em units.",
							"pi-blocks"
						)}
						options={cssUnits}
						value={paddingUnitMB}
						onChange={(value) =>
							setAttributes({
								paddingUnitMB: value,
							})
						}
					/>
					<ToggleControl
						label={__("Sync Padding", "pi-blocks")}
						help={__(
							"Padding on all sides will have the same value.",
							"pi-blocks"
						)}
						checked={paddingSyncMB}
						onChange={() =>
							setAttributes({
								paddingSyncMB: !paddingSyncMB,
							})
						}
					/>
					{!paddingSyncMB ? (
						<Padding
							/* Padding top. */
							paddingEnableTop={true}
							paddingTop={paddingTopMB}
							paddingTopMin="0"
							paddingTopMax="200"
							onChangePaddingTop={(paddingTopMB) =>
								setAttributes({ paddingTopMB })
							}
							/* Padding right. */
							paddingEnableRight={true}
							paddingRight={paddingRightMB}
							paddingRightMin="0"
							paddingRightMax="200"
							onChangePaddingRight={(paddingRightMB) =>
								setAttributes({ paddingRightMB })
							}
							/* Padding bottom. */
							paddingEnableBottom={true}
							paddingBottom={paddingBottomMB}
							paddingBottomMin="0"
							paddingBottomMax="200"
							onChangePaddingBottom={(paddingBottomMB) =>
								setAttributes({ paddingBottomMB })
							}
							/* Padding left. */
							paddingEnableLeft={true}
							paddingLeft={paddingLeftMB}
							paddingLeftMin="0"
							paddingLeftMax="200"
							onChangePaddingLeft={(paddingLeftMB) =>
								setAttributes({ paddingLeftMB })
							}
						/>
					) : (
						<Padding
							/* Padding. */
							paddingEnable={true}
							padding={paddingMB}
							paddingMin="0"
							paddingMax="200"
							onChangePadding={(paddingMB) =>
								setAttributes({ paddingMB })
							}
						/>
					)}
				</PanelBody>
			</RenderSettingControl>

			<PanelColorSettings
				title={__("Background Color", "pi-blocks")}
				colorSettings={[
					{
						value: backgroundColor,
						onChange: (backgroundColor) =>
							setAttributes({ backgroundColor }),
						label: __("Choose color", "pi-blocks"),
					},
				]}
			/>

			{isBorder && (
				<PanelColorSettings
					title={__("Border Color", "pi-blocks")}
					colorSettings={[
						{
							value: borderColor,
							onChange: (color) =>
								setAttributes({ borderColor: color }),
							label: __("Choose color", "pi-blocks"),
						},
					]}
				/>
			)}

			<RenderSettingControl id="pi_column_inner_backgroundImagePanel">
				<BackgroundImagePanel {...props} />
			</RenderSettingControl>
		</InspectorControls>
	);
};

export default Inspector;
