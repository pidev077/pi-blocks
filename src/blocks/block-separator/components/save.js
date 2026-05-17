import { useBlockProps } from "@wordpress/block-editor";
import { renderIcon } from "./icons";

const Save = (props) => {
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

	const blockProps = useBlockProps.save({
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

	const iconWrapStyle = {
		color: colorBg,
		width: `${iconSize}px`,
		height: `${iconSize}px`,
		minWidth: `${iconSize}px`,
	};

	return (
		<div {...blockProps}>
			<div className="separator-inner" style={innerStyle}>
				{showIcon ? (
					<>
						<div className="separator-line" style={lineStyle}></div>
						<div className="separator-icon" style={iconWrapStyle}>
							{renderIcon(iconType, iconSize)}
						</div>
						<div className="separator-line" style={lineStyle}></div>
					</>
				) : (
					<div className="separators" style={lineStyle}></div>
				)}
			</div>
		</div>
	);
};

export default Save;
