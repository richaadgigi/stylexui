const findElementWithAttribute = (element: Element | null, attributeName: string): Element | null => {
    while (element) {
        if (element.hasAttribute(attributeName)) {
            return element;
        }
        element = element.parentElement;
    }
    return null;
};

const isHidden = (el: Element): boolean => {
    const style = window.getComputedStyle(el);
    return style.display === 'none';
};

export const xuiLoadingScreen = (): void => {
    const loader = document.querySelector<HTMLElement>(".xui-loader");
    if (loader !== null) {
        loader.style.display = "flex";
    }

    const stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            clearInterval(stateCheck);

            setTimeout(() => {
                if (loader !== null) {
                    loader.style.display = "none";
                }
            }, 1000);
        }
    }, 100);
};

export const xuiHideSkeleton = (ele?: Element): void => {
    setTimeout(() => {
        const selector = ele ? `${ele} .xui--skeleton, ${ele} .xui--skeleton-btn-small` : ".xui--skeleton, .xui--skeleton-btn-small";
        const elements = document.querySelectorAll<HTMLElement>(selector);
        
        elements.forEach(element => {
            element.classList.add("hidden");
        });
    }, 2500);
};

export const xuiModal = (): void => {
    const modals = document.querySelectorAll<HTMLElement>('[xui-modal]');

    const manageBodyOverflow = () => {
        modals.forEach((modal) => {
            const display = modal.style.transform;
            const xuiBody = document.querySelector<HTMLElement>('body');
            if (xuiBody !== null) {
                xuiBody.style.overflow = display === "scale(1)" ? "hidden" : "auto";
            }
        });
    };

    setInterval(manageBodyOverflow, 2000);

    const getParents = (el: HTMLElement, parentSelector?: ParentNode): ParentNode[] => {
        const parents: ParentNode[] = [];
        let p: ParentNode | null = el.parentNode;

        while (p !== parentSelector && p !== null) {
            parents.push(p);
            p = p.parentNode;
        }

        if (parentSelector) {
            parents.push(parentSelector);
        }

        return parents;
    };

    document.onclick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const currentModal = target.getAttribute('xui-modal');
        const modalOpen = target.getAttribute("xui-modal-open") || target.parentElement?.getAttribute("xui-modal-open");
        const modalClose = target.getAttribute("xui-modal-close") || target.parentElement?.getAttribute("xui-modal-close");

        if (currentModal) {
            modals.forEach(modal => {
                if (!modal.hasAttribute('disable-click-on-outside') && currentModal === modal.getAttribute('xui-modal')) {
                    modal.toggleAttribute("open", false);
                }
            });
        }

        if (modalOpen) {
            const xuiModalOpen = document.querySelector<HTMLElement>(`[xui-modal="${modalOpen}"]`);
            if (xuiModalOpen) {
                xuiModalOpen.toggleAttribute("open", true);
                document.body.style.overflow = "hidden";
            }
        }

        if (modalClose) {
            const xuiModalClose = document.querySelector<HTMLElement>(`[xui-modal="${modalClose}"]`);
            if (xuiModalClose) {
                xuiModalClose.toggleAttribute("open", false);
                document.body.style.overflow = "auto";
            }
        }
    };
};

