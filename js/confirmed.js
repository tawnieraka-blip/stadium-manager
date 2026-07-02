/* ==========================================
   Confirmed Bookings
========================================== */

const container = document.getElementById("confirmedContainer");

loadConfirmedBookings();

function loadConfirmedBookings() {

    const bookings = BookingStorage.getConfirmed();

    const counter = document.getElementById("confirmedCounter");

    counter.textContent = bookings.length;

    container.innerHTML = "";

    if (bookings.length === 0) {

        container.innerHTML = `
        <div class="empty-card">
            <i class="fa-solid fa-circle-check"></i>
            <h3>لا توجد حجوزات مؤكدة</h3>
        </div>
        `;

        return;
    }

    bookings.forEach(booking => {

        container.innerHTML += createCard(booking);

    });

}

function createCard(booking) {

    return `

<div class="booking-item confirmed">

<div class="booking-header"
onclick="toggleBooking('${booking.id}')">

<div>

<h3>⚽ ${booking.team}</h3>

<small>

📅 ${booking.day} | ${booking.date}

</small>

</div>

<div>

${booking.hours} ساعة

<i id="icon-${booking.id}"
class="fa-solid fa-chevron-down"></i>

</div>

</div>

<div
id="${booking.id}"
class="booking-details">

<p><strong>رقم الحجز:</strong> ${booking.id}</p>

<p><strong>وقت البداية:</strong> ${booking.startTime}</p>

<p><strong>وقت النهاية:</strong> ${booking.endTime}</p>

<p><strong>عدد الساعات:</strong> ${booking.hours}</p>

<p><strong>الإجمالي:</strong> ${booking.total} ريال</p>

<div class="booking-buttons">

<button
class="edit-btn"
onclick="editBooking('${booking.id}')">

تعديل

</button>

<button
class="delete-btn"
onclick="deleteBooking('${booking.id}')">

حذف

</button>

</div>

</div>

</div>

`;

}

function toggleBooking(id){

const card=document.getElementById(id);

const icon=document.getElementById("icon-"+id);

if(card.style.display==="block"){

card.style.display="none";

icon.className="fa-solid fa-chevron-down";

}else{

card.style.display="block";

icon.className="fa-solid fa-chevron-up";

}

}

function deleteBooking(id){

if(!confirm("هل تريد حذف الحجز؟")) return;

BookingStorage.deleteBooking(id);

loadConfirmedBookings();

}

function editBooking(id){

window.location.href="booking.html?id="+id;

}
