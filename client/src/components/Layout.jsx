import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-6 mt-12 no-print">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2026 Arul Arasan Harvester Billing System</p>
          <p className="text-xs text-emerald-100 mt-1">Built with ❤️ for Tamil farmers</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
