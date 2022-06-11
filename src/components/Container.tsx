import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export const Container: FC<any> = ({ children, ...customMeta }) => {
	const router = useRouter();

	const baseUrl = `https://www.contentlayer.dev`;

	const meta = {
		title: 'Native Components',
		...customMeta,
	};

	// <script
	// 				dangerouslySetInnerHTML={{
	// 					__html: /* js */ `
	//               const savedTheme = localStorage.getItem('theme') ?? 'system'

	//               if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
	//                 document.documentElement.classList.add('dark')
	//               } else {
	//                 document.documentElement.classList.remove('dark')
	//               }
	//         `,
	// 				}}
	// 			/>

	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta name='robots' content='follow, index' />
				<meta content={meta.description} name='description' />
				<meta property='og:url' content={`${meta.url}${router.asPath}`} />
				<link rel='canonical' href={`${meta.url}${router.asPath}`} />
				<meta property='og:type' content={meta.type} />
				<meta property='og:site_name' content={meta.name} />
				<meta property='og:description' content={meta.description} />
				<meta property='og:title' content={meta.title} />
				<meta property='og:image' content={meta.image} />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content={meta.title} />
				<meta name='twitter:description' content={meta.description} />
				<meta name='twitter:image' content={meta.image} />
			</Head>
			<header className='fixed z-50 w-full border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur backdrop-filter dark:border-gray-800 dark:bg-gray-950'>
				<div className='flex justify-between align-center py-6 mx-auto max-w-screen-2xl'>
					<h1 className='text-xl text-blue-600 font-bold'>Native Components</h1>
					<nav>
						<ol className='flex justify-between align-center space-x-6'>
							<li>Docs</li>
							<li>Blog</li>
							<li>Tutorial</li>
						</ol>
					</nav>
				</div>
			</header>
			<div className='flex min-h-screen flex-col justify-between'>
				<main className='relative pt-16' style={{ scrollPaddingTop: '150px' }}>
					{children}
				</main>
			</div>
		</>
	);
};
