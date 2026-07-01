/* ==========================================
   Pending Bookings
========================================== */

const container = document.getElementById("pendingContainer");

// تحميل الصفحة
loadPendingBookings();

function loadPendingBookings() {

    const bookings = BookingStorage.getPending();

    container.innerHTML = "";

    if (bookings.length === 0) {

        container.innerHTML = `
            <div class="empty-card">
                <i class="fa-solid fa-calendar-xmark"></i>
                <h3>لا توجد حجوزات معلقة</h3>
            </div>
        `;

        return;
    }

    bookings.forEach(booking => {

        container.innerHTML += createCard(booking);

    });

}

// إنشاء البطاقة
function createCard(booking) {

    return `

<div class="booking-item">

    <div class="booking-header"
         onclick="toggleBooking('${booking.id}')">

        <div>

            <h3>⚽ ${booking.team}</h3>

            <small>

            📅 ${booking.day}
            |
            ${booking.date}

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

            <button
                class="confirm-btn"
                onclick="confirmBooking('${booking.id}')">

                تأكيد

            </button>

        </div>

    </div>

</div>

`;

}

// فتح وغلق البطاقة
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

// حذف
function deleteBooking(id){

    if(!confirm("هل تريد حذف الحجز؟")) return;

    BookingStorage.deleteBooking(id);

    loadPendingBookings();

}

// تأكيد
function confirmBooking(id){

    BookingStorage.confirmBooking(id);

    loadPendingBookings();

    alert("تم تأكيد الحجز");

}

// تعديل
function editBooking(id){

    alert("سيتم بناء صفحة التعديل في المرحلة القادمة.");

}