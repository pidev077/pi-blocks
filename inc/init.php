<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Adds the Pi Blocks block category.
 *
 * @param array $categories Array of categories for block types.
 * @return array Updated block categories.
 */
function pi_blocks_category($categories)
{
    return array_merge(
        array(
            array(
                'slug' => 'pi-blocks',
                'title' => "Pi's Blocks",
            ),
        ),
        $categories
    );
}

add_filter('block_categories_all', 'pi_blocks_category', 10, 2);


function pi_colour_palette_default()
{
    $colors = [
        'primary' => '#FFE071',
        'second' => '#FFF5D2',
        'third' => '#EFFFB3',
        'blue' => '#97ECFF',
        'brown' => '#120A00',
        'black' => '#000',
        'white' => '#FFF',
    ];

    add_theme_support('editor-color-palette', array_map(
        fn($slug, $color) => [
            'name' => ucfirst(str_replace('-', ' ', $slug)) . ' Colour',
            'slug' => $slug,
            'color' => $color
        ],
        array_keys($colors),
        $colors
    ));
}


add_action('after_setup_theme', 'pi_colour_palette_default');

function pi_require_render_block()
{
    foreach (glob(__DIR__ . '/blocks/*.php') as $file) {
        require $file;
    }
}
add_action('init', 'pi_require_render_block');

add_action('wp_footer', 'pi_team_popup_html');
function pi_team_popup_html()
{
    global $post;
    if (!has_block('pi-blocks/block-teams-list', $post)) {
        return;
    }
    ?>
    <div id="team-popup" class="team-popup hidden">
        <div class="team-popup-inner" data-lenis-prevent>
            <button class="team-popup__close pi-btn lg">Close</button>
            <div class="team-popup__content">
                <div class="team-popup__loading"></div>
                <div class="team-popup__body"></div>
            </div>
        </div>
    </div>
    <?php
}
