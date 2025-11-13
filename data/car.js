export class Car {
  #brand;
  #model;
  #speed ;
  isTrunkOpen = false
  constructor(productDetails) {
    this.#brand = productDetails.brand;
    this.#model = productDetails.model;
    this.#speed = 0
  }
  displayInfo(){
    console.log(` your car belong to the brand ${this.#brand} model ${this.#model} speed ${this.#speed}km/hr Trunk status ${this.isTrunkOpen}`)
  }
  go(){

    if(this.isTrunkOpen === true){
        console.log('cannot accelerate trunk is open')
        return
    }
    this.speed +=  5
    if(this.speed > 200){
        this.speed = 200
    }
  
  }
  brake(){
    this.speed -= 5
    if(this.speed < 0){
        this.speed = 0
    }
  }
  openTrunk(){
   if(this.speed === 0){
    this.isTrunkOpen = true
   } else {
    console.log('cannot open while driving')
   }
  }
  closeTrunk(){

    this.isTrunkOpen = false
  
  }
}
const car =new Car(
  {
    brand: "Toyota",

    model: "Corolla",
    
  }
 
);
const car2 =new Car({
     brand:'Tesla',
     model:'Model s',
    

})

class RaceCar extends Car{
    acceleration;
    constructor(productDetails){
        super(productDetails)
        this.acceleration = productDetails.acceleration
        delete this.isTrunkOpen
    }
    go(){
       
        this.speed += this.acceleration
        if(this.speed>300){
            this.speed = 300
        }
    }
      displayInfo(){
    console.log(` your car belong to the brand ${this.brand} model ${this.model} speed ${this.speed} `)
  }
   openTrunk() {
    console.log('Race cars do not have a trunk.');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk.');
  }
}
const RaceCar1 = new RaceCar({
    brand:'Mclaren',
    model:'F1',
    acceleration:29

})
const RaceCar2 = new RaceCar({
    brand:'Ferarri',
    model:'F40',
    acceleration:35

})

//console.log(car)
//console.log(car2)
car.go()
car.brake()
car.openTrunk()


RaceCar2.go()
RaceCar2.go()
RaceCar2.go()
RaceCar2.go()
RaceCar2.go()
RaceCar2.go()
RaceCar2.go()
RaceCar2.go()
RaceCar2.go()

console.log(RaceCar2)
console.log(RaceCar1)
car.go()
car.displayInfo()