import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, QueryControls, TextControl, FormTokenField } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";

const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const { post_type, posts_per_page, order, orderBy, selected_posts } = attributes;

	const posts = useSelect(
		(select) => {
			return select(coreStore).getEntityRecords("postType", post_type, {
				per_page: 100,
				status: "publish",
				_fields: "id,title",
			});
		},
		[post_type]
	);

	const postSuggestions = posts ? posts.map((post) => post.title.rendered) : [];

	const selectedTitles = (selected_posts || [])
		.map((id) => {
			const post = posts ? posts.find((p) => p.id === id) : null;
			return post ? post.title.rendered : String(id);
		})
		.filter(Boolean);

	const onTokenChange = (tokens) => {
		const ids = tokens
			.map((token) => {
				const post = posts ? posts.find((p) => p.title.rendered === token) : null;
				return post ? post.id : null;
			})
			.filter((id) => id !== null);
		setAttributes({ selected_posts: ids });
	};

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
			<PanelBody title="Chọn bài viết">
				<FormTokenField
					label="Dịch vụ hiển thị"
					value={selectedTitles}
					suggestions={postSuggestions}
					onChange={onTokenChange}
					help="Để trống để hiển thị tất cả. Tìm và chọn từng dịch vụ muốn hiển thị."
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
