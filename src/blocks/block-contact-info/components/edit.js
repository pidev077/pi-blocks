import { useState } from "@wordpress/element";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const ICONS = {
	address: (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="currentColor"/>
		</svg>
	),
	phone: (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
		</svg>
	),
	email: (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
		</svg>
	),
	hours: (
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="currentColor"/>
		</svg>
	),
};

export default function Edit({ attributes, setAttributes }) {
	const { address, phone, email, hoursItems } = attributes;
	const blockProps = useBlockProps({ className: "block-contact-info block-contact-info--editor" });

	const updateHours = (index, field, value) => {
		const newItems = [...hoursItems];
		newItems[index] = { ...newItems[index], [field]: value };
		setAttributes({ hoursItems: newItems });
	};

	const addHours = () =>
		setAttributes({ hoursItems: [...hoursItems, { days: "", time: "" }] });

	const removeHours = (index) =>
		setAttributes({ hoursItems: hoursItems.filter((_, i) => i !== index) });

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Thông tin liên hệ")} initialOpen={true}>
					<TextareaControl
						label={__("Địa chỉ")}
						value={address}
						onChange={(v) => setAttributes({ address: v })}
						rows={3}
					/>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__("Điện thoại")}
						value={phone}
						onChange={(v) => setAttributes({ phone: v })}
					/>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={__("Email")}
						value={email}
						onChange={(v) => setAttributes({ email: v })}
					/>
				</PanelBody>

				<PanelBody title={__("Giờ làm việc")} initialOpen={true}>
					{hoursItems.map((item, i) => (
						<div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #e0e0e0" }}>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={__("Ngày")}
								value={item.days}
								onChange={(v) => updateHours(i, "days", v)}
							/>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={__("Giờ / Ghi chú")}
								value={item.time}
								onChange={(v) => updateHours(i, "time", v)}
							/>
							<Button
								variant="link"
								isDestructive
								onClick={() => removeHours(i)}
								style={{ marginTop: 4 }}
							>
								{__("Xóa dòng")}
							</Button>
						</div>
					))}
					<Button variant="secondary" onClick={addHours} style={{ width: "100%" }}>
						{__("+ Thêm dòng giờ")}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{address && (
					<div className="ci-item">
						<span className="ci-icon">{ICONS.address}</span>
						<span className="ci-text">{address}</span>
					</div>
				)}
				{phone && (
					<div className="ci-item">
						<span className="ci-icon">{ICONS.phone}</span>
						<a className="ci-text ci-link" href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
					</div>
				)}
				{email && (
					<div className="ci-item">
						<span className="ci-icon">{ICONS.email}</span>
						<a className="ci-text ci-link" href={`mailto:${email}`}>{email}</a>
					</div>
				)}
				{hoursItems.length > 0 && (
					<div className="ci-item ci-item--hours">
						<span className="ci-icon">{ICONS.hours}</span>
						<div className="ci-hours">
							{hoursItems.map((item, i) => (
								<div key={i} className="ci-hours__row">
									<span className="ci-hours__days">{item.days}</span>
									<span className="ci-hours__time">{item.time}</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