export const xuiAccordion = (): void => {
    const accordionHeaders = document.querySelectorAll<HTMLElement>('.xui-accordion-box .xui-accordion-header');

    accordionHeaders.forEach((header, i) => {
        header.addEventListener('click', () => {
            const accordionHeader = document.querySelectorAll<HTMLElement>('.xui-accordion-box .xui-accordion-header')[i];
            const accordionIconOpen = accordionHeader.querySelector<HTMLElement>(".xui-accordion-header-icon-open");
            const accordionIconClose = accordionHeader.querySelector<HTMLElement>(".xui-accordion-header-icon-close");
            const accordionContent = document.querySelectorAll<HTMLElement>('.xui-accordion-box .xui-accordion-content')[i];

            const isHidden = (el: HTMLElement | null): boolean => el ? window.getComputedStyle(el).display === 'none' : true;

            const updateAccordionDisplay = (display: string, iconOpen: HTMLElement | null, iconClose: HTMLElement | null, content: HTMLElement | null) => {
                if (iconOpen) iconOpen.style.display = display === "block" ? "none" : "inline-block";
                if (iconClose) iconClose.style.display = display === "block" ? "inline-block" : "none";
                if (content) content.style.display = display;
            };

            document.querySelectorAll<HTMLElement>('.xui-accordion-box').forEach(box => {
                const content = box.querySelector<HTMLElement>('.xui-accordion-content');
                const iconOpen = box.querySelector<HTMLElement>(".xui-accordion-header-icon-open");
                const iconClose = box.querySelector<HTMLElement>(".xui-accordion-header-icon-close");
                updateAccordionDisplay("none", iconOpen, iconClose, content);
            });

            updateAccordionDisplay(isHidden(accordionContent) ? "block" : "none", accordionIconOpen, accordionIconClose, accordionContent);
        });
    });
};

export const xuiAlerts = (): void => {
    const alertBoxesClose = document.querySelectorAll<HTMLElement>('.xui-alert .xui-alert-close');

    alertBoxesClose.forEach((closeBtn, i) => {
        closeBtn.addEventListener('click', () => {
            const alertBox = document.querySelectorAll<HTMLElement>('.xui-alert')[i];
            const alertBoxAnimation = alertBox.classList.contains('xui-anime');
            const animationDuration = alertBox.getAttribute("xui-anime-duration");

            if (alertBoxAnimation) {
                const duration = animationDuration ? parseFloat(animationDuration) : 1;
                alertBox.style.transition = `${duration}s`;
                alertBox.classList.remove("xui-anime");
                setTimeout(() => {
                    alertBox.style.transition = "";
                }, duration * 1000);
            } else {
                alertBox.style.cssText = "overflow: hidden; padding: 0; margin: 0; height: 0; transition: .2s;";
            }
        });
    });
};

export const xuiLazyLoadings = (): void => {
    (function () {
        const elements: NodeListOf<HTMLElement> = document.querySelectorAll('[xui-bg-img]');
        let index = 0;

        const lazyLoad = (): void => {
            if (index >= elements.length) return;

            const item = elements[index];
            if ((window.scrollY + window.innerHeight) > item.offsetTop) {
                const src = item.getAttribute("xui-bg-img");
                if (src) {
                    item.style.backgroundImage = `url('${src}')`;
                    item.addEventListener('load', function () {
                        item.removeAttribute('xui-bg-img');
                    });
                }
                index++;
                lazyLoad();
            }
        };

        const init = (): void => {
            window.addEventListener('scroll', lazyLoad);
            lazyLoad();
        };

        return init();
    })();

    (function () {
        const elements: NodeListOf<HTMLImageElement> = document.querySelectorAll('[xui-img-src]');
        let index = 0;

        const lazyLoad = (): void => {
            if (index >= elements.length) return;

            const item = elements[index];
            if ((window.scrollY + window.innerHeight) > item.offsetTop) {
                const src = item.getAttribute("xui-img-src");
                if (src) {
                    item.src = src;
                    item.addEventListener('load', function () {
                        item.removeAttribute('xui-img-src');
                    });
                }
                index++;
                lazyLoad();
            }
        };

        const init = (): void => {
            window.addEventListener('scroll', lazyLoad);
            lazyLoad();
        };

        return init();
    })();
};

