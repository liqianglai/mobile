import React from "react";
import { Link } from "react-router-dom";

const News = () => {
  return (
    <div>
      <h2>News</h2>
      <ul>
        <li>
          <Link to={`/news/list`}>list</Link>
        </li>
        <li>
          <Link to={`/news/add`}>add</Link>
        </li>
        <li>
          <Link to={`/news/hot`}>hot</Link>
        </li>
        <li>
          <Link to={`/news/hot/list`}>hot/list</Link>
        </li>
      </ul>
    </div>
  );
};

export default News;
