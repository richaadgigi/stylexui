// Utility Functions
const findElementWithAttribute = (element, attributeName) => {
    while (element) {
        if (element.hasAttribute(attributeName)) {
            return element;
        }
        element = element.parentElement;
    }
    return null;
}

const isHidden = (el) => {
    if (!el) return true;
    const style = window.getComputedStyle(el);
    return (
        el.style.display === "none" ||
        el.offsetParent === null ||
        style.visibility === "hidden" ||
        style.opacity === "0" ||
        style.clipPath === "inset(0 0 100% 0)" ||
        style.transform === "scale(0)" ||
        parseInt(style.maxHeight) === 0
    );
}

// Core Functionality
const xuiLoadingScreen = () => {
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

const xuiHideSkeleton = (ele) => {
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

const xuiAlerts = () => {
    // Select both close button classes
    let alertBoxesClose = document.querySelectorAll('.xui-alert .xui-alert-close, .xui-alert .cancel');
    
    for (var i = 0; i < alertBoxesClose.length; i++) {
        alertBoxesClose[i].addEventListener('click', ((j) => {
            return function () {
                // Find the parent alert box for this close button
                let alertBox = alertBoxesClose[j].closest('.xui-alert');
                
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
                    alertBox.removeAttribute('xui-present');
                }
            };
        })(i));
    }
};

const xuiLazyLoadings = () => {
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

const xuiAnime = (customDefinition) => {
    let xuiCustom = customDefinition;
    
    if (xuiCustom !== undefined) {
        let el = document.querySelector(`[xui-custom="${xuiCustom}"], [xui-anime="${xuiCustom}"]`);
        
        if (el !== null) {
            let elPlaced = el.getAttribute("xui-placed") || el.getAttribute("xui-set");
            let elAnimateReverse = el.getAttribute("xui-anime-reverse");
            let elAnimateDuration = el.getAttribute("xui-anime-duration");

            if (elAnimateDuration !== null && elAnimateDuration !== "") {
                // el.style.transition = elAnimateDuration + "s";
            } else {
                // el.style.transition = "1s";
            }

            setTimeout(() => {
                if (el !== null) {
                    el.classList.add("xui-anime");
                }
            });

            setTimeout(() => {
                if (elAnimateReverse !== undefined && elAnimateReverse !== null) {
                    let duration = Number(elAnimateReverse) * 1000;
                    setTimeout(() => {
                        if (el !== null) {
                            el.classList.remove("xui-anime");
                        }
                    }, duration);
                } else {
                    setTimeout(() => {
                        if (el !== null) {
                            el.classList.remove("xui-anime");
                        }
                    }, 3000);
                }
            }, Number(elAnimateDuration ? elAnimateDuration + 240 : 3000));
        }
    } else {
        console.warn("xuiAnime() is missing a parameter");
    }
}

const xuiAnimeStart = (customDefinition) => {
    let xuiCustom = customDefinition;
    if (xuiCustom !== undefined) {
        let el = document.querySelector(`[xui-custom="${xuiCustom}"], [xui-anime="${xuiCustom}"]`);
        if (el !== null) {
            let elAnimateDuration = el.getAttribute("xui-anime-duration");
            if ((elAnimateDuration !== null) && (elAnimateDuration !== "")) {
                // el.style.transition = elAnimateDuration + "s";
            }
            else {
                // el.style.transition = "1s";
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

const xuiAnimeEnd = (customDefinition) => {
    let xuiCustom = customDefinition;
    if (xuiCustom !== undefined) {
        let el = document.querySelector(`[xui-custom="${xuiCustom}"], [xui-anime="${xuiCustom}"]`);
        if (el !== null) {
            let elAnimateDuration = el.getAttribute("xui-anime-duration");
            let duration = 1000; // Default duration in ms
            
            if (elAnimateDuration !== null && elAnimateDuration !== "") {
                duration = Number(elAnimateDuration) * 1000;
            }

            // Start the hide animation
            el.classList.remove("xui-anime");
            
            // Remove the element after animation completes
            setTimeout(() => {
                if (el !== null) {
                    el.removeAttribute('xui-present'); // Or el.remove() if you want to remove completely
                }
            });
        }
    } else {
        console.warn("xui.animateEnd() is missing a parameter");
    }
};

const xuiTypeWriter = (obj) => {
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

const xuiScrollOnAnimation = () => {
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

const xuiModalShow = (name) => {
    let modalName = document.querySelector("[xui-modal=\"" + name + "\"]");
    if (modalName !== null) {
        if (modalName.hasAttribute("xui-present")) {
            modalName.removeAttribute("xui-present");
            void modalName.offsetWidth;
            modalName.setAttribute("xui-present", true);
        } else {
            modalName.removeAttribute("display");
            void modalName.offsetWidth;
            modalName.setAttribute("display", true);
        }
    }
}

const xuiModalHide = (name) => {
    let modalName = document.querySelector("[xui-modal=\"" + name + "\"]");
    if (modalName !== null) {
        if (modalName.hasAttribute("xui-present")) {
            modalName.removeAttribute("xui-present");
            void modalName.offsetWidth;
            modalName.setAttribute("xui-present", false);
        } else {
            modalName.removeAttribute("display");
            void modalName.offsetWidth;
            modalName.setAttribute("display", false);
        }
    }
}

const xuiModalOpen = (name) => {
    let modalName = document.querySelector("[xui-modal=\"" + name + "\"]");
    if (modalName !== null) {
        if (modalName.hasAttribute("xui-present")) {
            modalName.removeAttribute("xui-present");
            void modalName.offsetWidth;
            modalName.setAttribute("xui-present", true);
        } else {
            modalName.removeAttribute("display");
            void modalName.offsetWidth;
            modalName.setAttribute("display", true);
        }
    }
}

const xuiModalClose = (name) => {
    let modalName = document.querySelector("[xui-modal=\"" + name + "\"]");
    if (modalName !== null) {
        if (modalName.hasAttribute("xui-present")) {
            modalName.removeAttribute("xui-present");
            void modalName.offsetWidth;
            modalName.setAttribute("xui-present", false);
        } else {
            modalName.removeAttribute("display");
            void modalName.offsetWidth;
            modalName.setAttribute("display", false);
        }
    }
}

const xuiDynamicCSS = () => {
    // Configuration
    const config = {
        styleId: "xui-dynamic-css-styles",
        propertyMap: {
            "xui-bg": "background",
            "xui-text": "color",
            "xui-column-count": "column-count",
            "xui-column-count-gap": "column-gap",
            "xui-m": "margin",
            "xui-mt": "margin-top",
            "xui-mr": "margin-right",
            "xui-mb": "margin-bottom",
            "xui-ml": "margin-left",
            "xui-mx": ["margin-left", "margin-right"],
            "xui-my": ["margin-top", "margin-bottom"],
            "xui-p": "padding",
            "xui-pt": "padding-top",
            "xui-pr": "padding-right",
            "xui-pb": "padding-bottom",
            "xui-pl": "padding-left",
            "xui-px": ["padding-left", "padding-right"],
            "xui-py": ["padding-top", "padding-bottom"],
            "xui-space": "letter-spacing",
            "xui-bdr-rad": "border-radius",
            "xui-bdr-w": "border-width",
            "xui-z-index": "z-index",
            "xui-min-w": "min-width",
            "xui-min-h": "min-height",
            "xui-max-w": "max-width",
            "xui-max-h": "max-height",
            "xui-font-w": "font-weight",
            "xui-font-sz": "font-size",
            "xui-opacity": "opacity",
            "xui-w": "width",
            "xui-h": "height",
            "xui-line-height": "line-height",
            "xui-letter-spacing": "letter-spacing",
            "xui-grid-gap": "grid-gap"
        },
        responsiveMap: {
            "xui-sm": "(min-width: 640px)",
            "xui-md": "(min-width: 768px)",
            "xui-lg": "(min-width: 1024px)",
            "xui-xl": "(min-width: 1280px)",
        }
    };

    let styleElement = null;
    const appliedRules = new Set();

    const initStyleElement = () => {
        if (!document.head) return false;
        
        styleElement = document.getElementById(config.styleId);
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = config.styleId;
            document.head.appendChild(styleElement);
        }
        return true;
    };

    const generateValidCSSClass = (str) => {
        return str.replace(/[^a-zA-Z0-9-]/g, '-')
                 .replace(/-+/g, '-')
                 .replace(/^-|-$/g, '');
    };

    const processClass = (cls) => {
        // Match ONLY square-bracket classes (e.g., xui-[...], xui-lg-[...], xui-bg-[...])
        const match = cls.match(/xui-(sm|md|lg|xl)?-?([a-z-]+)?-\[([^\]]+)\]/);
        if (!match) return null; // Skip if not a bracket class

        const [, breakpoint, propKey, value] = match;
        const prop = propKey ? config.propertyMap[`xui-${propKey}`] : null;

        // If no propKey (e.g., xui-[72px]), default to "font-size"
        const cssProperty = prop || (propKey ? null : "font-size");
        if (!cssProperty) {
            console.warn(`No property mapping found for: ${propKey}`);
            return null;
        }

        const safeValue = value.trim();
        const selectorClass = generateValidCSSClass(cls);
        const selector = `.${selectorClass}`;

        // Handle responsive classes (e.g., xui-lg-[72px])
        if (breakpoint && config.responsiveMap[`xui-${breakpoint}`]) {
            const mediaQuery = config.responsiveMap[`xui-${breakpoint}`];
            
            // Handle multiple properties (like mx, px, etc.)
            if (Array.isArray(cssProperty)) {
                const properties = cssProperty.map(p => `${p}: ${safeValue}`).join('; ');
                return {
                    rule: `@media ${mediaQuery} { ${selector} { ${properties} } }`,
                    selectorClass
                };
            }
            
            return {
                rule: `@media ${mediaQuery} { ${selector} { ${cssProperty}: ${safeValue}; } }`,
                selectorClass
            };
        }

        // Handle regular bracket classes (e.g., xui-[72px], xui-bg-[#FF0000])
        if (Array.isArray(cssProperty)) {
            const properties = cssProperty.map(p => `${p}: ${safeValue}`).join('; ');
            return {
                rule: `${selector} { ${properties} }`,
                selectorClass
            };
        }
        
        return {
            rule: `${selector} { ${cssProperty}: ${safeValue}; }`,
            selectorClass
        };
    };

    const processElements = () => {
        if (!styleElement) return;

        // Clear existing rules
        if (styleElement.sheet) {
            while (styleElement.sheet.cssRules.length > 0) {
                styleElement.sheet.deleteRule(0);
            }
        } else {
            styleElement.textContent = '';
        }
        appliedRules.clear();

        // Process all elements with xui- classes
        document.querySelectorAll('[class*="xui-"]').forEach(el => {
            const classes = el.className.split(/\s+/);
            
            classes.forEach(cls => {
                if (!cls.startsWith('xui-') || appliedRules.has(cls)) return;
                
                const result = processClass(cls);
                if (!result || !result.rule) return;

                try {
                    if (styleElement.sheet) {
                        styleElement.sheet.insertRule(result.rule, styleElement.sheet.cssRules.length);
                    } else {
                        styleElement.textContent += result.rule + '\n';
                    }
                    appliedRules.add(cls);
                    
                    if (!el.classList.contains(result.selectorClass)) {
                        el.classList.add(result.selectorClass);
                    }
                } catch (e) {
                    console.error(`Error inserting rule for ${cls}:`, e);
                }
            });
        });
    };

    const init = () => {
        if (!initStyleElement()) {
            setTimeout(init, 50);
            return;
        }
        
        processElements();
        
        // Improved MutationObserver
        const observer = new MutationObserver((mutations) => {
            let needsUpdate = false;
            
            mutations.forEach((mutation) => {
                // Case 1: Direct class attribute change
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const oldClasses = mutation.oldValue ? mutation.oldValue.split(/\s+/) : [];
                    const newClasses = mutation.target.className.split(/\s+/);
                    
                    // Check if any xui- classes were added/removed
                    const hadXui = oldClasses.some(c => c.startsWith('xui-'));
                    const hasXui = newClasses.some(c => c.startsWith('xui-'));
                    
                    if (hadXui || hasXui) needsUpdate = true;
                }
                
                // Case 2: New nodes added with xui- classes
                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1 && (
                            node.classList?.contains('xui-') || 
                            node.querySelector?.('[class*="xui-"]')
                        )) {
                            needsUpdate = true;
                        }
                    });
                }
            });
            
            if (needsUpdate) {
                processElements();
            }
        });

        observer.observe(document.body, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['class'],
            attributeOldValue: true // Needed to track class changes
        });
    };

    init();

    return {
        refresh: processElements, // Call this if changes aren't detected
        destroy: () => {
            if (styleElement?.parentNode) {
                styleElement.parentNode.removeChild(styleElement);
            }
            appliedRules.clear();
        }
    };
};

