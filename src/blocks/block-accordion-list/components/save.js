import { useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { items } = attributes;
	const blockProps = useBlockProps.save({ className: "block-accordion-list" });

	return (
		<div {...blockProps}>
			{items.map((item, index) => {
				const key = item.id || String(index);
				const num = String(index + 1).padStart(2, "0");
				const hasBody = item.body && item.body.trim() !== "";

				if (!hasBody) {
					return (
						<div key={key} className="accordion-item accordion-item--static">
							<div className="accordion-item__head">
								<span className="accordion-item__num">{num}</span>
								<span className="accordion-item__title">{item.title}</span>
								<span className="accordion-item__desc">{item.description}</span>
								<span className="accordion-item__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
									</svg>
								</span>
							</div>
						</div>
					);
				}

				return (
					<details key={key} className="accordion-item">
						<summary className="accordion-item__head">
							<span className="accordion-item__num">{num}</span>
							<span className="accordion-item__title">{item.title}</span>
							<span className="accordion-item__desc">{item.description}</span>
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
							<div className="accordion-item__content">{item.body}</div>
						</div>
					</details>
				);
			})}
		</div>
	);
};

export default Save;
