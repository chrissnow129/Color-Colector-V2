import SavedColors from '../pages/SavedColors';
import ColorScheme from '../pages/ColorScheme';
import ColorShow from '../pages/ColorShow';
import Home from '../pages/Home';

const routes = [
	{
		Component: SavedColors,
		key: 'Saved Colors',
		path: '/saved'
	},
	{
		Component: ColorScheme,
		key: 'Color Schemes',
		path: '/scheme'
	},
	{
		Component: ColorShow,
		key: 'ColorShow',
		path: '/:id'
	},
	{
		Component: Home,
		key: 'Home',
		path: '/'
	}
	
];

export default routes;
