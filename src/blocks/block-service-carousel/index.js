import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./components/edit";
import Save from "./components/save";

const BlockAttrs = {
	parent_only: {
		type: "boolean",
		default: true,
	},
	posts_per_page: {
		type: "number",
		default: -1,
	},
	order: {
		type: "string",
		default: "asc",
	},
	orderBy: {
		type: "string",
		default: "term_order",
	},
	anchor: {
		type: "string",
		default: "",
	},
	slides_per_view: {
		type: "number",
		default: 3,
	},
};

export default registerBlockType("pi-blocks/block-service-carousel", {
	apiVersion: 3,
	title: __("Service Carousel"),
	icon: "slides",
	category: "pi-blocks",
	keywords: [__("carousel"), __("service"), __("dịch vụ")],
	attributes: BlockAttrs,
	supports: {
		anchor: true,
	},
	edit: (props) => {
		return <Edit {...props} />;
	},
	save: (props) => {
		return <Save {...props} />;
	},
});
