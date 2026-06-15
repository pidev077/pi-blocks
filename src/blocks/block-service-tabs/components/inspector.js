import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl, TextareaControl, Button } from "@wordpress/components";

let _uid = 0;
const uid = () => String( ++_uid );

const Inspector = ( { attributes, setAttributes } ) => {
	const { groups } = attributes;

	const setGroups = ( next ) => setAttributes( { groups: next } );

	const addGroup = () => {
		setGroups( [
			...groups,
			{ id: uid(), label: "NHÓM MỚI", items: [] },
		] );
	};

	const removeGroup = ( gi ) => {
		setGroups( groups.filter( ( _, i ) => i !== gi ) );
	};

	const updateGroup = ( gi, patch ) => {
		setGroups( groups.map( ( g, i ) => i === gi ? { ...g, ...patch } : g ) );
	};

	const addItem = ( gi ) => {
		const g = groups[ gi ];
		updateGroup( gi, {
			items: [ ...g.items, { id: uid(), navLabel: "Mục mới", title: "Tiêu đề", desc: "" } ],
		} );
	};

	const removeItem = ( gi, ii ) => {
		const g = groups[ gi ];
		updateGroup( gi, { items: g.items.filter( ( _, i ) => i !== ii ) } );
	};

	const updateItem = ( gi, ii, patch ) => {
		const g = groups[ gi ];
		updateGroup( gi, {
			items: g.items.map( ( item, i ) => i === ii ? { ...item, ...patch } : item ),
		} );
	};

	return (
		<InspectorControls>
			<PanelBody title="Nội dung" initialOpen={ true }>
				{ groups.map( ( group, gi ) => (
					<div key={ group.id } style={ { marginBottom: 16, padding: "12px", background: "#f8f5f0", borderRadius: 4 } }>
						<div style={ { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } }>
							<TextControl
								label={ `Nhãn nhóm ${ gi + 1 }` }
								value={ group.label }
								onChange={ ( v ) => updateGroup( gi, { label: v } ) }
								style={ { flex: 1 } }
							/>
						</div>

						{ group.items.map( ( item, ii ) => (
							<div key={ item.id } style={ { paddingLeft: 10, borderLeft: "3px solid #C9A96E", marginBottom: 12 } }>
								<TextControl
									label="Tên trên nav"
									value={ item.navLabel }
									onChange={ ( v ) => updateItem( gi, ii, { navLabel: v } ) }
								/>
								<TextControl
									label="Tiêu đề nội dung"
									value={ item.title }
									onChange={ ( v ) => updateItem( gi, ii, { title: v } ) }
								/>
								<TextareaControl
									label="Mô tả"
									value={ item.desc }
									rows={ 3 }
									onChange={ ( v ) => updateItem( gi, ii, { desc: v } ) }
								/>
								<Button
									variant="tertiary"
									isDestructive
									isSmall
									onClick={ () => removeItem( gi, ii ) }
								>
									Xóa mục
								</Button>
							</div>
						) ) }

						<div style={ { display: "flex", gap: 8, marginTop: 8 } }>
							<Button variant="secondary" isSmall onClick={ () => addItem( gi ) }>
								+ Thêm mục
							</Button>
							<Button variant="tertiary" isDestructive isSmall onClick={ () => removeGroup( gi ) }>
								Xóa nhóm
							</Button>
						</div>
					</div>
				) ) }

				<Button variant="primary" isSmall onClick={ addGroup } style={ { marginTop: 8 } }>
					+ Thêm nhóm
				</Button>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
