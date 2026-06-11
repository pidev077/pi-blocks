import "./styles/style.scss";
import "./styles/editor.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import Edit from "./components/edit";
import Save from "./components/save";

export default registerBlockType("pi-blocks/block-faq", {
	apiVersion: 3,
	title: __("FAQ Group"),
	icon: "editor-help",
	category: "pi-blocks",
	keywords: [__("faq"), __("accordion"), __("question"), __("answer"), __("group")],
	attributes: {
		groupLetter: {
			type: "string",
			default: "A",
		},
		groupTitle: {
			type: "string",
			default: "Tiêu đề nhóm câu hỏi",
		},
		defaultOpen: {
			type: "boolean",
			default: true,
		},
		showGroupHeader: {
			type: "boolean",
			default: true,
		},
		openLabel: {
			type: "string",
			default: "Mở",
		},
		closeLabel: {
			type: "string",
			default: "Đóng",
		},
		items: {
			type: "array",
			default: [
				{ id: "1", question: "Câu hỏi 1?", answer: "Câu trả lời 1." },
				{ id: "2", question: "Câu hỏi 2?", answer: "Câu trả lời 2." },
			],
		},
	},
	edit: (props) => <Edit {...props} />,
	save: (props) => <Save {...props} />,

	deprecated: [
		{
			// Version with showGroupHeader but hardcoded Mở/Đóng, before openLabel/closeLabel attributes
			attributes: {
				groupLetter:     { type: "string",  default: "A" },
				groupTitle:      { type: "string",  default: "Tiêu đề nhóm câu hỏi" },
				defaultOpen:     { type: "boolean", default: true },
				showGroupHeader: { type: "boolean", default: true },
				items: {
					type: "array",
					default: [
						{ id: "1", question: "Câu hỏi 1?", answer: "Câu trả lời 1." },
						{ id: "2", question: "Câu hỏi 2?", answer: "Câu trả lời 2." },
					],
				},
			},
			save: ({ attributes }) => {
				const { groupLetter, groupTitle, defaultOpen, showGroupHeader, items } = attributes;
				const id = `faq-group-${(groupLetter || "").toLowerCase()}`;
				return (
					<div className={`block-faq${defaultOpen ? " is-open" : ""}`} id={id}>
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
									<span className="faq-group__open-text">Mở</span>
									<span className="faq-group__close-text">Đóng</span>
								</span>
							</button>
						)}
						<div className="faq-group__body" id={`${id}-body`} hidden={!defaultOpen}>
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
			},
			migrate: (attributes) => ({
				...attributes,
				openLabel: "Mở",
				closeLabel: "Đóng",
			}),
		},
		{
			// Version with group header always visible (before showGroupHeader toggle)
			attributes: {
				groupLetter: { type: "string", default: "A" },
				groupTitle: { type: "string", default: "Tiêu đề nhóm câu hỏi" },
				defaultOpen: { type: "boolean", default: true },
				items: {
					type: "array",
					default: [
						{ id: "1", question: "Câu hỏi 1?", answer: "Câu trả lời 1." },
						{ id: "2", question: "Câu hỏi 2?", answer: "Câu trả lời 2." },
					],
				},
			},
			save: ({ attributes }) => {
				const { groupLetter, groupTitle, defaultOpen, items } = attributes;
				const id = `faq-group-${(groupLetter || "").toLowerCase()}`;
				return (
					<div
						className={`block-faq${defaultOpen ? " is-open" : ""}`}
						id={id}
					>
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
								<span className="faq-group__open-text">Mở</span>
								<span className="faq-group__close-text">Đóng</span>
							</span>
						</button>
						<div className="faq-group__body" id={`${id}-body`} hidden={!defaultOpen}>
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
			},
			migrate: (attributes) => ({ ...attributes, showGroupHeader: true, openLabel: "Mở", closeLabel: "Đóng" }),
		},
		{
			// Old "FAQ Accordion" format — flat list of items, no group header
			attributes: {
				items: {
					type: "array",
					default: [
						{ question: "Question 1?", answer: "Answer 1." },
						{ question: "Question 2?", answer: "Answer 2." },
					],
				},
			},
			save: ({ attributes }) => {
				const { items } = attributes;
				return (
					<div className="block-faq">
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
				);
			},
			migrate: (attributes) => ({
				groupLetter: "A",
				groupTitle: "Câu Hỏi Thường Gặp",
				defaultOpen: true,
				showGroupHeader: true,
				openLabel: "Mở",
				closeLabel: "Đóng",
				items: attributes.items,
			}),
		},
	],
});
