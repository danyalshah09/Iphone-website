import Navbar from './components/Navbar'
import Hero from "./components/Hero"; // ✅ Correct default import
import Highlight from "./components/Highlight"; // ✅ Default import, no curly braces
import Model from "./components/Model"
function App() {

  return (
    <>
   <main className="bg-black">
    <Navbar/>
    <Hero/>
<Highlight/>
<Model/>
   </main>
    </>
  )
}

export default App
