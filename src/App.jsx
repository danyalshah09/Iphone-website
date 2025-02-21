import Navbar from './components/Navbar'
import Hero from "./components/Hero"; // ✅ Correct default import
import Highlight from "./components/Highlight"; // ✅ Default import, no curly braces
function App() {

  return (
    <>
   <main className="bg-black">
    <Navbar/>
    <Hero/>
<Highlight/>
   </main>
    </>
  )
}

export default App
