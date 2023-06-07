import React from 'react';
import { createRoot } from 'react-dom/client';
// import { ReactApp } from './components/app/ReactApp';


const container = document.getElementById('react-app');

if (container) {
   const root = createRoot(container);
   // root.render(<ReactApp />);
}
