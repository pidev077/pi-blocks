import ServerSideRender from "@wordpress/server-side-render";
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { PanelBody, TextControl, TextareaControl, RangeControl, Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

function IconUpload( { label, value, onChange } ) {
	return (
		<div style={{ marginBottom: 16 }}>
			<p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', color: '#1e1e1e' }}>
				{label}
			</p>
			{value && (
				<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
					<img src={value} alt="" style={{ width: 32, height: 32, objectFit: 'contain', background: '#f5f5f5', borderRadius: 4, padding: 4 }} />
					<Button variant="link" isDestructive onClick={() => onChange('')} style={{ fontSize: 12 }}>
						{__('Xóa')}
					</Button>
				</div>
			)}
			<MediaUploadCheck>
				<MediaUpload
					onSelect={(media) => onChange(media.url)}
					allowedTypes={['image']}
					value={value}
					render={({ open }) => (
						<Button variant="secondary" onClick={open} style={{ width: '100%' }}>
							{value ? __('Thay ảnh') : __('Chọn ảnh')}
						</Button>
					)}
				/>
			</MediaUploadCheck>
		</div>
	);
}

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		phone, phoneHours, phoneIcon,
		email, emailIcon,
		zaloName, zaloSub, zaloUrl, zaloIcon,
		address, addressIcon,
		iconWidth,
	} = attributes;

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Thông tin liên hệ')} initialOpen={true}>
					<TextControl
						__next40pxDefaultSize __nextHasNoMarginBottom
						label={__('Hotline')}
						value={phone}
						onChange={(v) => setAttributes({ phone: v })}
					/>
					<TextControl
						__next40pxDefaultSize __nextHasNoMarginBottom
						label={__('Phụ đề hotline')}
						value={phoneHours}
						onChange={(v) => setAttributes({ phoneHours: v })}
					/>
					<TextControl
						__next40pxDefaultSize __nextHasNoMarginBottom
						label={__('Email')}
						value={email}
						onChange={(v) => setAttributes({ email: v })}
					/>
					<TextControl
						__next40pxDefaultSize __nextHasNoMarginBottom
						label={__('Tên Zalo Page')}
						value={zaloName}
						onChange={(v) => setAttributes({ zaloName: v })}
					/>
					<TextControl
						__next40pxDefaultSize __nextHasNoMarginBottom
						label={__('Phụ đề Zalo')}
						value={zaloSub}
						onChange={(v) => setAttributes({ zaloSub: v })}
					/>
					<TextControl
						__next40pxDefaultSize __nextHasNoMarginBottom
						label={__('Link Zalo (tùy chọn)')}
						value={zaloUrl}
						onChange={(v) => setAttributes({ zaloUrl: v })}
					/>
					<TextareaControl
						label={__('Địa chỉ')}
						value={address}
						onChange={(v) => setAttributes({ address: v })}
						rows={3}
					/>
				</PanelBody>

				<PanelBody title={__('Icons')} initialOpen={false}>
					<RangeControl
						__next40pxDefaultSize __nextHasNoMarginBottom
						label={__('Kích thước icon (px)')}
						value={iconWidth}
						onChange={(v) => setAttributes({ iconWidth: v })}
						min={16}
						max={64}
						step={2}
					/>
					<div style={{ marginTop: 16 }}>
						<IconUpload label={__('Hotline')}    value={phoneIcon}   onChange={(v) => setAttributes({ phoneIcon: v })} />
						<IconUpload label={__('Email')}      value={emailIcon}   onChange={(v) => setAttributes({ emailIcon: v })} />
						<IconUpload label={__('Zalo Page')}  value={zaloIcon}    onChange={(v) => setAttributes({ zaloIcon: v })} />
						<IconUpload label={__('Địa chỉ')}    value={addressIcon} onChange={(v) => setAttributes({ addressIcon: v })} />
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<ServerSideRender
					block="pi-blocks/info-box"
					attributes={attributes}
				/>
			</div>
		</>
	);
}
