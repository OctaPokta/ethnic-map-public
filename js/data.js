const DashboardData = {
  // --- 1. UI TEXT & STRINGS ---
  ui: {
    mainTitle: "מפה אתנית - המזרח התיכון",
    dropdownLabel: "בחר מדינה בנפרד",
    defaultDropdownText: "בחר מדינה...",
    ethnicLayersTitle: "שכבות אתניות",
    selectAllBtn: "בחר הכל",
    clearMapBtn: "אפס תצוגה ונקה מפה",
    demographicsTitle: "דמוגרפיה",
    distributionTitle: "תפוצה:",
    populationLabel: "אוכלוסייה:",
    
    // NEW: Donation Link Config! Paste your real link here:
    donationLink: "https://www.buymeacoffee.com/thesecurityfront", // URL for the donation button
    donationTooltip: "☕אהבתם את המפה?", // Text that appears when hovering
  
    poweredByPrefix: "Powered by",
    poweredByBrand: "The Security Front",
    showUnderDevelopment: true, // Change to false to instantly hide the banner
    underDevelopmentText: "🚧 תחת פיתוח - גרסת אלפא 🚧"
  
  },

  // --- 2. BASE IMAGE PATHS ---
  images: {
    baseMap: "images/Background.png",
    watermark: "images/logo.png",
    borders: "images/Borders.png",
    minimapBg: "images/Background.png"
  },

  // --- 3. COUNTRY CONFIGURATION ---
  countries: {
    Armenia: {
      hebrewName: "ארמניה",
      view: { scale: 3.7, x: -2176, y: -8 },
      ethnicImage: "images/countries-ethnic/ethnic-Armenia.png",
      labelImage: "", 
      demographics: [
        { name: "ארמנים", percent: 98.1, color: "#3b82f6" },
        { name: "יזידים", percent: 1.1, color: "#10b981" },
        { name: "רוסים", percent: 0.3, color: "#f59e0b" }
      ]
    },
    Azerbeijan: {
      hebrewName: "אזרבייג'ן",
      view: { scale: 4.00, x: -2635, y: -57 },
      ethnicImage: "images/countries-ethnic/ethnic-Azerbeijan.png",
      labelImage: "", 
      demographics: [
        { name: "אזרים", percent: 91.6, color: "#10b981" },
        { name: "לזגינים", percent: 2.0, color: "#f59e0b" },
        { name: "ארמנים", percent: 1.3, color: "#3b82f6" },
        { name: "רוסים", percent: 1.3, color: "#ef4444" }
      ]
    },
    Iran: {
      hebrewName: "איראן",
      view: { scale: 1.50, x: -835, y: -125 },
      ethnicImage: "images/countries-ethnic/ethnic-Iran.png",
      labelImage: "images/countries-labels/labels-Iran.png",
      demographics: [
        { name: "פרסים", percent: 61, color: "#0ea5e9" },
        { name: "אזרים", percent: 16, color: "#ef4444" },
        { name: "כורדים", percent: 10, color: "#eab308" },
        { name: "לורים", percent: 6, color: "#8b5cf6" },
        { name: "בלוצ'ים", percent: 2, color: "#d97706" }
      ]
    },
    Iraq: {
      hebrewName: "עיראק",
      view: { scale: 2.20, x: -903, y: -346 },
      ethnicImage: "images/countries-ethnic/ethnic-Iraq.png",
      labelImage: "images/countries-labels/labels-Iraq.png",
      demographics: [
        { name: "ערבים", percent: 78, color: "#22c55e" },
        { name: "כורדים", percent: 18, color: "#eab308" },
        { name: "טורקמנים ואשורים", percent: 4, color: "#6366f1" }
      ]
    },
    Israel: {
      hebrewName: "ישראל",
      view: { scale: 3.00, x: -709, y: -645 },
      ethnicImage: "images/countries-ethnic/ethnic-Israel.png",
      labelImage: "", 
      demographics: [
        { name: "יהודים", percent: 73.5, color: "#3b82f6" },
        { name: "ערבים", percent: 21.0, color: "#22c55e" },
        { name: "אחרים", percent: 5.5, color: "#8b5cf6" }
      ]
    },
    Jordan: {
      hebrewName: "ירדן",
      view: { scale: 3.00, x: -913, y: -709 },
      ethnicImage: "images/countries-ethnic/ethnic-Jordan.png",
      labelImage: "", 
      demographics: [
        { name: "ערבים", percent: 98, color: "#22c55e" },
        { name: "צ'רקסים", percent: 1, color: "#f43f5e" },
        { name: "ארמנים", percent: 1, color: "#3b82f6" }
      ]
    },
    Kuwait: {
      hebrewName: "כוויית",
      view: { scale: 3.20, x: -1903, y: -1066 },
      ethnicImage: "images/countries-ethnic/ethnic-Kuwait.png",
      labelImage: "", 
      demographics: [
        { name: "אסייתים", percent: 40.3, color: "#8b5cf6" },
        { name: "כוויתים", percent: 30.4, color: "#22c55e" },
        { name: "ערבים אחרים", percent: 27.4, color: "#10b981" }
      ]
    },
    Lebanon: {
      hebrewName: "לבנון",
      view: { scale: 5.00, x: -2430, y: -1848 },
      ethnicImage: "images/countries-ethnic/ethnic-Lebanon.png",
      labelImage: "images/countries-labels/labels-Lebanon.png",
      demographics: [
        { name: "ערבים", percent: 95, color: "#22c55e" },
        { name: "ארמנים", percent: 4, color: "#3b82f6" },
        { name: "אחרים", percent: 1, color: "#f59e0b" }
      ]
    },
    SaudiArabia: {
      hebrewName: "ערב הסעודית",
      view: { scale: 1.60, x: -509, y: -542 },
      ethnicImage: "images/countries-ethnic/ethnic-SaudiArabia.png",
      labelImage: "images/countries-labels/labels-SaudiArabia.png",
      demographics: [
        { name: "סעודים", percent: 58.4, color: "#22c55e" },
        { name: "לא-סעודים", percent: 41.6, color: "#64748b" }
      ]
    },
    Syria: {
      hebrewName: "סוריה",
      view: { scale: 2.90, x: -1010, y: -395 },
      ethnicImage: "images/countries-ethnic/ethnic-Syria.png",
      labelImage: "", 
      demographics: [
        { name: "ערבים", percent: 50, color: "#22c55e" },
        { name: "עלווים", percent: 15, color: "#ec4899" },
        { name: "אחרים", percent: 15, color: "#64748b" },
        { name: "כורדים", percent: 10, color: "#eab308" },
        { name: "לבנטינים", percent: 10, color: "#3b82f6" }
      ]
    },
    Turkey: {
      hebrewName: "טורקיה",
      view: { scale: 1.90, x: -327, y: 169 },
      ethnicImage: "images/countries-ethnic/ethnic-Turkey.png",
      labelImage: "", 
      demographics: [
        { name: "טורקים", percent: 73, color: "#ef4444" },
        { name: "כורדים", percent: 19, color: "#eab308" },
        { name: "אחרים", percent: 8, color: "#64748b" }
      ]
    }
  },

  // --- 4. CAPITAL CITIES DOSSIERS (PIXEL COORDINATES) ---
  // Coordinates are based directly on the 6194 x 3876 Background.png image!
  cities: [
    { name: "טהרן", x: 3765, y: 1200, country: "Iran", pop: "9.0 מיליון", desc: "בירת איראן והמרכז הפוליטי, הכלכלי והתרבותי של הרפובליקה האסלאמית.", imageUrl: "images/cities/tehran.jpg", imageAlt: "Dossier photo of Tehran panoramic sunset" },
    { name: "בגדאד", x: 2930, y: 1512, country: "Iraq", pop: "7.3 מיליון", desc: "בירת עיראק, אחת הערים העתיקות והמשמעותיות בעולם הערבי הממוקמת על נהר החידקל.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/5628442718_b10fc2c47f_o.jpg", imageAlt: "Dossier photo of Tigris river in Baghdad" },
    { name: "אנקרה", x: 1982, y: 380, country: "Turkey", pop: "5.7 מיליון", desc: "בירת טורקיה ומרכז השלטון, ממוקמת בלב רמת אנטוליה.", imageUrl: "images/cities/ankara.jpg", imageAlt: "Dossier photo of Ankara Citadel view" },
    { name: "ריאד", x: 3122, y: 2829, country: "SaudiArabia", pop: "7.6 מיליון", desc: "בירת ערב הסעודית והעיר הגדולה בחצי האי ערב, מרכז פיננסי עולמי.", imageUrl: "images/cities/riyadh.jpg", imageAlt: "Dossier photo of modern Riyadh skyline at night" },
    { name: "דמשק", x: 1934, y: 1362, country: "Syria", pop: "2.5 מיליון", desc: "בירת סוריה, נחשבת לאחת הערים המיושבות ברציפות העתיקות בעולם.", imageUrl: "images/cities/damascus.jpg", imageAlt: "Dossier photo of a detailed view in the Old City of Damascus" },
    { name: "עמאן", x: 1820, y: 1580, country: "Jordan", pop: "4.0 מיליון", desc: "בירת ירדן והעיר הגדולה בה, משמשת כמרכז הפוליטי והתרבותי של הממלכה.", imageUrl: "images/cities/amman.jpg", imageAlt: "Dossier photo of Roman Theatre view from Amman Citadel" },
    { name: "ירושלים", x: 1735, y: 1626, country: "Israel", pop: "0.9 מיליון", desc: "בירת ישראל, עיר בעלת חשיבות היסטורית ודתית עצומה לשלוש הדתות.", imageUrl: "images/cities/jerusalem.jpg", imageAlt: "Dossier photo of Jerusalem old city walls and Dome" }
  ]
};