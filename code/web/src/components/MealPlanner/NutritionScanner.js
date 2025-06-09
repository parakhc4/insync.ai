import React, { useState } from 'react';

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
      const base64 = reader.result.split(',')[1]; // remove the "data:image/..." prefix

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
    <div style={{ marginTop: 20 }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && <img src={image} alt="preview" width={200} style={{ marginTop: 10 }} />}
      {loading && <p>Analyzing...</p>}
      {result && (
        <pre
          style={{
            background: '#eee',
            padding: 10,
            whiteSpace: 'pre-wrap',
            marginTop: 10,
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}

export default NutritionScanner;
