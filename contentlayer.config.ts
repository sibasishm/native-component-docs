import { ComputedFields, makeSource } from 'contentlayer/source-files';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import highlight from 'rehype-highlight';

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
		rehypePlugins: [highlight],
		remarkPlugins: [remarkSlug, remarkGfm, remarkEmoji],
	},
});

export default contentLayerConfig;
