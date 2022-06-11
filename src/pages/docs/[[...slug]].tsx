import type { FC } from 'react';
import type { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks';
import { allDocs } from 'contentlayer/generated';

import { Navigation } from 'src/components/Navigation';
import { Card } from 'src/components/Card';
import { Link } from 'src/components/Link';
import { Header } from 'src/components/Header';
import { Label } from 'src/components/Label';
import { PageNavigation } from 'src/components/PageNavigation';
import { H2, H3, H4 } from 'src/components/Headings';

import { buildDocsTree } from 'src/utils/build-docs-tree';
import { defineStaticProps, toParams } from 'src/utils/next';
import { PathSegment } from 'types/PathSegemnt';
import { Container } from 'src/components/Container';

export const getStaticPaths = async () => {
	const paths = allDocs
		.map(_ => _.pathSegments.map((_: PathSegment) => _.pathName).join('/'))
		.map(toParams);
	return { paths, fallback: false };
};

export const getStaticProps = defineStaticProps(async context => {
	const params = context.params as any;
	const pagePath = params.slug?.join('/') ?? '';
	const doc = allDocs.find(
		_ =>
			_.pathSegments.map((_: PathSegment) => _.pathName).join('/') === pagePath
	)!;
	let slugs = params.slug ? ['', ...params.slug] : [];
	let path = '';
	let breadcrumbs: any = [];
	for (const slug of slugs) {
		path += path == '' ? slug : '/' + slug;
		const navTitle = allDocs.find(
			_ => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path
		)?.nav_title;
		const title = allDocs.find(
			_ => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path
		)?.title;
		breadcrumbs.push({ path: '/docs/' + path, slug, title: navTitle || title });
	}
	const tree = buildDocsTree(allDocs);
	const childrenTree = buildDocsTree(
		allDocs,
		doc.pathSegments.map((_: PathSegment) => _.pathName)
	);

	return { props: { doc, tree, breadcrumbs, childrenTree } };
});

const mdxComponents = {
	Image,
	Link,
	Label,
	h2: H2,
	h3: H3,
	h4: H4,
	a: Link,
};

const Page: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
	doc,
	tree,
	breadcrumbs,
	childrenTree,
}) => {
	const router = useRouter();
	useLiveReload();
	const MDXContent = useMDXComponent(doc.body.code || '');

	return (
		<Container
			title={doc.title + ' - Native Components'}
			description={doc.excerpt}
		>
			<div className='relative mx-auto w-full max-w-screen-2xl lg:flex lg:items-start'>
				<div
					style={{ height: 'calc(100vh - 64px)' }}
					className='sticky top-16 hidden shrink-0 border-r border-gray-200 dark:border-gray-800 lg:block'
				>
					<div className='-ml-3 h-full overflow-y-scroll p-8 pl-16'>
						<Navigation tree={tree} />
					</div>
					<div className='absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100' />
					<div className='absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100' />
				</div>

				<div className='relative w-full grow'>
					<Header tree={tree} breadcrumbs={breadcrumbs} title={doc.title} />
					<div className='docs prose prose-slate prose-violet mx-auto mb-4 w-full max-w-3xl shrink p-4 pb-8 prose-headings:font-semibold prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-gray-200 dark:prose-invert dark:prose-a:text-violet-400 dark:prose-hr:border-gray-800 md:mb-8 md:px-8 lg:mx-0 lg:max-w-full lg:px-16'>
						{MDXContent && <MDXContent components={mdxComponents} />}
						{doc.show_child_cards && (
							<>
								<hr />
								<div className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-2'>
									{childrenTree.map((card, index) => (
										<div
											key={index}
											onClick={() => router.push(card.urlPath)}
											className='cursor-pointer'
										>
											<Card className='h-full p-6 py-4 hover:border-violet-100 hover:bg-violet-50 dark:hover:border-violet-900/50 dark:hover:bg-violet-900/20'>
												<h3 className='mt-0 no-underline'>{card.title}</h3>
												{card.label && <Label text={card.label} />}
												<div className='text-sm text-slate-500 dark:text-slate-400'>
													<p>{card.excerpt}</p>
												</div>
											</Card>
										</div>
									))}
								</div>
							</>
						)}
					</div>
				</div>
				<div
					style={{ maxHeight: 'calc(100vh - 128px)' }}
					className='sticky top-32 hidden w-80 shrink-0 overflow-y-scroll p-8 pr-16 1.5xl:block'
				>
					<PageNavigation headings={doc.headings} />
					<div className='absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100' />
					<div className='absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100' />
				</div>
			</div>
		</Container>
	);
};

export default Page;
