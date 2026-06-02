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
	const blockProps = useBlockProps({ className: "block-accordion-list block-accordion-list--editor" });

	const update = (index, field, value) => {
		const next = [...items];
		next[index] = { ...next[index], [field]: value };
		setAttributes({ items: next });
	};

	const add = () =>
		setAttributes({
			items: [...items, { id: genId(), title: "", description: "", body: "" }],
		});

	const remove = (index) =>
		setAttributes({ items: items.filter((_, i) => i !== index) });

	return (
		<>
			<InspectorControls>
				<PanelBody title="Danh sách mục" initialOpen={true}>
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
									Mục {String(index + 1).padStart(2, "0")}
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
								label="Tiêu đề"
								value={item.title}
								onChange={(val) => update(index, "title", val)}
								placeholder="Nhập tiêu đề…"
							/>
							<TextareaControl
								label="Mô tả ngắn"
								value={item.description}
								onChange={(val) => update(index, "description", val)}
								placeholder="Mô tả hiển thị trực tiếp trên hàng…"
								rows={3}
							/>
							<TextareaControl
								label="Nội dung mở rộng (tuỳ chọn)"
								value={item.body}
								onChange={(val) => update(index, "body", val)}
								placeholder="Nội dung hiện ra khi bấm +…"
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
						Thêm mục
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{items.length === 0 ? (
					<p style={{ color: "#999", fontStyle: "italic" }}>
						Chưa có mục nào — thêm trong sidebar bên phải.
					</p>
				) : (
					items.map((item, index) => (
						<div key={item.id || String(index)} className="accordion-item">
							<div className="accordion-item__head">
								<span className="accordion-item__num">
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="accordion-item__title">
									{item.title || <em style={{ color: "#bbb" }}>Chưa có tiêu đề</em>}
								</span>
								<span className="accordion-item__desc">
									{item.description || <em style={{ color: "#bbb" }}>Chưa có mô tả</em>}
								</span>
								<span className="accordion-item__icon" aria-hidden="true">
									<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
									</svg>
								</span>
							</div>
						</div>
					))
				)}
			</div>
		</>
	);
};

export default Edit;
