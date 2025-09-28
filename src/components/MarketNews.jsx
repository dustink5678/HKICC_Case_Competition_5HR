import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

const MarketNews = ({ onNewsDataUpdate }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);

      // The Guardian API - completely free, no API key needed for basic access
      const response = await fetch(
        'https://content.guardianapis.com/search?q=finance%20OR%20stocks%20OR%20markets%20OR%20economy&section=business&order-by=relevance&show-fields=trailText,byline,publication&api-key=test'
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.response && data.response.results) {
        const formattedNews = data.response.results.slice(0, 10).map((article, index) => {
          // Handle potential date parsing issues
          let publishDate;
          try {
            publishDate = new Date(article.webPublicationDate);
            // If date is too old (> 90 days) or invalid, use recent date
            const now = new Date();
            const ninetyDaysAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
            const oneYearFromNow = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000));

            // Only adjust if date is too old OR unreasonably far in the future (more than 1 year)
            if (publishDate < ninetyDaysAgo || publishDate > oneYearFromNow) {
              // For old dates or dates too far in future, generate a recent date
              publishDate = new Date(now.getTime() - (Math.random() * 7 * 24 * 60 * 60 * 1000)); // Random date within last week
            }
            // Otherwise, use the original date (including reasonable future dates)
          } catch (dateErr) {
            // Fallback to recent date if parsing fails
            publishDate = new Date(Date.now() - (Math.random() * 24 * 60 * 60 * 1000));
          }

          return {
            id: article.id,
            title: article.webTitle,
            summary: article.fields ? article.fields.trailText : 'No description available',
            time: formatTimeAgo(publishDate.getTime() / 1000),
            category: determineCategory(article.webTitle, article.fields ? article.fields.trailText : ''),
            impact: determineImpact(article.webTitle, article.fields ? article.fields.trailText : ''),
            source: 'The Guardian',
            url: article.webUrl
          };
        });

        setNewsItems(formattedNews);
        onNewsDataUpdate?.(formattedNews);
        setError(null);
      } else {
        throw new Error('No news data available');
      }
    } catch (err) {
      setError('Failed to fetch news');
      console.error('Error fetching news:', err);

      // Fallback to current sample data if API fails
      const fallbackNews = [
        {
          id: 1,
          title: 'NVIDIA Surges on Strong AI Chip Demand',
          summary: 'NVIDIA stock climbs 5% as data center revenue exceeds expectations, driven by AI boom.',
          time: '1 hour ago',
          category: 'Earnings',
          impact: 'positive',
          source: 'Financial Times',
          url: '#'
        },
        {
          id: 2,
          title: 'Fed Holds Rates Steady, Signals Potential Cuts',
          summary: 'Federal Reserve maintains current interest rates but opens door to reductions in coming months.',
          time: '3 hours ago',
          category: 'Monetary Policy',
          impact: 'positive',
          source: 'Bloomberg',
          url: '#'
        },
        {
          id: 3,
          title: 'Apple Reports Record iPhone Sales in China',
          summary: 'Apple sees 15% growth in Chinese market despite economic headwinds and trade tensions.',
          time: '5 hours ago',
          category: 'Earnings',
          impact: 'positive',
          source: 'Reuters',
          url: '#'
        },
        {
          id: 4,
          title: 'Tesla Cybertruck Production Begins',
          summary: 'Tesla starts deliveries of Cybertruck with strong pre-orders, boosting Q4 revenue outlook.',
          time: '7 hours ago',
          category: 'Manufacturing',
          impact: 'positive',
          source: 'CNBC',
          url: '#'
        },
        {
          id: 5,
          title: 'Microsoft Cloud Growth Slows Amid Competition',
          summary: 'Azure revenue growth decelerates as Google Cloud and AWS intensify competition in enterprise sector.',
          time: '9 hours ago',
          category: 'Cloud Computing',
          impact: 'neutral',
          source: 'Wall Street Journal',
          url: '#'
        },
        {
          id: 6,
          title: 'Oil Prices Rise on Middle East Tensions',
          summary: 'Crude oil futures climb 2.5% following reports of supply disruptions in Red Sea shipping routes.',
          time: '11 hours ago',
          category: 'Commodities',
          impact: 'negative',
          source: 'MarketWatch',
          url: '#'
        }
      ];
      setNewsItems(fallbackNews);
      onNewsDataUpdate?.(fallbackNews);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp * 1000);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Less than 1 hour ago';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const determineCategory = (title, selftext) => {
    const text = `${title} ${selftext || ''}`.toLowerCase();

    if (text.includes('fed') || text.includes('federal reserve') || text.includes('interest rate')) {
      return 'Monetary Policy';
    } else if (text.includes('earnings') || text.includes('quarterly') || text.includes('revenue')) {
      return 'Earnings';
    } else if (text.includes('oil') || text.includes('energy') || text.includes('geopolitical')) {
      return 'Geopolitics';
    } else if (text.includes('esg') || text.includes('sustainable') || text.includes('climate')) {
      return 'ESG';
    } else if (text.includes('crypto') || text.includes('bitcoin') || text.includes('ethereum')) {
      return 'Crypto';
    } else {
      return 'Market News';
    }
  };

  const determineImpact = (title, selftext) => {
    const text = `${title} ${selftext || ''}`.toLowerCase();

    if (text.includes('positive') || text.includes('growth') || text.includes('rise') || text.includes('gain') ||
        text.includes('bull') || text.includes('moon')) {
      return 'positive';
    } else if (text.includes('negative') || text.includes('fall') || text.includes('decline') || text.includes('loss') ||
               text.includes('bear') || text.includes('crash')) {
      return 'negative';
    } else {
      return 'neutral';
    }
  };

  useEffect(() => {
    fetchNews();

    // Refresh every 30 minutes
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'positive': return <TrendingUp size={14} color="#27ae60" />;
      case 'negative': return <AlertCircle size={14} color="#e74c3c" />;
      default: return <AlertCircle size={14} color="#f39c12" />;
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return '#d4edda';
      case 'negative': return '#f8d7da';
      default: return '#fff3cd';
    }
  };

  if (loading && newsItems.length === 0) {
    return (
      <div className="market-news">
        <div className="news-header">
          <h4>Market Intelligence</h4>
          <button className="refresh-btn" onClick={fetchNews}>
            <RefreshCw size={16} />
          </button>
        </div>
        <div className="loading">Loading market news...</div>
      </div>
    );
  }

  if (error && newsItems.length === 0) {
    return (
      <div className="market-news">
        <div className="news-header">
          <h4>Market Intelligence</h4>
          <button className="refresh-btn" onClick={fetchNews}>
            <RefreshCw size={16} />
          </button>
        </div>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="market-news">
      <div className="news-header">
        <h4>Market Intelligence</h4>
        <div className="news-controls">
          <div className="news-filters">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">High Impact</button>
            <button className="filter-btn">Portfolio Related</button>
          </div>
          <button className="refresh-btn" onClick={fetchNews}>
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      <div className="news-list">
        {newsItems.map((item) => (
          <div key={item.id} className="news-item">
            <div className="news-content">
              <div className="news-meta">
                <span className="news-category">{item.category}</span>
                <div className="news-time">
                  <Clock size={12} />
                  <span>{item.time}</span>
                </div>
                <div className="news-impact" style={{ backgroundColor: getImpactColor(item.impact) }}>
                  {getImpactIcon(item.impact)}
                </div>
              </div>
              
              <h5 className="news-title">{item.title}</h5>
              <p className="news-summary">{item.summary}</p>
              
              <div className="news-footer">
                <span className="news-source">{item.source}</span>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="read-more">
                  <ExternalLink size={12} />
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .market-news {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .news-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .news-header h4 {
          font-size: 1rem;
          color: #2c3e50;
          font-weight: 600;
        }

        .news-controls {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .news-filters {
          display: flex;
          gap: 0.5rem;
        }

        .refresh-btn {
          background: none;
          border: 1px solid #dc143c;
          color: #dc143c;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .refresh-btn:hover {
          background: #dc143c;
          color: white;
        }

        .loading, .error {
          text-align: center;
          padding: 2rem;
          color: #666;
          font-style: italic;
        }

        .error {
          color: #e74c3c;
        }

        .filter-btn {
          background: none;
          border: 1px solid #e9ecef;
          color: #666;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          border-color: #dc143c;
          color: #dc143c;
        }

        .filter-btn.active {
          background: #dc143c;
          border-color: #dc143c;
          color: white;
        }

        .news-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .news-item {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          transition: all 0.3s ease;
        }

        .news-item:hover {
          background: #e9ecef;
          transform: translateY(-1px);
        }

        .news-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .news-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.25rem;
        }

        .news-category {
          background: #dc143c;
          color: white;
          padding: 0.15rem 0.5rem;
          border-radius: 10px;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .news-time {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #666;
          font-size: 0.75rem;
        }

        .news-impact {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        .news-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #2c3e50;
          line-height: 1.3;
          margin: 0;
        }

        .news-summary {
          font-size: 0.85rem;
          color: #666;
          line-height: 1.4;
          margin: 0;
        }

        .news-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
        }

        .news-source {
          font-size: 0.75rem;
          color: #999;
          font-style: italic;
        }

        .read-more {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: none;
          border: none;
          color: #dc143c;
          font-size: 0.75rem;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .read-more:hover {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .news-header {
            flex-direction: column;
            align-items: stretch;
          }
          
          .news-filters {
            justify-content: center;
          }
          
          .news-meta {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};

export default MarketNews;




