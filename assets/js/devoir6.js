//Question 1
function trouverMotsFrequents(poem) {
const mots = poem.toLowerCase().split(/\W+/);
const lignes = poem.split('\n');
const texteSansTitre = lignes.slice(1).join(' ');
const compteurMots = {};
texteSansTitre.split(/\W+/).forEach((mot) => {
    if (mot !== '') {
      compteurMots[mot] = (compteurMots[mot] || 0) + 1;
    }
  });
const pairesMotsFreq = Object.entries(compteurMots);
pairesMotsFreq.sort((a, b) => b[1] - a[1]);
const motsFrequents = pairesMotsFreq.slice(0, 10);
  return motsFrequents;
}
const motsFrequents = trouverMotsFrequents(poem); 
console.log("Les 10 mots les plus fréquents (en excluant le titre) :");
motsFrequents.forEach((pair) => {
  console.log(`${pair[0]}: ${pair[1]} fois`);
});

//Question 2
function calculerRichesseLexicale(poem) {
  const mots = poem.toLowerCase().split(/\W+/);
  const lignes = poem.split('\n');
  const texteSansTitre = lignes.slice(1).join(' ');
  const compteurMots = {};
    texteSansTitre.split(/\W+/).forEach((mot) => {
      if (mot !== '') {
        compteurMots[mot] = (compteurMots[mot] || 0) + 1;
      }
    });
  const nombreMotsUniques = Object.keys(compteurMots).length;
  const nombreTotalMots = mots.length;
  const pourcentageRichesseLexicale = (nombreMotsUniques / nombreTotalMots) * 100;
  
    return pourcentageRichesseLexicale.toFixed(2);
  }
  const richesseLexicale = calculerRichesseLexicale(poem);
  console.log(`La richesse lexicale (en excluant le titre) est de ${richesseLexicale}%.`);

  //Question 3
  function compterPhrases(poeme) {
    const lignes = poem.split('\n');
  const texteSansTitre = lignes.slice(1).join(' ');
  const phrases = texteSansTitre.split(/[.!?]/);
  const phrasesNonVides = phrases.filter((phrase) => phrase.trim() !== '');
    return phrasesNonVides.length;
  }
  const nombrePhrases = compterPhrases(poem);
  console.log(`Le poème (en excluant le titre) contient ${nombrePhrases} phrases.`);

  //Question 4
  function longueurMoyenneMotsParPhrase(poem) {
    const lignes = poem.split('\n');
    const texteSansTitre = lignes.slice(1).join(' ');
    const phrases = texteSansTitre.split(/[.!?]/);
    const phrasesNonVides = phrases.filter((phrase) => phrase.trim() !== '');
    const motsParPhrase = phrasesNonVides.map((phrase) => phrase.split(/\W+/));
    const longueurMoyenne = motsParPhrase.reduce((acc, mots) => acc + mots.join('').length, 0) / motsParPhrase.length;
    
      return longueurMoyenne.toFixed(2);
    }
    const moyenneMotsParPhrase = longueurMoyenneMotsParPhrase(poem);
    console.log(`La longueur moyenne des mots par phrase (en excluant le titre) est de ${moyenneMotsParPhrase} caractères.`);


  //Question 5 et 6
    function decouperEnStrophes(poem) {
      const strophes = poem.split('\n\n');
      return strophes.filter(strophe => strophe.trim() !== '');
    }
    function compterSyllabes(vers) {
      const syllabes = vers.split(/[aeiouyAEIOUY]+/).length - 1;
      return syllabes;
    }
    function compterVers(strophe) {
      const vers = strophe.split('\n');
      return vers.length;
    }
    function analyserPoeme(poem) {
      const strophes = decouperEnStrophes(poem);
    
      let resultat = `Ce poème contient ${strophes.length} strophes :`;
    
      for (let i = 0; i < strophes.length; i++) {
        const strophe = strophes[i];
        const nombreDeVers = compterVers(strophe);
        resultat += `\n${i + 1}. ${nombreDeVers} vers`;
    
        const vers = strophe.split('\n');
        for (let j = 0; j < vers.length; j++) {
          const syllabes = compterSyllabes(vers[j]);
          resultat += `, ${syllabes} syllabes`;
        }
      }
    
      console.log(resultat);
    }
    analyserPoeme(poem);