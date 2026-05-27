/**
 * Internal dependencies
 */
import Inspector from "./inspector";
import BackgroundImageStyles from "../../../utils/components/background-image/styles";
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { compose } from "@wordpress/compose";
import { ToolbarGroup } from "@wordpress/components";
import {
	BlockControls,
	InnerBlocks,
	withColors,
	useBlockProps,
} from "@wordpress/block-editor";

const Edit = (props) => {
	const { attributes, setAttributes, className } = props;
	const {
		borderRadius,
		isBoxshadow,
		isBorder,
		borderColor,
		borderWidth,
		borderTop,
		borderRight,
		borderBottom,
		borderLeft,
		marginSync,
		columnVerticalAlignment,
		paddingUnit,
		margin,
		marginUnit,
		backgroundColor,
		marginTop,
		marginBottom,
		paddingSync,
		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,

		marginUnitTL,
		marginSyncTL,
		marginTopTL,
		marginBottomTL,
		marginTL,
		paddingTL,
		paddingUnitTL,
		paddingSyncTL,
		paddingTopTL,
		paddingLeftTL,
		paddingBottomTL,
		paddingRightTL,

		marginUnitMB,
		marginSyncMB,
		marginTopMB,
		marginBottomMB,
		marginMB,
		paddingMB,
		paddingUnitMB,
		paddingSyncMB,
		paddingTopMB,
		paddingLeftMB,
		paddingBottomMB,
		paddingRightMB,

		isBorderMB,
		borderHideMB,
		borderColorMB,
		borderWidthMB,
		borderTopMB,
		borderRightMB,
		borderBottomMB,
		borderLeftMB,
	} = attributes;

	/* Setup the borderRadius styles. */
	let borderRadiusStyle;

	if (borderRadius) {
		borderRadiusStyle = {
			borderRadius: 0 < borderRadius ? borderRadius : null,
		};
	}

	/* Setup the margin styles. */
	let marginStyle;

	if (marginSync) {
		marginStyle = {
			marginTop: 0 < margin ? margin + marginUnit : null,
			marginBottom: 0 < margin ? margin + marginUnit : null,
		};
	} else {
		marginStyle = {
			marginTop: 0 < marginTop ? marginTop + marginUnit : null,
			marginBottom: 0 < marginBottom ? marginBottom + marginUnit : null,
		};
	}

	/* Setup the margin styles for tablet. */
	let marginStyleTL;

	if (marginSyncTL) {
		marginStyleTL = {
			"--marginTopTL": 0 < marginTL ? marginTL + marginUnitTL : null,
			"--marginBottomTL": 0 < marginTL ? marginTL + marginUnitTL : null,
		};
	} else {
		marginStyleTL = {
			"--marginTopTL": 0 < marginTopTL ? marginTopTL + marginUnitTL : null,
			"--marginBottomTL":
				0 < marginBottomTL ? marginBottomTL + marginUnitTL : null,
		};
	}

	/* Setup the margin styles for mobile. */
	let marginStyleMB;

	if (marginSyncMB) {
		marginStyleMB = {
			"--marginTopMB": 0 < marginMB ? marginMB + marginUnitMB : null,
			"--marginBottomMB": 0 < marginMB ? marginMB + marginUnitMB : null,
		};
	} else {
		marginStyleMB = {
			"--marginTopMB": 0 < marginTopMB ? marginTopMB + marginUnitMB : null,
			"--marginBottomMB":
				0 < marginBottomMB ? marginBottomMB + marginUnitMB : null,
		};
	}

	/* Setup the padding styles. */
	let paddingStyle;

	if (paddingSync) {
		paddingStyle = {
			padding: 0 < padding ? padding + paddingUnit : null,
		};
	} else {
		paddingStyle = {
			paddingTop: 0 < paddingTop ? paddingTop + paddingUnit : null,
			paddingRight: 0 < paddingRight ? paddingRight + paddingUnit : null,
			paddingBottom: 0 < paddingBottom ? paddingBottom + paddingUnit : null,
			paddingLeft: 0 < paddingLeft ? paddingLeft + paddingUnit : null,
		};
	}

	/* Setup the padding styles for tablet. */
	let paddingStyleTL;

	if (paddingSyncTL) {
		paddingStyleTL = {
			"--paddingTL": 0 < paddingTL ? paddingTL + paddingUnitTL : null,
		};
	} else {
		paddingStyleTL = {
			"--paddingTopTL":
				0 < paddingTopTL ? paddingTopTL + paddingUnitTL : null,
			"--paddingRightTL":
				0 < paddingRightTL ? paddingRightTL + paddingUnitTL : null,
			"--paddingBottomTL":
				0 < paddingBottomTL ? paddingBottomTL + paddingUnitTL : null,
			"--paddingLeftTL":
				0 < paddingLeftTL ? paddingLeftTL + paddingUnitTL : null,
		};
	}

	/* Setup the padding styles for mobile. */
	let paddingStyleMB;

	if (paddingSyncMB) {
		paddingStyleMB = {
			"--paddingMB": 0 < paddingMB ? paddingMB + paddingUnitMB : null,
		};
	} else {
		paddingStyleMB = {
			"--paddingTopMB":
				0 < paddingTopMB ? paddingTopMB + paddingUnitMB : null,
			"--paddingRightMB":
				0 < paddingRightMB ? paddingRightMB + paddingUnitMB : null,
			"--paddingBottomMB":
				0 < paddingBottomMB ? paddingBottomMB + paddingUnitMB : null,
			"--paddingLeftMB":
				0 < paddingLeftMB ? paddingLeftMB + paddingUnitMB : null,
		};
	}

	/* Setup border styles. */
	let borderStyle = {};
	if (isBorder) {
		const bColor = borderColor || "#F2EEE7";
		const bWidth = (borderWidth || 1) + "px";
		const hasSpecificSides = borderTop || borderRight || borderBottom || borderLeft;
		if (!hasSpecificSides) {
			borderStyle = { border: `${bWidth} solid ${bColor}` };
		} else {
			if (borderTop) borderStyle.borderTop = `${bWidth} solid ${bColor}`;
			if (borderRight) borderStyle.borderRight = `${bWidth} solid ${bColor}`;
			if (borderBottom) borderStyle.borderBottom = `${bWidth} solid ${bColor}`;
			if (borderLeft) borderStyle.borderLeft = `${bWidth} solid ${bColor}`;
		}
	}

	/* Setup border styles for mobile. */
	let borderStyleMB = {};
	if (isBorderMB) {
		const bColor = borderColorMB || borderColor || "#F2EEE7";
		const bWidth = (borderWidthMB || 1) + "px";
		const bVal = `${bWidth} solid ${bColor}`;
		if (borderHideMB) {
			borderStyleMB = {
				"--borderTopMB": "none",
				"--borderRightMB": "none",
				"--borderBottomMB": "none",
				"--borderLeftMB": "none",
			};
		} else {
			const hasSpecificSidesMB = borderTopMB || borderRightMB || borderBottomMB || borderLeftMB;
			if (!hasSpecificSidesMB) {
				borderStyleMB = {
					"--borderTopMB": bVal,
					"--borderRightMB": bVal,
					"--borderBottomMB": bVal,
					"--borderLeftMB": bVal,
				};
			} else {
				borderStyleMB = {
					"--borderTopMB": borderTopMB ? bVal : "none",
					"--borderRightMB": borderRightMB ? bVal : "none",
					"--borderBottomMB": borderBottomMB ? bVal : "none",
					"--borderLeftMB": borderLeftMB ? bVal : "none",
				};
			}
		}
	}

	/* Misc styles. */
	const styles = {
		backgroundColor: backgroundColor,
		...BackgroundImageStyles(attributes),
	};

	const blockProps = useBlockProps({
		className: classnames(
			className,
			"pi-block-layout-column",
			isBorder ? "pi-has-border" : null,
			isBoxshadow ? "pi-has-boxshadow" : null,
			isBorderMB ? "pi-has-border-mb" : null,
			columnVerticalAlignment
				? "pi-is-vertically-aligned-" + columnVerticalAlignment
				: null
		),
		style: Object.assign(
			{},
			marginStyle,
			paddingStyle,
			borderRadiusStyle,
			borderStyle,
			marginStyleTL,
			marginStyleMB,
			paddingStyleMB,
			paddingStyleTL,
			borderStyleMB,
			styles
		),
	});

	const toolbarControls = [
		{
			icon: "arrow-up-alt2",
			title: __("Vertical Align Top", "pi-blocks"),
			isActive: "top" === columnVerticalAlignment,
			onClick: () => setAttributes({ columnVerticalAlignment: "top" }),
		},
		{
			icon: "minus",
			title: __("Vertical Align Middle", "pi-blocks"),
			isActive: "center" === columnVerticalAlignment,
			onClick: () => setAttributes({ columnVerticalAlignment: "center" }),
		},
		{
			icon: "arrow-down-alt2",
			title: __("Vertical Align Bottom", "pi-blocks"),
			isActive: "bottom" === columnVerticalAlignment,
			onClick: () => setAttributes({ columnVerticalAlignment: "bottom" }),
		},
	];

	return (
		<>
			<BlockControls key="controls">
				<ToolbarGroup controls={toolbarControls} />
			</BlockControls>
			<Inspector {...props} key="inspector" />

			<div key="column" {...blockProps}>
				<div className="pi-block-layout-column-inner">
					<InnerBlocks
						template={[["core/paragraph"]]}
						templateLock={false}
						templateInsertUpdatesSelection={false}
					/>
				</div>
			</div>
		</>
	);
};

export default compose([withColors("backgroundColor")])(Edit);
