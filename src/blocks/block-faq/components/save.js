import { useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { groupLetter, groupTitle, defaultOpen, showGroupHeader, openLabel, closeLabel, items } = attributes;
	const id = `faq-group-${(groupLetter || "").toLowerCase()}`;

	const blockProps = useBlockProps.save({
		className: `block-faq${defaultOpen ? " is-open" : ""}`,
		id,
	});

	return (
		<div {...blockProps}>
			{/* Group header toggle */}
			{showGroupHeader && (
				<button
					type="button"
					className="faq-group__header js-faq-group-toggle"
					aria-expanded={defaultOpen ? "true" : "false"}
					aria-controls={`${id}-body`}
				>
					<span className="faq-group__label">
						<span className="faq-group__letter">{groupLetter}.</span>
						<span className="faq-group__title">{groupTitle}</span>
					</span>
					<span className="faq-group__toggle-label" aria-hidden="true">
						<span className="faq-group__open-text">{openLabel}</span>
						<span className="faq-group__close-text">{closeLabel}</span>
					</span>
				</button>
			)}

			{/* Items body */}
			<div
				className="faq-group__body"
				id={`${id}-body`}
				hidden={!defaultOpen}
			>
				{items.map((item, index) => {
					const key = item.id || String(index);
					return (
						<details key={key} className="faq-item">
							<summary className="faq-item__head">
								<span className="faq-item__num">{index + 1}.</span>
								<span className="faq-item__question">{item.question}</span>
								<span className="faq-item__icon" aria-hidden="true">
									<svg className="icon-plus" viewBox="0 0 24 24" fill="none">
										<path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
									</svg>
									<svg className="icon-minus" viewBox="0 0 24 24" fill="none">
										<path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
									</svg>
								</span>
							</summary>
							<div className="faq-item__body">
								<div className="faq-item__answer">{item.answer}</div>
							</div>
						</details>
					);
				})}
			</div>
		</div>
	);
};

export default Save;
