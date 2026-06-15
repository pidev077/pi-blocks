<?php
function pi_service_tabs_render( $atts ) {
	$groups    = isset( $atts['groups'] ) && is_array( $atts['groups'] ) ? $atts['groups'] : [];
	$anchor    = isset( $atts['anchor'] )    ? $atts['anchor']    : '';
	$className = isset( $atts['className'] ) ? $atts['className'] : '';

	if ( empty( $groups ) ) {
		return '<div class="block-service-tabs ' . esc_attr( $className ) . '"><p style="padding:24px;opacity:.5;">Chưa có nội dung — hãy thêm nhóm trong sidebar.</p></div>';
	}

	$uid         = wp_unique_id( 'st-' );
	$anchor_attr = $anchor ? ' id="' . esc_attr( $anchor ) . '"' : '';

	// Flatten all items to assign first-active
	$first = true;

	ob_start();
	?>
	<div<?php echo $anchor_attr; ?> class="block-service-tabs <?php echo esc_attr( $className ); ?>" data-uid="<?php echo esc_attr( $uid ); ?>">
		<div class="service-tabs__layout">

			<nav class="service-tabs__nav" role="tablist">
				<?php foreach ( $groups as $group ) :
					$gid   = sanitize_key( $group['id'] ?? '' );
					$label = isset( $group['label'] ) ? $group['label'] : '';
					$label = apply_filters( 'wpml_translate_single_string', $label, 'pi-blocks', "st-{$gid}-label" );
					$items = isset( $group['items'] ) && is_array( $group['items'] ) ? $group['items'] : [];
					if ( empty( $items ) ) continue;
				?>
				<div class="service-tabs__group">
					<?php if ( $label ) : ?>
					<span class="service-tabs__group-label"><?php echo esc_html( $label ); ?></span>
					<?php endif; ?>

					<?php foreach ( $items as $item ) :
						$iid      = sanitize_key( $item['id'] ?? '' );
						$item_id  = $uid . '-' . $iid;
						$nav      = isset( $item['navLabel'] ) ? $item['navLabel'] : '';
						$nav      = apply_filters( 'wpml_translate_single_string', $nav, 'pi-blocks', "st-{$iid}-navLabel" );
						$is_first = $first;
						$first    = false;
					?>
					<button type="button"
					        role="tab"
					        class="service-tabs__item<?php echo $is_first ? ' is-active' : ''; ?>"
					        data-tab="<?php echo esc_attr( $item_id ); ?>"
					        aria-controls="<?php echo esc_attr( $item_id ); ?>"
					        aria-selected="<?php echo $is_first ? 'true' : 'false'; ?>"
					><?php echo esc_html( $nav ); ?></button>
					<?php endforeach; ?>
				</div>
				<?php endforeach; ?>
			</nav>

			<div class="service-tabs__content">
				<?php
				$first = true;
				foreach ( $groups as $group ) :
					$items = isset( $group['items'] ) && is_array( $group['items'] ) ? $group['items'] : [];
					foreach ( $items as $item ) :
						$iid      = sanitize_key( $item['id'] ?? '' );
						$item_id  = $uid . '-' . $iid;
						$title    = isset( $item['title'] ) ? $item['title'] : '';
						$title    = apply_filters( 'wpml_translate_single_string', $title, 'pi-blocks', "st-{$iid}-title" );
						$desc     = isset( $item['desc'] )  ? $item['desc']  : '';
						$desc     = apply_filters( 'wpml_translate_single_string', $desc,  'pi-blocks', "st-{$iid}-desc" );
						$is_first = $first;
						$first    = false;
				?>
				<div class="service-tabs__panel<?php echo $is_first ? ' is-active' : ''; ?>"
				     id="<?php echo esc_attr( $item_id ); ?>"
				     role="tabpanel"
				     <?php echo ! $is_first ? 'hidden' : ''; ?>
				>
					<?php if ( $title ) : ?>
					<h2 class="service-tabs__panel-title"><?php echo esc_html( $title ); ?></h2>
					<?php endif; ?>
					<?php if ( $desc ) : ?>
					<p class="service-tabs__panel-desc"><?php echo esc_html( $desc ); ?></p>
					<?php endif; ?>
				</div>
				<?php
					endforeach;
				endforeach;
				?>
			</div>

		</div>
		<script>
		(function(){
			if ( ! document.currentScript ) return;
			var block  = document.currentScript.closest( '[data-uid="<?php echo esc_js( $uid ); ?>"]' );
			if ( ! block ) return;
			var btns   = block.querySelectorAll( '.service-tabs__item' );
			var panels = block.querySelectorAll( '.service-tabs__panel' );
			btns.forEach( function( btn ) {
				btn.addEventListener( 'click', function() {
					btns.forEach( function( b ) {
						b.classList.remove( 'is-active' );
						b.setAttribute( 'aria-selected', 'false' );
					} );
					panels.forEach( function( p ) {
						p.classList.remove( 'is-active' );
						p.hidden = true;
					} );
					btn.classList.add( 'is-active' );
					btn.setAttribute( 'aria-selected', 'true' );
					var target = block.querySelector( '#' + btn.dataset.tab );
					if ( target ) {
						target.classList.add( 'is-active' );
						target.hidden = false;
					}
				} );
			} );
		})();
		</script>
	</div>
	<?php
	return ob_get_clean();
}
