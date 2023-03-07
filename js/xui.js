"use strict";
let loadingScreen = () => {
    let loader = document.querySelector(".xui-loader");
    if (loader !== null) {
        loader.style.display = "flex";
    }
    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            clearInterval(stateCheck);
            // document ready
            setTimeout(() => {
                if (loader !== null) {
                    loader.style.display = "none";
                }
            }, 1000);
        }
    }, 100);
};
let hideSkeleton = (ele) => {
    setTimeout(function () {
        if(ele !== undefined){
            let xuiSkeleton = document.querySelectorAll(ele + " .xui--skeleton");
            let xuiSkeletonBtnSmall = document.querySelectorAll(ele + " .xui--skeleton-btn-small");
            for (let i = 0; i < xuiSkeleton.length; i++) {
                xuiSkeleton[i].classList.add("hidden");
            }
            for (let i = 0; i < xuiSkeletonBtnSmall.length; i++) {
                xuiSkeletonBtnSmall[i].classList.add("hidden");
            }
        } else {
            let xuiSkeleton = document.querySelectorAll(".xui--skeleton");
            let xuiSkeletonBtnSmall = document.querySelectorAll(".xui--skeleton-btn-small");
            for (let i = 0; i < xuiSkeleton.length; i++) {
                xuiSkeleton[i].classList.add("hidden");
            }
            for (let i = 0; i < xuiSkeletonBtnSmall.length; i++) {
                xuiSkeletonBtnSmall[i].classList.add("hidden");
            }
        }
    }, 2500);
};
let modal = () => {
    let modals = document.querySelectorAll('[xui-modal]');
    function getParents(el, parentSelector /* optional */) {

        // If no parentSelector defined will bubble up all the way to *document*
        if (parentSelector === undefined) {
            parentSelector = document;
        }
    
        var parents = [];
        var p = el.parentNode;
        
        while (p !== parentSelector) {
            var o = p;
            parents.push(o);
            p = o.parentNode;
        }
        parents.push(parentSelector); // Push that parentSelector you wanted to stop at
        
        return parents;
    }
    setInterval(() => {
        for (var i = 0; i < modals.length; i++) {
            let display = modals[i].style.transform;
            if (display === "scale(1)") {
                let xuiBody = document.querySelector('body');
                if (xuiBody !== null) {
                    xuiBody.style.overflow = "hidden";
                }
            }
            else {
                let xuiBody = document.querySelector('body');
                if (xuiBody !== null) {
                    xuiBody.style.overflow = "auto";
                }
            }
        }
    }, 2000);
    document.onclick = function (e) {
        const currentModal = e.target.getAttribute('xui-modal');
        if(e.target.hasAttribute("xui-modal")){
            for(let i = 0; i < modals.length; i++){
                let modalName = modals[i];
                if(!modalName.hasAttribute('disable-click-on-outside')){
                    if(currentModal == modalName.getAttribute('xui-modal')){
                        if (modalName.hasAttribute('open')) {
                            modalName.removeAttribute("open");
                            void modalName.offsetWidth;
                            modalName.setAttribute("open", false);
                        }
                    }
                }
            }
        }
        const target = e.target;
        let modalOpen = target.getAttribute("xui-modal-open");
        let modalClose = target.getAttribute("xui-modal-close");
        if(!modalOpen){
            const parentNode = target.parentNode;
            modalOpen = parentNode.getAttribute("xui-modal-open");
        }
        if(!modalClose){
            const parentNode = target.parentNode;
            modalClose = parentNode.getAttribute("xui-modal-close");
        }
        if (modalOpen !== null) {
            let xuiModalOpen = document.querySelector('[xui-modal="' + modalOpen + '"]');
            if (xuiModalOpen !== null) {
                xuiModalOpen.removeAttribute("open");
                void xuiModalOpen.offsetWidth;
                xuiModalOpen.setAttribute("open", true);
            }
            let xuiBody = document.querySelector('body');
            if (xuiBody !== null) {
                xuiBody.style.overflow = "hidden";
            }
        }
        if (modalClose !== null) {
            let xuiModalClose = document.querySelector('[xui-modal="' + modalClose + '"]');
            if (xuiModalClose !== null) {
                xuiModalClose.removeAttribute("open");
                void xuiModalClose.offsetWidth;
                xuiModalClose.setAttribute("open", false);
            }
            let xuiBody = document.querySelector('body');
            if (xuiBody !== null) {
                xuiBody.style.overflow = "auto";
            }
        }
    };
};
let isHidden = (el) => {
    var style = window.getComputedStyle(el);
    return (style.display === 'none');
};
let accordion = () => {
    let accordionHeaders = document.querySelectorAll('.xui-accordion-box .xui-accordion-header');
    for (var i = 0; i < accordionHeaders.length; i++) {
        accordionHeaders[i].addEventListener('click', ((j) => {
            return function () {
                let accordionHeader = document.querySelectorAll('.xui-accordion-box .xui-accordion-header')[j];
                let accordionIconOpen = accordionHeader.querySelector(".xui-accordion-box .xui-accordion-header .xui-accordion-header-icon-open");
                let accordionIconClose = accordionHeader.querySelector(".xui-accordion-box .xui-accordion-header .xui-accordion-header-icon-close");
                let accordionContent = document.querySelectorAll('.xui-accordion-box .xui-accordion-content')[j];
                if (isHidden(accordionContent)) {
                    let accordionBoxes = document.querySelectorAll('.xui-accordion-box');
                    for (var k = 0; k < accordionBoxes.length; k++) {
                        let accordionIconOpen = accordionBoxes[k].querySelector(".xui-accordion-header .xui-accordion-header-icon-open");
                        let accordionIconClose = accordionBoxes[k].querySelector(".xui-accordion-header .xui-accordion-header-icon-close");
                        let accordionContent = accordionBoxes[k].querySelector('.xui-accordion-content');
                        if (accordionIconOpen !== null) {
                            accordionIconOpen.style.display = "inline-block";
                        }
                        if (accordionIconClose !== null) {
                            accordionIconClose.style.display = "none";
                        }
                        if (accordionContent !== null) {
                            accordionContent.style.display = "none";
                        }
                    }
                    if (accordionIconOpen !== null) {
                        accordionIconOpen.style.display = "none";
                    }
                    if (accordionIconClose !== null) {
                        accordionIconClose.style.display = "inline-block";
                    }
                    if (accordionContent !== null) {
                        accordionContent.style.display = "block";
                    }
                }
                else {
                    let accordionBoxes = document.querySelectorAll('.xui-accordion-box');
                    for (var k = 0; k < accordionBoxes.length; k++) {
                        let accordionIconOpen = accordionBoxes[k].querySelector(".xui-accordion-header .xui-accordion-header-icon-open");
                        let accordionIconClose = accordionBoxes[k].querySelector(".xui-accordion-header .xui-accordion-header-icon-close");
                        let accordionContent = accordionBoxes[k].querySelector('.xui-accordion-content');
                        if (accordionIconOpen !== null) {
                            accordionIconOpen.style.display = "inline-block";
                        }
                        if (accordionIconClose !== null) {
                            accordionIconClose.style.display = "none";
                        }
                        if (accordionContent !== null) {
                            accordionContent.style.display = "none";
                        }
                    }
                }
            };
        })(i));
    }
};
let alerts = () => {
    let alertBoxesClose = document.querySelectorAll('.xui-alert .xui-alert-close');
    for (var i = 0; i < alertBoxesClose.length; i++) {
        alertBoxesClose[i].addEventListener('click', ((j) => {
            return function () {
                let alertBox = document.querySelectorAll('.xui-alert')[j];
                let alertBoxAnimation = alertBox.classList.contains('xui-anime');
                if (alertBoxAnimation) {
                    let animationDuration = alertBox.getAttribute("xui-anime-duration");
                    if ((animationDuration !== null) && (animationDuration !== "")) {
                        alertBox.style.transition = animationDuration + "s";
                        alertBox.classList.remove("xui-anime");
                        setTimeout(() => {
                            alertBox.style.transition = "";
                        }, Number(animationDuration * 1000));
                    }
                    else {
                        alertBox.style.transition = "1s";
                        alertBox.classList.remove("xui-anime");
                        setTimeout(() => {
                            alertBox.style.transition = "";
                        }, 1000);
                    }
                }
                else {
                    alertBox.style.cssText = "overflow: hidden; padding: 0; margin: 0; height: 0; transition: .2s;";
                }
            };
        })(i));
    }
};
let navbarMenu = () => {
    let xuiNavbar = document.getElementsByClassName('xui-navbar');
    if (xuiNavbar.length > 0) {
        let xuiNavbarMenu = document.querySelector(".xui-navbar .menu");
        let xuiNavbarLinksMain = document.querySelector(".xui-navbar .links .main");
        let xuiDashboard = document.querySelector(".xui-dashboard");
        let xuiDashboardAnimate = document.querySelector(".xui-dashboard.animate");
        let xuiNavbarLinksUrl = document.querySelectorAll(".xui-navbar .links a");
        document.addEventListener("click", function (e) {
            console.log(e.target);
            console.log(e.target.parentNode);
            while (e.target && !e.target.classList.contains('xui-dashboard') && !e.target.classList.contains('animate')) {
                e.target = e.target.parentNode;
            }
            if(e.target){
                xuiDashboard.classList.remove("animate");
                xuiNavbarMenu.classList.remove("animate");
            }
        });
        if (xuiNavbarMenu !== null) {
            xuiNavbarMenu.classList.remove("animate");
            xuiNavbarMenu.addEventListener("click", function (event) {
                event.preventDefault();
                if (xuiNavbarMenu !== null) {
                    xuiNavbarMenu.classList.toggle("animate");
                }
                if (xuiNavbarLinksMain !== null) {
                    xuiNavbarLinksMain.classList.toggle("animate");
                }
                xuiDashboard.classList.add("animate");
            });
        }
        if (xuiNavbarLinksMain !== null) {
            xuiNavbarLinksMain.classList.remove("animate");
        }
        let newXuiNavbar = document.querySelector('.xui-navbar');
        if (newXuiNavbar !== null) {
            newXuiNavbar.addEventListener('click', (e) => {
                const target = e.target;
                if (target.closest('.xui-navbar .links .main a') || target.closest('.xui-dashboard .navigator .links a')) {
                    let href = target.getAttribute("href");
                    if ((href !== "#") && (href !== "")) {
                        if (xuiNavbarMenu !== null) {
                            xuiNavbarMenu.classList.toggle("animate");
                        }
                        if (xuiNavbarLinksMain !== null) {
                            xuiNavbarLinksMain.classList.toggle("animate");
                        }
                    }
                }
            });
        }
        if (xuiDashboard !== null) {
            xuiDashboard.addEventListener('click', (e) => {
                const target = e.target;
                if (target.closest('.xui-dashboard .navigator .links a')) {
                    let href = target.getAttribute("href");
                    if ((href !== "#") && (href !== "")) {
                        if (xuiNavbarMenu !== null) {
                            xuiNavbarMenu.classList.toggle("animate");
                            xuiDashboard.classList.toggle("animate");
                        }
                    }
                }
            });
        }
    }
};
let lazyLoadings = () => {
    (function () {
        var elements = document.querySelectorAll('[xui-bg-img]');
        var index = 0;
        var lazyLoad = function () {
            if (index >= elements.length)
                return;
            var item = elements[index];
            if ((window.scrollY + window.innerHeight) > item.offsetTop) {
                var src = item.getAttribute("xui-bg-img");
                item.style.backgroundImage = "url('" + src + "')";
                item.addEventListener('load', function () {
                    item.removeAttribute('xui-bg-img');
                });
                index++;
                lazyLoad();
            }
        };
        var init = function () {
            window.addEventListener('scroll', lazyLoad);
            lazyLoad();
        };
        return init();
    })();
    (function () {
        let elements = document.querySelectorAll('[xui-img-src]');
        let index = 0;
        let lazyLoad = function () {
            if (index >= elements.length)
                return;
            var item = elements[index];
            if ((window.scrollY + window.innerHeight) > item.offsetTop) {
                var src = item.getAttribute("xui-img-src");
                item.src = src;
                item.addEventListener('load', function () {
                    item.removeAttribute('xui-img-src');
                });
                index++;
                lazyLoad();
            }
        };
        var init = function () {
            window.addEventListener('scroll', lazyLoad);
            lazyLoad();
        };
        return init();
    })();
};
let anime = (customDefinition) => {
    let xuiCustom = customDefinition;
    if (xuiCustom !== undefined) {
        let el = document.querySelector('[xui-custom="' + xuiCustom + '"]');
        if (el !== null) {
            let elPlaced = el.getAttribute("xui-placed");
            let elAnimateReverse = el.getAttribute("xui-anime-reverse");
            let elAnimateDuration = el.getAttribute("xui-anime-duration");
            if ((elAnimateDuration !== null) && (elAnimateDuration !== "")) {
                el.style.transition = elAnimateDuration + "s";
            }
            else {
                el.style.transition = "1s";
            }
            setTimeout(() => {
                if (el !== null) {
                    el.classList.add("xui-anime");
                }
            });
            setTimeout(() => {
                if ((elAnimateReverse !== undefined) && (elAnimateReverse !== null)) {
                    // Convert to milliseconds
                    let duration = Number(elAnimateReverse * 1000);
                    setTimeout(() => {
                        if (el !== null) {
                            el.classList.remove("xui-anime");
                        }
                    }, duration);
                }
                else {
                    setTimeout(() => {
                        if (el !== null) {
                            el.classList.remove("xui-anime");
                        }
                    }, 3000);
                }
            }, Number(elAnimateDuration * 1000));
        }
    }
    else {
        console.warn("xui.animate() is missing a parameter");
    }
};
let animeStart = (customDefinition) => {
    let xuiCustom = customDefinition;
    if (xuiCustom !== undefined) {
        let el = document.querySelector('[xui-custom="' + xuiCustom + '"]');
        if (el !== null) {
            let elAnimateDuration = el.getAttribute("xui-anime-duration");
            if ((elAnimateDuration !== null) && (elAnimateDuration !== "")) {
                el.style.transition = elAnimateDuration + "s";
            }
            else {
                el.style.transition = "1s";
            }
            setTimeout(() => {
                if (el !== null) {
                    el.classList.add("xui-anime");
                }
            });
        }
    }
    else {
        console.warn("xui.animate() is missing a parameter");
    }
};
let animeEnd = (customDefinition) => {
    let xuiCustom = customDefinition;
    if (xuiCustom !== undefined) {
        let el = document.querySelector('[xui-custom="' + xuiCustom + '"]');
        if (el !== null) {
            let elAnimateDuration = el.getAttribute("xui-anime-duration");
            if ((elAnimateDuration !== null) && (elAnimateDuration !== "")) {
                el.style.transition = elAnimateDuration + "s";
            }
            else {
                el.style.transition = "1s";
            }
            setTimeout(() => {
                if (el !== null) {
                    el.classList.remove("xui-anime");
                }
            });
        }
    }
    else {
        console.warn("xui.animate() is missing a parameter");
    }
};
let xuiTypeWriter = (obj) => {
    let quoteArray = obj.words;
    let speed = obj.duration;
    let target = obj.target;
    let delay = obj.delay;
    let cursor = obj.cursor;
    let textPosition = 0;
    if (quoteArray === undefined) {
        quoteArray = ["Hello friend 👋. This is a default text from XUI. I hope you're enjoying this", "It can be changed as well! Just like this."];
        console.warn("XUI Typewriter: We didn't find \"words\" parameter in your object");
    }
    if ((typeof speed === undefined) || (typeof speed !== "number")) {
        speed = 1000;
    }
    if ((typeof delay === undefined) || (typeof delay !== "number")) {
        delay = 1000;
    }
    if (target !== undefined) {
        var typeWriterElement = document.querySelector(".xui-effect-typewriter[xui-effect-typewriter=\"" + target + "\"]");
        if (typeWriterElement) {
            typeWriterElement.innerHTML = typeWriterElement.innerHTML + "<span class=\"xui-effect-typewriter-content\"></span>";
            if (cursor !== undefined) {
                if (cursor) {
                    typeWriterElement.innerHTML = typeWriterElement.innerHTML + "<span class=\"xui-effect-typewriter-cursor\"></span>";
                }
            }
            typeWriterElement = document.querySelector(".xui-effect-typewriter[xui-effect-typewriter=\"" + target + "\"] span.xui-effect-typewriter-content");
            var textArray = quoteArray;
            // function to generate the backspace effect
            let delWriter = (text, i, cb) => {
                if (i >= 0) {
                    if (typeWriterElement !== null) {
                        typeWriterElement.innerHTML = text.substring(0, i--);
                    }
                    // generate a random Number to emulate backspace hitting.
                    var rndBack = 10 + Math.random() * 100;
                    setTimeout(function () {
                        delWriter(text, i, cb);
                    }, speed);
                }
                else if (typeof cb == 'function') {
                    setTimeout(cb, speed);
                }
            };
            // function to generate the keyhitting effect
            let typeWriter = (text, i, cb) => {
                if (textArray.length > 1) {
                    if (i < text.length + 1) {
                        if (typeWriterElement !== null) {
                            typeWriterElement.innerHTML = text.substring(0, i++);
                        }
                        // generate a random Number to emulate Typing on the Keyboard.
                        var rndTyping = 250 - Math.random() * 100;
                        setTimeout(function () {
                            typeWriter(text, i++, cb);
                        }, speed);
                    }
                    else if (i === text.length + 1) {
                        setTimeout(function () {
                            delWriter(text, i, cb);
                        }, delay);
                    }
                }
                else {
                    if (i < text.length + 1) {
                        if (typeWriterElement !== null) {
                            typeWriterElement.innerHTML = text.substring(0, i++);
                        }
                        // generate a random Number to emulate Typing on the Keyboard.
                        var rndTyping = 250 - Math.random() * 100;
                        setTimeout(function () {
                            typeWriter(text, i++, cb);
                        }, speed);
                    }
                    else if (i === text.length + 1) {
                        let typeWriterEffectTarget = document.querySelector(".xui-effect-typewriter[xui-effect-typewriter=\"" + target + "\"]");
                        if (typeWriterEffectTarget !== null) {
                            typeWriterEffectTarget.classList.add("xui-effect-typewriter-ready");
                        }
                        let typeWriterEffectCursor = document.querySelector(".xui-effect-typewriter[xui-effect-typewriter=\"" + target + "\"] span.xui-effect-typewriter-cursor");
                        if (typeWriterEffectCursor !== null) {
                            typeWriterEffectCursor.style.display = "none";
                        }
                    }
                }
            };
            // the main writer function
            let StartWriter = (i) => {
                if (typeof textArray[i] == "undefined") {
                    setTimeout(function () {
                        StartWriter(0);
                    }, delay);
                }
                else if (i < textArray[i].length + 1) {
                    if (textArray.length > 1) {
                        typeWriter(textArray[i], 0, function () {
                            StartWriter(i + 1);
                        });
                    }
                    else {
                        typeWriter(textArray[i], 0, function () {
                            StartWriter(i + 1);
                        });
                    }
                }
            };
            // wait one second then start the typewriter
            setTimeout(function () {
                StartWriter(0);
            }, delay);
        }
        else {
            console.error("[xui-effect-typewriter=\"" + target + "\"] not found");
        }
    }
    else {
        console.error("No target found in xui.effect.typewriter(obj)");
    }
};
let scrollOnAnimation = () => {
    // Check if xui-aos is available in the body tag
    let xuiBody = document.querySelector("body");
    if (xuiBody !== null) {
        let xuiAOSCheck = xuiBody.classList.contains('xui-aos');
        if (xuiAOSCheck) {
            let metaViewPort = document.querySelector("meta[name=\"viewport\"]");
            if (metaViewPort !== null) {
                metaViewPort.setAttribute("content", "width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=no");
            }
        }
        if ('IntersectionObserver' in window) {
            let xuiScroll = (ele, repeat, rootMargin) => {
                let observer = new IntersectionObserver(function (entries) {
                    let deviceWidth = window.outerWidth;
                    let duration;
                    let delay;
                    if ((deviceWidth > 576) && (deviceWidth < 768)) {
                        duration = entries[0].target.getAttribute("xui-sm-aos-duration");
                        if (duration === 0) {
                            duration = entries[0].target.getAttribute("xui-aos-duration");
                        }
                        delay = Number(entries[0].target.getAttribute("xui-sm-aos-delay") * 1000);
                        if (delay === 0) {
                            delay = Number(entries[0].target.getAttribute("xui-aos-delay") * 1000);
                        }
                        if (duration !== null) {
                            entries[0].target.style.animationDuration = duration + "s";
                            entries[0].target.style.transition = duration + "s";
                        }
                        else {
                            entries[0].target.style.animationDuration = ".5s";
                            entries[0].target.style.transition = ".5s";
                        }
                    }
                    else if ((deviceWidth > 768) && (deviceWidth < 992)) {
                        duration = entries[0].target.getAttribute("xui-md-aos-duration");
                        if (duration === 0) {
                            duration = entries[0].target.getAttribute("xui-sm-aos-duration");
                            if (duration === 0) {
                                duration = entries[0].target.getAttribute("xui-aos-duration");
                            }
                        }
                        delay = Number(entries[0].target.getAttribute("xui-md-aos-delay") * 1000);
                        if (delay === 0) {
                            delay = Number(entries[0].target.getAttribute("xui-sm-aos-delay") * 1000);
                            if (delay === 0) {
                                delay = Number(entries[0].target.getAttribute("xui-aos-delay") * 1000);
                            }
                        }
                        if (duration !== null) {
                            entries[0].target.style.animationDuration = duration + "s";
                            entries[0].target.style.transition = duration + "s";
                        }
                        else {
                            entries[0].target.style.animationDuration = ".5s";
                            entries[0].target.style.transition = ".5s";
                        }
                    }
                    else if ((deviceWidth > 992) && (deviceWidth < 1200)) {
                        duration = entries[0].target.getAttribute("xui-lg-aos-duration");
                        if (duration === 0) {
                            duration = entries[0].target.getAttribute("xui-md-aos-duration");
                            if (duration === 0) {
                                duration = entries[0].target.getAttribute("xui-sm-aos-duration");
                                if (duration === 0) {
                                    duration = entries[0].target.getAttribute("xui-aos-duration");
                                }
                            }
                        }
                        delay = Number(entries[0].target.getAttribute("xui-lg-aos-delay") * 1000);
                        if (delay === 0) {
                            delay = Number(entries[0].target.getAttribute("xui-md-aos-delay") * 1000);
                            if (delay === 0) {
                                delay = Number(entries[0].target.getAttribute("xui-sm-aos-delay") * 1000);
                                if (delay === 0) {
                                    delay = Number(entries[0].target.getAttribute("xui-aos-delay") * 1000);
                                }
                            }
                        }
                        if (duration !== null) {
                            entries[0].target.style.animationDuration = duration + "s";
                            entries[0].target.style.transition = duration + "s";
                        }
                        else {
                            entries[0].target.style.animationDuration = ".5s";
                            entries[0].target.style.transition = ".5s";
                        }
                    }
                    else if (deviceWidth > 1200) {
                        duration = entries[0].target.getAttribute("xui-xl-aos-duration");
                        if (duration === 0) {
                            duration = entries[0].target.getAttribute("xui-lg-aos-duration");
                            if (duration === 0) {
                                duration = entries[0].target.getAttribute("xui-md-aos-duration");
                                if (duration === 0) {
                                    duration = entries[0].target.getAttribute("xui-sm-aos-duration");
                                    if (duration === 0) {
                                        duration = entries[0].target.getAttribute("xui-aos-duration");
                                    }
                                }
                            }
                        }
                        delay = Number(entries[0].target.getAttribute("xui-xl-aos-delay") * 1000);
                        if (delay === 0) {
                            delay = Number(entries[0].target.getAttribute("xui-lg-aos-delay") * 1000);
                            if (delay === 0) {
                                delay = Number(entries[0].target.getAttribute("xui-md-aos-delay") * 1000);
                                if (delay === 0) {
                                    delay = Number(entries[0].target.getAttribute("xui-sm-aos-delay") * 1000);
                                    if (delay === 0) {
                                        delay = Number(entries[0].target.getAttribute("xui-aos-delay") * 1000);
                                    }
                                }
                            }
                        }
                        if (duration !== null) {
                            entries[0].target.style.animationDuration = duration + "s";
                            entries[0].target.style.transition = duration + "s";
                        }
                        else {
                            entries[0].target.style.animationDuration = ".5s";
                            entries[0].target.style.transition = ".5s";
                        }
                    }
                    else {
                        duration = entries[0].target.getAttribute("xui-aos-duration");
                        delay = Number(entries[0].target.getAttribute("xui-aos-delay") * 1000);
                        if (duration !== null) {
                            entries[0].target.style.animationDuration = duration + "s";
                            entries[0].target.style.transition = duration + "s";
                        }
                        else {
                            entries[0].target.style.animationDuration = ".5s";
                            entries[0].target.style.transition = ".5s";
                        }
                    }
                    if (entries[0].isIntersecting === true) {
                        if (delay !== null) {
                            setTimeout(() => {
                                entries[0].target.classList.add("xui-aos-animate");
                            }, delay);
                        }
                        else {
                            entries[0].target.classList.add("xui-aos-animate");
                        }
                        if (repeat) {
                            observer.unobserve(entries[0].target);
                        }
                    }
                    else {
                        entries[0].target.classList.remove("xui-aos-animate");
                    }
                }, { rootMargin: rootMargin, threshold: 0 });
                observer.observe(ele);
            };
            let xuiAOS = document.querySelectorAll("[xui-aos]");
            for (var i = 0; i < xuiAOS.length; i++) {
                var offset;
                let deviceWidth = window.outerWidth;
                if ((deviceWidth > 576) && (deviceWidth < 768)) {
                    offset = Number(xuiAOS[i].getAttribute("xui-sm-aos-offset"));
                    if (offset === 0) {
                        offset = Number(xuiAOS[i].getAttribute("xui-aos-offset"));
                    }
                }
                else if ((deviceWidth > 768) && (deviceWidth < 992)) {
                    offset = Number(xuiAOS[i].getAttribute("xui-md-aos-offset"));
                    if (offset === 0) {
                        offset = Number(xuiAOS[i].getAttribute("xui-sm-aos-offset"));
                        if (offset === 0) {
                            offset = Number(xuiAOS[i].getAttribute("xui-aos-offset"));
                        }
                    }
                }
                else if ((deviceWidth > 992) && (deviceWidth < 1200)) {
                    offset = Number(xuiAOS[i].getAttribute("xui-lg-aos-offset"));
                    if (offset === 0) {
                        offset = Number(xuiAOS[i].getAttribute("xui-md-aos-offset"));
                        if (offset === 0) {
                            offset = Number(xuiAOS[i].getAttribute("xui-sm-aos-offset"));
                            if (offset === 0) {
                                offset = Number(xuiAOS[i].getAttribute("xui-aos-offset"));
                            }
                        }
                    }
                }
                else if (deviceWidth > 1200) {
                    offset = Number(xuiAOS[i].getAttribute("xui-xl-aos-offset"));
                    if (offset === 0) {
                        offset = Number(xuiAOS[i].getAttribute("xui-lg-aos-offset"));
                        if (offset === 0) {
                            offset = Number(xuiAOS[i].getAttribute("xui-md-aos-offset"));
                            if (offset === 0) {
                                offset = Number(xuiAOS[i].getAttribute("xui-sm-aos-offset"));
                                if (offset === 0) {
                                    offset = Number(xuiAOS[i].getAttribute("xui-aos-offset"));
                                }
                            }
                        }
                    }
                }
                else {
                    offset = xuiAOS[i].getAttribute("xui-aos-offset");
                }
                let getNoRepeatAttr = xuiAOS[i].hasAttribute("xui-aos-once");
                if (offset !== null) {
                    let rootMargin = "0px 0px -" + offset + "%";
                    xuiScroll(xuiAOS[i], getNoRepeatAttr, rootMargin);
                }
                else {
                    let rootMargin = "0px 0px -5%";
                    xuiScroll(xuiAOS[i], getNoRepeatAttr, rootMargin);
                }
            }
        }
    }
};
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
    let qs = document.querySelector("[xui-mode=\"auto\"]");
    if (qs !== null) {
        qs.classList.add("xui-dark-mode");
    }
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";
    if (newColorScheme == "dark") {
        let xuiModeAuto = document.querySelector("[xui-mode=\"auto\"]");
        if (xuiModeAuto !== null) {
            xuiModeAuto.classList.add("xui-dark-mode");
        }
    }
    else {
        let xuiModeAuto = document.querySelector("[xui-mode=\"auto\"]");
        if (xuiModeAuto !== null) {
            xuiModeAuto.classList.remove("xui-dark-mode");
        }
    }
});
let xui = {
    run: () => {
        lazyLoadings();
        modal();
        accordion();
        alerts();
        scrollOnAnimation();
    },
    control: {
        navbar: () => {
            navbarMenu();
        },
        loader: () => {
            loadingScreen();
        }
    },
    animate: {
        default: (custom) => {
            anime(custom);
        },
        start: (custom) => {
            animeStart(custom);
        },
        end: (custom) => {
            animeEnd(custom);
        }
    },
    effect: {
        typewriter: (obj) => {
            if ((obj === undefined) || (obj === null)) {
                console.warn("Parse an object");
            }
            else {
                xuiTypeWriter(obj);
            }
        }
    },
    reveal: {
        images: () => {
            lazyLoadings();
        },
        skeletons: (ele) => {
            hideSkeleton(ele);
        }
    },
    modal: {
        show: (name) => {
            let modalName = document.querySelector("[xui-modal=\"" + name + "\"]");
            if (modalName !== null) {
                modalName.removeAttribute("open");
                void modalName.offsetWidth;
                modalName.setAttribute("open", true);
            }
        },
        hide: (name) => {
            let modalName = document.querySelector("[xui-modal=\"" + name + "\"]");
            if (modalName !== null) {
                modalName.removeAttribute("open");
                void modalName.offsetWidth;
                modalName.setAttribute("open", false);
            }
        }
    }
};
// For modules usage
let autoRun = () => {
    let body = document.querySelector("body");
    if (body !== null) {
        let xuiRun = body.getAttribute("xui-run");
        if (xuiRun !== null) {
            if (xuiRun !== "true") {
                xui.run();
                xui.control.navbar();
            }
        }
        else {
            xui.run();
            xui.control.navbar();
        }
    }
};
// Always Run THIS
autoRun();