export const xuiAnime = (customDefinition?: string): void => {
    if (customDefinition) {
        const el = document.querySelector<HTMLElement>(`[xui-custom="${customDefinition}"]`);
        if (el) {
            const elAnimateReverse = el.getAttribute("xui-anime-reverse");
            const elAnimateDuration = el.getAttribute("xui-anime-duration");
            el.style.transition = elAnimateDuration ? `${elAnimateDuration}s` : "1s";

            setTimeout(() => {
                if (el) {
                    el.classList.add("xui-anime");
                }
            });

            setTimeout(() => {
                if (elAnimateReverse) {
                    const duration = Number(elAnimateReverse) * 1000;
                    setTimeout(() => {
                        if (el) {
                            el.classList.remove("xui-anime");
                        }
                    }, duration);
                } else {
                    setTimeout(() => {
                        if (el) {
                            el.classList.remove("xui-anime");
                        }
                    }, 3000);
                }
            }, elAnimateDuration ? Number(elAnimateDuration) * 1000 : 1000);
        }
    } else {
        console.warn("xui.animate() is missing a parameter");
    }
};

export const xuiAnimeStart = (customDefinition?: string): void => {
    if (customDefinition) {
        const el = document.querySelector<HTMLElement>(`[xui-custom="${customDefinition}"]`);
        if (el) {
            const elAnimateDuration = el.getAttribute("xui-anime-duration");
            el.style.transition = elAnimateDuration ? `${elAnimateDuration}s` : "1s";

            setTimeout(() => {
                if (el) {
                    el.classList.add("xui-anime");
                }
            });
        }
    } else {
        console.warn("xui.animate() is missing a parameter");
    }
};

export const xuiAnimeEnd = (customDefinition?: string): void => {
    if (customDefinition) {
        const el = document.querySelector<HTMLElement>(`[xui-custom="${customDefinition}"]`);
        if (el) {
            const elAnimateDuration = el.getAttribute("xui-anime-duration");
            el.style.transition = elAnimateDuration ? `${elAnimateDuration}s` : "1s";

            setTimeout(() => {
                if (el) {
                    el.classList.remove("xui-anime");
                }
            });
        }
    } else {
        console.warn("xui.animate() is missing a parameter");
    }
};

export interface TypeWriterConfig {
    words?: string[];
    duration?: number;
    target: string;
    delay?: number;
    cursor?: boolean;
}

export const xuiTypeWriter = (obj: TypeWriterConfig): void => {
    let quoteArray = obj.words || ["Hello friend 👋. This is a default text from XUI. I hope you're enjoying this", "It can be changed as well! Just like this."];
    let speed = obj.duration ?? 1000;
    let target = obj.target;
    let delay = obj.delay ?? 1000;
    let cursor = obj.cursor;
    let textPosition = 0;

    const typeWriterElement = document.querySelector<HTMLSpanElement>(`.xui-effect-typewriter[xui-effect-typewriter="${target}"]`);
    
    if (typeWriterElement) {
        typeWriterElement.innerHTML += '<span class="xui-effect-typewriter-content"></span>';
        
        if (cursor) {
            typeWriterElement.innerHTML += '<span class="xui-effect-typewriter-cursor"></span>';
        }
        
        const contentElement = document.querySelector<HTMLSpanElement>(`.xui-effect-typewriter[xui-effect-typewriter="${target}"] span.xui-effect-typewriter-content`);
        const textArray = quoteArray;

        const delWriter = (text: string, i: number, cb?: () => void) => {
            if (i >= 0) {
                if (contentElement) {
                    contentElement.innerHTML = text.substring(0, i--);
                }
                setTimeout(() => delWriter(text, i, cb), speed);
            } else if (cb) {
                setTimeout(cb, speed);
            }
        };

        const typeWriter = (text: string, i: number, cb?: () => void) => {
            if (textArray.length > 1) {
                if (i < text.length + 1) {
                    if (contentElement) {
                        contentElement.innerHTML = text.substring(0, i++);
                    }
                    setTimeout(() => typeWriter(text, i, cb), speed);
                } else if (i === text.length + 1) {
                    setTimeout(() => delWriter(text, i, cb), delay);
                }
            } else {
                if (i < text.length + 1) {
                    if (contentElement) {
                        contentElement.innerHTML = text.substring(0, i++);
                    }
                    setTimeout(() => typeWriter(text, i, cb), speed);
                } else if (i === text.length + 1) {
                    const typeWriterEffectTarget = document.querySelector<HTMLElement>(`.xui-effect-typewriter[xui-effect-typewriter="${target}"]`);
                    if (typeWriterEffectTarget) {
                        typeWriterEffectTarget.classList.add("xui-effect-typewriter-ready");
                    }
                    const typeWriterEffectCursor = document.querySelector<HTMLSpanElement>(`.xui-effect-typewriter[xui-effect-typewriter="${target}"] span.xui-effect-typewriter-cursor`);
                    if (typeWriterEffectCursor) {
                        typeWriterEffectCursor.style.display = "none";
                    }
                }
            }
        };

        const StartWriter = (i: number) => {
            if (typeof textArray[i] === "undefined") {
                setTimeout(() => StartWriter(0), delay);
            } else if (i < textArray[i].length + 1) {
                typeWriter(textArray[i], 0, () => StartWriter(i + 1));
            }
        };

        setTimeout(() => StartWriter(0), delay);
    } else {
        console.error(`[xui-effect-typewriter="${target}"] not found`);
    }
};

