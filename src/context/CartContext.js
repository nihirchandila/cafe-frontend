import { useContext, createContext, useState, useEffect } from "react";

const CartContext = createContext();


const CartContextProvider = ({children})=>{
    
    const [cartCount, setCount]= useState(0)

    useEffect(() => {
        
        const localData = localStorage.getItem("cartItem");
        if (localData) {
          const parsedData = JSON.parse(localData);
          setCount(parsedData.length);
        }else{
            setCount(0)
        }
      }, []);
    return(
        <CartContext.Provider value={{cartCount, setCount}}>
            {children}
        </CartContext.Provider>
    )
}

const useCartContext = ()=>{
    return(
        useContext(CartContext)
    )
}

export {CartContextProvider, useCartContext}