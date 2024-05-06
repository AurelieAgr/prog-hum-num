function tokenizeText(text, delimiters) {
    let delim2 = delimiters.replace("-", "\\-");
    delim2 = delim2.replace("[", "\\[");
    delim2 = delim2.replace("]", "\\]");
    delim2 = delim2 + "—";
    delim2 = delim2 + "\\s";
    
    let wordRegex = new RegExp("[" + delim2 + "]", 'g');
    
    let words = text.split(wordRegex);
    
    return words.filter(x => x.trim() != '');
}

window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}


function sort_words() {

// récupération du contenu du fichier texte
const output = document.getElementById("fileDisplayArea").innerText;

// Vérifier si un fichier a été chargé
if (output.trim() === "") {
    alert("Erreur : Aucun fichier n'a été chargé.");
    return;
}

//balise pour écriture des résultats
let result =  document.getElementById("page-analysis");

//récupération des délimiteurs de mots
let delimiters = document.getElementById("delimID").value;


//Corrections de la liste de délimiteurs pour éviter des erreurs dans l'expression régulière
delim2 = delimiters.replace("-", "\\-") ; //échappement du tiret, comme il entouré d'autres caractères iol sera considéré comme marquant un intervalle comme dans [4-9]
delim2 = delim2.replace("[", "\\[") ; // échappement des crochets ouverts
delim2 = delim2.replace("]", "\\]") ; // échappement des crochets fermants
delim2 = delim2 + "—"; //facultatif: ajout des tirets longs
delim2 = delim2 + "\\s" ;//a jout de tous les symboles d'espacement


//Construction de l'expression régulière pour découper les mots

let word_regex = new RegExp ( "[" + //crochet ouvert pour signifier l'alternative 
                            delim2 +                      
                            "]" , 'g'); // pour enlever plusieurs délimiteurs 



all_words = output.split(word_regex);

cleaned_words = all_words.filter(x => x.trim() != '') // pour ne garder que les tokens non vides 

let dic_length={};

for (let word of cleaned_words){
    if (word.length in dic_length){
        dic_length[word.length]["freq"] += 1;
        if (dic_length[word.length] ["elements"].includes(word.toLowerCase())) {
           
        }
        else{
            dic_length[word.length] ["elements"].push(word.toLowerCase());
        }
      
    }
    else {
         dic_length[word.length]= {}
         dic_length[word.length]["freq"] = 1;
         dic_length[word.length] ["elements"]= [word.toLowerCase()]   ;   

    }
}

let table = document.createElement("table");
table.style.margin = "auto";
let head = table.appendChild(document.createElement("tr"));
head.innerHTML = "<th>Nombre de caractères</th><th>Nombre d'occurrences</th><th>Formes(s) unique(s)</th>";

ordered = Object.keys(dic_length).sort((a, b) => a - b);

for (let elem of ordered){
    let row = table.appendChild(document.createElement("tr"));
    let cell_length = row.appendChild(document.createElement("td"));
    let cell_total = row.appendChild(document.createElement("td"));
    let cell_details = row.appendChild(document.createElement("td"));
    cell_length.innerHTML = elem;
    cell_total.innerHTML = dic_length[elem]["freq"];
    cell_details.innerHTML = dic_length[elem]["elements"].sort().join(', ') +' ('+ dic_length[elem]["elements"].length +')';
    

}

result.innerHTML =`<p>Le  texte contient au total ${cleaned_words.length} mots.<p/>`;
result.append(table);

}

//Tâche 2 

