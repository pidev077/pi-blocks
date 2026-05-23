//import style
import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./components/edit";
import Save from "./components/save";

const blockIcon = (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		role="img"
		aria-hidden="true"
		focusable="false"
	>
		<path d="M20.2 7v4H3.8V7H2.2v9h1.6v-3.5h16.4V16h1.6V7z"></path>
	</svg>
);

const BlockAttrs = {
	fullwidth: {
		type: "boolean",
		default: true,
	},
	colorBg: {
		type: "string",
		default: "#27211C",
	},
	widthSep: {
		type: "number",
		default: 60,
	},
	heightSep: {
		type: "number",
		default: 1,
	},
	alignBlock: {
		type: "string",
		default: "center",
	},
	showIcon: {
		type: "boolean",
		default: true,
	},
	iconType: {
		type: "string",
		default: "diamond",
	},
	iconSize: {
		type: "number",
		default: 16,
	},
};

export default registerBlockType("pi-blocks/pi-separator-block", {
	apiVersion: 3,
	title: __("Separator"),
	description: __(
		"Create a break between ideas or sections with a horizontal separator.",
	),
	icon: blockIcon,
	category: "pi-blocks",
	keywords: [__("separator"), __(""), __("break")],
	attributes: BlockAttrs,
	edit: (props) => {
		return <Edit {...props} />;
	},
	save: (props) => {
		return <Save {...props} />;
	},
});