export const xuiScrollOnAnimation = (): void => {
    const xuiBody = document.querySelector("body");
    if (xuiBody && xuiBody.classList.contains('xui-aos')) {
        const metaViewPort = document.querySelector<HTMLMetaElement>("meta[name=\"viewport\"]");
        if (metaViewPort) {
            metaViewPort.setAttribute("content", "width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=no");
        }

        if ('IntersectionObserver' in window) {
            const xuiScroll = (ele: Element, repeat: boolean, rootMargin: string) => {
                const observer = new IntersectionObserver((entries) => {
                    const deviceWidth = window.outerWidth;
                    let duration: string | null = null;
                    let delay: number | null = null;

                    const target = entries[0].target as HTMLElement;

                    if (deviceWidth > 576 && deviceWidth < 768) {
                        duration = target.getAttribute("xui-sm-aos-duration");
                        delay = Number(target.getAttribute("xui-sm-aos-delay") || 0) * 1000;
                    } else if (deviceWidth > 768 && deviceWidth < 992) {
                        duration = target.getAttribute("xui-md-aos-duration");
                        delay = Number(target.getAttribute("xui-md-aos-delay") || 0) * 1000;
                    } else if (deviceWidth > 992 && deviceWidth < 1200) {
                        duration = target.getAttribute("xui-lg-aos-duration");
                        delay = Number(target.getAttribute("xui-lg-aos-delay") || 0) * 1000;
                    } else if (deviceWidth > 1200) {
                        duration = target.getAttribute("xui-xl-aos-duration");
                        delay = Number(target.getAttribute("xui-xl-aos-delay") || 0) * 1000;
                    } else {
                        duration = target.getAttribute("xui-aos-duration");
                        delay = Number(target.getAttribute("xui-aos-delay") || 0) * 1000;
                    }

                    target.style.animationDuration = duration ? `${duration}s` : ".5s";
                    target.style.transition = duration ? `${duration}s` : ".5s";

                    if (entries[0].isIntersecting) {
                        if (delay) {
                            setTimeout(() => {
                                target.classList.add("xui-aos-animate");
                            }, delay);
                        } else {
                            target.classList.add("xui-aos-animate");
                        }
                        if (repeat) {
                            observer.unobserve(target);
                        }
                    } else {
                        target.classList.remove("xui-aos-animate");
                    }
                }, { rootMargin, threshold: 0 });

                observer.observe(ele);
            };

            const xuiAOS = document.querySelectorAll("[xui-aos]");
            for (let i = 0; i < xuiAOS.length; i++) {
                const element = xuiAOS[i];
                const deviceWidth = window.outerWidth;
                let offset: number | null = null;

                if (deviceWidth > 576 && deviceWidth < 768) {
                    offset = Number(element.getAttribute("xui-sm-aos-offset") || element.getAttribute("xui-aos-offset"));
                } else if (deviceWidth > 768 && deviceWidth < 992) {
                    offset = Number(element.getAttribute("xui-md-aos-offset") || element.getAttribute("xui-sm-aos-offset") || element.getAttribute("xui-aos-offset"));
                } else if (deviceWidth > 992 && deviceWidth < 1200) {
                    offset = Number(element.getAttribute("xui-lg-aos-offset") || element.getAttribute("xui-md-aos-offset") || element.getAttribute("xui-sm-aos-offset") || element.getAttribute("xui-aos-offset"));
                } else if (deviceWidth > 1200) {
                    offset = Number(element.getAttribute("xui-xl-aos-offset") || element.getAttribute("xui-lg-aos-offset") || element.getAttribute("xui-md-aos-offset") || element.getAttribute("xui-sm-aos-offset") || element.getAttribute("xui-aos-offset"));
                } else {
                    offset = Number(element.getAttribute("xui-aos-offset"));
                }

                const getNoRepeatAttr = element.hasAttribute("xui-aos-once");
                const rootMargin = offset ? `0px 0px -${offset}%` : "0px 0px -5%";

                xuiScroll(element, getNoRepeatAttr, rootMargin);
            }
        }
    }
};

