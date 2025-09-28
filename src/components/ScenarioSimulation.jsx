import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const ScenarioSimulation = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  
  const scenarios = [
    {
      id: 'market-crash',
      name: 'Market Crash',
      impact: -15.2,
      color: '#e74c3c',
      advice: 'Consider investing in international bonds to mitigate risks of market volatility. Diversify into defensive sectors like utilities and consumer staples. Maintain an emergency fund covering 12-24 months of expenses. This is purely advisory information and should not be taken as financial fact.'
    },
    {
      id: 'recession',
      name: 'Economic Recession',
      impact: -8.7,
      color: '#e67e22',
      advice: 'Focus on high-quality bonds and dividend-paying stocks. Consider allocating more to government securities. Review and potentially reduce exposure to cyclical industries. This is purely advisory information and should not be taken as financial fact.'
    },
    {
      id: 'bull-market',
      name: 'Bull Market',
      impact: +22.4,
      color: '#27ae60',
      advice: 'Consider increasing exposure to equities while maintaining diversification. Review portfolio allocation to ensure participation in growth sectors. Monitor for overvaluation signals and maintain a long-term perspective. This is purely advisory information and should not be taken as financial fact.'
    },
    {
      id: 'inflation',
      name: 'High Inflation',
      impact: -6.3,
      color: '#f39c12',
      advice: 'Invest in inflation-protected securities like TIPS. Consider commodities and real estate as inflation hedges. Focus on companies with strong pricing power. Review fixed-income holdings for interest rate risk. This is purely advisory information and should not be taken as financial fact.'
    },
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario);

  const portfolioImpact = currentScenario ? {
    currentValue: 2450000,
    projectedValue: 2450000 * (1 + currentScenario.impact / 100),
    impactAmount: 2450000 * (currentScenario.impact / 100)
  } : null;

  return (
    <div className="scenario-simulation">
      <div className="scenario-header">
        <h4>Risk Outlook</h4>
      </div>

      <div className="scenario-selector">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            className={`scenario-btn ${selectedScenario === scenario.id ? 'active' : ''}`}
            onClick={() => setSelectedScenario(scenario.id)}
          >
            <span className="scenario-name">{scenario.name}</span>
            <span
              className={`scenario-impact ${scenario.impact >= 0 ? 'positive' : 'negative'}`}
            >
              {scenario.impact >= 0 ? '+' : ''}{scenario.impact}%
            </span>
          </button>
        ))}
      </div>

      {selectedScenario && currentScenario && (
        <div className="advice-section">
          <div className="advice-header">
            <AlertTriangle size={16} />
            <span>Risk Mitigation Advice</span>
          </div>
          <p className="advice-text">{currentScenario.advice}</p>
        </div>
      )}

      {portfolioImpact && (
        <div className="impact-summary">
          <div className="impact-card">
            <div className="impact-header">
              <BarChart3 size={20} />
              <span>Portfolio Impact</span>
            </div>
            <div className="impact-values">
              <div className="value-item">
                <span className="value-label">Current Value</span>
                <span className="value-amount">${portfolioImpact.currentValue.toLocaleString()}</span>
              </div>
              <div className="value-item">
                <span className="value-label">Projected Value</span>
                <span className="value-amount">${Math.round(portfolioImpact.projectedValue).toLocaleString()}</span>
              </div>
              <div className="value-item impact-change">
                <span className="value-label">Impact</span>
                <span className={`value-amount ${portfolioImpact.impactAmount >= 0 ? 'positive' : 'negative'}`}>
                  {portfolioImpact.impactAmount >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {portfolioImpact.impactAmount >= 0 ? '+' : ''}${Math.abs(Math.round(portfolioImpact.impactAmount)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scenario-simulation {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .scenario-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .scenario-header h4 {
          font-size: 1rem;
          color: #2c3e50;
          font-weight: 600;
        }

        .advice-section {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .advice-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          color: #856404;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .advice-text {
          color: #856404;
          font-size: 0.85rem;
          line-height: 1.4;
          margin: 0;
        }

        .scenario-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .scenario-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.75rem 0.5rem;
          background: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .scenario-btn:hover {
          background: #e9ecef;
        }

        .scenario-btn.active {
          border-color: #3498db;
          background: #e3f2fd;
        }

        .scenario-name {
          font-size: 0.8rem;
          color: #2c3e50;
          font-weight: 500;
        }

        .scenario-impact {
          font-size: 0.75rem;
          font-weight: 600;
        }

        .scenario-impact.positive {
          color: #27ae60;
        }

        .scenario-impact.negative {
          color: #e74c3c;
        }

        .impact-summary {
          flex: 1;
        }

        .impact-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          height: 100%;
        }

        .impact-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          color: #666;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .impact-values {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .value-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .value-item.impact-change {
          border-top: 1px solid #e9ecef;
          padding-top: 0.75rem;
          margin-top: 0.25rem;
        }

        .value-label {
          font-size: 0.85rem;
          color: #666;
        }

        .value-amount {
          font-size: 0.9rem;
          font-weight: 600;
          color: #2c3e50;
        }

        .value-amount.positive {
          color: #27ae60;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .value-amount.negative {
          color: #e74c3c;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        @media (max-width: 768px) {
          .scenario-selector {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ScenarioSimulation;

