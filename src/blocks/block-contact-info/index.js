import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/edit";
import Save from "./components/save";

registerBlockType("pi-blocks/contact-info", {
	apiVersion: 3,
	title: __("Contact Info"),
	icon: "phone",
	category: "pi-blocks",
	keywords: [__("contact"), __("address"), __("phone"), __("email"), __("hours")],

	attributes: {
		address: {
			type: "string",
			default: "31 Đường Số 1, Phường An Khánh, Thành phố Hồ Chí Minh, Việt Nam",
		},
		phone: {
			type: "string",
			default: "+84 38 766 7031",
		},
		email: {
			type: "string",
			default: "info@ddclinic-vn.com",
		},
		hoursItems: {
			type: "array",
			default: [
				{ days: "Thứ 2 - Thứ 6:", time: "9:00 - 18:30" },
				{ days: "Chủ Nhật:", time: "Chỉ nhận hẹn đặt trước" },
			],
		},
	},

	supports: {
		anchor: true,
	},

	edit: Edit,
	save: Save,
});
