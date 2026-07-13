/* ==========================================
   Stadium Manager API v4.0
========================================== */

class BookingAPI {

    //==============================
    // رابط Apps Script
    //==============================

    static getApiUrl() {

        const settings = BookingStorage.getSettings();

        return settings.apiUrl || "";

    }

}
    //==============================
    // تنفيذ GET
    //==============================

    static async get(action) {

        const API_URL = this.getApiUrl();

        if (!API_URL) {

            throw new Error("لم يتم إدخال رابط Apps Script");

        }

        const response = await fetch(

            API_URL + "?action=" + action

        );

        return await response.json();

    }
    //==============================
    // تنفيذ POST
    //==============================

    static async post(action, data = {}) {

        const API_URL = this.getApiUrl();

        if (!API_URL) {

            throw new Error("لم يتم إدخال رابط Apps Script");

        }

        const formData = new URLSearchParams();

        formData.append("action", action);

        Object.keys(data).forEach(key => {

            if (typeof data[key] === "object") {

                formData.append(

                    key,

                    JSON.stringify(data[key])

                );

            } else {

                formData.append(

                    key,

                    data[key]

                );

            }

        });

        const response = await fetch(API_URL, {

            method: "POST",

            body: formData

        });

        return await response.json();

    }
    //==============================
    // قراءة جميع الحجوزات
    //==============================

    static async getBookings() {

        return await this.get("getBookings");

    }

    //==============================
    // إضافة حجز
    //==============================

    static async saveBooking(booking) {

        return await this.post("saveBooking", {

            booking

        });

    }

    //==============================
    // تعديل حجز
    //==============================

    static async updateBooking(booking) {

        return await this.post("updateBooking", {

            booking

        });

    }

    //==============================
    // حذف حجز
    //==============================

    static async deleteBooking(id) {

        return await this.post("deleteBooking", {

            id

        });

    }

    //==============================
    // تأكيد الحجز
    //==============================

    static async confirmBooking(id) {

        return await this.post("confirmBooking", {

            id

        });

    }

    //==============================
    // الإحصائيات
    //==============================

    static async getStatistics() {

        return await this.get("getStatistics");

    }

}
