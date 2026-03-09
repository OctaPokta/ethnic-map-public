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
    
    donationLink: "https://www.buymeacoffee.com/thesecurityfront", 
    donationTooltip: "☕אהבתם את המפה?", 
  
    poweredByPrefix: "Powered by",
    poweredByBrand: "The Security Front",
    showUnderDevelopment: true, 
    underDevelopmentText: "🚧 תחת פיתוח - גרסת אלפא 🚧"
  },

  // --- 2. BASE IMAGE PATHS ---
  images: {
    baseMap: "images/Background.webp",
    watermark: "images/logo.png",
    borders: "images/Borders.webp",
    minimapBg: "images/Background.webp"
  },

  // --- 3. COUNTRY CONFIGURATION ---
  countries: {
    Armenia: {
      hebrewName: "ארמניה",
      view: { scale: 3.7, x: -2176, y: -8 },
      ethnicImage: "images/countries-ethnic/ethnic-Armenia.webp",
      labelImage: "images/countries-labels/labels-Armenia.webp", 
      demographics: [
        { name: "ארמנים", percent: 98.1, color: "#3b82f6", image: "images/ethnicities/Armenian.png", desc: "הארמנים הם אומה וקבוצה אתנית הודית-אירופית שמקורה ברמת ארמניה. יש להם היסטוריה עשירה ותרבות ייחודית, והם היו העם הראשון שקיבל את הנצרות כדת מדינה בשנת 301 לספירה.", language: "ארמנית", religion: "נצרות (הכנסייה האפוסטולית)" },
        { name: "יזידים", percent: 1.1, color: "#10b981", image: "images/ethnicities/yazidis.webp", desc: "קבוצה אתנו-דתית ייחודית, המתרכזת בעיקר בצפון עיראק ובסוריה. דתם משלבת יסודות מהאמונות הקדם-אסלאמיות, הנצרות והאסלאם.", language: "כורדית (קורמאנג'י)", religion: "יזידיזם" },
        { name: "רוסים", percent: 0.3, color: "#f59e0b", image: "images/ethnicities/russians.webp", desc: "קבוצה אתנית סלאבית מזרחית. נוכחותם בקווקז ובמזרח התיכון קשורה לרוב להיסטוריה של האימפריה הרוסית וברית המועצות.", language: "רוסית", religion: "נצרות (אורתודוקסית)" }
      ]
    },
    Azerbeijan: {
      hebrewName: "אזרבייג'ן",
      view: { scale: 4.00, x: -2635, y: -57 },
      ethnicImage: "images/countries-ethnic/ethnic-Azerbeijan.webp",
      labelImage: "images/countries-labels/labels-Azerbeijan.webp", 
      demographics: [
        { name: "אזרים", percent: 91.6, color: "#10b981", image: "images/ethnicities/azeris.webp", desc: "האזרים הם עם ממוצא טורקי, המהווים את רוב אוכלוסיית אזרבייג'ן. קהילה גדולה במיוחד של אזרים מתגוררת גם בצפון-מערב איראן.", language: "אזרית", religion: "אסלאם שיעי" },
        { name: "לזגינים", percent: 2.0, color: "#f59e0b", image: "images/ethnicities/lezgins.webp", desc: "קבוצה אתנית קווקזית עתיקה המתגוררת בעיקר בדרום דאגסטן (רוסיה) ובצפון-מזרח אזרבייג'ן.", language: "לזגינית", religion: "אסלאם סוני" },
        { name: "ארמנים", percent: 1.3, color: "#3b82f6", image: "images/ethnicities/armenians.webp", desc: "מיעוט במדינה, אשר ריכוזו המרכזי היסטורית היה באזור נגורנו-קרבאך.", language: "ארמנית", religion: "נצרות" },
        { name: "רוסים", percent: 1.3, color: "#ef4444", image: "images/ethnicities/russians.webp", desc: "שאריות הגירה מתקופת השלטון הסובייטי, המתגוררים בעיקר בבירה באקו.", language: "רוסית", religion: "נצרות" }
      ]
    },
    Iran: {
      hebrewName: "איראן",
      view: { scale: 1.50, x: -835, y: -125 },
      ethnicImage: "images/countries-ethnic/ethnic-Iran.webp",
      labelImage: "images/countries-labels/labels-Iran.webp",
      demographics: [
        { 
          name: "פרסים", 
          percent: 54, 
          color: "#2dd4bf", 
          image: "images/ethnicities/persians.webp", 
          desc: "הקבוצה האתנית הגדולה והדומיננטית באיראן. יורשיה של היסטוריה אימפריאלית מפוארת, המהווים את ליבת התרבות, הכלכלה והפוליטיקה האיראנית.", 
          language: "פרסית", 
          religion: "אסלאם שיעי" 
        },
        { 
          name: "אזרים", 
          percent: 16, 
          color: "#ef4444", 
          image: "images/ethnicities/azeris.webp", 
          desc: "קבוצה ממוצא טורקי המהווה את המיעוט הגדול ביותר במדינה. מתגוררים בעיקר בצפון-מערב איראן ובעלי השפעה רבה בחברה ובכלכלה.", 
          language: "אזרית", 
          religion: "אסלאם שיעי" 
        },
        { 
          name: "כורדים", 
          percent: 10, 
          color: "#4d7c0f", 
          image: "images/ethnicities/kurds.webp", 
          desc: "עם איראני החי בעיקר באזורים ההרריים של מערב איראן (כורדיסטן האיראנית), בעל תרבות שבטית ייחודית ושאיפות היסטוריות לאוטונומיה.", 
          language: "כורדית", 
          religion: "אסלאם סוני (ברובו)" 
        },
        { 
          name: "לורים", 
          percent: 6, 
          color: "#a855f7", 
          image: "images/ethnicities/lurs.webp", 
          desc: "קבוצה איראנית מסורתית החיה במערב ודרום-מערב איראן. ללורים מורשת נוודית ושורשים היסטוריים עמוקים באזור הרי הזגרוס.", 
          language: "לורית", 
          religion: "אסלאם שיעי" 
        },
        { 
          name: "גילאקים", 
          percent: 4, 
          color: "#c026d3", 
          image: "images/ethnicities/gilaks.webp", 
          desc: "קבוצה אתנית החיה במחוז גילאן לחופי הים הכספי. תרבותם וכלכלתם מבוססות במידה רבה על חקלאות, דיג וגידולי תה ואורז.", 
          language: "גילאקית", 
          religion: "אסלאם שיעי" 
        },
        { 
          name: "מזאנים", 
          percent: 4, 
          color: "#d946ef", 
          image: "images/ethnicities/mazanis.webp", 
          desc: "עם החי במחוז מאזנדראן הסמוך לים הכספי. חולקים קרבה תרבותית ולשונית לגילאקים ומוכרים בזכות המסורות הייחודיות שלהם.", 
          language: "מאזנדראנית", 
          religion: "אסלאם שיעי" 
        },
        { 
          name: "בלוצ'ים", 
          percent: 2, 
          color: "#92400e", 
          image: "images/ethnicities/baloch.webp", 
          desc: "קבוצה אתנית החיה באזור הגבול המדברי והצחיח שבין איראן לפקיסטן (מחוז סיסטאן ובלוצ'סתאן). מקיימים מבנה חברתי שבטי מובהק.", 
          language: "בלוצ'ית", 
          religion: "אסלאם סוני" 
        },
        { 
          name: "טורקמנים", 
          percent: 2, 
          color: "#84cc16", 
          image: "images/ethnicities/turkmens.webp", 
          desc: "קבוצה ממוצא טורקי החיה בצפון-מזרח איראן, קרוב לגבול עם טורקמניסטן. שומרים על מסורות ייחודיות ורבים מהם חיים באורח חיים נוודי למחצה.", 
          language: "טורקמנית", 
          religion: "אסלאם סוני" 
        },
        { 
          name: "קשקאים", 
          percent: 1.5, 
          color: "#f97316", 
          image: "images/ethnicities/qashqai.webp", 
          desc: "קונפדרציה של שבטים נוודים ממוצא טורקי החיים בדרום-מערב איראן, בעיקר במחוז פארס. ידועים באריגת שטיחים מסורתית.", 
          language: "קשקאית (ניב טורקי)", 
          religion: "אסלאם שיעי" 
        },
        { 
          name: "טאלישים", 
          percent: 0.5, 
          color: "#94a3b8", 
          image: "images/ethnicities/talysh.webp", 
          desc: "עם איראני עתיק החי באזור ההררי של צפון-מערב איראן ודרום-מזרח אזרבייג'ן, השומר על שפה ותרבות ייחודיות.", 
          language: "טאלישית", 
          religion: "אסלאם (סוני ושיעי)" 
        }
      ]
    },
    Iraq: {
      hebrewName: "עיראק",
      view: { scale: 2.20, x: -903, y: -346 },
      ethnicImage: "images/countries-ethnic/ethnic-Iraq.webp",
      labelImage: "images/countries-labels/labels-Iraq.webp",
      demographics: [
        { name: "ערבים", percent: 78, color: "#22c55e", image: "images/ethnicities/arabs.webp", desc: "הערבים מהווים את רוב אוכלוסיית עיראק, המחולקים דתית באופן מובהק בין רוב שיעי במזרח ודרום המדינה, ומיעוט סוני משמעותי במערבה.", language: "ערבית", religion: "אסלאם (שיעי וסוני)" },
        { name: "כורדים", percent: 18, color: "#eab308", image: "images/ethnicities/kurds.webp", desc: "הכורדים מרכיבים את אוכלוסיית חבל כורדיסטן בצפון עיראק, הנהנה כיום מאוטונומיה רחבה מאוד.", language: "כורדית", religion: "אסלאם סוני" },
        { name: "טורקמנים ואשורים", percent: 4, color: "#6366f1", image: "images/ethnicities/turkmens.webp", desc: "קבוצות מיעוט חשובות; הטורקמנים ממוקמים בעיקר באזור כירכוכ, והאשורים הם נוצרים בעלי זהות הקשורה לאימפריה העתיקה של מסופוטמיה.", language: "טורקמנית / ארמית", religion: "אסלאם / נצרות" }
      ]
    },
    Israel: {
      hebrewName: "ישראל",
      view: { scale: 3.00, x: -709, y: -645 },
      ethnicImage: "images/countries-ethnic/ethnic-Israel.webp",
      labelImage: "images/countries-labels/labels-Israel.webp", 
      demographics: [
        { name: "יהודים", percent: 73.5, color: "#3b82f6", image: "images/ethnicities/jews.webp", desc: "יהודים הם אומה וקבוצה אתנו-דתית מקבוצת עמי השמיות, ששורשיה ההיסטוריים והתרבותיים קשורים בארץ ישראל העתיקה.", language: "עברית", religion: "יהדות" },
        { name: "ערבים", percent: 21.0, color: "#22c55e", image: "images/ethnicities/arabs.webp", desc: "אזרחיה הערבים של ישראל מורכבים ממוסלמים, נוצרים, מרונים ודרוזים.", language: "ערבית", religion: "אסלאם / נצרות / דרוזית" },
        { name: "אחרים", percent: 5.5, color: "#8b5cf6", image: "images/ethnicities/others.webp", desc: "קבוצות אתניות נוספות הכוללות אזרחים חסרי סיווג דת, בני משפחה עולים, וקהילות קטנות כמו צ'רקסים וארמנים.", language: "מגוון", religion: "שונות" }
      ]
    },
    Jordan: {
      hebrewName: "ירדן",
      view: { scale: 3.00, x: -913, y: -709 },
      ethnicImage: "images/countries-ethnic/ethnic-Jordan.webp",
      labelImage: "images/countries-labels/labels-Jordan.webp", 
      demographics: [
        { name: "ערבים", percent: 98, color: "#22c55e", image: "images/ethnicities/arabs.webp", desc: "מרבית אוכלוסיית ירדן מורכבת מערבים ילידי עבר הירדן יחד עם אחוז משמעותי מאוד של פלסטינים שהיגרו ממערב לנהר הירדן.", language: "ערבית", religion: "אסלאם סוני" },
        { name: "צ'רקסים", percent: 1, color: "#f43f5e", image: "images/ethnicities/circassians.webp", desc: "עם קווקזי שהוגלה מולדתו במאה ה-19, והשתקע בלבנט. בירדן הם מהווים עוגן נאמן וחשוב לבית המלוכה ההאשמי.", language: "צ'רקסית / ערבית", religion: "אסלאם סוני" },
        { name: "ארמנים", percent: 1, color: "#3b82f6", image: "images/ethnicities/armenians.webp", desc: "קהילה קטנה אך משמעותית שהגיעה לירדן בעיקר במהלך מלחמת העולם הראשונה, השומרת על מורשתה בעמאן.", language: "ארמנית", religion: "נצרות" }
      ]
    },
    Kuwait: {
      hebrewName: "כוויית",
      view: { scale: 3.20, x: -1903, y: -1066 },
      ethnicImage: "images/countries-ethnic/ethnic-Kuwait.webp",
      labelImage: "images/countries-labels/labels-Kuwait.webp", 
      demographics: [
        { name: "אסייתים", percent: 40.3, color: "#8b5cf6", image: "images/ethnicities/asians.webp", desc: "מהגרי עבודה ממדינות דרום ומזרח אסיה (כגון הודו, פקיסטן, הפיליפינים) המהווים חלק ניכר ומכריע בכוח העבודה של כווית.", language: "הינדי, אורדו, טגאלוג", religion: "הינדואיזם / נצרות / אסלאם" },
        { name: "כוויתים", percent: 30.4, color: "#22c55e", image: "images/ethnicities/kuwaitis.webp", desc: "אזרחי כווית המקוריים (ערבים). באופן ייחודי למדינות המפרץ, האזרחים מהווים מיעוט בארצם בשל צורך תעסוקתי זר אדיר.", language: "ערבית", religion: "אסלאם" },
        { name: "ערבים אחרים", percent: 27.4, color: "#10b981", image: "images/ethnicities/arabs.webp", desc: "מהגרים ועובדים זרים ממדינות ערב השכנות, כגון מצרים, לבנון, סוריה וירדן.", language: "ערבית", religion: "אסלאם" }
      ]
    },
    Lebanon: {
      hebrewName: "לבנון",
      view: { scale: 5.00, x: -2430, y: -1848 },
      ethnicImage: "images/countries-ethnic/ethnic-Lebanon.webp",
      labelImage: "images/countries-labels/labels-Lebanon.webp",
      demographics: [
        { name: "ערבים", percent: 95, color: "#22c55e", image: "images/ethnicities/arabs.webp", desc: "הזהות האתנית המרכזית בלבנון, אך האוכלוסייה מפוצלת עמוקות לעדות דתיות (נוצרים מרונים, מוסלמים סונים, מוסלמים שיעים, ודרוזים) המכתיבות את מבנה הממשל.", language: "ערבית", religion: "נצרות, אסלאם סוני ושיעי" },
        { name: "ארמנים", percent: 4, color: "#3b82f6", image: "images/ethnicities/armenians.webp", desc: "אחת הקהילות הארמניות החשובות והפוליטיות במזרח התיכון, היושבת בעיקר סביב העיר ביירות ויש לה ייצוג מובטח בפרלמנט הלבנוני.", language: "ארמנית", religion: "נצרות (הכנסייה האפוסטולית)" },
        { name: "אחרים", percent: 1, color: "#f59e0b", image: "images/ethnicities/others.webp", desc: "כולל כורדים קבוצות פליטים ועובדים זרים.", language: "מגוון", religion: "שונות" }
      ]
    },
    SaudiArabia: {
      hebrewName: "ערב הסעודית",
      view: { scale: 1.60, x: -509, y: -542 },
      ethnicImage: "images/countries-ethnic/ethnic-SaudiArabia.webp",
      labelImage: "images/countries-labels/labels-SaudiArabia.webp",
      demographics: [
        { name: "סעודים", percent: 58.4, color: "#22c55e", image: "images/ethnicities/saudis.webp", desc: "אזרחי הממלכה, המורכבים ברובם המוחלט מערבים ילידי חצי האי ערב, המקיימים אורח חיים המשלב מסורת שבטית בדואית עם מודרניזציה מהירה.", language: "ערבית", religion: "אסלאם סוני (והאבי)" },
        { name: "לא-סעודים", percent: 41.6, color: "#64748b", image: "images/ethnicities/others.webp", desc: "כוח העבודה הזר המניע את כלכלת הממלכה, המורכב ממהגרים מאסיה (כגון הודים ופקיסטנים) וממדינות ערב מתפתחות.", language: "הינדי, אורדו, אנגלית", religion: "אסלאם, הינדואיזם" }
      ]
    },
    Syria: {
      hebrewName: "סוריה",
      view: { scale: 2.90, x: -1010, y: -395 },
      ethnicImage: "images/countries-ethnic/ethnic-Syria.webp",
      labelImage: "images/countries-labels/labels-Syria.webp", 
      demographics: [
        { name: "ערבים", percent: 50, color: "#22c55e", image: "images/ethnicities/arabs.webp", desc: "ערבים מוסלמים סונים המהווים את הרוב המרכזי במדינה, אשר נפגעו קשות במלחמת האזרחים ומיליונים מהם הפכו לפליטים.", language: "ערבית", religion: "אסלאם סוני" },
        { name: "עלווים", percent: 15, color: "#ec4899", image: "images/ethnicities/alawites.webp", desc: "עדה סודית וייחודית שהתפצלה מן האסלאם השיעי. מתגוררים בעיקר ברצועת החוף המערבית ומחזיקים בכוח פוליטי וצבאי שולט בסוריה.", language: "ערבית", religion: "עלווים (שיעה)" },
        { name: "כורדים", percent: 10, color: "#eab308", image: "images/ethnicities/kurds.webp", desc: "המיעוט האתני הגדול בסוריה, המתרכז בצפון המדינה (רוג'בה) ופועל לקראת אוטונומיה אזורית משלו.", language: "כורדית", religion: "אסלאם סוני" },
        { name: "לבנטינים", percent: 10, color: "#3b82f6", image: "images/ethnicities/levantines.webp", desc: "קבוצות ערביות-נוצריות ומגוונות בעלות מורשת תרבותית סורית-לבנטינית עתיקה.", language: "ערבית", religion: "נצרות (יוונית-אורתודוקסית ועוד)" },
        { name: "אחרים", percent: 15, color: "#64748b", image: "images/ethnicities/others.webp", desc: "כולל דרוזים, טורקמנים, צ'רקסים וארמנים הפזורים ברחבי סוריה.", language: "מגוון", religion: "אסלאם, נצרות, דת הדרוזים" }
      ]
    },
    Turkey: {
      hebrewName: "טורקיה",
      view: { scale: 1.90, x: -327, y: 169 },
      ethnicImage: "images/countries-ethnic/ethnic-Turkey.webp",
      labelImage: "images/countries-labels/labels-Turkey.webp", 
      demographics: [
        { name: "טורקים", percent: 73, color: "#ef4444", image: "images/ethnicities/turks.webp", desc: "עם אוגוזי ממרכז אסיה שהשתקע באנטוליה. יורשי האימפריה העות'מאנית ונושאי הדגל של התרבות והשפה הטורקית המודרנית.", language: "טורקית", religion: "אסלאם סוני" },
        { name: "כורדים", percent: 19, color: "#eab308", image: "images/ethnicities/kurds.webp", desc: "המיעוט האתני הגדול ביותר בטורקיה, המתגורר בעיקר במזרח ודרום-מזרח המדינה, אשר מנהל מאבק ארוך שנים להכרה תרבותית ואוטונומיה.", language: "כורדית", religion: "אסלאם סוני" },
        { name: "אחרים", percent: 8, color: "#64748b", image: "images/ethnicities/others.webp", desc: "כולל עמים ילידים כמו לאזים וצ'רקסים, וכן קהילות ותיקות של יוונים, ארמנים ויהודים, בעיקר סביב מחוז איסטנבול.", language: "מגוון", religion: "אסלאם, נצרות, יהדות" }
      ]
    }
  },

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