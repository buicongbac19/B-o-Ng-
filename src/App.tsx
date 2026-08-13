import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ShopBadge } from './components/ShopBadge';
import { HealthBenefits } from './components/HealthBenefits';
import { ProductDetails } from './components/ProductDetails';
import { CookingMethods } from './components/CookingMethods';
import { PrepSteps } from './components/PrepSteps';
import { ProductGallery } from './components/ProductGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { FeaturedCallToAction } from './components/FeaturedCallToAction';
import { OrderForm } from './components/OrderForm';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { RecentOrderToast } from './components/RecentOrderToast';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { SubmittedOrder } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'description'>('overview');
  
  // Gallery Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Submitted Order state
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null);


  const handleScrollToOrder = () => {
    const orderElem = document.getElementById('order-form-section');
    if (orderElem) {
      orderElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenGallery = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleOrderSuccess = (order: SubmittedOrder) => {
    setSubmittedOrder(order);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 text-gray-900 font-sans antialiased selection:bg-amber-200">
      
      {/* Sticky Top Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOrderClick={handleScrollToOrder}
      />

      {/* Main Page Content */}
      <main className="pb-12">
        {/* Hero Section & Price Card */}
        <HeroSection
          onOrderClick={handleScrollToOrder}
          onOpenGallery={handleOpenGallery}
        />

        {/* Shop Info Card */}
        <ShopBadge />

        {/* Health Benefits & Key Features */}
        <HealthBenefits />

        {/* Product Details & Specifications */}
        <ProductDetails />

        {/* Cooking Methods & Storage */}
        <CookingMethods />

        {/* Preparation Steps */}
        <PrepSteps />

        {/* Photo Gallery */}
        <ProductGallery onOpenGallery={handleOpenGallery} />

        {/* Customer Reviews Section */}
        <ReviewsSection onOpenGallery={handleOpenGallery} />

        {/* High Conversion Call to Action Banner */}
        <FeaturedCallToAction onOrderClick={handleScrollToOrder} />

        {/* Order Form Section */}
        <OrderForm
          onOrderSuccess={handleOrderSuccess}
        />
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Mobile Sticky Bottom CTA Bar */}
      <MobileStickyBar onOrderClick={handleScrollToOrder} />

      {/* Social Proof Order Toast */}
      <RecentOrderToast />

      {/* Interactive Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Order Confirmation Modal */}
      <OrderSuccessModal
        order={submittedOrder}
        onClose={() => setSubmittedOrder(null)}
      />



    </div>
  );
}
