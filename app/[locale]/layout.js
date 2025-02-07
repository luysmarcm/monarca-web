import { Montserrat } from "next/font/google";
import "./globals.css";
import 'toastify-js/src/toastify.css';
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer.";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AOSInit } from "@/aos"
import Head from "next/head";
import GTag from "./gtag";

const montse = Montserrat({ subsets: ["latin"] });

export const metadata = {
	title: "Monarca | Life Improvement",
	description:
		"Your reliable partner to improve your property! We offer customized and effective solutions for projects of any size, guaranteeing results that exceed your expectations.",
	icons: {
		icon: ["/favicon.ico"], // Ruta a tu favicon
	},
};

export default async function LocaleLayout({ children, params }) {
	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html lang={params.locale}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<link rel="icon" type="image/png" href="/favicon.png" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				{/* Google tag (gtag.js) */}
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=AW-11354093423`}
				></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'AW-11354093423');
						`,
					}}
				/>
				{/* <script
					src={`https://widget.gethearth.com/script.js`}
					id="hearth-script"
					data-orgid="49438"
					data-partner="monarca-life-improvement"
					data-orgUuid="9acc99cb-c1be-46fa-9ec8-2ea54a8e0b62"
					async
				></script> */}
				<script
					src="https://widget.gethearth.com/script.js"
					id="hearth-script"
					data-orgid="49438"
					data-partner="monarca-life-improvement"
					data-orgUuid="9acc99cb-c1be-46fa-9ec8-2ea54a8e0b62"
					async
				></script>
			</Head>
			<AOSInit />
			<body className="max-w-max min-w-min mx-auto">
				<NextIntlClientProvider messages={messages}>
					<Header />
					<div className="max-w-max m-auto overflow-hidden w-full">
						{children}
					</div>
					<Footer />
				</NextIntlClientProvider>
				<GTag />
			</body>
		</html>
	);
}
