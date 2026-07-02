/* ==========================================
   Settings Page
========================================== */

const stadiumName = document.getElementById("stadiumName");
const associationName = document.getElementById("associationName");
const pricePerHour = document.getElementById("pricePerHour");
const apiUrl = document.getElementById("apiUrl");
const apiStatus = document.getElementById("apiStatus");
const saveBtn = document.getElementById("saveSettings");
const resetBtn = document.getElementById("resetSettings");

//==============================
// تحميل الإعدادات
//==============================

loadSettings();

function loadSettings() {

    const settings = BookingStorage.getSettings();

    stadiumName.value = settings.stadiumName || "";

    associationName.value = settings.associationName || "";

    pricePerHour.value = settings.pricePerHour || 100;

    apiUrl.value = settings.apiUrl || "";

    updateApiStatus();

}

//==============================
// حفظ الإعدادات
//==============================

saveBtn.addEventListener("click", () => {

    const settings = BookingStorage.getSettings();

    settings.stadiumName = stadiumName.value.trim();

    settings.associationName = associationName.value.trim();

    settings.pricePerHour = Number(pricePerHour.value) || 100;

    settings.apiUrl = apiUrl.value.trim();

    settings.version = "1.0";

    BookingStorage.saveSettings(settings);

    updateApiStatus();

    alert("تم حفظ الإعدادات بنجاح");

});

//==============================
// إعادة الضبط
//==============================

resetBtn.addEventListener("click", () => {

    if (!confirm("هل تريد إعادة الإعدادات الافتراضية؟")) {

        return;

    }

    BookingStorage.resetSettings();

    loadSettings();

    alert("تمت إعادة ضبط الإعدادات");

});

//==============================
// حالة Google Sheets
//==============================

function updateApiStatus() {

    if (apiUrl.value.trim() === "") {

        apiStatus.textContent = "🔴 غير مربوط";

        apiStatus.style.color = "#ef4444";

    } else {

        apiStatus.textContent = "🟢 جاهز للربط";

        apiStatus.style.color = "#16a34a";

    }

}
