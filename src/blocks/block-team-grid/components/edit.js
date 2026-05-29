import { Fragment } from '@wordpress/element'
import Inspector from './inspector'
const { serverSideRender: ServerSideRender } = wp

const Edit = (props) => {
	const { attributes } = props
	return (
		<Fragment>
			<Inspector {...props} />
			<ServerSideRender
				className='block-server-render'
				block="pi-blocks/block-team-grid"
				attributes={attributes}
			/>
		</Fragment>
	)
}

export default Edit
