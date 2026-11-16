import {restoreLocale} from './i18n.js';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {Workspace} from './ui/DrawerWorkspace.js';
import './ui/styles.css';
restoreLocale();
createRoot(document.getElementById('root')!).render(<React.StrictMode><Workspace/></React.StrictMode>);
