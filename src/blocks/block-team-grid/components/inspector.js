import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, QueryControls, TextControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const Inspector = (props) => {
	const { attributes, setAttributes } = props
	const { posts_per_page, order, orderBy, link_label } = attributes

	return (
		<InspectorControls>
			<PanelBody title={__('Query')}>
				<QueryControls
					{...{ orderBy, order }}
					numberOfItems={posts_per_page}
					onOrderByChange={(val) => setAttributes({ orderBy: val })}
					onOrderChange={(val) => setAttributes({ order: val })}
					onNumberOfItemsChange={(val) => setAttributes({ posts_per_page: val })}
				/>
			</PanelBody>
			<PanelBody title={__('Labels')}>
				<TextControl
					label={__('Link label')}
					value={link_label}
					onChange={(val) => setAttributes({ link_label: val })}
				/>
			</PanelBody>
		</InspectorControls>
	)
}

export default Inspector
