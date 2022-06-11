import {
	FC,
	useEffect,
	createContext,
	useState,
	useContext,
	useMemo,
	useCallback,
} from 'react';
import { ColorScheme } from 'src/utils/syntax-highlighting';

const ThemeContext = createContext<'light' | 'dark' | 'system'>('system');
const UpdateThemeContext = createContext<
	(Theme: 'light' | 'dark' | 'system') => void
>(() => {});

export const useTheme = () => useContext(ThemeContext);
export const useUpdateTheme = () => useContext(UpdateThemeContext);

export const ThemeProvider: FC<React.PropsWithChildren<{}>> = ({
	children,
}) => {
	const initalTheme = useMemo(
		() =>
			typeof window !== 'undefined'
				? (localStorage.getItem('theme') as ColorScheme | null) ?? 'system'
				: 'system',
		[]
	);
	const [Theme, setTheme] = useState<'light' | 'dark' | 'system'>(initalTheme);

	const updateTheme = useCallback(
		(newTheme: 'light' | 'dark' | 'system') => {
			if (newTheme === Theme) return;

			setTheme(newTheme);

			if (newTheme === 'system') {
				if (
					window.matchMedia &&
					window.matchMedia('(prefers-color-scheme: dark)').matches
				) {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
				localStorage.removeItem('theme');
			} else {
				if (newTheme === 'dark') {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
				localStorage.theme = newTheme;
			}
		},
		[Theme]
	);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		if (Theme === 'system') {
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.addEventListener('change', () => updateTheme('system'));
		}
	}, [Theme, updateTheme]);

	return (
		<ThemeContext.Provider value={Theme}>
			<UpdateThemeContext.Provider value={updateTheme}>
				{children}
			</UpdateThemeContext.Provider>
		</ThemeContext.Provider>
	);
};
