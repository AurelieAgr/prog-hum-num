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

    //Les trois poèmes sur lesquels vous avez testé votre code (le vôtre et 2 poèmes de vos camarades)
    // A celle qu'on disait froide Paul Verlaine
    Les 10 mots les plus fréquents (en excluant le titre) :
    d: 11 fois
    Jusqu: 8 fois 
    De: 6 fois 
    de: 6 fois 
    est: 6 fois 
    aux: 6 fois 
    la: 5 fois 
    sans: 5 fois 
    les: 5 fois 
    plus: 4 fois 
    La richesse lexicale (en excluant le titre) est de 64.00%.
    Le poème (en excluant le titre) contient 13 phrases.
    La longueur moyenne des mots par phrase (en excluant le titre) est de 104.69 caractères.
    Ce poème contient 16     1. 1 vers, 7 syllabes
    2. 4 vers, 9 syllabes, 8 syllabes, 9 syllabes, 9 syllabes
    3. 4 vers, 8 syllabes, 7 syllabes, 8 syllabes, 7 syllabes
    4. 4 vers, 8 syllabes, 7 syllabes, 9 syllabes, 7 syllabes
    5. 4 vers, 9 syllabes, 8 syllabes, 8 syllabes, 7 syllabes
    6. 4 vers, 9 syllabes, 7 syllabes, 9 syllabes, 7 syllabes
    7. 4 vers, 9 syllabes, 7 syllabes, 8 syllabes, 7 syllabes
    8. 4 vers, 8 syllabes, 9 syllabes, 8 syllabes, 8 syllabes
    9. 4 vers, 9 syllabes, 8 syllabes, 10 syllabes, 7 syllabes
    10. 4 vers, 9 syllabes, 7 syllabes, 8 syllabes, 8 syllabes
    11. 1 vers, 9 syllabes
    12. 3 vers, 8 syllabes, 9 syllabes, 10 syllabes
    13. 4 vers, 8 syllabes, 8 syllabes, 8 syllabes, 7 syllabes
    14. 4 vers, 9 syllabes, 6 syllabes, 8 syllabes, 7 syllabes
    15. 4 vers, 9 syllabes, 7 syllabes, 9 syllabes, 7 syllabes
    16. 4 vers, 10 syllabes, 9 syllabes, 7 syllabes, 8 syllabes


    //Au lecteur, Charles Baudelaire
    Les 10 mots les plus fréquents (en excluant le titre) :
    nos: 10 fois
    le: 9 fois 
    un: 9 fois 
    l: 8 fois 
    nous: 8 fois
    les: 8 fois 
    de: 8 fois 
    d: 8 fois 
    est: 6 fois
    et: 5 fois 
    La richesse lexicale (en excluant le titre) est de 66.86%.
    Le poème (en excluant le titre) contient 13 phrases.
    La longueur moyenne des mots par phrase (en excluant le titre) est de 113.38 caractères.
    Ce poème contient 11     1. 1 vers, 3 syllabes
    2. 4 vers, 10 syllabes, 12 syllabes, 12 syllabes, 12 syllabes
    3. 4 vers, 9 syllabes, 11 syllabes, 12 syllabes, 12 syllabes
    4. 4 vers, 12 syllabes, 12 syllabes, 10 syllabes, 12 syllabes
    5. 4 vers, 12 syllabes, 11 syllabes, 12 syllabes, 9 syllabes
    6. 4 vers, 13 syllabes, 12 syllabes, 13 syllabes, 15 syllabes
    7. 4 vers, 12 syllabes, 12 syllabes, 12 syllabes, 15 syllabes
    8. 4 vers, 12 syllabes, 11 syllabes, 12 syllabes, 12 syllabes
    9. 4 vers, 12 syllabes, 12 syllabes, 12 syllabes, 11 syllabes
    10. 4 vers, 12 syllabes, 13 syllabes, 12 syllabes, 13 syllabes
    11. 4 vers, 12 syllabes, 10 syllabes, 11 syllabes, 12 syllabes
    
    //La Déesse, Germain Nouveau
    Les 10 mots les plus fréquents (en excluant le titre) :
    la: 23 fois
    de: 23 fois 
    est: 20 fois 
    vous: 20 fois 
    ce: 19 fois 
    l: 17 fois 
    le: 14 fois
    je: 12 fois
    Je: 12 fois
    tes: 11 fois
    La richesse lexicale (en excluant le titre) est de 46.98%.
    Le poème (en excluant le titre) contient 96 phrases.
    La longueur moyenne des mots par phrase (en excluant le titre) est de 37.06 caractères.
    Ce poème contient 26     1. 1 vers, 3 syllabes
    2. 6 vers, 8 syllabes, 8 syllabes, 8 syllabes, 9 syllabes, 8 syllabes, 7 syllabes
    3. 6 vers, 7 syllabes, 8 syllabes, 7 syllabes, 9 syllabes, 8 syllabes, 8 syllabes
    4. 6 vers, 9 syllabes, 10 syllabes, 10 syllabes, 10 syllabes, 9 syllabes, 7 syllabes
    5. 6 vers, 8 syllabes, 8 syllabes, 7 syllabes, 8 syllabes, 9 syllabes, 7 syllabes
    6. 6 vers, 9 syllabes, 8 syllabes, 8 syllabes, 7 syllabes, 10 syllabes, 7 syllabes
    7. 6 vers, 8 syllabes, 8 syllabes, 6 syllabes, 7 syllabes, 9 syllabes, 5 syllabes
    8. 6 vers, 8 syllabes, 8 syllabes, 7 syllabes, 10 syllabes, 9 syllabes, 7 syllabes
    9. 6 vers, 9 syllabes, 9 syllabes, 8 syllabes, 8 syllabes, 7 syllabes, 7 syllabes
    10. 6 vers, 9 syllabes, 11 syllabes, 8 syllabes, 9 syllabes, 9 syllabes, 7 syllabes
    11. 6 vers, 9 syllabes, 10 syllabes, 8 syllabes, 8 syllabes, 9 syllabes, 6 syllabes
    12. 6 vers, 6 syllabes, 9 syllabes, 9 syllabes, 11 syllabes, 10 syllabes, 7 syllabes
    13. 6 vers, 10 syllabes, 7 syllabes, 7 syllabes, 10 syllabes, 9 syllabes, 6 syllabes
    14. 6 vers, 7 syllabes, 8 syllabes, 8 syllabes, 9 syllabes, 9 syllabes, 8 syllabes
    15. 6 vers, 7 syllabes, 8 syllabes, 7 syllabes, 7 syllabes, 8 syllabes, 5 syllabes
    16. 6 vers, 6 syllabes, 9 syllabes, 8 syllabes, 9 syllabes, 9 syllabes, 5 syllabes
    17. 6 vers, 9 syllabes, 9 syllabes, 7 syllabes, 8 syllabes, 8 syllabes, 8 syllabes
    18. 6 vers, 7 syllabes, 10 syllabes, 6 syllabes, 9 syllabes, 9 syllabes, 7 syllabes
    19. 6 vers, 9 syllabes, 9 syllabes, 10 syllabes, 9 syllabes, 9 syllabes, 6 syllabes
    20. 6 vers, 9 syllabes, 9 syllabes, 8 syllabes, 9 syllabes, 7 syllabes, 9 syllabes
    21. 6 vers, 8 syllabes, 8 syllabes, 7 syllabes, 10 syllabes, 9 syllabes, 7 syllabes
    22. 6 vers, 8 syllabes, 9 syllabes, 8 syllabes, 8 syllabes, 8 syllabes, 7 syllabes
    23. 6 vers, 8 syllabes, 8 syllabes, 8 syllabes, 8 syllabes, 8 syllabes, 7 syllabes
    24. 6 vers, 10 syllabes, 10 syllabes, 8 syllabes, 8 syllabes, 9 syllabes, 8 syllabes
    25. 6 vers, 7 syllabes, 10 syllabes, 7 syllabes, 7 syllabes, 8 syllabes, 8 syllabes
    26. 6 vers, 8 syllabes, 9 syllabes, 7 syllabes, 9 syllabes, 8 syllabes, 7 syllabes