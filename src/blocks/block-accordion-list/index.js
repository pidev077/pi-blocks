import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./components/edit";
import Save from "./components/save";

export default registerBlockType("pi-blocks/block-accordion-list", {
	apiVersion: 3,
	title: __("Accordion List"),
	icon: "list-view",
	category: "pi-blocks",
	keywords: [__("accordion"), __("list"), __("services"), __("items")],
	attributes: {
		items: {
			type: "array",
			default: [
				{ title: "Nâng Mũi", description: "Tập trung cải thiện dáng mũi, sống mũi, đầu mũi và tỷ lệ mũi sao cho hài hòa hơn với tổng thể gương mặt.", body: "" },
				{ title: "Thẩm Mỹ Mí Mắt", description: "Cải thiện mi mắt nặng, nếp mi không đều, da dư vùng mí hoặc vẻ ngoài trông mệt mỏi.", body: "" },
			],
		},
	},
	edit: (props) => <Edit {...props} />,
	save: (props) => <Save {...props} />,
});
