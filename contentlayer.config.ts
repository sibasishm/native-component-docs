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

const computedFields: ComputedFields = {
	slug: {
		type: 'string',
		resolve: doc => `/${doc._raw.flattenedPath}`,
	},
};

const Doc = defineDocumentType(() => ({
	name: 'Doc',
	filePathPattern: '**/*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		package: { type: 'string' },
		description: { type: 'string', required: true },
		image: { type: 'string' },
		version: { type: 'string' },
		author: { type: 'string' },
	},
	computedFields: {
		...computedFields,
		frontMatter: {
			type: 'json',
			resolve: doc => ({
				title: doc.title,
				package: doc.package,
				description: doc.description,
				image: doc.image,
				version: doc.version,
				slug: `/${doc._raw.flattenedPath}`,
				headings: getTableOfContents(doc.body.raw),
			}),
		},
	},
}));

const contentLayerConfig = makeSource({
	contentDirPath: 'content',
	documentTypes: [Doc],
	mdx: {
		// rehypePlugins: [rehypeMdxCodeMeta],
		remarkPlugins: [remarkSlug, remarkGfm, remarkEmoji],
	},
});

export default contentLayerConfig;
