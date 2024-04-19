import { RichText, useBlockProps } from '@wordpress/block-editor';
import type {BlockEditProps} from "@wordpress/blocks";
import { useEntityProp } from '@wordpress/core-data';
import { useEffect } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

type BlockAttributes = {
	title: string;
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes: { title }, setAttributes, context: { postType, postId } }: BlockEditProps< BlockAttributes > ) {
	const blockProps = useBlockProps();
	const [ rawTitle = '' ] = useEntityProp(
		'postType',
		// @ts-ignore
		postType,
		'title',
		postId
	);
	useEffect(() => {
		if ( title === '' || title === rawTitle ) {
			setAttributes( {
				title: rawTitle,
			} );
		}
	}, [ rawTitle ] );

	return (
		<div { ...blockProps }>
			<RichText
				tagName="h1"
				value={ title }
				onChange={ ( value ) => {
					setAttributes( {
						title: value,
					} );
				} }
			/>
		</div>
	);
}
