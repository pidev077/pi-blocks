<?php
function pi_info_box_render( $atts ) {
	$atts = shortcode_atts( [
		'anchor'      => '',
		'className'   => '',
		'phone'       => '',
		'phoneHours'  => '',
		'phoneIcon'   => '',
		'email'       => '',
		'emailIcon'   => '',
		'zaloName'    => '',
		'zaloSub'     => '',
		'zaloUrl'     => '',
		'zaloIcon'    => '',
		'address'     => '',
		'addressIcon' => '',
		'iconWidth'   => 24,
	], $atts );

	$anchor_attr = $atts['anchor'] ? ' id="' . esc_attr( $atts['anchor'] ) . '"' : '';
	$classes     = implode( ' ', array_filter( [ 'block-info-box', esc_attr( $atts['className'] ) ] ) );
	$icon_px     = max( 16, (int) $atts['iconWidth'] );
	$icon_style  = "width:{$icon_px}px;height:{$icon_px}px;";

	$svg_phone = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z" stroke="#E0AC47" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
	$svg_email = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7M3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7M3 7L12 13L21 7" stroke="#E0AC47" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
	$svg_zalo  = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#0068FF"/><path d="M6 8.5h10l-9.5 7h10" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
	$svg_pin   = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M9 10.9997C9 11.7953 9.31607 12.5584 9.87868 13.121C10.4413 13.6836 11.2044 13.9997 12 13.9997C12.7956 13.9997 13.5587 13.6836 14.1213 13.121C14.6839 12.5584 15 11.7953 15 10.9997C15 10.204 14.6839 9.44098 14.1213 8.87837C13.5587 8.31576 12.7956 7.99969 12 7.99969C11.2044 7.99969 10.4413 8.31576 9.87868 8.87837C9.31607 9.44098 9 10.204 9 10.9997Z" stroke="#E0AC47" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.657 16.6567L13.414 20.8997C13.039 21.2743 12.5306 21.4848 12.0005 21.4848C11.4704 21.4848 10.962 21.2743 10.587 20.8997L6.343 16.6567C5.22422 15.5379 4.46234 14.1124 4.15369 12.5606C3.84504 11.0087 4.00349 9.40022 4.60901 7.93844C5.21452 6.47665 6.2399 5.22725 7.55548 4.34821C8.87107 3.46918 10.4178 3 12 3C13.5822 3 15.1289 3.46918 16.4445 4.34821C17.7601 5.22725 18.7855 6.47665 19.391 7.93844C19.9965 9.40022 20.155 11.0087 19.8463 12.5606C19.5377 14.1124 18.7758 15.5379 17.657 16.6567Z" stroke="#E0AC47" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

	$render_icon = function ( $url, $fallback ) use ( $icon_style ) {
		if ( $url ) {
			return '<img src="' . esc_url( $url ) . '" alt="" style="' . esc_attr( $icon_style ) . 'object-fit:contain;" loading="lazy">';
		}
		return $fallback;
	};

	ob_start();
	?>
	<div<?php echo $anchor_attr; ?> class="<?php echo esc_attr( $classes ); ?>">

		<?php if ( $atts['phone'] ) : ?>
		<div class="ib-item">
			<span class="ib-icon" aria-hidden="true" style="<?php echo esc_attr( $icon_style ); ?>">
				<?php echo $render_icon( $atts['phoneIcon'], $svg_phone ); ?>
			</span>
			<div class="ib-body">
				<span class="ib-label"><?php echo esc_html__( 'HOT LINE', 'pi-blocks' ); ?></span>
				<a class="ib-value" href="tel:<?php echo esc_attr( str_replace( ' ', '', $atts['phone'] ) ); ?>">
					<?php echo esc_html( $atts['phone'] ); ?>
				</a>
				<?php if ( $atts['phoneHours'] ) : ?>
				<span class="ib-sub"><?php echo esc_html( $atts['phoneHours'] ); ?></span>
				<?php endif; ?>
			</div>
		</div>
		<?php endif; ?>

		<?php if ( $atts['email'] ) : ?>
		<div class="ib-item">
			<span class="ib-icon" aria-hidden="true" style="<?php echo esc_attr( $icon_style ); ?>">
				<?php echo $render_icon( $atts['emailIcon'], $svg_email ); ?>
			</span>
			<div class="ib-body">
				<span class="ib-label"><?php echo esc_html__( 'EMAIL', 'pi-blocks' ); ?></span>
				<a class="ib-value" href="mailto:<?php echo esc_attr( $atts['email'] ); ?>">
					<?php echo esc_html( $atts['email'] ); ?>
				</a>
			</div>
		</div>
		<?php endif; ?>

		<?php if ( $atts['zaloName'] ) : ?>
		<div class="ib-item">
			<span class="ib-icon" aria-hidden="true" style="<?php echo esc_attr( $icon_style ); ?>">
				<?php echo $render_icon( $atts['zaloIcon'], $svg_zalo ); ?>
			</span>
			<div class="ib-body">
				<span class="ib-label"><?php echo esc_html__( 'ZALO PAGE', 'pi-blocks' ); ?></span>
				<?php if ( $atts['zaloUrl'] ) : ?>
				<a class="ib-value" href="<?php echo esc_url( $atts['zaloUrl'] ); ?>" target="_blank" rel="noopener noreferrer">
					<?php echo esc_html( $atts['zaloName'] ); ?>
				</a>
				<?php else : ?>
				<span class="ib-value"><?php echo esc_html( $atts['zaloName'] ); ?></span>
				<?php endif; ?>
				<?php if ( $atts['zaloSub'] ) : ?>
				<span class="ib-sub"><?php echo esc_html( $atts['zaloSub'] ); ?></span>
				<?php endif; ?>
			</div>
		</div>
		<?php endif; ?>

		<?php if ( $atts['address'] ) : ?>
		<div class="ib-item">
			<span class="ib-icon" aria-hidden="true" style="<?php echo esc_attr( $icon_style ); ?>">
				<?php echo $render_icon( $atts['addressIcon'], $svg_pin ); ?>
			</span>
			<div class="ib-body">
				<span class="ib-label"><?php echo esc_html__( 'ĐỊA CHỈ VĂN PHÒNG', 'pi-blocks' ); ?></span>
				<span class="ib-value"><?php echo esc_html( $atts['address'] ); ?></span>
			</div>
		</div>
		<?php endif; ?>

	</div>
	<?php
	return ob_get_clean();
}
