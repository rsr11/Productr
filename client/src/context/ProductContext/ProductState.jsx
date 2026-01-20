import {useState } from "react";
// import UserDetail from "./user.js";
// import axios from "axios";
import ProductDetail from "./product.js";


const ProductState = (props)=>{

    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [isEditingOn, setIsEditingOn] = useState({status:false,productId:""});


    

    return (
        <ProductDetail.Provider value={{isProductFormOpen, setIsProductFormOpen,isEditingOn, setIsEditingOn}}>
            {props.children}
        </ProductDetail.Provider>
    )

};

export default ProductState