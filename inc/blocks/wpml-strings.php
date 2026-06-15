<?php
/**
 * WPML String Translation — pi-blocks/block-service-tabs
 *
 * On post save, scan every block-service-tabs instance and register each
 * individual translatable string (group labels, nav labels, titles, descs)
 * with WPML's String Translation so translators see clean fields — not raw JSON.
 *
 * String keys use the stable IDs stored inside the groups array (e.g. "g1", "i1"),
 * so keys survive block moves/reorders as long as the IDs don't change.
 *
 * Auto-loaded by inc/init.php (all files in inc/blocks/ are required automatically).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'save_post', 'pi_wpml_register_block_strings', 20 );

function pi_wpml_register_block_strings( $post_id ) {
	if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
		return;
	}

	$post = get_post( $post_id );
	if ( ! $post || ! has_blocks( $post->post_content ) ) {
		return;
	}

	_pi_wpml_scan_blocks( parse_blocks( $post->post_content ) );
}

function _pi_wpml_scan_blocks( array $blocks ) {
	foreach ( $blocks as $block ) {
		if ( 'pi-blocks/block-service-tabs' === $block['blockName'] ) {
			_pi_wpml_register_service_tabs_strings( $block['attrs'] ?? [] );
		}

		if ( ! empty( $block['innerBlocks'] ) ) {
			_pi_wpml_scan_blocks( $block['innerBlocks'] );
		}
	}
}

function _pi_wpml_register_service_tabs_strings( array $attrs ) {
	$groups = isset( $attrs['groups'] ) && is_array( $attrs['groups'] ) ? $attrs['groups'] : [];

	foreach ( $groups as $group ) {
		$gid   = sanitize_key( $group['id'] ?? '' );
		$label = trim( $group['label'] ?? '' );

		if ( $gid && $label !== '' ) {
			do_action( 'wpml_register_single_string', 'pi-blocks', "st-{$gid}-label", $label );
		}

		$items = isset( $group['items'] ) && is_array( $group['items'] ) ? $group['items'] : [];

		foreach ( $items as $item ) {
			$iid = sanitize_key( $item['id'] ?? '' );
			if ( ! $iid ) {
				continue;
			}

			if ( ! empty( $item['navLabel'] ) ) {
				do_action( 'wpml_register_single_string', 'pi-blocks', "st-{$iid}-navLabel", $item['navLabel'] );
			}
			if ( ! empty( $item['title'] ) ) {
				do_action( 'wpml_register_single_string', 'pi-blocks', "st-{$iid}-title", $item['title'] );
			}
			if ( ! empty( $item['desc'] ) ) {
				do_action( 'wpml_register_single_string', 'pi-blocks', "st-{$iid}-desc", $item['desc'] );
			}
		}
	}
}
