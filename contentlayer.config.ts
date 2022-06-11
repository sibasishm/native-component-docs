import {
	ComputedFields,
	defineDocumentType,
	makeSource,
} from 'contentlayer/source-files';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import { getTableOfContents } from './src/utils/mdx-utils';
// import { rehypeMdxCodeMeta } from './src/utils/rehype-code-meta'

import { contentDirPath } from './src/contentlayer/utils';
import * as documentTypes from './src/contentlayer';

const computedFields: ComputedFields = {
	slug: {
		type: 'string',
		resolve: doc => `/${doc._raw.flattenedPath}`,
	},
};

const contentLayerConfig = makeSource({
	contentDirPath,
	documentTypes,
	mdx: {
		// rehypePlugins: [rehypeMdxCodeMeta],
		remarkPlugins: [remarkSlug, remarkGfm, remarkEmoji],
	},
});

export default contentLayerConfig;
