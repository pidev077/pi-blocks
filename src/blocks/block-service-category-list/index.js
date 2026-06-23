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
	custom_categories: {
		type: "array",
		default: [],
	},
	alternate_layout: {
		type: "boolean",
		default: false,
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
};

export default registerBlockType("pi-blocks/block-service-category-list", {
	apiVersion: 3,
	title: __("List Service Category"),
	icon: "category",
	category: "pi-blocks",
	keywords: [__("list"), __("service"), __("category"), __("nhóm dịch vụ")],
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
