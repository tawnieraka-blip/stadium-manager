/* ==========================================
   Stadium Manager API
   Version 1.0
========================================== */

class BookingAPI {

    static API_URL = CONFIG.API_URL;

    //==============================
    // إرسال طلب
    //==============================

    static async request(action, data = {}) {

        try {

            const response = await fetch(this.API_URL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    action,

                    ...data

                })

            });

            return await response.json();

        } catch (error) {

            console.error(error);

            alert("تعذر الاتصال بـ Google Sheets");

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
