// ==========================================
// 🌍 COUNTRY & DEMOGRAPHIC DATA
// ==========================================
window.DashboardData.countries = {
    Iran: {
        hebrewName: "איראן 🇮🇷",
        view: { scale: 1.50, x: -835, y: -125 },
        ethnicImage: "images/countries-ethnic/ethnic-Iran.webp",
        labelImage: "images/countries-labels/labels-Iran.webp",
        demographics: [
            { name: "פרסים", percent: 54, color: "#2dd4bf", image: "images/ethnicities/persians.webp", desc: "הקבוצה האתנית הגדולה והדומיננטית באיראן. יורשיה של היסטוריה אימפריאלית מפוארת, המהווים את ליבת התרבות, הכלכלה והפוליטיקה האיראנית.", language: "פרסית", religion: "אסלאם שיעי" },
            { name: "אזרים", percent: 16, color: "#ef4444", image: "images/ethnicities/azeris.webp", desc: "קבוצה ממוצא טורקי המהווה את המיעוט הגדול ביותר במדינה. מתגוררים בעיקר בצפון-מערב איראן ובעלי השפעה רבה בחברה ובכלכלה.", language: "אזרית", religion: "אסלאם שיעי" },
            { name: "כורדים", percent: 10, color: "#4d7c0f", image: "images/ethnicities/kurds.webp", desc: "עם איראני החי בעיקר באזורים ההרריים של מערב איראן (כורדיסטן האיראנית), בעל תרבות שבטית ייחודית ושאיפות היסטוריות לאוטונומיה.", language: "כורדית", religion: "אסלאם סוני (ברובו)" },
            { name: "לורים", percent: 6, color: "#a855f7", image: "images/ethnicities/lurs.webp", desc: "קבוצה איראנית מסורתית החיה במערב ודרום-מערב איראן. ללורים מורשת נוודית ושורשים היסטוריים עמוקים באזור הרי הזגרוס.", language: "לורית", religion: "אסלאם שיעי" },
            { name: "גילאקים", percent: 4, color: "#c026d3", image: "images/ethnicities/gilaks.webp", desc: "קבוצה אתנית החיה במחוז גילאן לחופי הים הכספי. תרבותם וכלכלתם מבוססות במידה רבה על חקלאות, דיג וגידולי תה ואורז.", language: "גילאקית", religion: "אסלאם שיעי" },
            { name: "מזאנים", percent: 4, color: "#d946ef", image: "images/ethnicities/mazanis.webp", desc: "עם החי במחוז מאזנדראן הסמוך לים הכספי. חולקים קרבה תרבותית ולשונית לגילאקים ומוכרים בזכות המסורות הייחודיות שלהם.", language: "מאזנדראנית", religion: "אסלאם שיעי" },
            { name: "בלוצ'ים", percent: 2, color: "#92400e", image: "images/ethnicities/baloch.webp", desc: "קבוצה אתנית החיה באזור הגבול המדברי והצחיח שבין איראן לפקיסטן (מחוז סיסטאן ובלוצ'סתאן). מקיימים מבנה חברתי שבטי מובהק.", language: "בלוצ'ית", religion: "אסלאם סוני" },
            { name: "טורקמנים", percent: 2, color: "#145014", image: "images/ethnicities/turkmens.webp", desc: "קבוצה ממוצא טורקי החיה בצפון-מזרח איראן, קרוב לגבול עם טורקמניסטן. שומרים על מסורות ייחודיות ורבים מהם חיים באורח חיים נוודי למחצה.", language: "טורקמנית", religion: "אסלאם סוני" },
            { name: "קשקאים", percent: 1.5, color: "#f97316", image: "images/ethnicities/qashqai.webp", desc: "קונפדרציה של שבטים נוודים ממוצא טורקי החיים בדרום-מערב איראן, בעיקר במחוז פארס. ידועים באריגת שטיחים מסורתית.", language: "קשקאית (ניב טורקי)", religion: "אסלאם שיעי" },
            { name: "טאלישים", percent: 0.5, color: "#94a3b8", image: "images/ethnicities/talysh.webp", desc: "עם איראני עתיק החי באזור ההררי של צפון-מערב איראן ודרום-מזרח אזרבייג'ן, השומר על שפה ותרבות ייחודיות.", language: "טאלישית", religion: "אסלאם (סוני ושיעי)" }
        ]
    },
    Turkey: {
        hebrewName: "טורקיה 🇹🇷",
        view: { scale: 1.90, x: -327, y: 169 },
        ethnicImage: "images/countries-ethnic/ethnic-Turkey.webp",
        labelImage: "images/countries-labels/labels-Turkey.webp",
        demographics: [
            { name: "טורקים", percent: 73, color: "#15803d", image: "images/ethnicities/turks.webp", desc: "עם אוגוזי ממרכז אסיה שהשתקע באנטוליה. יורשי האימפריה העות'מאנית ונושאי הדגל של התרבות והשפה הטורקית המודרנית.", language: "טורקית", religion: "אסלאם סוני" },
            { name: "כורדים", percent: 19, color: "#ca8a04", image: "images/ethnicities/kurds.webp", desc: "המיעוט האתני הגדול ביותר בטורקיה, המתגורר בעיקר במזרח ודרום-מזרח המדינה, אשר מנהל מאבק ארוך שנים להכרה תרבותית ואוטונומיה.", language: "כורדית", religion: "אסלאם סוני" },
            { name: "בני זאזא", percent: 4, color: "#5eead4", image: "images/ethnicities/zazas.webp", desc: "עם איראני החי במזרח טורקיה. לעיתים משויכים פוליטית לכורדים, אך דוברים שפה נפרדת (זאזאקי) ובעלי זהות תרבותית ייחודית.", language: "זאזאקי", religion: "אסלאם (סוני ועלוי)" },
            { name: "אזרים (אזרבייג'נים)", percent: 1.5, color: "#22c55e", image: "images/ethnicities/azeris.webp", desc: "קבוצה טורקית החיה באזור קארס ואִידִיר שבמזרח טורקיה, סמוך לגבול עם ארמניה ואיראן. חולקים קרבה הדוקה לאזרים שבאזרבייג'ן.", language: "אזרית / טורקית", religion: "אסלאם שיעי" },
            { name: "לאזים", percent: 0.5, color: "#db2777", image: "images/ethnicities/laz.webp", desc: "קבוצה אתנית קווקזית עתיקה החיה בעיקר לאורך רצועת החוף המזרחית של הים השחור. התאסלמו בתקופה העות'מאנית אך שומרים על שפתם הייחודית.", language: "לאזית", religion: "אסלאם סוני" },
            { name: "אחרים", percent: 2, color: "#64748b", image: "images/ethnicities/others.webp", desc: "כולל קהילות היסטוריות קטנות יותר כגון צ'רקסים, יוונים, ארמנים ויהודים, המתרכזות כיום בעיקר סביב מחוז איסטנבול.", language: "מגוון", religion: "מגוון" }
        ]
    },
    SaudiArabia: {
        hebrewName: "ערב הסעודית 🇸🇦",
        view: { scale: 1.60, x: -509, y: -542 },
        ethnicImage: "images/countries-ethnic/ethnic-SaudiArabia.webp",
        labelImage: "images/countries-labels/labels-SaudiArabia.webp",
        demographics: [
            { name: "ערבים סעודים", percent: 58.4, color: "#22c55e", image: "images/ethnicities/saudis.webp", desc: "אזרחי הממלכה הילידים. כפי שמשתקף במפה, רובם המכריע הם ערבים מוסלמים סונים (לצד מיעוט שיעי במזרח המדינה). החברה הסעודית משלבת מסורת שבטית עמוקה עם פיתוח עירוני וטכנולוגי מואץ.", language: "ערבית", religion: "אסלאם סוני (והאבי)" },
            { name: "לא-סעודים (עובדים זרים)", percent: 41.6, color: "#64748b", image: "images/ethnicities/others.webp", desc: "כוח אדם זר עצום המניע את כלכלת הממלכה, ומהווה כמעט מחצית מהאוכלוסייה. רובם מהגרים ממדינות דרום אסיה (כגון הודו, פקיסטן ובנגלדש) וממדינות ערב השכנות. קהילות אלו מתרכזות בעיקר במרכזים העירוניים.", language: "מגוון (הינדי, אורדו, טגאלוג ועוד)", religion: "אסלאם / הינדואיזם / נצרות" }
        ]
    },
    Iraq: {
        hebrewName: "עיראק 🇮🇶",
        view: { scale: 2.20, x: -903, y: -346 },
        ethnicImage: "images/countries-ethnic/ethnic-Iraq.webp",
        labelImage: "images/countries-labels/labels-Iraq.webp",
        demographics: [
            { name: "ערבים", percent: 78, color: "#22c55e", image: "images/ethnicities/arabs.webp", desc: "הערבים מהווים את הרוב המוחלט בעיראק. מבחינה גיאוגרפית ודתית הם מחולקים באופן מובהק: רוב שיעי בדרום ומזרח המדינה, ומיעוט סוני משמעותי במרכז ובמערב (המשולש הסוני), עם אזורי חיכוך מעורבים ביניהם.", language: "ערבית", religion: "אסלאם (שיעי וסוני)" },
            { name: "כורדים", percent: 18, color: "#eab308", image: "images/ethnicities/kurds.webp", desc: "הכורדים מרכיבים את אוכלוסיית חבל כורדיסטן ההררי בצפון עיראק. הם נהנים מאוטונומיה פוליטית רחבה ומשמרים תרבות, שפה וממשל עצמאי משלהם.", language: "כורדית", religion: "אסלאם סוני" },
            { name: "טורקמנים ואשורים", percent: 4, color: "#6366f1", image: "images/ethnicities/turkmens.webp", desc: "קבוצות מיעוט היסטוריות וחשובות. הטורקמנים מרוכזים בעיקר באזור הסכסוך סביב העיר כירכוכ, והאשורים (נוצרים ילידים) משמרים את מורשתם ההיסטורית באזורי הצפון ונינוה.", language: "טורקמנית / ארמית", religion: "אסלאם / נצרות" }
        ]
    },
    Syria: {
        hebrewName: "סוריה 🇸🇾",
        view: { scale: 2.90, x: -1010, y: -395 },
        ethnicImage: "images/countries-ethnic/ethnic-Syria.webp",
        labelImage: "images/countries-labels/labels-Syria.webp",
        demographics: [
            { name: "ערבים (סונים)", percent: 50, color: "#22c55e", image: "images/ethnicities/arabs.webp", desc: "ערבים מוסלמים סונים המהווים את הרוב המרכזי במדינה, אשר נפגעו קשות במלחמת האזרחים ומיליונים מהם הפכו לפליטים או עקורים.", language: "ערבית", religion: "אסלאם סוני" },
            { name: "עלווים", percent: 15, color: "#15803d", image: "images/ethnicities/alawites.webp", desc: "עדה סודית וייחודית שהתפצלה מן האסלאם השיעי. מתגוררים בעיקר ברצועת החוף המערבית (לטקיה וטרטוס) ומחזיקים בכוח פוליטי וצבאי שולט בסוריה.", language: "ערבית", religion: "עלווים (שיעה)" },
            { name: "כורדים", percent: 10, color: "#ca8a04", image: "images/ethnicities/kurds.webp", desc: "המיעוט האתני הגדול בסוריה, המתרכז בצפון ובצפון-מזרח המדינה (רוג'בה) ופועל תחת שלטון אוטונומי דה-פקטו מאז מלחמת האזרחים.", language: "כורדית", religion: "אסלאם סוני" },
            { name: "לבנטינים (נוצרים)", percent: 10, color: "#3b82f6", image: "images/ethnicities/levantines.webp", desc: "קבוצות ערביות-נוצריות ומגוונות (אורתודוקסים, קתולים, סורים ואשורים) בעלות מורשת תרבותית עתיקה בלבנט, המרוכזות בעיקר בערים דמשק וחלב.", language: "ערבית / ארמית", religion: "נצרות" },
            { name: "דרוזים", percent: 5, color: "#a855f7", image: "images/ethnicities/druze.webp", desc: "קבוצה אתנו-דתית ייחודית המתרכזת בעיקר בדרום סוריה, באזור הר הדרוזים (ג'בל א-דרוז) שבמחוז א-סווידא.", language: "ערבית", religion: "דת הדרוזים" },
            { name: "אחרים", percent: 10, color: "#64748b", image: "images/ethnicities/others.webp", desc: "כולל מיעוטים נוספים כגון טורקמנים (בצפון), צ'רקסים, ישמעאלים וארמנים הפזורים ברחבי סוריה.", language: "מגוון", religion: "שונות" }
        ]
    },
    Israel: {
        hebrewName: "ישראל 🇮🇱",
        view: { scale: 3.00, x: -709, y: -645 },
        ethnicImage: "images/countries-ethnic/ethnic-Israel.webp",
        labelImage: "images/countries-labels/labels-Israel.webp",
        demographics: [
            { name: "יהודים", percent: 73.5, color: "#2563eb", image: "images/ethnicities/jews.webp", desc: "היהודים מהווים את הרוב המוחלט בישראל. זוהי קבוצה אתנו-דתית המורכבת ממגוון עדות וקהילות (אשכנזים, ספרדים, מזרחים ועוד) שהתקבצו מכל רחבי העולם חזרה למולדתם ההיסטורית.", language: "עברית", religion: "יהדות" },
            { name: "ערבים", percent: 21.0, color: "#4ade80", image: "images/ethnicities/arabs.webp", desc: "המיעוט האתני הגדול בישראל. רובם המכריע הם מוסלמים סונים (כולל האוכלוסייה הבדואית בנגב ובצפון), ולצידם מיעוט משמעותי של ערבים-נוצרים.", language: "ערבית", religion: "אסלאם סוני / נצרות" },
            { name: "אחרים (דרוזים ועוד)", percent: 5.5, color: "#8b5cf6", image: "images/ethnicities/others.webp", desc: "קבוצה הכוללת את העדה הדרוזית (קבוצה אתנו-דתית ייחודית וסודית המתרכזת בכרמל ובגולן), צ'רקסים, ארמנים, קהילות עולים לא-יהודיות ואזרחים חסרי סיווג דתי.", language: "ערבית / מגוון", religion: "דת הדרוזים / שונות" }
        ]
    },
    Jordan: {
        hebrewName: "ירדן 🇯🇴",
        view: { scale: 3.00, x: -913, y: -709 },
        ethnicImage: "images/countries-ethnic/ethnic-Jordan.webp",
        labelImage: "images/countries-labels/labels-Jordan.webp",
        demographics: [
            { name: "ערבים", percent: 98, color: "#22c55e", image: "images/ethnicities/arabs.webp", desc: "הערבים בירדן הם ברובם המוחלט מוסלמים סונים (כפי שמודגש במפה). האוכלוסייה מורכבת מערבים ילידי עבר הירדן (בדואים ועירוניים כאחד) לצד שיעור משמעותי מאוד של אוכלוסייה ממוצא פלסטיני.", language: "ערבית", religion: "אסלאם סוני" },
            { name: "צ'רקסים", percent: 1, color: "#f43f5e", image: "images/ethnicities/circassians.webp", desc: "עם קווקזי שהוגלה מולדתו במאה ה-19 והשתקע באזור הלבנט. למרות גודלם היחסי, הם מהווים עוגן נאמן וחשוב לבית המלוכה ההאשמי ומשולבים עמוקות בדרגים הבכירים של צבא ירדן.", language: "צ'רקסית / ערבית", religion: "אסלאם סוני" },
            { name: "ארמנים", percent: 1, color: "#3b82f6", image: "images/ethnicities/armenians.webp", desc: "קהילה קטנה אך משמעותית שהגיעה לירדן בעיקר בעקבות רצח העם הארמני בתקופת מלחמת העולם הראשונה. הקהילה שומרת על מורשתה ותרבותה הייחודית ומתרכזת ברובה בבירה עמאן.", language: "ארמנית", religion: "נצרות (הכנסייה האפוסטולית)" }
        ]
    },
    Lebanon: {
        hebrewName: "לבנון 🇱🇧",
        view: { scale: 4.40, x: -1556, y: -961 },
        ethnicImage: "images/countries-ethnic/ethnic-Lebanon.webp",
        labelImage: "images/countries-labels/labels-Lebanon.webp",
        demographics: [
            { name: "ערבים (שיעים)", percent: 31, color: "#16a34a", image: "images/ethnicities/shia-lebanon.webp", desc: "הקהילה השיעית היא מהגדולות בלבנון כיום, המתרכזת בעיקר בדרום המדינה, בבקאע ובפרברים הדרומיים של ביירות (הדאחיה).", language: "ערבית", religion: "אסלאם שיעי" },
            { name: "ערבים (סונים)", percent: 31, color: "#84cc16", image: "images/ethnicities/sunni-lebanon.webp", desc: "הקהילה הסונית מתרכזת ברובה בערים הגדולות לאורך החוף (טריפולי, ביירות, צידון) ובאזורים ספציפיים בצפון המדינה.", language: "ערבית", religion: "אסלאם סוני" },
            { name: "נוצרים (מרונים)", percent: 21, color: "#dc2626", image: "images/ethnicities/maronites.webp", desc: "קהילה נוצרית-קתולית מזרחית בעלת חשיבות היסטורית עצומה בהקמת לבנון המודרנית. ריכוזם המרכזי הוא באזור הר הלבנון.", language: "ערבית", religion: "נצרות (מרונית)" },
            { name: "נוצרים (יוונים-קתולים ואורתודוקסים)", percent: 8, color: "#ca8a04", image: "images/ethnicities/greek-orthodox-lebanon.webp", desc: "קהילות נוצריות עתיקות, המתרכזות במספר מובלעות ברחבי המדינה, בעלות השפעה תרבותית וכלכלית רבה.", language: "ערבית", religion: "נצרות (אורתודוקסית וקתולית)" },
            { name: "דרוזים", percent: 5, color: "#a855f7", image: "images/ethnicities/druze.webp", desc: "עדה סודית וייחודית המהווה כוח פוליטי חשוב בלבנון, מתרכזת בעיקר באזור הרי השוף שבהר הלבנון.", language: "ערבית", religion: "דת הדרוזים" },
            { name: "ארמנים", percent: 4, color: "#3b82f6", image: "images/ethnicities/armenians.webp", desc: "קהילה חשובה שהתיישבה בלבנון בעיקר לאחר מלחמת העולם הראשונה, המתרכזת ברובה בשכונת בורג' חמוד בביירות.", language: "ארמנית", religion: "נצרות (הכנסייה האפוסטולית)" }
        ]
    },
    Kuwait: {
        hebrewName: "כוויית 🇰🇼",
        view: { scale: 3.20, x: -1903, y: -1066 },
        ethnicImage: "images/countries-ethnic/ethnic-Kuwait.webp",
        labelImage: "images/countries-labels/labels-Kuwait.webp",
        demographics: [
            { name: "כוויתים", percent: 30.4, color: "#22c55e", image: "images/ethnicities/kuwaitis.webp", desc: "אזרחי כווית המקוריים. באופן ייחודי, האזרחים מהווים מיעוט בארצם. מבחינה דתית, האוכלוסייה מורכבת מרוב סוני לצד מיעוט שיעי משמעותי, החיים במעורבות גיאוגרפית (כפי שמתבטא במפה).", language: "ערבית (ניב מפרצי)", religion: "אסלאם (סוני ושיעי)" },
            { name: "ערבים אחרים", percent: 27.4, color: "#10b981", image: "images/ethnicities/arabs.webp", desc: "קהילה גדולה של מהגרי עבודה ותושבים ממדינות ערב השכנות (כגון מצרים, סוריה, ירדן ולבנון), התורמים משמעותית למערכות החינוך והשירותים הציבוריים במדינה.", language: "ערבית", religion: "אסלאם סוני" },
            { name: "אסייתים", percent: 40.3, color: "#8b5cf6", image: "images/ethnicities/asians.webp", desc: "קבוצת האוכלוסייה הגדולה ביותר במדינה, המורכבת כולה ממהגרי עבודה (בעיקר מהודו, פקיסטן, בנגלדש והפיליפינים) המהווים את עמוד השדרה של שוק העבודה המקומי.", language: "הינדי, אורדו, טגאלוג", religion: "אסלאם / הינדואיזם / נצרות" }
        ]
    },
    Azerbeijan: {
        hebrewName: "אזרבייג'ן 🇦🇿",
        view: { scale: 4.00, x: -2635, y: -57 },
        ethnicImage: "images/countries-ethnic/ethnic-Azerbeijan.webp",
        labelImage: "images/countries-labels/labels-Azerbeijan.webp",
        demographics: [
            { name: "אזרים", percent: 91.6, color: "#dc2626", image: "images/ethnicities/azeris.webp", desc: "האזרים הם עם ממוצא טורקי, המהווים את הרוב המוחלט של אוכלוסיית אזרבייג'ן. התרבות האזרית משלבת באופן ייחודי השפעות טורקיות, פרסיות וקווקזיות.", language: "אזרית", religion: "אסלאם שיעי" },
            { name: "לזגינים", percent: 2.0, color: "#b45309", image: "images/ethnicities/lezgins.webp", desc: "קבוצה אתנית קווקזית ילידית וחזקה המתגוררת באזור ההררי של צפון-מזרח אזרבייג'ן ודרום דאגסטן. ידועים באורח חייהם המסורתי והלוחמני היסטורית.", language: "לזגינית", religion: "אסלאם סוני" },
            { name: "טאלישים", percent: 1.5, color: "#10b981", image: "images/ethnicities/talysh.webp", desc: "עם איראני עתיק החי באזור החוף וההרים של דרום-מזרח אזרבייג'ן. הם בעלי קשר לשוני ותרבותי הדוק לתושבי צפון איראן השכנה.", language: "טאלישית", religion: "אסלאם (שיעי וסוני)" },
            { name: "רוסים", percent: 1.3, color: "#3b82f6", image: "images/ethnicities/russians.webp", desc: "מיעוט שנותר מתקופת שלטון האימפריה הרוסית וברית המועצות. הקהילה הרוסית מתרכזת כיום כמעט לחלוטין באזורים עירוניים, ובעיקר בבירה באקו.", language: "רוסית", religion: "נצרות (אורתודוקסית)" },
            { name: "ארמנים", percent: 1.3, color: "#f59e0b", image: "images/ethnicities/armenians.webp", desc: "היסטורית, היוו מיעוט מובהק בעיקר בחבל נגורנו-קרבאך. אולם בעקבות המלחמות והסכסוכים האזוריים (במיוחד ב-2023), נוכחותם באזרבייג'ן הצטמצמה כמעט לאפס.", language: "ארמנית", religion: "נצרות (הכנסייה האפוסטולית)" }
        ]
    },
    Armenia: {
        hebrewName: "ארמניה 🇦🇲",
        view: { scale: 3.7, x: -2176, y: -8 },
        ethnicImage: "images/countries-ethnic/ethnic-Armenia.webp",
        labelImage: "images/countries-labels/labels-Armenia.webp",
        demographics: [
            { name: "ארמנים", percent: 98.1, color: "#3b82f6", image: "images/ethnicities/armenians.webp", desc: "הארמנים הם אומה וקבוצה אתנית הודית-אירופית שמקורה ברמת ארמניה. יש להם היסטוריה עשירה ותרבות ייחודית, והם היו העם הראשון שקיבל את הנצרות כדת מדינה בשנת 301 לספירה.", language: "ארמנית", religion: "נצרות (הכנסייה האפוסטולית)" },
            { name: "כורדים", percent: 1.2, color: "#eab308", image: "images/ethnicities/kurds.webp", desc: "המיעוט האתני הגדול בארמניה, החי בעיקר באזורים הכפריים וההרריים של מערב המדינה. קהילה זו מורכבת ברובה המוחלט מיזידים (דת פוליתאיסטית ייחודית) ולצידם כורדים מוסלמים.", language: "כורדית (קורמאנג'י)", religion: "יזידיזם / אסלאם סוני" },
            { name: "רוסים", percent: 0.3, color: "#94a3b8", image: "images/ethnicities/russians.webp", desc: "קבוצה אתנית סלאבית מזרחית. נוכחותם במדינה קשורה בעיקר להיסטוריה של האימפריה הרוסית וברית המועצות, והם מתגוררים כיום בעיקר בבירה ירוואן.", language: "רוסית", religion: "נצרות (אורתודוקסית)" }
        ]
    }
};

