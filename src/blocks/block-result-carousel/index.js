import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/edit";
import Save from "./components/save";

const attributes = {
	images: {
		type: "array",
		default: [],
	},
	noteText: {
		type: "string",
		default:
			"Hình ảnh chỉ mang tính tham khảo. Kết quả thực tế có thể khác nhau tùy theo cơ địa, cấu trúc mũi, phương pháp thực hiện và quá trình hồi phục của từng khách hàng.",
	},
};

registerBlockType("pi-blocks/block-result-carousel", {
	apiVersion: 3,
	title: __("Result Carousel"),
	category: "pi-blocks",
	keywords: [__("result"), __("carousel"), __("before after"), __("kết quả")],
	icon: "images-alt",
	attributes,
	supports: {
		anchor: true,
	},
	edit: (props) => <Edit {...props} />,
	save: (props) => <Save {...props} />,
});
