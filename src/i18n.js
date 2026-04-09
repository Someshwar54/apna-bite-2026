import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Comprehensive translation list covering all components
const resources = {
  en: {
    translation: {
      "nav_vendor": "Vendor Admin",
      "nav_customer": "Customer App",
      "nav_partner": "Delivery Partner",

      "welcome_title": "Welcome to ApnaBite",
      "vendor_btn": "Food Vendor",
      "partner_btn": "Delivery Partner",
      "customer_btn": "Hungry Customer",
      
      "stall_status": "Stall Status",
      "open": "OPEN",
      "closed": "CLOSED",
      "discount_sale": "Start Auto-Discount",
      "orders_ready": "Orders Ready",
      "rider_called": "Rider Dispatched!",
      "earnings": "Today's Earnings",
      "cash_out": "Get Cash Now",
      "voice_btn": "Tap & Speak to Update",

      "pt_title": "Drive & Earn",
      "pt_desc": "Join the Micro-Batch fleet.",
      "rg_name": "Full Name",
      "rg_phone": "Phone Number",
      "rg_password": "Password",
      "rg_license": "Driving License No. (Proof)",
      "rg_bank": "Banking Details (UPI ID)",
      "rg_start": "Start Earning",

      "vn_title": "Partner with Apna Bite",
      "vn_desc": "Start your digital stall in minutes.",
      "rg_shop_name": "Shop/Stall Name",
      "rg_shop_address": "Shop Location/Address",
      "rg_pan": "Govt ID (PAN Number)",
      "rg_submit": "Complete Registration",

      "cs_title": "Food Delivery",
      "cs_desc": "Order fresh, local micro-batches.",
      "rg_address": "Default Delivery Address",
      "rg_enter": "Enter Platform",

      "ci_find": "Find Nearby Stalls",
      "ci_zero_waste": "LIVE NEARBY: ZERO-WASTE SALE!",
      "ci_samosa": "Samosas at 50% Off - only 3km away",
      "ci_hygiene": "Verified Community Clean",
      "ci_rating": "4.8/5 based on 124 locals",
      "ci_menu": "Live Menu Status",
      "ci_fresh": "Fresh Batch made 12 mins ago",
      "ci_last": "Last prep 45 mins ago",
      "ci_add": "Add",
      "ci_select": "Select a stall on the map to view live inventory and hygiene ratings.",

      "pd_portal": "Partner Portal",
      "pd_active": "Active Riders in Zone",
      "pd_queues": "Micro-Batch Queues",
      "pd_queue_desc": "Instead of $1 per trip, pickup 5 combined orders in a 2km radius to earn $3.50 instantly.",
      "pd_batch": "Batch",
      "pd_ready": "READY",
      "pd_forming": "FORMING",
      "pd_orders": "Orders",
      "pd_earn": "Earn",
      "pd_est": "Est.",
      "pd_accept": "Accept Batch",
      "pd_heatmap": "Predictive Crowd Heatmap",
      "pd_go": "Go to Hotspot",
      "pd_map_desc": "Map displays areas where crowds are currently forming based on AI prediction (Useful for mobile cart positioning & rider routing).",
      "pd_high": "High Demand",
      "pd_form": "Forming"
    }
  },
  hi: {
    translation: {
      "nav_vendor": "दुकानदार पोर्टल",
      "nav_customer": "ग्राहक ऐप",
      "nav_partner": "डिलीवरी पार्टनर",

      "welcome_title": "ApnaBite में आपका स्वागत है",
      "vendor_btn": "दुकानदार",
      "partner_btn": "डिलीवरी पार्टनर",
      "customer_btn": "ग्राहक",

      "stall_status": "दुकान की स्थिति",
      "open": "चालू",
      "closed": "बंद",
      "discount_sale": "बिक्री सेल चलाएं (50% छूट)",
      "orders_ready": "ऑर्डर तैयार हैं",
      "rider_called": "राइडर आ रहा है!",
      "earnings": "आज की कमाई",
      "cash_out": "पैसे निकालें (UPI)",
      "voice_btn": "बोलकर बताएं",

      "pt_title": "ड्राइव करें और कमाएं",
      "pt_desc": "माइक्रो-बैच फ्लीट से जुड़ें।",
      "rg_name": "पूरा नाम",
      "rg_phone": "फ़ोन नंबर",
      "rg_password": "पासवर्ड",
      "rg_license": "ड्राइविंग लाइसेंस (प्रमाण)",
      "rg_bank": "बैंकिंग विवरण (UPI)",
      "rg_start": "कमाना शुरू करें",

      "vn_title": "Apna Bite से जुड़ें",
      "vn_desc": "कुछ ही मिनटों में अपनी दुकान शुरू करें।",
      "rg_shop_name": "दुकान का नाम",
      "rg_shop_address": "दुकान का पता",
      "rg_pan": "सरकारी आईडी (PAN)",
      "rg_submit": "पंजीकरण पूरा करें",

      "cs_title": "फ़ूड डिलीवरी",
      "cs_desc": "ताज़ा खाना ऑर्डर करें।",
      "rg_address": "डिलीवरी का पता",
      "rg_enter": "प्लेटफॉर्म में प्रवेश करें",

      "ci_find": "आस-पास की दुकानें खोजें",
      "ci_zero_waste": "समीपस्थ लाइव सेल!",
      "ci_samosa": "समोसे 50% छूट पर - बस 3km दूर",
      "ci_hygiene": "प्रमाणित स्वच्छता",
      "ci_rating": "स्थानीय लोगों द्वारा 4.8/5",
      "ci_menu": "लाइव मेनू",
      "ci_fresh": "ताज़ा बैच 12 मिनट पहले बना",
      "ci_last": "अंतिम बार 45 मिनट पहले बना",
      "ci_add": "जोड़ें",
      "ci_select": "दुकान और स्वच्छता रेटिंग देखने के लिए मैप पर चुनें।",

      "pd_portal": "पार्टनर पोर्टल",
      "pd_active": "सक्रिय राइडर्स:",
      "pd_queues": "माइक्रो-बैच कतारें",
      "pd_queue_desc": "प्रति ट्रिप $1 के बजाय 5 ऑर्डर एक साथ उठाएं।",
      "pd_batch": "बैच",
      "pd_ready": "तैयार",
      "pd_forming": "बन रहा है",
      "pd_orders": "ऑर्डर",
      "pd_earn": "कमाएं ₹",
      "pd_est": "अनुमानित ₹",
      "pd_accept": "बैच स्वीकार करें",
      "pd_heatmap": "भीड़ की भविष्यवाणी हीटमैप",
      "pd_go": "हॉटस्पॉट पर जाएं",
      "pd_map_desc": "मैप दिखाता है कि अभी कहाँ भीड़ हो रही है।",
      "pd_high": "अधिक मांग",
      "pd_form": "बन रहा है"
    }
  },
  kn: {
    translation: {
      "nav_vendor": "ಮಾರಾಟಗಾರ",
      "nav_customer": "ಗ್ರಾಹಕ ಆ್ಯಪ್",
      "nav_partner": "ವಿತರಣೆ ಪಾಲುದಾರ",

      "welcome_title": "ApnaBite ಗೆ ಸ್ವಾಗತ",
      "vendor_btn": "ಆಹಾರ ಮಾರಾಟಗಾರ",
      "partner_btn": "ವಿತರಣೆ ಪಾಲುದಾರ",
      "customer_btn": "ಗ್ರಾಹಕ",

      "stall_status": "ಅಂಗಡಿ ಸ್ಥಿತಿ",
      "open": "ತೆರೆದಿದೆ",
      "closed": "ಮುಚ್ಚಲಾಗಿದೆ",
      "discount_sale": "ರಿಯಾಯಿತಿಯಲ್ಲಿ ಮಾರಿ",
      "orders_ready": "ಆದೇಶಗಳು ಸಿದ್ಧವಾಗಿವೆ",
      "rider_called": "ಡ್ರೈವರ್ ಬರುತ್ತಿದ್ದಾರೆ!",
      "earnings": "ಇಂದಿನ ಸಂಪಾದನೆ",
      "cash_out": "ಹಣ ಪಡೆಯಿರಿ (UPI)",
      "voice_btn": "ಮಾತನಾಡುವ ಮೂಲಕ ಅಪ್ಡೇಟ್ ಮಾಡಿ",

      "pt_title": "ರೈಡ್ ಮಾಡಿ ಮತ್ತು ಗಳಿಸಿ",
      "pt_desc": "ಫ್ಲೀಟ್‌ಗೆ ಸೇರಿ.",
      "rg_name": "ಪೂರ್ಣ ಹೆಸರು",
      "rg_phone": "ಫೋನ್ ಸಂಖ್ಯೆ",
      "rg_password": "ಪಾಸ್‌ವರ್ಡ್ (Password)",
      "rg_license": "ಲೈಸೆನ್ಸ್ (ಪ್ರಮಾಣ)",
      "rg_bank": "ಬ್ಯಾಂಕ್ ವಿವರ (UPI)",
      "rg_start": "ಗಳಿಸಲು ಆರಂಭಿಸಿ",

      "vn_title": "Apna Bite ಜೊತೆ ಸೇರಿ",
      "vn_desc": "ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಅಂಗಡಿ ತೆರೆಯಿರಿ.",
      "rg_shop_name": "ಅಂಗಡಿ ಹೆಸರು",
      "rg_shop_address": "ಅಂಗಡಿ ವಿಳಾಸ",
      "rg_pan": "ಸರ್ಕಾರಿ ID (PAN)",
      "rg_submit": "ನೋಂದಣಿ ಪೂರ್ಣಗೊಳಿಸಿ",

      "cs_title": "ಆಹಾರ ವಿತರಣೆ",
      "cs_desc": "ತಾಜಾ ಆಹಾರವನ್ನು ಆರ್ಡರ್ ಮಾಡಿ.",
      "rg_address": "ವಿತರಣಾ ವಿಳಾಸ",
      "rg_enter": "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಪ್ರವೇಶಿಸಿ",

      "ci_find": "ಹತ್ತಿರದ ಅಂಗಡಿಗಳನ್ನು ಹುಡುಕಿ",
      "ci_zero_waste": "ಹತ್ತಿರದಲ್ಲಿ: ಭಾರಿ ರಿಯಾಯಿತಿ!",
      "ci_samosa": "50% ರಿಯಾಯಿತಿಯಲ್ಲಿ ಸಮೋಸಾ",
      "ci_hygiene": "ಶುಚಿತ್ವ ದೃಢೀಕರಿಸಲಾಗಿದೆ",
      "ci_rating": "ಗ್ರಾಹಕರಿಂದ 4.8/5",
      "ci_menu": "ಲೈವ್ ಮೆನು",
      "ci_fresh": "12 ನಿಮಿಷಗಳ ಹಿಂದೆ ತಯಾರಿಸಿದೆ",
      "ci_last": "45 ನಿಮಿಷಗಳ ಹಿಂದೆ ತಯಾರಿಸಿದೆ",
      "ci_add": "ಸೇರಿಸಿ",
      "ci_select": "ಮೆನು ಮತ್ತು ರೇಟಿಂಗ್ ನೋಡಲು ಮ್ಯಾಪ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.",

      "pd_portal": "ಪಾಲುದಾರ ಪೋರ್ಟಲ್",
      "pd_active": "ವಲಯದಲ್ಲಿ ಸಕ್ರಿಯ ಡ್ರೈವರ್‌ಗಳು:",
      "pd_queues": "ಮೈಕ್ರೋ-ಬ್ಯಾಚ್ ಕ್ಯೂಗಳು",
      "pd_queue_desc": "ಒಟ್ಟುಗೂಡಿಸಿದ 5 ಆರ್ಡರ್‌ಗಳನ್ನು ತೆಗೆದುಕೊಂಡು ಹೆಚ್ಚು ಗಳಿಸಿ.",
      "pd_batch": "ಬ್ಯಾಚ್",
      "pd_ready": "ಸಿದ್ಧವಾಗಿದೆ",
      "pd_forming": "ತಯಾರಾಗುತ್ತಿದೆ",
      "pd_orders": "ಆರ್ಡರ್‌ಗಳು",
      "pd_earn": "ಗಳಿಸಿ ₹",
      "pd_est": "ಅಂದಾಜು ₹",
      "pd_accept": "ಬ್ಯಾಚ್ ಸ್ವೀಕರಿಸಿ",
      "pd_heatmap": "ಕ್ರೌಡ್ ಹೀಟ್‌ಮ್ಯಾಪ್",
      "pd_go": "ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗೆ ಹೋಗಿ",
      "pd_map_desc": "ಜನ ಸೇರುತ್ತಿರುವ ಪ್ರದೇಶಗಳನ್ನು ಮ್ಯಾಪ್ ತೋರಿಸುತ್ತದೆ.",
      "pd_high": "ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ",
      "pd_form": "ರಚನೆಯಾಗುತ್ತಿದೆ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
