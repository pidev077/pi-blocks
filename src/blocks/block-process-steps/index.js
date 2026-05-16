import "./styles/style.scss";
import "./styles/editor.scss";

import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import Edit from "./components/edit";
import Save from "./components/save";

registerBlockType("pi-blocks/process-steps", {
	apiVersion: 3,
	title: __("Process Steps"),
	icon: "editor-ol",
	category: "pi-blocks",

	attributes: {
		items: {
			type: "array",
			default: [
				{
					id: 1,
					title: "Tư Vấn",
					description:
						"Chúng tôi bắt đầu bằng buổi tư vấn riêng để lắng nghe mục tiêu, mối quan tâm và kỳ vọng của bạn. Từ đó, đội ngũ DD CLINIC xác định hướng tiếp cận phù hợp và những ưu tiên quan trọng trong hành trình làm đẹp.",
					imgUrl: "",
					imgID: 0,
					imgAlt: "",
				},
			],
		},
	},

	supports: {
		anchor: true,
	},

	edit: Edit,
	save: Save,
});