// 🔥 NEW: Regional Ethnicity Config Data (with dedicated pan-regional descriptions!)
window.DashboardData.regionalEthnicities = [
    { id: "arabs", name: "ערבים", image: "images/ethnicities/arabs.webp", desc: "הערבים הם הקבוצה האתנו-לשונית הגדולה ביותר במזרח התיכון ובצפון אפריקה. הם חולקים קשרים תרבותיים, היסטוריים ולשוניים עמוקים תחת השפה הערבית, ומתפלגים למגוון רחב של קהילות אזוריות וזרמים דתיים." },
    { id: "kurds", name: "כורדים", image: "images/ethnicities/kurds.webp", desc: "הכורדים הם עם איראני עתיק המהווה את אחד המיעוטים הגדולים במזרח התיכון ללא מדינת לאום עצמאית. תפוצתם מתפרסת על פני 'כורדיסטן' ההיסטורית - אזור הררי המחולק בין טורקיה, עיראק, איראן וסוריה." },
    { id: "persians", name: "פרסים", image: "images/ethnicities/persians.webp", desc: "הפרסים הם הקבוצה האתנית המרכזית באיראן ויורשיה של היסטוריה אימפריאלית מפוארת. הם דוברי השפה הפרסית ומהווים את עמוד השדרה התרבותי, הכלכלי והפוליטי של איראן." },
    { id: "turks", name: "טורקים", image: "images/ethnicities/turks.webp", desc: "הטורקים האנטוליים הם העם המרכזי בטורקיה וממשיכי דרכה של האימפריה העות'מאנית. תרבותם משלבת באופן ייחודי השפעות ממרכז אסיה, המזרח התיכון, הים התיכון והבלקן." },
    { id: "azeris", name: "אזרים", image: "images/ethnicities/azeris.webp", desc: "האזרים הם קבוצה ממוצא טורקי המהווה את הרוב המוחלט באזרבייג'ן ואת המיעוט הגדול ביותר באיראן. זהותם ותרבותם מהוות גשר היסטורי בין העולם הטורקי לפרסי." },
    { id: "armenians", name: "ארמנים", image: "images/ethnicities/armenians.webp", desc: "הארמנים הם אומה וקבוצה אתנית הודית-אירופית עתיקה שמקורה ברמת ארמניה. קהילות ארמניות היסטוריות וחשובות פזורות כיום גם ברחבי הלבנט (כגון לבנון, סוריה וירושלים)." },
    { id: "jews", name: "יהודים", image: "images/ethnicities/jews.webp", desc: "היהודים הם קבוצה אתנו-דתית שצמחה באזור הלבנט בימי קדם. לאחר אלפי שנות גלות ותפוצה, שבו היהודים מכל רחבי העולם למולדתם ההיסטורית, ישראל, שם הם מהווים את הרוב המוחלט." },
    { id: "druze", name: "דרוזים", image: "images/ethnicities/druze.webp", desc: "הדרוזים הם קבוצה אתנו-דתית ייחודית, סודית ומלוכדת שהתפצלה מן האסלאם השיעי (האיסמאעיליה). קהילותיהם מרוכזות בעיקר באזורים הרריים אסטרטגיים בסוריה, לבנון וישראל." },
    { id: "maronites", name: "מרונים", image: "images/ethnicities/maronites.webp", desc: "המרונים הם קהילה נוצרית-קתולית מזרחית, המהווה את הקבוצה הנוצרית הגדולה והמשפיעה ביותר בלבנון, עם היסטוריה עמוקה של אוטונומיה אזורית ופוליטית בהר הלבנון." },
    { id: "lurs", name: "לורים", image: "images/ethnicities/lurs.webp", desc: "הלורים הם קבוצה איראנית מסורתית, בעלת מורשת נוודית ושבטית עמוקה. הם מתגוררים בעיקר לאורך רכס הרי הזגרוס במערב ודרום-מערב איראן." },
    { id: "baloch", name: "בלוצ'ים", image: "images/ethnicities/baloch.webp", desc: "הבלוצ'ים הם קבוצה אתנית החיה באזורים המדבריים והצחיחים של דרום-מזרח איראן, דרום פקיסטן ואפגניסטן. הם שומרים על שפתם ועל מבנה חברתי שבטי מובהק." },
    { id: "turkmens", name: "טורקמנים", image: "images/ethnicities/turkmens.webp", desc: "הטורקמנים הפזורים ברחבי המזרח התיכון (כגון בסוריה, עיראק ואיראן) הם קבוצות ממוצא טורקי, המשמרות מסורות תרבותיות עצמאיות וקשרים היסטוריים עמוקים לטורקיה ולמרכז אסיה." }
];