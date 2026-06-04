<?php
if ( ! function_exists( 'pi_method_compare_render' ) ) {
	function pi_method_compare_render( $atts ) {
		$atts = shortcode_atts( [
			'anchor'       => '',
			'className'    => '',
			'sectionLabel' => 'SO SÁNH PHƯƠNG PHÁP',
			'heading'      => '',
			'columns'      => [],
			'criteria'     => [],
		], $atts );

		$columns  = is_array( $atts['columns'] )  ? $atts['columns']  : [];
		$criteria = is_array( $atts['criteria'] ) ? $atts['criteria'] : [];

		if ( empty( $columns ) ) {
			return '';
		}

		$id_attr = $atts['anchor'] ? ' id="' . esc_attr( $atts['anchor'] ) . '"' : '';
		$class   = trim( 'block-method-compare ' . esc_attr( $atts['className'] ) );

		ob_start();
		?>
		<section<?php echo $id_attr; ?> class="<?php echo $class; ?>">

			<?php if ( $atts['sectionLabel'] || $atts['heading'] ) : ?>
			<div class="mc-intro">
				<?php if ( $atts['sectionLabel'] ) : ?>
					<span class="mc-intro__label"><?php echo esc_html( $atts['sectionLabel'] ); ?></span>
					<span class="mc-intro__deco" aria-hidden="true">✦</span>
				<?php endif; ?>
				<?php if ( $atts['heading'] ) : ?>
					<h2 class="mc-intro__heading"><?php echo esc_html( $atts['heading'] ); ?></h2>
				<?php endif; ?>
			</div>
			<?php endif; ?>

			<div class="mc-table-wrap">
				<table class="mc-table">
					<thead>
						<tr>
							<th class="mc-table__th-empty" scope="col"></th>
							<?php foreach ( $columns as $col ) : ?>
							<th class="mc-table__col-header" scope="col">
								<div class="mc-table__col-tag">
									<span class="mc-table__col-label"><?php echo esc_html( $col['label'] ?? '' ); ?></span>
									<svg class="mc-table__col-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
										<path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</div>
							</th>
							<?php endforeach; ?>
						</tr>
					</thead>
					<tbody>
						<?php
						$has_images = ! empty( array_filter( array_column( $columns, 'imageUrl' ) ) ) ||
						              ! empty( array_filter( array_column( $columns, 'imageId' ) ) );
						if ( $has_images ) :
						?>
						<tr class="mc-table__image-row">
							<td></td>
							<?php foreach ( $columns as $col ) : ?>
							<td class="mc-table__image-cell">
								<?php
								$img_id  = intval( $col['imageId'] ?? 0 );
								$img_url = $col['imageUrl'] ?? '';
								$img_alt = esc_attr( $col['imageAlt'] ?? $col['label'] ?? '' );
								if ( $img_id > 0 ) {
									echo wp_get_attachment_image( $img_id, 'medium', false, [ 'alt' => $img_alt ] );
								} elseif ( $img_url ) {
									echo '<img src="' . esc_url( $img_url ) . '" alt="' . $img_alt . '">';
								}
								?>
							</td>
							<?php endforeach; ?>
						</tr>
						<?php endif; ?>

						<?php foreach ( $criteria as $row ) : ?>
						<tr class="mc-table__data-row">
							<td class="mc-table__row-label"><?php echo esc_html( $row['label'] ?? '' ); ?></td>
							<?php foreach ( $columns as $vi => $col ) : ?>
							<td class="mc-table__cell"><?php echo esc_html( $row['values'][ $vi ] ?? '' ); ?></td>
							<?php endforeach; ?>
						</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</div>

		</section>
		<?php
		return ob_get_clean();
	}
}
