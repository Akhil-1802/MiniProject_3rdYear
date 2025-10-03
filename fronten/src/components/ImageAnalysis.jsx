import { useState } from 'react';

const ImageAnalysis = ({ onUpload, isDark, userId, onToast }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    } else {
      alert('Please select an image file');
    }
  };

  const handleUpload = async () => {
    if (!file || !userId) {
      alert('Please make sure you are logged in and an image is selected');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3000/api/transactions/analyze-image', {
        method: 'POST',
        headers: {
          'user-id': userId
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        if (result.transaction) {
          onUpload([result.transaction]);
          setFile(null);
          setPreview(null);
          onToast({ message: 'Successfully extracted transaction from image!', type: 'success' });
        } else {
          onToast({ message: 'No transaction found in image', type: 'warning' });
        }
      } else {
        const errorData = await response.json();
        onToast({ message: errorData.error || 'Failed to analyze image', type: 'error' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      onToast({ message: 'Error analyzing image', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
      <h3 className="text-xl font-bold mb-6">🤖 AI Receipt Analysis</h3>
      
      <div className={`border-2 border-dashed ${isDark ? 'border-gray-700' : 'border-gray-300'} rounded-lg p-8 text-center mb-4`}>
        {preview ? (
          <div className="mb-4">
            <img src={preview} alt="Preview" className="max-w-full max-h-48 mx-auto rounded-lg" />
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2 text-sm`}>{file.name}</p>
          </div>
        ) : (
          <>
            <div className="text-4xl mb-4">📸</div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              Upload Receipt Image
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'} mb-4`}>
              AI will extract transaction details automatically
            </p>
          </>
        )}
        
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer`}
        >
          {preview ? 'Change Image' : 'Browse Images'}
        </label>
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || !userId || uploading}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          !file || uploading
            ? 'bg-gray-400 cursor-not-allowed text-gray-600'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {uploading ? 'AI Analyzing...' : !userId ? 'Please log in' : 'Analyze Receipt'}
      </button>
    </div>
  );
};

export default ImageAnalysis;