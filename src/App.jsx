import Navbar from './components/Navbar'
import Hero from "./components/Hero"; // ✅ Correct default import
import Highlight from "./components/Highlight"; // ✅ Default import, no curly braces
import Model from "./components/Model"
import Features from './components/Features';
import Additional from './components/Additional';
import Footer from './components/Footer';

function App() {

  return (
    <>
   <main className="bg-black">
    <Navbar/>
    <Hero/>
<Highlight/>
<Model/>
<Features/>
<Additional/>
<Footer/>
   </main>
    </>
  )
}

export default App
