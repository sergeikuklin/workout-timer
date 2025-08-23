import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Main from './src/main';
import './global.css';

export default function App() {
  return (
    <>
      <Main />
      <StatusBar style="auto" />
    </>
  );
}
