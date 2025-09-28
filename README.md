# HSBC Premier Dashboard

A fully customizable, modular dashboard for HSBC's high-net-worth and premier clients.

## 🚀 Quick Start

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔑 Free API Setup (Optional - for Real Stock Data)

The dashboard works out-of-the-box with demo data, but for **real, live stock prices**, add these free API keys:

### 1. Create `.env` file in project root:

```bash
# Create .env file in hsbc-dashboard/ directory
touch .env
```

### 2. Add your free API keys:

```env
# Twelve Data - 800 free requests/day
VITE_TWELVE_DATA_API_KEY=your_free_key_here

# Alpha Vantage - 25 free requests/day
VITE_ALPHA_VANTAGE_API_KEY=your_free_key_here

# Financial Modeling Prep - Free tier available
VITE_FMP_API_KEY=your_free_key_here
```

### 3. Get Free API Keys:

- **Twelve Data**: https://twelvedata.com/pricing (800 requests/day FREE)
- **Alpha Vantage**: https://www.alphavantage.co/support/#api-key (25 requests/day FREE)
- **Financial Modeling Prep**: https://financialmodelingprep.com/developer/docs (FREE tier)

### 4. Restart development server:

```bash
npm run dev
```

**Without API keys**: Dashboard shows realistic mock data  
**With API keys**: Dashboard shows real, live stock prices from multiple APIs

## ✨ Features

### Drag & Drop Modules
- **Portfolio Overview**: Total value, performance charts, asset allocation
- **Stocks**: Real-time holdings with price changes and trends
- **ESG Impact**: Environmental, Social, Governance scores and insights
- **Risk Analytics**: Portfolio risk assessment and recommendations
- **Scenario Simulation**: Interactive market scenario testing
- **Market News**: Curated financial news with impact indicators

### Customization
- **Drag & Drop**: Rearrange modules to your preference
- **Resizable**: Adjust module sizes (small, medium, large)
- **Responsive**: Works on desktop, tablet, and mobile devices

## 🏗️ Project Structure

```
src/
├── components/           # Individual dashboard modules
│   ├── PortfolioOverview.jsx
│   ├── StockModule.jsx
│   ├── ESGModule.jsx
│   ├── RiskAnalytics.jsx
│   ├── ScenarioSimulation.jsx
│   └── MarketNews.jsx
├── App.jsx              # Main dashboard layout
├── App.css              # Dashboard styling
└── index.css            # Global styles
```

## 🎨 Design Features

- **HSBC Branding**: Signature red color scheme (#dc143c)
- **Professional UI**: Banking-grade interface design
- **Smooth Animations**: Hover effects and transitions
- **Modern Icons**: Lucide React icon library
- **Charts**: Recharts for financial data visualization

## 📱 Responsive Design

The dashboard automatically adapts to different screen sizes:
- **Desktop**: Full grid layout with all features
- **Tablet**: Optimized module sizing
- **Mobile**: Stacked layout with touch-friendly controls

## 🔧 Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast development and building
- **react-grid-layout** - Drag & drop grid system
- **Recharts** - Financial charts and data visualization
- **Lucide React** - Modern icon library
- **CSS3** - Advanced styling with gradients and animations

## 💡 Usage Tips

1. **Drag modules** by clicking and holding the module header
2. **Resize modules** using the corner handle (bottom-right)
3. **Filter news** by clicking the filter buttons in Market News
4. **Run scenarios** by selecting different options in Scenario Simulation
5. **View details** by hovering over charts and metrics

---

Built for HSBC's digital transformation initiative to provide premier clients with a personalized, interactive investment dashboard.