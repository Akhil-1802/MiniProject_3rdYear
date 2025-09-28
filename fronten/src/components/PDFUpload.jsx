import { useState } from 'react';

const PDFUpload = ({ onUpload, isDark }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a PDF file');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch('http://localhost:3000/api/transactions/upload-pdf', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        onUpload(result.transactions);
        setFile(null);
        alert(`Successfully extracted ${result.transactions.length} transactions!`);
      } else {
        alert('Error uploading PDF');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading PDF');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
      <h3 className="text-xl font-bold mb-6">Upload PDF Statement</h3>
      
      <div className={`border-2 border-dashed ${isDark ? 'border-gray-700' : 'border-gray-300'} rounded-lg p-8 text-center mb-4`}>
        <div className="text-4xl mb-4">📄</div>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
          {file ? file.name : 'Select a PDF file to analyze'}
        </p>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="pdf-upload"
        />
        <label
          htmlFor="pdf-upload"
          className={`${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer`}
        >
          Browse Files
        </label>
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          !file || uploading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {uploading ? 'Analyzing PDF...' : 'Analyze PDF Statement'}
      </button>
    </div>
  );
};

export default PDFUpload;