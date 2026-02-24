<<<<<<< HEAD
 import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
 export const deliveryOptions = [{
    id:'1',
    deliveryDays:7,
    priceCents:0
},{
        id:'2',
    deliveryDays:3,
    priceCents:499
},{
        id:'3',
    deliveryDays:1,
    priceCents:999
}];
export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });
    return deliveryOption || deliveryOptions[0]
}

export function calculateDeliveryDate(deliveryOption){
  
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
let dateString ; 
if(deliveryDate.format('dddd')==='Saturday'){
  dateString= deliveryDate.add(2,'days').format('dddd, MMMM D')
}else if(deliveryDate.format('days')==='Sunday'){
  dateString = deliveryDate.add(1,'days').format('dddd, MMMMM D')
}else{
  dateString = deliveryDate.format('dddd, MMMM D')
}
      
      return dateString
=======
 import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
 export const deliveryOptions = [{
    id:'1',
    deliveryDays:7,
    priceCents:0
},{
        id:'2',
    deliveryDays:3,
    priceCents:499
},{
        id:'3',
    deliveryDays:1,
    priceCents:999
}];
export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });
    return deliveryOption || deliveryOptions[0]
}

export function calculateDeliveryDate(deliveryOption){
  
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
let dateString ; 
if(deliveryDate.format('dddd')==='Saturday'){
  dateString= deliveryDate.add(2,'days').format('dddd, MMMM D')
}else if(deliveryDate.format('days')==='Sunday'){
  dateString = deliveryDate.add(1,'days').format('dddd, MMMMM D')
}else{
  dateString = deliveryDate.format('dddd, MMMM D')
}
      
      return dateString
>>>>>>> 2b8896f7e26f7b2ebe62065981dfe16282a1cfa2
}