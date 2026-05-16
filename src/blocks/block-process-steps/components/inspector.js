import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	Button,
	TextControl,
	TextareaControl,
} from "@wordpress/components";

export default function Inspector({ items, setAttributes }) {
	const updateItem = (index, newVal) => {
		const newItems = [...items];
		newItems[index] = { ...newItems[index], ...newVal };
		setAttributes({ items: newItems });
	};

	const addItem = () => {
		setAttributes({
			items: [
				...items,
				{
					id: Date.now(),
					title: `Bước ${items.length + 1}`,
					description: "",
					imgUrl: "",
					imgID: 0,
					imgAlt: "",
				},
			],
		});
	};

	const removeItem = (index) => {
		setAttributes({ items: items.filter((_, i) => i !== index) });
	};

	return (
		<InspectorControls>
			<PanelBody title="Các bước" initialOpen={true}>
				{items.map((item, index) => (
					<PanelBody
						key={item.id || index}
						title={`${index + 1}. ${item.title || "Bước"}`}
						initialOpen={index === 0}
					>
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label="Tiêu đề"
							value={item.title}
							onChange={(v) => updateItem(index, { title: v })}
						/>

						<TextareaControl
							label="Mô tả"
							value={item.description}
							onChange={(v) => updateItem(index, { description: v })}
							rows={4}
						/>

						<MediaUploadCheck>
							<MediaUpload
								allowedTypes={["image"]}
								value={item.imgID}
								onSelect={(media) =>
									updateItem(index, {
										imgUrl: media.url,
										imgID: media.id,
										imgAlt: media.alt || "",
									})
								}
								render={({ open }) => (
									<Button
										variant="secondary"
										onClick={open}
										style={{ marginBottom: 8 }}
									>
										{item.imgUrl ? "Đổi ảnh" : "Chọn ảnh"}
									</Button>
								)}
							/>
						</MediaUploadCheck>

						{item.imgUrl && (
							<img
								src={item.imgUrl}
								alt={item.imgAlt}
								style={{
									width: "100%",
									borderRadius: 8,
									marginBottom: 8,
									display: "block",
								}}
							/>
						)}

						<Button
							variant="link"
							isDestructive
							onClick={() => removeItem(index)}
						>
							Xóa bước này
						</Button>
					</PanelBody>
				))}

				<Button
					variant="primary"
					onClick={addItem}
					style={{ marginTop: 12, width: "100%" }}
				>
					+ Thêm bước
				</Button>
			</PanelBody>
		</InspectorControls>
	);
}
