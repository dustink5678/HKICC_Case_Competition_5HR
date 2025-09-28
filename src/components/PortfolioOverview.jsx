import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

const PortfolioOverview = () => {
  const performanceData = [
    { month: 'Jan', value: 850000 },
    { month: 'Feb', value: 890000 },
    { month: 'Mar', value: 920000 },
    { month: 'Apr', value: 880000 },
    { month: 'May', value: 950000 },
    { month: 'Jun', value: 980000 },
  ];

  const allocationData = [
    { name: 'Equities', value: 45, color: '#dc143c' },
    { name: 'Bonds', value: 30, color: '#3498db' },
    { name: 'Real Estate', value: 15, color: '#2ecc71' },
    { name: 'Commodities', value: 10, color: '#f39c12' },
  ];

  return (
    <div className="portfolio-overview">
      <div className="portfolio-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h4>Total Portfolio</h4>
            <p className="stat-value">$2,450,000</p>
            <span className="stat-change positive">
              <TrendingUp size={16} />
              +12.5%
            </span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <h4>YTD Return</h4>
            <p className="stat-value">+15.3%</p>
            <span className="stat-change positive">
              <TrendingUp size={16} />
              +2.1%
            </span>
          </div>
        </div>
      </div>

      <div className="portfolio-charts">
        <div className="chart-section">
          <h5>Performance (6M)</h5>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={performanceData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#dc143c" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="allocation-section">
          <h5>Asset Allocation</h5>
          <div className="allocation-list">
            {allocationData.map((item, index) => (
              <div key={index} className="allocation-item">
                <div 
                  className="allocation-color" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="allocation-name">{item.name}</span>
                <span className="allocation-percent">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .portfolio-overview {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .portfolio-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .stat-icon {
          background: #dc143c;
          color: white;
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info h4 {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-size: 1.4rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.25rem;
        }

        .stat-change {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .stat-change.positive {
          color: #27ae60;
        }

        .stat-change.negative {
          color: #e74c3c;
        }

        .portfolio-charts {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .chart-section h5,
        .allocation-section h5 {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.75rem;
        }

        .allocation-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .allocation-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .allocation-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .allocation-name {
          flex: 1;
          font-size: 0.85rem;
          color: #666;
        }

        .allocation-percent {
          font-size: 0.85rem;
          font-weight: 600;
          color: #2c3e50;
        }

        @media (max-width: 768px) {
          .portfolio-stats {
            grid-template-columns: 1fr;
          }
          
          .portfolio-charts {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioOverview;
