import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, QueryControls, RangeControl, ToggleControl } from "@wordpress/components";

const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const { parent_only, posts_per_page, order, orderBy, slides_per_view } = attributes;

	return (
		<InspectorControls>
			<PanelBody title="Danh mục">
				<ToggleControl
					label="Chỉ danh mục gốc"
					checked={parent_only}
					onChange={(value) => setAttributes({ parent_only: value })}
					help="Bật để chỉ hiện danh mục cấp 1, tắt để hiện tất cả."
				/>
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
