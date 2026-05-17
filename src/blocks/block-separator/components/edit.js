import { useBlockProps } from "@wordpress/block-editor";
import { Fragment } from "@wordpress/element";
import Inspector from "./inspector";
import { renderIcon } from "./icons";

const Edit = (props) => {
	const { attributes, className } = props;
	const {
		colorBg,
		fullwidth,
		alignBlock,
		widthSep,
		heightSep,
		showIcon,
		iconType,
		iconSize,
	} = attributes;

	const blockProps = useBlockProps({
		className: [
			"pi-separator-blocks",
			fullwidth ? "separator-fullwidth" : `separator-${alignBlock}`,
			className,
		]
			.filter(Boolean)
			.join(" "),
	});

	const innerStyle = {
		width: fullwidth ? "100%" : `${widthSep}%`,
	};

	const lineStyle = {
		background: colorBg,
		height: `${heightSep}px`,
	};

	return (
		<Fragment>
			<Inspector {...props} />
			<div {...blockProps}>
				<div className="separator-inner" style={innerStyle}>
					{showIcon ? (
						<>
							<div className="separator-line" style={lineStyle}></div>
							<div
								className="separator-icon"
								style={{ color: colorBg, width: iconSize, height: iconSize }}
							>
								{renderIcon(iconType, iconSize)}
							</div>
							<div className="separator-line" style={lineStyle}></div>
						</>
					) : (
						<div className="separators" style={lineStyle}></div>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
