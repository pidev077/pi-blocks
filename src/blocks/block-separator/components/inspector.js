import { InspectorControls } from "@wordpress/block-editor";
import {
	ToggleControl,
	PanelBody,
	RangeControl,
	SelectControl,
	ColorPicker,
} from "@wordpress/components";

const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const {
		colorBg,
		fullwidth,
		alignBlock,
		widthSep,
		heightSep,
		showIcon,
		iconType,
		iconSize,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title="Layout">
				<ToggleControl
					label="Full width"
					checked={fullwidth}
					onChange={() => setAttributes({ fullwidth: !fullwidth })}
				/>
				{!fullwidth && (
					<>
						<RangeControl
							label="Width (%)"
							value={widthSep}
							onChange={(value) => setAttributes({ widthSep: value })}
							min={10}
							max={100}
							step={1}
						/>
						<SelectControl
							label="Alignment"
							value={alignBlock}
							options={[
								{ label: "Left", value: "left" },
								{ label: "Center", value: "center" },
								{ label: "Right", value: "right" },
							]}
							onChange={(value) => setAttributes({ alignBlock: value })}
						/>
					</>
				)}
				<RangeControl
					label="Height (px)"
					value={heightSep}
					onChange={(value) => setAttributes({ heightSep: value })}
					min={1}
					max={8}
					step={1}
				/>
			</PanelBody>

			<PanelBody title="Icon">
				<ToggleControl
					label="Show icon"
					checked={showIcon}
					onChange={() => setAttributes({ showIcon: !showIcon })}
				/>
				{showIcon && (
					<>
						<SelectControl
							label="Icon type"
							value={iconType}
							options={[
								{ label: "Diamond", value: "diamond" },
								{ label: "Star", value: "star" },
								{ label: "Cross", value: "cross" },
								{ label: "Fleur", value: "fleur" },
							]}
							onChange={(value) => setAttributes({ iconType: value })}
						/>
						<RangeControl
							label="Icon size (px)"
							value={iconSize}
							onChange={(value) => setAttributes({ iconSize: value })}
							min={8}
							max={40}
							step={1}
						/>
					</>
				)}
			</PanelBody>

			<PanelBody initialOpen={false} title="Color">
				<ColorPicker
					color={colorBg}
					onChange={(value) => setAttributes({ colorBg: value })}
					enableAlpha
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
