'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import CategoryShowcase from '@/components/CategoryShowcase';
import CatalogSection from '@/components/CatalogSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';
import { Product, PRODUCTS } from '@/data/products';
import { ArrowUp } from 'lucide-react';
import { scrollToTopFast } from '@/lib/scroll';

const ProductSpecModal = dynamic(() => import('@/components/ProductSpecModal'), { ssr: false });
const CommercialProposalModal = dynamic(() => import('@/components/CommercialProposalModal'), { ssr: false });

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'contacts'>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [catalogInitialViewMode, setCatalogInitialViewMode] = useState<'list' | 'grid' | 'matrix' | 'seasonality'>('list');
  const [catalogInitialCountryFilter, setCatalogInitialCountryFilter] = useState<string>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSpecProduct, setActiveSpecProduct] = useState<Product | null>(null);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);
  const [quoteSessionId, setQuoteSessionId] = useState(0);

  const isInitialSyncDone = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const syncFromUrl = () => {
      const url = new URL(window.location.href);

      const cat = url.searchParams.get('category');
      if (cat) {
        setActiveTab('catalog');
        setSelectedCategoryFilter(cat);
      }

      const rawProdId = url.searchParams.get('product');
      if (rawProdId) {
        const cleanProdId = rawProdId.replace(/^\$/, '');
        const prod = PRODUCTS.find((p) => p.id === cleanProdId);
        if (prod) {
          setActiveSpecProduct(prod);
        }
      }

      const hash = window.location.hash.toLowerCase();
      if (hash === '#catalog') {
        setActiveTab('catalog');
        setSelectedCategoryFilter('all');
      } else if (hash === '#contacts' || hash === '#contacts-section') {
        setActiveTab('contacts');
        setTimeout(() => {
          const element = document.getElementById('contacts-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      }

      isInitialSyncDone.current = true;
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !isInitialSyncDone.current) return;
    const url = new URL(window.location.href);
    if (activeSpecProduct) {
      url.searchParams.set('product', activeSpecProduct.id);
      window.history.replaceState({}, '', url.toString());
    } else if (url.searchParams.has('product')) {
      url.searchParams.delete('product');
      window.history.replaceState({}, '', url.toString());
    }
  }, [activeSpecProduct]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (tab: 'home' | 'catalog' | 'contacts') => {
    if (tab === 'contacts') {
      const wasCatalog = activeTab === 'catalog';
      setActiveTab('contacts');

      const scrollToContacts = () => {
        const element = document.getElementById('contacts-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      if (wasCatalog) {
        setTimeout(scrollToContacts, 80);
      } else {
        requestAnimationFrame(() => {
          scrollToContacts();
        });
      }
      return;
    }

    if (tab === 'catalog') {
      setSelectedCategoryFilter('all');
      setCatalogInitialViewMode('list');
      setCatalogInitialCountryFilter('all');
      setActiveTab('catalog');
      scrollToTopFast();
      return;
    }

    if (tab === 'home') {
      setActiveTab('home');
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
      return;
    }
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setCatalogInitialViewMode('list');
    setCatalogInitialCountryFilter('all');
    setActiveTab('catalog');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  const handleOpenSpec = (product: Product) => {
    setActiveSpecProduct(product);
  };

  const handleOpenQuote = (product?: Product | null) => {
    setQuoteProduct(product || null);
    setQuoteSessionId((prev) => prev + 1);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfa]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNav}
        onOpenQuoteModal={() => handleOpenQuote(null)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 py-5 sm:py-7">
        {(activeTab === 'home' || activeTab === 'contacts') && (
          <div className="space-y-6 sm:space-y-8">
            <HeroSection
              onGoToCatalog={() => {
                setSelectedCategoryFilter('all');
                setActiveTab('catalog');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                }
              }}
              onOpenQuoteModal={() => handleOpenQuote(null)}
            />

            <div>
              <FeatureCards />
            </div>

            <div id="categories" className="pt-4 sm:pt-6">
              <CategoryShowcase
                onSelectCategory={handleSelectCategory}
                onViewAll={() => {
                  setSelectedCategoryFilter('all');
                  setActiveTab('catalog');
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                  }
                }}
              />
            </div>

            <div id="contacts-section" className="pt-8 sm:pt-12 border-t border-stone-200/80 scroll-mt-24 sm:scroll-mt-28">
              <ContactsSection />
            </div>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div id="catalog">
            <CatalogSection
              selectedCategoryFilter={selectedCategoryFilter}
              initialViewMode={catalogInitialViewMode}
              initialCountryFilter={catalogInitialCountryFilter}
              onBackToHome={() => {
                setActiveTab('home');
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                }
              }}
              onOpenSpec={handleOpenSpec}
              onOpenQuote={(prod) => handleOpenQuote(prod)}
            />
          </div>
        )}
      </main>

      <Footer />

      <ProductSpecModal
        product={activeSpecProduct}
        onClose={() => setActiveSpecProduct(null)}
        onRequestQuote={(prod) => handleOpenQuote(prod)}
      />

      <CommercialProposalModal
        isOpen={quoteModalOpen}
        initialProduct={quoteProduct}
        sessionId={quoteSessionId}
        onClose={() => setQuoteModalOpen(false)}
      />

      {showScrollTop && (
        <button
          onClick={scrollToTopFast}
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-40 w-12 h-12 sm:w-auto sm:h-auto sm:px-5 sm:py-2.5 rounded-full bg-[#223329] text-white shadow-xl flex items-center justify-center gap-2 border border-stone-600/40 cursor-pointer animate-fadeIn hover:bg-[#15221b] transition-all"
          aria-label="Наверх"
          title="Наверх"
        >
          <ArrowUp className="w-5 h-5 sm:w-4.5 sm:h-4.5" />
          <span className="hidden sm:inline text-xs font-bold tracking-wider uppercase">Наверх</span>
        </button>
      )}
    </div>
  );
}
