"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
// import { ClipLoader } from 'react-spinners';
import styles from './analysis.module.css';

const AnalysisPage = () => {
  const { id } = useSearchParams();
  const [analysisResult, setAnalysisResult] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchAnalysisResult = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analyze/${id}`);
          setAnalysisResult(response.data);
        } catch (error) {
          console.error('분석 결과 가져오기 실패:', error.response ? error.response.data : error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchAnalysisResult();
    }
  }, [id]);

  return (
    <div className={styles.container}>
        <h1>Report</h1>
        {/* {loading ? (
          <ClipLoader size={24} color="red" />
        ) : ( */}
        
        {analysisResult && (
          <div className={styles.analysisResult}>
            <h2>분석 결과</h2>
            <ReactMarkdown>{analysisResult}</ReactMarkdown>
          </div>
        )}
        
    </div>
  );
};

export default AnalysisPage;
