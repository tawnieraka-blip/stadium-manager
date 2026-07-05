/* ==========================================
   Booking Page
   Stadium Manager v3.0
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
// متغيرات
//==============================

let settings = {};
let pricePerHour = 100;
let endTime24 = "";

//==============================
// تحميل الإعدادات
//==============================

function loadSettings(){

    settings = BookingStorage.getSettings();

    pricePerHour = Number(settings.pricePerHour) || 100;

    hourPrice.textContent = pricePerHour + " ريال";

}

//==============================
// بداية الصفحة
//==============================

init();

async function init(){

    loadSettings();

    hoursInput.value = 1;

    if(editId){

        await loadBookingForEdit();

    }else{

        bookingId.textContent = "جديد";

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

        dayName.textContent = "--";

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

    const date = new Date(dateInput.value);

    dayName.textContent = days[date.getDay()];

}

//==============================
// حساب وقت النهاية
//==============================

function updateEndTime(){

    if(!startInput.value){

        endTime24 = "";

        endTime.textContent = "--";

        return;

    }

    let [hour, minute] = startInput.value.split(":");

    hour = Number(hour);

    minute = Number(minute);

    hour += Number(hoursInput.value);

    while(hour >= 24){

        hour -= 24;

    }

    endTime24 =
        String(hour).padStart(2,"0") +
        ":" +
        String(minute).padStart(2,"0");

    if(typeof formatTime12 === "function"){

        endTime.textContent = formatTime12(endTime24);

    }else{

        endTime.textContent = endTime24;

    }

}
//==============================
// حساب السعر
//==============================

function updateTotal(){

    const total =

        Number(hoursInput.value)

        *

        pricePerHour;

    totalPrice.textContent = total + " ريال";

}

//==============================
// حفظ الحجز
//==============================

async function saveBooking() {

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

    // قراءة الحجوزات من Google Sheets
    const bookings = await BookingAPI.getBookings();

    if (!Array.isArray(bookings)) {

        alert("تعذر قراءة الحجوزات");

        return;

    }

    // منع التكرار
    const duplicate = bookings.find(item =>

        item.id !== editId &&
        item.team === team &&
        item.date === dateInput.value &&
        item.startTime === startInput.value

    );

    if (duplicate) {

        alert("هذا الحجز موجود مسبقاً");

        return;

    }

    // منع التعارض
    const overlap = bookings.find(item => {

        if (item.id === editId) return false;

        if (item.date !== dateInput.value) return false;

        return (

            startInput.value < item.endTime &&
            endTime24 > item.startTime

        );

    });

    if (overlap) {

        alert("يوجد حجز آخر في نفس الوقت");

        return;

    }

    const booking = {

        id: editId || crypto.randomUUID(),

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

    //==============================
    // تعديل حجز
    //==============================

    if (editId) {

        const result = await BookingAPI.updateBooking(booking);

        if (result && result.success) {

            alert("تم تعديل الحجز بنجاح");

            window.location.href = "pending.html";

        } else {

            alert(result?.message || "فشل تعديل الحجز");

        }

        return;

    }

    //==============================
    // إضافة حجز جديد
    //==============================

    const result = await BookingAPI.saveBooking(booking);

    if (result && result.success) {

        alert("تم حفظ الحجز بنجاح");

        clearForm();

    } else {

        alert(result?.message || "فشل حفظ الحجز");

    }

}

//==============================
// تفريغ النموذج
//==============================

function clearForm() {

    teamInput.value = "";

    dateInput.value = "";

    startInput.value = "";

    hoursInput.value = 1;

    dayName.textContent = "--";

    endTime.textContent = "--";

    endTime24 = "";

    bookingId.textContent = "جديد";

    updateSummary();

    teamInput.focus();

}

//==============================
// تحميل الحجز للتعديل
//==============================

async function loadBookingForEdit() {

    const bookings = await BookingAPI.getBookings();

    if (!Array.isArray(bookings)) {

        alert("تعذر قراءة الحجوزات");

        window.location.href = "pending.html";

        return;

    }

    const booking = bookings.find(item => item.id === editId);

    if (!booking) {

        alert("الحجز غير موجود");

        window.location.href = "pending.html";

        return;

    }

    bookingId.textContent = booking.id;

    teamInput.value = booking.team;

    dateInput.value = booking.date;

    startInput.value = booking.startTime;

    hoursInput.value = Number(booking.hours);

    updateSummary();

}
