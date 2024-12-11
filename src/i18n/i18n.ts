import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { gameRulesArabic, gameRulesEnglish } from './gameRules';

// Define your translations as types for stronger type checking
const resources = {
  English: {
    translation: {
      welcome: "Welcome",
      home: "Home",
      about: "About",
      contact: "Contact",
      login: "Login",
      signUp: "Sign Up",
      logout: "Logout",
      payment: "Payment",
      tokens: "tokens",
      english: "English",
      arabic: "العربية",
      games: "Games",
      news: "News",
      table: "Table",
      stats: "Stats",
      gossip: "Gossip",
      welcomeMessage: "Welcome to Saudi Football weekly, friends and supporters of Saudi Arabian Football. We aim to raise awareness and interest in Saudi Football. For that, we provide you with all that happens in Saudi Arabia in and around Football, inform, educate, entertain, and hopefully fascinate you as much as we are.",
      predictionPage: "Take me to the prediction page",
      topScorer: "Top scorer to",  // Entry for the first part
      finalMatch: "the final match", // Entry for the second part
      recentNews: "Recent News",  // New entry for Recent News
      clubsRanking: "Clubs Ranking", // New entry for Clubs Ranking
      studyConfirmation: "ARE YOU SURE THAT YOU HAVE STUDIED ENOUGH?", // New entry for study confirmation
      donePlenty: "YES, I HAVE DONE PLENTY! TAKE ME TO THE PREDICTION PAGE", // Button text for prediction page
      takeMeBack: "ACTUALLY, YOU ARE RIGHT. TAKE ME BACK TO THE INFORMATION SECTION", // Button text for information section
      showMore: "Show More", // New entry for Show More
      saudiLeagueGames: "Saudi league Games", // New entry for Saudi league Games
      matchHome: "Home", // New entry for Home
      matchVs: "vs",     // New entry for vs
      matchAway: "Away", // New entry for Away
      matchDate: "Match Date", // New entry for Match Date
      rank: "Rank",        // New entry for Rank
      team: "Team",        // New entry for Team
      points: "Pts",       // New entry for Points
      gamesPlayed: "GP",   // New entry for Games Played
      wins: "W",           // New entry for Wins
      draws: "D",          // New entry for Draws
      losses: "L",         // New entry for Losses
      goalsFor: "F",       // New entry for Goals For
      goalsAgainst: "A",   // New entry for Goals Against
      goalDifference: "GD", // New entry for Goal Difference
      topScorers: "Top Scorers", // New entry for Top Scorers
      topAssissts:"Top Assists",
      yellowcards:"Yellow Cards",
      redcards:"Red Cards",
      topyellowcards:"Top Yellow Cards",
      topredcards:"Top Red Cards",
      player: "Player",            // New entry for Player
      age: "Age",                  // New entry for Age
      appearances: "Appearances",  // New entry for Appearances
      goals: "Goals",              // New entry for Goals
      assists: "Assists",          // New entry for Assists
      minutes: "Minutes",          // New entry for Minutes
      position: "Position",        // New entry for Position
      rating: "Rating",            // New entry for Rating
      penalty: "Penalty",          // New entry for Penalty
      shotsOn: "Shots On",         // New entry for Shots On
      dribblesWon: "Dribbles Won", // New entry for Dribbles Won
      mostViews: "Most Views", // New entry for Most Views
      source: "Source",             // New entry for Source
      publishedAt: "Published At",   // New entry for Published At
      pool1: "POOL 1",                  // New entry for POOL 1
      pool2: "POOL 2",                  // New entry for POOL 2
      pool3: "POOL 3",                  // New entry for POOL 3
      gamesRight: "games right",        // New entry for games right
      jackpot: "JACKPOT: Rial XXXX",    // New entry for JACKPOT
      NoPredictionsYet: "You have no predictions yet!",
      somethingWrong: "Something went wrong , please contact us!",
      mypredictions: "My Predictions",
      "signupTitle": "Sign Up",
      "labelName": "Full Name",
      "labelGender": "Gender",
      "labelDOB": "Date of Birth",
      "labelAddress": "Address",
      "labelEmail": "Email",
      "labelPassword": "Password",
      "genderMale": "Male",
      "genderFemale": "Female",
      "genderOther": "Other",
      "placeholderName": "Your Name",
      "placeholderAddress": "1234 Main St",
      "placeholderEmail": "you@example.com",
      "placeholderPassword": "******",
      "buttonSignup": "Sign Up",
      "errorFillAllFields": "Please fill in all required fields.",
      "errorShortPassword": "Password must be at least 6 characters!",
      "errorTryAgain": "Something went wrong, please try again!",
      "loginTitle": "Login",
      "buttonSignIn": "Sign in",
      "forgotPassword": "Forgot your password?",
      "errorFillFields": "Please fill in all fields.",
      "errorLoginFailed": "Login failed. Please check your email and password.",
      "labelConfirmPassword": "Confirm Password",
      "placeholderConfirmPassword": "Re-enter your password",
      "errorPasswordMismatch": "Passwords do not match",
      "acceptTerms": "I accept the",
      "gamerules":"Game rules",
      "termsConditions": "Terms and Conditions",
      "errorAcceptTerms": "You must accept the Terms and Conditions to proceed",
      "errorAcceptRules": "You must accept the Game rules to proceed",
      "labelOtp": "Enter OTP",
      "placeholderOtp": "Enter the OTP sent to your email",
      "errorOtpRequired": "OTP is required",
      "errorOtpInvalid": "Invalid OTP",
      "buttonVerifyOtp": "Verify OTP",
      'Rules':"Rules",
      "generalInfos":"General infos",
       "teamsInfo":"Teams info",
       "gamesRules":gameRulesEnglish,
       "teamInfo": "{{country}} | Founded: {{founded}}",
  "venue": "Venue",
  "venueDetails": "Capacity: {{capacity}} | Surface: {{surface}}",
  "squad": "Squad",
  "Age": "Age: {{age}}",
  "nationality": "Nationality: {{nationality}}",
  "number": "Number: {{number}}",
  "height": "Height: {{height}}",
  "weight": "Weight: {{weight}}",
  "backToSquad": "Back to Squad",
  "teamStatistics_ts": "Team Statistics",
  "leagueInfo_ts": "League Info",
  "season_ts": "Season: {{season}}",
  "form_ts": "Form",
  "win_ts": "Win",
  "draw_ts": "Draw",
  "loss_ts": "Loss",
  "fixtures_ts": "Fixtures",
  "played_ts": "Played: {{played}}",
  "wins_ts": "Wins: {{wins}}",
  "draws_ts": "Draws: {{draws}}",
  "losses_ts": "Losses: {{losses}}",
  "goals_ts": "Goals",
  "goalsFor_ts": "For: {{for}}",
  "goalsAgainst_ts": "Against: {{against}}",
  "cleanSheets_ts": "Clean Sheets",
  "cleanSheetsCount_ts": "Total: {{total}}",
  "failedToScore_ts": "Failed to Score",
  "failedToScoreCount_ts": "Total: {{total}}",
  "penalty_ts": "Penalty",
  "penaltyScored_ts": "Scored: {{scored}} ({{percentage}}%)",
  "penaltyMissed_ts": "Missed: {{missed}} ({{percentage}}%)"
      // Add other English translations here
    },
  },
  Arabic: {
    translation: {
      welcome: "مرحبا",
      home: "الرئيسية",
      about: "حول",
      contact: "اتصال",
      login: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      logout: "تسجيل الخروج",
      payment: "الدفع",
      tokens: "رموز",
      english: "English",
      arabic: "العربية",
      games: "ألعاب",
      news: "أخبار",
      table: "الجدول",
      stats: "إحصائيات",
      gossip: "أخبار الانتقالات", // New entry for Gossip in Arabic (commonly used term)
      welcomeMessage: "مرحبًا بكم في أسبوع كرة القدم السعودية، أصدقاء ومشجعو كرة القدم السعودية. نهدف إلى زيادة الوعي والاهتمام بكرة القدم السعودية. لذلك، نقدم لكم كل ما يحدث في السعودية في كرة القدم وحولها، نعلمكم، نثقفكم، نرفه عنكم، ونأمل أن نثير إعجابكم كما نفعل نحن.",
      predictionPage: "خذني إلى صفحة التوقعات",
      topScorer: "أفضل هداف إلى",  // Entry for the first part in Arabic
      finalMatch: "المباراة النهائية", // Entry for the second part in Arabic
      recentNews: "الأخبار الأخيرة",  // New entry for Recent News in Arabic
      clubsRanking: "ترتيب الأندية", // New entry for Clubs Ranking in Arabic
      studyConfirmation: "هل أنت متأكد أنك درست بما فيه الكفاية؟", // New entry for study confirmation in Arabic
      donePlenty: "نعم، لقد قمت بذلك كثيرًا! خذني إلى صفحة التوقعات", // Button text for prediction page in Arabic
      takeMeBack: "في الواقع، أنت محق. خذني إلى قسم المعلومات", // Button text for information section in Arabic
      showMore: "عرض المزيد", // New entry for Show More in Arabic
      saudiLeagueGames: "مباريات الدوري السعودي", // New entry for Saudi league Games in Arabic
      matchHome: "المنزل", // New entry for Home in Arabic
      matchVs: "ضد",       // New entry for vs in Arabic
      matchAway: "الخارج", // New entry for Away in Arabic
      matchDate: "تاريخ المباراة", // New entry for Match Date in Arabic
      rank: "الترتيب",           // New entry for Rank in Arabic
      team: "الفريق",            // New entry for Team in Arabic
      points: "النقاط",          // New entry for Points in Arabic
      gamesPlayed: "المباريات",  // New entry for Games Played in Arabic
      wins: "الانتصارات",        // New entry for Wins in Arabic
      draws: "التعادل",          // New entry for Draws in Arabic
      losses: "الخسائر",        // New entry for Losses in Arabic
      goalsFor: "الأهداف المسجلة", // New entry for Goals For in Arabic
      goalsAgainst: "الأهداف المستقبلة", // New entry for Goals Against in Arabic
      goalDifference: "فرق الأهداف", // New entry for Goal Difference in Arabic
      topScorers: "أفضل الهدافين", // New entry for Top Scorers in Arabic
      topAssissts:"التمريرات الحاسمة",
      player: "اللاعب",                // New entry for Player in Arabic
      age: "العمر",                    // New entry for Age in Arabic
      appearances: "المباريات",        // New entry for Appearances in Arabic
      goals: "الأهداف",                // New entry for Goals in Arabic
      assists: "التمريرات الحاسمة",    // New entry for Assists in Arabic
      minutes: "الدقائق",              // New entry for Minutes in Arabic
      position: "المركز",              // New entry for Position in Arabic
      rating: "التقييم",                // New entry for Rating in Arabic
      penalty: "ركلة جزاء",            // New entry for Penalty in Arabic
      shotsOn: "التسديدات على المرمى", // New entry for Shots On in Arabic
      dribblesWon: "المراوغات الناجحة", // New entry for Dribbles Won in Arabic
      mostViews: "الأكثر مشاهدة", // New entry for Most Views in Arabic
      source: "المصدر",              // New entry for Source in Arabic
      publishedAt: "تاريخ النشر",     // New entry for Published At in Arabic
      pool1: "المجموعة 1",               // New entry for POOL 1 in Arabic
      pool2: "المجموعة 2",               // New entry for POOL 2 in Arabic
      pool3: "المجموعة 3",               // New entry for POOL 3 in Arabic
      gamesRight: "7 مباريات صحيحة",      // New entry for games right in Arabic
      jackpot: "الجائزة الكبرى: ريال XXXX", // New entry for JACKPOT in Arabic
      NoPredictionsYet: "ليس لديك أي توقعات بعد!",
      somethingWrong: "حدث خطأ، يرجى الاتصال بنا!",
      mypredictions: "توقعاتي",
      "signupTitle": "التسجيل",
      "labelName": "الاسم الكامل",
      "labelGender": "الجنس",
      "labelDOB": "تاريخ الميلاد",
      "labelAddress": "العنوان",
      "labelEmail": "البريد الإلكتروني",
      "labelPassword": "كلمة المرور",
      "genderMale": "ذكر",
      "genderFemale": "أنثى",
      "genderOther": "آخر",
      "placeholderName": "اسمك",
      "placeholderAddress": "1234 الشارع الرئيسي",
      "placeholderEmail": "you@example.com",
      "placeholderPassword": "******",
      "buttonSignup": "سجل",
      "errorFillAllFields": "يرجى ملء جميع الحقول المطلوبة.",
      "errorShortPassword": "يجب أن تكون كلمة المرور 6 أحرف على الأقل!",
      "errorTryAgain": "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
      "loginTitle": "تسجيل الدخول",
      "buttonSignIn": "تسجيل الدخول",
      "forgotPassword": "هل نسيت كلمة المرور؟",
      "errorFillFields": "يرجى ملء جميع الحقول.",
      "errorLoginFailed": "فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.",
      "labelConfirmPassword": "تأكيد كلمة المرور",
      "placeholderConfirmPassword": "أعد إدخال كلمة المرور",
      "errorPasswordMismatch": "كلمتا المرور غير متطابقتين",
      "acceptTerms": "أوافق على",
      "gamerules":"قواعد اللعبة",
      "termsConditions": "الشروط والأحكام",
      "errorAcceptTerms": "يجب الموافقة على الشروط والأحكام للمتابعة",
      "errorAcceptRules": "يجب الموافقة على قواعد اللعبة للمتابعة",
      "labelOtp": "أدخل رمز التحقق",
      "placeholderOtp": "أدخل رمز التحقق المرسل إلى بريدك الإلكتروني",
      "errorOtpRequired": "رمز التحقق مطلوب",
      "errorOtpInvalid": "رمز التحقق غير صحيح",
      "buttonVerifyOtp": "تحقق من الرمز",
      "generalInfos":"معلومات عامة",
      "teamsInfo":"معلومات عن الفرق",
      yellowcards: "البطاقات الصفراء",
      redcards: "البطاقات الحمراء",
      topyellowcards: "أكثر البطاقات الصفراء",
      topredcards: "أكثر البطاقات الحمراء",
      "gamesRules":gameRulesArabic,
      "teamInfo": "{{country}} | تأسست في: {{founded}}",
      "venue": "المكان",
      "venueDetails": "السعة: {{capacity}} | نوع السطح: {{surface}}",
      "squad": "الفريق",
      "Age": "العمر: {{age}}",
      "nationality": "الجنسية: {{nationality}}",
      "number": "الرقم: {{number}}",
      "height": "الطول: {{height}}",
      "weight": "الوزن: {{weight}}",
      "backToSquad": "العودة إلى الفريق",
      "teamStatistics_ts": "إحصائيات الفريق",
      "leagueInfo_ts": "معلومات الدوري",
      "season_ts": "الموسم: {{season}}",
      "form_ts": "الأداء",
      "win_ts": "فوز",
      "draw_ts": "تعادل",
      "loss_ts": "خسارة",
      "fixtures_ts": "المباريات",
      "played_ts": "لعب: {{played}}",
      "wins_ts": "الانتصارات: {{wins}}",
      "draws_ts": "التعادلات: {{draws}}",
      "losses_ts": "الخسائر: {{losses}}",
      "goals_ts": "الأهداف",
      "goalsFor_ts": "لصالح: {{for}}",
      "goalsAgainst_ts": "ضد: {{against}}",
      "cleanSheets_ts": "شباك نظيفة",
      "cleanSheetsCount_ts": "الإجمالي: {{total}}",
      "failedToScore_ts": "فشل في التسجيل",
      "failedToScoreCount_ts": "الإجمالي: {{total}}",
      "penalty_ts": "ركلات الجزاء",
      "penaltyScored_ts": "سجل: {{scored}} ({{percentage}}%)",
      "penaltyMissed_ts": "أضاع: {{missed}} ({{percentage}}%)"
      // Add other Arabic translations here
    },
  },
} as const; // using `as const` to make it a read-only type

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('selectedLanguage') || 'English', // Default language or stored preference
    interpolation: { escapeValue: false }, // React already does XSS prevention
  });

export default i18n;
