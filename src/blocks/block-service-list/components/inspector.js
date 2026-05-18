import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, QueryControls, TextControl } from "@wordpress/components";

const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const { post_type, posts_per_page, order, orderBy } = attributes;

	return (
		<InspectorControls>
			<PanelBody title="General">
				<TextControl
					label="Post Type"
					value={post_type}
					onChange={(value) => setAttributes({ post_type: value })}
					help="Enter the post type slug (e.g. service, post)"
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