export const xuiModalShow = (name: string): void => {
    const modalName = document.querySelector<HTMLElement>(`[xui-modal="${name}"]`);
    if (modalName) {
        modalName.removeAttribute("display");
        void modalName.offsetWidth;
        modalName.setAttribute("display", "true");
    }
};

export const xuiModalHide = (name: string): void => {
    const modalName = document.querySelector<HTMLElement>(`[xui-modal="${name}"]`);
    if (modalName) {
        modalName.removeAttribute("display");
        void modalName.offsetWidth;
        modalName.setAttribute("display", "false");
    }
};

// Check for dark mode on initial load
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
    const qs = document.querySelector<HTMLElement>("[xui-mode=\"auto\"]");
    if (qs) {
        qs.classList.add("xui-dark-mode");
    }
}

// Listen for changes in the color scheme preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event: MediaQueryListEvent) => {
    const newColorScheme = event.matches ? "dark" : "light";
    const xuiModeAuto = document.querySelector("[xui-mode=\"auto\"]") as HTMLElement | null;
    
    if (xuiModeAuto) {
        if (newColorScheme === "dark") {
            xuiModeAuto.classList.add("xui-dark-mode");
        } else {
            xuiModeAuto.classList.remove("xui-dark-mode");
        }
    }
});

const xuiRun = (): void => {
    xuiLazyLoadings();
    xuiModal();
    xuiAccordion();
    xuiAlerts();
    xuiScrollOnAnimation();
};

export const xui = {
    run: (): void => {
        xuiRun();
    },
    control: {
        loader: (): void => {
            xuiLoadingScreen();
        }
    },
    animate: {
        default: (custom: any): void => {
            xuiAnime(custom);
        },
        start: (custom: any): void => {
            xuiAnimeStart(custom);
        },
        end: (custom: any): void => {
            xuiAnimeEnd(custom);
        }
    },
    effect: {
        typewriter: (obj: any): void => {
            if (obj === undefined || obj === null) {
                console.warn("Parse an object");
            } else {
                xuiTypeWriter(obj);
            }
        }
    },
    reveal: {
        images: (): void => {
            xuiLazyLoadings();
        },
        skeletons: (ele: Element): void => {
            xuiHideSkeleton(ele);
        }
    },
    modal: {
        show: (name: string): void => {
            const modalName = document.querySelector<HTMLElement>(`[xui-modal="${name}"]`);
            if (modalName !== null) {
                modalName.removeAttribute("open");
                void modalName.offsetWidth; // Trigger reflow
                modalName.setAttribute("open", "true");
            }
        },
        hide: (name: string): void => {
            const modalName = document.querySelector<HTMLElement>(`[xui-modal="${name}"]`);
            if (modalName !== null) {
                modalName.removeAttribute("open");
                void modalName.offsetWidth; // Trigger reflow
                modalName.setAttribute("open", "false");
            }
        }
    }
};

