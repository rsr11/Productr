

export const ProductType = [`Foods`,`Electronics`,`Clothes`,`Beauty Products`,`Others`];


export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};


// console.log(generateOTP());
