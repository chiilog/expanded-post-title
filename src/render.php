<?php
/**
 * @var array $attributes The block attributes.
 * @var string $content The block content.
 * @var WP_Block $block The block object.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<h1><?php echo wp_kses_post( $attributes['title'] ); ?></h1>
</div>
