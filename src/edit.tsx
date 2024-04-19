import { RichText, useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from "@wordpress/blocks";
import { useEntityProp } from '@wordpress/core-data';
import { useEffect } from "@wordpress/element";

import './editor.scss';

type BlockAttributes = {
	title: string;
	userEdited: boolean;
}

export default function Edit( { attributes: { title, userEdited }, setAttributes, context: { postType, postId } }: BlockEditProps< BlockAttributes > ) {
	const blockProps = useBlockProps();
	const [ rawTitle = '' ] = useEntityProp(
		'postType',
		// @ts-ignore
		postType,
		'title',
		postId
	);
	useEffect(() => {
		if ( ! userEdited ) {
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
						userEdited: true
					} );
				} }
			/>
		</div>
	);
}
