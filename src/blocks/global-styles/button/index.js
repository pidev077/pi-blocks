const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { PanelColorSettings, InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { PanelBody, Button, ToggleControl } = wp.components;
const { Fragment, useEffect } = wp.element;
const { createHigherOrderComponent } = wp.compose;

import './style.scss';
import './editor.scss';

// Add custom attributes
const addCustomAttributes = (settings) => {
    if (settings.name !== 'core/button') {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            hoverColor: {
                type: 'string',
                default: '',
            },
            hoverBgColor: {
                type: 'string',
                default: '',
            },
            piShowIcon: {
                type: 'boolean',
                default: false,
            },
            piIconUrl: {
                type: 'string',
                default: '',
            },
            piIconSize: {
                type: 'number',
                default: 20,
            },
        },
    };
};

addFilter('blocks.registerBlockType', 'custom/custom-button-attributes', addCustomAttributes);

// Add Inspector Controls HOC
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/button') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes, clientId } = props;
        const { hoverColor, hoverBgColor, piShowIcon, piIconUrl, piIconSize } = attributes;

        useEffect(() => {
            const blockEl = document.querySelector(`[data-block="${clientId}"]`);
            if (!blockEl) return;

            blockEl.style.setProperty('--hover-color', hoverColor || '');
            blockEl.style.setProperty('--hover-bg-color', hoverBgColor || '');

            if (piShowIcon && piIconUrl) {
                blockEl.style.setProperty('--pi-icon-url', `url(${piIconUrl})`);
                blockEl.style.setProperty('--pi-icon-size', `${piIconSize || 20}px`);
                blockEl.classList.add('has-pi-icon');
            } else {
                blockEl.style.removeProperty('--pi-icon-url');
                blockEl.style.removeProperty('--pi-icon-size');
                blockEl.classList.remove('has-pi-icon');
            }
        }, [hoverColor, hoverBgColor, piShowIcon, piIconUrl, piIconSize, clientId]);

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls group="styles">
                    <PanelColorSettings
                        title={__('Hover Color Settings', 'pi-blocks')}
                        initialOpen={false}
                        colorSettings={[
                            {
                                value: hoverColor,
                                onChange: (color) => setAttributes({ hoverColor: color }),
                                label: __('Hover Color', 'pi-blocks'),
                            },
                            {
                                value: hoverBgColor,
                                onChange: (color) => setAttributes({ hoverBgColor: color }),
                                label: __('Hover Background Color', 'pi-blocks'),
                            },
                        ]}
                    />
                </InspectorControls>
                <InspectorControls>
                    <PanelBody title={__('Button Icon', 'pi-blocks')} initialOpen={false}>
                        <ToggleControl
                            label={__('Show icon after text', 'pi-blocks')}
                            checked={!!piShowIcon}
                            onChange={(val) => setAttributes({ piShowIcon: val })}
                        />
                        {piShowIcon && (
                            <>
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => setAttributes({ piIconUrl: media.url })}
                                        allowedTypes={['image']}
                                        value={piIconUrl}
                                        render={({ open }) => (
                                            <div style={{ marginBottom: '8px' }}>
                                                {piIconUrl && (
                                                    <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <img src={piIconUrl} alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                                                        <Button
                                                            variant="link"
                                                            isDestructive
                                                            onClick={() => setAttributes({ piIconUrl: '' })}
                                                        >
                                                            {__('Remove', 'pi-blocks')}
                                                        </Button>
                                                    </div>
                                                )}
                                                <Button variant="secondary" onClick={open} style={{ width: '100%' }}>
                                                    {piIconUrl ? __('Change Icon', 'pi-blocks') : __('Upload Icon', 'pi-blocks')}
                                                </Button>
                                            </div>
                                        )}
                                    />
                                </MediaUploadCheck>
                                <div style={{ marginTop: '12px' }}>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' }}>
                                        {__('Icon Size (px)', 'pi-blocks')}
                                    </label>
                                    <input
                                        type="number"
                                        min="12"
                                        max="48"
                                        value={piIconSize || 20}
                                        onChange={(e) => setAttributes({ piIconSize: parseInt(e.target.value, 10) || 20 })}
                                        style={{ width: '80px' }}
                                    />
                                </div>
                            </>
                        )}
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withInspectorControls');

addFilter('editor.BlockEdit', 'custom/custom-button-inspector', withInspectorControls);

// Apply icon class and CSS vars to saved HTML
const applyExtraClass = (extraProps, blockType, attributes) => {
    if (blockType.name !== 'core/button') {
        return extraProps;
    }

    const { hoverColor, hoverBgColor, piShowIcon, piIconUrl, piIconSize } = attributes;

    if (hoverColor) {
        extraProps.style = { ...extraProps.style, '--hover-color': hoverColor };
    }

    if (hoverBgColor) {
        extraProps.style = { ...extraProps.style, '--hover-bg-color': hoverBgColor };
    }

    if (piShowIcon && piIconUrl) {
        extraProps.className = [extraProps.className, 'has-pi-icon'].filter(Boolean).join(' ');
        extraProps.style = {
            ...extraProps.style,
            '--pi-icon-url': `url(${piIconUrl})`,
            '--pi-icon-size': `${piIconSize || 20}px`,
        };
    }

    return extraProps;
};

addFilter('blocks.getSaveContent.extraProps', 'custom/applyCustomButtonClass', applyExtraClass);
