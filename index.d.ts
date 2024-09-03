export declare const xuiLoadingScreen: () => void;
export declare const xuiHideSkeleton: (ele?: Element) => void;
export declare const xuiModal: () => void;
export declare const xuiAccordion: () => void;
export declare const xuiAlerts: () => void;
export declare const xuiLazyLoadings: () => void;
export declare const xuiAnime: (customDefinition?: string) => void;
export declare const xuiAnimeStart: (customDefinition?: string) => void;
export declare const xuiAnimeEnd: (customDefinition?: string) => void;
export interface TypeWriterConfig {
    words?: string[];
    duration?: number;
    target: string;
    delay?: number;
    cursor?: boolean;
}
export declare const xuiTypeWriter: (obj: TypeWriterConfig) => void;
export declare const xuiScrollOnAnimation: () => void;
export declare const xuiModalShow: (name: string) => void;
export declare const xuiModalHide: (name: string) => void;
export declare const xui: {
    run: () => void;
    control: {
        loader: () => void;
    };
    animate: {
        default: (custom: any) => void;
        start: (custom: any) => void;
        end: (custom: any) => void;
    };
    effect: {
        typewriter: (obj: any) => void;
    };
    reveal: {
        images: () => void;
        skeletons: (ele: Element) => void;
    };
    modal: {
        show: (name: string) => void;
        hide: (name: string) => void;
    };
};
declare const Stylexui: () => void;
export default Stylexui;
