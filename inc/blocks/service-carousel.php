<?php
function pi_service_carousel_render($atts)
{
    $atts = shortcode_atts(
        [
            'parent_only'     => true,
            'posts_per_page'  => -1,
            'order'           => 'ASC',
            'orderBy'         => 'term_order',
            'anchor'          => '',
            'className'       => '',
            'slides_per_view' => 3,
        ],
        $atts
    );

    $parent = filter_var($atts['parent_only'], FILTER_VALIDATE_BOOLEAN) ? 0 : '';
    $number = intval($atts['posts_per_page']) > 0 ? intval($atts['posts_per_page']) : 0;

    $terms = get_terms([
        'taxonomy'   => 'service_category',
        'parent'     => $parent,
        'hide_empty' => false,
        'orderby'    => $atts['orderBy'],
        'order'      => strtoupper($atts['order']),
        'number'     => $number,
    ]);

    if (is_wp_error($terms) || empty($terms)) {
        return '<div class="block-service-carousel"><p>Không tìm thấy danh mục dịch vụ.</p></div>';
    }

    $items = [];
    foreach ($terms as $term) {
        $sg_posts = get_posts([
            'post_type'        => 'service_group',
            'post_status'      => 'publish',
            'numberposts'      => 1,
            'suppress_filters' => false,
            'meta_query'       => [[
                'key'     => 'sg_linked_category',
                'value'   => $term->term_id,
                'compare' => '=',
            ]],
        ]);
        $sg = !empty($sg_posts) ? $sg_posts[0] : null;

        $title = $sg ? get_the_title($sg->ID) : $term->name;
        $url   = $sg ? get_permalink($sg->ID) : get_term_link($term);

        $thumb = '';
        if ($sg) {
            $hero_img = get_field('service_hero_image', $sg->ID);
            if ($hero_img && is_array($hero_img)) {
                $thumb = $hero_img['sizes']['large'] ?? $hero_img['url'] ?? '';
            }
            if (!$thumb) {
                $thumb = get_the_post_thumbnail_url($sg->ID, 'large');
            }
        }

        $items[] = [
            'title' => $title,
            'url'   => $url,
            'thumb' => $thumb,
            'alt'   => $title,
        ];
    }

    do_action('wpml_register_single_string', 'pi-blocks', 'service_carousel_cta', 'Khám Phá Dịch Vụ');
    $cta_label = apply_filters('wpml_translate_single_string', 'Khám Phá Dịch Vụ', 'pi-blocks', 'service_carousel_cta');

    $total = count($items);

    $arrow_prev = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    $arrow_next = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    ob_start();
    $anchor_attr = $atts['anchor'] ? ' id="' . esc_attr($atts['anchor']) . '"' : '';
    $spv = max(1, intval($atts['slides_per_view']));
    ?>
    <div<?php echo $anchor_attr; ?> class="block-service-carousel <?php echo esc_attr($atts['className']); ?>" style="--spv:<?php echo $spv; ?>">

        <div class="service-carousel__swiper swiper" data-slides-per-view="<?php echo $spv; ?>">
            <div class="swiper-wrapper">
                <?php foreach ($items as $item): ?>
                <div class="swiper-slide">
                    <a href="<?php echo esc_url($item['url']); ?>" class="service-carousel__card">
                        <div class="service-carousel__image">
                            <?php if ($item['thumb']): ?>
                            <img src="<?php echo esc_url($item['thumb']); ?>"
                                 alt="<?php echo esc_attr($item['alt']); ?>"
                                 loading="lazy">
                            <?php else: ?>
                            <div class="service-carousel__placeholder"></div>
                            <?php endif; ?>
                        </div>
                        <div class="service-carousel__info">
                            <h3 class="service-carousel__title"><?php echo esc_html($item['title']); ?></h3>
                            <span class="service-carousel__link"><?php echo esc_html($cta_label); ?></span>
                        </div>
                    </a>
                </div>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="service-carousel__nav">
            <button class="service-carousel__btn service-carousel__btn--prev" aria-label="Trước">
                <?php echo $arrow_prev; ?>
            </button>
            <div class="service-carousel__counter">
                <span class="service-carousel__current">01</span>
                <span class="service-carousel__sep"> / </span>
                <span class="service-carousel__total"><?php echo str_pad($total, 2, '0', STR_PAD_LEFT); ?></span>
            </div>
            <button class="service-carousel__btn service-carousel__btn--next" aria-label="Tiếp">
                <?php echo $arrow_next; ?>
            </button>
        </div>

    </div>
    <?php
    return ob_get_clean();
}
