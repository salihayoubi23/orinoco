var panier = JSON.parse(localStorage.getItem('panier'));
var articlePanier = document.getElementById('articlepanier');
var panierVide = document.getElementById('paniervide');
var panierGarnis = document.getElementById('paniergarnis');

if (localStorage.getItem('panier') === null) {
    panierGarnis.setAttribute('class', 'invisible');
} else {
    panierVide.setAttribute('class', 'invisible');
}

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
    titre.setAttribute('class' , 'titrep')
    prix.setAttribute('class' , 'prixp')
    
    titre.textContent = panier[i].name;
    prix.textContent = 'Prix:' + ' ' + panier[i].price + '€';
    imageUrl.src = panier[i].imageUrl;
   

}

var total = 0;
for (var i = 0; i < panier.length; i++) {
    total += panier[i].price;
}

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




let formsPrenom = document.getElementById('prenom')
let formsNom = document.getElementById('name')
let formsEmail = document.getElementById('email')
let formsAdresse = document.getElementById('adresse')
let formsVille = document.getElementById('ville')
let envoyer = document.getElementById('contact-submit');
let formulaire = document.getElementById('contact');






envoyer.addEventListener('click', function(e) {
    e.preventDefault();
     infoFormulaire= new Object();
    infoFormulaire.contact = {
       prenom : formsPrenom.value,
       nom :   formsNom.value,
       email : formsEmail.value,
       adresse : formsAdresse.value,
       ville : formsVille.value
        
    };
    infoFormulaire.produits = [];
    for (var i = 0; i < panier.length; i++) {
        infoFormulaire.produits.push(panier[i].id);
    }
    envoyerFormulaire(infoFormulaire);
});

var get = function(url){
    return new Promise(function(resolve , reject){
        var xhr = new window.XMLHttpRequest()
        xhr.onreadystatechange = function(){
            if(xhr.readyState===4){
                if(xhr.status===200){
                resolve(xhr.responseText)
            } else {
                reject(xhr)
            }
        }
    }
    xhr.open('POST', url)
    xhr.send()
    })
  }

            var getp1 = async function(){
                response= await get('http://localhost:3000/api/cameras/order')
                var posts = JSON.parse(response)
                return posts
            }
            var getp2 = async function(){
                response= await get('http://localhost:3000/api/teddies/order')
                var posts = JSON.parse(response)
                return posts
            }
            var getp3 = async function(){
                response= await get('http://localhost:3000/api/furniture/order')
                var posts = JSON.parse(response)
                return posts
            }

        

         async function envoyerFormulaire(infoFormulaire){
            var requestPromise = get(infoFormulaire);
            var response = await requestPromise;
            window.location = 'confirmation.html?id=' + response.orderId + '&price=' + total;
            localStorage.clear();
        }
        