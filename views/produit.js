// récuperation des elements html 
let image = document.getElementById("imageP")
let titre = document.getElementById("titre")
let description = document.getElementById("description")
let prix = document.getElementById("prixp")
let selection= document.getElementById("selection")
var lists = document.getElementById('lists');
let btn = document.getElementById("btn")
// requête url id
let ajoutId= new URLSearchParams(window.location.search);
//requête url catégorie 
let api = ajoutId.get("api");
let id = ajoutId.get("id");

// requête url  + catégorie+id 

let url = 'http://localhost:3000/api/' + api + '/'+ id;
let request = new XMLHttpRequest();
request.open('GET', url);
request.send()
request.responseType = 'json';

request.onload = function () {
let product = request.response;
console.log(product)
// mise en place de la carte produit 
document.title= product.name
image.src = product.imageUrl;
titre.textContent = product.name;
description.textContent= product.description;
prix.textContent= "Prix: " + product.price + "€" ;
// fonction menu déroulant permettant à l'utilisateur de choisir une option de personnalisation
select(product, lists)
btn.textContent = 'Ajouter au panier';
btn.href= 'panier.html'
// sauvegarder les éléments dans le panier 
storageLocal(product, btn)

}


function select(product, lists) {
// vernis pour les meubles
if(product.varnish)
{
let vernis= product.varnish
for (let j = 0; j < vernis.length; j++) {
let options = document.createElement('option');
lists.appendChild(options);
selection.textContent = 'Séléctionnez le vernis:';
options.textContent = vernis[j];            
}  
}
// lentilles pour camera
if( product.lenses){
let lentilles = product.lenses
for (let f = 0; f < lentilles.length; f++) {
let options = document.createElement('option');
lists.appendChild(options);
selection.textContent = 'Séléctionnez la lentille:';
options.textContent = lentilles[f];  
} 
} 
//couleur des doudou
if (product.colors )  {
let couleurs= product.colors
for (let e = 0; e < couleurs.length; e++) {
let options = document.createElement('option');
lists.appendChild(options);
selection.textContent = 'Séléctionnez la couleur:';
options.textContent = couleurs[e];
  
}

}
}
function storageLocal(product1, btn) {
// objet info produit 

var infoProduit = {
    name: product1.name,
    price: product1.price,
    id: product1._id,
    imageUrl: product1.imageUrl,
    api: api // !!!!!!!!!!!!!!!!!!!!!!! Ajout de l'api à requeter dans le produit
};

var listsProduit = localStorage.getItem('panier') ?
 JSON.parse(localStorage.getItem('panier')) : [];
listsProduit.push(infoProduit);
btn.addEventListener('click', function () {
    localStorage.setItem('panier', JSON.stringify(listsProduit));
});
}