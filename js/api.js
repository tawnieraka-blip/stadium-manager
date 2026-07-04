/* ==========================================
   Stadium Manager API
   Version 2.2
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

            const formData = new URLSearchParams();

            formData.append("action", action);

            for (const key in data) {

                if (typeof data[key] === "object") {

                    formData.append(key, JSON.stringify(data[key]));

                } else {

                    formData.append(key, data[key]);

                }

            }

            const response = await fetch(API_URL, {

                method: "POST",

                body: formData

            });

            if (!response.ok) {

                throw new Error("HTTP Error : " + response.status);

            }

            const result = await response.json();

            console.log("API Response:", result);

            return result;

        } catch (error) {

            console.error("BookingAPI Error:", error);

            alert(error.message || "تعذر الاتصال بـ Google Sheets");

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
