import './styles/style.scss'
import './styles/editor.scss'

import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'

import Edit from './components/edit'
import Save from './components/save'

const BlockAttrs = {
	posts_per_page: { type: 'number',  default: 9 },
	order:          { type: 'string',  default: 'asc' },
	orderBy:        { type: 'string',  default: 'menu_order' },
	link_label:     { type: 'string',  default: 'Xem Hồ Sơ' },
	anchor:         { type: 'string',  default: '' },
}

export default registerBlockType('pi-blocks/block-team-grid', {
	title:    __('Team Grid'),
	icon:     'groups',
	category: 'pi-blocks',
	keywords: [__('team'), __('grid'), __('doctors')],
	attributes: BlockAttrs,
	supports: {
		align: ['full'],
		anchor: true,
	},
	edit: (props) => <Edit {...props} />,
	save: (props) => <Save {...props} />,
})
