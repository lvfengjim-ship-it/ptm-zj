import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Products from '@/sections/Products'
import Fields from '@/sections/Fields'
import AiHub from '@/sections/AiHub'
import Quality from '@/sections/Quality'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Fields />
        <AiHub />
        <Quality />
      </main>
      <Footer />
    </div>
  )
}
