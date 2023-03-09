class GUI {
    constructor() {
        this.xhr1 = new XMLHttpRequest();
        this.xhr2 = new XMLHttpRequest();
        this.xml = null;
        this.xsl = null;
    }
    getXML() {
        if (this.xhr1.readyState === 4) {
            this.xml = this.xhr1.responseXML;
        }
    }
    getXSL() {
        if (this.xhr2.readyState === 4) {
            this.xsl = this.xhr2.responseXML;
        }
    }
    loadXMLDoc() {
        this.xhr1.onreadystatechange = this.getXML.bind(this);
        this.xhr1.open("get", "info.xml", true);
        this.xhr1.send(null);
    }
    loadXSLDoc() {
        this.xhr2.onreadystatechange = this.getXSL.bind(this);
        this.xhr2.open("get", "stylesheet.xsl", true);
        this.xhr2.send(null);
    }
    showData(evt) {
        let path = evt.currentTarget;
        if (this.xml !== undefined && this.xsl !== undefined) {
            var xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(this.xsl);
            xsltProcessor.setParameter(null, "code", path.id);
            xsltProcessor.setParameter(null, "title", path.querySelector("title").textContent);
            let resultDocument = xsltProcessor.transformToFragment(this.xml, document);
            let results = document.getElementById("results");
            results.innerHTML = "";
            results.appendChild(resultDocument);
            let x = document.styleSheets[0];
            x.deleteRule(x.cssRules.length - 1);
            x.insertRule(`caption, th { background-color: ${window.getComputedStyle(path, null).fill} }`, x.cssRules.length);
        } else {
            console.log("XML ou XSLT não foram carregados!");
        }
    }
    init() {
        this.loadXMLDoc();
        this.loadXSLDoc();
        let map = document.getElementById("map");
        let doc = map.getSVGDocument();
        let estados = doc.getElementsByTagName("path");
        for (var i = 0; i < estados.length; i++) {
            let estado = estados[i];
            estado.onmouseover = this.showData.bind(this);
        }
        doc.styleSheets[0].deleteRule(doc.styleSheets[0].cssRules.length - 1);
    }
}
onload = () => {
    let gui = new GUI();
    gui.init();
};