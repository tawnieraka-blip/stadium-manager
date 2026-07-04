/* ==========================================
   Stadium Manager API
   Version 2.0
========================================== */

class BookingAPI {

    //==============================
    // قراءة رابط Google Apps Script
    //==============================

    static getApiUrl() {

        const settings = BookingStorage.getSettings();

        return settings.apiUrl || "";

    }

    //==============================
    // إرسال طلب
    //==============================

    static async request(action, data = {}) {

        const API_URL = this.getApiUrl();

        if (!API_URL) {

            alert("يرجى إضافة رابط Google Apps Script من صفحة الإعدادات");

            return null;

        }

        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    action,

                    ...data

                })

            });

            console.log("HTTP Status:", response.status);

            const text = await response.text();

            console.log("Response:", text);

            return JSON.parse(text);

        } catch (error) {

            console.error("BookingAPI Error:", error);

            alert(error.message);

            return null;

        }

    }
       //==============================
    // إضافة حجز
    //==============================

    static async saveBooking(booking) {

        return await this.request("saveBooking", {
            booking
        });

    }

    //==============================
    // قراءة جميع الحجوزات
    //==============================

    static async getBookings() {

        return await this.request("getBookings");

    }

    //==============================
    // تعديل حجز
    //==============================

    static async updateBooking(booking) {

        return await this.request("updateBooking", {
            booking
        });

    }

    //==============================
    // حذف حجز
    //==============================

    static async deleteBooking(id) {

        return await this.request("deleteBooking", {
            id
        });

    }
       //==============================
    // تأكيد الحجز
    //==============================

    static async confirmBooking(id) {

        return await this.request("confirmBooking", {
            id
        });

    }

    //==============================
    // الإحصائيات
    //==============================

    static async getStatistics() {

        return await this.request("getStatistics");

    }

}
