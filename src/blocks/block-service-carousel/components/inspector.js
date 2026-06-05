import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, QueryControls, RangeControl, ToggleControl, SelectControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";

const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const { parent_only, posts_per_page, order, orderBy, slides_per_view, category } = attributes;

	const terms = useSelect((select) => {
		return select(coreStore).getEntityRecords("taxonomy", "service_category", {
			per_page: -1,
			hide_empty: false,
			orderby: "name",
			order: "asc",
		});
	}, []);

	const termOptions = [
		{ label: "— Tất cả —", value: "0" },
		...(terms || []).map((t) => ({ label: t.name, value: String(t.id) })),
	];

	return (
		<InspectorControls>
			<PanelBody title="Danh mục">
				<SelectControl
					label="Lọc theo danh mục"
					value={String(category)}
					options={termOptions}
					onChange={(value) => setAttributes({ category: parseInt(value, 10) })}
					help="Chọn danh mục để chỉ hiện các nhóm dịch vụ con của nó."
				/>
				{category === 0 && (
					<ToggleControl
						label="Chỉ danh mục gốc"
						checked={parent_only}
						onChange={(value) => setAttributes({ parent_only: value })}
						help="Bật để chỉ hiện danh mục cấp 1, tắt để hiện tất cả."
					/>
				)}
			</PanelBody>
			<PanelBody title="Hiển thị">
				<RangeControl
					label="Số slide hiển thị (desktop)"
					value={slides_per_view}
					onChange={(value) => setAttributes({ slides_per_view: value })}
					min={1}
					max={6}
				/>
			</PanelBody>
			<PanelBody title="Query">
				<QueryControls
					{...{ orderBy, order, numberOfItems: posts_per_page }}
					onOrderByChange={(newOrderBy) =>
						setAttributes({ orderBy: newOrderBy })
					}
					onOrderChange={(newOrder) => setAttributes({ order: newOrder })}
					onNumberOfItemsChange={(newNumber) =>
						setAttributes({ posts_per_page: newNumber })
					}
					minItems={1}
					maxItems={50}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
