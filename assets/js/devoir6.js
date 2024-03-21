function analyserPoeme(){
    var poemeEtTitre= document.getElementById("poeme").value;
    var balise = document.getElementById("result");

    var indexRetourLigne = poemeEtTitre.indexOf('\n');
    var poeme = poemeEtTitre.substring(indexRetourLigne + 1);
    var mots = poemeEtTitre.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(/\s+/);
    var freqMots = {};
    mots.forEach(mot => {
        freqMots[mot] = (freqMots[mot] || 0) + 1;
    });
    var motsTries = Object.keys(freqMots).sort((a, b) => freqMots[b] - freqMots[a]);
    var motsTop10 = motsTries.slice(0, 10);
    var motsUniques = new Set(mots);
    
}