function autoRun(): void {
    const body = document.querySelector("body");
    if (body !== null) {
        const xuiRun = body.getAttribute("xui-run");
        if (xuiRun !== null) {
            if (xuiRun !== "true") {
                xui.run();
            }
        } else {
            xui.run();
        }
    }
}

// For modules usage
function Stylexui(): void {
    document.addEventListener("click", (e: MouseEvent) => {
        console.log('Ld');
        console.log(e.target);

        // Cast e.target to HTMLElement to access its properties
        const target = e.target as HTMLElement;

        // Functionalities for navbar
        const xuiNavbar = document.getElementsByClassName('xui-navbar');
        if (xuiNavbar.length > 0) {
            const xuiNavbarMenu = document.querySelector(".xui-navbar .menu") as HTMLElement | null;
            const xuiNavbarLinksMain = document.querySelector(".xui-navbar .links .main") as HTMLElement | null;
            const xuiDashboard = document.querySelector(".xui-dashboard") as HTMLElement | null;
            const xuiDashboardAnimate = document.querySelector(".xui-dashboard.animate") as HTMLElement | null;
            const xuiNavbarLinksUrl = document.querySelectorAll(".xui-navbar .links a");

            if (target === xuiNavbarMenu) {
                if (target.classList.contains('animate')) {
                    xuiDashboard?.classList.remove("animate");
                    xuiNavbarLinksMain?.classList.remove("animate");
                    xuiNavbarMenu.classList.remove("animate");
                } else {
                    xuiDashboard?.classList.add("animate");
                    xuiNavbarLinksMain?.classList.add("animate");
                    xuiNavbarMenu.classList.add("animate");
                }
            }

            if (target === xuiDashboard) {
                if (target.classList.contains('animate')) {
                    xuiDashboard?.classList.remove("animate");
                    xuiNavbarMenu?.classList.remove("animate");
                }
            }

            // Closing animations when a link with url is clicked
            if (target.closest('.xui-navbar .links .main a') || target.closest('.xui-dashboard .navigator .links a')) {
                const href = target.getAttribute("href");
                if (href !== "#" && href !== "") {
                    xuiNavbarMenu?.classList.remove("animate");
                    xuiDashboard?.classList.remove("animate");
                    xuiNavbarLinksMain?.classList.remove("animate");
                }
            }
        }

        // Functionalities for modal
        const modals = document.querySelectorAll('[xui-modal]');
        const currentModal = target.getAttribute('xui-modal');
        if (target.hasAttribute("xui-modal")) {
            modals.forEach(modal => {
                const modalElement = modal as HTMLElement;
                if (!modalElement.hasAttribute('disable-click-on-outside')) {
                    if (currentModal === modalElement.getAttribute('xui-modal')) {
                        if (modalElement.hasAttribute('display')) {
                            modalElement.removeAttribute("display");
                            void modalElement.offsetWidth;
                            modalElement.setAttribute("display", "false");
                        }
                    }
                }

                const xuiBody = document.querySelector('body') as HTMLElement | null;
                if (xuiBody) {
                    xuiBody.style.overflow = "auto";
                }
            });
        }

        let modalOpen = target.getAttribute("xui-modal-open");
        let modalClose = target.getAttribute("xui-modal-close");

        if (!modalOpen) {
            const parentNode = findElementWithAttribute(target, "xui-modal-open");
            if (parentNode && parentNode.getAttribute) {
                modalOpen = parentNode.getAttribute("xui-modal-open");
            }
        }

        if (!modalClose) {
            const parentNode = findElementWithAttribute(target, "xui-modal-close");
            if (parentNode && parentNode.getAttribute) {
                modalClose = parentNode.getAttribute("xui-modal-close");
            }
        }

        if (modalOpen !== null) {
            const xuiModalOpen = document.querySelector(`[xui-modal="${modalOpen}"]`) as HTMLElement | null;
            if (xuiModalOpen) {
                xuiModalOpen.removeAttribute("display");
                void xuiModalOpen.offsetWidth;
                xuiModalOpen.setAttribute("display", "true");
            }

            const xuiBody = document.querySelector('body') as HTMLElement | null;
            if (xuiBody) {
                xuiBody.style.overflow = "hidden";
            }
        }

        if (modalClose !== null) {
            const xuiModalClose = document.querySelector(`[xui-modal="${modalClose}"]`) as HTMLElement | null;
            if (xuiModalClose) {
                xuiModalClose.removeAttribute("display");
                void xuiModalClose.offsetWidth;
                xuiModalClose.setAttribute("display", "false");
            }

            const xuiBody = document.querySelector('body') as HTMLElement | null;
            if (xuiBody) {
                xuiBody.style.overflow = "auto";
            }
        }

        // Functionalities for accordion
        const xuiAccordionHeaders = Array.from(document.querySelectorAll('.xui-accordion-box .xui-accordion-header')) as HTMLElement[];
        const closestAccordionHeader = target.closest('.xui-accordion-box .xui-accordion-header') as HTMLElement | null;
        if (closestAccordionHeader) {
            const index = xuiAccordionHeaders.indexOf(closestAccordionHeader);
            const accordionHeader = document.querySelectorAll('.xui-accordion-box .xui-accordion-header')[index] as HTMLElement;
            const accordionIconOpen = accordionHeader.querySelector(".xui-accordion-header-icon-open") as HTMLElement | null;
            const accordionIconClose = accordionHeader.querySelector(".xui-accordion-header-icon-close") as HTMLElement | null;
            const accordionContent = document.querySelectorAll('.xui-accordion-box .xui-accordion-content')[index] as HTMLElement;

            if (isHidden(accordionContent)) {
                document.querySelectorAll('.xui-accordion-box').forEach(accordionBox => {
                    const iconOpen = accordionBox.querySelector(".xui-accordion-header .xui-accordion-header-icon-open") as HTMLElement | null;
                    const iconClose = accordionBox.querySelector(".xui-accordion-header .xui-accordion-header-icon-close") as HTMLElement | null;
                    const content = accordionBox.querySelector('.xui-accordion-content') as HTMLElement | null;

                    if (iconOpen) iconOpen.style.display = "inline-block";
                    if (iconClose) iconClose.style.display = "none";
                    if (content) content.style.display = "none";
                });

                if (accordionIconOpen) accordionIconOpen.style.display = "none";
                if (accordionIconClose) accordionIconClose.style.display = "inline-block";
                if (accordionContent) accordionContent.style.display = "block";
            } else {
                document.querySelectorAll('.xui-accordion-box').forEach(accordionBox => {
                    const iconOpen = accordionBox.querySelector(".xui-accordion-header .xui-accordion-header-icon-open") as HTMLElement | null;
                    const iconClose = accordionBox.querySelector(".xui-accordion-header .xui-accordion-header-icon-close") as HTMLElement | null;
                    const content = accordionBox.querySelector('.xui-accordion-content') as HTMLElement | null;

                    if (iconOpen) iconOpen.style.display = "inline-block";
                    if (iconClose) iconClose.style.display = "none";
                    if (content) content.style.display = "none";
                });
            }
        }

        // Functionalities for dashboard sidebar
        const xuiDashboardContent = document.querySelector('.xui-dashboard .screen .content') as HTMLElement | null;
        const xuiDashboardAside = document.querySelector('.xui-dashboard .screen .aside') as HTMLElement | null;
        const xuiSidebarBtn = document.querySelector(".xui-dashboard .screen .content .xui-open-sidebar") as HTMLElement | null;

        if (target === xuiSidebarBtn) {
            xuiDashboardContent?.classList.add("animate");
            xuiDashboardAside?.classList.add("animate");
        }

        if (target === xuiDashboardContent) {
            xuiDashboardContent?.classList.remove("animate");
            xuiDashboardAside?.classList.remove("animate");
        }
    });

    autoRun();
}

export default Stylexui;