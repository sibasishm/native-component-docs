import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'src/context/themeProvider';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
export default MyApp;
