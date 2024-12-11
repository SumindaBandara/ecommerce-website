import Hero from "./components/Hero"; //! ./ => Inside the same folder
import Products from "./components/Products";
import Middle from "./components/middle";
import Footer from "./components/Footer";

function HomePage() {
  const name = "Manupa";

  return (
    <div>      
      <Hero />
      <Products />
      <Middle/>
      <Footer/>
    </div>
  );
}

export default HomePage;
