import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext()

export const useShop = () => {
    return useContext(ShopContext)
}

export const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState();
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    const [user, setUser] = useState(null)







const addToCart = async({ itemId, size }) => {
    // Check if the size is selected
    if (!size) {
        toast.error("Select product size");
        return;
    }

    // If the user is logged in, proceed with adding to the cart
    if (user) {
        let cartData = structuredClone(cartItems); // Clone the current cart items
        
        // Check if the item already exists in the cart
        if (cartData[itemId]) {
            // Check if size also exists
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;  // Increase the quantity of the existing size
            } else {
                cartData[itemId][size] = 1;   // If a new size is added, set quantity to 1
            }
        } else {  // If product is not already in the cart, add new product and set quantity to 1
            cartData[itemId] = { [size]: 1 };
        }

        setCartItems(cartData);  // Update the local cart state

        // Send the updated cart data to the backend
        try {
            const response = await axios.post(
                `${backendURL}/api/v1/cart/add`,
                 { userId: user._id, itemId, size },
                { withCredentials: true }
            );
            if (response.data.success) {
                toast.success("Cart added successfully on server.");
            } else {
                toast.error(response.data.message || "Failed to add cart.");
            }
        } catch (error) {
            toast.error("Error adding cart on server.");
            console.error(error);
        }

    } else {
        // If the user is not logged in, show a message or redirect to login page
        toast.error("Please log in to add items to the cart.");
        navigate("/login"); // Redirect user to login page
    }
};


    // }
    // // cartItems = {
    // //     "item1": { "small": 2, "medium": 1 },
    // //     "item2": { "large": 3 }
    // //   }





    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) { // Iterate through each item in the cart
            for (const size in cartItems[itemId]) { // Iterate through each size of the item
                if (cartItems[itemId][size] > 0) { // Check if the quantity of that size is greater than 0
                    totalCount += cartItems[itemId][size]; // Add the quantity to the total count
                }
            }
        }
        return totalCount; // Return the total count
    }


    const updateQuantity = async({ itemId, size, quantity }) => {
        
      if (user) {
          let cartData = structuredClone(cartItems);
  
          if (quantity === 0) {
              // Remove the size from the cart item if quantity is zero
              delete cartData[itemId][size];
          } else {
              // Update the quantity for the specific size
              cartData[itemId][size] = quantity;
          }
         // Update the cart items state
          setCartItems(cartData);

          //backend
               try {
            const response = await axios.post(
                `${backendURL}/api/v1/cart/update`,
                 { userId: user._id, itemId, size,quantity },
                { withCredentials: true }
            );
            if (response.data.success) {
                toast.success("Cart updated successfully on server.");
            } else {
                toast.error(response.data.message || "Failed to update cart.");
            }
        } catch (error) {
            toast.error("Error updating cart on server.");
            console.error(error);
        }



          
        }else{
             // If the user is not logged in, show a message or redirect to login page
        toast.error("Please log in to update items to the cart.");
        navigate("/login"); // Redirect user to login page
        }
  
      
      
    };

const getUserCart = async () => {
  if (!user) return;

  try {
    const response = await axios.post(
      `${backendURL}/api/v1/cart/get`,
      {userId:user._id}, // ✅ No userId needed in body
      { withCredentials: true } // ✅ Required to send cookies
    );

    if (response.data.success) {
      setCartItems(response.data.data); // or handle as needed
      toast.success("Cart loaded successfully.");
    } else {
      toast.error(response.data.message || "Failed to fetch cart.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error fetching cart.");
  }
};



    const totalBill = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) { // Iterate through each item in the cart
            const itemInfo = products.find((product) => product._id === itemId)
            for (const size in cartItems[itemId]) { // Iterate through each size of the item
                if (cartItems[itemId][size] > 0) { // Check if the quantity of that size is greater than 0
                    totalAmount += itemInfo.price * cartItems[itemId][size];
                }
            }
        }
        return totalAmount; // Return the total count
    }

    const getProductData = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/v1/product/list`)
            if (response.data.success) {
                setProducts(response.data.data)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);

            toast.error(error.message)

        }
    }

    //check user status
      const checkUserStatus = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/v1/user/status`, {
        withCredentials: true,
      });
      if (res.data.loggedIn) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

    useEffect(() => {
        checkUserStatus()
        getProductData()
      
    }, [])

useEffect(() => {
  if (user && window.location.pathname !== '/place-order') {
    getUserCart();  // Only load if NOT on order placing page (to avoid reloading empty cart after order)
  }
}, [user]);



    //logout
    const logout = async () => {
        try {
            // Send a logout request to the backend
            const response = await axios.post(
                `${backendURL}/api/v1/user/logout`,
                {},
                { withCredentials: true }  // Allow the browser to send cookies
            );

            if (response.status === 200) {
                toast.success('You have been logged out successfully!');
                navigate('/login');  // Redirect to the login page after successful logout
            }
        } catch (error) {
            toast.error('Error logging out. Please try again later.');
            console.error(error);
        }
    };



    const value = {
        currency, delivery_fee, products, search, setSearch, showSearch, setShowSearch, cartItems,setCartItems, addToCart,
        getCartCount, updateQuantity, totalBill, navigate, backendURL, logout, user,checkUserStatus,getUserCart
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}