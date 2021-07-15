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


// Création du constructor Legums
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

const arrOfProducts = [
  peach, cranberry, banana, pineapple, pear,
  cucomber, pepper, carrots, brocolli, pumpkin,
  darkbeans, chickpeas, lentils, peas, beans
];
// la bar de recherche
const input = document.getElementById("searchBar");
input.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredRecipes = arrOfProducts.filter(eachRecipe => {
    return (eachRecipe.name.toLowerCase().includes(searchString));
  });
  displayProductsAsCards(filteredRecipes);
});

const displayProductsAsCards = (anyArr) =>{
  const result =  anyArr.map((item) => {
      return `<div class="card m-2" style="width: 20rem;">
        <img class="card-img-top" src="${item.img}" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name.toUpperCase()}</h5>
          <div class="d-flex justify-content-between">
            <p class="card-text">${item.country}</p>
            <p class="card-text"><strong class="priceValue mx-1">${item.pricePerKilo}</strong><i class="fas fa-euro-sign"></i></p>
            </div>
            <p class="card-text good-for-health_${item.name}"></p>
            <p class="card-text2" id="sugar_${item.name}" style="display:none";></p>
            <p class="d-flex justify-content-between">
              <a href="#" class="btn text-white colored-button" id="btn_${item.name}">En savoir plus</a>
              <i class="fas fa-2x fa-shopping-cart add-shopping"></i>
            </p>
        </div>
      </div>`;
  }).join('');
  document.getElementById('placeForCards').innerHTML = result;
}
displayProductsAsCards(arrOfProducts);

// ${item.goodForHealth()}
