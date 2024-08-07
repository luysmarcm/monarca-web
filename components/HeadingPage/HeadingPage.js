import React from 'react'

const HeadingPage = (props) => {
  return (
		<div
			className="relative text-center bg-cover bg-center h-44 lg:h-36"
			style={{ backgroundImage: 'url("/image/headingPage.png")' }}
		>
			<div className="absolute inset-0 flex items-center justify-center pt-8 ">
				<div className="lg:w-1/2">
					<h2 className={`text-primary ${props.le1} lg:${props.le} font-bold`}>
						{props.text}
					</h2>
					<p className="text-white mt-2">Monarca life improvement</p>
				</div>
			</div>
		</div>
	);
}

export default HeadingPage