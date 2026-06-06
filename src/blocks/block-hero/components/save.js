import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import Background from "./background";

const Save = (props) => {
	const { attributes, className } = props;
	const { typeHero, colorText, overlay, scrollAnchor, scrollLabel, blockHeight } = attributes;

	const blockProps = useBlockProps.save({
		className: [
			"hero-block",
			`hero-type-${typeHero}`,
			`${overlay ? "hero-overlay" : ""}`,
			blockHeight ? "hero-custom-height" : "",
			className,
		].join(" "),
		style: blockHeight ? { "--hero-height": blockHeight } : {},
	});

	return (
		<div {...blockProps}>
			<Background {...props} />
			<div className="container">
				<div className="hero-block-content" style={{ color: colorText }}>
					<InnerBlocks.Content />
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
	);
};

export default Save;
