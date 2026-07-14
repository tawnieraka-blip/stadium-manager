/* ==========================================
   Stadium Manager Storage v4.0
========================================== */

class BookingStorage {

    //==============================
    // الإعدادات الافتراضية
    //==============================

    static defaultSettings() {

        return {

            apiUrl: "",

            pricePerHour: 100,

            theme: "light"

        };

    }
       //==============================
    // قراءة الإعدادات
    //==============================

    static getSettings() {

        const settings = localStorage.getItem("stadium_settings");

        if (!settings) {

            return this.defaultSettings();

        }

        return JSON.parse(settings);

    }
       //==============================
    // حفظ الإعدادات
    //==============================

    static saveSettings(settings) {

        localStorage.setItem(

            "stadium_settings",

            JSON.stringify(settings)

        );

    }
       //==============================
    // إعادة ضبط الإعدادات
    //==============================

    static resetSettings() {

        localStorage.removeItem("stadium_settings");

    }

}
