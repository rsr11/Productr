import multer from "multer";


const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits:{fileSize:2*1024*1024},
    fileFilter:(req,res,cb)=>{
        if(!file.mimetype.startsWith("images/")){
            return cb(new Error("Only images file allowed"),false);
        }
        cb(null,true);
    },
});


export const uploadProductImages = upload.array("productImgs", 5);
export const uploadAvatar = upload.single("avatar");


export default upload;