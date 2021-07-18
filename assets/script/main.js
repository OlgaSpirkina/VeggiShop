if ($("body").data("title") === "main") {
  // la div principale
  let placeForCards = document.getElementById('placeForCards');
  let shoppingIcons = document.getElementsByClassName('add-shopping');
  const arrForPrices = [];
  let arrForStoredItems = [];
  let counter = 0;
  // Création du prototype contenant les attributs
  function Products(groupName, name, pricePerKilo, season, country, img){
    this.groupName = groupName;
    this.name = name;
    this.pricePerKilo = pricePerKilo;
    this.season = season;
    this.country = country;
    this.img = img;
  };
  // Création d'un nouveau constructeur Fruits qui hérite du Products
  function Fruits(groupName, name, pricePerKilo, season, country, img, sugarLevel){
    Products.call(this, groupName, name, pricePerKilo, season, country, img);
    this.sugarLevel = sugarLevel;
  }
  // La nouvelle class Fruits hérite des méthodes définies dans le prototype de Products().
  Fruits.prototype = Object.create(Products.prototype);
  // Maintenant je veux que Fruits fait référence à son propre constructor
  Fruits.prototype.constructor = Fruits;

  // La nouvelle fonction propre à la class Fruits
  Fruits.prototype.countSugar = function(){
    let howMuchSugar = '';
    if(this.sugarLevel <= 10){
      howMuchSugar += (this.name.charAt(0).toUpperCase() + this.name.slice(1)) + ' est très faible en sucre et son impact sur le taut de sucre dans le sang est modéré';
       return document.getElementById(`paragraphInfo_${this.name}`).innerHTML = howMuchSugar;
    }else if(this.sugarLevel <= 15){
      howMuchSugar += (this.name.charAt(0).toUpperCase() + this.name.slice(1)) + ' il vaut mieux manger ce fruit avec modération, le taut de sucre est assez élevé';
       return document.getElementById(`paragraphInfo_${this.name}`).innerHTML = howMuchSugar;
    }else{
      howMuchSugar += (this.name.charAt(0).toUpperCase() + this.name.slice(1)) + ' est très sucré, manger avec modération et combiner aux éléments contenant des fibres ou de bon gras (comme la beurre de cacahuette par ex.)'
      return document.getElementById(`paragraphInfo_${this.name}`).innerHTML = howMuchSugar;
    }
  }
  // Création du constructor Légumes
  function Vegetables(groupName, name, pricePerKilo, season, country, img, healthBenefits=[]){
    Products.call(this, groupName, name, pricePerKilo, season, country, img);
    this.healthBenefits = healthBenefits;
  }
  Vegetables.prototype = Object.create(Products.prototype);
  Vegetables.prototype.constructor = Vegetables;
  // La methode qui affiche les bienfaits des légumes
  Vegetables.prototype.goodForHealth = function(){
    const unorderedList = document.createElement('ul');
    const titleText = document.createTextNode('Les bienfait pour la santé: ');
    unorderedList.appendChild(titleText);
    this.healthBenefits.forEach(function(item){
      let li = document.createElement('li');
      let listText = document.createTextNode(item);
      li.appendChild(listText);
      unorderedList.appendChild(li);
    })
    return document.getElementById(`paragraphInfo_${this.name}`).innerHTML = unorderedList.innerHTML;
  }
  // Création du constructor Legums (Légumineuses)
  function Legums(groupName, name, pricePerKilo, season, country, img, cookingTime){
    Products.call(this, groupName, name, pricePerKilo, season, country, img);
    this.cookingTime = cookingTime;
  }
  Legums.prototype = Object.create(Products.prototype);
  Legums.prototype.constructor = Legums;
  Legums.prototype.cookIt = function(){
    let timeOfCooking = '';
    this.cookingTime > 30 ? timeOfCooking = ('Soyez pas pressés! le temps de préparation de ' + this.name + ' est long: ' + this.cookingTime + ' min') : timeOfCooking = (this.name + ' se cuit en '+ this.cookingTime + ' min');
    return document.getElementById(`paragraphInfo_${this.name}`).innerHTML = timeOfCooking;
  }
  // Fruits
  const peach = new Fruits('fruits', 'peche', 4.5, 'l\'été', 'France', 'assets/img/peach.jpg', 16);
  const cranberry = new Fruits('fruits', 'cranberry', 5, 'all', 'Canada', 'assets/img/cranberry.jpg', 4.3);
  const banana = new Fruits('fruits', 'bananes', 1.5, 'all', 'République Dominicaine', 'assets/img/banana.jpg', 18.3);
  const pineapple = new Fruits('fruits', 'ananas', 3.5, 'all', 'Paraguay', 'assets/img/pineapple.jpg', 16.3);
  const pear = new Fruits('fruits', 'poire', 3.6, 'all', 'France', 'assets/img/pear.jpg', 13.7);
  // Legumes juste comme instances of Products
  const cucomber = new Vegetables('vegetables', 'concombre', 2.5, 'l\'été', 'France', 'assets/img/cucomber.jpg', ['améliore letransit intestinal', 'calmant naturel', 'vertus diurétiques et drainantes']);
  const pepper = new Vegetables('vegetables', 'piment', 4.6, 'all', 'France', 'assets/img/pepper.jpg', ['source de vitamine C, B6 et K', 'source de fer, de cuivre, de manganèse', 'les artères']);
  const carrots = new Vegetables('vegetables', 'carottes', 3.3, 'all', 'France', 'assets/img/carrots.jpg', ['ralenti le vieillissement', 'améliore l\'état de la peau', 'favoriser la cicatrisation']);
  const brocolli = new Vegetables('vegetables', 'brocoli', 2.1, 'all', 'France', 'assets/img/brocolli.jpg', ['renforce le système immunitaire', 'régule le transit intestinal', 'réduise l\'inflammation']);
  const pumpkin = new Vegetables('vegetables', 'courge', 2.9, 'automn', 'France', 'assets/img/pumpkin.jpg', ['source de vitamine A', 'améliore certaines fonctions du système immunitaire', 'source de calcium, cuivre, fer']);
  // Légumineuses
  const darkbeans = new Legums('legums', 'haricots', 1.5, 'all', 'France', 'assets/img/darkbeans.jpg', 55);
  const chickpeas = new Legums('legums', 'pois-chiche', 1.3, 'all', 'Italie', 'assets/img/chickpeas.jpg', 60);
  const lentils = new Legums('legums', 'lentilles-vertes', 1.6, 'all', 'France', 'assets/img/lentils.jpg', 20);
  const peas = new Legums('legums', 'petit-pois', 2.3, 'spring', 'Espagne', 'assets/img/peas.jpg', 25);
  const beans = new Legums('legums', 'haricots-rouges', 1.9, 'all', 'France', 'assets/img/beans.jpg', 60);
  // le tableau de tout les produits
  const arrOfProducts = [
    peach, cranberry, banana, pineapple, pear,
    cucomber, pepper, carrots, brocolli, pumpkin,
    darkbeans, chickpeas, lentils, peas, beans
  ];
  // la fonction qui génére les cartes
  const displayProductsAsCards = (anyArr) =>{
    const result =  anyArr.map((item) => {
        return `<div class="card m-2 ${item.groupName}" style="width: 20rem;">
          <img class="card-img-top" src="${item.img}" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title"><strong>${item.name.toUpperCase()}</strong></h5>
            <div class="d-flex justify-content-between">
              <p class="card-text">${item.country}</p>
              <p class="card-text"><strong class="priceValue mx-1">${item.pricePerKilo}</strong><i class="fas fa-euro-sign"></i></p>
              </div>
              <p class="card-text good-for-health_${item.name}"></p>
              <p class="card-text2 ${item.name}" id="paragraphInfo_${item.name}" style="display:none"></p>
              <p class="d-flex justify-content-between">
                <button class="btn text-white colored-button ${item.name}" id="btn_${item.name}">En savoir plus</button>
                <i id="${item.name}" class="fas fa-2x fa-shopping-cart add-shopping ${item.name}"></i>
              </p>
          </div>
        </div>`;
    }).join('');
    placeForCards.innerHTML = result;
  }
  displayProductsAsCards(arrOfProducts);
  // la bar de recherche
  const input = document.getElementById("searchBar");
  input.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredRecipes = arrOfProducts.filter(eachRecipe => {
      return (eachRecipe.name.toLowerCase().includes(searchString));
    });
    displayProductsAsCards(filteredRecipes);
  });
  // Le bouton voir plus voir moins
  const btnSeeMore = document.getElementById('btn-see-more');
  const legumsClass = document.getElementsByClassName('legums');
  btnSeeMore.addEventListener('click', function(e){
    btnSeeMore.innerHTML = (btnSeeMore.innerHTML == 'Voir Moins') ? 'Voir Plus...' : 'Voir Moins';
    for(let i=0; i< legumsClass.length; i++){
    legumsClass[i].style.display = (legumsClass[i].style.display == 'none') ? 'block' : 'none';
    }
  })
  // Création des boutons de catégories: Légumes, Fruits, Légumineuses, Tout voir
  const divForButtons = document.getElementById('placeForButtons');
  const vegetables = document.createElement('button');
  const fruits = document.createElement('button');
  const legums = document.createElement('button');
  const allProducts = document.createElement('button');
  function setAttributes(el, options) {
   Object.keys(options).forEach(function(attr) {
     el.setAttribute(attr, options[attr]);
   })
  }
  const addText = (text, parent) =>{
    let elem = document.createTextNode(text);
    parent.appendChild(elem);
  }
  setAttributes(vegetables, {"class": "btn text-white btn-maingreen categories", "type": "button", "name": "vegetables", "id": "vegetables"});
  addText('Légumes', vegetables);
  setAttributes(fruits, {"class": "btn text-white btn-maingreen categories", "type": "button", "name": "fruits", "id": "fruits"});
  addText('Fruits', fruits);
  setAttributes(legums, {"class": "btn text-white btn-maingreen categories", "type": "button", "name": "legums", "id": "legums"});
  addText('Légumineuses', legums);
  setAttributes(allProducts, {"class": "btn text-white btn-maingreen categories", "type": "button", "name": "allProducts", "id": "all"});
  addText('Voir tout', allProducts);
  divForButtons.appendChild(vegetables);
  divForButtons.appendChild(fruits);
  divForButtons.appendChild(legums);
  divForButtons.appendChild(allProducts);
  // Les boutons sont reliés aux catégories des produits
  let btnCategories = document.getElementsByClassName('categories');
  for(let i=0; i<btnCategories.length; i++){
    let buttonId = btnCategories[i].id;
    btnCategories[i].addEventListener('click', function(){
      document.getElementById('btn-see-more').style.display = 'none';
      for(let j=0; j<arrOfProducts.length; j++){
        if(arrOfProducts[j].groupName == buttonId){
          const categoryFilter = arrOfProducts.filter(eachCategory => {
            return (eachCategory.groupName.toLowerCase().includes(buttonId));
          });
          displayProductsAsCards(categoryFilter);
        }else if(buttonId == 'all'){
          document.getElementById('btn-see-more').style.display = 'block';
          displayProductsAsCards(arrOfProducts);
          }
        }
    })
  }
  // la fonction qui permet de montrer les info sur le taut de sucre et mettre les produits dans le panier.
  // Le calcule du taut de sucre se fait dans la fonction prototype, mais l'affichage avec un event listener du parent global la div #placeForCards
  let shoppingIconsClicksCountArr = new Array(shoppingIcons.length);
  for(let i=0; i<shoppingIconsClicksCountArr.length; i++){
    shoppingIconsClicksCountArr[i] = 0;
  }
  placeForCards.onclick = function(event) {
    let buttonInfo = event.target.closest('button');
    let iconShopping = event.target.closest('i');
      if(!buttonInfo && !iconShopping){
        return;
      }else if(!placeForCards.contains(buttonInfo) && !placeForCards.contains(iconShopping)){
        return;
      }else if(placeForCards.contains(buttonInfo)){
        arrOfProducts.forEach((item) => {
          // for(let i=0; i<arrOfProducts.length; i++){
            if(buttonInfo.classList.contains(`${item.name}`) && document.getElementById(`paragraphInfo_${item.name}`).classList.contains(`${item.name}`)){
  // Afficher des infos supplementaire sur les fruits, légumes et légumineuses
              if(item.groupName == 'fruits'){
                document.getElementById(`paragraphInfo_${item.name}`).style.display = (document.getElementById(`paragraphInfo_${item.name}`).style.display == 'none') ? 'block' : 'none';
                item.countSugar();
              }else if(item.groupName == 'vegetables'){
                document.getElementById(`paragraphInfo_${item.name}`).style.display = (document.getElementById(`paragraphInfo_${item.name}`).style.display == 'none') ? 'block' : 'none';
                item.goodForHealth();
              }else if(item.groupName == 'legums'){
                item.cookIt();
                document.getElementById(`paragraphInfo_${item.name}`).style.display = (document.getElementById(`paragraphInfo_${item.name}`).style.display == 'none') ? 'block' : 'none';
              }
          }
        // }
        });


    // Mettre les produits dans le panier et les afficher sur la page cart.html grâce à localStorage
      }else if(placeForCards.contains(iconShopping)){
        document.getElementById('number-of-items').style.visibility = 'visible'; // le compteur sur la navbar est affiché et activé pour afficher la
        document.getElementById('number-of-items').innerHTML = ++counter; // le nombre total des produits choisis
        for(let i=0; i<shoppingIcons.length; i++){
          for(let j=0; j<arrOfProducts.length; j++){
            if((iconShopping.id == `${arrOfProducts[j].name}`) && (shoppingIcons[i].classList.contains(`${arrOfProducts[j].name}`))){
              console.log(`here ${arrOfProducts[j].name}`);
              shoppingIcons[i].textContent = ++shoppingIconsClicksCountArr[i]; // le compteur individuel de chaque produit
              arrForStoredItems.push( // chaque produit est stocké dans un objet et chaque objet est rajouté dans un tableau
              {
                count: shoppingIcons[i].textContent,
                image: arrOfProducts[j].img,
                text: arrOfProducts[j].name,
                unityPrice: parseFloat(arrOfProducts[j].pricePerKilo, 10),
                totalPrice: arrOfProducts[j].pricePerKilo * parseFloat(shoppingIcons[i].textContent, 10)
              });
              localStorage.setItem("storeObj", JSON.stringify(arrForStoredItems)) // le tableau contenant tout les objets-produit est
        // sauvegardé en format 'string' grâce à JSON.stringify et ce string est placé dans localStorage nommé "storeObj"
            }
          }
        }
      }
    }
