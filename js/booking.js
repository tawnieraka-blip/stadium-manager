/* ==========================================
   Booking Page
   Stadium Manager v1.0
========================================== */

const teamInput = document.getElementById("team");
const dateInput = document.getElementById("date");
const startInput = document.getElementById("startTime");

const hoursInput = document.getElementById("hours");

const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

const bookingId = document.getElementById("bookingId");

const dayName = document.getElementById("dayName");
const endTime = document.getElementById("endTime");
const totalPrice = document.getElementById("totalPrice");
const hourPrice = document.getElementById("hourPrice");

const saveBtn = document.getElementById("saveBooking");

//==============================
// الإعدادات
//==============================

const settings = BookingStorage.getSettings();

let pricePerHour = settings.pricePerHour || 100;

hourPrice.textContent = `${pricePerHour} ريال`;
}

hourPrice.innerHTML = `${pricePerHour} ريال`;

//==============================
// رقم الحجز
//==============================

bookingId.innerHTML = BookingStorage.generateBookingId();

//==============================
// زيادة الساعات
//==============================

plusBtn.onclick = () => {

    let h = Number(hoursInput.value);

    if (h < 12) {

        hoursInput.value = h + 1;

        updateSummary();

    }

};

//==============================
// تقليل الساعات
//==============================

minusBtn.onclick = () => {

    let h = Number(hoursInput.value);

    if (h > 1) {

        hoursInput.value = h - 1;

        updateSummary();

    }

};

//==============================
// تحديث الملخص
//==============================

dateInput.onchange = updateSummary;
startInput.onchange = updateSummary;

function updateSummary() {

    updateDay();

    updateEndTime();

    updateTotal();

}

//==============================
// اليوم
//==============================

function updateDay() {

    if (!dateInput.value) {

        dayName.innerHTML = "--";

        return;

    }

    const days = [

        "الأحد",

        "الاثنين",

        "الثلاثاء",

        "الأربعاء",

        "الخميس",

        "الجمعة",

        "السبت"

    ];

    const d = new Date(dateInput.value);

    dayName.innerHTML = days[d.getDay()];

}

//==============================
// وقت النهاية
//==============================

function updateEndTime() {

    if (!startInput.value) {

        endTime.innerHTML = "--";

        return;

    }

    let parts = startInput.value.split(":");

    let h = parseInt(parts[0]);

    let m = parseInt(parts[1]);

    h += Number(hoursInput.value);

    while (h >= 24) h -= 24;

    endTime24 =
String(h).padStart(2, "0") +
":" +
String(m).padStart(2, "0");

endTime.textContent = formatTime12(endTime24);

}

//==============================
// السعر
//==============================

function updateTotal() {

    const total =

        Number(hoursInput.value) *

        pricePerHour;

    totalPrice.innerHTML = `${total} ريال`;

}

//==============================
// حفظ الحجز
//==============================

saveBtn.onclick = () => {

    if (teamInput.value.trim() === "") {

        alert("اكتب اسم الفريق");

        return;

    }

    if (!dateInput.value) {

        alert("اختر التاريخ");

        return;

    }

    if (!startInput.value) {

        alert("اختر وقت البداية");

        return;

    }

    if (

        BookingStorage.isDuplicate(

            teamInput.value,

            dateInput.value,

            startInput.value

        )

    ) {

        alert("هذا الحجز موجود مسبقاً");

        return;

    }

    if (

        BookingStorage.hasOverlap(

            dateInput.value,

            startInput.value,

            endTime: endTime24,

        )

    ) {

        alert("يوجد حجز آخر بنفس الوقت");

        return;

    }

    const booking = {

        id: BookingStorage.generateBookingId(),

        team: teamInput.value.trim(),

        date: dateInput.value,

        day: dayName.innerHTML,

        startTime: startInput.value,

        endTime: endTime.innerHTML,

        hours: Number(hoursInput.value),

        pricePerHour: pricePerHour,

        total: Number(hoursInput.value) * pricePerHour,

        status: "pending",

        createdAt: new Date().toLocaleString("ar-EG")

    };

    BookingStorage.saveBooking(booking);

    alert("تم حفظ الحجز بنجاح");

    clearForm();

};

//==============================
// تفريغ النموذج
//==============================

function clearForm() {

    teamInput.value = "";

    dateInput.value = "";

    startInput.value = "";

    hoursInput.value = 1;

    dayName.innerHTML = "--";

    endTime.innerHTML = "--";

    updateSummary();

    bookingId.innerHTML = BookingStorage.generateBookingId();

    teamInput.focus();

}

updateSummary();
