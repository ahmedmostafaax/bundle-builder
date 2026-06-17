# 🏗️ Bundle Builder

A multi-step product bundle builder built with React + TailwindCSS.  
Users can assemble a security system by selecting products across 4 steps, with a live review panel that updates in real-time.

---

## 🚀 Features

- ✅ **4-step accordion builder** (Cameras → Plan → Sensors → Protection)
- ✅ **Live review panel** with real-time totals
- ✅ **Variant selection** (e.g., White/Black) with independent quantities
- ✅ **Quantity steppers** synced between builder and review panel
- ✅ **Save system** to localStorage with toast notifications
- ✅ **Saved systems page** to load or delete previous configurations
- ✅ **Fully responsive** (mobile to desktop)
- ✅ **Persistent state** via localStorage

---

## 🛠️ Tech Stack

- **React** (Vite)
- **TailwindCSS** (v3)
- **React Router** (for Saved Systems page)
- **react-hot-toast** (for notifications)
- **localStorage** (for persistence)

---

## 📦 Installation & Run Instructions

### 1. Clone the repository
----
-Install dependencies 
npm install
----
-Start the development server
npm run dev
---- 
-Build for production
npm run build
--- 
-src/
├── components/
│   ├── Builder/
│   │   ├── Builder.jsx
│   │   ├── Step.jsx
│   │   └── ProductCard.jsx
│   ├── ReviewPanel/
│   │   ├── ReviewPanel.jsx
│   │   └── ReviewItem.jsx
│   └── common/
│       ├── QuantityStepper.jsx
│       └── VariantSelector.jsx
├── hooks/
│   └── useBundleState.js
├── pages/
│   └── SavedSystems.jsx
├── data/
│   └── products.json
├── App.jsx
├── main.jsx
└── index.cssProject Structure


```bash
git clone https://github.com/YourUsername/bundle-builder.git
cd bundle-builder
