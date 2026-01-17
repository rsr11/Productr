import { body } from "express-validator";
import validator from "validator";



export const loginValidation = [
    body("identifier")
    .notEmpty()
    .withMessage("Email or mobile is required")
    .custom((value) => {
      const isIndianMobile = /^\+91[6-9]\d{9}$/.test(value);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!isIndianMobile && !isEmail) {
        throw new Error("Enter a valid email or Indian mobile number");
      }

      return true;
    })
];


export const validateLoginInput = (value) => {
  if (!value) {
    console.log("Email or mobile number is required");
    return {ok:false,msg:"Email or mobile number is required"};
  };

  if (validator.isMobilePhone(value, "en-IN")) {
    return {ok:true, type: "mobile", value };
  };

  if (validator.isEmail(value)) {
    return {ok:true, type: "email", value };
  };

  console.log("Invalid email or mobile number");
  return {ok:false,msg:"Invalid email or mobile number"};
};