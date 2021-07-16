// la div principale
let placeForCards = document.getElementById('placeForCards');
const arrForPrices = [];
let counter = 1;
// Création du prototype contenant les attributs
function Products(groupName, name, pricePerKilo, season, healthBenefits=[], country, img){
  this.groupName = groupName;
  this.name = name;
  this.pricePerKilo = pricePerKilo;
  this.season = season;
  this.healthBenefits = healthBenefits;
  this.country = country;
  this.img = img;
};
// les methodes du prototype est crée à part
Products.prototype.goodForHealth = function(){
  let allBenefits = '';
  this.healthBenefits.forEach((item, i) => {
    i == (this.healthBenefits.length - 1) ? allBenefits += item+'.' : allBenefits += item +', ';
  })
  return allBenefits;
}
// Création d'un nouveau constructeur Fruits qui hérite du Products
function Fruits(groupName, name, pricePerKilo, season, healthBenefits=[], country, img, sugarLevel){
  Products.call(this, groupName, name, pricePerKilo, season, healthBenefits, country, img);
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
     return document.getElementById(`paragraphSugar_${this.name}`).innerHTML += howMuchSugar;
  }else if(this.sugarLevel <= 15){
    howMuchSugar += (this.name.charAt(0).toUpperCase() + this.name.slice(1)) + ' il vaut mieux manger ce fruit avec modération, le taut de sucre est assez élevé';
     return document.getElementById(`paragraphSugar_${this.name}`).innerHTML += howMuchSugar;
  }else{
    howMuchSugar += (this.name.charAt(0).toUpperCase() + this.name.slice(1)) + ' est très sucré, manger avec modération et combiner aux éléments contenant des fibres ou de bon gras (comme la beurre de cacahuette par ex.)'
    return document.getElementById(`paragraphSugar_${this.name}`).innerHTML += howMuchSugar;
  }
}
// Création du constructor Legums (Légumineuses)
function Legums(groupName, name, pricePerKilo, season, healthBenefits=[], country, img, cookingTime){
  Products.call(this, groupName, name, pricePerKilo, season, healthBenefits, country, img);
  this.cookingTime = cookingTime;
}
Legums.prototype = Object.create(Products.prototype);
Legums.prototype.constructor = Legums;
Legums.prototype.cookIt = function(){
  let timeOfCooking = '';
  this.cookingTime > 30 ? timeOfCooking = 'Soyez pas pressés! le temps de préparation de ' + this.name + ' est long: ' + this.cookingTime + ' min' : timeOfCooking = this.name + ' se cuit en '+ this.cookingTime + ' min';
  return timeOfCooking;
}
// Fruits
const peach = new Fruits('fruits', 'peach', 4.5, 'l\'été', ['gut', 'heart', 'sang'], 'France', 'assets/img/peach.jpg', 16);
const cranberry = new Fruits('fruits', 'cranberry', 5, 'all', ['gut', 'immune system', 'heart'], 'Canada', 'assets/img/cranberry.jpg', 4.3);
const banana = new Fruits('fruits', 'banana', 1.5, 'all', ['intestins', 'cerveau', 'coeur'], 'République Dominicaine', 'assets/img/banana.jpg', 18.3);
const pineapple = new Fruits('fruits', 'ananas', 3.5, 'all', ['intestins', 'system immunitaire'], 'Paraguay', 'assets/img/pineapple.jpg', 16.3);
const pear = new Fruits('fruits', 'poire', 3.6, 'all', ['système immunitaire', 'coeur'], 'France', 'assets/img/pear.jpg', 13.7);
// Legumes juste comme instances of Products
const cucomber = new Products('vegetables', 'concombre', 2.5, 'l\'été', ['les intestins', 'le sang', 'le coeur'], 'France', 'assets/img/cucomber.jpg');
const pepper = new Products('vegetables', 'piment', 4.6, 'all', ['les intestins', 'le coeur', 'les artères'], 'France', 'assets/img/pepper.jpg');
const carrots = new Products('vegetables', 'carottes, la botte', 3.3, 'all', ['les intestins', 'la vue', 'la peau'], 'France', 'assets/img/carrots.jpg');
const brocolli = new Products('vegetables', 'brocolli', 2.1, 'all', ['les intestins', 'le sang'], 'France', 'assets/img/brocolli.jpg');
const pumpkin = new Products('vegetables', 'courge', 2.9, 'automn', ['les intestins', 'la peau'], 'France', 'assets/img/pumpkin.jpg');
// Légumineuses
const darkbeans = new Legums('legums', 'haricots', 1.5, 'all', ['les muscles', 'les intestins'], 'France', 'assets/img/darkbeans.jpg', 55);
const chickpeas = new Legums('legums', 'pois chiche', 1.3, 'all', ['les muscles', 'les intestins'], 'Italie', 'assets/img/chickpeas.jpg', 60);
const lentils = new Legums('legums', 'lentilles vertes', 1.6, 'all', ['les muscles', 'les intestins'], 'France', 'assets/img/lentils.jpg', 20);
const peas = new Legums('legums', 'petit pois', 2.3, 'spring', ['le coeur', 'les intestins'], 'Espagne', 'assets/img/peas.jpg', 25);
const beans = new Legums('legums', 'haricots rouges', 1.9, 'all', ['les muscles', 'les intestins'], 'France', 'assets/img/beans.jpg', 60);
// le tableau de tout les produits
const arrOfProducts = [
  peach, cranberry, banana, pineapple, pear,
  cucomber, pepper, carrots, brocolli, pumpkin,
  darkbeans, chickpeas, lentils, peas, beans
];
// Les Prix. Au click sur le panier d'achat de chaque article:
  // -le prix est récupéré dans le tableau arrForPrices,
  // -le panier de la navbar est visible,
  // -le compteur du panier sur la navbar est activé
  // la somme des prix de tout les articles
