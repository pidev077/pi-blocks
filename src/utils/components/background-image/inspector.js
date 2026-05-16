/**
 * Background image inspector settings.
 */

const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
	FocalPointPicker,
	Icon,
	ToggleControl,
	SelectControl,
} = wp.components;
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;

class BackgroundImagePanel extends Component {
	render() {
		const { attributes, setAttributes } = this.props;

		const backgroundRepeatOptions = [
			{ value: 'no-repeat', label: __( 'No Repeat', 'pi-blocks' ) },
			{ value: 'repeat', label: __( 'Repeat', 'pi-blocks' ) },
			{
				value: 'repeat-x',
				label: __( 'Repeat Horizontally', 'pi-blocks' ),
			},
			{
				value: 'repeat-y',
				label: __( 'Repeat Vertically', 'pi-blocks' ),
			},
		];

		const backgroundSizeOptions = [
			{ value: 'auto', label: __( 'Auto', 'pi-blocks' ) },
			{ value: 'cover', label: __( 'Cover', 'pi-blocks' ) },
			{ value: 'contain', label: __( 'Contain', 'pi-blocks' ) },
		];

		let backgroundSizeHelp;

		if ( 'cover' === attributes.backgroundSize ) {
			backgroundSizeHelp = __(
				'Scales the image as large as possible without stretching the image. Cropped either vertically or horizontally so that no empty space remains.',
				'pi-blocks'
			);
		}
		if ( 'contain' === attributes.backgroundSize ) {
			backgroundSizeHelp = __(
				'Scales the image as large as possible without cropping or stretching the image.',
				'pi-blocks'
			);
		}
		if ( 'auto' === attributes.backgroundSize ) {
			backgroundSizeHelp = __(
				'Scales the background image in the corresponding direction such that its intrinsic proportions are maintained.',
				'pi-blocks'
			);
		}

		return (
			<Fragment>
				<PanelBody
					title={ __( 'Background Image', 'pi-blocks' ) }
					initialOpen={ false }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( img ) => {
								setAttributes( {
									backgroundImgURL: img.url,
								} );
							} }
							type="image"
							value={ attributes.backgroundImgURL }
							render={ ( { open } ) => (
								<div>
									<ButtonGroup className="pi-background-button-group">
										<Button
											className="pi-inspector-icon-button pi-background-add-button is-button is-default"
											label={ __(
												'Edit image',
												'pi-blocks'
											) }
											onClick={ open }
										>
											<Icon icon="format-image" />
											{ __(
												'Select Image',
												'pi-blocks'
											) }
										</Button>

										{ attributes.backgroundImgURL && (
											<Button
												className="pi-inspector-icon-button pi-background-remove-button is-button is-default"
												label={ __(
													'Remove Image',
													'pi-blocks'
												) }
												onClick={ () =>
													setAttributes( {
														backgroundImgURL: null,
													} )
												}
											>
												<Icon icon="dismiss" />
												{ __(
													'Remove',
													'pi-blocks'
												) }
											</Button>
										) }
									</ButtonGroup>
								</div>
							) }
						></MediaUpload>
					</MediaUploadCheck>

					{ attributes.backgroundImgURL && (
						<Fragment>
							<FocalPointPicker
								label={ __( 'Focal Point', 'pi-blocks' ) }
								url={ attributes.backgroundImgURL }
								value={ attributes.focalPoint }
								onChange={ ( value ) =>
									setAttributes( { focalPoint: value } )
								}
							/>

							<SelectControl
								className="pi-inspector-help-text"
								label={ __(
									'Image Display',
									'pi-blocks'
								) }
								value={ attributes.backgroundSize }
								help={ backgroundSizeHelp }
								options={ backgroundSizeOptions }
								onChange={ ( value ) =>
									this.props.setAttributes( {
										backgroundSize: value,
									} )
								}
							/>

							{ 'cover' !== attributes.backgroundSize && (
								<SelectControl
									label={ __(
										'Image Repeat',
										'pi-blocks'
									) }
									value={ attributes.backgroundRepeat }
									options={ backgroundRepeatOptions }
									onChange={ ( value ) =>
										this.props.setAttributes( {
											backgroundRepeat: value,
										} )
									}
								/>
							) }
						</Fragment>
					) }
				</PanelBody>
			</Fragment>
		);
	}
}

export default BackgroundImagePanel;
