import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

import Footer from "./components/Footer";

function App() {
    const [vista, setVista] = useState("home");
    const [carrito, setCarrito] = useState([]);
    
    function agregarAlCarrito(producto) {
        setCarrito([...carrito, producto]);
    }
    
    
    
    
    
    return (
        <>
            <Navbar vista={vista} setVista={setVista} cantidad={carrito.length}/>
            
            <main>
                
                {vista === "home" && (
                    <p>aaa</p>
                    
                    
                    
                )}
                
                {vista === "productos" && (
                    <ProductList/>
                    
                    
                )}
                
                
                
                
            </main>
            
            
            <Footer setVista={setVista} />
        </>
    );
}

export default App;
