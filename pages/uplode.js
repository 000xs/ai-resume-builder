import { uplodeBucket } from '@/utils/uplode';
import React, { useState } from 'react';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = async(event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL
    
    try {
        alert('Uploading file...');
        const response = await uplodeBucket(file);
        console.log('Upload successful:', response);
        alert('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file.');
      }
    }
  };

 

  
  return (
    <div className="image-uploader">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div>
          <h3>Image Preview:</h3>
          <img src={previewUrl} alt="Image Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
        </div>
      )}
       
    </div>
  );
};

export default ImageUploader;
