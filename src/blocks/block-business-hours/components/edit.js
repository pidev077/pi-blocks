import ServerSideRender from "@wordpress/server-side-render";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl, TextareaControl, Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { title, rows, footerNote } = attributes;

	const blockProps = useBlockProps();

	const updateRow = ( index, field, value ) => {
		const next = [ ...rows ];
		next[ index ] = { ...next[ index ], [ field ]: value };
		setAttributes({ rows: next });
	};

	const addRow = () =>
		setAttributes({ rows: [ ...rows, { days: '', time: '' } ] });

	const removeRow = ( index ) =>
		setAttributes({ rows: rows.filter( ( _, i ) => i !== index ) });

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Giờ làm việc')} initialOpen={true}>
					<TextControl
						__next40pxDefaultSize __nextHasNoMarginBottom
						label={__('Tiêu đề')}
						value={title}
						onChange={(v) => setAttributes({ title: v })}
					/>
					<div style={{ marginTop: 16 }}>
						{rows.map( ( row, i ) => (
							<div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #e0e0e0' }}>
								<TextControl
									__next40pxDefaultSize __nextHasNoMarginBottom
									label={`${__('Ngày')} ${i + 1}`}
									value={row.days}
									onChange={(v) => updateRow( i, 'days', v )}
								/>
								<TextControl
									__next40pxDefaultSize __nextHasNoMarginBottom
									label={__('Giờ / Ghi chú')}
									value={row.time}
									onChange={(v) => updateRow( i, 'time', v )}
								/>
								<Button variant="link" isDestructive onClick={() => removeRow( i )} style={{ marginTop: 4 }}>
									{__('Xóa dòng')}
								</Button>
							</div>
						) )}
						<Button variant="secondary" onClick={addRow} style={{ width: '100%' }}>
							{__('+ Thêm dòng')}
						</Button>
					</div>
				</PanelBody>
				<PanelBody title={__('Ghi chú')} initialOpen={false}>
					<TextareaControl
						label={__('Ghi chú cuối thẻ')}
						value={footerNote}
						onChange={(v) => setAttributes({ footerNote: v })}
						rows={3}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<ServerSideRender
					block="pi-blocks/business-hours"
					attributes={attributes}
				/>
			</div>
		</>
	);
}
