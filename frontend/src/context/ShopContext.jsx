import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const delivery_fee = 10;

    // Backend URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    // Add to Cart Functionality
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size.");
            return;
        }

        const cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
            } catch (error) {
                console.error(error);
                toast.error("Failed to add to cart.");
            }
        }
    };

    // Get Total Cart Count
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                totalCount += cartItems[items][size] || 0;
            }
        }
        return totalCount;
    };

    // Update Cart Quantity
    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.error(error);
                toast.error("Failed to update cart.");
            }
        }
    };

    // Get Cart Total Amount
    const getCartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItems) {
            const itemInfo = products.find(product => product._id === itemId);
            if (!itemInfo) continue;

            for (const size in cartItems[itemId]) {
                totalAmount += (itemInfo.price || 0) * (cartItems[itemId][size] || 0);
            }
        }

        return totalAmount;
    };

    // Fetch Products from Backend
    const getProductData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load products.");
        }
    };

    // Fetch User Cart from Backend
    const getUserCart = async (authToken) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token: authToken } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                toast.error("Failed to fetch cart data.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch cart data.");
        }
    };

    // Fetch Products on Initial Load
    useEffect(() => {
        getProductData();
    }, []);

    // Fetch Cart Data on Token Load
    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            setToken(localToken);
            getUserCart(localToken); // Fetch cart using the token
        }
    }, []);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
