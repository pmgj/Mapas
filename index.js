class GUI {
    constructor() {
        this.xhr1 = new XMLHttpRequest();
        this.xhr2 = new XMLHttpRequest();
        this.xml = null;
        this.xsl = null;
    }
    loadXMLDoc() {
        this.xhr1.onload = () => this.xml = this.xhr1.responseXML;
        this.xhr1.open("get", "info.xml");
        this.xhr1.send();
    }
    loadXSLDoc() {
        this.xhr2.onload = () => this.xsl = this.xhr2.responseXML;
        this.xhr2.open("get", "stylesheet.xsl");
        this.xhr2.send();
    }
    showData(evt) {
        let path = evt.currentTarget;
        if (this.xml !== undefined && this.xsl !== undefined) {
            let xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(this.xsl);
            xsltProcessor.setParameter(null, "code", path.id);
            xsltProcessor.setParameter(null, "title", path.querySelector("title").textContent);
            let resultDocument = xsltProcessor.transformToFragment(this.xml, document);
            let results = document.getElementById("results");
            results.innerHTML = "";
            results.appendChild(resultDocument);
            let r = document.querySelector(':root');
            r.style.setProperty('--custom-color', window.getComputedStyle(path, null).fill);
        } else {
            console.log("XML ou XSLT não foram carregados!");
        }
    }
    init() {
        this.loadXMLDoc();
        this.loadXSLDoc();
        let map = document.getElementById("map");
        let doc = map.getSVGDocument();
        let estados = doc.querySelectorAll("path");
        estados.forEach(e => e.onmouseover = this.showData.bind(this));
    }
}
onload = () => {
    let gui = new GUI();
    gui.init();
};