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
    xhr.open('GET', url , true)
    xhr.send()
    })
  }

            var getp1 = async function(){
                response= await get('http://localhost:3000/api/cameras')
                var posts = JSON.parse(response)
                return posts
            }
            var getp2 = async function(){
                response= await get('http://localhost:3000/api/teddies')
                var posts = JSON.parse(response)
                return posts
            }
            var getp3 = async function(){
                response= await get('http://localhost:3000/api/furniture')
                var posts = JSON.parse(response)
                return posts
            }

        
          

         var demo = async function(){
             var arr = await Promise.all([getp1(), getp2(), getp3()])
             arr[0].map((prod) => {
                prod['api'] = "cameras";
            })
            arr[1].map((prod) => {
                prod['api'] = "teddies";
            })
            arr[2].map((prod) => {
                prod['api'] = "furniture";
            })
        
             var allproducts = [ arr[0].concat(arr[1] , arr[2])] 
             
             allproducts.forEach(function(products){
                
                 products.forEach(function(produit){
                  console.log(produit)
                  let container = document.getElementById('container')
                  let cartes = document.createElement("section")
    let carte = document.createElement("div")
    let image = document.createElement("img")
    let titre = document.createElement("h3")
    let description = document.createElement("p")
    let prix = document.createElement("h4")
    let btn = document.createElement("a")

    container.appendChild(cartes)
    cartes.appendChild(carte)
    carte.appendChild(image)
    carte.appendChild(titre)
    carte.appendChild(description)
    carte.appendChild(prix)
    carte.appendChild(btn)


    cartes.setAttribute('class' , 'cartes')
    carte.setAttribute('class', 'carte')
    image.setAttribute('class', 'image')
    titre.setAttribute('class' , 'titre')
    description.setAttribute('class' , 'description')
    prix.setAttribute('class' , 'prix')
    btn.setAttribute('button' , 'click')
    btn.setAttribute('class' , 'btn')
   
    titre.textContent = produit.name;
    description.textContent= produit.description;
    prix.textContent= "Prix: " + produit.price + "€" ;
    image.src = produit.imageUrl;
    btn.textContent= "Voir produit"
    btn.addEventListener('click' , function( ){

        btn.href = 'produit.html?id=' + produit._id + '&api=' + produit.api

    })
   })
 })
}
        demo()
