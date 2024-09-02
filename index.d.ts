declare module 'stylexui' {
    function findElementWithAttribute(
        element: Element | null,
        attributeName: string
    ): Element | null;
    
    function isHidden(el: Element): boolean;
    function xuiLoadingScreen(): void;
    function xuiHideSkeleton(ele: string | null): void;
    function xuiModal(): void;
    function xuiAccordion(): void;
    function xuiAlerts(): void;
    function xuiLazyLoadings(): void;
    function xuiAnime(customDefinition: string | undefined): void;
    function xuiAnimeStart(customDefinition: string | undefined): void;
    function xuiAnimeEnd(customDefinition: string | undefined): void;
    function xuiTypeWriter(obj: {
        words: string[],
        duration?: number,
        target: string,
        delay?: number,
        cursor?: boolean
    }): void;
    function xuiScrollOnAnimation(): void;
    function xuiModalShow(name: string): void;
    function xuiModalHide(name: string): void;
    export default function Stylexui(): void;
}
