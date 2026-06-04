import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import {
	useBlockProps,
	MediaPlaceholder,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowPrev, ArrowNext, InfoIcon } from "./icons";

const Edit = (props) => {
	const { attributes, setAttributes, className } = props;
	const { images, noteText } = attributes;

	const blockProps = useBlockProps({
		className: ["block-result-carousel", className].join(" "),
	});

	const onSelectMedia = (media) => {
		setAttributes({
			images: media.map((item) => ({
				id: item.id,
				url: item.url,
				alt: item.alt,
			})),
		});
	};

	const totalStr = String(images.length).padStart(2, "0");

	return (
		<Fragment>
			<BlockControls>
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectMedia}
							allowedTypes={["image"]}
							multiple
							gallery
							value={images.map((img) => img.id)}
							render={({ open }) => (
								<ToolbarButton
									icon="format-gallery"
									label={__("Edit images", "pi-blocks")}
									onClick={open}
								/>
							)}
						/>
					</MediaUploadCheck>
				</ToolbarGroup>
			</BlockControls>

			<div {...blockProps}>
				{images.length === 0 && (
					<MediaPlaceholder
						icon="format-image"
						labels={{
							title: __("Result Images", "pi-blocks"),
							instructions: __(
								"Select before/after images for the carousel",
								"pi-blocks"
							),
						}}
						value={[]}
						onSelect={onSelectMedia}
						accept="image/*"
						allowedTypes={["image"]}
						multiple
					/>
				)}

				{images.length > 0 && (
					<div className="block-result-carousel__swiper-wrap">
						<Swiper
							className="block-result-carousel__swiper"
							modules={[Navigation]}
							slidesPerView={1}
							key={images.length}
						>
							{images.map((image, index) => (
								<SwiperSlide key={index}>
									<figure className="block-result-carousel__figure">
										<img src={image.url} alt={image.alt} />
									</figure>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				)}

				{images.length > 0 && (
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
				)}

				<div className="block-result-carousel__note">
					<div className="block-result-carousel__note-title">
						<InfoIcon />
						<strong>LƯU Ý:</strong>
					</div>
					<RichText
						tagName="p"
						value={noteText}
						onChange={(value) => setAttributes({ noteText: value })}
						placeholder={__("Nhập nội dung lưu ý...", "pi-blocks")}
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
