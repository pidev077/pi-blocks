import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

const Save = () => {
	const blockProps = useBlockProps.save({ className: "block-accordion-list" });

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;
