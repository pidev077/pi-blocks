import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

const ALLOWED_BLOCKS = ["pi-blocks/block-accordion-item"];

const TEMPLATE = [
	["pi-blocks/block-accordion-item", { title: "Tiêu đề mục 1", description: "Mô tả ngắn về mục này…" }],
	["pi-blocks/block-accordion-item", { title: "Tiêu đề mục 2", description: "Mô tả ngắn về mục này…" }],
];

const Edit = () => {
	const blockProps = useBlockProps({ className: "block-accordion-list" });

	return (
		<div {...blockProps}>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				template={TEMPLATE}
				orientation="vertical"
			/>
		</div>
	);
};

export default Edit;
