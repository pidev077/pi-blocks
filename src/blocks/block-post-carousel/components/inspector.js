import { InspectorControls } from "@wordpress/block-editor";
import { QueryControls, PanelBody, ToggleControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";

const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const { posts_per_page, order, orderBy, cat, showExcerpt, showMeta } = attributes;

	const categories = useSelect((select) => {
		return select("core").getEntityRecords("taxonomy", "category", {
			per_page: 100,
			hide_empty: true,
		});
	}, []);

	const categorySuggestions = categories
		? categories.reduce((acc, cat) => {
				acc[cat.name] = cat;
				return acc;
		  }, {})
		: {};

	const selectedCat = categories ? categories.find((c) => c.id === cat) : null;

	return (
		<InspectorControls>
			<PanelBody title="Query">
				<QueryControls
					{...{ orderBy, order }}
					numberOfItems={posts_per_page}
					onOrderByChange={(val) => setAttributes({ orderBy: val })}
					onOrderChange={(val) => setAttributes({ order: val })}
					onNumberOfItemsChange={(val) => setAttributes({ posts_per_page: val })}
					categorySuggestions={categorySuggestions}
					selectedCategories={selectedCat ? [selectedCat] : []}
					onCategoryChange={(val) => {
						if (!val.length) {
							setAttributes({ cat: 0 });
							return;
						}
						const last = val[val.length - 1];
						const matched = typeof last === "string" ? categorySuggestions[last] : last;
						setAttributes({ cat: matched ? matched.id : 0 });
					}}
				/>
			</PanelBody>
			<PanelBody title="Display">
				<ToggleControl
					label="Show excerpt"
					checked={showExcerpt}
					onChange={(val) => setAttributes({ showExcerpt: val })}
				/>
				<ToggleControl
					label="Show author & date"
					checked={showMeta}
					onChange={(val) => setAttributes({ showMeta: val })}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
