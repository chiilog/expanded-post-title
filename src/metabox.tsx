import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { TextareaControl } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';

const Render = () => {
	const postType = useSelect( ( select ) => {
		// @ts-ignore
		return select( 'core/editor' ).getCurrentPostType();
	}, [] );
	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	return (
		<PluginDocumentSettingPanel
			name="expanded-post-title-post-meta-panel"
			title="Post Meta Panel"
		>
			<TextareaControl
				label="Post Meta"
				value={ meta?.expanded_post_title || '' }
				onChange={ ( value ) => {
					setMeta( { ...meta, expanded_post_title: value } );
				} }
			/>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin( 'expanded-post-title-post-meta', {
	render: Render,
	icon: () => null,
} );
