// eslint-disable-next-line @typescript-eslint/no-var-requires
import { withContentlayer } from 'next-contentlayer';

export default withContentlayer({
	experimental: {
		optimizeFonts: true,
		modern: true,
	},
	productionBrowserSourceMaps: true,
	reactStrictMode: true,
});
