import { useState } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import Inspector from "./inspector";

export default function Edit({ attributes, setAttributes, className }) {
	const { items = [] } = attributes;
	const [activeIdx, setActiveIdx] = useState(0);

	const blockProps = useBlockProps({
		className: ["pi-process-steps", className].join(" "),
	});

	const activeItem = items[activeIdx] || items[0];

	return (
		<>
			<Inspector items={items} setAttributes={setAttributes} />

			<div {...blockProps}>
				<div className="ps-left">
					<div className="ps-tabs">
						{items.map((item, i) => (
							<button
								key={i}
								className={`ps-tab${i === activeIdx ? " is-active" : ""}`}
								onClick={() => setActiveIdx(i)}
							>
								<span className="ps-num">{i + 1}.</span>
								<span className="ps-label">
									{item.title || `Bước ${i + 1}`}
								</span>
							</button>
						))}
					</div>

					<div className="ps-panels">
						{activeItem ? (
							<div className="ps-panel is-active">
								<h3 className="ps-title">
									{activeItem.title || "Tiêu đề bước"}
								</h3>
								<p className="ps-desc">
									{activeItem.description ||
										"Thêm mô tả trong Inspector →"}
								</p>
							</div>
						) : (
							<p style={{ opacity: 0.5 }}>
								Thêm bước trong Inspector →
							</p>
						)}
					</div>
				</div>

				<div className="ps-right">
					{activeItem?.imgUrl ? (
						<div className="ps-img is-active">
							<img
								src={activeItem.imgUrl}
								alt={activeItem.imgAlt || ""}
							/>
						</div>
					) : (
						<div className="ps-img-placeholder">
							<span>Chọn ảnh trong Inspector</span>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
