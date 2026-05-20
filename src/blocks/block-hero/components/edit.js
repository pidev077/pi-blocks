import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { Fragment, useEffect } from "@wordpress/element";
import Inspector from "./inspector";
import Background from "./background";

const MY_TEMPLATE = [
	[
		"core/paragraph",
		{
			content: "DD CLINIC TRUNG TÂM TƯ VẤN DỊCH VỤ Y TẾ THẨM MỸ CAO CẤP TẠI HÀN QUỐC",
		},
	],
	[
		"core/heading",
		{
			content: "Vẻ Đẹp Chuẩn Y Khoa<br>Chọn Lọc Tinh Hoa",
			level: 1,
			textAlign: "center",
		},
	],
];

const Edit = (props) => {
	const { attributes, setAttributes, className } = props;
	const { typeHero, colorText, overlay, scrollAnchor, scrollLabel } = attributes;

	// Ensure scrollLabel is serialized in the block comment so WPML can detect it.
	// When scrollLabel matches the old default value, Gutenberg omits it from the
	// serialized attributes, making it invisible to WPML string translation.
	useEffect(() => {
		if (scrollAnchor && scrollLabel === undefined) {
			setAttributes({ scrollLabel: "KHÁM PHÁ THÊM" });
		}
	}, []);

	const blockProps = useBlockProps({
		className: [
			"hero-block",
			`hero-type-${typeHero}`,
			`${overlay ? "hero-overlay" : ""}`,
			className,
		].join(" "),
	});

	return (
		<Fragment>
			<Inspector {...props} />
			<div {...blockProps}>
				<Background {...props} />
				<div className="container">
					<div className="hero-block-content" style={{ color: colorText }}>
						<InnerBlocks template={MY_TEMPLATE} />
					</div>
				</div>
				{scrollAnchor && (
					<a href={`#${scrollAnchor}`} className="hero-block-scroll" style={{ color: colorText }}>
						<span>{scrollLabel || "KHÁM PHÁ THÊM"}</span>
						<svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 0V19M1 12.5L8 20L15 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</a>
				)}
			</div>
		</Fragment>
	);
};

export default Edit;
