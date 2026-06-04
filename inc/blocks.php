<?php
if (!function_exists('pi_init_register_block')) {
	function pi_init_register_block()
	{

		register_block_type('pi-blocks/featured-case-studies', array(
			'render_callback' => 'featured_case_studies_render',
			'attributes' => array(
				'items' => array(
					'type' => 'array',
					'default' => [],
				),
				'className' => array(
					'type' => 'string',
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				)
			),
		));

		register_block_type('pi-blocks/block-filter-case-studies', array(
			'render_callback' => 'filter_case_studies_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => 8,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'className' => array(
					'type' => 'string',
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				)
			),
		));

		register_block_type('pi-blocks/block-sectors-list', array(
			'render_callback' => 'pi_sectors_list_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => -1,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'className' => array(
					'type' => 'string',
				),
				'link' => array(
					'type' => 'object',
				),
				'showProject' => array(
					'type' => 'boolean',
					'default' => true,
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				)
			),
		));

		register_block_type('pi-blocks/block-related-list', array(
			'render_callback' => 'pi_related_list_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => 3,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'taxonomy' => array(
					'type' => 'string',
					'default' => 'case-study-sectors',
				),

				'termId' => array(
					'type' => 'number',
					'default' => 0,
				),
				'showTaxonomyButtons' => array(
					'type' => 'boolean',
					'default' => true,
				),
			),
		));


		register_block_type('pi-blocks/block-solutions-scroll', array(
			'render_callback' => 'pi_solutions_scroll_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => 9,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'className' => array(
					'type' => 'string',
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				)
			),
		));

		register_block_type('pi-blocks/block-teams-list', array(
			'render_callback' => 'pi_teams_list_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => 6,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'className' => array(
					'type' => 'string',
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				)
			),
		));


		register_block_type('pi-blocks/client-block', array(
			'render_callback' => 'pi_client_block',
			'attributes' => array(
				'className' => array(
					'type' => 'string',
					'default' => '',
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				),
			),
		));


		register_block_type('pi-blocks/block-service-category-list', array(
			'render_callback' => 'pi_service_category_list_render',
			'attributes' => array(
				'parent_only' => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'alternate_layout' => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'order' => array(
					'type'    => 'string',
					'default' => 'asc',
				),
				'orderBy' => array(
					'type'    => 'string',
					'default' => 'term_order',
				),
				'className' => array(
					'type'    => 'string',
					'default' => '',
				),
				'anchor' => array(
					'type'    => 'string',
					'default' => '',
				),
			),
		));

		register_block_type('pi-blocks/block-service-list', array(
			'render_callback' => 'pi_service_list_render',
			'attributes' => array(
				'parent_only' => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'posts_per_page' => array(
					'type'    => 'number',
					'default' => -1,
				),
				'order' => array(
					'type'    => 'string',
					'default' => 'asc',
				),
				'orderBy' => array(
					'type'    => 'string',
					'default' => 'term_order',
				),
				'className' => array(
					'type'    => 'string',
					'default' => '',
				),
				'anchor' => array(
					'type'    => 'string',
					'default' => '',
				),
			),
		));

		register_block_type('pi-blocks/block-insights', array(
			'render_callback' => 'block_insights_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => 9,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'className' => array(
					'type' => 'string',
				),
				'anchor' => array(
					'type' => 'string',
				)
			),
		));

		register_block_type('pi-blocks/block-post-carousel', array(
			'render_callback' => 'block_post_carousel_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type' => 'number',
					'default' => 6,
				),
				'order' => array(
					'type' => 'string',
					'default' => 'desc',
				),
				'orderBy' => array(
					'type' => 'string',
					'default' => 'date',
				),
				'cat' => array(
					'type' => 'number',
					'default' => 0,
				),
				'showExcerpt' => array(
					'type' => 'boolean',
					'default' => true,
				),
				'showMeta' => array(
					'type' => 'boolean',
					'default' => true,
				),
				'className' => array(
					'type' => 'string',
					'default' => '',
				),
				'anchor' => array(
					'type' => 'string',
					'default' => '',
				),
			),
		));
		register_block_type( 'pi-blocks/info-box', [
			'render_callback' => 'pi_info_box_render',
			'attributes'      => [
				'anchor'      => [ 'type' => 'string',  'default' => '' ],
				'className'   => [ 'type' => 'string',  'default' => '' ],
				'phone'       => [ 'type' => 'string',  'default' => '+84 38 766 7031' ],
				'phoneHours'  => [ 'type' => 'string',  'default' => '(Thứ Hai - Thứ Sáu: 9:00 - 18:30)' ],
				'phoneIcon'   => [ 'type' => 'string',  'default' => '' ],
				'email'       => [ 'type' => 'string',  'default' => 'info@ddclinic-vn.com' ],
				'emailIcon'   => [ 'type' => 'string',  'default' => '' ],
				'zaloName'    => [ 'type' => 'string',  'default' => 'DD CLINIC Vietnam' ],
				'zaloSub'     => [ 'type' => 'string',  'default' => '(Nhắn tin trực tiếp qua Zalo)' ],
				'zaloUrl'     => [ 'type' => 'string',  'default' => '' ],
				'zaloIcon'    => [ 'type' => 'string',  'default' => '' ],
				'address'     => [ 'type' => 'string',  'default' => '31 Đường Số 1, Phường An Khánh, Thành phố Hồ Chí Minh, Việt Nam' ],
				'addressIcon' => [ 'type' => 'string',  'default' => '' ],
				'iconWidth'   => [ 'type' => 'number',  'default' => 24 ],
			],
		] );

		register_block_type( 'pi-blocks/business-hours', [
			'render_callback' => 'pi_business_hours_render',
			'attributes'      => [
				'anchor'     => [ 'type' => 'string', 'default' => '' ],
				'className'  => [ 'type' => 'string', 'default' => '' ],
				'title'      => [ 'type' => 'string', 'default' => 'GIỜ LÀM VIỆC' ],
				'rows'       => [
					'type'    => 'array',
					'default' => [
						[ 'days' => 'Thứ Hai - Thứ Sáu', 'time' => '9:00 - 18:30' ],
						[ 'days' => 'Thứ Bảy',            'time' => '9:00 - 16:00' ],
						[ 'days' => 'Chủ Nhật',           'time' => 'Chỉ nhận hẹn trước' ],
					],
					'items'   => [ 'type' => 'object' ],
				],
				'footerNote' => [ 'type' => 'string', 'default' => '*Ngoài giờ làm việc, vui lòng để lại tin nhắn. Chúng tôi sẽ phản hồi sớm nhất có thể.' ],
			],
		] );

		register_block_type('pi-blocks/block-service-carousel', array(
			'render_callback' => 'pi_service_carousel_render',
			'attributes' => array(
				'parent_only' => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'posts_per_page' => array(
					'type'    => 'number',
					'default' => -1,
				),
				'order' => array(
					'type'    => 'string',
					'default' => 'asc',
				),
				'orderBy' => array(
					'type'    => 'string',
					'default' => 'term_order',
				),
				'slides_per_view' => array(
					'type'    => 'number',
					'default' => 3,
				),
				'className' => array(
					'type'    => 'string',
					'default' => '',
				),
				'anchor' => array(
					'type'    => 'string',
					'default' => '',
				),
			),
		));

		register_block_type('pi-blocks/block-team-grid', array(
			'render_callback' => 'pi_team_grid_render',
			'attributes' => array(
				'posts_per_page' => array(
					'type'    => 'number',
					'default' => 9,
				),
				'order' => array(
					'type'    => 'string',
					'default' => 'asc',
				),
				'orderBy' => array(
					'type'    => 'string',
					'default' => 'menu_order',
				),
				'link_label' => array(
					'type'    => 'string',
					'default' => 'Xem Hồ Sơ',
				),
				'className' => array(
					'type'    => 'string',
					'default' => '',
				),
				'anchor' => array(
					'type'    => 'string',
					'default' => '',
				),
			),
		));

		register_block_type( 'pi-blocks/block-method-compare', [
			'render_callback' => 'pi_method_compare_render',
			'attributes'      => [
				'anchor'       => [ 'type' => 'string', 'default' => '' ],
				'className'    => [ 'type' => 'string', 'default' => '' ],
				'sectionLabel' => [ 'type' => 'string', 'default' => 'SO SÁNH PHƯƠNG PHÁP' ],
				'heading'      => [ 'type' => 'string', 'default' => '' ],
				'columns'      => [ 'type' => 'array',  'default' => [], 'items' => [ 'type' => 'object' ] ],
				'criteria'     => [ 'type' => 'array',  'default' => [], 'items' => [ 'type' => 'object' ] ],
			],
		] );

		register_block_type('pi-blocks/block-technology', array(
			'attributes' => array(
				'items' => array(
					'type'    => 'array',
					'default' => [],
					'items'   => array('type' => 'object'),
				),
				'slides_per_view' => array(
					'type'    => 'number',
					'default' => 3,
				),
				'anchor' => array(
					'type'    => 'string',
					'default' => '',
				),
				'className' => array(
					'type'    => 'string',
					'default' => '',
				),
			),
		));

	}
}

add_action('init', 'pi_init_register_block');