import { useEffect, useRef } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import Inspector from "./inspector";

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

const Edit = (props) => {
	const { attributes } = props;
	const { items, slides_per_view } = attributes;

	const blockProps = useBlockProps();
	const wrapperRef = useRef(null);
	const swiperRef = useRef(null);

	useEffect(() => {
		if (!wrapperRef.current || !items.length) return;

		const el = wrapperRef.current.querySelector(".technology__swiper");
		if (!el) return;

		if (swiperRef.current) {
			swiperRef.current.destroy(true, true);
			swiperRef.current = null;
		}

		const spv = slides_per_view || 3;
		const prevBtn = wrapperRef.current.querySelector(".technology__btn--prev");
		const nextBtn = wrapperRef.current.querySelector(".technology__btn--next");

		swiperRef.current = new Swiper(el, {
			modules: [Navigation],
			slidesPerView: spv,
			spaceBetween: 24,
			loop: false,
			navigation: { prevEl: prevBtn, nextEl: nextBtn },
			breakpoints: {
				0:    { slidesPerView: 1,                spaceBetween: 0  },
				768:  { slidesPerView: Math.min(2, spv), spaceBetween: 20 },
				1024: { slidesPerView: spv,              spaceBetween: 24 },
			},
		});

		return () => {
			swiperRef.current?.destroy(true, true);
			swiperRef.current = null;
		};
	}, [items, slides_per_view]);

	return (
		<div {...blockProps} ref={wrapperRef}>
			<Inspector {...props} />

			{items.length === 0 ? (
				<div className="technology-editor__empty">
					<p>Chưa có slide nào. Thêm slide trong sidebar bên phải.</p>
				</div>
			) : (
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
											{item.image?.url ? (
												<div className="technology__image">
													<img src={item.image.url} alt={item.image.alt || ""} />
												</div>
											) : (
												<div className="technology__image technology__image--empty" />
											)}
											<div className="technology__info">
												{item.title && (
													<h3
														className="technology__title"
														dangerouslySetInnerHTML={{ __html: item.title }}
													/>
												)}
												{item.description && (
													<p
														className="technology__desc"
														dangerouslySetInnerHTML={{ __html: item.description }}
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
			)}
		</div>
	);
};

export default Edit;
