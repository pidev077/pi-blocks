import { RichText, useBlockProps } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

const genId = () => Math.random().toString(36).slice(2, 9);

const Edit = ({ attributes, setAttributes }) => {
	const { items } = attributes;
	const blockProps = useBlockProps({ className: "block-faq block-faq--editor" });

	const update = (index, field, value) => {
		const newItems = [...items];
		newItems[index] = { ...newItems[index], [field]: value };
		setAttributes({ items: newItems });
	};

	const add = () =>
		setAttributes({
			items: [...items, { id: genId(), question: "", answer: "" }],
		});

	const remove = (index) =>
		setAttributes({ items: items.filter((_, i) => i !== index) });

	return (
		<div {...blockProps}>
			{items.map((item, index) => {
				const key = item.id || String(index);
				return (
					<div key={key} className="faq-item faq-item--open">
						<div className="faq-item__head">
							<span className="faq-item__num">{index + 1}.</span>
							<RichText
								tagName="span"
								className="faq-item__question"
								placeholder="Nhập câu hỏi…"
								value={item.question}
								onChange={(val) => update(index, "question", val)}
								allowedFormats={[]}
							/>
							<Button
								className="faq-item__remove"
								icon="trash"
								isDestructive
								label="Xoá"
								onClick={(e) => { e.stopPropagation(); remove(index); }}
							/>
						</div>
						<div className="faq-item__body">
							<RichText
								tagName="div"
								className="faq-item__answer"
								placeholder="Nhập câu trả lời…"
								value={item.answer}
								onChange={(val) => update(index, "answer", val)}
								allowedFormats={[
									"core/bold",
									"core/italic",
									"core/link",
								]}
							/>
						</div>
					</div>
				);
			})}
			<Button
				className="faq-add-btn"
				variant="secondary"
				icon="plus-alt2"
				onClick={add}
			>
				Thêm câu hỏi
			</Button>
		</div>
	);
};

export default Edit;
