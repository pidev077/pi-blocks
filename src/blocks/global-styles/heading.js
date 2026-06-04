import classnames from "classnames";
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { Fragment } from "@wordpress/element";
import { createHigherOrderComponent } from "@wordpress/compose";
import { SelectControl, ToggleControl, PanelBody } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

const allowedBlocks = ["core/heading", "core/paragraph", "core/list"];

const addAttributes = (settings) => {
	if (allowedBlocks.includes(settings.name)) {
		settings.attributes = Object.assign(settings.attributes, {
			piFontFamily: { type: "string" },
			enableAnimation: { type: "boolean", default: false },
			typeAnimation: { type: "string", default: "fadein-chars" },
			enableStrikethrough: { type: "boolean", default: false },
		});
	}
	return settings;
};

const withAdvancedControls = createHigherOrderComponent(
	(BlockEdit) => (props) => {
		const {
			name,
			attributes: { piFontFamily, enableAnimation, typeAnimation, enableStrikethrough },
			setAttributes,
		} = props;

		return (
			<Fragment>
				<BlockEdit {...props} />
				{allowedBlocks.includes(name) && (
					<InspectorControls group="settings">
						<PanelBody
							title={__("General", "pi-blocks")}
							initialOpen={true}
						>
							<SelectControl
								label="Select Font Family"
								value={piFontFamily}
								options={[
									{ label: "--Select--", value: "" },
									{ label: "Google Sans", value: "google-sans" },
									{ label: "Playfair Display", value: "playfair-display" },
								]}
								onChange={(vl) => setAttributes({ piFontFamily: vl })}
							/>
							<ToggleControl
								label="Enable Animation"
								checked={enableAnimation}
								onChange={() =>
									setAttributes({
										enableAnimation: !enableAnimation,
									})
								}
							/>
							{enableAnimation && (
								<SelectControl
									label="Select Animation"
									value={typeAnimation}
									options={[
										{ label: "Fade In Chars", value: "fadein-chars" },
										{
											label: "Stagger Random",
											value: "stagger-random",
										},
									]}
									onChange={(vl) =>
										setAttributes({ typeAnimation: vl })
									}
								/>
							)}
							<ToggleControl
								label="Strikethrough"
								checked={enableStrikethrough}
								onChange={() =>
									setAttributes({
										enableStrikethrough: !enableStrikethrough,
									})
								}
							/>
						</PanelBody>
					</InspectorControls>
				)}
			</Fragment>
		);
	},
	"withAdvancedControls"
);

const applyExtraClass = (
	extraProps,
	blockType,
	{ piFontFamily, enableAnimation, typeAnimation, enableStrikethrough }
) => {
	if (!allowedBlocks.includes(blockType.name)) {
		return extraProps;
	}

	extraProps.className = classnames(
		extraProps.className,
		piFontFamily ? "font-" + piFontFamily : "",
		enableAnimation ? `wp-block-heading-${typeAnimation}` : "",
		enableStrikethrough ? "heading-strikethrough" : ""
	);

	return extraProps;
};

// Add filters
addFilter(
	"blocks.registerBlockType",
	"editorskit/custom-attributes",
	addAttributes
);
addFilter(
	"editor.BlockEdit",
	"editorskit/custom-advanced-control",
	withAdvancedControls
);
addFilter(
	"blocks.getSaveContent.extraProps",
	"editorskit/applyExtraClass",
	applyExtraClass
);
