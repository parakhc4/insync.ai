import React, { useState } from 'react';
import './NutritionScanner.css';

function NutritionScanner() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(',')[1];

      try {
        const res = await fetch('http://localhost:5001/analyze-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64 }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Server error ${res.status}: ${errorText.slice(0, 100)}...`);
        }

        const data = await res.json();
        setResult(data.result || data.error || "No response");
      } catch (err) {
        setResult("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
    setImage(URL.createObjectURL(file));
  };

  return (
    <div className="nutrition-scanner">
      <h2 className="section-title">📸 Nutrition Scanner</h2>
      <label className="upload-box">
      <img src="/images/upload.png" alt="Upload" className="upload-icon" />
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </label>


      {image && (
        <div className="preview">
          <img src={image} alt="preview" className="preview-img" />
        </div>
      )}

      {loading && <p className="loading-text">Analyzing...</p>}

      {result && (
        <div className="result-box">
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default NutritionScanner;
