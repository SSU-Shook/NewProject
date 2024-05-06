'use client';
import React, { useState } from 'react';
import styles from './mypage.module.css';

const MyPage = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Sample1', date: '2022-04-13', visibility: 'private' },
    { id: 2, title: 'Sample2', date: '2022-04-14', visibility: 'public' },
    { id: 3, title: 'Sample3', date: '2022-04-15', visibility: 'private' },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [selectedVisibility, setSelectedVisibility] = useState('private');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleCreateProject = () => {
    const newProject = {
      id: projects.length + 1, // Simple ID assignment
      title: newTitle,
      date: new Date().toISOString().split('T')[0],
      visibility: selectedVisibility
    };
    setProjects([...projects, newProject]);
    setNewTitle('');
    setSelectedVisibility('private');
  };

  const handleDeleteProject = () => {
    setProjects(projects.filter(project => project.id !== selectedProjectId));
    setSelectedProjectId(null);
  };

  const handleModifyProject = () => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProjectId) {
        return { ...project, title: newTitle || project.title, visibility: selectedVisibility };
      }
      return project;
    });
    setProjects(updatedProjects);
    setNewTitle('');
    setSelectedVisibility('private');
    setSelectedProjectId(null);
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>My Projects</h1>
        <input
          type="text"
          placeholder="Project title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <select
          value={selectedVisibility}
          onChange={(e) => setSelectedVisibility(e.target.value)}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        <button className={styles.button} onClick={handleCreateProject}>새 프로젝트</button>
        <button className={styles.button} onClick={handleModifyProject} disabled={!selectedProjectId}>수정</button>
        <button className={styles.button} onClick={handleDeleteProject} disabled={!selectedProjectId}>삭제</button>
      </div>
      <div className={styles.container}>
        {projects.map(project => (
          <div key={project.id} className={styles.post} onClick={() => setSelectedProjectId(project.id)}>
            <h2>제목: {project.title}</h2>
            <p>생성 날짜: {project.date}</p>
            <p>공개 여부: {project.visibility === 'private' ? 'Private' : 'Public'}</p>
            <button className={styles.button}>코드 보기</button>
            <button className={styles.button}>분석 결과 보기</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;




