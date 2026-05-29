import { InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	TextControl,
	TextareaControl,
	Button,
	Flex,
	FlexItem,
} from "@wordpress/components";

const defaultItem = () => ({ image: null, title: "", description: "" });

const Inspector = ({ attributes, setAttributes }) => {
	const { slides_per_view, items } = attributes;

	const updateItem = (index, field, value) => {
		const next = [...items];
		next[index] = { ...next[index], [field]: value };
		setAttributes({ items: next });
	};

	const addItem = () =>
		setAttributes({ items: [...items, defaultItem()] });

	const removeItem = (index) =>
		setAttributes({ items: items.filter((_, i) => i !== index) });

	const moveItem = (index, dir) => {
		const next = [...items];
		const swapIndex = index + dir;
		if (swapIndex < 0 || swapIndex >= next.length) return;
		[next[index], next[swapIndex]] = [next[swapIndex], next[index]];
		setAttributes({ items: next });
	};

	return (
		<InspectorControls>
			{/* ── Slides ── */}
			<PanelBody title={`Slides (${items.length})`} initialOpen={true}>
				{items.map((item, index) => (
					<div key={index} className="tech-inspector__item">
						{/* Header */}
						<Flex className="tech-inspector__item-header" justify="space-between" align="center">
							<FlexItem>
								<strong style={{ fontSize: 12 }}>
									#{index + 1} {item.title ? `— ${item.title.replace(/<[^>]+>/g, "")}` : ""}
								</strong>
							</FlexItem>
							<FlexItem>
								<Flex gap={1}>
									<Button
										isSmall
										icon="arrow-up-alt2"
										label="Lên"
										onClick={() => moveItem(index, -1)}
										disabled={index === 0}
									/>
									<Button
										isSmall
										icon="arrow-down-alt2"
										label="Xuống"
										onClick={() => moveItem(index, 1)}
										disabled={index === items.length - 1}
									/>
									<Button
										isSmall
										isDestructive
										icon="trash"
										label="Xóa"
										onClick={() => removeItem(index)}
									/>
								</Flex>
							</FlexItem>
						</Flex>

						{/* Image */}
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) =>
									updateItem(index, "image", {
										id: media.id,
										url: media.sizes?.large?.url || media.url,
										alt: media.alt,
									})
								}
								allowedTypes={["image"]}
								value={item.image?.id}
								render={({ open }) => (
									<div className="tech-inspector__image-wrap">
										{item.image?.url ? (
											<div className="tech-inspector__thumb" onClick={open}>
												<img src={item.image.url} alt={item.image.alt || ""} />
												<span className="tech-inspector__change">Đổi ảnh</span>
											</div>
										) : (
											<Button
												variant="secondary"
												onClick={open}
												style={{ width: "100%" }}
											>
												+ Chọn ảnh
											</Button>
										)}
									</div>
								)}
							/>
						</MediaUploadCheck>

						{/* Title */}
						<TextControl
							label="Tên"
							value={item.title ? item.title.replace(/<[^>]+>/g, "") : ""}
							onChange={(v) => updateItem(index, "title", v)}
							placeholder="Tên công nghệ..."
						/>

						{/* Description */}
						<TextareaControl
							label="Mô tả"
							value={item.description ? item.description.replace(/<[^>]+>/g, "") : ""}
							onChange={(v) => updateItem(index, "description", v)}
							placeholder="Mô tả ngắn..."
							rows={3}
						/>
					</div>
				))}

				<Button
					variant="primary"
					onClick={addItem}
					style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
				>
					+ Thêm slide
				</Button>
			</PanelBody>

			{/* ── Settings ── */}
			<PanelBody title="Hiển thị" initialOpen={false}>
				<RangeControl
					label="Số slide hiển thị (desktop)"
					value={slides_per_view}
					onChange={(value) => setAttributes({ slides_per_view: value })}
					min={1}
					max={6}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
