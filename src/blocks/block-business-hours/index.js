import "./styles/style.scss";
import "./styles/editor.scss";
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/edit";
import Save from "./components/save";

registerBlockType("pi-blocks/business-hours", {
	apiVersion: 3,
	title: __("Business Hours"),
	icon: "clock",
	category: "pi-blocks",
	keywords: [__("hours"), __("schedule"), __("giờ"), __("làm việc"), __("lịch")],
	attributes: {
		title: { type: "string", default: "GIỜ LÀM VIỆC" },
		rows: {
			type: "array",
			default: [
				{ days: "Thứ Hai - Thứ Sáu", time: "9:00 - 18:30" },
				{ days: "Thứ Bảy", time: "9:00 - 16:00" },
				{ days: "Chủ Nhật", time: "Chỉ nhận hẹn trước" },
			],
		},
		footerNote: {
			type: "string",
			default: "*Ngoài giờ làm việc, vui lòng để lại tin nhắn. Chúng tôi sẽ phản hồi sớm nhất có thể.",
		},
	},
	supports: { anchor: true },
	edit: Edit,
	save: Save,
});
