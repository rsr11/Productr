import { body } from "express-validator";


export const registrationValidation = [
   body('name').notEmpty().withMessage("Name is required!"),
   body('email').isEmail().withMessage("Invalid email format"),
   body('mobile').notEmpty().withMessage("Mobile number is required").matches(/^\+91[6-9]\d{9}$/).withMessage("Mobile number must be in format +91XXXXXXXXXX")
];



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