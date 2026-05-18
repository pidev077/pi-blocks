import { RichText, useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { items } = attributes;
	const blockProps = useBlockProps.save({ className: "block-faq" });

	return (
		<div {...blockProps}>
			{items.map((item, index) => {
				const key = item.id || String(index);
				return (
					<details key={key} className="faq-item">
						<summary className="faq-item__head">
							<span className="faq-item__num">{index + 1}.</span>
							<RichText.Content
								tagName="span"
								className="faq-item__question"
								value={item.question}
							/>
							<span className="faq-item__icon" aria-hidden="true">
								<svg className="icon-plus" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
								</svg>
								<svg className="icon-minus" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
								</svg>
							</span>
						</summary>
						<div className="faq-item__body">
							<RichText.Content
								tagName="div"
								className="faq-item__answer"
								value={item.answer}
							/>
						</div>
					</details>
				);
			})}
		</div>
	);
};

export default Save;
