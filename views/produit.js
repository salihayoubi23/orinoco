
        let image = document.getElementById("imageP")
        let titre = document.getElementById("titre")
        let description = document.getElementById("description")
        let prix = document.getElementById("prix")
        let selection= document.getElementById("selection")
        var lists = document.getElementById('lists');
        let btn = document.getElementById("btn")

let ajoutId1= new URLSearchParams(window.location.search); 
console.log(ajoutId1, "test");
let api = ajoutId1.get("api");

let id1 = ajoutId1.get("id");
let url1 = 'http://localhost:3000/api/' + api + '/'+ id1;
let request1 = new XMLHttpRequest();
request1.open('GET', url1);
request1.send()
request1.responseType = 'json';

request1.onload = function () {

    let product1 = request1.response;
    console.log(product1)
    document.title= product1.name
    image.src = product1.imageUrl;
    titre.textContent = product1.name;
    description.textContent= product1.description;
    prix.textContent= "Prix: " + product1.price + "€" ;
   select(product1, lists)
    btn.textContent = 'Ajouter au panier';
    btn.href= 'panier.html'
  
    storageLocal(product1, btn)
    
    }


    function select(product1, lists) {

  if(product1.varnish){
      let vernis= product1.varnish
  for (let j = 0; j < vernis.length; j++) {
    let options = document.createElement('option');
    lists.appendChild(options);
            selection.textContent = 'Séléctionnez le vernis:';
            options.textContent = vernis[j];            
  }  
  }
  if( product1.lenses){
      let lentilles = product1.lenses
  for (let f = 0; f < lentilles.length; f++) {
    let options = document.createElement('option');
    lists.appendChild(options);
            selection.textContent = 'Séléctionnez la lentille:';
            options.textContent = lentilles[f];  
        } 
  } 
 if (product1.colors )  {
     let couleurs= product1.colors
  for (let e = 0; e < couleurs.length; e++) {
    let options = document.createElement('option');
    lists.appendChild(options);
            selection.textContent = 'Séléctionnez la couleur:';
            options.textContent = couleurs[e];
          
        }

      }
    }
    function storageLocal(product1, btn) {
        
        
        var infoProduit = {
            
            name: product1.name,
            price: product1.price,
            id: product1._id,
            qty: 1,
            imageUrl: product1.imageUrl
        };
        var listsProduit = localStorage.getItem('panier') ?
            JSON.parse(localStorage.getItem('panier')) : [];
        listsProduit.push(infoProduit);
        btn.addEventListener('click', function () {
            localStorage.setItem('panier', JSON.stringify(listsProduit));
        });
    }