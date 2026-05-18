import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./components/edit";
import Save from "./components/save";

export default registerBlockType("pi-blocks/block-faq", {
	apiVersion: 3,
	title: __("FAQ Accordion"),
	icon: "editor-help",
	category: "pi-blocks",
	keywords: [__("faq"), __("accordion"), __("question"), __("answer")],
	attributes: {
		items: {
			type: "array",
			default: [
				{ question: "Question 1?", answer: "Answer 1." },
				{ question: "Question 2?", answer: "Answer 2." },
			],
		},
	},
	edit: (props) => <Edit {...props} />,
	save: (props) => <Save {...props} />,
});
