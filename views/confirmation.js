let ajoutId1= new URLSearchParams(window.location.search); 
let id1 = ajoutId1.get("id");
let prix = ajoutId1.get("prix")

let prixTotale = document.getElementById('prix')
prix.textContent= 'prix totale:' + ' ' + prix + '€';
var identifiant = document.getElementById('identifiant');
identifiant.textContent = 'identifiant achat:' + ' ' + id1;
