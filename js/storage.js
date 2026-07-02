/* ===========================================
   Stadium Manager Storage
   إصدار 1.0
=========================================== */

class BookingStorage {

    static STORAGE_KEY = "stadiumBookings";

    //==============================
    // قراءة جميع الحجوزات
    //==============================
    static getBookings() {

        const data = localStorage.getItem(this.STORAGE_KEY);

        return data ? JSON.parse(data) : [];

    }

    //==============================
    // حفظ جميع الحجوزات
    //==============================
    static saveBookings(bookings) {

        localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(bookings)
        );

    }

    //==============================
    // إنشاء رقم حجز جديد
    //==============================
    static generateBookingId() {

        const bookings = this.getBookings();

        const year = new Date().getFullYear();

        const next = bookings.length + 1;

        return `BK-${year}-${String(next).padStart(6, "0")}`;

    }

    //==============================
    // إضافة حجز
    //==============================
    static saveBooking(booking) {

        const bookings = this.getBookings();

        bookings.push(booking);

        this.saveBookings(bookings);

    }

    //==============================
    // حذف حجز
    //==============================
    static deleteBooking(id) {

        const bookings = this
            .getBookings()
            .filter(item => item.id !== id);

        this.saveBookings(bookings);

    }

    //==============================
    // تعديل حجز
    //==============================
    static updateBooking(id, newData) {

        const bookings = this.getBookings();

        const index = bookings.findIndex(
            item => item.id === id
        );

        if (index !== -1) {

            bookings[index] = {

                ...bookings[index],

                ...newData

            };

            this.saveBookings(bookings);

        }

    }

    //==============================
    // تأكيد الحجز
    //==============================
    static confirmBooking(id) {

        this.updateBooking(id, {

            status: "confirmed"

        });

    }

    //==============================
    // الحجوزات المعلقة
    //==============================
    static getPending() {

        return this
            .getBookings()
            .filter(item => item.status === "pending");

    }

    //==============================
    // الحجوزات المؤكدة
    //==============================
    static getConfirmed() {

        return this
            .getBookings()
            .filter(item => item.status === "confirmed");

    }

    //==============================
    // البحث برقم الحجز
    //==============================
    static getBooking(id) {

        return this
            .getBookings()
            .find(item => item.id === id);

    }

    //==============================
    // منع التكرار
    //==============================
    static isDuplicate(team, date, startTime, ignoreId = null) {

    return this
        .getBookings()
        .some(item => {

            if (ignoreId && item.id === ignoreId) {

                return false;

            }

            return (

                item.team === team &&
                item.date === date &&
                item.startTime === startTime

            );

        });

}

    //==============================
    // منع التعارض
    //==============================
    static hasOverlap(date, start, end, ignoreId = null) {

    const bookings = this.getBookings();

    return bookings.some(item => {

        if (ignoreId && item.id === ignoreId) {

            return false;

        }

        if (item.date !== date)
            return false;

        return (

            start < item.endTime &&
            end > item.startTime

        );

    });

}
    //==============================
    // الإحصائيات
    //==============================
    static getStatistics() {

        const confirmed = this.getConfirmed();

        let totalHours = 0;

        let totalIncome = 0;

        const teams = new Set();

        confirmed.forEach(item => {

            totalHours += Number(item.hours);

            totalIncome += Number(item.total);

            teams.add(item.team);

        });

        return {

            bookings: confirmed.length,

            teams: teams.size,

            hours: totalHours,

            income: totalIncome

        };

    }

//==============================
// الإعدادات
//==============================

static SETTINGS_KEY = "stadiumSettings";

static getSettings() {

    const defaultSettings = {

        stadiumName: "ملعب جمعية الراكة",

        associationName: "جمعية الدعوة والإرشاد وتوعية الجاليات بالراكة",

        pricePerHour: 100,

        theme: "light",

        apiUrl: "",

        version: "1.0"

    };

    const data = localStorage.getItem(this.SETTINGS_KEY);

    return data ? JSON.parse(data) : defaultSettings;

}

static saveSettings(settings) {

    localStorage.setItem(

        this.SETTINGS_KEY,

        JSON.stringify(settings)

    );

}

static resetSettings() {

    localStorage.removeItem(this.SETTINGS_KEY);

  }


   
}
