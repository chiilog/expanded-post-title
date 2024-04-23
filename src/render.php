<?php
/**
 * @var array $attributes The block attributes.
 * @var string $content The block content.
 * @var WP_Block $block The block object.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$tagName = $attributes['level'] === 0 ? 'p' : 'h' . $attributes['level'];

$classes = array();
if ( isset( $attributes['textAlign'] ) ) {
	$classes[] = 'has-text-align-' . $attributes['textAlign'];
}

// expanded_post_title が空だった場合は、通常のタイトルを表示する
$title = get_post_meta( $block->context['postId'], 'expanded_post_title', true );
if ( ! $title ) {
	$title = get_the_title( $block->context['postId'] );
}

?>
<<?php echo $tagName; ?> <?php echo get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) ); ?>>
	<?php echo wp_kses_post( $title ); ?>
</<?php echo $tagName; ?>>
