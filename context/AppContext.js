import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

function AppProvider(props) {
    const [cart, setCart] = useState(function () {
        let savedCart = [];
        try {
            savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        } catch (error) {
            savedCart = [];
        }
        return savedCart;
    });

    useEffect(() => {
        if (cart) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    function getCartCount() {
        return cart.reduce(
            (total, product) => total + product.quantity,
            0
        );
    }

    function handleProductDelete(id) {
        const updatedCart = cart.filter((product) => product.id !== id);
        setCart(updatedCart);
    }
    
    function handleProductAdd(newProduct) {
        // check if item exists
        const existingProduct = cart.find(
            (product) => product.id === newProduct.id
        );
        if (existingProduct) {
            // increase quantity
            const updatedCart = cart.map((product) => {
                if (product.id === newProduct.id) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                    };
                }
                return product;
            });
            setCart(updatedCart);
        } else {
            // product is new to the cart
            setCart([
                ...cart,
                {
                    ...newProduct,
                    quantity: 1,
                },
            ]);
        }
    }

    function getProductFromCart(id) {
        return cart.find(
            (product) => product.id === id
        );
    }

    function getTotalPrice() {
        return cart.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
    }

    const value = {
        cart,
        getCartCount,
        getProductFromCart,
        getTotalPrice,
        onProductAdd: handleProductAdd,
        onProductDelete: handleProductDelete
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

export {AppContext, AppProvider};