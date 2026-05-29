import Swiper from "swiper";
import { Navigation } from "swiper/modules";

export default {
	init() {
		initServiceCarousel();
	},
};

function initServiceCarousel() {
	const blocks = document.querySelectorAll(".block-service-carousel");
	if (!blocks.length) return;

	blocks.forEach((block) => {
		const swiperEl = block.querySelector(".service-carousel__swiper");
		if (!swiperEl) return;

		const currentEl = block.querySelector(".service-carousel__current");
		const prevBtn   = block.querySelector(".service-carousel__btn--prev");
		const nextBtn   = block.querySelector(".service-carousel__btn--next");

		const spv = parseInt(swiperEl.dataset.slidesPerView, 10) || 3;

		const swiper = new Swiper(swiperEl, {
			modules: [Navigation],
			slidesPerView: spv,
			spaceBetween: 20,
			loop: false,
			grabCursor: true,
			navigation: {
				prevEl: prevBtn,
				nextEl: nextBtn,
			},
			breakpoints: {
				320:  { slidesPerView: 1.15, spaceBetween: 12 },
				576:  { slidesPerView: 1.5,  spaceBetween: 16 },
				768:  { slidesPerView: Math.min(2, spv), spaceBetween: 16 },
				1024: { slidesPerView: spv,  spaceBetween: 20 },
			},
			on: {
				slideChange(sw) {
					if (currentEl) {
						currentEl.textContent = String(sw.realIndex + 1).padStart(2, "0");
					}
				},
			},
		});
	});
}