// les fonctions qui concernent la page 'cart.html'
}else{
  // Session storage
  const testIt = () =>{
// récupérer l'objet sauvegardé sur localStorage en format string et le transformer en objet avec JSON.parse
    var objectJSON = JSON.parse(localStorage.getItem("storeObj"));
    // console.log(objectJSON);
// la fonction qui permet d'éliminer les doublons des objets
    function getUniqueListBy(arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()] // s'il y a des doublons un seul sera sauvegarder
    }
    const unique = getUniqueListBy(objectJSON, 'text'); // la clé pour faire la comparaison c'est le 'text'
    for(let i=0; i<unique.length; i++){
      let sum = [];
      document.getElementById('displayIt').innerHTML +=
      `<div id="maindiv_${unique[i].text}" class="delete_${unique[i].text} m-2 p-2" style="border:1px solid grey">
        <img src="${unique[i].image}" alt="${unique[i].text}" style="width:15rem"/>
        <p>${unique[i].text}</p>
        <p>Prix au kilo: ${unique[i].unityPrice} euros</p>
        <p id="totalPriceParagraph_${unique[i].text}">Prix total: <strong class="total-price" id="totalPrice_${unique[i].text}">${unique[i].totalPrice}</strong> euros</p>
        <p>Quantité: <span><i class="fas fa-minus mx-2"></i></span><strong class="${unique[i].text}_${unique[i].unityPrice}">${unique[i].count}</strong><i class="fas fa-plus mx-2"></i><small class="small delete_${unique[i].text}">Supprimer</small></p>
      </div>
      `
    }
      displayIt.onclick = function(event) {
        let deleteIt = event.target.closest('small');
          if(!deleteIt){
            return;
          }else if(!displayIt.contains(deleteIt)){
            return;
          }else if(displayIt.contains(deleteIt)){
            for(let i=0; i<unique.length; i++){
            if(deleteIt.classList.contains(`delete_${unique[i].text}`) && document.getElementById(`maindiv_${unique[i].text}`).classList.contains(`delete_${unique[i].text}`)){
              document.getElementById(`maindiv_${unique[i].text}`).style.display = 'none';
            }
          }
        }
      }
      const minus = document.getElementsByClassName('fa-minus');
      for(let i=0; i<minus.length; i++){
        minus[i].addEventListener('click', function(){
          let quantity = document.getElementsByClassName(`${unique[i].text}_${unique[i].unityPrice}`);
          for(j=0; j<quantity.length; j++){
            console.log(quantity[j].innerHTML);
            let oldQuantity = parseFloat(quantity[j].innerHTML);
            let newQuantity = oldQuantity - 1;
            document.getElementById(`totalPrice_${unique[i].text}`).innerHTML = parseFloat(document.getElementById(`totalPrice_${unique[i].text}`).innerHTML - `${unique[i].unityPrice}`).toFixed(1);
            if(quantity[j].innerHTML == 0){
              return
            }
            document.getElementById(`totalPrice_${unique[i].text}`).innerHTML <= 0 ? document.getElementById(`totalPriceParagraph_${unique[i].text}`).style.display = "none" : "block";
            return quantity[j].innerHTML = newQuantity;
          }
        })
      }
      const plus = document.getElementsByClassName('fa-plus');
      for(let i=0; i<plus.length; i++){
        plus[i].addEventListener('click', function(){
          let parsedUnity = parseFloat(`${unique[i].unityPrice}`, 10);
          let parsedTotal = parseFloat(document.getElementById(`totalPrice_${unique[i].text}`).innerHTML, 10);
          let quantity = document.getElementsByClassName(`${unique[i].text}_${unique[i].unityPrice}`);
          for(j=0; j<quantity.length; j++){
            console.log(quantity[j].innerHTML);
            let oldquantity = parseFloat(quantity[j].innerHTML);
            let newquantity = oldquantity + 1;
            // newquantity =
            document.getElementById(`totalPrice_${unique[i].text}`).innerHTML = parseFloat(parsedTotal += parsedUnity).toFixed(1);
            document.getElementById(`totalPrice_${unique[i].text}`).innerHTML > 0 ? document.getElementById(`totalPriceParagraph_${unique[i].text}`).style.display = "block" : "none";
            return quantity[j].innerHTML = newquantity;
          }
        })
      }
// La somme totale du panier
      // window.addEventListener('load', function () {
      //   let everySum = () =>{
      //   const totalPrice = document.getElementsByClassName('total-price');
      //   for(let j=0; j<totalPrice.length; j++){
      //     let sumIt = 0;
      //     sumIt += parseFloat(totalPrice[j].innerHTML, 10);
      //     console.log(parseFloat(totalPrice[j].innerHTML, 10));
      //     }
      //   }
      //   everySum();
      // })
    }
  testIt();
}