const setupEventListeners = () => {
    // Event Handlers (keep your existing implementations)
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

    document.addEventListener("click", (e) => {
        // Functionalities for navabar goes here
        const xuiNavbar = document.getElementsByClassName('xui-navbar');
        if (xuiNavbar.length > 0) {
            const xuiNavbarMenu = document.querySelector(".xui-navbar .menu");
            const xuiNavbarLinksMain = document.querySelector(".xui-navbar .links .main");
            const xuiDashboard = document.querySelector(".xui-dashboard");
            const xuiDashboardAnimate = document.querySelector(".xui-dashboard.animate");
            const xuiNavbarLinksUrl = document.querySelectorAll(".xui-navbar .links a");
            if(e.target.closest(".xui-navbar .menu")){
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

        if (e.target.hasAttribute("xui-modal")) {
            for (let i = 0; i < modals.length; i++) {
                let modalName = modals[i];
                if (!modalName.hasAttribute('disable-click-on-outside')) {
                    if (currentModal === modalName.getAttribute('xui-modal')) {
                        if (modalName.hasAttribute('xui-set')) {
                            modalName.removeAttribute("xui-present");
                            void modalName.offsetWidth;
                            modalName.setAttribute("xui-present", false);
                        } else if (modalName.hasAttribute('display')) {
                            modalName.removeAttribute("display");
                            void modalName.offsetWidth;
                            modalName.setAttribute("display", false);
                        }
                    }
                }
            }
            let xuiBody = document.querySelector('body');
            if (xuiBody !== null) {
                xuiBody.style.overflow = "auto";
            }
        }

        const target = e.target;
        let modalOpen = target.getAttribute("xui-modal-open");
        let modalClose = target.getAttribute("xui-modal-close");

        // Find modalOpen if not directly on target
        if (!modalOpen) {
            const parentNode = findElementWithAttribute(target, "xui-modal-open");
            if (parentNode) {
                modalOpen = parentNode.getAttribute("xui-modal-open");
            }
        }

        // Find modalClose if not directly on target
        if (!modalClose) {
            const parentNode = findElementWithAttribute(target, "xui-modal-close");
            if (parentNode) {
                modalClose = parentNode.getAttribute("xui-modal-close");
            }
        }

        if (modalOpen !== null) {
            let xuiModalOpen = document.querySelector('[xui-modal="' + modalOpen + '"]');
            if (xuiModalOpen !== null) {
                if (xuiModalOpen.hasAttribute("xui-present")) {
                    xuiModalOpen.removeAttribute("xui-present");
                    void xuiModalOpen.offsetWidth;
                    xuiModalOpen.setAttribute("xui-present", true);
                } else {
                    xuiModalOpen.removeAttribute("display");
                    void xuiModalOpen.offsetWidth;
                    xuiModalOpen.setAttribute("display", true);
                }
            }
            let xuiBody = document.querySelector('body');
            if (xuiBody !== null) {
                xuiBody.style.overflow = "hidden";
            }
        }

        if (modalClose !== null) {
            let xuiModalClose = document.querySelector('[xui-modal="' + modalClose + '"]');
            if (xuiModalClose !== null) {
                if (xuiModalClose.hasAttribute("xui-present")) {
                    xuiModalClose.removeAttribute("xui-present");
                    void xuiModalClose.offsetWidth;
                    xuiModalClose.setAttribute("xui-present", false);
                } else {
                    xuiModalClose.removeAttribute("display");
                    void xuiModalClose.offsetWidth;
                    xuiModalClose.setAttribute("display", false);
                }
            }
            let xuiBody = document.querySelector('body');
            if (xuiBody !== null) {
                xuiBody.style.overflow = "auto";
            }
        }
        // Functionalities for modal goes here

        // Functionalities for accordion goes here
        const accordionHeaders = Array.from(document.querySelectorAll('.xui-accordion-box .xui-accordion-header, .xui-accordion .box .header'));

        if (e.target.closest('.xui-accordion-box .xui-accordion-header, .xui-accordion .box .header')) {
            const header = e.target.closest('.xui-accordion-box .xui-accordion-header, .xui-accordion .box .header');
            const index = accordionHeaders.indexOf(header);
            
            // Find elements using all possible selector variations
            const iconOpen = header.querySelector(".xui-accordion-header-icon-open, .xui-accordion .header .icon .open");
            const iconClose = header.querySelector(".xui-accordion-header-icon-close, .xui-accordion .header .icon .close");
            const allContents = document.querySelectorAll('.xui-accordion-box .xui-accordion-content, .xui-accordion .box .content');
            const content = allContents[index];

            // Check if the clicked accordion is currently open
            const isCurrentlyOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

            // Close all accordions
            allContents.forEach(content => {
                content.style.maxHeight = "0";
                content.style.marginBottom = "0";
            });

            // Reset all icons
            document.querySelectorAll('.xui-accordion-header-icon-open, .xui-accordion .header .icon .open').forEach(icon => {
                icon.style.display = "inline-block";
            });
            document.querySelectorAll('.xui-accordion-header-icon-close, .xui-accordion .header .icon .close').forEach(icon => {
                icon.style.display = "none";
            });

            // Toggle the clicked accordion if it wasn't open
            if (!isCurrentlyOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.marginBottom = "20px";
                if (iconOpen) iconOpen.style.display = "none";
                if (iconClose) iconClose.style.display = "inline-block";
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
}

// Application System
let isApplied = false;
const appliedComponents = new Set();

const applyComponent = (name, initFn) => {
    if (appliedComponents.has(name)) return;
    appliedComponents.add(name);
    try {
      initFn();
    } catch (e) {
      console.error(`Failed to initialize ${name}:`, e);
    }
};

const apply = () => {
    if (isApplied) return;
    
    const init = () => {
      isApplied = true;
      // Initialize components in correct order
      applyComponent('dynamicCSS', xuiDynamicCSS); // First
      applyComponent('loadingScreen', xuiLoadingScreen);
      applyComponent('alerts', xuiAlerts);
      applyComponent('lazyLoad', xuiLazyLoadings);
      applyComponent('scrollAnimation', xuiScrollOnAnimation);
      setupEventListeners();
    };
  
    // Handle DOM readiness
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      init();
    } else {
      document.addEventListener('DOMContentLoaded', init);
    }
};

// Core Runner
function xuiRun() {
    apply();
}

// Main Framework Object
const stylexui = {
    // Core Functions
    run: apply,
    apply,

    // Control Functions
    control: {
        navbar: () => {
            // Navbar control implementation
        },
        loader: xuiLoadingScreen
    },
    
    // Animation Functions
    animate: {
        default: xuiAnime,
        start: xuiAnimeStart,
        end: xuiAnimeEnd
    },
    
    // Effect Functions
    effect: {
        typewriter: xuiTypeWriter
    },
    
    // UI Reveal Functions
    reveal: {
        images: xuiLazyLoadings,
        skeletons: xuiHideSkeleton
    },
    
    // Modal Functions
    modal: {
        show: xuiModalShow,
        hide: xuiModalHide,
        open: xuiModalOpen,
        close: xuiModalClose
    }
};

// Export all functionality
export {
    findElementWithAttribute,
    isHidden,
    xuiLoadingScreen as loadingScreen,
    xuiHideSkeleton as hideSkeleton,
    xuiModalShow as modalShow,
    xuiModalHide as modalHide,
    xuiModalOpen as modalOpen,
    xuiModalClose as modalClose,
    xuiAlerts as alerts,
    xuiLazyLoadings as lazyLoadings,
    xuiAnime as animate,
    xuiAnimeStart as animateStart,
    xuiAnimeEnd as animateEnd,
    xuiTypeWriter as typewriter,
    xuiScrollOnAnimation as scrollOnAnimation,
    xuiDynamicCSS as dynamicCSS,
    xuiRun as run,
    apply
};

// Default export
export default stylexui;

// Browser global attachment
if (typeof window !== 'undefined') {
    window.stylexui = stylexui;
}

// Auto-application - only if in browser environment
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const init = () => {
        // Check if already initialized by user
        if (!isApplied) {
            console.log('Auto-initializing StyleXUI...');
            apply();
        }
    };
    
    // Run either now or when DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(init, 0);
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
}