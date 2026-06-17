import { useState, useEffect, useCallback } from 'react';

export function useBundleState(productsData) {
  // ✅ نتأكد إن productsData موجودة
  const safeProductsData = productsData || { steps: [] };
  
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('bundleConfig');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // ✅ نتأكد إن الـ state فيه steps
        if (parsed && parsed.steps) {
          return parsed;
        }
      } catch (e) {
        console.error('Error loading saved state', e);
      }
    }
    
    // ✅ نبدأ بستيب فاضية آمنة
    const initialSteps = {};
    if (safeProductsData.steps && Array.isArray(safeProductsData.steps)) {
      safeProductsData.steps.forEach(step => {
        if (step && step.id) {
          initialSteps[step.id] = { products: {} };
        }
      });
    }

    return {
      steps: initialSteps,
      currentStep: 1,
      isSaved: false
    };
  });

  // ✅ نتأكد إن state و state.steps موجودين قبل أي حاجة
  useEffect(() => {
    if (state && state.steps) {
      localStorage.setItem('bundleConfig', JSON.stringify(state));
    }
  }, [state]);

  // ✅ دالة آمنة لجلب بيانات المنتج
  const getProductData = useCallback((stepId, productId) => {
    if (!safeProductsData || !safeProductsData.steps) return null;
    const step = safeProductsData.steps.find(s => s && s.id === stepId);
    if (!step || !step.products) return null;
    return step.products.find(p => p && p.id === productId) || null;
  }, [safeProductsData]);

  // ✅ دالة آمنة لإنشاء منتج جديد
  const createProductState = useCallback((productData) => {
    if (!productData) return { selectedVariant: null, variants: {} };
    
    const variantsState = {};
    if (productData.variants && Array.isArray(productData.variants) && productData.variants.length > 0) {
      productData.variants.forEach(v => {
        if (v && v.id) {
          variantsState[v.id] = { quantity: 0 };
        }
      });
    } else {
      variantsState['default'] = { quantity: 0 };
    }

    return {
      selectedVariant: productData.variants && productData.variants.length > 0 ? productData.variants[0].id : 'default',
      variants: variantsState
    };
  }, []);

  // ✅ أهم دالة: تحديث الكمية مع حماية كاملة
  const updateQuantity = useCallback((stepId, productId, variantId, newQuantity) => {
    setState(prev => {
      // ✅ نتأكد إن prev موجود
      if (!prev) {
        return { steps: {}, currentStep: 1, isSaved: false };
      }
      
      const quantity = Math.max(0, newQuantity);
      
      // ✅ نعمل نسخة آمنة
      const newState = {
        steps: { ...(prev.steps || {}) },
        currentStep: prev.currentStep || 1,
        isSaved: prev.isSaved || false
      };
      
      // ✅ نتأكد إن الـ step موجود
      if (!newState.steps[stepId]) {
        newState.steps[stepId] = { products: {} };
      }
      
      // ✅ نجيب المنتج أو نضيفه
      let productState = newState.steps[stepId].products[productId];
      if (!productState) {
        const productData = getProductData(stepId, productId);
        if (!productData) return prev;
        productState = createProductState(productData);
        newState.steps[stepId].products[productId] = productState;
      }
      
      // ✅ نحدث الكمية
      if (!productState.variants) {
        productState.variants = {};
      }
      if (!productState.variants[variantId]) {
        productState.variants[variantId] = { quantity: 0 };
      }
      productState.variants[variantId].quantity = quantity;
      
      // ✅ لو الكمية صفر، نشيل المنتج
      const allZero = Object.values(productState.variants).every(v => v && v.quantity === 0);
      if (allZero) {
        delete newState.steps[stepId].products[productId];
      }
      
      return newState;
    });
  }, [getProductData, createProductState]);

  // ✅ باقي الدوال مع حماية
  const selectVariant = useCallback((stepId, productId, variantId) => {
    setState(prev => {
      if (!prev || !prev.steps || !prev.steps[stepId] || !prev.steps[stepId].products[productId]) {
        return prev;
      }
      
      const newState = JSON.parse(JSON.stringify(prev));
      newState.steps[stepId].products[productId].selectedVariant = variantId;
      return newState;
    });
  }, []);

  const setCurrentStep = useCallback((stepId) => {
    setState(prev => ({
      ...(prev || { steps: {}, currentStep: 1, isSaved: false }),
      currentStep: stepId
    }));
  }, []);

  const saveSystem = useCallback(() => {
    setState(prev => ({
      ...(prev || { steps: {}, currentStep: 1, isSaved: false }),
      isSaved: true
    }));
  }, []);

  const getSelectedCount = useCallback((stepId) => {
    if (!state || !state.steps || !state.steps[stepId]) return 0;
    
    const step = state.steps[stepId];
    if (!step || !step.products) return 0;
    
    let count = 0;
    Object.values(step.products).forEach(product => {
      if (product && product.variants) {
        Object.values(product.variants).forEach(variant => {
          if (variant && variant.quantity > 0) count++;
        });
      }
    });
    return count;
  }, [state]);

  const calculateTotal = useCallback(() => {
    let subtotal = 0;
    let totalSavings = 0;
    let items = [];

    // ✅ نتأكد من البيانات
    if (!state || !state.steps || !safeProductsData || !safeProductsData.steps) {
      return { items: [], subtotal: 0, totalSavings: 0, total: 0, shipping: 0 };
    }

    const allProducts = {};
    safeProductsData.steps.forEach(step => {
      if (step && step.products) {
        step.products.forEach(product => {
          if (product && product.id) {
            allProducts[product.id] = product;
          }
        });
      }
    });

    Object.entries(state.steps).forEach(([stepId, step]) => {
      if (!step || !step.products) return;
      
      Object.entries(step.products).forEach(([productId, productState]) => {
        if (!productState || !productState.variants) return;
        
        const productData = allProducts[productId];
        if (!productData) return;

        Object.entries(productState.variants).forEach(([variantId, variant]) => {
          if (!variant || !variant.quantity || variant.quantity <= 0) return;
          
          const price = productData.price || 0;
          const compareAt = productData.compareAtPrice || price;
          const totalPrice = price * variant.quantity;
          const saving = (compareAt - price) * variant.quantity;

          subtotal += totalPrice;
          totalSavings += saving;

          const variantLabel = (productData.variants && Array.isArray(productData.variants)) 
            ? productData.variants.find(v => v && v.id === variantId)?.label || '' 
            : '';
          
          items.push({
            id: `${productId}-${variantId}`,
            productId,
            variantId,
            name: productData.name || 'Unknown',
            variantLabel,
            quantity: variant.quantity,
            price,
            compareAt,
            image: productData.image || '',
            stepId: parseInt(stepId) || 0
          });
        });
      });
    });

    return {
      items,
      subtotal,
      totalSavings,
      total: subtotal,
      shipping: items.length > 0 ? 0 : 0
    };
  }, [state, safeProductsData]);

  return {
    state: state || { steps: {}, currentStep: 1, isSaved: false },
    selectVariant,
    updateQuantity,
    setCurrentStep,
    saveSystem,
    getSelectedCount,
    calculateTotal
  };
}