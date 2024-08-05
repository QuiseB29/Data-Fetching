import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';
import UserContext from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingCart from './components/ShoppingCart';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddProduct from './components/AddProduct';

const queryClient = new QueryClient();



function App() {
    const [user, setUser] = useState({ name: '', isLoggedIn: false})

    return (
        <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/cart" element={<ShoppingCart />} />
                    <Route path="/add-product" element={<AddProduct />} />
                </Routes>
            </Router>
        </UserContext.Provider>
        </QueryClientProvider>
    );
};

export default App;