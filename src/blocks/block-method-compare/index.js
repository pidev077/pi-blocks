import "./styles/style.scss";
import "./styles/editor.scss";
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import Edit from "./components/edit";
import Save from "./components/save";

const defaultColumns = [
	{ label: "S-Line",             imageId: 0, imageUrl: "", imageAlt: "" },
	{ label: "L-Line",             imageId: 0, imageUrl: "", imageAlt: "" },
	{ label: "Nâng Mũi Cấu Trúc", imageId: 0, imageUrl: "", imageAlt: "" },
];

const defaultCriteria = [
	{ label: "Định Hướng Dáng Mũi", values: ["Mềm mại, tự nhiên",            "Thẳng, rõ nét",                  "Tùy chỉnh nhiều vùng"]          },
	{ label: "Phù Hợp Với",         values: ["Người muốn vẻ nhẹ nhàng",      "Người muốn góc nghiêng sắc hơn", "Mũi cần chỉnh nhiều cấu trúc"]   },
	{ label: "Mức Độ Can Thiệp",    values: ["Tùy tình trạng",               "Tùy tình trạng",                 "Thường cao hơn"]                  },
	{ label: "Cần Cân Nhắc",        values: ["Độ cong, độ cao, da mũi",      "Độ tự nhiên tổng thể",           "Thời gian hồi phục"]              },
	{ label: "Mục Tiêu",            values: ["Hài hòa, thanh thoát",          "Hiện đại, sắc nét",              "Cải thiện tổng thể"]              },
];

export default registerBlockType("pi-blocks/block-method-compare", {
	apiVersion: 3,
	title: __("Method Compare Table"),
	icon: "grid-view",
	category: "pi-blocks",
	keywords: [__("compare"), __("table"), __("method"), __("so sánh")],
	attributes: {
		anchor:       { type: "string", default: "" },
		className:    { type: "string", default: "" },
		sectionLabel: { type: "string", default: "SO SÁNH PHƯƠNG PHÁP" },
		heading:      { type: "string", default: "S-Line Khác Gì Với Các Dáng Mũi Khác?" },
		columns:      { type: "array",  default: defaultColumns,  items: { type: "object" } },
		criteria:     { type: "array",  default: defaultCriteria, items: { type: "object" } },
	},
	supports: { anchor: true },
	edit: (props) => <Edit {...props} />,
	save: (props) => <Save {...props} />,
});
