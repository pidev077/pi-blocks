<?php
function pi_business_hours_render( $atts ) {
	$atts = shortcode_atts( [
		'anchor'     => '',
		'className'  => '',
		'title'      => 'GIỜ LÀM VIỆC',
		'rows'       => [],
		'footerNote' => '',
	], $atts );

	$anchor_attr = $atts['anchor'] ? ' id="' . esc_attr( $atts['anchor'] ) . '"' : '';
	$classes     = implode( ' ', array_filter( [ 'block-business-hours', esc_attr( $atts['className'] ) ] ) );

	$rows = $atts['rows'];
	if ( is_string( $rows ) ) {
		$rows = json_decode( $rows, true ) ?: [];
	}
	if ( ! is_array( $rows ) ) {
		$rows = [];
	}

	ob_start();
	?>
	<div<?php echo $anchor_attr; ?> class="<?php echo esc_attr( $classes ); ?>">

		<?php if ( $atts['title'] ) : ?>
		<h2 class="bh-title"><?php echo esc_html( $atts['title'] ); ?></h2>
		<?php endif; ?>

		<div class="bh-card">
			<div class="bh-table">
				<?php foreach ( $rows as $row ) : ?>
				<div class="bh-row">
					<span class="bh-days"><?php echo esc_html( $row['days'] ?? '' ); ?></span>
					<span class="bh-time"><?php echo esc_html( $row['time'] ?? '' ); ?></span>
				</div>
				<?php endforeach; ?>
			</div>
			<?php if ( $atts['footerNote'] ) : ?>
			<p class="bh-note"><?php echo esc_html( $atts['footerNote'] ); ?></p>
			<?php endif; ?>
		</div>

	</div>
	<?php
	return ob_get_clean();
}
