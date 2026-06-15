import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./components/edit";
import Save from "./components/save";

export default registerBlockType( "pi-blocks/block-service-tabs", {
	apiVersion: 3,
	title: __( "Service Tabs" ),
	icon: "list-view",
	category: "pi-blocks",
	keywords: [ __( "service" ), __( "tabs" ), __( "nav" ), __( "dịch vụ" ) ],
	attributes: {
		anchor:    { type: "string", default: "" },
		className: { type: "string", default: "" },
		groups: {
			type: "array",
			default: [
				{
					id: "g1",
					label: "TƯ VẤN",
					items: [
						{ id: "i1", navLabel: "Tư Vấn Chuyên Môn", title: "Tư Vấn Chuyên Môn", desc: "" },
					],
				},
				{
					id: "g2",
					label: "LĨNH VỰC ĐIỀU TRỊ",
					items: [],
				},
			],
			items: { type: "object" },
		},
	},
	supports: { anchor: true },
	edit: ( props ) => <Edit { ...props } />,
	save: ( props ) => <Save { ...props } />,
} );
