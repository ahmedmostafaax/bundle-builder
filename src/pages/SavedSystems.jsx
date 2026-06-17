import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SavedSystems() {
  const [savedSystems, setSavedSystems] = useState([]);

  useEffect(() => {
    // نجيب كل الأنظمة المحفوظة من localStorage
    const systems = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('bundleConfig_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          systems.push({
            id: key,
            name: data.name || `System ${i + 1}`,
            date: data.savedAt || new Date().toLocaleDateString(),
            total: data.total || 0,
            items: data.items || []
          });
        } catch (e) {
          console.error('Error parsing saved system', e);
        }
      }
    }
    setSavedSystems(systems);
  }, []);

  const loadSystem = (systemId) => {
    const data = localStorage.getItem(systemId);
    if (data) {
      localStorage.setItem('bundleConfig', data);
      window.location.href = '/';
    }
  };

  const deleteSystem = (systemId) => {
    localStorage.removeItem(systemId);
    setSavedSystems(savedSystems.filter(s => s.id !== systemId));
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* ✅ زر الرجوع - شفاف على اليمين */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          to="/"
          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md border flex items-center gap-2"
          style={{
            color: '#1E3A5F',
            background: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'rgba(30, 58, 95, 0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Builder
        </Link>
      </div>

      <div className="max-w-4xl mx-auto pt-12">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#1E3A5F' }}>
          💾 Saved Systems
        </h1>

        {savedSystems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm" style={{ background: '#EDF4FF' }}>
            <p className="text-gray-500 text-lg">No saved systems found.</p>
            <Link
              to="/"
              className="inline-block mt-4 px-6 py-2 rounded-lg text-white hover:opacity-90 transition-colors"
              style={{ background: '#1E3A5F' }}
            >
              Build Your First System
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {savedSystems.map((system) => (
              <div
                key={system.id}
                className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-shadow"
                style={{ background: '#EDF4FF' }}
              >
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: '#1E3A5F' }}>
                    {system.name}
                  </h3>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    Saved: {system.date} • {system.items.length} items • Total: ${system.total.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => loadSystem(system.id)}
                    className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-colors"
                    style={{ background: '#1E3A5F' }}
                  >
                    Load
                  </button>
                  <button
                    onClick={() => deleteSystem(system.id)}
                    className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-colors"
                    style={{ background: '#EF4444' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedSystems;