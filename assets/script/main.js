function Products(name, pricePerKilo, season, healthBenefits=[], country, img){
  this.name = name;
  this.pricePerKilo = pricePerKilo;
  this.season = season;
  this.healthBenefits = healthBenefits;
  this.country = country;
  this.img = img;
};
Products.prototype.goodForHealth = function(){
  let allBenefits = '';
  this.healthBenefits.forEach((item, i) => {
    i == (this.healthBenefits.length - 1) ? allBenefits += item+'.' : allBenefits += item +', ';

  })
  //document.getElementById(`good-for-health_${this.name}`) += allBenefits;
  return allBenefits;
}
Products.prototype.displayCards = function(){
  const displayEveryProduct =
   `
  <div class="card" style="width: 20rem;">
    <img class="card-img-top" src="${this.img}" alt="${this.name}">
    <div class="card-body">
      <h5 class="card-title">${this.name.toUpperCase()}</h5>
      <p class="card-text">${this.country}</p>
      <p class="card-text good-for-health_${this.name}">${this.goodForHealth()}</p>
      <p class="card-text2" id="sugar_${this.name}" style="display:none";></p>
      <a href="#" class="btn btn-info" id="btn_${this.name}">En savoir plus</a>
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
console.log(Fruits.prototype.constructor);

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
Fruits.prototype.displaySugarInfo = function(elem){
  document.getElementById(`btn_${elem}`).addEventListener("click", function(){
    console.log(document.getElementById(`btn_${elem}`));
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
const cucomber = new Products('Concombre', '2,5 euros', 'l\'été', ['les intestins', 'le sang', 'le coeur'], 'France', 'assets/img/cucomber.jpg');
cucomber.displayCards();
const peach = new Fruits('peach', '4,5euros', 'l\'été', ['gut', 'heart', 'sang'], 'France', 'assets/img/peach.jpg', 16);
const cranberry = new Fruits('cranberry', '5 euros', 'all', ['gut', 'immune system', 'heart'], 'Canada', 'assets/img/cranberry.jpg', 4.3);
const banana = new Fruits('banana', '1,5 euros', 'all', ['intestins', 'cerveau', 'coeur'], 'République Dominicaine', 'assets/img/banana.jpg', 18.3);
const pineapple = new Fruits('ananas', '3,5 euros', 'all', ['intestins', 'system immunitaire'], 'Paraguay', 'assets/img/pineapple.jpg', 16.3);
peach.displayCards();
peach.goodForHealth();
peach.countSugar();
cucomber.goodForHealth();
cranberry.displayCards();
cranberry.countSugar();
peach.displaySugarInfo(peach.name);
cranberry.displaySugarInfo(cranberry.name);
banana.displayCards();
banana.countSugar();
banana.displaySugarInfo(banana.name);
pineapple.displayCards();
pineapple.countSugar();
pineapple.displaySugarInfo(pineapple.name);
