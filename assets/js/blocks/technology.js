import Swiper from "swiper";
import { Navigation } from "swiper/modules";

export default {
	init() {
		initTechnology();
	},
};

function initTechnology() {
	const blocks = document.querySelectorAll(".block-technology");
	if (!blocks.length) return;

	blocks.forEach((block) => {
		const swiperEl = block.querySelector(".technology__swiper");
		if (!swiperEl) return;

		const prevBtn = block.querySelector(".technology__btn--prev");
		const nextBtn = block.querySelector(".technology__btn--next");

		const spv = parseInt(swiperEl.dataset.slidesPerView, 10) || 3;

		new Swiper(swiperEl, {
			modules: [Navigation],
			slidesPerView: spv,
			spaceBetween: 24,
			loop: false,
			grabCursor: true,
			navigation: {
				prevEl: prevBtn,
				nextEl: nextBtn,
			},
			breakpoints: {
				0:    { slidesPerView: 1,                spaceBetween: 0  },
				768:  { slidesPerView: Math.min(2, spv), spaceBetween: 20 },
				1024: { slidesPerView: spv,              spaceBetween: 24 },
			},
		});
	});
}
