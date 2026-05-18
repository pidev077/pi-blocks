<?php

function block_post_carousel_enqueue_swiper()
{
	if (!wp_script_is('swiper-js', 'registered')) {
		wp_register_script('swiper-js', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', [], '11', true);
		wp_register_style('swiper-css', 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', [], '11');
	}
	wp_enqueue_script('swiper-js');
	wp_enqueue_style('swiper-css');
}

function block_post_carousel_render($atts, $content)
{
	block_post_carousel_enqueue_swiper();

	$attrs = shortcode_atts([
		'order'         => 'desc',
		'orderBy'       => 'date',
		'posts_per_page' => 6,
		'cat'           => 0,
		'showExcerpt'   => true,
		'showMeta'      => true,
		'className'     => '',
		'anchor'        => '',
	], $atts);

	$query_args = [
		'post_type'      => 'post',
		'post_status'    => 'publish',
		'order'          => $attrs['order'],
		'orderby'        => $attrs['orderBy'],
		'posts_per_page' => (int) $attrs['posts_per_page'],
	];

	if (!empty($attrs['cat']) && (int) $attrs['cat'] > 0) {
		$query_args['cat'] = (int) $attrs['cat'];
	}

	$the_query = new WP_Query($query_args);

	if (!$the_query->have_posts()) {
		return '<div class="block-post-carousel"><p>No posts found.</p></div>';
	}

	$uid         = 'bpc-' . uniqid();
	$anchor_attr = !empty($attrs['anchor']) ? ' id="' . esc_attr($attrs['anchor']) . '"' : '';
	$classes     = implode(' ', array_filter(['block-post-carousel', esc_attr($attrs['className'])]));

	ob_start();
	?>
	<div<?= $anchor_attr ?> class="<?= $classes ?>">
		<div class="block-post-carousel__nav">
			<button class="block-post-carousel__btn <?= esc_attr($uid) ?>-prev" aria-label="Previous">
				<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
			<button class="block-post-carousel__btn <?= esc_attr($uid) ?>-next" aria-label="Next">
				<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
		</div>

		<div class="swiper <?= esc_attr($uid) ?>">
			<div class="swiper-wrapper">
				<?php while ($the_query->have_posts()) : $the_query->the_post(); ?>
					<?php post_carousel_card($attrs); ?>
				<?php endwhile; ?>
			</div>
		</div>
	</div>

	<script>
	(function() {
		function initPostCarousel() {
			if (typeof Swiper === 'undefined') return;
			new Swiper('.<?= esc_js($uid) ?>', {
				slidesPerView: 1.15,
				spaceBetween: 20,
				navigation: {
					prevEl: '.<?= esc_js($uid) ?>-prev',
					nextEl: '.<?= esc_js($uid) ?>-next',
				},
				breakpoints: {
					768: {
						slidesPerView: 2,
						spaceBetween: 24,
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 32,
					},
				},
			});
		}

		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', initPostCarousel);
		} else {
			initPostCarousel();
		}
	})();
	</script>
	<?php
	wp_reset_postdata();
	return ob_get_clean();
}

function post_carousel_card($attrs)
{
	$post_id      = get_the_ID();
	$permalink    = get_the_permalink();
	$title        = get_the_title();
	$img_url      = get_the_post_thumbnail_url($post_id, 'large');
	$cats         = get_the_category($post_id);
	$show_excerpt = !empty($attrs['showExcerpt']);
	$show_meta    = !empty($attrs['showMeta']);

	if (!$img_url) {
		$img_url = 'https://placehold.co/800x450/E8F9FF/120A00?text=No+Image';
	}

	$focal_point = get_post_meta($post_id, 'featured_image_focal_point', true);
	$focal_x     = isset($focal_point['x']) ? $focal_point['x'] * 100 : 50;
	$focal_y     = isset($focal_point['y']) ? $focal_point['y'] * 100 : 50;
	?>
	<div class="swiper-slide">
		<article class="post-carousel-card">
			<a class="post-carousel-card__img" href="<?= esc_url($permalink) ?>">
				<img
					src="<?= esc_url($img_url) ?>"
					alt="<?= esc_attr($title) ?>"
					loading="lazy"
					style="object-position: <?= (int)$focal_x ?>% <?= (int)$focal_y ?>%;"
				/>
			</a>

			<?php if ($cats) : ?>
				<div class="post-carousel-card__cats">
					<?php foreach (array_slice($cats, 0, 3) as $cat) : ?>
						<a
							class="post-carousel-card__cat"
							href="<?= esc_url(get_category_link($cat->term_id)) ?>"
						><?= esc_html($cat->name) ?></a>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>

			<div class="post-carousel-card__content">
				<h3 class="post-carousel-card__title">
					<a href="<?= esc_url($permalink) ?>"><?= esc_html($title) ?></a>
				</h3>

				<?php if ($show_excerpt) : ?>
					<p class="post-carousel-card__excerpt"><?= esc_html(get_the_excerpt()) ?></p>
				<?php endif; ?>

				<?php if ($show_meta) : ?>
					<div class="post-carousel-card__meta">
						<span class="post-carousel-card__author">
							<?= esc_html__('Bởi', 'pi-blocks') ?>
							<a href="<?= esc_url(get_author_posts_url(get_the_author_meta('ID'))) ?>">
								<?= esc_html(get_the_author()) ?>
							</a>
						</span>
						<span class="post-carousel-card__sep">•</span>
						<span class="post-carousel-card__date">
							<?= esc_html(get_the_date()) ?>
						</span>
					</div>
				<?php endif; ?>
			</div>
		</article>
	</div>
	<?php
}
