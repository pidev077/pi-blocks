import { InspectorControls, useBlockProps, ColorPalette } from "@wordpress/block-editor";
import { PanelBody, TextareaControl, TextControl, RangeControl, SelectControl } from "@wordpress/components";

const BRAND_COLORS = [
	{ name: "Vàng đồng (mặc định)", color: "#c9a96e" },
	{ name: "Vàng đậm", color: "#E0AC47" },
	{ name: "Nâu nhạt", color: "#B9AE9E" },
	{ name: "Nâu trung", color: "#584E44" },
	{ name: "Đen mềm", color: "#27211C" },
];

const Edit = ({ attributes, setAttributes }) => {
	const { quote, author, accentColor, markSize, textSize, layout } = attributes;
	const blockProps = useBlockProps({ className: `block-pullquote block-pullquote--${layout}` });

	const blockStyle = {
		"--pq-color": accentColor,
		"--pq-mark-size": `${markSize}rem`,
		"--pq-text-size": `${textSize}px`,
		...(layout === "classic" && { borderLeftColor: accentColor }),
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Layout" initialOpen={true}>
					<SelectControl
						label="Kiểu bố cục"
						value={layout}
						options={[
							{ label: "Classic (border trái)", value: "classic" },
							{ label: "Hero (full-width, mark lớn)", value: "hero" },
						]}
						onChange={(val) => setAttributes({ layout: val })}
					/>
				</PanelBody>

				<PanelBody title="Nội dung" initialOpen={false}>
					<TextareaControl
						label="Đoạn trích dẫn"
						value={quote}
						onChange={(val) => setAttributes({ quote: val })}
						rows={6}
						placeholder="Nhập nội dung trích dẫn..."
					/>
					<TextControl
						label="Tác giả / Nguồn (tuỳ chọn)"
						value={author}
						onChange={(val) => setAttributes({ author: val })}
						placeholder="Ví dụ: BS. Nguyễn Văn A"
					/>
				</PanelBody>

				<PanelBody title="Màu sắc" initialOpen={false}>
					<p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
						Áp dụng cho border trái và dấu ngoặc
					</p>
					<ColorPalette
						colors={BRAND_COLORS}
						value={accentColor}
						onChange={(val) => setAttributes({ accentColor: val ?? "#c9a96e" })}
					/>
				</PanelBody>

				<PanelBody title="Kích thước" initialOpen={false}>
					<RangeControl
						label={`Cỡ icon dấu ngoặc (${markSize}rem)`}
						value={markSize}
						onChange={(val) => setAttributes({ markSize: val })}
						min={2}
						max={10}
						step={0.5}
					/>
					<RangeControl
						label={`Cỡ chữ nội dung (${textSize}px)`}
						value={textSize}
						onChange={(val) => setAttributes({ textSize: val })}
						min={16}
						max={48}
						step={1}
					/>
				</PanelBody>
			</InspectorControls>

			<blockquote {...blockProps} style={blockStyle}>
				<span className="block-pullquote__mark" aria-hidden="true">&ldquo;</span>
				<div className="block-pullquote__body">
					<p className="block-pullquote__text">
						{quote || <em style={{ color: "#bbb" }}>Nhập nội dung trích dẫn trong sidebar...</em>}
					</p>
					{author && <cite className="block-pullquote__author">– {author}</cite>}
				</div>
			</blockquote>
		</>
	);
};

export default Edit;
