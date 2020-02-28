// 
var panier = JSON.parse(localStorage.getItem('panier'));
var articlePanier = document.getElementById('articlepanier');
var panierVide = document.getElementById('paniervide');
var panierGarnis = document.getElementById('paniergarnis');
// une fonction d'affichage de la page en fonction du contenus 
if (localStorage.getItem('panier') === null) {
    panierGarnis.setAttribute('class', 'invisible');
} else {
    panierVide.setAttribute('class', 'invisible');
}
// creation des elements html pour chaque produit dans le panier 
for (var i = 0; i < panier.length; i++) {
    let carte = document.createElement("div")
    let imageUrl = document.createElement("img")
    let titre = document.createElement("h3")
    let prix = document.createElement("h4")

    articlePanier.appendChild(carte)
    carte.appendChild(imageUrl)
    carte.appendChild(titre)
    carte.appendChild(prix)


    carte.setAttribute('class', 'cartep')
    imageUrl.setAttribute('class', 'imagep')
    titre.setAttribute('class', 'titrep')
    prix.setAttribute('class', 'prixp')

    titre.textContent = panier[i].name;
    prix.textContent = 'Prix:' + ' ' + panier[i].price + '€';
    imageUrl.src = panier[i].imageUrl;


}
// fonction pour calculer le prix totale du panier 
var total = 0;
for (var i = 0; i < panier.length; i++) {
    total += panier[i].price;
}

// creation  de deux bouttons supprimer ou continuer a acheter et aussi un p pour annoncer le totale 
let carte = document.createElement("div")
var div1 = document.createElement('div');
var div2 = document.createElement('div');
var totale = document.createElement('p');
var supprimer = document.createElement('button');
var acheter = document.createElement('button');

articlePanier.appendChild(carte);
carte.appendChild(div1);
div1.appendChild(div2);
div2.appendChild(totale);
div2.appendChild(supprimer);
div2.appendChild(acheter);

totale.textContent = 'prix totale:' + ' ' + total + '€';
supprimer.textContent = 'SUPPRIMER';
acheter.textContent = 'CONTINUER MON SHOPPING';


carte.setAttribute('class', 'cartep');
div1.setAttribute('class', 'div1');
div2.setAttribute('class', 'card-body');
totale.setAttribute('class', 'prixp');
supprimer.setAttribute('class', 'btn1');
acheter.setAttribute('class', 'btn2');

supprimer.addEventListener('click', function () {
    localStorage.clear();
    location.reload(true);
});

acheter.addEventListener('click', function () {
    window.location = 'index.html';
});
// recuperer les element du formulaire 

let formsPrenom = document.getElementById('prenom')
let formsNom = document.getElementById('name')
let formsEmail = document.getElementById('email')
let formsAdresse = document.getElementById('adresse')
let formsVille = document.getElementById('ville')
let envoyer = document.getElementById('contact-submit');
let formulaire = document.getElementById('contact');
//regex mail
formsEmail.addEventListener('input', ($event) => {
    var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (formsEmail.value.match(regex)) {
        envoyer.removeAttribute('disabled');
    }
    else {
        envoyer.setAttribute('disabled');
    }
});
// a partir du boutton envoyer on vas creer notre objet info formulaire et creer une fonction pour lenvoyer en requete post 
envoyer.addEventListener('click', function (e) {
    e.preventDefault();
    infoFormulaire = new Object();
    infoFormulaire.contact = {
        prenom: formsPrenom.value,
        nom: formsNom.value,
        email: formsEmail.value,
        adresse: formsAdresse.value,
        ville: formsVille.value

    };
    infoFormulaire.products = [];
    for (var i = 0; i < panier.length; i++) {
        infoFormulaire.products.push(panier[i].id);
    }
    envoyerFormulaire(infoFormulaire);
});
// requete post
var post = function (url, data) { // ajout param data pour envoyé la donnée
    return new Promise(function (resolve, reject) {
        var xhr = new window.XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 201 || xhr.status === 200) { 
                    resolve(xhr.responseText)
                } else {
                    reject(xhr)
                }
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json"); // ajout en-tete d'envoi de données format json
        xhr.send(JSON.stringify(data)); // ajout envoi de la donnée
    })
}

async function envoyerFormulaire(infoFormulaire) {
    // ici seule la catégorie doudou peut etre vendu 
    var requestPromise = post('http://localhost:3000/api/teddies/order',infoFormulaire);
    var responses = await requestPromise;
    var response =  JSON.parse(responses)
   window.location = 'confirmation.html?id=' + response.orderId + '&price=' + total;
   localStorage.clear();
}

