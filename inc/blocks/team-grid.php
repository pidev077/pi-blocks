<?php
function pi_team_grid_render($atts)
{
    ob_start(); // must be first — prevents any PHP notice from leaking into REST API JSON

    $atts = shortcode_atts([
        'posts_per_page' => 9,
        'order'          => 'asc',
        'orderBy'        => 'menu_order',
        'link_label'     => 'Xem Hồ Sơ',
        'anchor'         => '',
        'className'      => '',
    ], $atts);

    $query = [
        'post_type'      => 'teams',
        'post_status'    => 'publish',
        'posts_per_page' => (int) $atts['posts_per_page'],
        'order'          => $atts['order'],
        'orderby'        => $atts['orderBy'],
    ];

    $the_query  = new WP_Query($query);
    $link_label = !empty($atts['link_label']) ? $atts['link_label'] : 'Xem Hồ Sơ';

    do_action('wpml_register_single_string', 'pi-blocks', 'team_grid_link_label', $link_label);
    $link_label = apply_filters('wpml_translate_single_string', $link_label, 'pi-blocks', 'team_grid_link_label');

    ob_get_clean(); // discard anything that leaked before the template

    ob_start();
    $anchor_attr = $atts['anchor'] ? ' id="' . esc_attr($atts['anchor']) . '"' : '';
    ?>
    <div<?php echo $anchor_attr; ?> class="block-team-grid <?php echo esc_attr($atts['className']); ?>">
        <?php if ($the_query->have_posts()): ?>
            <div class="block-team-grid__list">
                <?php while ($the_query->have_posts()): $the_query->the_post();
                    $id       = get_the_ID();
                    $img_url  = get_the_post_thumbnail_url($id, 'team-thumb')
                        ?: get_the_post_thumbnail_url($id, 'large')
                        ?: 'https://placehold.co/400x500/EEEEEE/584E44?text=No+Image';
                    $position = get_field('team_position', $id);
                    $link     = get_permalink($id);
                ?>
                    <div class="team-grid-card">
                        <a href="<?php echo esc_url($link); ?>" class="team-grid-card__media">
                            <img src="<?php echo esc_url($img_url); ?>" alt="<?php echo esc_attr(get_the_title()); ?>" loading="lazy" />
                        </a>
                        <div class="team-grid-card__body">
                            <h3 class="team-grid-card__name"><?php the_title(); ?></h3>
                            <?php if ($position): ?>
                                <p class="team-grid-card__position"><?php echo esc_html($position); ?></p>
                            <?php endif; ?>
                            <a href="<?php echo esc_url($link); ?>" class="team-grid-card__link">
                                <?php echo esc_html($link_label); ?>
                            </a>
                        </div>
                    </div>
                <?php endwhile; wp_reset_postdata(); ?>
            </div>
        <?php else: ?>
            <p class="block-team-grid__empty"><?php _e('No team members found.', 'pi-blocks'); ?></p>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}
