/* ==========================================
   Booking Page
   Stadium Manager v2.0
========================================== */

//==============================
// عناصر الصفحة
//==============================
const params = new URLSearchParams(window.location.search);
const editId = params.get("id");
const teamInput = document.getElementById("team");
const dateInput = document.getElementById("date");
const startInput = document.getElementById("startTime");

const hoursInput = document.getElementById("hours");

const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");

const bookingId = document.getElementById("bookingId");

const dayName = document.getElementById("dayName");
const endTime = document.getElementById("endTime");
const hourPrice = document.getElementById("hourPrice");
const totalPrice = document.getElementById("totalPrice");

const saveBtn = document.getElementById("saveBooking");


//==============================
// الإعدادات
//==============================

let settings;
let pricePerHour;
let endTime24 = "";

//==============================
// تحميل الإعدادات
//==============================

function loadSettings() {

    settings = BookingStorage.getSettings();

    pricePerHour = Number(settings.pricePerHour) || 100;

    hourPrice.textContent = `${pricePerHour} ريال`;

}

//==============================
// بداية الصفحة
//==============================

init();

function init() {

    // تحميل الإعدادات
    loadSettings();

    // القيمة الافتراضية لعدد الساعات
    hoursInput.value = 1;

    // إذا كان تعديل حجز
    if (editId) {

        loadBookingForEdit();

    } else {

        // إنشاء رقم حجز جديد
        bookingId.textContent = BookingStorage.generateBookingId();

        // تحديث الملخص
        updateSummary();

    }

}


//==============================
// الأحداث
//==============================

plusBtn.addEventListener("click", increaseHours);

minusBtn.addEventListener("click", decreaseHours);

dateInput.addEventListener("change", updateSummary);

startInput.addEventListener("change", updateSummary);

saveBtn.addEventListener("click", saveBooking);


//==============================
// زيادة الساعات
//==============================

function increaseHours(){

    let value = Number(hoursInput.value);

    if(value >= 12) return;

    hoursInput.value = value + 1;

    updateSummary();

}


//==============================
// تقليل الساعات
//==============================

function decreaseHours(){

    let value = Number(hoursInput.value);

    if(value <= 1) return;

    hoursInput.value = value - 1;

    updateSummary();

}
//==============================
// تحديث الملخص
//==============================

function updateSummary(){

    updateDay();

    updateEndTime();

    updateTotal();

}


//==============================
// تحديث اليوم
//==============================

function updateDay(){

    if(!dateInput.value){

        dayName.textContent="--";

        return;

    }

    const days=[

        "الأحد",

        "الاثنين",

        "الثلاثاء",

        "الأربعاء",

        "الخميس",

        "الجمعة",

        "السبت"

    ];

    const date=new Date(dateInput.value);

    dayName.textContent=days[date.getDay()];

}


//==============================
// حساب وقت النهاية
//==============================

function updateEndTime(){

    if(!startInput.value){

        endTime24="";

        endTime.textContent="--";

        return;

    }

    let [hour,minute]=startInput.value.split(":");

    hour=Number(hour);

    minute=Number(minute);

    hour+=Number(hoursInput.value);

    while(hour>=24){

        hour-=24;

    }

    endTime24=

        String(hour).padStart(2,"0")

        +":"

        +String(minute).padStart(2,"0");


    if(typeof formatTime12==="function"){

        endTime.textContent=formatTime12(endTime24);

    }else{

        endTime.textContent=endTime24;

    }

}


//==============================
// حساب السعر
//==============================

function updateTotal(){

    const total=

        Number(hoursInput.value)

        *

        pricePerHour;

    totalPrice.textContent=

        total+" ريال";

}
//==============================
// حفظ الحجز
//==============================

function saveBooking() {

    const team = teamInput.value.trim();

    if (team === "") {

        alert("اكتب اسم الفريق");

        teamInput.focus();

        return;

    }

    if (!dateInput.value) {

        alert("اختر تاريخ الحجز");

        return;

    }

    if (!startInput.value) {

        alert("اختر وقت البداية");

        return;

    }

    if (
        BookingStorage.isDuplicate(
            team,
            dateInput.value,
            startInput.value
        )
    ) {

        alert("هذا الحجز موجود مسبقًا");

        return;

    }

    if (
        BookingStorage.hasOverlap(
            dateInput.value,
            startInput.value,
            endTime24
        )
    ) {

        alert("يوجد حجز آخر في نفس الوقت");

        return;

    }

    const booking = {

        id: BookingStorage.generateBookingId(),

        team: team,

        date: dateInput.value,

        day: dayName.textContent,

        startTime: startInput.value,

        endTime: endTime24,

        hours: Number(hoursInput.value),

        pricePerHour: pricePerHour,

        total: Number(hoursInput.value) * pricePerHour,

        status: "pending",

        createdAt: new Date().toISOString()

    };

    BookingStorage.saveBooking(booking);

    alert("تم حفظ الحجز بنجاح");

    clearForm();

}


//==============================
// تفريغ النموذج
//==============================

function clearForm() {

    // إعادة تحميل الإعدادات
    loadSettings();

    // تفريغ الحقول
    teamInput.value = "";

    dateInput.value = "";

    startInput.value = "";

    hoursInput.value = 1;

    dayName.textContent = "--";

    endTime.textContent = "--";

    endTime24 = "";

    // إعادة حساب السعر
    updateTotal();

    // إنشاء رقم حجز جديد
    bookingId.textContent = BookingStorage.generateBookingId();

    // وضع المؤشر في اسم الفريق
    teamInput.focus();

}
//==============================
// تحميل الحجز للتعديل
//==============================

function loadBookingForEdit() {

    const booking = BookingStorage.getBooking(editId);

    if (!booking) {

        alert("الحجز غير موجود");

        window.location.href = "pending.html";

        return;

    }

    bookingId.textContent = booking.id;

    teamInput.value = booking.team;

    dateInput.value = booking.date;

    startInput.value = booking.startTime;

    hoursInput.value = booking.hours;

    updateSummary();

}
