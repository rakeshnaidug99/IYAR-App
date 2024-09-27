import React from 'react';

const SavedArticles = ({ savedArticles, removeArticle }) => {
  return (
    <div className="saved-articles">
      <h2>Saved Articles</h2>
      {savedArticles.map((article) => (
        <div key={article.id} className="saved-article">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          <button onClick={() => removeArticle(article.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default SavedArticles;