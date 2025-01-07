import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Root from "../pages/Root";
import Favourite from "../pages/Favourite";
import PokemonDetails from "../pages/PokemonDetails";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/favourite", element: <Favourite /> },
            { path: "/pokemon/:name", element: <PokemonDetails /> }
		],
	},
]);
