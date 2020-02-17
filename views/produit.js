
        let image = document.getElementById("imageP")
        let titre = document.getElementById("titre")
        let description = document.getElementById("description")
        let prix = document.getElementById("prix")
        let selection= document.getElementById("selection")
        var lists = document.getElementById('lists');
        let btn = document.getElementById("btn")

let ajoutId1= new URLSearchParams(window.location.search); 
let id1 = ajoutId1.get("id");
let url1 = 'http://localhost:3000/api/teddies/';
let request1 = new XMLHttpRequest();
request1.open('GET', url1 + id1);
request1.send()
request1.responseType = 'json';

request1.onload = function () {

    let product1 = request1.response;
    image.src = product1.imageUrl;
    titre.textContent = product1.name;
    description.textContent= product1.description;
    selection.textContent = 'Séléctionnez la couleur:';
    prix.textContent= "Prix: " + product1.price + "€" ;
    selectcouleurs(product1, lists);
    btn.textContent = 'Ajouter au panier';
    btn.href= 'panier.html'

    function selectcouleurs(product1, lists) {
        let couleurs = product1.colors;
        for (let e = 0; e < couleurs.length; e++) {
            let options = document.createElement('option');
            options.textContent = couleurs[e];
            lists.appendChild(options);
        }
    }

};



   



