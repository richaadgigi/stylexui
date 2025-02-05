function findElementWithAttribute(element, attributeName) {
    while (element) {
        if (element.hasAttribute(attributeName)) {
            return element;
        }
        element = element.parentElement;
    }
    return null;
}

/* Handling card tilt effect */
document.querySelectorAll('.xui-tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        let rect = card.getBoundingClientRect();
        let x = (e.clientX - rect.left) / rect.width - 0.5;
        let y = (e.clientY - rect.top) / rect.height - 0.5;

        let tiltX = y * 45; 
        let tiltY = x * -45;

        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});
  
// Handling click events
document.addEventListener("click", (e) => {
    // Functionalities for navabar goes here
    const xuiNavbar = document.getElementsByClassName('xui-navbar');
    if (xuiNavbar.length > 0) {
        const xuiNavbarMenu = document.querySelector(".xui-navbar .menu");
        const xuiNavbarLinksMain = document.querySelector(".xui-navbar .links .main");
        const xuiDashboard = document.querySelector(".xui-dashboard");
        const xuiDashboardAnimate = document.querySelector(".xui-dashboard.animate");
        const xuiNavbarLinksUrl = document.querySelectorAll(".xui-navbar .links a");
        if(e.target === xuiNavbarMenu){
            if(e.target && e.target.classList.contains('animate')){
                if(xuiDashboard){
                    xuiDashboard.classList.remove("animate");
                }
                if(xuiNavbarLinksMain){
                    xuiNavbarLinksMain.classList.remove("animate");
                }
                xuiNavbarMenu.classList.remove("animate");
            }
            else {
                if(xuiDashboard){
                    xuiDashboard.classList.add("animate");
                }
                if(xuiNavbarLinksMain){
                    xuiNavbarLinksMain.classList.add("animate");
                }
                xuiNavbarMenu.classList.add("animate");
            }
        }
        if(e.target === xuiDashboard){
            if(e.target && e.target.classList.contains('animate')){
                if(xuiDashboard){
                    xuiDashboard.classList.remove("animate");
                }
                xuiNavbarMenu.classList.remove("animate");
            }
        }
        // Closing animations when a link with url is clicked
        const target = e.target;
        if (target.closest('.xui-navbar .links .main a') || target.closest('.xui-dashboard .navigator .links a')) {
            const href = target.getAttribute("href");
            if ((href !== "#") && (href !== "")) {
                if (xuiNavbarMenu !== null) {
                    xuiNavbarMenu.classList.remove("animate");
                }
                if(xuiDashboard !== null){
                    xuiDashboard.classList.remove("animate");
                }
                if (xuiNavbarLinksMain !== null) {
                    xuiNavbarLinksMain.classList.remove("animate");
                }
            }
        }
    }
    // Functionalities for navabar goes here

    // Functionalities for modal goes here
    const modals = document.querySelectorAll('[xui-modal]');
    const currentModal = e.target.getAttribute('xui-modal');
    if(e.target.hasAttribute("xui-modal")){
        for(let i = 0; i < modals.length; i++){
            let modalName = modals[i];
            if(!modalName.hasAttribute('disable-click-on-outside')){
                if(currentModal == modalName.getAttribute('xui-modal')){
                    if (modalName.hasAttribute('display')) {
                        modalName.removeAttribute("display");
                        void modalName.offsetWidth;
                        modalName.setAttribute("display", false);
                    }
                }
            }
            let xuiBody = document.querySelector('body');
            if (xuiBody !== null) {
                xuiBody.style.overflow = "auto";
            }
        }
    }
    const target = e.target;
    let modalOpen = target.getAttribute("xui-modal-open");
    let modalClose = target.getAttribute("xui-modal-close");
    if(!modalOpen){
        const parentNode = findElementWithAttribute(target, "xui-modal-open");
        if(parentNode){
            if(parentNode.getAttribute){
                modalOpen = parentNode.getAttribute("xui-modal-open");
            }
        }
    }
    if(!modalClose){
        const parentNode = findElementWithAttribute(target, "xui-modal-close");
        if(parentNode){
            if(parentNode.getAttribute){
                modalClose = parentNode.getAttribute("xui-modal-close");
            }
        }
    }
    if (modalOpen !== null) {
        let xuiModalOpen = document.querySelector('[xui-modal="' + modalOpen + '"]');
        if (xuiModalOpen !== null) {
            xuiModalOpen.removeAttribute("display");
            void xuiModalOpen.offsetWidth;
            xuiModalOpen.setAttribute("display", true);
        }
        let xuiBody = document.querySelector('body');
        if (xuiBody !== null) {
            xuiBody.style.overflow = "hidden";
        }
    }
    if (modalClose !== null) {
        let xuiModalClose = document.querySelector('[xui-modal="' + modalClose + '"]');
        if (xuiModalClose !== null) {
            xuiModalClose.removeAttribute("display");
            void xuiModalClose.offsetWidth;
            xuiModalClose.setAttribute("display", false);
        }
        let xuiBody = document.querySelector('body');
        if (xuiBody !== null) {
            xuiBody.style.overflow = "auto";
        }
    }
    // Functionalities for modal goes here

    // Functionalities for accordion goes here
    const xuiAccordionHeaders = Array.from(document.querySelectorAll('.xui-accordion-box .xui-accordion-header'));
    if(e.target.closest('.xui-accordion-box .xui-accordion-header')){
        let index = xuiAccordionHeaders.indexOf(e.target.closest('.xui-accordion-box .xui-accordion-header'));
        let accordionHeader = document.querySelectorAll('.xui-accordion-box .xui-accordion-header')[index];
        let accordionIconOpen = accordionHeader.querySelector(".xui-accordion-box .xui-accordion-header .xui-accordion-header-icon-open");
        let accordionIconClose = accordionHeader.querySelector(".xui-accordion-box .xui-accordion-header .xui-accordion-header-icon-close");
        let accordionContent = document.querySelectorAll('.xui-accordion-box .xui-accordion-content')[index];
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
    }
    // Functionalities for accordion goes here

    // Functionalities for dashboard sidebar goes here
    const xuiDashboardContent = document.querySelector('.xui-dashboard .screen .content');
    const xuiDashboardAside = document.querySelector('.xui-dashboard .screen .aside');
    const xuiSidebarBtn = document.querySelector(".xui-dashboard .screen .content .xui-open-sidebar");
    // const xuiNavbarLinksMain = document.querySelector(".xui-navbar .links .main");
    // const xuiDashboard = document.querySelector(".xui-dashboard");
    // const xuiDashboardAnimate = document.querySelector(".xui-dashboard.animate");
    // const xuiNavbarLinksUrl = document.querySelectorAll(".xui-navbar .links a");
    if(e.target === xuiSidebarBtn){
        xuiDashboardContent.classList.add("animate");
        xuiDashboardAside.classList.add("animate");
    }
    
    if(e.target === xuiDashboardContent){
        xuiDashboardContent.classList.remove("animate");
        xuiDashboardAside.classList.remove("animate");
    }
    // Functionalities for dashboard sidebar goes here
});
function xuiLoadingScreen(){
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
function xuiHideSkeleton(ele){
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
function xuiModal(){
    let modals = document.querySelectorAll('[xui-modal]');
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
            if(parentNode){
                if(parentNode.getAttribute){
                    modalOpen = parentNode.getAttribute("xui-modal-open");
                }
            }
        }
        if(!modalClose){
            const parentNode = target.parentNode;
            if(parentNode){
                if(parentNode.getAttribute){
                    modalClose = parentNode.getAttribute("xui-modal-close");
                }
            }
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
function isHidden(el){
    if (typeof window !== "undefined") {
        // Client-side-only code
        var style = window.getComputedStyle(el);
        return (style.display === 'none');
    }
};
function xuiAccordion(){
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
function xuiAlerts(){
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
function xuiLazyLoadings(){
    (function () {
        const elements = document.querySelectorAll('[xui-bg-img]');
        let loadedElements = 0; // Track how many elements have been lazy-loaded
    
        const lazyLoad = function () {
            elements.forEach((item) => {
                const rect = item.getBoundingClientRect(); // Get the element's position relative to the viewport
                // Check if the item is in the viewport
                if (typeof window !== "undefined") {
                    // Client-side-only code
                    if (rect.top <= window.innerHeight && rect.bottom >= 0 && item.getAttribute('xui-bg-img')) {
                        const src = item.getAttribute('xui-bg-img');
                        if (src) {
                            item.style.backgroundImage = `url('${src}')`;
                            item.onload = function () {
                                item.removeAttribute('xui-bg-img');
                            };
                        }
                    }
                }
            });
    
            // Stop listening to scroll events if all elements have been lazy-loaded
            loadedElements = Array.from(elements).filter(el => el.getAttribute('xui-bg-img') === null).length;
            if (loadedElements === elements.length) {
                if (typeof window !== "undefined") {
                    // Client-side-only code
                    window.removeEventListener('scroll', lazyLoad);
                }
            }
        };
    
        const init = function () {
            if (typeof window !== "undefined") {
                // Client-side-only code
                window.addEventListener('scroll', lazyLoad);
            }
            // Add scroll event listener to the specific container
            const contentElement = document.querySelector('.xui-dashboard .screen .content');
            if (contentElement) {
                contentElement.addEventListener('scroll', lazyLoad);
            }
            lazyLoad(); // Initial check in case some elements are already in view
        };
    
        return init();
    })();
    
    (function () {
        const elements = document.querySelectorAll('[xui-img-src]');
        let loadedElements = 0; // Track how many elements have been lazy-loaded
    
        const lazyLoad = function () {
            elements.forEach((item) => {
                const rect = item.getBoundingClientRect(); // Get the element's position relative to the viewport
                // Check if the item is in the viewport
                if (typeof window !== "undefined") {
                    // Client-side-only code
                    if (rect.top <= window.innerHeight && rect.bottom >= 0 && item.getAttribute('xui-img-src')) {
                        const src = item.getAttribute('xui-img-src');
                        if (src) {
                            item.src = src;
                            item.onload = function () {
                                item.removeAttribute('xui-img-src');
                            };
                        }
                    }
                }
            });
    
            // Stop listening to scroll events if all elements have been lazy-loaded
            loadedElements = Array.from(elements).filter(el => el.getAttribute('xui-img-src') === null).length;
            if (loadedElements === elements.length) {
                if (typeof window !== "undefined") {
                    // Client-side-only code
                    window.removeEventListener('scroll', lazyLoad);
                }
            }
        };
    
        const init = function () {
            if (typeof window !== "undefined") {
                // Client-side-only code
                window.addEventListener('scroll', lazyLoad);
            }
            // Add scroll event listener to the specific container
            const contentElement = document.querySelector('.xui-dashboard .screen .content');
            if (contentElement) {
                contentElement.addEventListener('scroll', lazyLoad);
            }
            lazyLoad(); // Initial check in case some elements are already in view
        };
    
        return init();
    })();
};
function xuiAnime(customDefinition){
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
function xuiAnimeStart(customDefinition){
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
function xuiAnimeEnd(customDefinition){
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
function xuiTypeWriter(obj){
    let quoteArray = obj.words;
    let speed = obj.duration;
    let target = obj.target;
    let delay = obj.delay;
    let cursor = obj.cursor;
    let textPosition = 0;
    if (quoteArray === undefined) {
        quoteArray = ["Hello friend ðŸ‘‹. This is a default text from XUI. I hope you're enjoying this", "It can be changed as well! Just like this."];
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
function xuiScrollOnAnimation(){
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
                    if (typeof window !== "undefined") {
                        // Client-side-only code
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
                    }
                }, { rootMargin: rootMargin, threshold: 0 });
                observer.observe(ele);
            };
            let xuiAOS = document.querySelectorAll("[xui-aos]");
            for (var i = 0; i < xuiAOS.length; i++) {
                var offset;
                if (typeof window !== "undefined") {
                    // Client-side-only code
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
    }
};
function xuiModalShow(name){
    let modalName = document.querySelector("[xui-modal=\"" + name + "\"]");
    if (modalName !== null) {
        modalName.removeAttribute("display");
        void modalName.offsetWidth;
        modalName.setAttribute("display", true);
    }
}
function xuiModalHide(name){
    let modalName = document.querySelector("[xui-modal=\"" + name + "\"]");
    if (modalName !== null) {
        modalName.removeAttribute("display");
        void modalName.offsetWidth;
        modalName.setAttribute("display", false);
    }
}
if (typeof window !== "undefined") {
    // Client-side-only code
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
}
function xuiRun(){
    xuiLazyLoadings();
    xuiModal();
    xuiAccordion();
    xuiAlerts();
    xuiScrollOnAnimation();
}
let xui = {
    run: () => {
        xuiRun();
    },
    control: {
        navbar: () => {
            // xuiNavbarMenu();
        },
        loader: () => {
            xuiLoadingScreen();
        }
    },
    animate: {
        default: (custom) => {
            xuiAnime(custom);
        },
        start: (custom) => {
            xuiAnimeStart(custom);
        },
        end: (custom) => {
            xuiAnimeEnd(custom);
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
            xuiLazyLoadings();
        },
        skeletons: (ele) => {
            xuiHideSkeleton(ele);
        }
    },
    modal: {
        show: () => {
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
function autoRun(){
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

(function dynamicCSS() {
    // Map dynamic class prefixes to CSS properties
    const propertyMap = {
      "xui-font-sz": "font-size",
      "xui-bdr-rad": "border-radius",
      "xui-img": "max-width",
      "xui-column-count": "column-count",
      "xui-font-w": "font-weight",
      "xui-xl-h": "height",
      "xui-mt": "margin-top",
      "xui-mb": "margin-bottom",
      "xui-ml": "margin-left",
      "xui-mr": "margin-right",
      "xui-pt": "padding-top",
      "xui-pb": "padding-bottom",
      "xui-pl": "padding-left",
      "xui-pr": "padding-right",
      "xui-px": ["padding-left", "padding-right"],
      "xui-py": ["padding-top", "padding-bottom"],
    };
  
    // Map responsive prefixes to media queries
    const responsiveMap = {
      sm: "(min-width: 640px)",
      md: "(min-width: 768px)",
      lg: "(min-width: 1024px)",
      xl: "(min-width: 1280px)",
    };
  
    // Create a single <style> tag for all dynamic styles
    const styleSheet = document.createElement("style");
    document.head.appendChild(styleSheet);
  
    // Track already processed classes to avoid duplicates
    const processedClasses = new Set();
  
    // Select all elements with classes containing `[]`
    const elements = document.querySelectorAll("[class*='[']");
  
    elements.forEach((el) => {
      const classes = el.className.split(" "); // Get all classes on the element
  
      classes.forEach((cls) => {
        // Check if the class contains `[]` syntax and hasn't been processed yet
        if (cls.includes("[") && cls.includes("]") && !processedClasses.has(cls)) {
          // Match the class and extract its prefix, property, and value
          const match = cls.match(/(xui-)?(sm|md|lg|xl)?-?([a-z-]+)-\[(.+)\]/);
          if (match) {
            const isXui = match[1]; // Check if the class starts with "xui-"
            const prefix = match[2]; // Extract the responsive prefix, e.g., "md"
            const propertyKey = match[3]; // Extract the property, e.g., "font-sz"
            const value = match[4]; // Extract the value, e.g., "100px"
  
            // Map the property key to the corresponding CSS property
            const properties = propertyMap[`xui-${propertyKey}`];
            if (properties) {
              // Sanitize the class name for use in CSS (escape brackets)
              const sanitizedClass = cls.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
  
              // Generate the CSS rule(s)
              if (Array.isArray(properties)) {
                // Handle multiple properties (e.g., xui-px, xui-py)
                const rules = properties.map((prop) => `${prop}: ${value};`).join(" ");
                const rule = `.${sanitizedClass} { ${rules} }`;
                if (prefix) {
                  // Wrap the rule in a media query for responsive classes
                  const mediaQuery = responsiveMap[prefix];
                  styleSheet.sheet.insertRule(
                    `@media ${mediaQuery} { ${rule} }`,
                    styleSheet.sheet.cssRules.length
                  );
                } else {
                  // Add the rule globally for non-responsive classes
                  styleSheet.sheet.insertRule(rule, styleSheet.sheet.cssRules.length);
                }
              } else {
                // Handle single property
                const rule = `.${sanitizedClass} { ${properties}: ${value}; }`;
                if (prefix) {
                  // Wrap the rule in a media query for responsive classes
                  const mediaQuery = responsiveMap[prefix];
                  styleSheet.sheet.insertRule(
                    `@media ${mediaQuery} { ${rule} }`,
                    styleSheet.sheet.cssRules.length
                  );
                } else {
                  // Add the rule globally for non-responsive classes
                  styleSheet.sheet.insertRule(rule, styleSheet.sheet.cssRules.length);
                }
              }
  
              // Mark the class as processed
              processedClasses.add(cls);
            }
          }
        }
      });
    });
  })();