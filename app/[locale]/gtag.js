import Script from 'next/script'

function Home() {
return (
	<div className="container">
		<Script
			src="https://www.googletagmanager.com/gtag/js?id=G-ZKDGGGZQGQ"
			strategy="afterInteractive"
		/>
		<Script id="google-analytics" strategy="afterInteractive">
			{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-ZKDGGGZQGQ');
        `}
		</Script>
		<Script
			src="https://www.googletagmanager.com/gtag/js?id=AW-11354093423"
			strategy="afterInteractive"
		/>
		<Script id="google-ads" strategy="afterInteractive">
			{`
			window.dataLayer = window.dataLayer || [];
			function gtag(){window.dataLayer.push(arguments);}
			gtag('js', new Date());

			gtag('config', 'AW-11354093423');
        	`}
		</Script>
	</div>
);
}

export default Home