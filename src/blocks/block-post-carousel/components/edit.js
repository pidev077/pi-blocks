import { useSelect } from "@wordpress/data";
import { useBlockProps } from "@wordpress/block-editor";
import { Spinner } from "@wordpress/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import Inspector from "./inspector";

const Edit = (props) => {
	const { attributes, clientId } = props;
	const { posts_per_page, order, orderBy, cat, showExcerpt, showMeta } = attributes;

	const uid = clientId ? clientId.slice(0, 8) : "bpc";
	const prevClass = `bpc-prev-${uid}`;
	const nextClass = `bpc-next-${uid}`;

	const blockProps = useBlockProps({ className: "block-post-carousel" });

	const posts = useSelect(
		(select) => {
			const query = {
				per_page: posts_per_page,
				order,
				orderby: orderBy,
				_embed: true,
			};
			if (cat) query.categories = [cat];
			return select("core").getEntityRecords("postType", "post", query);
		},
		[posts_per_page, order, orderBy, cat]
	);

	if (!posts) {
		return (
			<div {...blockProps}>
				<Inspector {...props} />
				<div style={{ padding: "40px", textAlign: "center" }}>
					<Spinner />
				</div>
			</div>
		);
	}

	if (posts.length === 0) {
		return (
			<div {...blockProps}>
				<Inspector {...props} />
				<p style={{ padding: "20px", color: "#888" }}>No posts found.</p>
			</div>
		);
	}

	return (
		<div {...blockProps}>
			<Inspector {...props} />
			<div className="block-post-carousel__nav">
				<button className={`block-post-carousel__btn ${prevClass}`} aria-label="Previous">
					<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
				<button className={`block-post-carousel__btn ${nextClass}`} aria-label="Next">
					<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
			</div>
			<Swiper
				key={`${uid}-${posts.length}`}
				modules={[Navigation]}
				navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
				spaceBetween={32}
				slidesPerView={1.15}
				breakpoints={{
					768: { slidesPerView: 2, spaceBetween: 24 },
					1024: { slidesPerView: 3, spaceBetween: 32 },
				}}
			>
				{posts.map((post) => {
					const imgUrl =
						post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
						"https://placehold.co/800x450/E8F9FF/120A00?text=No+Image";
					const imgAlt =
						post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title?.rendered || "";
					const cats = post._embedded?.["wp:term"]?.[0] || [];
					const author = post._embedded?.author?.[0];
					const dateStr = post.date
						? new Date(post.date).toLocaleDateString("vi-VN", {
								day: "numeric",
								month: "long",
								year: "numeric",
							})
						: "";
					const excerpt = post.excerpt?.rendered
						? post.excerpt.rendered.replace(/<[^>]+>/g, "").trim()
						: "";

					return (
						<SwiperSlide key={post.id}>
							<article className="post-carousel-card">
								<a className="post-carousel-card__img" href={post.link}>
									<img src={imgUrl} alt={imgAlt} />
								</a>

								{cats.length > 0 && (
									<div className="post-carousel-card__cats">
										{cats.slice(0, 3).map((c) => (
											<span key={c.id} className="post-carousel-card__cat">
												{c.name}
											</span>
										))}
									</div>
								)}

								<div className="post-carousel-card__content">
									<h3
										className="post-carousel-card__title"
										dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
									/>
									{showExcerpt && excerpt && (
										<p className="post-carousel-card__excerpt">{excerpt}</p>
									)}
									{showMeta && (
										<div className="post-carousel-card__meta">
											{author && (
												<span className="post-carousel-card__author">
													Bởi <strong>{author.name}</strong>
												</span>
											)}
											{author && dateStr && (
												<span className="post-carousel-card__sep">•</span>
											)}
											{dateStr && (
												<span className="post-carousel-card__date">{dateStr}</span>
											)}
										</div>
									)}
								</div>
							</article>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Edit;
