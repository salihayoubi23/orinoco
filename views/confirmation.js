
let ajoutId1= new URLSearchParams(window.location.search); 
let id1 = ajoutId1.get("id");
let prix = ajoutId1.get("price")
// recuperation du prix et orderId specifique a chaque produit 
let prixTotale = document.getElementById('prix')
console.log(prix)
prixTotale.textContent = 'prix totale:' + ' ' + prix + '€';
var identifiant = document.getElementById('identifiant');
console.log(id1)
identifiant.textContent = 'identifiant achat:' + ' ' + id1;
