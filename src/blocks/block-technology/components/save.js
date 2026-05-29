import { useBlockProps, RichText } from "@wordpress/block-editor";

const ArrowPrev = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const ArrowNext = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const Save = ({ attributes }) => {
	const { items, slides_per_view } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div className="block-technology" style={{ "--spv": slides_per_view }}>
				<div className="technology__layout">
					<button className="technology__btn technology__btn--prev" aria-label="Trước">
						<ArrowPrev />
					</button>

					<div className="technology__swiper swiper" data-slides-per-view={slides_per_view}>
						<div className="swiper-wrapper">
							{items.map((item, index) => (
								<div key={index} className="swiper-slide">
									<div className="technology__card">
										{item.image?.url && (
											<div className="technology__image">
												<img
													src={item.image.url}
													alt={item.image.alt || ""}
													loading="lazy"
												/>
											</div>
										)}
										<div className="technology__info">
											{item.title && (
												<RichText.Content
													tagName="h3"
													className="technology__title"
													value={item.title}
												/>
											)}
											{item.description && (
												<RichText.Content
													tagName="p"
													className="technology__desc"
													value={item.description}
												/>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<button className="technology__btn technology__btn--next" aria-label="Tiếp">
						<ArrowNext />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Save;
