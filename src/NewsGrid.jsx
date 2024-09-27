import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsGrid = ({ saveArticle }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // You'll need to replace this with a real API key and endpoint
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'India Italy Immigration',
          language: 'en',
          sortBy: 'publishedAt',
          apiKey: 'cd7b0b8459d54190b49835161cd98b23',
        },
      });
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news: ', error);
    }
  };

  return (
    <div className="news-grid">
      {articles.map((article, index) => (
        <div key={index} className="news-item">
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          <button onClick={() => saveArticle(article)}>Save Article</button>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;