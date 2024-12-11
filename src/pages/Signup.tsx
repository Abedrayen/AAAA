import React, { useState } from 'react';
import { sendOtp, signupUser, verifyOtp } from '../API/ServerApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const SignupPage: React.FC = () => {
  const { login } = useAuth();
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('Male');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [ssn, setSsn] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [tokens,setTokens]=useState<any>(null)
  const [userInfos,setUserInfos]=useState<any>(null)
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Check if the current language is Arabic
  const isArabic = i18n.language == "Arabic";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !gender || !dateOfBirth || !email || !address || !password || !confirmPassword) {
      setError(t('errorFillAllFields'));
      return;
    }
    if (password.length < 6) {
      setError(t('errorShortPassword'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('errorPasswordMismatch'));
      return;
    }
    if (!acceptTerms) {
      setError(t('errorAcceptRules'));
      return;
    }

    setError('');
    const data = {
      name,
      gender,
      dob: dateOfBirth,
      email,
      address,
      socialSecurityNumber: ssn,
      password,
    };

    setLoading(true);
    try {
      const response = await signupUser(data);
      setLoading(false);

      if (!response || !response.success) {
        setError(response?.message || t('errorTryAgain'));
        return;
      }
      setUserInfos(response?.user)
      setTokens(response?.tokens)
      setOtpSent(true)
      // login(response.user, response?.tokens);
      // navigate('/');
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

       login(userInfos, tokens);
       navigate('/');

    } catch (error) {
      setError(t('errorTryAgain'));
      setLoading(false);
    }
  };


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

  const renderSignup=()=>{
    return  <div className="bg-white shadow-md rounded-lg p-4 max-w-md w-full space-y-6">
    <h2 className="text-3xl font-bold text-gray-900 text-center">
      {t('signupTitle')}
    </h2>
    {error && <div className="text-red-500 text-sm">{error}</div>}

    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {t('labelName')}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={t('placeholderName')}
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          {t('labelGender')}
        </label>
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="Male">{t('genderMale')}</option>
          <option value="Female">{t('genderFemale')}</option>
          <option value="Other">{t('genderOther')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
          {t('labelDOB')}
        </label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          {t('labelAddress')}
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={t('placeholderAddress')}
        />
      </div>

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
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          {t('labelConfirmPassword')}
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={t('placeholderConfirmPassword')}
        />
      </div>

      <div>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <span>
            {t('acceptTerms')}{" "}
            <a
              // href="/Rules.pdf"
              href={!isArabic? "/Rules.pdf":"/Rules_arabic.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-500 underline"
            >
              {t('gamerules')}
            </a>
          </span>
        </label>
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
          t('buttonSignup')
        )}
      </button>
    </form>
  </div>
  }

  return (
    <div className="min-h-screen bg-transparent w-full sm:min-w-[350px] flex items-center pt-10 sm:pt-20 justify-center">
      {!otpSent? renderSignup() :renderOtp() }
    </div>  
  );
};

export default SignupPage;
