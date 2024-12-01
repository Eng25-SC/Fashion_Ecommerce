import React from 'react';
import Navbar from '../components/Navbar';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

function Layout({
    children,
    title = "Forever- Ecommerce app",
    description = "Mern stack project",
    keywords = "mern, react, node, mongodb",
    author = ""
}) {
    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>{title}</title>
                    <meta charSet="UTF-8" />
                    <meta name="description" content={description} />
                    <meta name="keywords" content={keywords} />
                    <meta name="author" content={author} />
                </Helmet>

                <Navbar />
                <SearchBar/>
                <main style={{ minHeight: "70vh" , }} className='my-10'>
              
                    {children}
                </main>
              <Footer/>
            </div>
        </HelmetProvider>
    );
}

export default Layout;
