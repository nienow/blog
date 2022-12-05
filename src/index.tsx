import React from 'react';
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ArticleList from "ArticleList";
import Article from "Article";

import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ArticleList/>
  },
  {
    path: '/article/:id',
    element: <Article/>
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
);
