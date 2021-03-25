import React, { useState, useEffect, useRef } from 'react';

export default function Rgb(props) {
	const [query, updateQuery] = useState({
		baseURL: 'https://www.thecolorapi.com/id?',
		option: 'rgb=',
		rgb: '',
		searchURL: ''
	});
	const [rgbIn, updtRgb] = useState({});

	const [rgbLst, setRgbLst] = useState([]);

	const rgbRef = useRef(null);
	// const b = useRef(null);
	// const g = useRef(null);

	const getRgb = async () => {
		if (query.searchURL) {
			try {
				const response = await fetch(query.searchURL);
				const data = await response.json();
				await updtRgb(data);
				await setRgbLst([...rgbLst, data]);
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		}
	};

	useEffect(() => {
		getRgb();
	}, [query]);

	const handleSubmit = evt => {
		evt.preventDefault();
		updateQuery({
			...query,
			searchURL: query.baseURL + query.option + query.rgb
		});
	};

	const handleSave = async newColor => {
		try {
			const response = await fetch('/api/colors', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					hex: newColor.hex.value,
					image: newColor.image.bare,
					name: newColor.name.value,
					r: newColor.rgb.r,
					g: newColor.rgb.g,
					b: newColor.rgb.b,
					h: newColor.hsl.h,
					s: newColor.hsl.s,
					l: newColor.hsl.l
				})
			});
			const data = await response.json();
			console.log(response);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = evt => {
		updateQuery({ ...query, rgb: evt.target.value });
	};
	return (
		<div>
			<form
				className="flex flex-col justify-center my-8 mx-auto text-white w-1/4 h-28 bg-transparent border-3 border-green-100 rounded-xl shadow-md"
				onSubmit={handleSubmit}
			>
				<div>
					<label className="my-auto ml-5">
						<span className='font-bold text-lg'>RGB Value:{' '}</span>
						<input
							className="bg-transparent shadow-inner mt-5 rounded-lg h-7"
							type="text"
							onChange={handleChange}
							value={query.rgb}
							ref={rgbRef}
						/>
					</label>{' '}
				</div>
				<br />
				<input
					className="w-32 mx-auto mb-2 rounded-bl-2xl h-10 rounded-tr-2xl bg-transparent hover:shadow-xl hover:transition duration-300 ease-in-out"
					type="submit"
					value="Get this Color"
				/>
			</form>
			<div className="grid gap-3 grid-cols-4">
				{rgbLst.map(rgb2 => {
					return (
						<div>
							<div
								key={rgb2.hex}
								style={{
									backgroundColor: `rgba(${rgb2.rgb.r}, ${rgb2.rgb.g}, ${rgb2.rgb.b}, 0.3)`
								}}
								className="flex flex-col justify-center mt-auto w-56 h-64 rounded-xl shadow-md"
							>
								<h1 className="text-center text-xl pt-2 text-white">
									{rgb2.name.value}
								</h1>
								<img
									className="m-auto rounded-3xl hover:shadow-xl hover:transition duration-300 ease-in-out"
									src={rgb2.image.bare}
									alt=''
								/>
								<button
									style={{
										backgroundColor: `rgba(${rgb2.rgb.r}, ${rgb2.rgb.g}, ${rgb2.rgb.b}, 0.2)`
									}}
									className="m-auto my-3 w-32 h-9 rounded-tl-2xl rounded-br-2xl text-white hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
									onClick={() => handleSave(rgb2)}
								>
									Save This Color
								</button>
							</div>
						</div>
					);
				})}
				{/* {for(color in rgbIn){
						console.log(rgbIn)
					}} */}
			</div>
		</div>
	);
}
