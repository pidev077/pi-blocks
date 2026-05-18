import { useBlockProps } from "@wordpress/block-editor";

const IconAddress = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M9 10.9997C9 11.7953 9.31607 12.5584 9.87868 13.121C10.4413 13.6836 11.2044 13.9997 12 13.9997C12.7956 13.9997 13.5587 13.6836 14.1213 13.121C14.6839 12.5584 15 11.7953 15 10.9997C15 10.204 14.6839 9.44098 14.1213 8.87837C13.5587 8.31576 12.7956 7.99969 12 7.99969C11.2044 7.99969 10.4413 8.31576 9.87868 8.87837C9.31607 9.44098 9 10.204 9 10.9997Z" stroke="#E0AC47" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.657 16.6567L13.414 20.8997C13.039 21.2743 12.5306 21.4848 12.0005 21.4848C11.4704 21.4848 10.962 21.2743 10.587 20.8997L6.343 16.6567C5.22422 15.5379 4.46234 14.1124 4.15369 12.5606C3.84504 11.0087 4.00349 9.40022 4.60901 7.93844C5.21452 6.47665 6.2399 5.22725 7.55548 4.34821C8.87107 3.46918 10.4178 3 12 3C13.5822 3 15.1289 3.46918 16.4445 4.34821C17.7601 5.22725 18.7855 6.47665 19.391 7.93844C19.9965 9.40022 20.155 11.0087 19.8463 12.5606C19.5377 14.1124 18.7758 15.5379 17.657 16.6567Z" stroke="#E0AC47" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

const IconPhone = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z" stroke="#E0AC47" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

const IconEmail = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7M3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7M3 7L12 13L21 7" stroke="#E0AC47" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

const IconHours = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M15 14L12 12V7M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" stroke="#E0AC47" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

export default function Save({ attributes }) {
	const { address, phone, email, hoursItems } = attributes;
	const blockProps = useBlockProps.save({ className: "block-contact-info" });

	return (
		<div {...blockProps}>
			{address && (
				<div className="ci-item">
					<span className="ci-icon" aria-hidden="true"><IconAddress /></span>
					<span className="ci-text">{address}</span>
				</div>
			)}
			{phone && (
				<div className="ci-item">
					<span className="ci-icon" aria-hidden="true"><IconPhone /></span>
					<a className="ci-text ci-link" href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
				</div>
			)}
			{email && (
				<div className="ci-item">
					<span className="ci-icon" aria-hidden="true"><IconEmail /></span>
					<a className="ci-text ci-link" href={`mailto:${email}`}>{email}</a>
				</div>
			)}
			{hoursItems && hoursItems.length > 0 && (
				<div className="ci-item ci-item--hours">
					<span className="ci-icon" aria-hidden="true"><IconHours /></span>
					<div className="ci-hours">
						{hoursItems.map((item, i) => (
							<div key={i} className="ci-hours__row">
								<span className="ci-hours__days">{item.days}</span>
								<span className="ci-hours__time">{item.time}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
