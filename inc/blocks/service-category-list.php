<?php
function pi_service_category_list_render( $atts ) {
	$atts = shortcode_atts( [
		'parent_only'      => true,
		'alternate_layout' => false,
		'order'            => 'ASC',
		'orderBy'          => 'term_order',
		'anchor'           => '',
		'className'        => '',
	], $atts );

	$parent = filter_var( $atts['parent_only'], FILTER_VALIDATE_BOOLEAN ) ? 0 : '';

	$terms = get_terms( [
		'taxonomy'   => 'service_category',
		'parent'     => $parent,
		'hide_empty' => false,
		'orderby'    => $atts['orderBy'],
		'order'      => strtoupper( $atts['order'] ),
	] );

	if ( is_wp_error( $terms ) || empty( $terms ) ) {
		return '<div class="block-service-category-list"><p>' . esc_html__('Không tìm thấy danh mục dịch vụ.', 'pi-blocks') . '</p></div>';
	}

	$alternate = filter_var( $atts['alternate_layout'], FILTER_VALIDATE_BOOLEAN );

	$arrow_svg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
		<line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
		<polyline points="9 5 19 5 19 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>';

	ob_start();
	$anchor_attr = $atts['anchor'] ? ' id="' . esc_attr( $atts['anchor'] ) . '"' : '';
	?>
	<div<?php echo $anchor_attr; ?> class="block-service-category-list <?php echo esc_attr( $atts['className'] ); ?>">
		<?php foreach ( $terms as $index => $term ) :

			// Find service_group linked to this term via ACF field sg_linked_category
			$sg_posts = get_posts( [
				'post_type'        => 'service_group',
				'post_status'      => 'publish',
				'numberposts'      => 1,
				'suppress_filters' => false,
				'meta_query'       => [ [
					'key'     => 'sg_linked_category',
					'value'   => $term->term_id,
					'compare' => '=',
				] ],
			] );

			$sg = ! empty( $sg_posts ) ? $sg_posts[0] : null;

			// Title & URL: prefer service_group, fallback to taxonomy term
			$title = $sg ? get_the_title( $sg->ID ) : $term->name;
			$url   = $sg ? get_permalink( $sg->ID ) : get_term_link( $term );
			$desc  = '';
			if ( $sg ) {
				$desc = get_field( 'service_hero_desc', $sg->ID );
				if ( ! $desc ) {
					$desc = get_the_excerpt( $sg->ID );
				}
			} elseif ( $term->description ) {
				$desc = $term->description;
			}

			// Image: prefer ACF service_hero_image, fallback to featured image
			$image_url = '';
			$image_alt = esc_attr( $title );
			if ( $sg ) {
				$hero_img = get_field( 'service_hero_image', $sg->ID );
				if ( $hero_img && is_array( $hero_img ) ) {
					$image_url = $hero_img['sizes']['large'] ?? $hero_img['url'] ?? '';
				}
				if ( ! $image_url ) {
					$image_url = get_the_post_thumbnail_url( $sg->ID, 'large' );
				}
			}

			// Child terms (sub-categories) as service list
			$children = get_terms( [
				'taxonomy'   => 'service_category',
				'parent'     => $term->term_id,
				'hide_empty' => false,
				'orderby'    => 'term_order',
				'order'      => 'ASC',
			] );
			$children = ! is_wp_error( $children ) ? $children : [];

			// If no children, fetch actual service posts under the term
			$list_items = [];
			if ( ! empty( $children ) ) {
				foreach ( $children as $child ) {
					$list_items[] = $child->name;
				}
			} else {
				$services = get_posts( [
					'post_type'        => 'service',
					'post_status'      => 'publish',
					'numberposts'      => 6,
					'suppress_filters' => false,
					'tax_query'        => [ [
						'taxonomy' => 'service_category',
						'field'    => 'term_id',
						'terms'    => $term->term_id,
					] ],
				] );
				foreach ( $services as $svc ) {
					$list_items[] = get_the_title( $svc->ID );
				}
			}

			$card_classes = 'service-category-card';
			if ( $alternate && $index % 2 !== 0 ) {
				$card_classes .= ' is-reversed';
			}
			?>
			<div class="<?php echo esc_attr( $card_classes ); ?>">
				<div class="service-category-card__inner">

					<div class="service-category-card__content">
						<h2 class="service-category-card__title"><?php echo esc_html( $title ); ?></h2>

						<?php if ( $desc ) : ?>
						<p class="service-category-card__desc"><?php echo esc_html( $desc ); ?></p>
						<?php endif; ?>

						<?php if ( ! empty( $list_items ) ) : ?>
						<div class="service-category-card__services">
							<span class="service-category-card__services-label"><?php esc_html_e('Dịch Vụ Bao Gồm', 'pi-blocks'); ?></span>
							<ul class="service-category-card__list">
								<?php foreach ( $list_items as $item ) : ?>
								<li><?php echo esc_html( $item ); ?></li>
								<?php endforeach; ?>
							</ul>
						</div>
						<?php endif; ?>

						<?php if ( $url ) :
							$cta_title = str_ireplace( [ 'Phẫu Thuật ', 'Điều Trị ' ], '', $title );
						?>
						<a href="<?php echo esc_url( $url ); ?>" class="service-category-card__cta">
							<?php printf( esc_html__('Xem %s', 'pi-blocks'), esc_html( $cta_title ) ); ?>
							<?php echo $arrow_svg; ?>
						</a>
						<?php endif; ?>
					</div>

					<div class="service-category-card__media">
						<div class="service-category-card__image-wrap">
							<?php if ( $image_url ) : ?>
							<img src="<?php echo esc_url( $image_url ); ?>"
							     alt="<?php echo $image_alt; ?>"
							     loading="lazy">
							<?php endif; ?>
						</div>
					</div>

				</div>
			</div>
		<?php endforeach; ?>
	</div>
	<?php
	return ob_get_clean();
}
