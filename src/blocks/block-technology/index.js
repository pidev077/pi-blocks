import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./components/edit";
import Save from "./components/save";

const attributes = {
	items: {
		type: "array",
		default: [],
	},
	slides_per_view: {
		type: "number",
		default: 3,
	},
	anchor: {
		type: "string",
		default: "",
	},
};

export default registerBlockType("pi-blocks/block-technology", {
	apiVersion: 3,
	title: __("Technology Carousel"),
	icon: "desktop",
	category: "pi-blocks",
	keywords: [__("technology"), __("carousel"), __("công nghệ")],
	attributes,
	supports: { anchor: true },
	edit: (props) => <Edit {...props} />,
	save: (props) => <Save {...props} />,
});
