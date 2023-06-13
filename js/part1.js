function toggleOpacity_1() {
    const cloudphoto_day1 = document.getElementById("cloudphoto_day1");
    if (cloudphoto_day1.classList.contains("fade-out")) {
        cloudphoto_day1.classList.remove("fade-out");
    } else {
        cloudphoto_day1.classList.add("fade-out");
    }
    const btn_part1_1 = document.getElementById("btn_part1_1");
    if (btn_part1_1.classList.contains("fade-out")) {
        btn_part1_1.classList.remove("fade-out");
    } else {
        btn_part1_1.classList.add("fade-out");
    }
}

function toggleOpacity_2() {
    const cloudphoto_day2 = document.getElementById("cloudphoto_day2");
    if (cloudphoto_day2.classList.contains("fade-out")) {
        cloudphoto_day2.classList.remove("fade-out");
    } else {
        cloudphoto_day2.classList.add("fade-out");
    }
    const btn_part1_2 = document.getElementById("btn_part1_2");
    if (btn_part1_2.classList.contains("fade-out")) {
        btn_part1_2.classList.remove("fade-out");
    } else {
        btn_part1_2.classList.add("fade-out");
    }
}

function toggleOpacity_3() {
    const cloudphoto_day3 = document.getElementById("cloudphoto_day3");
    if (cloudphoto_day3.classList.contains("fade-out")) {
        cloudphoto_day3.classList.remove("fade-out");
    } else {
        cloudphoto_day3.classList.add("fade-out");
    }
    const btn_part1_3 = document.getElementById("btn_part1_3");
    if (btn_part1_3.classList.contains("fade-out")) {
        btn_part1_3.classList.remove("fade-out");
    } else {
        btn_part1_3.classList.add("fade-out");
    }
}

function toggleOpacity_4() {
    const cloudphoto_day4 = document.getElementById("cloudphoto_day4");
    if (cloudphoto_day4.classList.contains("fade-out")) {
        cloudphoto_day4.classList.remove("fade-out");
    } else {
        cloudphoto_day4.classList.add("fade-out");
    }
    const btn_part1_4 = document.getElementById("btn_part1_4");
    if (btn_part1_4.classList.contains("fade-out")) {
        btn_part1_4.classList.remove("fade-out");
    } else {
        btn_part1_4.classList.add("fade-out");
    }
}

function toggleOpacity_5() {
    const cloudphoto_day5 = document.getElementById("cloudphoto_day5");
    if (cloudphoto_day5.classList.contains("fade-out")) {
        cloudphoto_day5.classList.remove("fade-out");
    } else {
        cloudphoto_day5.classList.add("fade-out");
    }
    const btn_part1_5 = document.getElementById("btn_part1_5");
    if (btn_part1_5.classList.contains("fade-out")) {
        btn_part1_5.classList.remove("fade-out");
    } else {
        btn_part1_5.classList.add("fade-out");
    }
}

function toggleOpacity_6() {
    const cloudphoto_day6 = document.getElementById("cloudphoto_day6");
    if (cloudphoto_day6.classList.contains("fade-out")) {
        cloudphoto_day6.classList.remove("fade-out");
    } else {
        cloudphoto_day6.classList.add("fade-out");
    }
    const btn_part1_6 = document.getElementById("btn_part1_6");
    if (btn_part1_6.classList.contains("fade-out")) {
        btn_part1_6.classList.remove("fade-out");
    } else {
        btn_part1_6.classList.add("fade-out");
    }
}


/////=======PopUP=========//////////

document.addEventListener('DOMContentLoaded', function () {
    var photoContainer = document.querySelector('.photos');
    var images = photoContainer.querySelectorAll('img');

    function createPopup(image) {
        var src = image.src;
        var alt = image.alt;

        var popupContainer = document.createElement('div');
        popupContainer.classList.add('popupContainer');

        var popupImage = document.createElement('img');
        popupImage.src = src;
        popupImage.alt = alt;

        popupContainer.appendChild(popupImage);
        document.body.appendChild(popupContainer);

        setTimeout(function () {
            popupContainer.classList.add('show');
        }, 0);

        popupContainer.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        document.addEventListener('click', function (event) {
            var targetElement = event.target;

            if (!popupContainer.contains(targetElement)) {
                document.body.removeChild(popupContainer);
            }
        });
    }

    images.forEach(function (image) {
        image.addEventListener('click', function (event) {
            event.stopPropagation();
            createPopup(image);
        });
    });
});






