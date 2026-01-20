import { useState } from "react";
import "./imageUpload.css";

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h3>Upload Product Images</h3>
        <label className="add-more">
          Add More Photos
          <input
            type="file"
            multiple
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </label>
      </div>

      <div className="upload-box">
        {images.map((img, index) => (
          <div className="image-card" key={index}>
            <img src={img.preview} alt="preview" />
            <button
              className="remove-btn"
              onClick={() => removeImage(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
