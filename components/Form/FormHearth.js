'use client'
import React,{useEffect} from 'react'

const FormHearth = () => {
    useEffect(() => {
			const script = document.createElement("script");
			script.src = "https://widget.gethearth.com/script.js";
			script.id = "hearth-script";
			script.setAttribute("data-orgid", "49438");
			script.setAttribute("data-partner", "monarca-life-improvement");
			script.setAttribute(
				"data-orgUuid",
				"9acc99cb-c1be-46fa-9ec8-2ea54a8e0b62"
			);
			script.async = true;

			// Listener para cuando el script se carga
			script.onload = () => {
				console.log("Script cargado correctamente");
				// Aquí podrías inicializar el widget si es necesario
			};

			document.body.appendChild(script);

			return () => {
				document.body.removeChild(script);
			};
		}, []);
  return (
		<iframe
			id="hearth-lead-capture-widget"
			style={{ width: "100%", height: "500px", border: "1px solid black" }}
			title="Hearth Lead Capture Widget"
		></iframe>
	);
}

export default FormHearth