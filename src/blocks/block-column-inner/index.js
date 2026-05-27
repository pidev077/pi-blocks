/**
 * BLOCK: Pi Blocks Advanced Columns InnerBlocks.
 */

/**
 * Internal dependencies.
 */
import Edit from "./components/edit";
import Save from "./components/save";
import "./styles/style.scss";
import "./styles/editor.scss";
import BackgroundAttributes from "../../utils/components/background-image/attributes";

/**
 * WordPress dependencies.
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

/**
 * Register advanced columns block.
 */
registerBlockType("pi-blocks/pi-column", {
	apiVersion: 3,
	title: "Column",
	description: __("Add a pre-defined column layout.", "pi-blocks"),
	icon: "editor-table",
	category: "pi-blocks",
	parent: ["pi-blocks/pi-columns"],
	keywords: [
		__("column", "pi-blocks"),
		__("layout", "pi-blocks"),
		__("row", "pi-blocks"),
	],
	attributes: {
		...BackgroundAttributes,
		backgroundColor: {
			type: "string",
		},
		marginSync: {
			type: "boolean",
			default: false,
		},
		marginUnit: {
			type: "string",
			default: "px",
		},
		margin: {
			type: "number",
			default: 0,
		},
		marginTop: {
			type: "number",
			default: 0,
		},
		marginBottom: {
			type: "number",
			default: 0,
		},
		paddingSync: {
			type: "boolean",
			default: false,
		},
		paddingUnit: {
			type: "string",
			default: "px",
		},
		padding: {
			type: "number",
			default: 0,
		},
		paddingTop: {
			type: "number",
			default: 0,
		},
		paddingRight: {
			type: "number",
			default: 0,
		},
		paddingBottom: {
			type: "number",
			default: 0,
		},
		paddingLeft: {
			type: "number",
			default: 0,
		},

		marginSyncTL: {
			type: "boolean",
			default: false,
		},
		marginUnitTL: {
			type: "string",
			default: "px",
		},
		marginTL: {
			type: "number",
			default: 0,
		},
		marginTopTL: {
			type: "number",
			default: 0,
		},
		marginBottomTL: {
			type: "number",
			default: 0,
		},
		paddingSyncTL: {
			type: "boolean",
			default: false,
		},
		paddingUnitTL: {
			type: "string",
			default: "px",
		},
		paddingTL: {
			type: "number",
			default: 0,
		},
		paddingTopTL: {
			type: "number",
			default: 0,
		},
		paddingRightTL: {
			type: "number",
			default: 0,
		},
		paddingBottomTL: {
			type: "number",
			default: 0,
		},
		paddingLeftTL: {
			type: "number",
			default: 0,
		},

		marginSyncMB: {
			type: "boolean",
			default: false,
		},
		marginUnitMB: {
			type: "string",
			default: "px",
		},
		marginMB: {
			type: "number",
			default: 0,
		},
		marginTopMB: {
			type: "number",
			default: 0,
		},
		marginBottomMB: {
			type: "number",
			default: 0,
		},
		paddingSyncMB: {
			type: "boolean",
			default: false,
		},
		paddingUnitMB: {
			type: "string",
			default: "px",
		},
		paddingMB: {
			type: "number",
			default: 0,
		},
		paddingTopMB: {
			type: "number",
			default: 0,
		},
		paddingRightMB: {
			type: "number",
			default: 0,
		},
		paddingBottomMB: {
			type: "number",
			default: 0,
		},
		paddingLeftMB: {
			type: "number",
			default: 0,
		},

		columnVerticalAlignment: {
			type: "string",
		},
		borderRadius: {
			type: "number",
			default: 0,
		},
		isBoxshadow: {
			type: "boolean",
			default: false,
		},
		isBorder: {
			type: "boolean",
			default: false,
		},
		borderColor: {
			type: "string",
			default: "",
		},
		borderWidth: {
			type: "number",
			default: 1,
		},
		borderTop: {
			type: "boolean",
			default: false,
		},
		borderRight: {
			type: "boolean",
			default: false,
		},
		borderBottom: {
			type: "boolean",
			default: false,
		},
		borderLeft: {
			type: "boolean",
			default: false,
		},
		isSticky: {
			type: "boolean",
			default: false,
		},
	},

	/* Render the block in the editor. */
	edit: (props) => {
		return <Edit {...props} />;
	},

	/* Save the block markup. */
	save: (props) => {
		return <Save {...props} />;
	},
});

/* Add the vertical column alignment class to the block wrapper. */
const withClientIdClassName = wp.compose.createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			const blockName = props.block.name;

			if (
				"pi-blocks/pi-column" === blockName &&
				props.block.attributes.columnVerticalAlignment
			) {
				return (
					<BlockListBlock
						{...props}
						className={
							"pi-is-vertically-aligned-" +
							props.block.attributes.columnVerticalAlignment
						}
					/>
				);
			}
			return <BlockListBlock {...props} />;
		};
	},
	"withClientIdClassName"
);

wp.hooks.addFilter(
	"editor.BlockListBlock",
	"pi-blocks/add-vertical-align-class",
	withClientIdClassName
);
