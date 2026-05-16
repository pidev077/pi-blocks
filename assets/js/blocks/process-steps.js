export default {
	init() {
		document.addEventListener("click", (e) => {
			const tab = e.target.closest(".pi-process-steps .ps-tab");
			if (!tab) return;

			const wrapper = tab.closest(".pi-process-steps");
			if (!wrapper) return;

			const index = tab.dataset.index;

			// Update tabs
			wrapper
				.querySelectorAll(".ps-tab")
				.forEach((t) => t.classList.remove("is-active"));
			tab.classList.add("is-active");

			// Update panels
			wrapper
				.querySelectorAll(".ps-panel")
				.forEach((p) => p.classList.remove("is-active"));
			wrapper
				.querySelector(`.ps-panel[data-index="${index}"]`)
				?.classList.add("is-active");

			// Update images
			wrapper
				.querySelectorAll(".ps-img")
				.forEach((img) => img.classList.remove("is-active"));
			wrapper
				.querySelector(`.ps-img[data-index="${index}"]`)
				?.classList.add("is-active");
		});
	},
};
