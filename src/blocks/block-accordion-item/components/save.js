import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { title, description } = attributes;
	const blockProps = useBlockProps.save();
	blockProps.className = ["accordion-item", blockProps.className].filter(Boolean).join(" ");

	return (
		<details {...blockProps}>
			<summary className="accordion-item__head">
				<span className="accordion-item__num" aria-hidden="true" />
				<RichText.Content tagName="span" className="accordion-item__title" value={title} />
				<RichText.Content tagName="span" className="accordion-item__desc" value={description} />
				<span className="accordion-item__icon" aria-hidden="true">
					<svg className="icon-plus" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
					</svg>
					<svg className="icon-minus" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
					</svg>
				</span>
			</summary>
			<div className="accordion-item__body">
				<div className="accordion-item__content">
					<InnerBlocks.Content />
				</div>
			</div>
		</details>
	);
};

export default Save;
