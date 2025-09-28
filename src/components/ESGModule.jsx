import React from 'react';
import { Leaf, Users, Shield, Award } from 'lucide-react';

const ESGModule = () => {
  const esgMetrics = [
    { category: 'Environmental', score: 8.2, icon: Leaf, color: '#27ae60' },
    { category: 'Social', score: 7.8, icon: Users, color: '#3498db' },
    { category: 'Governance', score: 9.1, icon: Shield, color: '#9b59b6' },
  ];

  const overallScore = 8.4;

  return (
    <div className="esg-module">
      <div className="esg-header">
        <div className="overall-score">
          <div className="score-circle">
            <div className="score-number">{overallScore}</div>
            <div className="score-label">ESG Score</div>
          </div>
          <div className="score-badge">
            <Award size={16} />
            <span>Excellent</span>
          </div>
        </div>
      </div>

      <div className="esg-breakdown">
        {esgMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="esg-metric">
              <div className="metric-header">
                <div className="metric-icon" style={{ backgroundColor: metric.color }}>
                  <IconComponent size={16} />
                </div>
                <span className="metric-name">{metric.category}</span>
              </div>
              <div className="metric-score">{metric.score}</div>
              <div className="metric-bar">
                <div 
                  className="metric-progress" 
                  style={{ 
                    width: `${(metric.score / 10) * 100}%`,
                    backgroundColor: metric.color
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="esg-insights">
        <h5>Recent Impact</h5>
        <div className="insight-item">
          <Leaf size={14} />
          <span>Reduced carbon footprint by 15% this quarter</span>
        </div>
        <div className="insight-item">
          <Users size={14} />
          <span>Invested in 3 social impact funds</span>
        </div>
      </div>

      <style jsx>{`
        .esg-module {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .esg-header {
          display: flex;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .overall-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .score-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #27ae60, #2ecc71);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
        }

        .score-number {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .score-label {
          font-size: 0.7rem;
          opacity: 0.9;
        }

        .score-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: #f8f9fa;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          color: #27ae60;
          font-weight: 500;
        }

        .esg-breakdown {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }

        .esg-metric {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .metric-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
        }

        .metric-header > div {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .metric-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .metric-name {
          font-size: 0.85rem;
          color: #666;
        }

        .metric-score {
          font-size: 1rem;
          font-weight: 600;
          color: #2c3e50;
        }

        .metric-bar {
          width: 100%;
          height: 4px;
          background: #e9ecef;
          border-radius: 2px;
          overflow: hidden;
        }

        .metric-progress {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .esg-insights {
          border-top: 1px solid #e9ecef;
          padding-top: 1rem;
        }

        .esg-insights h5 {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .insight-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .insight-item svg {
          color: #27ae60;
        }
      `}</style>
    </div>
  );
};

export default ESGModule;

