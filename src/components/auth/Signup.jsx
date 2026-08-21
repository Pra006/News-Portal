import React from 'react'
import { useApp } from '../../context/AppContext';

const Signup = () => {
  const { t } = useApp();
  return (
    <div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all hover:shadow-md active:scale-95 whitespace-nowrap">
        {t('signUp')}
      </button>
    </div>
  )
}

export default Signup
