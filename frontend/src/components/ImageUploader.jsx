import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { IoCloudUploadOutline, IoImageOutline, IoWarningOutline } from 'react-icons/io5';

const ImageUploader = ({ onUpload, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert("Unsupported file type. Please upload a JPG, JPEG, or PNG image.");
      return;
    }
    // Validate size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File too large. Maximum size is 10MB.");
      return;
    }
    
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const [gender, setGender] = useState('Unisex');
  const [itemType, setItemType] = useState('Top');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      onUpload({ file: selectedFile, gender, itemType });
    }
  };

  const handleClear = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form 
        onSubmit={handleSubmit}
        onDragEnter={handleDrag}
        className="space-y-6"
      >
        <div 
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`dropzone ${dragActive ? 'active' : ''}`}
        >
          {preview ? (
            <div className="relative group overflow-hidden rounded-xl max-h-96 flex items-center justify-center">
              <img 
                src={preview} 
                alt="Upload Preview" 
                className="max-h-80 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors"
                >
                  Change Image
                </button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center py-10 cursor-pointer">
              <IoCloudUploadOutline className="w-16 h-16 text-primary-500 mb-4 animate-bounce-slow" />
              <span className="font-heading font-semibold text-lg text-dark-800 dark:text-dark-200 mb-1">
                Drag & Drop your clothing image
              </span>
              <span className="text-sm text-dark-500 dark:text-dark-400 mb-6">
                Supports JPG, JPEG, PNG (Max 10MB)
              </span>
              <span className="btn-secondary py-2.5 px-5 text-sm">
                Browse Files
              </span>
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={handleChange}
              />
            </label>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-accent-50 dark:bg-accent-950/20 text-accent-600 dark:text-accent-400 border border-accent-100 dark:border-accent-900/30 text-sm">
            <IoWarningOutline className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {selectedFile && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-dark-50 dark:bg-dark-900 p-4 rounded-xl border border-dark-200 dark:border-dark-800">
              <div>
                <label className="block text-sm font-semibold mb-2">Who is this for?</label>
                <select 
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-white dark:bg-dark-950 border border-dark-200 dark:border-dark-700 rounded-lg p-2.5 text-sm outline-none focus:border-primary-500"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">What did you upload?</label>
                <select 
                  value={itemType} 
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full bg-white dark:bg-dark-950 border border-dark-200 dark:border-dark-700 rounded-lg p-2.5 text-sm outline-none focus:border-primary-500"
                >
                  <option value="Top">Top (Shirt, T-Shirt, Jacket)</option>
                  <option value="Bottom">Bottom (Pants, Jeans, Skirt)</option>
                  <option value="Full">Full Outfit (Dress, Suit)</option>
                  <option value="Footwear">Footwear (Shoes, Sneakers)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto px-10 py-3.5 flex items-center justify-center gap-2"
              >
                <IoImageOutline className="w-5 h-5" />
                Analyze Clothes Style
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ImageUploader;
