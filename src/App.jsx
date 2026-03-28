import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'

// Code-splitting: cada página se carga solo cuando el usuario la visita
const HomePage = lazy(() => import('./pages/HomePage'))
const FlavorsPage = lazy(() => import('./pages/FlavorsPage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const StoryPage = lazy(() => import('./pages/StoryPage'))
const LocationsPage = lazy(() => import('./pages/LocationsPage'))
const B2BPage = lazy(() => import('./pages/B2BPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const PageLoader = () => (
    <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-chocolate/20 border-t-chocolate rounded-full animate-spin"></div>
    </div>
);

function App() {
    return (
        <Suspense fallback={<PageLoader />}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="flavors" element={<FlavorsPage />} />
                <Route path="productos" element={<ProductsPage />} />
                <Route path="carta" element={<MenuPage />} />
                <Route path="story" element={<StoryPage />} />
                <Route path="locations" element={<LocationsPage />} />
                <Route path="b2b" element={<B2BPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Suspense>
    );
}

export default App
