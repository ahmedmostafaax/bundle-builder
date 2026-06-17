import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useBundleState } from './hooks/useBundleState';
import productsData from './data/products.json';
import Builder from './components/Builder/Builder';
import ReviewPanel from './components/ReviewPanel/ReviewPanel';
import SavedSystems from './pages/SavedSystems';
import { Toaster, toast } from 'react-hot-toast';

function HomePage() {
  const safeProductsData = productsData && productsData.steps ? productsData : { steps: [] };
  
  const bundle = useBundleState(safeProductsData);
  
  const {
    state = { steps: {}, currentStep: 1 },
    selectVariant = () => {},
    updateQuantity = () => {},
    setCurrentStep = () => {},
    getSelectedCount = () => 0,
    calculateTotal = () => ({ items: [], total: 0 }),
    saveSystem = () => {}
  } = bundle || {};

  const totals = calculateTotal();

  // ✅ Toast حفظ النظام (أزرق)
  const handleSave = () => {
    const systemName = `System ${new Date().toLocaleString()}`;
    
    const systemData = {
      name: systemName,
      savedAt: new Date().toLocaleString(),
      total: totals.total || 0,
      items: totals.items || [],
      state: state
    };
    const key = `bundleConfig_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(systemData));
    saveSystem();
    
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        style={{
          background: '#1E3A5F',
          borderRadius: '12px',
          padding: '16px 20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}
      >
        <div className="flex-1 w-0 p-2">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">
                System Saved! 💾
              </p>
              <p className="mt-1 text-sm text-blue-100">
                {systemName} has been saved successfully.
              </p>
              <p className="mt-0.5 text-xs text-blue-200">
                Total: ${totals.total.toFixed(2)} • {totals.items.length} items
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-blue-400 border-opacity-30 pl-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-lg px-4 py-2 flex items-center justify-center text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'bottom-center',
    });
  };

  // ✅ Toast الـ Checkout (أخضر) - زي الـ Save بالضبط بس أخضر
  const handleCheckout = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        style={{
          background: '#10B981',
          borderRadius: '12px',
          padding: '16px 20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}
      >
        <div className="flex-1 w-0 p-2">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">
                Order Placed! 🎉
              </p>
              <p className="mt-1 text-sm text-green-100">
                Your order has been placed successfully.
              </p>
              <p className="mt-0.5 text-xs text-green-200">
                Total: ${totals.total.toFixed(2)} • {totals.items.length} items
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-green-400 border-opacity-30 pl-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-lg px-4 py-2 flex items-center justify-center text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'bottom-center',
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white relative">
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1E3A5F',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          },
        }}
      />
      
      {/* زر Saved Systems */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          to="/saved"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md border flex items-center gap-2"
          style={{
            color: '#1E3A5F',
            background: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'rgba(30, 58, 95, 0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          Saved Systems
        </Link>
      </div>
      
      {/* Builder */}
      <div className="w-full md:w-1/2 p-4 md:p-8">
        <Builder 
          steps={safeProductsData.steps || []}
          currentStep={state.currentStep || 1}
          selectedState={state.steps || {}}
          onSelectVariant={selectVariant}
          onUpdateQuantity={updateQuantity}
          onSetCurrentStep={setCurrentStep}
          getSelectedCount={getSelectedCount}
        />
      </div>
      
      {/* Review Panel */}
      <div className="w-full md:w-1/2 p-4 md:p-8">
        <ReviewPanel 
          items={totals.items || []}
          totals={totals}
          onUpdateQuantity={updateQuantity}
          onSave={handleSave}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/saved" element={<SavedSystems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;