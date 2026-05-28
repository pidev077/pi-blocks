import {
	InspectorControls,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	PanelBody,
	PanelRow,
	TextControl,
	TextareaControl,
	Button,
} from "@wordpress/components";

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
		<>
			<InspectorControls>
				<PanelBody title="Danh sách câu hỏi" initialOpen={true}>
					{items.map((item, index) => (
						<div
							key={item.id || String(index)}
							style={{
								borderBottom: "1px solid #e0e0e0",
								paddingBottom: "12px",
								marginBottom: "12px",
							}}
						>
							<PanelRow>
								<strong style={{ fontSize: "12px", color: "#555" }}>
									Câu hỏi {index + 1}
								</strong>
								<Button
									icon="trash"
									isDestructive
									isSmall
									label="Xoá"
									onClick={() => remove(index)}
								/>
							</PanelRow>
							<TextControl
								label="Câu hỏi"
								value={item.question}
								onChange={(val) => update(index, "question", val)}
								placeholder="Nhập câu hỏi…"
							/>
							<TextareaControl
								label="Câu trả lời"
								value={item.answer}
								onChange={(val) => update(index, "answer", val)}
								placeholder="Nhập câu trả lời…"
								rows={4}
							/>
						</div>
					))}
					<Button
						variant="secondary"
						icon="plus-alt2"
						onClick={add}
						style={{ width: "100%" }}
					>
						Thêm câu hỏi
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{items.length === 0 ? (
					<p style={{ color: "#999", fontStyle: "italic" }}>
						Chưa có câu hỏi nào — thêm trong sidebar bên phải.
					</p>
				) : (
					items.map((item, index) => (
						<details
							key={item.id || String(index)}
							className="faq-item"
							open
						>
							<summary className="faq-item__head">
								<span className="faq-item__num">{index + 1}.</span>
								<span className="faq-item__question">
									{item.question || <em style={{ color: "#bbb" }}>Chưa có câu hỏi</em>}
								</span>
							</summary>
							<div className="faq-item__body">
								<div className="faq-item__answer">
									{item.answer || <em style={{ color: "#bbb" }}>Chưa có câu trả lời</em>}
								</div>
							</div>
						</details>
					))
				)}
			</div>
		</>
	);
};

export default Edit;
