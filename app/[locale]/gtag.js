import Script from 'next/script'

function Home() {
return (
	<div className="container">
		<Script
			src="https://www.googletagmanager.com/gtag/js?id=G-ZKDGGGZQGQ"
			strategy="afterInteractive"
			rel="preconnect"
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
			rel="preconnect"
		/>
		<Script id="google-ads" strategy="afterInteractive">
			{`
			window.dataLayer = window.dataLayer || [];
			function gtag(){window.dataLayer.push(arguments);}
			gtag('js', new Date());

			gtag('config', 'AW-11354093423');
        	`}
		</Script>
		<Script
			src="https://www.googletagmanager.com/gtag/js?id=AW-16850221006"
			strategy="afterInteractive"
			rel="preconnect"
		/>
		<Script id="google-ads" strategy="afterInteractive">
			{`
			window.dataLayer = window.dataLayer || [];
			function gtag(){window.dataLayer.push(arguments);}
			gtag('js', new Date());

			gtag('config', 'AW-16850221006');
        	`}
		</Script>
		<Script id="google-ads-event-script" strategy="afterInteractive">
			{`
          gtag('event', 'conversion', {'send_to': 'AW-16850221006/fT7-CIabmp0aEM7v5-I-'});
        `}
		</Script>
		<Script
			src="https://www.googletagmanager.com/ns.html?id=GTM-WT6TRZ99"
			strategy="afterInteractive"
			rel="preconnect"
		/>

		<Script id="google-tag-manager" strategy="afterInteractive">
			{`
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-WT6TRZ99');
       		`}
		</Script>
		<noscript>
			<iframe
				src="https://www.googletagmanager.com/ns.html?id=GTM-WT6TRZ99"
				height="0"
				width="0"
				rel="preconnect"
				style={{ display: "none", visibility: "hidden" }}
			></iframe>
		</noscript>
	</div>
);
}

export default Home