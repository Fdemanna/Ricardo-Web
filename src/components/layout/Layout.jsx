import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
