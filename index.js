var xhr1 = new XMLHttpRequest(), xhr2 = new XMLHttpRequest(), xml, xsl;
function getXML() {
    if (xhr1.readyState === 4) {
        xml = xhr1.responseXML;
    }
}
function getXSL() {
    if (xhr2.readyState === 4) {
        xsl = xhr2.responseXML;
    }
}
function loadXMLDoc() {
    xhr1.onreadystatechange = getXML;
    xhr1.open("get", "info.xml", true);
    xhr1.send(null);
}
function loadXSLDoc() {
    xhr2.onreadystatechange = getXSL;
    xhr2.open("get", "stylesheet.xsl", true);
    xhr2.send(null);
}
function showData() {
    if (xml !== undefined && xsl !== undefined) {
        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        xsltProcessor.setParameter(null, "code", this.id);
        xsltProcessor.setParameter(null, "title", this.querySelector("title").textContent);
        var resultDocument = xsltProcessor.transformToFragment(xml, document);
        var results = document.getElementById("results");
        results.innerHTML = "";
        results.appendChild(resultDocument);
        var x = document.styleSheets[0];
        x.deleteRule(x.cssRules.length - 1);
        x.insertRule("caption, th { background-color: " + window.getComputedStyle(this, null).fill + "}", x.cssRules.length);
    } else {
        console.log("XML ou XSLT não foram carregados!");
    }
}
function init() {
    loadXMLDoc();
    loadXSLDoc();
    var map = document.getElementById("map");
    var doc = map.getSVGDocument();
    var estados = doc.getElementsByTagName("path");
    for (var i = 0; i < estados.length; i++) {
        var estado = estados[i];
        estado.onmouseover = showData;
    }
    doc.styleSheets[0].deleteRule(doc.styleSheets[0].cssRules.length - 1);
}
onload = init;
