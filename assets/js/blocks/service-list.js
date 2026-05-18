export default {
	init() {
		const blocks = document.querySelectorAll(".block-service-list");
		if (!blocks.length) return;

		blocks.forEach((block) => {
			const items = block.querySelectorAll(".service-item");
			const previews = block.querySelectorAll(".service-preview");

			if (!items.length) return;

			const activate = (index) => {
				items.forEach((el) => el.classList.remove("is-active"));
				previews.forEach((el) => el.classList.remove("is-active"));

				if (items[index]) items[index].classList.add("is-active");
				if (previews[index]) previews[index].classList.add("is-active");
			};

			items.forEach((item) => {
				item.addEventListener("click", () => {
					if (window.innerWidth < 768) {
						if (item.dataset.href) {
							window.location.href = item.dataset.href;
						}
					} else {
						activate(parseInt(item.dataset.index, 10));
					}
				});

				item.addEventListener("keydown", (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						if (window.innerWidth < 768) {
							if (item.dataset.href) window.location.href = item.dataset.href;
						} else {
							activate(parseInt(item.dataset.index, 10));
						}
					}
				});
			});
		});
	},
};
