/* ==========================================
   Stadium Manager
   booking.js v4.0
========================================== */

//==============================
// Query
//==============================

const params = new URLSearchParams(window.location.search);

const editId = params.get("id");

//==============================
// عناصر الصفحة
//==============================

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
// البداية
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

    hoursInput.value++;

    updateSummary();

}

//==============================
// تقليل الساعات
//==============================

function decreaseHours(){

    let value = Number(hoursInput.value);

    if(value <= 1) return;

    hoursInput.value--;

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

        String(hour).padStart(2,"0")

        +

        ":"

        +

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

    totalPrice.textContent =

        total +

        " ريال";

}
//==============================
// حفظ الحجز
//==============================

async function saveBooking(){

    const team = teamInput.value.trim();

    if(team === ""){

        alert("اكتب اسم الفريق");

        teamInput.focus();

        return;

    }

    if(!dateInput.value){

        alert("اختر التاريخ");

        return;

    }

    if(!startInput.value){

        alert("اختر وقت البداية");

        return;

    }

    const booking = {

        id: editId || "",

        team: team,

        date: dateInput.value,

        day: dayName.textContent,

        startTime: startInput.value,

        endTime: endTime24,

        hours: Number(hoursInput.value),

        pricePerHour: pricePerHour,

        total: Number(hoursInput.value) * pricePerHour

    };

    try{

        let result;

        if(editId){

            result = await BookingAPI.updateBooking(booking);

        }else{

            result = await BookingAPI.saveBooking(booking);

        }

        if(result.success){

            alert(result.message);

            clearForm();

        }else{

            alert(result.message);

        }

    }catch(error){

        console.error(error);

        alert("حدث خطأ أثناء حفظ الحجز");

    }

}
//==============================
// تفريغ النموذج
//==============================

function clearForm(){

    bookingId.textContent = "جديد";

    teamInput.value = "";

    dateInput.value = "";

    startInput.value = "";

    hoursInput.value = 1;

    dayName.textContent = "--";

    endTime.textContent = "--";

    totalPrice.textContent = "0 ريال";

    endTime24 = "";

    teamInput.focus();

}
//==============================
// تحميل الحجز للتعديل
//==============================

async function loadBookingForEdit(){

    try{

        const bookings = await BookingAPI.getBookings();

        if(!Array.isArray(bookings)){

            alert("تعذر تحميل بيانات الحجز");

            return;

        }

        const booking = bookings.find(item => item.id === editId);

        if(!booking){

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

    }catch(error){

        console.error(error);

        alert("حدث خطأ أثناء تحميل الحجز");

    }

}
