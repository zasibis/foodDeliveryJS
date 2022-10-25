"use strict";

window.addEventListener('DOMContentLoaded', () => {

    // TABS
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsParent = document.querySelector('.tabheader__items'),
        tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {

        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    //Timer

    const deadline = '2023-05-30';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setCLock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            interval = setInterval(updateClock, 1000);

        updateClock()

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(interval);
            }
        }
    }

    setCLock('.timer', deadline);


    // Modal

    const modalsCLose = document.querySelector('[data-close]'),
        modalsShow = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function opendModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function modalsClose() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modalsShow.forEach(btns => {
        btns.addEventListener('click', opendModal)
    });


    modalsCLose.addEventListener('click', modalsClose);

    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            modalsClose();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            modalsClose();
        }
    });

    const modalTimerId = setTimeout(opendModal, 5000);

    function showModelByScroll () {
            if (window.pageYoffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
                opendModal();
                window,removeEventListener('scroll', showModelByScroll);
            }
    }

    window.addEventListener('scroll', showModelByScroll);

});