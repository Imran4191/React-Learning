import { Link, Outlet } from "react-router";
import Nav from "../components/Nav";

export default function Root() {
	return (
		<>
			<div id="navbar">
				<Nav />
			</div>
			<div id="detail">
				<Outlet />
			</div>
		</>
	);
}
