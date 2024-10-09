//Santiago Calderon Castaño
function obtenerVideoURL() {
    let videosURLs = [
        `https://www.youtube.com/embed/6g2eDMHwe2M?si=kIW8_DGrtIy9poaM&autoplay=1&mute=1`,
        `https://www.youtube.com/embed/EDap9qxb96k?si=TxcwxQGSGfVgZdIo&autoplay=1&mute=1`,
        `https://www.youtube.com/embed/AOkBzn9SJ44?si=aWvFw4gLcMp_fQrc&autoplay=1&mute=1`,
        `https://www.youtube.com/embed/uo0LgCXljYg?si=kTNdXBR5eUbDMV0e&autoplay=1&mute=1`,
        `https://www.youtube.com/embed/r2mqcqSHi2I?si=R6ywHTnIhpw3LOZM&autoplay=1&mute=1`,
        `https://www.youtube.com/embed/bjokCxALGBg?si=Q97SCOd6jEmsKyEB&autoplay=1&mute=1`,
        `https://www.youtube.com/embed/beOdFyF9kKk?si=n_eEMztTmjkhSGPt&autoplay=1&mute=1`,
        `https://www.youtube.com/embed/NUPbCt4g_ko?si=Vc8nScyul5j9xKo1&autoplay=1&mute=1`,
        `https://www.youtube.com/embed/mTJeNcRhFMo?si=vLl4XZUsSeKfLhI6&autoplay=1&mute=1`,
        `https://www.youtube.com/embed/aXdtpAFrvI4?si=ubb-DGwClpx1ivSw&autoplay=1&mute=1`,
    ]
    return videosURLs[Math.floor(Math.random() * videosURLs.length)];
}

//Función para contruir el elemento Iframe de HTML, 
function construirEtiquetaIframe() {
    //Creación de la etiqueta
    let iframe = document.createElement("iframe");

    //Le asignamos algunos atributos
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = obtenerVideoURL();

    /**
     * Curiosamente me funciona algunas atributos de una forma y otros con otra función
     *  iframe.setAttribute('width', '600');
     * iframe.setAttribute('heigth', '600');
     * iframe.setAttribute('src', obtenerVideoURL());
     */
    
    //Esta forma me parece más limpia
    iframe.setAttribute('title', 'YouTube video player');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', 'true');

    //Retorno el ifrmae ya constuido
    return iframe;
}

//Función para insertar el iframe
function insertarIframe() {
    //Obtengo el elemento padre (div id="videoYoutube") y le inserto la etiqueta iframe constuida
    document.getElementById("videoYoutube").appendChild(construirEtiquetaIframe());
}

//Llamo a la etiq
insertarIframe();