import "./styles/style.scss";
import "./styles/editor.scss";
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/edit";
import Save from "./components/save";

registerBlockType("pi-blocks/info-box", {
	apiVersion: 3,
	title: __("Info Box"),
	icon: "info",
	category: "pi-blocks",
	keywords: [__("contact"), __("info"), __("phone"), __("email"), __("zalo"), __("address")],
	attributes: {
		phone:        { type: "string", default: "+84 38 766 7031" },
		phoneHours:   { type: "string", default: "(Thứ Hai - Thứ Sáu: 9:00 - 18:30)" },
		phoneIcon:    { type: "string", default: "" },
		email:        { type: "string", default: "info@ddclinic-vn.com" },
		emailIcon:    { type: "string", default: "" },
		zaloName:     { type: "string", default: "DD CLINIC Vietnam" },
		zaloSub:      { type: "string", default: "(Nhắn tin trực tiếp qua Zalo)" },
		zaloUrl:      { type: "string", default: "" },
		zaloIcon:     { type: "string", default: "" },
		address:      { type: "string", default: "31 Đường Số 1, Phường An Khánh, Thành phố Hồ Chí Minh, Việt Nam" },
		addressIcon:  { type: "string", default: "" },
		iconWidth:    { type: "number", default: 24 },
	},
	supports: { anchor: true },
	edit: Edit,
	save: Save,
});
