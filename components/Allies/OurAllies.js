'use client'
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const allies = [
	{
		id: "01",
		imagen: "/image/Tesla_Motors.png",
		url: "",
	},
	{
		id: "02",
		imagen: "/image/6272ef4ab7a134dfd3298d6e_EnFin_Primary.png",
		url: "",
	},
	{
		id: "03",
		imagen: "/image/Enphase-Logo-1.png",
		url: "",
	},
	{
		id: "04",
		imagen: "/image/mosaic-logo.png",
		url: "",
	},
	{
		id: "06",
		imagen: "/image/sunlight-logo.png",
		url: "",
	},
	{
		id: "07",
		imagen: "/image/Sunrgy_Financing_Brands_Goodleap.png",
		url: "",
	},
	{
		id: "08",
		imagen: "/image/Expert-Solar-Official-Logo.png",
		url: "",
	},
	{
		id: "09",
		imagen: "/image/2560px-SolarEdge_logo.png",
		url: "",
	},
	{
		id: "09",
		imagen: "/image/Sunnova-Logo-Tagline_Color.png",
		url: "",
	},
];

const OurAllies = () => {
	const t = useTranslations("Allies");
    var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 5, // Muestra 3 logos a la vez
			slidesToScroll: 1,
			autoplay: true, // El carrusel se moverá automáticamente
			autoplaySpeed: 2000,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						initialSlide: 3,
					},
				},
			],
		};

	return (
		<div className="px-2 lg:px-36  items-center pb-14">
			<div data-aos="fade-up" className="text-center py-6">
				<h2 className="text-3xl lg:text-5xl font-extrabold text-primary">
					{t("title")}
				</h2>
				<div className="mt-2 w-40 h-3 bg-secundary inline-block"></div>
			</div>
			<Slider {...settings}>
				{allies.map((allie, idx) => (
					<div data-aos="fade-up" key={idx} className="slick-slide ">
						<Image
							src={allie.imagen}
							alt="About Us"
							// layout="responsive"
							width={650}
							height={358}
							className="object-contain w-40 h-40 flex items-center justify-center p-4 lg:p-0"
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default OurAllies