import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";

const Edit = ({ attributes, setAttributes }) => {
	const { title, description } = attributes;

	const blockProps = useBlockProps({ className: "accordion-item accordion-item--editor" });

	return (
		<div {...blockProps}>
			<div className="accordion-item__head">
				<span className="accordion-item__num" aria-hidden="true" />
				<RichText
					tagName="span"
					className="accordion-item__title"
					value={title}
					onChange={(val) => setAttributes({ title: val })}
					placeholder="Tiêu đề…"
					allowedFormats={[]}
				/>
				<RichText
					tagName="span"
					className="accordion-item__desc"
					value={description}
					onChange={(val) => setAttributes({ description: val })}
					placeholder="Mô tả ngắn…"
					allowedFormats={[]}
				/>
				<span className="accordion-item__icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
					</svg>
				</span>
			</div>
			<div className="accordion-item__body">
				<div className="accordion-item__content">
					<InnerBlocks renderAppender={InnerBlocks.ButtonBlockAppender} />
				</div>
			</div>
		</div>
	);
};

export default Edit;
