import React, { useState } from 'react';
import { loginUser, verifyOtp } from '../API/ServerApi';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import translation hook

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const { t } = useTranslation(); // Initialize the translation hook

  const handleSubmit = async (e: React.FormEvent|undefined=undefined) => {
    e && e.preventDefault();
    if (!email || !password) {
      setError(t('errorFillFields')); // Use translation for errors
      return;
    }
    setError('');
    setLoading(true);

    try {
      const data = { email, password };
      const response = await loginUser(data);

      setLoading(false);

      if (!response || !response.success) {
       
        setError(response?.message || t('errorLoginFailed'));
        return;
      }

      if(response?.isVerified==false){
        setOtpSent(true)
        return
      }

      login(response.user, response?.tokens);
      navigate('/');
    } catch (error) {
      setError(t('errorTryAgain'));
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      setError(t('errorOtpRequired'));
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await verifyOtp({ email,otpCode: otp });

      if (!response || !response.success) {
        setError( t('errorOtpInvalid'));
        setLoading(false);
        return;
      }

      await handleSubmit()

    } catch (error) {
      setError(t('errorTryAgain'));
      setLoading(false);
    }
  };
  const renderLogin=()=>{
    return (
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center">{t('loginTitle')}</h2>
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t('labelEmail')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={t('placeholderEmail')}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {t('labelPassword')}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={t('placeholderPassword')}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1F5059] hover:bg-[#3eb68a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              t('buttonSignIn')
            )}
          </button>
        </div>
      </form>

      <div className="text-sm text-center">
        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
          {t('forgotPassword')}
        </a>
      </div>
    </div>
    )
  }


  const renderOtp = () => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          {t('labelOtp')}
        </h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              {t('labelOtp')}
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={t('placeholderOtp')}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1F5059] hover:bg-[#3eb68a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              t('buttonVerifyOtp')
            )}
          </button>
        </form>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-transparent w-full sm:min-w-[350px] flex items-start pt-20 sm:pt-44 justify-center">
      {!otpSent? renderLogin():renderOtp()}
    </div>
  );
};

export default LoginPage;
