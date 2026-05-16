import { useBlockProps } from "@wordpress/block-editor";

export default function Save({ attributes, className }) {
	const { items = [] } = attributes;

	if (!items.length) return null;

	const blockProps = useBlockProps.save({
		className: ["pi-process-steps", className].join(" "),
	});

	return (
		<div {...blockProps}>
			<div className="ps-left">
				<div className="ps-tabs">
					{items.map((item, i) => (
						<button
							key={i}
							className={`ps-tab${i === 0 ? " is-active" : ""}`}
							data-index={i}
						>
							<span className="ps-num">{i + 1}.</span>
							<span className="ps-label">{item.title}</span>
						</button>
					))}
				</div>

				<div className="ps-panels">
					{items.map((item, i) => (
						<div
							key={i}
							className={`ps-panel${i === 0 ? " is-active" : ""}`}
							data-index={i}
						>
							<h3 className="ps-title">{item.title}</h3>
							<p className="ps-desc">{item.description}</p>
						</div>
					))}
				</div>
			</div>

			<div className="ps-right">
				{items.map((item, i) =>
					item.imgUrl ? (
						<div
							key={i}
							className={`ps-img${i === 0 ? " is-active" : ""}`}
							data-index={i}
						>
							<img src={item.imgUrl} alt={item.imgAlt || ""} />
						</div>
					) : null
				)}
			</div>
		</div>
	);
}
