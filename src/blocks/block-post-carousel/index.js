import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./components/edit";
import Save from "./components/save";

const BlockAttrs = {
	posts_per_page: {
		type: "number",
		default: 6,
	},
	order: {
		type: "string",
		default: "desc",
	},
	orderBy: {
		type: "string",
		default: "date",
	},
	cat: {
		type: "number",
		default: 0,
	},
	showExcerpt: {
		type: "boolean",
		default: true,
	},
	showMeta: {
		type: "boolean",
		default: true,
	},
	anchor: {
		type: "string",
	},
};

export default registerBlockType("pi-blocks/block-post-carousel", {
	apiVersion: 3,
	title: __("Post Carousel"),
	icon: "slides",
	category: "pi-blocks",
	keywords: [__("post"), __("carousel"), __("blog"), __("slider")],
	attributes: BlockAttrs,
	supports: {
		anchor: true,
	},
	edit: (props) => <Edit {...props} />,
	save: (props) => <Save {...props} />,
});
