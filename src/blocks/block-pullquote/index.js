import "./styles/style.scss";
import "./styles/editor.scss";
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/edit";
import Save from "./components/save";

export default registerBlockType("pi-blocks/block-pullquote", {
	apiVersion: 3,
	title: __("Pull Quote"),
	icon: "format-quote",
	category: "pi-blocks",
	keywords: [__("quote"), __("blockquote"), __("pullquote"), __("trích dẫn")],
	attributes: {
		quote: {
			type: "string",
			default: "Nhập nội dung trích dẫn tại đây...",
		},
		author: {
			type: "string",
			default: "",
		},
		accentColor: {
			type: "string",
			default: "#c9a96e",
		},
		markSize: {
			type: "number",
			default: 5,
		},
		textSize: {
			type: "number",
			default: 28,
		},
	},
	supports: {
		anchor: true,
	},
	edit: (props) => <Edit {...props} />,
	save: (props) => <Save {...props} />,
});
