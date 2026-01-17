import { body } from "express-validator";


export const productValidator = [
    body('name').notEmpty().withMessage("Name is required"),
    body('type').notEmpty().withMessage("type is required"),
    body('quantityInStock').isNumeric(),
    body('mrp').isFloat(),
    body('sellingPrice').isFloat(),
    body('brandName').notEmpty().withMessage("Cannot be empty")
];


