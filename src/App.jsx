import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Settings, Bell, User, Search, Edit3, X, Plus, Eye, Shield } from 'lucide-react';
import PortfolioOverview from './components/PortfolioOverview';
import StockModule from './components/StockModule';
import ESGModule from './components/ESGModule';
import RiskAnalytics from './components/RiskAnalytics';
import ScenarioSimulation from './components/ScenarioSimulation';
import MarketNews from './components/MarketNews';
import ChatbotModule from './components/ChatbotModule';
import './App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

// Manager View Components
const ManagerDashboard = ({ onSelectClient, approvalQueueCount, stockData, newsData, onStockDataUpdate, onNewsDataUpdate }) => {
  const handleAICopilotClick = () => {
    onSelectClient('ai-copilot');
  };
  const todaysMeetings = [
    { id: 1, time: '10:00 AM', client: 'Jane Doe', purpose: 'Q3 Portfolio Review', highlighted: true },
    { id: 2, time: '2:30 PM', client: 'Michael Chen', purpose: 'New Account Setup' },
    { id: 3, time: '4:15 PM', client: 'Sarah Lee', purpose: 'ESG Investment Discussion' }
  ];

  const keyAlerts = [
    { id: 1, type: 'alert', message: "Alert: John Smith's portfolio has deviated 5% from his target risk profile.", priority: 'high' },
    { id: 2, type: 'opportunity', message: "Opportunity: New ESG fund launched that aligns with Sarah Lee's stated interests.", priority: 'medium' },
    { id: 3, type: 'info', message: "Info: Market volatility index has increased 12% this week.", priority: 'low' }
  ];

  const defaultTalks = [
    {
      id: 1,
      title: "Q4 Portfolio Review Reminder",
      type: "Email",
      subject: "Your Q4 Portfolio Review - Let's Schedule",
      content: "Dear [Client Name], As we approach year-end, I wanted to touch base about your portfolio performance and discuss any adjustments for the upcoming year. Your portfolio has shown [X]% growth this year. Would you be available for a brief call next week?",
      category: "Portfolio Review"
    },
    {
      id: 2,
      title: "Market Update Newsletter",
      type: "Email",
      subject: "Market Update: Navigating Current Volatility",
      content: "Dear [Client Name], I wanted to share some insights on the recent market movements and how they may impact your investment strategy. While markets can be volatile, your diversified portfolio is positioned to weather these conditions.",
      category: "Market Update"
    },
    {
      id: 3,
      title: "ESG Investment Opportunity",
      type: "Email",
      subject: "New ESG Investment Opportunity",
      content: "Dear [Client Name], We've recently launched a new sustainable infrastructure fund that aligns well with your investment goals and values. This fund focuses on renewable energy and sustainable development projects.",
      category: "Investment Opportunity"
    },
    {
      id: 4,
      title: "Tax Planning Discussion",
      type: "Call Script",
      subject: "Tax Planning Strategy Review",
      content: "Hello [Client Name], I'm calling about your upcoming tax planning. With the tax deadline approaching, there are several strategies we can implement to optimize your tax efficiency. Do you have time to discuss this today?",
      category: "Tax Planning"
    }
  ];

  const meetingSummaries = [
    {
      id: 1,
      client: "Jane Doe",
      date: "2024-09-25",
      summary: "Discussed Q3 portfolio performance (+12.5% YTD). Client expressed interest in ESG investments. Action items: Schedule ESG fund review, update risk profile.",
      keyPoints: ["Portfolio up 12.5%", "ESG interest expressed", "Risk profile update needed"]
    },
    {
      id: 2,
      client: "Michael Chen",
      date: "2024-09-24",
      summary: "New account setup completed. Client transferring $500K from previous institution. Discussed investment objectives and risk tolerance. Conservative risk profile established.",
      keyPoints: ["New account setup", "$500K transfer", "Conservative risk profile"]
    },
    {
      id: 3,
      client: "Sarah Lee",
      date: "2024-09-23",
      summary: "Annual review completed. Portfolio rebalancing executed. Client requested more information on sustainable investment options. Follow-up scheduled for next week.",
      keyPoints: ["Annual review done", "Portfolio rebalanced", "Sustainable investments requested"]
    }
  ];

  const clientConnections = [
    {
      id: 1,
      client: "Robert Johnson",
      type: "Birthday",
      date: "2024-09-28",
      message: "It's Robert's 55th birthday today. Consider sending a personalized card or scheduling a congratulatory call.",
      action: "Send Birthday Card"
    },
    {
      id: 2,
      client: "Maria Garcia",
      type: "Anniversary",
      date: "2024-09-30",
      message: "Maria and her husband celebrate their 25th wedding anniversary. This would be a great opportunity to send well wishes.",
      action: "Send Anniversary Card"
    },
    {
      id: 3,
      client: "David Kim",
      type: "Work Anniversary",
      date: "2024-10-02",
      message: "David celebrates 10 years at his company. Consider acknowledging this milestone professionally.",
      action: "Send Professional Note"
    },
    {
      id: 4,
      client: "Lisa Chen",
      type: "Birthday",
      date: "2024-10-05",
      message: "Lisa turns 42 this week. She mentioned her love for fine wines during our last conversation.",
      action: "Schedule Call"
    }
  ];

  return (
    <div className="manager-dashboard">
      <div className="dashboard-header-manager">
        <div className="header-content">
          <div>
            <h1>Manager Dashboard</h1>
            <p>Manage your client relationships efficiently</p>
          </div>
          <button className="ai-copilot-btn" onClick={handleAICopilotClick}>
            🤖 AI Co-Pilot
          </button>
        </div>
      </div>

      <div className="dashboard-main">
        <ResponsiveGridLayout
          className="layout"
          layouts={{
            lg: [
              // Manager-specific widgets
              { i: 'schedule', x: 0, y: 0, w: 4, h: 6, minW: 4, minH: 6 },
              { i: 'approval-queue', x: 4, y: 0, w: 4, h: 6, minW: 4, minH: 6 },
              { i: 'alerts', x: 8, y: 0, w: 4, h: 6, minW: 4, minH: 6 },

              // Market data widgets
              { i: 'portfolio', x: 0, y: 6, w: 6, h: 6, minW: 4, minH: 5 },
              { i: 'stocks', x: 6, y: 6, w: 6, h: 6, minW: 4, minH: 5 },

              // Manager tools
              { i: 'talks', x: 0, y: 12, w: 4, h: 5, minW: 3, minH: 4 },
              { i: 'meetings', x: 4, y: 12, w: 4, h: 5, minW: 3, minH: 4 },
              { i: 'connections', x: 8, y: 12, w: 4, h: 5, minW: 3, minH: 4 },

              // More market data
              { i: 'esg', x: 0, y: 17, w: 3, h: 5, minW: 3, minH: 4 },
              { i: 'risk', x: 3, y: 17, w: 3, h: 5, minW: 3, minH: 4 },
              { i: 'scenario', x: 6, y: 17, w: 3, h: 5, minW: 3, minH: 4 },
              { i: 'chatbot', x: 9, y: 17, w: 3, h: 8, minW: 3, minH: 6 },

              // News and messages
              { i: 'news', x: 0, y: 22, w: 6, h: 5, minW: 4, minH: 4 },
              { i: 'messages', x: 6, y: 22, w: 6, h: 5, minW: 4, minH: 4 },
            ],
            md: [
              // Manager-specific widgets
              { i: 'schedule', x: 0, y: 0, w: 5, h: 6, minW: 4, minH: 6 },
              { i: 'approval-queue', x: 5, y: 0, w: 5, h: 6, minW: 4, minH: 6 },
              { i: 'alerts', x: 0, y: 6, w: 10, h: 5, minW: 4, minH: 5 },

              // Market data widgets
              { i: 'portfolio', x: 0, y: 11, w: 5, h: 6, minW: 4, minH: 5 },
              { i: 'stocks', x: 5, y: 11, w: 5, h: 6, minW: 4, minH: 5 },

              // Manager tools
              { i: 'talks', x: 0, y: 17, w: 5, h: 5, minW: 3, minH: 4 },
              { i: 'meetings', x: 5, y: 17, w: 5, h: 5, minW: 3, minH: 4 },
              { i: 'connections', x: 0, y: 22, w: 10, h: 5, minW: 3, minH: 4 },

              // More market data
              { i: 'esg', x: 0, y: 27, w: 5, h: 5, minW: 3, minH: 4 },
              { i: 'risk', x: 5, y: 27, w: 5, h: 5, minW: 3, minH: 4 },
              { i: 'scenario', x: 0, y: 32, w: 5, h: 5, minW: 3, minH: 4 },
              { i: 'chatbot', x: 5, y: 32, w: 5, h: 8, minW: 3, minH: 6 },

              // News and messages
              { i: 'news', x: 0, y: 40, w: 5, h: 5, minW: 3, minH: 4 },
              { i: 'messages', x: 5, y: 40, w: 5, h: 5, minW: 3, minH: 4 },
            ],
            sm: [
              // Manager-specific widgets
              { i: 'schedule', x: 0, y: 0, w: 6, h: 6, minW: 3, minH: 6 },
              { i: 'approval-queue', x: 0, y: 6, w: 6, h: 6, minW: 3, minH: 6 },
              { i: 'alerts', x: 0, y: 12, w: 6, h: 5, minW: 3, minH: 4 },

              // Market data widgets
              { i: 'portfolio', x: 0, y: 17, w: 6, h: 6, minW: 3, minH: 5 },
              { i: 'stocks', x: 0, y: 23, w: 6, h: 6, minW: 3, minH: 5 },

              // Manager tools
              { i: 'talks', x: 0, y: 29, w: 6, h: 5, minW: 3, minH: 4 },
              { i: 'meetings', x: 0, y: 34, w: 6, h: 5, minW: 3, minH: 4 },
              { i: 'connections', x: 0, y: 39, w: 6, h: 5, minW: 3, minH: 4 },

              // More market data
              { i: 'esg', x: 0, y: 44, w: 6, h: 5, minW: 3, minH: 4 },
              { i: 'risk', x: 0, y: 49, w: 6, h: 5, minW: 3, minH: 4 },
              { i: 'scenario', x: 0, y: 54, w: 6, h: 5, minW: 3, minH: 4 },
              { i: 'chatbot', x: 0, y: 59, w: 6, h: 8, minW: 3, minH: 6 },

              // News and messages
              { i: 'news', x: 0, y: 67, w: 6, h: 5, minW: 3, minH: 4 },
              { i: 'messages', x: 0, y: 72, w: 6, h: 5, minW: 3, minH: 4 },
            ]
          }}
          onLayoutChange={() => {}} // No-op for manager view
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={80}
          margin={[16, 16]}
          containerPadding={[16, 16]}
          isDraggable={false}
          isResizable={false}
          useCSSTransforms={true}
          compactType="vertical"
        >
          {/* Manager-specific widgets */}
          <div key="schedule" className="dashboard-module">
            <div className="module-header">
              <h3>Today's Schedule</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <div className="schedule-list">
                {todaysMeetings.map(meeting => (
                  <div
                    key={meeting.id}
                    className={`schedule-item ${meeting.highlighted ? 'highlighted' : ''}`}
                    onClick={() => meeting.highlighted && onSelectClient('jane-doe')}
                  >
                    <div className="meeting-time">{meeting.time}</div>
                    <div className="meeting-details">
                      <div className="client-name">{meeting.client}</div>
                      <div className="meeting-purpose">{meeting.purpose}</div>
                    </div>
                    {meeting.highlighted && <div className="upcoming-badge">Next</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div key="approval-queue" className="dashboard-module">
            <div className="module-header">
              <h3>Approval Queue</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <div className="approval-summary">
                <div className="approval-count">{approvalQueueCount}</div>
                <div className="approval-label">Items Pending Approval</div>
                <button className="view-approvals-btn" onClick={() => onSelectClient('ai-copilot')}>
                  View All
                </button>
              </div>
            </div>
          </div>

          <div key="alerts" className="dashboard-module">
            <div className="module-header">
              <h3>Key Alerts</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <div className="alerts-feed">
                {keyAlerts.map(alert => (
                  <div key={alert.id} className={`alert-item ${alert.priority}`}>
                    <div className={`alert-icon ${alert.type}`}>
                      {alert.type === 'alert' ? '⚠️' : alert.type === 'opportunity' ? '💡' : 'ℹ️'}
                    </div>
                    <div className="alert-content">
                      <p>{alert.message}</p>
                      <div className="alert-actions">
                        <button className="alert-action">View</button>
                        <button className="alert-action">Dismiss</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div key="talks" className="dashboard-module">
            <div className="module-header">
              <h3>Default Talks</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <div className="talks-list">
                {defaultTalks.slice(0, 2).map(talk => (
                  <div key={talk.id} className="talk-item">
                    <div className="talk-header">
                      <div className="talk-title">{talk.title}</div>
                      <div className="talk-type">{talk.type}</div>
                    </div>
                    <div className="talk-category">{talk.category}</div>
                    <div className="talk-actions">
                      <button className="talk-action">Use Template</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div key="meetings" className="dashboard-module">
            <div className="module-header">
              <h3>Recent Meetings</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <div className="meetings-list">
                {meetingSummaries.slice(0, 2).map(meeting => (
                  <div key={meeting.id} className="meeting-item">
                    <div className="meeting-header">
                      <div className="meeting-client">{meeting.client}</div>
                      <div className="meeting-date">{new Date(meeting.date).toLocaleDateString()}</div>
                    </div>
                    <div className="meeting-summary">{meeting.summary}</div>
                    <div className="meeting-keypoints">
                      {meeting.keyPoints.slice(0, 2).map((point, index) => (
                        <span key={index} className="key-point">{point}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div key="connections" className="dashboard-module">
            <div className="module-header">
              <h3>Client Connections</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <div className="connections-list">
                {clientConnections.slice(0, 2).map(connection => (
                  <div key={connection.id} className="connection-item">
                    <div className="connection-header">
                      <div className="connection-client">{connection.client}</div>
                      <div className="connection-type">{connection.type}</div>
                    </div>
                    <div className="connection-date">{new Date(connection.date).toLocaleDateString()}</div>
                    <div className="connection-message">{connection.message.substring(0, 60)}...</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market data widgets */}
          <div key="portfolio" className="dashboard-module">
            <div className="module-header">
              <h3>Portfolio Overview</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <PortfolioOverview />
            </div>
          </div>

          <div key="stocks" className="dashboard-module">
            <div className="module-header">
              <h3>Stocks</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <StockModule onStockDataUpdate={onStockDataUpdate} />
            </div>
          </div>

          <div key="esg" className="dashboard-module">
            <div className="module-header">
              <h3>ESG Impact</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <ESGModule />
            </div>
          </div>

          <div key="risk" className="dashboard-module">
            <div className="module-header">
              <h3>Risk Analytics</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <RiskAnalytics />
            </div>
          </div>

          <div key="scenario" className="dashboard-module">
            <div className="module-header">
              <h3>Risk Outlook</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <ScenarioSimulation />
            </div>
          </div>

          <div key="chatbot" className="dashboard-module">
            <div className="module-header">
              <h3>AI Assistant</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <ChatbotModule stockData={stockData} newsData={newsData} />
            </div>
          </div>

          <div key="news" className="dashboard-module">
            <div className="module-header">
              <h3>Market News</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <MarketNews onNewsDataUpdate={onNewsDataUpdate} />
            </div>
          </div>

          <div key="messages" className="dashboard-module">
            <div className="module-header">
              <h3>Messages</h3>
              <div className="module-actions">
                <button className="module-settings">
                  <Settings size={16} />
                </button>
              </div>
            </div>
            <div className="module-content">
              <ClientMessageCenter messages={[]} onMessageRead={() => {}} />
            </div>
          </div>
        </ResponsiveGridLayout>
      </div>

      <style jsx>{`
        .manager-dashboard {
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }


        .dashboard-header-manager {
          margin-bottom: 40px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-header-manager h1 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .dashboard-header-manager p {
          font-size: 1.2rem;
          color: #666;
        }

        .ai-copilot-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .ai-copilot-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .command-center-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
        }

        .command-widget {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          border: 1px solid #e9ecef;
        }

        .widget-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .widget-header h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin: 0;
        }

        .widget-icon {
          font-size: 1.5rem;
        }

        /* Schedule Widget */
        .schedule-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .schedule-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border-radius: 8px;
          background: #f8f9fa;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .schedule-item:hover {
          background: #e9ecef;
          transform: translateY(-2px);
        }

        .schedule-item.highlighted {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .schedule-item.highlighted:hover {
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        }

        .meeting-time {
          font-weight: 600;
          font-size: 0.9rem;
          min-width: 80px;
        }

        .meeting-details {
          flex: 1;
        }

        .client-name {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .meeting-purpose {
          font-size: 0.85rem;
          opacity: 0.9;
        }

        .upcoming-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        /* Approval Widget */
        .approval-summary {
          text-align: center;
        }

        .approval-count {
          font-size: 3rem;
          font-weight: 700;
          color: #e74c3c;
          margin-bottom: 8px;
        }

        .approval-label {
          font-size: 1rem;
          color: #666;
          margin-bottom: 16px;
        }

        .view-approvals-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .view-approvals-btn:hover {
          background: #2980b9;
        }

        /* Alerts Widget */
        .alerts-feed {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .alert-item {
          display: flex;
          align-items: flex-start;
          padding: 12px;
          border-radius: 8px;
          background: #f8f9fa;
        }

        .alert-item.high {
          border-left: 4px solid #e74c3c;
        }

        .alert-item.medium {
          border-left: 4px solid #f39c12;
        }

        .alert-item.low {
          border-left: 4px solid #27ae60;
        }

        .alert-icon {
          margin-right: 12px;
          font-size: 1.2rem;
        }

        .alert-content {
          flex: 1;
        }

        .alert-content p {
          margin: 0 0 8px 0;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .alert-actions {
          display: flex;
          gap: 8px;
        }

        .alert-action {
          background: #3498db;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .alert-action:hover {
          background: #2980b9;
        }

        /* Default Talks Styles */
        .talks-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .talk-item {
          padding: 16px;
          border: 1px solid #e0e6ed;
          border-radius: 8px;
          background: #fafbfc;
        }

        .talk-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .talk-title {
          font-weight: 600;
          color: #2c3e50;
          font-size: 1rem;
        }

        .talk-type {
          background: #667eea;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .talk-category {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 12px;
        }

        .talk-actions {
          display: flex;
          gap: 8px;
        }

        .talk-action {
          padding: 8px 12px;
          border: 1px solid #667eea;
          background: white;
          color: #667eea;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .talk-action:hover {
          background: #667eea;
          color: white;
        }

        /* Meeting Summaries Styles */
        .meetings-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .meeting-item {
          padding: 16px;
          border: 1px solid #e0e6ed;
          border-radius: 8px;
          background: white;
        }

        .meeting-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .meeting-client {
          font-weight: 600;
          color: #2c3e50;
        }

        .meeting-date {
          color: #666;
          font-size: 0.9rem;
        }

        .meeting-summary {
          color: #2c3e50;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .meeting-keypoints {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .key-point {
          background: #e8f4f8;
          color: #2c3e50;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .meeting-actions {
          display: flex;
          gap: 8px;
        }

        .meeting-action {
          padding: 8px 12px;
          border: 1px solid #27ae60;
          background: white;
          color: #27ae60;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .meeting-action:hover {
          background: #27ae60;
          color: white;
        }

        /* Client Connections Styles */
        .connections-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .connection-item {
          padding: 16px;
          border: 1px solid #e0e6ed;
          border-radius: 8px;
          background: #fff9f0;
          border-left: 4px solid #f39c12;
        }

        .connection-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .connection-client {
          font-weight: 600;
          color: #2c3e50;
        }

        .connection-type {
          background: #f39c12;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .connection-date {
          color: #f39c12;
          font-weight: 600;
          margin-bottom: 8px;
          font-size: 0.9rem;
        }

        .connection-message {
          color: #2c3e50;
          line-height: 1.5;
          margin-bottom: 12px;
          font-size: 0.95rem;
        }

        .connection-actions {
          display: flex;
          gap: 8px;
        }

        .connection-action {
          padding: 8px 12px;
          border: 1px solid #f39c12;
          background: white;
          color: #f39c12;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .connection-action:hover {
          background: #f39c12;
          color: white;
        }

        @media (max-width: 768px) {
          .command-center-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-header-manager h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

// Client Deep Dive Component
const ClientDeepDive = ({ clientId, onBack, stockData, newsData, onGenerateMessage }) => {
  const clientData = {
    name: 'Jane Doe',
    photo: '/client-photo.jpg', // placeholder
    totalAUM: 2450000,
    riskProfile: 'Moderate',
    lastContact: 'July 15, 2024',
    lastTrade: 'August 22, 2024',
    performance: '+12.5% YTD'
  };

  const talkingPoints = [
    "Her technology holdings are up 12%; discuss rebalancing strategy",
    "Market volatility may impact her bond allocation; review risk exposure",
    "Mention the new sustainable infrastructure fund that aligns with her goals",
    "Consider tax-loss harvesting opportunities in underperforming positions"
  ];

  return (
    <div className="client-deep-dive">
      <div className="deep-dive-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Command Center
        </button>
        <h1>Client Deep Dive: {clientData.name}</h1>
      </div>

      <div className="client-overview">
        <div className="client-photo-section">
          <div className="client-photo-placeholder">
            <div className="client-avatar">👩</div>
          </div>
          <h2>{clientData.name}</h2>
        </div>

        <div className="client-stats">
          <div className="stat-item">
            <span className="stat-label">Total AUM</span>
            <span className="stat-value">${clientData.totalAUM.toLocaleString()}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Risk Profile</span>
            <span className="stat-value">{clientData.riskProfile}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Performance YTD</span>
            <span className="stat-value positive">{clientData.performance}</span>
          </div>
        </div>
      </div>

      <div className="briefing-content">
        <div className="briefing-section">
          <h3>Portfolio Performance</h3>
          <div className="performance-chart-placeholder">
            <div className="chart-placeholder">
              📈 Portfolio Performance Chart
              <br />
              <small>Showing 12-month performance trend</small>
            </div>
          </div>
        </div>

        <div className="briefing-section">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-date">Last Contact:</span>
              <span>{clientData.lastContact}</span>
            </div>
            <div className="activity-item">
              <span className="activity-date">Last Trade:</span>
              <span>{clientData.lastTrade}</span>
            </div>
          </div>
        </div>

        <div className="briefing-section">
          <h3>AI-Suggested Talking Points</h3>
          <ul className="talking-points">
            {talkingPoints.map((point, index) => (
              <li key={index} className="talking-point">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="briefing-actions">
          <button className="action-btn primary" onClick={() => onGenerateMessage(clientData)}>
            Generate Follow-up Email
          </button>
          <button className="action-btn secondary">
            View Full Portfolio
          </button>
          <button className="action-btn secondary">
            Schedule Next Meeting
          </button>
        </div>
      </div>

      <style jsx>{`
        .client-deep-dive {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .deep-dive-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
          border-bottom: 1px solid #e9ecef;
          padding-bottom: 20px;
        }

        .back-btn {
          background: #6c757d;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .back-btn:hover {
          background: #5a6268;
        }

        .deep-dive-header h1 {
          font-size: 2rem;
          color: #2c3e50;
          margin: 0;
        }

        .client-overview {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 30px;
          margin-bottom: 40px;
          padding: 30px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }

        .client-photo-section {
          text-align: center;
        }

        .client-photo-placeholder {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
        }

        .client-avatar {
          font-size: 3rem;
        }

        .client-photo-section h2 {
          font-size: 1.5rem;
          color: #2c3e50;
          margin: 0;
        }

        .client-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .stat-item {
          text-align: center;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .stat-label {
          display: block;
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 8px;
        }

        .stat-value {
          display: block;
          font-size: 1.4rem;
          font-weight: 600;
          color: #2c3e50;
        }

        .stat-value.positive {
          color: #27ae60;
        }

        .briefing-content {
          display: grid;
          gap: 30px;
        }

        .briefing-section {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }

        .briefing-section h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin: 0 0 20px 0;
          border-bottom: 2px solid #e9ecef;
          padding-bottom: 10px;
        }

        .performance-chart-placeholder {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          border-radius: 8px;
          border: 2px dashed #dee2e6;
        }

        .chart-placeholder {
          text-align: center;
          color: #666;
          font-size: 1.1rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .activity-item {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .activity-date {
          font-weight: 600;
          color: #2c3e50;
        }

        .talking-points {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .talking-point {
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
          margin-bottom: 8px;
          border-left: 4px solid #3498db;
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .briefing-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .action-btn {
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .action-btn.primary {
          background: #3498db;
          color: white;
        }

        .action-btn.primary:hover {
          background: #2980b9;
          transform: translateY(-1px);
        }

        .action-btn.secondary {
          background: #6c757d;
          color: white;
        }

        .action-btn.secondary:hover {
          background: #5a6268;
        }

        @media (max-width: 768px) {
          .client-overview {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .briefing-actions {
            justify-content: center;
          }

          .deep-dive-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  );
};

// AI Co-Pilot & Approval Center Component
const AICoPilot = ({ approvalQueue, onApproveMessage, onRejectMessage, onEditMessage }) => {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI Co-Pilot. I can help you draft professional communications, analyze client data, and generate insights. What would you like me to help with today?',
      timestamp: new Date()
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [employeeEmailSubject, setEmployeeEmailSubject] = useState('');
  const [employeeEmailContent, setEmployeeEmailContent] = useState('');

  const handleQueueEmployeeEmail = () => {
    if (!employeeEmailSubject.trim() || !employeeEmailContent.trim()) return;

    const employeeEmail = {
      id: Date.now(),
      type: 'Employee Email',
      subject: employeeEmailSubject,
      content: employeeEmailContent,
      preview: employeeEmailContent.substring(0, 100) + '...',
      clientName: 'All Employees',
      recipient: 'All HSBC Relationship Managers'
    };

    // For now, directly add to client messages as if approved
    // In a real app, this would go through approval queue
    const clientMessage = {
      id: Date.now(),
      sender: 'System Admin',
      senderTitle: 'Management',
      subject: employeeEmail.subject,
      preview: employeeEmail.preview,
      date: 'Just now',
      read: false,
      body: employeeEmail.content
    };

    // This would normally call onApproveMessage(employeeEmail) after approval
    // For demo purposes, we'll simulate approval
    setEmployeeEmailSubject('');
    setEmployeeEmailContent('');
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isGenerating) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsGenerating(true);

    // Simulate AI response (in real implementation, this would call an AI API)
    setTimeout(() => {
      let aiResponse = '';

      if (chatInput.toLowerCase().includes('email') || chatInput.toLowerCase().includes('draft')) {
        aiResponse = `I've drafted a professional follow-up email for Jane Doe. Here's the content:

---

Subject: Following up on our Q3 Review

Dear Jane,

It was great speaking with you this morning about your Q3 portfolio review. As discussed, your portfolio is performing well, up 12.5% over the last six months.

Your technology holdings continue to show strong performance, and I've attached your latest quarterly statement for your review.

I also wanted to follow up on our discussion about the new sustainable infrastructure fund - I believe it aligns well with your stated investment goals and risk preferences.

Please don't hesitate to reach out if you have any questions.

Best regards,
[Your Name]
Relationship Manager

---

This draft has been sent to your approval queue for review before sending.`;
      } else {
        aiResponse = 'I understand you\'d like assistance with that. Let me help you draft a professional communication or analyze some client data. Could you provide more specific details about what you need?';
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, botMessage]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="ai-co-pilot">
      <div className="co-pilot-header">
        <h2>AI Co-Pilot & Approval Center</h2>
        <button
          className="chat-toggle-btn"
          onClick={() => setShowChat(!showChat)}
        >
          💬 {showChat ? 'Hide' : 'Show'} AI Chat
        </button>
      </div>

      <div className="co-pilot-content">
        {/* AI Chat Window */}
        {showChat && (
          <div className="chat-window">
            <div className="chat-messages">
              {chatMessages.map(message => (
                <div key={message.id} className={`chat-message ${message.type}`}>
                  <div className="message-avatar">
                    {message.type === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className="message-content">
                    <p>{message.content}</p>
                    <small className="message-time">
                      {message.timestamp.toLocaleTimeString()}
                    </small>
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="chat-message bot generating">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="chat-input-area">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me to draft an email, analyze data, or generate insights..."
                disabled={isGenerating}
              />
              <button
                onClick={handleSendMessage}
                disabled={isGenerating || !chatInput.trim()}
                className="send-btn"
              >
                {isGenerating ? '...' : 'Send'}
              </button>
            </div>
          </div>
        )}

        {/* Employee Email */}
        <div className="employee-email-section">
          <div className="email-header">
            <h3>📧 Email All Employees</h3>
            <small>Communications requiring approval before sending to all team members</small>
          </div>

          <div className="email-form">
            <input
              type="text"
              placeholder="Email Subject"
              value={employeeEmailSubject}
              onChange={(e) => setEmployeeEmailSubject(e.target.value)}
              className="email-subject-input"
            />
            <textarea
              placeholder="Email content..."
              value={employeeEmailContent}
              onChange={(e) => setEmployeeEmailContent(e.target.value)}
              className="email-content-textarea"
              rows={4}
            />
            <div className="email-actions">
              <button
                onClick={handleQueueEmployeeEmail}
                disabled={!employeeEmailSubject.trim() || !employeeEmailContent.trim()}
                className="queue-email-btn"
              >
                📤 Queue for Approval
              </button>
              <button
                onClick={() => {
                  setEmployeeEmailSubject('');
                  setEmployeeEmailContent('');
                }}
                className="clear-email-btn"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Approval Queue */}
        <div className="approval-center">
          <div className="approval-header">
            <h3>Approval Queue</h3>
            <div className="queue-count">{approvalQueue.length} pending</div>
          </div>

          {approvalQueue.length === 0 ? (
            <div className="empty-queue">
              <div className="empty-icon">📋</div>
              <p>No items pending approval</p>
              <small>Use the AI chat to generate content that needs approval</small>
            </div>
          ) : (
            <div className="approval-items">
              {approvalQueue.map(item => (
                <div key={item.id} className="approval-item">
                  <div className="item-header">
                    <div className="item-type">{item.type}</div>
                    <div className="item-client">{item.clientName}</div>
                  </div>
                  <div className="item-preview">
                    <h4>{item.subject}</h4>
                    <p>{item.preview}</p>
                  </div>
                  <div className="item-actions">
                    <button
                      className="action-btn approve"
                      onClick={() => onApproveMessage(item)}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => onEditMessage(item)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="action-btn reject"
                      onClick={() => onRejectMessage(item)}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .ai-co-pilot {
          padding: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .co-pilot-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e9ecef;
        }

        .co-pilot-header h2 {
          font-size: 2rem;
          color: #2c3e50;
          margin: 0;
        }

        .chat-toggle-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .chat-toggle-btn:hover {
          background: #2980b9;
        }

        .co-pilot-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 30px;
        }

        /* Chat Window */
        .chat-window {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          display: flex;
          flex-direction: column;
          height: 600px;
        }

        .chat-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chat-message {
          display: flex;
          gap: 12px;
          max-width: 80%;
          align-self: flex-start;
        }

        .chat-message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .message-content {
          background: #f8f9fa;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
        }

        .chat-message.user .message-content {
          background: #3498db;
          color: white;
        }

        .message-content p {
          margin: 0 0 8px 0;
          line-height: 1.4;
        }

        .message-time {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3498db;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .chat-input-area {
          border-top: 1px solid #e9ecef;
          padding: 16px 20px;
          display: flex;
          gap: 12px;
        }

        .chat-input-area input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #dee2e6;
          border-radius: 24px;
          outline: none;
          font-size: 0.95rem;
        }

        .chat-input-area input:focus {
          border-color: #3498db;
        }

        .send-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 24px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .send-btn:hover:not(:disabled) {
          background: #2980b9;
        }

        .send-btn:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }

        /* Employee Email Section */
        .employee-email-section {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          margin-bottom: 20px;
          overflow: hidden;
        }

        .email-header {
          padding: 20px;
          border-bottom: 1px solid #e9ecef;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .email-header h3 {
          margin: 0 0 8px 0;
          font-size: 1.3rem;
        }

        .email-header small {
          opacity: 0.9;
          font-size: 0.9rem;
        }

        .email-form {
          padding: 20px;
        }

        .email-subject-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          margin-bottom: 16px;
          transition: border-color 0.3s ease;
        }

        .email-subject-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .email-content-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          margin-bottom: 16px;
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
          transition: border-color 0.3s ease;
        }

        .email-content-textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .email-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .queue-email-btn, .clear-email-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .queue-email-btn {
          background: #27ae60;
          color: white;
        }

        .queue-email-btn:hover:not(:disabled) {
          background: #219a52;
          transform: translateY(-1px);
        }

        .queue-email-btn:disabled {
          background: #6c757d;
          cursor: not-allowed;
          transform: none;
        }

        .clear-email-btn {
          background: #e74c3c;
          color: white;
        }

        .clear-email-btn:hover {
          background: #c0392b;
          transform: translateY(-1px);
        }

        /* Approval Center */
        .approval-center {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          height: fit-content;
        }

        .approval-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .approval-header h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin: 0;
        }

        .queue-count {
          background: #e74c3c;
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .empty-queue {
          padding: 40px 20px;
          text-align: center;
          color: #666;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .empty-queue p {
          margin: 0 0 8px 0;
          font-weight: 500;
        }

        .empty-queue small {
          color: #999;
        }

        .approval-items {
          max-height: 500px;
          overflow-y: auto;
        }

        .approval-item {
          padding: 20px;
          border-bottom: 1px solid #f8f9fa;
        }

        .approval-item:last-child {
          border-bottom: none;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .item-type {
          background: #3498db;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .item-client {
          font-weight: 600;
          color: #2c3e50;
        }

        .item-preview {
          margin-bottom: 16px;
        }

        .item-preview h4 {
          margin: 0 0 8px 0;
          font-size: 1rem;
          color: #2c3e50;
        }

        .item-preview p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .item-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .action-btn.approve {
          background: #27ae60;
          color: white;
        }

        .action-btn.approve:hover {
          background: #219a52;
        }

        .action-btn.edit {
          background: #f39c12;
          color: white;
        }

        .action-btn.edit:hover {
          background: #e67e22;
        }

        .action-btn.reject {
          background: #e74c3c;
          color: white;
        }

        .action-btn.reject:hover {
          background: #c0392b;
        }

        @media (max-width: 1024px) {
          .co-pilot-content {
            grid-template-columns: 1fr;
          }

          .chat-window {
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

// Client Message Center Component
const ClientMessageCenter = ({ messages, onMessageRead }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    onMessageRead(message.id);
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <div className="message-center">
      <div className="message-header">
        <h3>Messages</h3>
        {unreadCount > 0 && (
          <div className="unread-badge">{unreadCount}</div>
        )}
      </div>

      <div className="message-content">
        {!selectedMessage ? (
          <div className="message-list">
            {messages.length === 0 ? (
              <div className="no-messages">
                <div className="no-messages-icon">📧</div>
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={`message-item ${!message.read ? 'unread' : ''}`}
                  onClick={() => handleMessageClick(message)}
                >
                  <div className="message-sender">
                    <div className="sender-avatar">👔</div>
                    <div className="sender-info">
                      <div className="sender-name">{message.sender}</div>
                      <div className="sender-title">{message.senderTitle}</div>
                    </div>
                  </div>
                  <div className="message-preview">
                    <div className="message-subject">{message.subject}</div>
                    <div className="message-snippet">{message.preview}</div>
                    <div className="message-date">{message.date}</div>
                  </div>
                  {!message.read && <div className="unread-dot"></div>}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="message-detail">
            <div className="message-detail-header">
              <button
                className="back-to-list"
                onClick={() => setSelectedMessage(null)}
              >
                ← Back to Messages
              </button>
            </div>
            <div className="message-detail-content">
              <div className="message-meta">
                <div className="sender-info-detail">
                  <div className="sender-avatar-large">👔</div>
                  <div className="sender-details">
                    <div className="sender-name">{selectedMessage.sender}</div>
                    <div className="sender-title">{selectedMessage.senderTitle}</div>
                    <div className="message-date-detail">{selectedMessage.date}</div>
                  </div>
                </div>
              </div>
              <div className="message-subject-detail">
                <h2>{selectedMessage.subject}</h2>
              </div>
              <div className="message-body">
                {selectedMessage.body.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .message-center {
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e9ecef;
          background: #f8f9fa;
        }

        .message-header h3 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.3rem;
        }

        .unread-badge {
          background: #e74c3c;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .message-content {
          min-height: 400px;
        }

        .message-list {
          padding: 0;
        }

        .message-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f8f9fa;
          cursor: pointer;
          transition: background 0.3s ease;
          position: relative;
        }

        .message-item:hover {
          background: #f8f9fa;
        }

        .message-item.unread {
          background: #fff9c4;
          border-left: 4px solid #f39c12;
        }

        .message-item.unread:hover {
          background: #fff3c4;
        }

        .message-sender {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 200px;
        }

        .sender-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .sender-info {
          flex: 1;
        }

        .sender-name {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 2px;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .sender-title {
          font-size: 0.85rem;
          color: #666;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .message-preview {
          flex: 1;
          margin-left: 20px;
          min-width: 0; /* Allow flex item to shrink below content size */
          overflow: hidden; /* Ensure content doesn't overflow */
        }

        .message-subject {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 4px;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        .message-snippet {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 4px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          line-height: 1.4;
          max-height: 2.8rem;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .message-date {
          font-size: 0.8rem;
          color: #999;
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          background: #f39c12;
          border-radius: 50%;
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }

        .no-messages {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .no-messages-icon {
          font-size: 4rem;
          margin-bottom: 16px;
        }

        .message-detail {
          min-height: 400px;
        }

        .message-detail-header {
          padding: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .back-to-list {
          background: #6c757d;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .back-to-list:hover {
          background: #5a6268;
        }

        .message-detail-content {
          padding: 30px;
        }

        .message-meta {
          margin-bottom: 30px;
        }

        .sender-info-detail {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .sender-avatar-large {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
        }

        .sender-details {
          flex: 1;
        }

        .sender-name {
          font-size: 1.4rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 4px;
        }

        .sender-title {
          color: #666;
          margin-bottom: 8px;
        }

        .message-date-detail {
          color: #999;
          font-size: 0.9rem;
        }

        .message-subject-detail {
          margin-bottom: 30px;
          border-bottom: 2px solid #e9ecef;
          padding-bottom: 20px;
        }

        .message-subject-detail h2 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.5rem;
        }

        .message-body {
          line-height: 1.6;
          color: #333;
        }

        .message-body p {
          margin-bottom: 16px;
        }

        .message-body p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .message-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .message-preview {
            margin-left: 0;
            width: 100%;
          }

          .sender-info-detail {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

const App = () => {
  const [editMode, setEditMode] = useState(false);
  const [hiddenModules, setHiddenModules] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [currentView, setCurrentView] = useState('client'); // 'client' or 'manager'
  const [selectedClient, setSelectedClient] = useState(null);
  const [approvalQueue, setApprovalQueue] = useState([]);
  const [clientMessages, setClientMessages] = useState([
    {
      id: 1,
      sender: 'John Smith',
      senderTitle: 'Relationship Manager',
      subject: 'Following up on our Q3 Review',
      preview: 'It was great speaking with you this morning about your Q3 portfolio review...',
      date: '2 hours ago',
      read: false,
      body: `Dear Jane,

It was great speaking with you this morning about your Q3 portfolio review. As discussed, your portfolio is performing well, up 12.5% over the last six months.

Your technology holdings continue to show strong performance, and I've attached your latest quarterly statement for your review.

I also wanted to follow up on our discussion about the new sustainable infrastructure fund - I believe it aligns well with your stated investment goals and risk preferences.

Please don't hesitate to reach out if you have any questions.

Best regards,
John Smith
Relationship Manager`
    }
  ]);

  const [layouts, setLayouts] = useState({
    lg: [
      { i: 'portfolio', x: 0, y: 0, w: 6, h: 6, minW: 4, minH: 5 },
      { i: 'stocks', x: 6, y: 0, w: 6, h: 6, minW: 4, minH: 5 },
      { i: 'esg', x: 0, y: 6, w: 3, h: 5, minW: 3, minH: 4 },
      { i: 'risk', x: 3, y: 6, w: 3, h: 5, minW: 3, minH: 4 },
      { i: 'scenario', x: 6, y: 6, w: 3, h: 5, minW: 3, minH: 4 },
      { i: 'chatbot', x: 9, y: 6, w: 3, h: 8, minW: 3, minH: 6 },
      { i: 'news', x: 0, y: 11, w: 6, h: 5, minW: 4, minH: 4 },
      { i: 'messages', x: 6, y: 11, w: 6, h: 5, minW: 4, minH: 4 },
    ],
    md: [
      { i: 'portfolio', x: 0, y: 0, w: 5, h: 6, minW: 4, minH: 5 },
      { i: 'stocks', x: 5, y: 0, w: 5, h: 6, minW: 4, minH: 5 },
      { i: 'esg', x: 0, y: 6, w: 5, h: 5, minW: 3, minH: 4 },
      { i: 'risk', x: 5, y: 6, w: 5, h: 5, minW: 3, minH: 4 },
      { i: 'scenario', x: 0, y: 11, w: 5, h: 5, minW: 3, minH: 4 },
      { i: 'chatbot', x: 5, y: 11, w: 5, h: 8, minW: 3, minH: 6 },
      { i: 'news', x: 0, y: 16, w: 5, h: 5, minW: 3, minH: 4 },
      { i: 'messages', x: 5, y: 16, w: 5, h: 5, minW: 3, minH: 4 },
    ],
    sm: [
      { i: 'portfolio', x: 0, y: 0, w: 6, h: 6, minW: 3, minH: 5 },
      { i: 'stocks', x: 0, y: 6, w: 6, h: 6, minW: 3, minH: 5 },
      { i: 'esg', x: 0, y: 12, w: 6, h: 5, minW: 3, minH: 4 },
      { i: 'risk', x: 0, y: 17, w: 6, h: 5, minW: 3, minH: 4 },
      { i: 'scenario', x: 0, y: 22, w: 6, h: 5, minW: 3, minH: 4 },
      { i: 'chatbot', x: 0, y: 27, w: 6, h: 8, minW: 3, minH: 6 },
      { i: 'news', x: 0, y: 35, w: 6, h: 5, minW: 3, minH: 4 },
      { i: 'messages', x: 0, y: 40, w: 6, h: 5, minW: 3, minH: 4 },
    ]
  });
  
  const modules = [
    { i: 'portfolio', component: PortfolioOverview, title: 'Portfolio Overview' },
    { i: 'stocks', component: StockModule, title: 'Stocks' },
    { i: 'esg', component: ESGModule, title: 'ESG Impact' },
    { i: 'risk', component: RiskAnalytics, title: 'Risk Analytics' },
    { i: 'scenario', component: ScenarioSimulation, title: 'Risk Outlook' },
    { i: 'chatbot', component: ChatbotModule, title: 'AI Assistant' },
    { i: 'news', component: MarketNews, title: 'Market News' },
    { i: 'messages', component: ClientMessageCenter, title: 'Messages' },
  ];



  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const hideModule = (moduleId) => {
    setHiddenModules(prev => [...prev, moduleId]);
  };

  const showModule = (moduleId) => {
    setHiddenModules(prev => prev.filter(id => id !== moduleId));
  };

  // Filter layouts to exclude hidden modules
  const filteredLayouts = {
    lg: layouts.lg.filter(layout => !hiddenModules.includes(layout.i)),
    md: layouts.md.filter(layout => !hiddenModules.includes(layout.i)),
    sm: layouts.sm.filter(layout => !hiddenModules.includes(layout.i))
  };

  // Filter modules to exclude hidden ones
  const visibleModules = modules.filter(module => !hiddenModules.includes(module.i));

  // AI Co-pilot functions
  const handleGenerateMessage = (clientData) => {
    const newMessage = {
      id: Date.now(),
      type: 'Email',
      subject: 'Follow-up Email for ' + clientData.name,
      preview: `Professional follow-up email drafted for ${clientData.name}`,
      clientName: clientData.name,
      content: `Subject: Following up on our recent discussion

Dear ${clientData.name},

I wanted to follow up on our recent conversation about your investment portfolio. As discussed, your portfolio is performing well with a ${clientData.performance} return year-to-date.

Please review the attached documents and let me know if you have any questions.

Best regards,
[Your Name]
Relationship Manager`
    };

    setApprovalQueue(prev => [...prev, newMessage]);
  };

  const handleApproveMessage = (message) => {
    // Add to client messages and remove from approval queue
    const clientMessage = {
      id: Date.now(),
      sender: 'John Smith',
      senderTitle: 'Relationship Manager',
      subject: message.subject,
      preview: message.preview,
      date: 'Just now',
      read: false,
      body: message.content
    };

    setClientMessages(prev => [clientMessage, ...prev]);
    setApprovalQueue(prev => prev.filter(item => item.id !== message.id));
  };

  const handleRejectMessage = (message) => {
    setApprovalQueue(prev => prev.filter(item => item.id !== message.id));
  };

  const handleEditMessage = (message) => {
    // In a real implementation, this would open an edit modal
    console.log('Edit message:', message);
  };

  const handleMessageRead = (messageId) => {
    setClientMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <img src="/logo.png" alt="HSBC Logo" className="hsbc-logo-image" />
            <span className="dashboard-title">Premier Dashboard</span>
          </div>
        </div>
        
        <div className="header-center">
          <div className="search-bar">
            <Search size={20} />
            <input type="text" placeholder="Search investments, stocks, reports..." />
          </div>
          <button
            className={`view-toggle-btn ${currentView}`}
            onClick={() => setCurrentView(currentView === 'client' ? 'manager' : 'client')}
          >
            {currentView === 'client' ? (
              <>
                <Shield size={20} />
                Switch to Manager View
              </>
            ) : (
              <>
                <Eye size={20} />
                Switch to Client View
              </>
            )}
          </button>
        </div>
        
        <div className="header-right">
          <button
            className={`header-btn ${editMode ? 'active' : ''}`}
            onClick={toggleEditMode}
            title={editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          >
            <Edit3 size={20} />
          </button>
          <button className="header-btn">
            <Bell size={20} />
          </button>
          <button className="header-btn">
            <Settings size={20} />
          </button>
          <div className="user-profile">
            <User size={20} />
            <span>John Smith</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {currentView === 'manager' ? (
          // Manager View
          selectedClient ? (
            // Client Deep Dive
            <ClientDeepDive
              clientId={selectedClient}
              onBack={() => setSelectedClient(null)}
              stockData={stockData}
              newsData={newsData}
              onGenerateMessage={handleGenerateMessage}
            />
          ) : (
            // Daily Command Center
            <ManagerDashboard
              onSelectClient={setSelectedClient}
              approvalQueueCount={approvalQueue.length}
              stockData={stockData}
              newsData={newsData}
              onStockDataUpdate={setStockData}
              onNewsDataUpdate={setNewsData}
            />
          )
        ) : (
          // Client View
          <>
            <div className="dashboard-header">
              <h1>Welcome back, Jane</h1>
              <p>Your personalized investment dashboard</p>
            </div>

            {editMode && (
              <div className="edit-mode-banner">
                <div className="edit-banner-content">
                  <Edit3 size={16} />
                  <span>Edit Mode Active - Drag and resize modules, or use the X button to hide them</span>
                </div>
                {hiddenModules.length > 0 && (
                  <div className="hidden-modules">
                    <span>Hidden: </span>
                    {hiddenModules.map(moduleId => {
                      const module = modules.find(m => m.i === moduleId);
                      return (
                        <button
                          key={moduleId}
                          className="restore-btn"
                          onClick={() => showModule(moduleId)}
                        >
                          <Plus size={12} />
                          {module?.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

                   <div className="dashboard-main">
                     <ResponsiveGridLayout
                       className={`layout ${editMode ? 'edit-mode' : ''}`}
                       layouts={filteredLayouts}
                       onLayoutChange={onLayoutChange}
                       breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                       cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                       rowHeight={80}
                       margin={[16, 16]}
                       containerPadding={[16, 16]}
                       isDraggable={editMode}
                       isResizable={editMode}
                       useCSSTransforms={true}
                       compactType="vertical"
                       resizeHandles={editMode ? ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'] : []}
                     >
                       {visibleModules.map(({ i, component: Component, title }) => (
                         <div key={i} className={`dashboard-module ${editMode ? 'edit-mode' : ''}`}>
                           <div className="module-header">
                             <h3>{title}</h3>
                             <div
                               className="module-actions"
                               onMouseDown={editMode ? (e) => e.stopPropagation() : undefined}
                               onClick={editMode ? (e) => e.stopPropagation() : undefined}
                             >
                               {editMode && (
                                 <button
                                   className="module-remove"
                                   onMouseDown={(e) => {
                                     e.stopPropagation();
                                     e.preventDefault();
                                   }}
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     e.preventDefault();
                                     hideModule(i);
                                   }}
                                   title="Hide this module"
                                 >
                                   <X size={14} />
                                 </button>
                               )}
                               <button className="module-settings">
                                 <Settings size={16} />
                               </button>
                             </div>
                           </div>
                           <div className="module-content">
                             {i === 'stocks' ? (
                               <Component onStockDataUpdate={setStockData} />
                             ) : i === 'chatbot' ? (
                               <Component stockData={stockData} newsData={newsData} />
                             ) : i === 'news' ? (
                               <Component onNewsDataUpdate={setNewsData} />
                             ) : i === 'messages' ? (
                               <Component messages={clientMessages} onMessageRead={handleMessageRead} />
                             ) : (
                               <Component />
                             )}
                           </div>
                         </div>
                       ))}
                     </ResponsiveGridLayout>
                   </div>
          </>
        )}

        {/* AI Co-Pilot Modal (can be triggered from manager view) */}
        {selectedClient === 'ai-copilot' && (
          <AICoPilot
            approvalQueue={approvalQueue}
            onApproveMessage={handleApproveMessage}
            onRejectMessage={handleRejectMessage}
            onEditMessage={handleEditMessage}
          />
        )}
      </main>
    </div>
  );
};

export default App;