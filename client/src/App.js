import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const url = 'https://i.pinimg.com/474x/38/9c/ab/389cab4fab3baa1227257cd58e765237.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  return (
    <div className='container'>
      {/* Add meaningful alt text or use an empty string if the image is purely decorative */}
      <img src={url} className='img' alt="File sharing illustration" />
      <div className='wrapper'>
        <h1>Simple file sharing!</h1>
        <p>Upload and share the download link.</p>
        
        <button onClick={onUploadClick}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Add rel="noopener noreferrer" to avoid security risks */}
        {result && (
          <a href={result} target='_blank' rel="noopener noreferrer">
            {result}
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
