
let ajax = function (url) {
    // On renvoie une promesse qui prend en paramettre une fonction 
    // avec 2 paramètres, le callback de succès et d'erreur
    return new Promise(function (resolve, reject) {
      // Le reste du code ressemble à la méthode précédente
      let req = new XMLHttpRequest()
      req.open('GET', url, true)
      
      req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
           if(req.status == 200)
             resolve(JSON.parse(req.response))
           else
             reject(req)
        }
      };
      req.send(null)
     
    })
  }
  Promise.all([
    ajax('http://localhost:3000/api/cameras?id'),
    ajax('http://localhost:3000/api/teddies?id'),
    ajax('http://localhost:3000/api/furniture?id')
  ]).then(function (responses) {
    
    arr=[ responses[0].concat(responses[1].concat(responses[2]))]
      var  produit= arr[0]
      var prod = produit.find()
      console.log(produit)
 let image = document.getElementById("imageP")
let titre = document.getElementById("titre")
let description = document.getElementById("description")
let prix = document.getElementById("prix")
let selection= document.getElementById("selection")
var lists = document.getElementById('lists');
let btn = document.getElementById("btn")
       
document.title= produit.name
titre.textContent = produit.name;
description.textContent= produit.description;
prix.textContent= "Prix: " + produit.price + "€" ;
image.src = produit.imageUrl;
// select(produit, lists)
btn.textContent= "Ajouter au panier"
btn.href= 'panier.html'

  }).catch(function (errors) { })
 