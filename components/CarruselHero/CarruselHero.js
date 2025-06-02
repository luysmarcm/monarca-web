'use client'
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from "framer-motion";

const CarruselHero = () => {
	const t = useTranslations("Banner");

return (
	<div className="relative h-screen bg-banner bg-cover">
		<video
			autoPlay
			loop
			muted
			className="absolute top-0 left-0 w-full h-full object-cover"
		>
			<source src="/videos/v11.mp4" type="video/mp4" loading="lazy" />
			Tu navegador no admite la etiqueta de video.
		</video>
		<div className="absolute inset-0 flex items-center justify-center">
			<div className="flex items-center flex-col-reverse justify-center w-full lg:flex-row lg:justify-around gap-y-10 ">
				<div className="lg:text-start px-10 lg:w-1/2 ">
					<motion.div
						initial={{ x: -1000, opacity: 0 }} // Empieza fuera de la pantalla a la izquierda
						animate={{ x: 0, opacity: 1 }} // Se desplaza hacia la posición original
						exit={{ x: 1000, opacity: 0 }} // Sale hacia la derecha al cambiar de página
						transition={{ duration: 1.1 }}
					>
						<h2 className="text-center lg:text-left text-3xl font-black lg:text-5xl text-primary">
							{t("title")}
						</h2>
						<br />
						<p className="text-center lg:text-left text-base md:text-base text-black font-semibold">
							{t("parrafo1")}
						</p>
					</motion.div>
					<div className="flex flex-row space-x-4 justify-center lg:justify-start py-6">
						<motion.button
							initial={{ x: 1000, opacity: 0 }} // Empieza fuera de la pantalla a la derecha
							animate={{ x: 0, opacity: 1 }} // Se desplaza hacia la posición original
							exit={{ x: -1000, opacity: 0 }} // Sale hacia la izquierda al cambiar de página
							transition={{ duration: 1.1 }}
							className="rounded-full font-light text-white bg-primary px-5 py-1 hover:bg-secundary"
						>
							<div className="text-center inline-flex items-center relative">
								<a href="#contact" className="px-1 font-bold">
									{t("buttonc")}
								</a>
							</div>
						</motion.button>
						<motion.button
							initial={{ x: 1000, opacity: 0 }} // Empieza fuera de la pantalla a la derecha
							animate={{ x: 0, opacity: 1 }} // Se desplaza hacia la posición original
							exit={{ x: -1000, opacity: 0 }} // Sale hacia la izquierda al cambiar de página
							transition={{ duration: 1.1 }}
							className="rounded-full font-light text-white bg-primary px-5 py-1 hover:bg-secundary"
						>
							<div className="text-center inline-flex items-center relative">
								<a href="#services" className="px-1 font-bold">
									{t("buttons")}
								</a>
							</div>
						</motion.button>
					</div>
				</div>

				<motion.div
					className="max-w-sm w-3/5 lg:max-w-xl lg:w-1/2 lg:justify-center"
					initial={{ scale: 0 }} // Escala inicial (sin zoom)
					animate={{ scale: 1 }} // Escala al cargar la página
					transition={{ duration: 0.7 }}
				>
					<Image
						src="/image/logo-monarca.webp"
						alt="Monarca"
						width="1920"
						height="1766"
						priority
					/>
				</motion.div>
			</div>
		</div>
	</div>
);
}

export default CarruselHero