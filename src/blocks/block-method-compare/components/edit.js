import {
	InspectorControls,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	PanelRow,
	TextControl,
	Button,
} from "@wordpress/components";

const ChevronIcon = () => (
	<svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
		<path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const Edit = ({ attributes, setAttributes }) => {
	const { sectionLabel, heading, columns, criteria } = attributes;
	const blockProps = useBlockProps({ className: "block-method-compare block-method-compare--editor" });

	const setColumn = (i, patch) =>
		setAttributes({ columns: columns.map((c, idx) => (idx === i ? { ...c, ...patch } : c)) });

	const addColumn = () =>
		setAttributes({
			columns:  [...columns, { label: "Cột mới", imageId: 0, imageUrl: "", imageAlt: "" }],
			criteria: criteria.map((c) => ({ ...c, values: [...c.values, ""] })),
		});

	const removeColumn = (i) =>
		setAttributes({
			columns:  columns.filter((_, idx) => idx !== i),
			criteria: criteria.map((c) => ({ ...c, values: c.values.filter((_, idx) => idx !== i) })),
		});

	const setCriteria = (i, patch) =>
		setAttributes({ criteria: criteria.map((c, idx) => (idx === i ? { ...c, ...patch } : c)) });

	const setCriteriaValue = (ci, vi, val) =>
		setAttributes({
			criteria: criteria.map((c, idx) => {
				if (idx !== ci) return c;
				return { ...c, values: c.values.map((v, i) => (i === vi ? val : v)) };
			}),
		});

	const addCriteria = () =>
		setAttributes({
			criteria: [...criteria, { label: "Tiêu chí mới", values: columns.map(() => "") }],
		});

	const removeCriteria = (i) =>
		setAttributes({ criteria: criteria.filter((_, idx) => idx !== i) });

	return (
		<>
			<InspectorControls>
				<PanelBody title="Tiêu đề" initialOpen={true}>
					<TextControl
						label="Section Label"
						value={sectionLabel}
						onChange={(val) => setAttributes({ sectionLabel: val })}
					/>
					<TextControl
						label="Heading"
						value={heading}
						onChange={(val) => setAttributes({ heading: val })}
					/>
				</PanelBody>

				<PanelBody title={`Cột (${columns.length})`} initialOpen={false}>
					{columns.map((col, i) => (
						<div
							key={i}
							style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: 12, marginBottom: 12 }}
						>
							<PanelRow>
								<strong style={{ fontSize: 12, color: "#555" }}>Cột {i + 1}</strong>
								<Button icon="trash" isDestructive isSmall label="Xoá" onClick={() => removeColumn(i)} />
							</PanelRow>
							<TextControl
								label="Tên cột"
								value={col.label}
								onChange={(val) => setColumn(i, { label: val })}
							/>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) =>
										setColumn(i, { imageId: media.id, imageUrl: media.url, imageAlt: media.alt || "" })
									}
									allowedTypes={["image"]}
									value={col.imageId}
									render={({ open }) => (
										<div>
											{col.imageUrl && (
												<img
													src={col.imageUrl}
													alt=""
													style={{ width: "100%", height: 100, objectFit: "cover", marginBottom: 6, borderRadius: 3 }}
												/>
											)}
											<Button variant="secondary" onClick={open} style={{ width: "100%", marginBottom: 4 }}>
												{col.imageUrl ? "Đổi ảnh" : "Chọn ảnh"}
											</Button>
											{col.imageUrl && (
												<Button
													variant="link"
													isDestructive
													onClick={() => setColumn(i, { imageId: 0, imageUrl: "", imageAlt: "" })}
												>
													Xoá ảnh
												</Button>
											)}
										</div>
									)}
								/>
							</MediaUploadCheck>
						</div>
					))}
					<Button variant="secondary" icon="plus-alt2" onClick={addColumn} style={{ width: "100%" }}>
						Thêm cột
					</Button>
				</PanelBody>

				<PanelBody title={`Tiêu chí (${criteria.length})`} initialOpen={false}>
					{criteria.map((row, ci) => (
						<div
							key={ci}
							style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: 12, marginBottom: 12 }}
						>
							<PanelRow>
								<strong style={{ fontSize: 12, color: "#555" }}>Hàng {ci + 1}</strong>
								<Button icon="trash" isDestructive isSmall onClick={() => removeCriteria(ci)} />
							</PanelRow>
							<TextControl
								label="Tiêu chí"
								value={row.label}
								onChange={(val) => setCriteria(ci, { label: val })}
							/>
							{columns.map((col, vi) => (
								<TextControl
									key={vi}
									label={col.label || `Cột ${vi + 1}`}
									value={row.values[vi] ?? ""}
									onChange={(val) => setCriteriaValue(ci, vi, val)}
								/>
							))}
						</div>
					))}
					<Button variant="secondary" icon="plus-alt2" onClick={addCriteria} style={{ width: "100%" }}>
						Thêm tiêu chí
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="mc-intro">
					{sectionLabel && <span className="mc-intro__label">{sectionLabel}</span>}
					<span className="mc-intro__deco" aria-hidden="true">✦</span>
					{heading && <h2 className="mc-intro__heading">{heading}</h2>}
				</div>

				<div className="mc-table-wrap">
					<table className="mc-table">
						<thead>
							<tr>
								<th className="mc-table__th-empty"></th>
								{columns.map((col, i) => (
									<th key={i} className="mc-table__col-header">
										<div className="mc-table__col-tag">
											<span className="mc-table__col-label">{col.label}</span>
											<ChevronIcon />
										</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr className="mc-table__image-row">
								<td></td>
								{columns.map((col, i) => (
									<td key={i} className="mc-table__image-cell">
										{col.imageUrl ? (
											<img src={col.imageUrl} alt={col.imageAlt || col.label} />
										) : (
											<div className="mc-table__image-placeholder" />
										)}
									</td>
								))}
							</tr>
							{criteria.map((row, ci) => (
								<tr key={ci} className="mc-table__data-row">
									<td className="mc-table__row-label">{row.label}</td>
									{columns.map((_, vi) => (
										<td key={vi} className="mc-table__cell">
											{row.values[vi] ?? ""}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default Edit;
