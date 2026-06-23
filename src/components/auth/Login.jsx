import React from 'react'
import Signup from './Signup';
import { useApp } from '../../context/AppContext';

const UserLogin = () => {
  const { setCurrentPage, setMobileMenuOpen } = useApp();
  const handleLogin = () => {
    setCurrentPage('login');
    setMobileMenuOpen(false);
  }
  return (
    
   <div className="flex items-center gap-3 w-full justify-center md:w-auto">
      <button onClick={()=>handleLogin()} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-3 py-2">
        Login
      </button>
      <Signup/>
    </div>
        
  )
}
export default UserLogin

