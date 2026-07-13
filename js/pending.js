/* ==========================================
   Stadium Manager
   pending.js v4.0
========================================== */

//==============================
// عناصر الصفحة
//==============================

const bookingsContainer = document.getElementById("bookings");

//==============================
// بداية الصفحة
//==============================

init();

async function init(){

    await loadBookings();

}
//==============================
// تحميل الحجوزات
//==============================

async function loadBookings(){

    try{

        const bookings = await BookingAPI.getBookings();

        if(!Array.isArray(bookings)){

            bookingsContainer.innerHTML =

            "<p>لا توجد بيانات</p>";

            return;

        }

        renderBookings(

            bookings.filter(

                b => b.status === "pending"

            )

        );

    }catch(error){

        console.error(error);

    }

}
//==============================
// عرض الحجوزات
//==============================

function renderBookings(bookings){

    if(bookings.length === 0){

        bookingsContainer.innerHTML =

        "<p>لا توجد حجوزات معلقة</p>";

        return;

    }

    bookingsContainer.innerHTML = "";

    bookings.forEach(booking=>{

        bookingsContainer.innerHTML += createCard(booking);

    });

}
//==============================
// إنشاء بطاقة
//==============================

function createCard(booking){

return `

<div class="booking-card">

<h3>${booking.team}</h3>

<p>${booking.date}</p>

<p>

${booking.startTime}

-

${booking.endTime}

</p>

<p>

${booking.hours}

ساعة

</p>

<p>

${booking.total}

ريال

</p>

<div class="actions">

<button onclick="editBooking('${booking.id}')">

تعديل

</button>

<button onclick="confirmBooking('${booking.id}')">

تأكيد

</button>

<button onclick="deleteBooking('${booking.id}')">

حذف

</button>

</div>

</div>

`;

}
//==============================
// تعديل الحجز
//==============================

function editBooking(id){

    window.location.href =

    "booking.html?id=" + id;

}
//==============================
// تأكيد الحجز
//==============================

async function confirmBooking(id){

    if(!confirm("هل تريد تأكيد هذا الحجز؟")){

        return;

    }

    try{

        const result = await BookingAPI.confirmBooking(id);

        alert(result.message);

        await loadBookings();

    }catch(error){

        console.error(error);

        alert("حدث خطأ");

    }

}
//==============================
// حذف الحجز
//==============================

async function deleteBooking(id){

    if(!confirm("هل تريد حذف الحجز؟")){

        return;

    }

    try{

        const result = await BookingAPI.deleteBooking(id);

        alert(result.message);

        await loadBookings();

    }catch(error){

        console.error(error);

        alert("حدث خطأ");

    }

}
