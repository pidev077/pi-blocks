import { useBlockProps, RichText } from "@wordpress/block-editor";
import { ArrowPrev, ArrowNext, InfoIcon } from "./icons";

const Save = (props) => {
	const { attributes, className } = props;
	const { images, noteText } = attributes;

	const blockProps = useBlockProps.save({
		className: ["block-result-carousel", className].join(" "),
	});

	const totalStr = String(images.length).padStart(2, "0");

	return (
		<div {...blockProps}>
			<div className="block-result-carousel__swiper-wrap">
				<div className="block-result-carousel__swiper swiper">
					<div className="swiper-wrapper">
						{images.map((image, index) => (
							<div key={index} className="swiper-slide">
								<figure className="block-result-carousel__figure">
									<img
										src={image.url}
										alt={image.alt || `Result ${index + 1}`}
										loading="lazy"
									/>
								</figure>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="block-result-carousel__controls">
				<button className="block-result-carousel__prev" aria-label="Previous">
					<ArrowPrev />
				</button>
				<div className="block-result-carousel__counter">
					<span className="block-result-carousel__current">01</span>
					<span className="block-result-carousel__sep"> / </span>
					<span className="block-result-carousel__total">{totalStr}</span>
				</div>
				<button className="block-result-carousel__next" aria-label="Next">
					<ArrowNext />
				</button>
			</div>

			<div className="block-result-carousel__note">
				<div className="block-result-carousel__note-title">
					<InfoIcon />
					<strong>LƯU Ý:</strong>
				</div>
				<RichText.Content tagName="p" value={noteText} />
			</div>
		</div>
	);
};

export default Save;
