'use client';
import React, { useState } from 'react';
import axios from 'axios';
import styles from './home.module.css';

const Home = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('파일을 먼저 선택해 주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('codefile', file);

    try {
      const response = await axios.post('/src/app/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('업로드 성공:', response.data);
    } catch (error) {
      console.error('업로드 실패:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Context</h1>
      </div>
      <div className={styles.uploadContainer}>
        <h1>Upload Code File</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" name="codefile" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default Home;


