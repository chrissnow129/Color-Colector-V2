import React, { useState, useEffect } from 'react';
// import Header from '../components/ColorHeader';
import { Link } from 'react-router-dom';

export default function SavedColors(props) {
	const [rgbSaved, setRgbSaved] = useState([]);

	useEffect(() => {
		// Immediately Invoked Function Expression
		(async () => {
			try {
				const response = await fetch('/api/colorcol');
				const data = await response.json();
				console.log(data);
				setRgbSaved(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<>
			{/* <Header /> */}
			<div className="grid gap-3 grid-cols-4 ml-16">
				{rgbSaved.map(rgbb => {
					return (
						<div>
							<div
								key={rgbb.hex}
								style={{
									backgroundColor: `rgba(${rgbb.r}, ${rgbb.g}, ${rgbb.b}, 0.3)`
								}}
								className="flex flex-col justify-center mt-10 w-56 h-72 rounded-xl shadow-md text-white"
							>
								<h1 className="text-center text-xl pt-2">{rgbb.name}</h1>
								<h2 className="text-center">
									RGB: {rgbb.r}, {rgbb.g}, {rgbb.b}
								</h2>
								<h2 className="text-center">HEX: {rgbb.hex}</h2>
								<img
									className="m-auto rounded-3xl hover:shadow-xl hover:transition duration-300 ease-in-out"
									src={rgbb.image}
								/>
								<Link to={`/${rgbb._id}`}>
									<button
										style={{
											backgroundColor: `rgba(${rgbb.r}, ${rgbb.g}, ${rgbb.b}, 0.2)`
										}}
										className="flex justify-center my-3 m-auto w-32 h-9 rounded-tl-2xl rounded-br-2xl text-white hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
									>
										See More
									</button>
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
