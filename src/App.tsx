import { Routes, Route } from 'react-router'
import Seo from '@/components/Seo'
import Home from './pages/Home'
import ProductsPage from './pages/ProductsPage'
import FirePage from './pages/FirePage'
import AcidPage from './pages/AcidPage'
import AdhesivePage from './pages/AdhesivePage'
import AutomationPage from './pages/AutomationPage'
import AboutPage from './pages/AboutPage'
import FieldsPage from './pages/FieldsPage'
import InsightsPage from './pages/InsightsPage'
import QualityPage from './pages/QualityPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <>
      <Seo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/fire" element={<FirePage />} />
        <Route path="/products/acid" element={<AcidPage />} />
        <Route path="/products/adhesive" element={<AdhesivePage />} />
        <Route path="/products/automation" element={<AutomationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/fields" element={<FieldsPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/quality" element={<QualityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
