import { v2 as cloudinary } from "cloudinary";

export const uploadInCloudnary = async (files)=>{
       const imageUrls = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { folder: "products",
          transformation:[
        {width:800,height:800,crop:'limit'},
         {quality:'auto', fetch_format:"auto"}
          ]
         }
      );
      imageUrls.push(result.secure_url);
    }

    return imageUrls;
}