function findCooccurrents() {
    // Récupérer le texte du fichier et les valeurs entrées par l'utilisateur
    var fullText = document.getElementById('fileDisplayArea').innerText;
    var pole = document.getElementById('poleID').value.trim();
    var longueur = parseInt(document.getElementById('lgID').value.trim());

    // Vérifier si les champs sont remplis
    if (pole === '') {
        alert("Veuillez entrer un terme dans le champ Pôle.");
        return;
    }
    if (isNaN(longueur) || longueur <= 0) {
        alert("Veuillez entrer une valeur numérique positive dans le champ Longueur.");
        return;
    }

    // Vérifier si le terme se trouve dans le texte
    if (!fullText.includes(pole)) {
        alert("Aucun mot trouvé dans le texte.");
        return;
    }

    // Tokeniser le texte en mots
    var wordsArray = fullText.match(/\b\w+\b/g);

    // Créer un objet pour stocker les coocurents et leurs fréquences
    var cooccurrents = {};

    // Parcourir chaque mot du texte
    for (var i = 0; i < wordsArray.length; i++) {
        var word = wordsArray[i];

        // Vérifier si le mot actuel est égal au mot entré par l'utilisateur
        if (word === pole) {
            // Extraire le contexte gauche et droit du mot actuel
            var leftContext = wordsArray.slice(Math.max(0, i - longueur), i);
            var rightContext = wordsArray.slice(i + 1, i + longueur + 1);

            // Mettre à jour les coocurents et leurs fréquences
            for (var j = 0; j < leftContext.length; j++) {
                var leftWord = leftContext[j];
                if (!cooccurrents[leftWord]) {
                    cooccurrents[leftWord] = { coFrequency: 0, leftFrequency: 0, rightFrequency: 0 };
                }
                cooccurrents[leftWord].leftFrequency++;
            }
            for (var k = 0; k < rightContext.length; k++) {
                var rightWord = rightContext[k];
                if (!cooccurrents[rightWord]) {
                    cooccurrents[rightWord] = { coFrequency: 0, leftFrequency: 0, rightFrequency: 0 };
                }
                cooccurrents[rightWord].rightFrequency++;
            }
            // Mettre à jour la co-fréquence
            for (var cooccurrent in cooccurrents) {
                cooccurrents[cooccurrent].coFrequency++;
            }
        }
    }

    // Construire le tableau HTML pour afficher les résultats
    var tableHTML = '<table>';
    tableHTML += '<tr><th>Cooccurrent(s)</th><th>Co-fréquence</th><th>Fréquence gauche</th><th>% Fréquence gauche</th><th>Fréquence droite</th><th>% Fréquence droite</th></tr>';

    // Parcourir chaque coocurrent et afficher les résultats
    for (var cooccurrent in cooccurrents) {
        var cooccurrentData = cooccurrents[cooccurrent];
        var leftPercentage = ((cooccurrentData.leftFrequency / cooccurrentData.coFrequency) * 100).toFixed(2);
        var rightPercentage = ((cooccurrentData.rightFrequency / cooccurrentData.coFrequency) * 100).toFixed(2);

        tableHTML += '<tr>';
        tableHTML += '<td>' + cooccurrent + '</td>';
        tableHTML += '<td>' + cooccurrentData.coFrequency + '</td>';
        tableHTML += '<td>' + cooccurrentData.leftFrequency + '</td>';
        tableHTML += '<td>' + leftPercentage + '%</td>';
        tableHTML += '<td>' + cooccurrentData.rightFrequency + '</td>';
        tableHTML += '<td>' + rightPercentage + '%</td>';
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    // Afficher le tableau dans la section "page-analysis"
    document.getElementById('page-analysis').innerHTML = tableHTML;
}

// Tâche 3

function GraphiqueBarres() {
    // Récupérer le texte du fichier et le mot entré par l'utilisateur
    var fullText = document.getElementById('fileDisplayArea').innerText;
    var pole = document.getElementById('poleID').value.trim();

    // Vérifier si le champ est rempli
    if (pole === '') {
        alert("Veuillez entrer un terme dans le champ Pôle.");
        return;
    }

    // Vérifier si le terme se trouve dans le texte
    if (!fullText.includes(pole)) {
        alert("Aucun mot trouvé dans le texte.");
        return;
    }

    // Tokeniser le texte en mots
    var wordsArray = fullText.match(/\b\w+\b/g);

    // Créer un objet pour stocker les coocurents et leurs fréquences
    var cooccurrents = {};

    // Parcourir chaque mot du texte
    for (var i = 0; i < wordsArray.length; i++) {
        var word = wordsArray[i];

        // Vérifier si le mot actuel est égal au mot entré par l'utilisateur
        if (word === pole) {
            // Extraire le contexte gauche et droit du mot actuel
            var leftContext = wordsArray.slice(Math.max(0, i - 5), i); // 5 coocurrences à gauche
            var rightContext = wordsArray.slice(i + 1, i + 6); // 5 coocurrences à droite

            // Mettre à jour les coocurents et leurs fréquences
            for (var j = 0; j < leftContext.length; j++) {
                var leftWord = leftContext[j];
                if (!cooccurrents[leftWord]) {
                    cooccurrents[leftWord] = { coFrequency: 0, leftFrequency: 0, rightFrequency: 0 };
                }
                cooccurrents[leftWord].leftFrequency++;
                cooccurrents[leftWord].coFrequency++;
            }
            for (var k = 0; k < rightContext.length; k++) {
                var rightWord = rightContext[k];
                if (!cooccurrents[rightWord]) {
                    cooccurrents[rightWord] = { coFrequency: 0, leftFrequency: 0, rightFrequency: 0 };
                }
                cooccurrents[rightWord].rightFrequency++;
                cooccurrents[rightWord].coFrequency++;
            }
        }
    }

    // Trier les cooccurrents par co-fréquence décroissante
    var sortedCooccurrents = Object.keys(cooccurrents).sort(function(a, b) {
        return cooccurrents[b].coFrequency - cooccurrents[a].coFrequency;
    });

    // Sélectionner les 10 cooccurrents les plus fréquents
    var topCooccurrents = sortedCooccurrents.slice(0, 10);

    // Préparer les données pour le graphique
    var labels = [];
    var coFrequencyData = [];
    var leftFrequencyData = [];
    var rightFrequencyData = [];

    for (var cooccurrent of topCooccurrents) {
        labels.push(cooccurrent);
        coFrequencyData.push(cooccurrents[cooccurrent].coFrequency);
        leftFrequencyData.push(cooccurrents[cooccurrent].leftFrequency);
        rightFrequencyData.push(cooccurrents[cooccurrent].rightFrequency);
    }

    // Créer le graphique en utilisant Chartist.js
    new Chartist.Bar('.ct-chart', {
        labels: labels,
        series: [
            coFrequencyData,
            leftFrequencyData,
            rightFrequencyData
        ]
    }, {
        seriesBarDistance: 15,
        reverseData: true,
        horizontalBars: true,
        axisY: {
            offset: 70
        }
    });
}

//Afficher un message avec le bouton "bonjour"
function afficherMessage() {
    alert("Bonjour et bienvenue sur notre page !");
}

//Afficher la documentation dans le bouton aide
function toggleDocumentation() {
    // Sélectionnez l'élément de documentation
    var documentation = document.getElementById("documentation");

    // Vérifiez si la documentation est actuellement cachée ou non
    if (documentation.style.display !== "block") {
        // Si elle est cachée, affichez-la
        documentation.style.display = "block";
        // Changez le texte du bouton en "Cacher l'Aide"
        document.getElementById("toggleButton").innerText = "Cacher l'Aide";
    } else {
        // Sinon, cachez-la
        documentation.style.display = "none";
        // Changez le texte du bouton en "Afficher Aide"
        document.getElementById("toggleButton").innerText = "Afficher Aide";
    }
}
