import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { PiGlobe } from 'react-icons/pi';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.svg';
import { useAuth } from '../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from '../API/ServerApi';
import i18n from '../i18n/i18n';
import { useTranslation } from 'react-i18next';

const stripePromise = loadStripe('pk_test_51Q3jdsBxh4wDhCoM4XoEiGBlNg3R4hyAhD50xVs04lzgDwd1SJkSufNCumuohKAYmkQDDrsxz3IBb0wsc96COybC00HpfVIzSx');

interface NavLink {
  name: string;
  path: string;
}

const Navbar = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [bgColor, setBgColor] = useState<string>('transparent');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isAccountTooltipOpen, setIsAccountTooltipOpen] = useState<boolean>(false); // User tooltip
  const { user, userBalance, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const { t } = useTranslation();

  const handleItemClick = (index: number): void => {
    setActiveIndex(index);
    setIsMenuOpen(false);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language);
    setIsDropdownOpen(false);
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const handlePaymentClicked = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.log('something wrong with Stripe');
      return;
    }
    const response = await createCheckoutSession();
    if (!response || !response?.session) {
      console.log('something wrong with Stripe');
      return;
    }
    const { id } = response?.session;
    const result = await stripe.redirectToCheckout({ sessionId: id });
    if (result.error) {
      alert(result.error.message);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setBgColor(window.scrollY > 50 ? 'bg-white shadow-lg' : 'bg-transparent');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'News', path: '/news' },
    { name: 'Games', path: '/games' },
    { name: 'Table', path: '/table' },
    { name: 'Stats', path: '/stats' },
    { name: 'Gossip', path: '/gossip' },
    { name: 'My Predictions', path: '/mypredictions' },
    { name: 'Game Rules', path: '/gameRules' },
  ];

  const translatedNavLinks = navLinks.map((item) => ({
    ...item,
    name: t(item.name.replace(/\s+/g, '').toLowerCase()),
  }));

  return (
    <div className={`fixed top-0 w-full z-50 ${bgColor} transition-all duration-300`}>

      {/* Top Logo Section */}
      <div className="bg-[#056A4C] bg-opacity-75 text-white text-base sm:text-lg md:text-4xl flex justify-center p-4 items-center  max-h-24">
        <Link to="/" onClick={() => setActiveIndex(null)}>
        SAUDI  FOOTBALL WEEKLY
        </Link>
      </div>

      {/* Navigation Bar */}
      <div className="flex justify-between items-center px-6 lg:px-24 py-4">
      

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-x-6 text-lg font-medium">
          {translatedNavLinks.map((item, index) => (
            <li key={index} className="hover:text-green-700 transition-all duration-300">
              <Link
                to={item.path}
                className={`${
                  location.pathname === item.path ? 'text-green-700 border-b-2 border-green-700' : ''
                }`}
                onClick={() => handleItemClick(index)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-x-6">
          {/* Account Dropdown */}
          {user ? (
            <div className="relative">
              <FaUserCircle
                className="text-3xl cursor-pointer text-gray-700 hover:text-green-700"
                onClick={() => setIsAccountTooltipOpen(!isAccountTooltipOpen)}
              />
              {isAccountTooltipOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                  <div className="px-4 py-2 text-gray-700">{user}</div>
                  <div className="px-4 py-2 text-gray-700">{userBalance + ' ' + t('tokens')}</div>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    {t('logout')}
                  </button>
                {user ?  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handlePaymentClicked}
                  >
                    {t('payment')}
                  </button> :null } 
                </div>
              )}
            </div>
          ) : (
            <>
            <Link to="/login" onClick={() => setActiveIndex(null)}>
              <button className="px-5 pb-1 rounded-lg text-base bg-[#1F5059] text-white hover:bg-[#1f5059c4]">
                {t('login')}
              </button>
            </Link>
            <Link to="/signup" onClick={() => setActiveIndex(null)}>
              <button className="px-5 pb-1 rounded-lg text-base bg-[#51A186] text-white hover:bg-[#1f5059b9]">
                {t('signUp')}
              </button>
            </Link>
          </>
          )}

          {/* Language Selector */}
          <div className="relative">
            <PiGlobe
               className="text-3xl cursor-pointer text-gray-700 hover:text-green-700"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-50">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLanguageSelect('English')}
                >
                  {t('english')}
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLanguageSelect('Arabic')}
                >
                  {t('arabic')}
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            className="text-green-700 text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col bg-white shadow-lg absolute w-full top-0 left-0 h-screen px-6 py-8">
          <ul className="flex flex-col gap-y-6 text-xl font-medium">
            {translatedNavLinks.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`${
                    location.pathname === item.path ? 'text-green-700 font-bold' : ''
                  }`}
                  onClick={() => handleItemClick(index)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {user ? (
              <>
                <div className="mb-4 text-lg text-gray-700">{user}</div>
                <button
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={logout}
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
              <Link to="/login" onClick={() => setActiveIndex(null)}>
                <button className="px-5 pb-1 rounded-lg text-base bg-[#1F5059] text-white hover:bg-[#1f5059c4]">
                  {t('login')}
                </button>
              </Link>
              <Link to="/signup" onClick={() => setActiveIndex(null)}>
                <button className="px-5 pb-1 rounded-lg text-base bg-[#51A186] text-white hover:bg-[#1f5059b9]">
                  {t('signUp')}
                </button>
              </Link>
            </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
