import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';

export default function GuestLayout({ canLogin, canRegister, isLoggedIn, children }) {

    return (
        <div className="">
            <Navbar canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn} />
            <div className="mt-[80px]">
                {children}
            </div>
            <Footer />
        </div>


    );
}
