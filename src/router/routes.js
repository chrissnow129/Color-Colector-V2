import SavedColors from '../pages/SavedColors';
import ColorShow from '../pages/ColorShow';
import Home from '../pages/Home';

const routes = [
	{
		Component: SavedColors,
		key: 'Saved Colors',
		path: '/saved'
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
