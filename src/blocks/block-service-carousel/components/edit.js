import { useEffect, useRef } from "@wordpress/element";
import Inspector from "./inspector";
import ServerSideRender from "@wordpress/server-side-render";
import { useBlockProps } from "@wordpress/block-editor";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";

const Edit = (props) => {
	const { attributes } = props;
	const blockProps = useBlockProps();
	const wrapperRef = useRef(null);
	const swiperRef = useRef(null);

	useEffect(() => {
		if (!wrapperRef.current) return;

		const initSwiper = () => {
			const el = wrapperRef.current?.querySelector(".service-carousel__swiper");
			if (!el || el.swiper) return;

			if (swiperRef.current) {
				swiperRef.current.destroy(true, true);
				swiperRef.current = null;
			}

			const spv = parseInt(el.dataset.slidesPerView, 10) || 3;
			const prevBtn = wrapperRef.current.querySelector(".service-carousel__btn--prev");
			const nextBtn = wrapperRef.current.querySelector(".service-carousel__btn--next");

			swiperRef.current = new Swiper(el, {
				modules: [Navigation],
				slidesPerView: spv,
				spaceBetween: 20,
				loop: false,
				navigation: { prevEl: prevBtn, nextEl: nextBtn },
				breakpoints: {
					320:  { slidesPerView: 1.15, spaceBetween: 12 },
					576:  { slidesPerView: 1.5,  spaceBetween: 16 },
					768:  { slidesPerView: Math.min(2, spv), spaceBetween: 16 },
					1024: { slidesPerView: spv,  spaceBetween: 20 },
				},
			});
		};

		const observer = new MutationObserver(initSwiper);
		observer.observe(wrapperRef.current, { childList: true, subtree: true });

		return () => {
			observer.disconnect();
			swiperRef.current?.destroy(true, true);
			swiperRef.current = null;
		};
	}, [attributes]);

	return (
		<div {...blockProps} ref={wrapperRef}>
			<Inspector {...props} />
			<ServerSideRender
				className="block-server-render"
				block="pi-blocks/block-service-carousel"
				attributes={attributes}
			/>
		</div>
	);
};

export default Edit;
