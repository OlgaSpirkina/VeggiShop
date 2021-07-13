// Création du prototype contenant les attributs
function Products(name, pricePerKilo, season, healthBenefits=[], country, img){
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
// La methode principale qui affiche les cartes et appelle une autre methode pour afficher les bénéfices pour la santé
Products.prototype.displayCards = function(){
  const displayEveryProduct =
   `
  <div class="card m-2" style="width: 20rem;">
    <img class="card-img-top" src="${this.img}" alt="${this.name}">
    <div class="card-body">
      <h5 class="card-title">${this.name.toUpperCase()}</h5>
      <div class="d-flex justify-content-between">
        <p class="card-text">${this.country}</p>
        <p class="card-text"><strong class="priceValue mx-1">${this.pricePerKilo}</strong><i class="fas fa-euro-sign"></i></p>
      </div>
      <p class="card-text good-for-health_${this.name}">${this.goodForHealth()}</p>
      <p class="card-text2" id="sugar_${this.name}" style="display:none";></p>
      <p class="d-flex justify-content-between">
        <a href="#" class="btn text-white colored-button" id="btn_${this.name}">En savoir plus</a>
        <i class="fas fa-2x fa-shopping-cart add-shopping"></i>
      </p>
    </div>
  </div>
  `
 return document.getElementById('placeForCards').innerHTML += displayEveryProduct;
}
// Création d'un nouveau constructeur Fruits qui hérite du Products
function Fruits(name, pricePerKilo, season, healthBenefits=[], country, img, sugarLevel){
  Products.call(this, name, pricePerKilo, season, healthBenefits, country, img);
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
     return document.getElementById(`sugar_${this.name}`).innerHTML += howMuchSugar;
  }else if(this.sugarLevel <= 15){
    howMuchSugar += (this.name.charAt(0).toUpperCase() + this.name.slice(1)) + ' il vaut mieux manger ce fruit avec modération, le taut de sucre est assez élevé';
     return document.getElementById(`sugar_${this.name}`).innerHTML += howMuchSugar;
  }else{
    howMuchSugar += (this.name.charAt(0).toUpperCase() + this.name.slice(1)) + ' est très sucré, manger avec modération et combiner avec des éléments contenant des fibres ou de bon gras (comme la beurre de cacahuette par ex.)'
    return document.getElementById(`sugar_${this.name}`).innerHTML += howMuchSugar;
  }
}
// Pour afficher les info supplementaire sur le click du bouton
Fruits.prototype.displaySugarInfo = function(){
  let elem = this.name;
  document.getElementById(`btn_${elem}`).addEventListener("click", function(){
    document.getElementById(`sugar_${elem}`).style.display = (document.getElementById(`sugar_${elem}`).style.display == 'none') ? 'block' : 'none';
  });
}

// Création du constructor Legums
function Legums(name, pricePerKilo, season, healthBenefits=[], country, img, cookingTime){
  Products.call(this, name, pricePerKilo, season, healthBenefits, country, img);
  this.cookingTime = cookingTime;
}
Legums.prototype = Object.create(Products.prototype);
Legums.prototype.constructor = Legums;
Legums.prototype.cookIt = function(){
  let timeOfCooking = '';
  this.cookingTime > 30 ? timeOfCooking = 'Soyez pas pressés! le temps de préparation de ' + this.name + ' est long: ' + this.cookingTime + ' min' : timeOfCooking = this.name + ' se cuit en '+ this.cookingTime + ' min';
  return timeOfCooking;
}


// Les Fonctions indépendentes
// Au click sur le panier d'achat de chaque article:
  // -le prix est récupéré dans le tableau arrForPrices,
  // -le panier de la navbar est visible,
  // -le compteur du panier sur la navbar est activé
  const arrForPrices = [];
function countShopping(){
  let counter = 1;
  let addShoppingCart = document.getElementsByClassName('add-shopping');
  let priceValue = document.getElementsByClassName('priceValue');
  for(let i=0; i<addShoppingCart.length; i++){
    addShoppingCart[i].addEventListener('click', function(){
      addShoppingCart[i].classList.add('price_'+i);
      priceValue[i].classList.add('price_'+i);
      document.getElementById('number-of-items').style.visibility = 'visible';
      document.getElementById('number-of-items').innerHTML = counter++;
      if(addShoppingCart[i].classList.contains('price_'+i) && priceValue[i].classList.contains('price_'+i)){
        arrForPrices.push(parseFloat(priceValue[i].innerHTML, 10));
        displayPrices();
        return arrForPrices;
      }
    });
  }

}
// la somme des prix de tout les articles
const displayPrices = () =>{
  let sum = '';
  sum += arrForPrices.reduce((a, b) => a + b, 0);
  console.log(sum);
  return sum;
}
// Création des instances


const peach = new Fruits('peach', 4.5, 'l\'été', ['gut', 'heart', 'sang'], 'France', 'assets/img/peach.jpg', 16);
const cranberry = new Fruits('cranberry', 5, 'all', ['gut', 'immune system', 'heart'], 'Canada', 'assets/img/cranberry.jpg', 4.3);
const banana = new Fruits('banana', 1.5, 'all', ['intestins', 'cerveau', 'coeur'], 'République Dominicaine', 'assets/img/banana.jpg', 18.3);
const pineapple = new Fruits('ananas', 3.5, 'all', ['intestins', 'system immunitaire'], 'Paraguay', 'assets/img/pineapple.jpg', 16.3);
const pear = new Fruits('poire', 3.6, 'all', ['système immunitaire', 'coeur'], 'France', 'assets/img/pear.jpg', 13.7);
const cucomber = new Products('Concombre', 2.5, 'l\'été', ['les intestins', 'le sang', 'le coeur'], 'France', 'assets/img/cucomber.jpg');

peach.displayCards();
pineapple.displayCards();
cranberry.displayCards();
banana.displayCards();
pear.displayCards();
cucomber.displayCards();
peach.countSugar();
banana.countSugar();
pear.countSugar();
cranberry.countSugar();
pineapple.countSugar();
pineapple.displaySugarInfo();
peach.displaySugarInfo();
banana.displaySugarInfo();
pear.displaySugarInfo();
cranberry.displaySugarInfo();
  countShopping();
