import { useEffect } from "react";
import Head from "next/head";

const FormHearth = () => {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://widget.gethearth.com/script.js";
		script.id = "hearth-script";
		script.async = true;
		script.dataset.orgid = "49438";
		script.dataset.partner = "monarca-life-improvement";
		script.dataset.orgUuid = "9acc99cb-c1be-46fa-9ec8-2ea54a8e0b62";
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<>
			<iframe
				id="hearth-lead-capture-widget"
				style={{ width: "100%", height: "500px", border: "1px solid black" }}
				title="Hearth Lead Capture Widget"
			></iframe>
		</>
	);
};

export default FormHearth;
