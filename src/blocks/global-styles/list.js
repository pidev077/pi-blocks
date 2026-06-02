import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

// 1. Add custom attribute to core/list
function addListAttributes(settings, name) {
    if (name !== 'core/list') return settings;
    settings.attributes = Object.assign(settings.attributes, {
        itemGap: { type: 'number', default: 0 },
    });
    return settings;
}
addFilter('blocks.registerBlockType', 'pi-blocks/list-item-gap/attrs', addListAttributes);

// 2. Inject RangeControl into core/list InspectorControls
const withListGapControl = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/list') return <BlockEdit {...props} />;

        const { attributes, setAttributes } = props;
        const { itemGap } = attributes;

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title="Khoảng cách dòng" initialOpen={true}>
                        <RangeControl
                            label="Khoảng cách giữa các dòng (px)"
                            value={itemGap || 0}
                            onChange={(value) => setAttributes({ itemGap: value })}
                            min={0}
                            max={80}
                            step={2}
                            __nextHasNoMarginBottom
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withListGapControl');
addFilter('editor.BlockEdit', 'pi-blocks/list-item-gap/edit', withListGapControl);

// 3. Apply --pi-list-gap CSS var to editor block wrapper
const withListGapEditorStyle = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        if (props.name !== 'core/list') return <BlockListBlock {...props} />;

        const { itemGap } = props.attributes;
        if (!itemGap) return <BlockListBlock {...props} />;

        const wrapperProps = {
            ...(props.wrapperProps || {}),
            style: {
                ...((props.wrapperProps || {}).style || {}),
                '--pi-list-gap': itemGap + 'px',
            },
        };
        return <BlockListBlock {...props} wrapperProps={wrapperProps} />;
    };
}, 'withListGapEditorStyle');
addFilter('editor.BlockListBlock', 'pi-blocks/list-item-gap/wrapper', withListGapEditorStyle);

// 4. Save --pi-list-gap as inline style on the <ul>/<ol> element
function applyListGapToSave(extraProps, blockType, attributes) {
    if (blockType.name !== 'core/list') return extraProps;
    const { itemGap } = attributes;
    if (!itemGap) return extraProps;
    return {
        ...extraProps,
        style: {
            ...(extraProps.style || {}),
            '--pi-list-gap': itemGap + 'px',
        },
    };
}
addFilter('blocks.getSaveContent.extraProps', 'pi-blocks/list-item-gap/save', applyListGapToSave);
