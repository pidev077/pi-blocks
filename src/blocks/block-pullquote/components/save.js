import { useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { quote, author, accentColor, markSize, textSize, layout } = attributes;
	const blockProps = useBlockProps.save({ className: `block-pullquote block-pullquote--${layout}` });

	const blockStyle = {
		"--pq-color": accentColor,
		"--pq-mark-size": `${markSize}rem`,
		"--pq-text-size": `${textSize}px`,
		...(layout === "classic" && { borderLeftColor: accentColor }),
	};

	return (
		<blockquote {...blockProps} style={blockStyle}>
			<span className="block-pullquote__mark" aria-hidden="true">&ldquo;</span>
			<div className="block-pullquote__body">
				<p className="block-pullquote__text">{quote}</p>
				{author && <cite className="block-pullquote__author">– {author}</cite>}
			</div>
		</blockquote>
	);
};

export default Save;