const countShopping = () =>{
  let shoppingIcons = document.getElementsByClassName('add-shopping');
  let priceValue = document.getElementsByClassName('priceValue');
  for(let i=0; i<shoppingIcons.length; i++){
    shoppingIcons[i].addEventListener('click', function(){
      document.getElementById('number-of-items').style.visibility = 'visible';
      document.getElementById('number-of-items').innerHTML = counter++;
      shoppingIcons[i].classList.add('price_'+i);
      priceValue[i].classList.add('price_'+i);
      if(shoppingIcons[i].classList.contains('price_'+i) && priceValue[i].classList.contains('price_'+i)){
        arrForPrices.push(parseFloat(priceValue[i].innerHTML, 10));
        displayPrices();
        return arrForPrices;
      }
    })
  }
}
const displayPrices = () =>{
  let sum = '';
  sum += arrForPrices.reduce((a, b) => a + b, 0);
  console.log(sum);
  return sum;
}
displayPrices();
// la bar de recherche
const input = document.getElementById("searchBar");
input.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredRecipes = arrOfProducts.filter(eachRecipe => {
    return (eachRecipe.name.toLowerCase().includes(searchString));
  });
  displayProductsAsCards(filteredRecipes);
});
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
            <p class="card-text good-for-health_${item.name}">${item.goodForHealth()}</p>
            <p class="card-text2 ${item.name}" id="paragraphSugar_${item.name}" style="display:none";></p>
            <p class="d-flex justify-content-between">
              <button class="btn text-white colored-button ${item.name}" id="btn_${item.name}">En savoir plus</button>
              <i class="fas fa-2x fa-shopping-cart add-shopping"></i>
            </p>
        </div>
      </div>`;
  }).join('');
  placeForCards.innerHTML = result;
  countShopping();
}
displayProductsAsCards(arrOfProducts);
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
// la fonction qui permet de montrer les info sur le taut de sucre. Le calcule du taut de sucre
// se fait dans la fonction prototype, mais l'affichage avec un event listener du parent global la div #placeForCards
placeForCards.onclick = function(event) {
  let buttonSugar = event.target.closest('button');
    if(!buttonSugar){
      return;
    }else if(!placeForCards.contains(buttonSugar)){
      return;
    }else{
      for(let i=0; i<arrOfProducts.length; i++){
        if(buttonSugar.classList.contains(`${arrOfProducts[i].name}`) && document.getElementById(`paragraphSugar_${arrOfProducts[i].name}`).classList.contains(`${arrOfProducts[i].name}`)){
        document.getElementById(`paragraphSugar_${arrOfProducts[i].name}`).style.display = (document.getElementById(`paragraphSugar_${arrOfProducts[i].name}`).style.display == 'none') ? 'block' : 'none';
        arrOfProducts[i].countSugar(); // permet d'afficher l'info supplementaire sur les fruits
        // the same thing but with a button cookIt arrOfProducts[i].cookIt();
      }
    }
  }
}
