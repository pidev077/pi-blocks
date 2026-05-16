/**
 * Inspector Controls.
 */

/**
 * External dependencies.
 */
import map from 'lodash/map';
import columnLayouts from './column-layouts';
import Margin from '../../../utils/components/margin';
import Padding from '../../../utils/components/padding';
import BackgroundImagePanel from '../../../utils/components/background-image/inspector';
import RenderSettingControl from '../../../utils/components/settings/renderSettingControl';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const {
	PanelBody,
	RangeControl,
	ButtonGroup,
	Button,
	Tooltip,
	ToggleControl,
	SelectControl,
} = wp.components;

const Inspector = ( { attributes, setAttributes } ) => {
	const {
		columns,
		layout,
		columnsGap,
		rowGap,
		columnMaxWidth,
		responsiveToggle,
		reverseOnMB,
		marginUnit,
		marginSync,
		marginTop,
		marginBottom,
		margin,
		paddingUnit,
		paddingSync,
		paddingTop,
		paddingBottom,
		padding,
		backgroundColor,
	} = attributes; // Destructuring attributes

	let selectedRows = 1;

	if ( columns ) {
		selectedRows = parseInt( columns.toString().split( '-' ) );
	}

	// CSS Units options
	const cssUnits = [
		{ value: 'px', label: __( 'Pixel (px)', 'pi-blocks' ) },
		{ value: '%', label: __( 'Percent (%)', 'pi-blocks' ) },
		{ value: 'em', label: __( 'Em (em)', 'pi-blocks' ) },
	];

	return (
		<InspectorControls key="inspector">
			{ layout && (
				<PanelBody
					title={ __( 'General', 'pi-blocks' ) }
					initialOpen={ true }
					className="pi-column-select-panel"
				>
					<RenderSettingControl id="gb_column_columns">
						<RangeControl
							label={ __( 'Column Count', 'pi-blocks' ) }
							help={ __(
								"Note: Changing the column count after you've added content to the column can cause loss of content.",
								'pi-blocks'
							) }
							value={ columns }
							onChange={ ( value ) =>
								setAttributes( {
									columns: value,
									layout: 'pi-' + value + '-col-equal',
								} )
							}
							__nextHasNoMarginBottom
							min={ 1 }
							max={ 6 }
							step={ 1 }
						/>
					</RenderSettingControl>

					<hr />

					{ ( 2 === columns || 3 === columns || 4 === columns ) && (
						<Fragment>
							<RenderSettingControl id="gb_column_columnLayouts">
								<p>{ __( 'Column Layout', 'pi-blocks' ) }</p>
								<ButtonGroup
									aria-label={ __(
										'Column Layout',
										'pi-blocks'
									) }
								>
									{ map(
										columnLayouts[ selectedRows ],
										( { name, key, icon } ) => (
											<Tooltip text={ name } key={ key }>
												<Button
													key={ key }
													className="pi-column-selector-button"
													isSmall
													onClick={ () => {
														setAttributes( {
															layout: key,
														} );
													} }
												>
													{ icon }
												</Button>
											</Tooltip>
										)
									) }
								</ButtonGroup>
								<p>
									<i>
										{ __(
											'Change the layout of your columns.',
											'pi-blocks'
										) }
									</i>
								</p>
								<hr />
							</RenderSettingControl>
						</Fragment>
					) }

					<RenderSettingControl id="gb_column_columnsGap">
						<RangeControl
							label={ __( 'Column Gap (px)', 'pi-blocks' ) }
							help={ __(
								'Adjust the spacing between columns.',
								'pi-blocks'
							) }
							value={ columnsGap }
							onChange={ ( value ) =>
								setAttributes( { columnsGap: value } )
							}
							__nextHasNoMarginBottom
							min={ 0 }
							max={ 200 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Row Gap (px)', 'pi-blocks' ) }
							help={ __(
								'Adjust the spacing between rows.',
								'pi-blocks'
							) }
							value={ rowGap }
							onChange={ ( value ) =>
								setAttributes( { rowGap: value } )
							}
							__nextHasNoMarginBottom
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
					</RenderSettingControl>

					<hr />

					<RenderSettingControl id="gb_column_columnMaxWidth">
						<RangeControl
							label={ __( 'Column Inner Max Width (px)' ) }
							help={ __(
								'Adjust the width of the content inside the container wrapper.',
								'pi-blocks'
							) }
							value={ columnMaxWidth }
							onChange={ ( value ) =>
								setAttributes( { columnMaxWidth: value } )
							}
							__nextHasNoMarginBottom
							min={ 0 }
							max={ 2000 }
							step={ 1 }
						/>
					</RenderSettingControl>

					<hr />

					<RenderSettingControl id="gb_column_responsiveToggle">
						<ToggleControl
							label={ __( 'Responsive Columns', 'pi-blocks' ) }
							help={ __(
								'Columns will be adjusted to fit on tablets and mobile devices.',
								'pi-blocks'
							) }
							checked={ responsiveToggle }
							onChange={ () =>
								setAttributes( {
									responsiveToggle: ! responsiveToggle,
								} )
							}
						/>

						<hr />
						<ToggleControl
							label={ __(
								'Reverse columns Mobile',
								'pi-blocks'
							) }
							help={ __(
								'Reverse the order of columns on mobile devices.',
								'pi-blocks'
							) }
							checked={ reverseOnMB }
							onChange={ () =>
								setAttributes( {
									reverseOnMB: ! reverseOnMB,
								} )
							}
						/>
					</RenderSettingControl>
				</PanelBody>
			) }

			<RenderSettingControl id="gb_column_marginPadding">
				<PanelBody
					title={ __( 'Margin and Padding', 'pi-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Margin Unit', 'pi-blocks' ) }
						help={ __(
							'Choose between pixel, percent, or em units.',
							'pi-blocks'
						) }
						options={ cssUnits }
						value={ marginUnit }
						onChange={ ( value ) =>
							setAttributes( { marginUnit: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Sync Margin', 'pi-blocks' ) }
						help={ __(
							'Top and bottom margins will have the same value.',
							'pi-blocks'
						) }
						checked={ marginSync }
						onChange={ () =>
							setAttributes( {
								marginSync: ! marginSync,
							} )
						}
					/>

					{ ! marginSync ? (
						<Margin
							marginEnableTop={ true }
							marginTop={ marginTop }
							marginTopMin="0"
							marginTopMax="200"
							onChangeMarginTop={ ( marginTop ) =>
								setAttributes( { marginTop } )
							}
							marginEnableBottom={ true }
							marginBottom={ marginBottom }
							marginBottomMin="0"
							marginBottomMax="200"
							onChangeMarginBottom={ ( marginBottom ) =>
								setAttributes( { marginBottom } )
							}
						/>
					) : (
						<Margin
							marginEnableVertical={ true }
							marginVerticalLabel={ __(
								'Margin Top/Bottom',
								'pi-blocks'
							) }
							marginVertical={ margin }
							marginVerticalMin="0"
							marginVerticalMax="200"
							onChangeMarginVertical={ ( margin ) =>
								setAttributes( { margin } )
							}
						/>
					) }
					<hr />
					<SelectControl
						label={ __( 'Padding Unit', 'pi-blocks' ) }
						help={ __(
							'Choose between pixel, percent, or em units.',
							'pi-blocks'
						) }
						options={ cssUnits }
						value={ paddingUnit }
						onChange={ ( value ) =>
							setAttributes( { paddingUnit: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Sync Padding', 'pi-blocks' ) }
						help={ __(
							'Padding on all sides will have the same value.',
							'pi-blocks'
						) }
						checked={ paddingSync }
						onChange={ () =>
							setAttributes( {
								paddingSync: ! paddingSync,
							} )
						}
					/>
					{ ! paddingSync ? (
						<Padding
							paddingEnableTop={ true }
							paddingTop={ paddingTop }
							paddingTopMin="0"
							paddingTopMax="200"
							onChangePaddingTop={ ( paddingTop ) =>
								setAttributes( { paddingTop } )
							}
							paddingEnableBottom={ true }
							paddingBottom={ paddingBottom }
							paddingBottomMin="0"
							paddingBottomMax="200"
							onChangePaddingBottom={ ( paddingBottom ) =>
								setAttributes( { paddingBottom } )
							}
						/>
					) : (
						<Padding
							paddingEnableVertical={ true }
							paddingVerticalLabel={ __(
								'Padding Top/Bottom',
								'pi-blocks'
							) }
							padding={ padding }
							paddingMin="0"
							paddingMax="200"
							onChangePaddingVertical={ ( padding ) =>
								setAttributes( { padding } )
							}
						/>
					) }
				</PanelBody>
			</RenderSettingControl>

			<BackgroundImagePanel
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<PanelColorSettings
				title={ __( 'Background Color', 'pi-blocks' ) }
				colorSettings={ [
					{
						value: backgroundColor,
						onChange: ( backgroundColor ) =>
							setAttributes( { backgroundColor } ),
						label: __( 'Choose color', 'pi-blocks' ),
					},
				] }
			/>
		</InspectorControls>
	);
};

export default Inspector;
