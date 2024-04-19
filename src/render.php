<?php
/**
 * @var array $attributes The block attributes.
 * @var string $content The block content.
 * @var WP_Block $block The block object.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$tagName = $attributes['level'] === 0 ? 'p' : 'h' . $attributes['level'];

var_dump($attributes);
$classes = array();
if ( isset( $attributes['textAlign'] ) ) {
	$classes[] = 'has-text-align-' . $attributes['textAlign'];
}
?>
<<?php echo $tagName; ?> <?php echo get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) ); ?>>
	<?php echo wp_kses_post( $attributes['title'] ); ?>
</<?php echo $tagName; ?>>
