import multer from "multer";


const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits:{fileSize:5*1024*1024}, 
    fileFilter:(req,file,cb)=>{
        if(!file.mimetype.startsWith("image/")){
             console.log("MIME TYPE:", file.mimetype);
            console.log("ORIGINAL NAME:", file.originalname);
            return cb(null,false);
        }
        cb(null,true);
    },
});


export const uploadProductImages = upload.array("productImgs", 5);
export const uploadAvatar = upload.single("avatar");


export default upload;