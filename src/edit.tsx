import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useBlockEditingMode,
	BlockControls,
	HeadingLevelDropdown,
	AlignmentControl,
} from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import { useEntityProp } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';

import './editor.scss';

type BlockAttributes = {
	title: string;
	level: number;
	userEdited: boolean;
	textAlign: string;
};

export default function Edit( {
	attributes: { title, level, userEdited, textAlign },
	setAttributes,
	context: { postType, postId },
}: BlockEditProps< BlockAttributes > ) {
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );
	const TagName = level === 0 ? 'p' : `h${ level }`;
	const blockEditingMode = useBlockEditingMode();

	const [ meta, setMeta ] = useEntityProp(
		'postType',
		// @ts-ignore
		postType,
		'meta',
		postId
	);

	const [ rawTitle = '' ] = useEntityProp(
		'postType',
		// @ts-ignore
		postType,
		'title',
		postId
	);
	useEffect( () => {
		/**
		 * ブロックを編集していない場合はtitleとカスタムフィールドに投稿タイトルを入れる
		 */
		if ( ! userEdited ) {
			setAttributes( {
				title: rawTitle,
			} );
			setMeta( {
				...meta,
				expanded_post_title: rawTitle,
			} );
		}
	}, [ rawTitle ] );

	/**
	 * titleとカスタムフィールドを入力値で更新する。
	 * 入力したというフラグをつける。
	 *
	 * @param value
	 */
	const updateTitle = ( value: string ) => {
		setAttributes( {
			title: value,
			userEdited: true,
		} );
		setMeta( {
			...meta,
			expanded_post_title: value,
		} );
	};

	return (
		<>
			{ blockEditingMode === 'default' && (
				<BlockControls group="block">
					<HeadingLevelDropdown
						value={ level }
						onChange={ ( newLevel: number ) =>
							setAttributes( { level: newLevel } )
						}
					/>
					<AlignmentControl
						value={ textAlign }
						onChange={ ( newAlign: string ) => {
							setAttributes( { textAlign: newAlign } );
						} }
					/>
				</BlockControls>
			) }
			<TagName { ...blockProps }>
				<RichText
					value={ title }
					onChange={ ( value ) => {
						updateTitle( value );
					} }
				/>
			</TagName>
		</>
	);
}
