<?php
function pi_service_list_render($atts)
{
    $atts = shortcode_atts(
        [
            'parent_only'    => true,
            'posts_per_page' => -1,
            'order'          => 'ASC',
            'orderBy'        => 'term_order',
            'anchor'         => '',
            'className'      => '',
        ],
        $atts
    );

    do_action('wpml_register_single_string', 'pi-blocks', 'service_list_cta',      'Tìm Hiểu Thêm');
    do_action('wpml_register_single_string', 'pi-blocks', 'service_list_no_posts', 'No services found.');
    $cta_label     = apply_filters('wpml_translate_single_string', 'Tìm Hiểu Thêm',    'pi-blocks', 'service_list_cta');
    $no_posts_text = apply_filters('wpml_translate_single_string', 'No services found.', 'pi-blocks', 'service_list_no_posts');

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
        return '<div class="block-service-list"><p>' . esc_html($no_posts_text) . '</p></div>';
    }

    $items = [];
    foreach ($terms as $index => $term) {
        // Find service_group linked to this term via ACF sg_linked_category
        $sg_posts = get_posts([
            'post_type'   => 'service_group',
            'post_status' => 'publish',
            'numberposts' => 1,
            'meta_query'  => [[
                'key'     => 'sg_linked_category',
                'value'   => $term->term_id,
                'compare' => '=',
            ]],
        ]);
        $sg = !empty($sg_posts) ? $sg_posts[0] : null;

        // Title & URL: prefer service_group, fallback to taxonomy term
        $title = $sg ? get_the_title($sg->ID) : $term->name;
        $url   = $sg ? get_permalink($sg->ID) : get_term_link($term);

        // Desc: prefer ACF service_hero_desc, then excerpt, then term description
        $excerpt = '';
        if ($sg) {
            $excerpt = get_field('service_hero_desc', $sg->ID);
            if (!$excerpt) {
                $excerpt = get_the_excerpt($sg->ID);
            }
        } elseif ($term->description) {
            $excerpt = $term->description;
        }

        // Image: prefer ACF service_hero_image, fallback to featured image
        $thumb = '';
        $alt   = esc_attr($title);
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
            'index'   => $index,
            'title'   => $title,
            'url'     => $url,
            'excerpt' => $excerpt,
            'thumb'   => $thumb,
            'alt'     => $alt,
        ];
    }

    $arrow_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M15.1429 6C15.1429 6.6095 15.745 7.51964 16.3545 8.28357C17.1381 9.26929 18.0745 10.1293 19.1481 10.7856C19.9531 11.2777 20.929 11.75 21.7143 11.75M21.7143 11.75C20.929 11.75 19.9523 12.2223 19.1481 12.7144C18.0745 13.3715 17.1381 14.2315 16.3545 15.2156C15.745 15.9804 15.1429 16.8921 15.1429 17.5M21.7143 11.75H2" stroke="currentColor" stroke-width="1.5"/>
    </svg>';

    ob_start();
    $anchor_attr = $atts['anchor'] ? ' id="' . esc_attr($atts['anchor']) . '"' : '';
    ?>
    <div<?php echo $anchor_attr; ?> class="block-service-list <?php echo esc_attr($atts['className']); ?>">
        <div class="service-list__inner">

            <div class="service-list__left">
                <?php foreach ($items as $item): ?>
                <div class="service-item <?php echo $item['index'] === 0 ? 'is-active' : ''; ?>"
                     data-index="<?php echo $item['index']; ?>"
                     data-href="<?php echo esc_url($item['url']); ?>"
                     role="button"
                     tabindex="0"
                     aria-label="<?php echo esc_attr($item['title']); ?>">
                    <div class="service-item__inner">
                        <div class="service-item__content">
                            <h3 class="service-item__title"><?php echo esc_html($item['title']); ?></h3>
                            <?php if ($item['excerpt']): ?>
                            <p class="service-item__excerpt"><?php echo esc_html($item['excerpt']); ?></p>
                            <?php endif; ?>
                        </div>
                        <span class="service-item__arrow"><?php echo $arrow_svg; ?></span>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>

            <div class="service-list__right">
                <?php foreach ($items as $item): ?>
                <div class="service-preview <?php echo $item['index'] === 0 ? 'is-active' : ''; ?>"
                     data-index="<?php echo $item['index']; ?>">

                    <?php if ($item['excerpt']): ?>
                    <div class="service-preview__card">
                        <p><?php echo esc_html($item['excerpt']); ?></p>
                        <a href="<?php echo esc_url($item['url']); ?>" class="service-preview__link">
                            <?php echo esc_html($cta_label); ?>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <polyline points="9 5 19 5 19 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                    </div>
                    <?php endif; ?>

                    <?php if ($item['thumb']): ?>
                    <div class="service-preview__image">
                        <img src="<?php echo esc_url($item['thumb']); ?>"
                             alt="<?php echo esc_attr($item['alt']); ?>"
                             loading="lazy">
                    </div>
                    <?php endif; ?>

                </div>
                <?php endforeach; ?>
            </div>

        </div>
    </div>
    <?php
    return ob_get_clean();
}
