import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Header from '../components/ColorHeader';

export default function ColorShow(props) {
	const [colorSh, setColorSh] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/colors/${props.match.params.id}`);
				const data = await response.json();
				console.log(data);
				setColorSh([data]);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleDelete = async evt => {
		try {
			const response = await fetch(`/api/colors/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{/* <Header /> */}
			{colorSh.map(color => {
				return (
					<div
						style={{
							backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`
						}}
						className="flex flex-col justify-center m-auto mt-10 w-1/4 h-64 rounded-xl shadow-md text-white"
					>
						<h1 className="text-center text-xl pt-2 text-white">
							Name: {color.name}
						</h1>
						<h3 className="text-center text-md text-white">
							HEX Value: {color.hex}
						</h3>
						<h3 className="text-center text-md text-white">
							RGB Value: {color.r}, {color.g}, {color.b}
						</h3>
						<h3 className="text-center">
							HSL Value: {color.h}, {color.s}, {color.l}
						</h3>
						<img
							className="m-auto rounded-3xl hover:shadow-xl hover:transition duration-300 ease-in-out"
							src={color.image}
							alt=''
						/>
						<button
							className="m-auto mt-2 w-32 h-9 rounded-tl-2xl rounded-br-2xl text-white hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
							style={{ backgroundColor: `${color.hex}` }}
							onClick={handleDelete}
						>
							Delete This Color
						</button>
					</div>
				);
			})}
		</>
	);
}
