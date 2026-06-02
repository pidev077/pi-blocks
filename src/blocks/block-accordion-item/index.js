import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./components/edit";
import Save from "./components/save";

export default registerBlockType("pi-blocks/block-accordion-item", {
	apiVersion: 3,
	title: __("Accordion Item"),
	icon: "minus",
	category: "pi-blocks",
	parent: ["pi-blocks/block-accordion-list"],
	attributes: {
		title: { type: "string", default: "" },
		description: { type: "string", default: "" },
	},
	supports: { anchor: false, reusable: false, html: false },
	edit: (props) => <Edit {...props} />,
	save: (props) => <Save {...props} />,
});
