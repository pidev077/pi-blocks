import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./components/edit";
import Save from "./components/save";

const BlockAttrs = {
	post_type: {
		type: "string",
		default: "service",
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
		default: "menu_order",
	},
	anchor: {
		type: "string",
		default: "",
	},
};

export default registerBlockType("pi-blocks/block-service-list", {
	apiVersion: 3,
	title: __("List Service"),
	icon: "list-view",
	category: "pi-blocks",
	keywords: [__("list"), __("service"), __("dịch vụ")],
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
