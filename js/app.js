/* ==========================================
   Stadium Manager
   app.js v4.0
========================================== */

console.log("app.js Loaded");

//==============================
// البداية
//==============================

init();

function init(){

    updateClock();

    loadCounters();

    setInterval(updateClock,1000);

}

//==============================
// الساعة والتاريخ
//==============================

function updateClock(){

    const now = new Date();

    const days = [

        "الأحد",

        "الاثنين",

        "الثلاثاء",

        "الأربعاء",

        "الخميس",

        "الجمعة",

        "السبت"

    ];

    const months = [

        "يناير",

        "فبراير",

        "مارس",

        "أبريل",

        "مايو",

        "يونيو",

        "يوليو",

        "أغسطس",

        "سبتمبر",

        "أكتوبر",

        "نوفمبر",

        "ديسمبر"

    ];

    const clock = document.getElementById("clock");
    const day = document.getElementById("day");
    const date = document.getElementById("date");

    if(clock){

        clock.textContent =

        now.toLocaleTimeString("ar-EG");

    }

    if(day){

        day.textContent =

        days[now.getDay()];

    }

    if(date){

        date.textContent =

        now.getDate()

        +

        " "

        +

        months[now.getMonth()]

        +

        " "

        +

        now.getFullYear();

    }

}

//==============================
// العدادات
//==============================

async function loadCounters(){

    try{

        const bookings = await BookingAPI.getBookings();

        if(!Array.isArray(bookings)){

            return;

        }

        const pending =

        bookings.filter(

            b=>b.status==="pending"

        ).length;

        const confirmed =

        bookings.filter(

            b=>b.status==="confirmed"

        ).length;

        const pendingBadge =

        document.getElementById("pendingCount");

        const confirmedBadge =

        document.getElementById("confirmedCount");

        if(pendingBadge){

            pendingBadge.textContent =

            pending;

            pendingBadge.style.display =

            pending ? "flex" : "none";

        }

        if(confirmedBadge){

            confirmedBadge.textContent =

            confirmed;

            confirmedBadge.style.display =

            confirmed ? "flex" : "none";

        }

    }catch(error){

        console.error(error);

    }

}
