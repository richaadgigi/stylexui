declare module '@richaadgigi/stylexui' {
    function xuiLoadingScreen(): void;
    function xuiHideSkeleton(ele: string | null): void;
    function xuiModal(): void;
    function xuiAccordion(): void;
    function xuiAlerts(): void;
    function xuiLazyLoadings(): void;
    function xuiAnime(customDefinition?: string): void;
    function xuiAnimeStart(customDefinition?: string): void;
    function xuiAnimeEnd(customDefinition?: string): void;
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