"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const telefono = "13213306424";

const CardSpecialize = ({ item,t }) => {	
	const formatNumber = (number) => {
		const format = number.slice(1);
		return format.replace("-", "").replace(" ", "");
	};
	  const bounceVariants = {
			hover: {
				scale: 1.1,
				transition: {
					yoyo: Infinity, // Repite el efecto infinitamente
					duration: 0.4, // Duración de cada ciclo
					ease: "easeOut", // Tipo de animación
				},
			},
		};

	return (
		<motion.card
			variants={bounceVariants}
			whileHover="hover"
			className="relative p-4 max-w-sm  rounded-lg shadow-md bg-white hover:bg-primary text-primary hover:text-white"
		>
			<div className="absolute -top-12 left-36 flex flex-row  ">
				<div>
					<Image src={t(item.imagen)} alt="Icono" width={100} height={100} />
				</div>
			</div>
			<a
				// href={`https://wa.me/+1${formatNumber(telefono)}?text=${t(
				// 	item.message
				// )}`}
				// target="_blank"
				href="#contact"
			>
				<div className="mt-14">
					<p className="text-lg text-center ">
						<span className="font-bold">{t(item.paRes1)}</span>&nbsp;
						{t(item.descripcion)}&nbsp;
						<span className="font-bold">{t(item.paRes2)}</span>
					</p>
				</div>
			</a>
		</motion.card>
	);
};

export default CardSpecialize