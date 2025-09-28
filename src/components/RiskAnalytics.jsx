import React from 'react';
import { AlertTriangle, Shield, TrendingDown, Activity } from 'lucide-react';

const RiskAnalytics = () => {
  const riskMetrics = [
    { label: 'Portfolio Beta', value: '1.15', status: 'moderate', icon: Activity },
    { label: 'VaR (95%)', value: '2.3%', status: 'low', icon: Shield },
    { label: 'Max Drawdown', value: '8.7%', status: 'moderate', icon: TrendingDown },
  ];

  const riskLevel = 'Moderate';
  const riskScore = 6.2;

  const getStatusColor = (status) => {
    switch (status) {
      case 'low': return '#27ae60';
      case 'moderate': return '#f39c12';
      case 'high': return '#e74c3c';
      default: return '#666';
    }
  };

  return (
    <div className="risk-analytics">
      <div className="risk-header">
        <div className="risk-level">
          <div className="risk-indicator">
            <AlertTriangle size={20} color="#f39c12" />
            <span className="risk-text">{riskLevel} Risk</span>
          </div>
          <div className="risk-score">{riskScore}/10</div>
        </div>
      </div>

      <div className="risk-metrics">
        {riskMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="risk-metric">
              <div className="metric-left">
                <div className="metric-icon">
                  <IconComponent size={16} />
                </div>
                <span className="metric-label">{metric.label}</span>
              </div>
              <div className="metric-right">
                <span className="metric-value">{metric.value}</span>
                <div 
                  className="status-dot" 
                  style={{ backgroundColor: getStatusColor(metric.status) }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="risk-recommendations">
        <h5>Risk Insights</h5>
        <div className="recommendation-item">
          <div className="rec-icon">
            <Shield size={14} />
          </div>
          <span>Consider diversifying into bonds to reduce volatility</span>
        </div>
        <div className="recommendation-item">
          <div className="rec-icon">
            <Activity size={14} />
          </div>
          <span>Portfolio correlation with market is slightly above average</span>
        </div>
      </div>

      <style jsx>{`
        .risk-analytics {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .risk-header {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #f39c12;
        }

        .risk-level {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .risk-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .risk-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: #2c3e50;
        }

        .risk-score {
          font-size: 1.25rem;
          font-weight: bold;
          color: #f39c12;
        }

        .risk-metrics {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
        }

        .risk-metric {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .metric-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .metric-icon {
          color: #666;
        }

        .metric-label {
          font-size: 0.85rem;
          color: #666;
        }

        .metric-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .metric-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #2c3e50;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .risk-recommendations {
          border-top: 1px solid #e9ecef;
          padding-top: 1rem;
        }

        .risk-recommendations h5 {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 0.75rem;
        }

        .recommendation-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.8rem;
          color: #666;
          line-height: 1.4;
        }

        .rec-icon {
          color: #3498db;
          margin-top: 0.1rem;
        }

        @media (max-width: 768px) {
          .risk-level {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default RiskAnalytics;

