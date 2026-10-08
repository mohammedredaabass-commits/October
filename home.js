/* ========================================
   OCTOBER 73 - HOME JS
   ======================================== */

/* ----------------------------------------
   عناصر الصفحة
---------------------------------------- */

const welcomeMessage = document.getElementById("welcomeMessage");
const currentDate = document.getElementById("currentDate");
const currentTime = document.getElementById("currentTime");
const welcomeAudio = document.getElementById("welcomeAudio");
const loadingScreen = document.getElementById("loadingScreen");


/* ----------------------------------------
   اسم المستخدم
---------------------------------------- */

const username = localStorage.getItem("octoberUsername");

if (username && welcomeMessage) {
    welcomeMessage.textContent = `أهلاً بك يا ${username} 👋`;
}


/* ----------------------------------------
   التاريخ والوقت
---------------------------------------- */

function updateDateTime() {

    const now = new Date();

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    if (currentDate) {
        currentDate.textContent =
            now.toLocaleDateString("ar-EG", dateOptions);
    }

    if (currentTime) {
        currentTime.textContent =
            now.toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit"
            });
    }
}

updateDateTime();

setInterval(updateDateTime, 1000);


/* ----------------------------------------
   تشغيل صوت الترحيب
---------------------------------------- */

function playWelcomeAudio() {

    if (!welcomeAudio) {
        return;
    }

    welcomeAudio.volume = 0.8;

    const playPromise = welcomeAudio.play();

    if (playPromise !== undefined) {

        playPromise.catch(() => {

            /*
             * بعض المتصفحات تمنع التشغيل التلقائي.
             * لذلك ننتظر أول ضغطة من المستخدم.
             */

            document.addEventListener(
                "click",
                function playAfterClick() {

                    welcomeAudio.play().catch(() => {});

                    document.removeEventListener(
                        "click",
                        playAfterClick
                    );
                },
                { once: true }
            );

        });
    }
}


/* ----------------------------------------
   تشغيل الصوت بعد الدخول من صفحة Login
---------------------------------------- */

window.addEventListener("load", function () {

    const shouldPlayAudio =
        localStorage.getItem("playWelcomeAudio") === "true";

    if (shouldPlayAudio) {

        /*
         * نحذف العلامة حتى لا يشتغل الصوت
         * كل مرة يتم فيها فتح الصفحة.
         */

        localStorage.removeItem("playWelcomeAudio");

        playWelcomeAudio();
    }

});


/* ----------------------------------------
   شاشة التحميل
---------------------------------------- */

window.addEventListener("load", function () {

    if (!loadingScreen) {
        return;
    }

    setTimeout(function () {

        loadingScreen.style.opacity = "0";

        setTimeout(function () {

            loadingScreen.style.display = "none";

        }, 400);

    }, 1600);

});