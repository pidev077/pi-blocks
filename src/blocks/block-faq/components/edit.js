import {
	InspectorControls,
	useBlockProps,
	RichText,
} from "@wordpress/block-editor";
import {
	PanelBody,
	PanelRow,
	TextControl,
	TextareaControl,
	ToggleControl,
	Button,
} from "@wordpress/components";

const genId = () => Math.random().toString(36).slice(2, 9);

const Edit = ({ attributes, setAttributes }) => {
	const { groupLetter, groupTitle, defaultOpen, showGroupHeader, openLabel, closeLabel, items } = attributes;
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
				<PanelBody title="Cài đặt nhóm" initialOpen={true}>
					<TextControl
						label="Ký tự nhóm (A, B, C…)"
						value={groupLetter}
						onChange={(val) => setAttributes({ groupLetter: val })}
						placeholder="A"
					/>
					<TextControl
						label="Tiêu đề nhóm"
						value={groupTitle}
						onChange={(val) => setAttributes({ groupTitle: val })}
						placeholder="Tên nhóm câu hỏi…"
					/>
					<ToggleControl
						label="Hiển thị tiêu đề nhóm"
						checked={showGroupHeader}
						onChange={(val) => setAttributes({ showGroupHeader: val })}
					/>
					<ToggleControl
						label="Mặc định mở"
						checked={defaultOpen}
						onChange={(val) => setAttributes({ defaultOpen: val })}
					/>
					<TextControl
						label='Nhãn khi MỞ (hiện khi đang mở)'
						value={openLabel}
						onChange={(val) => setAttributes({ openLabel: val })}
						placeholder="Mở"
					/>
					<TextControl
						label='Nhãn khi ĐÓNG (hiện khi đang đóng)'
						value={closeLabel}
						onChange={(val) => setAttributes({ closeLabel: val })}
						placeholder="Đóng"
					/>
				</PanelBody>

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
				{/* Group header preview */}
				{showGroupHeader && (
					<div className="faq-group__header faq-group__header--editor">
						<div className="faq-group__label">
							<span className="faq-group__letter">{groupLetter}.</span>
							<span className="faq-group__title">{groupTitle || "Tiêu đề nhóm"}</span>
						</div>
						<span className="faq-group__state-badge">
							{defaultOpen ? "Mặc định: Mở" : "Mặc định: Đóng"}
						</span>
					</div>
				)}

				{/* FAQ items preview */}
				{items.length === 0 ? (
					<p style={{ color: "#999", fontStyle: "italic", padding: "16px 0" }}>
						Chưa có câu hỏi — thêm trong sidebar bên phải.
					</p>
				) : (
					items.map((item, index) => (
						<details key={item.id || String(index)} className="faq-item" open>
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
