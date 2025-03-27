declare module '@richaadgigi/stylexui' {
  // Utility Types
  interface XUIElement extends HTMLElement {
    [key: string]: any;
  }

  // Core Function Types
  export function findElementWithAttribute(element: HTMLElement, attributeName: string): HTMLElement | null;
  export function isHidden(el: HTMLElement | null): boolean;

  // Loading Screen
  export function xuiLoadingScreen(): void;
  export const loadingScreen: typeof xuiLoadingScreen;

  // Skeleton Loading
  export function xuiHideSkeleton(ele?: string): void;
  export const hideSkeleton: typeof xuiHideSkeleton;

  // Alerts
  export function xuiAlerts(): void;
  export const alerts: typeof xuiAlerts;

  // Lazy Loading
  export function xuiLazyLoadings(): void;
  export const lazyLoadings: typeof xuiLazyLoadings;

  // Animation Functions
  export function xuiAnime(customDefinition: string): void;
  export function xuiAnimeStart(customDefinition: string): void;
  export function xuiAnimeEnd(customDefinition: string): void;
  
  export const animate: typeof xuiAnime;
  export const animateStart: typeof xuiAnimeStart;
  export const animateEnd: typeof xuiAnimeEnd;

  // Typewriter Effect
  interface TypewriterConfig {
    words: string[];
    duration?: number;
    target: string;
    delay?: number;
    cursor?: boolean;
  }
  export function xuiTypeWriter(config: TypewriterConfig): void;
  export const typewriter: typeof xuiTypeWriter;

  // Scroll Animations
  export function xuiScrollOnAnimation(): void;
  export const scrollOnAnimation: typeof xuiScrollOnAnimation;

  // Modal Functions
  export function xuiModalShow(name: string): void;
  export function xuiModalHide(name: string): void;
  export function xuiModalOpen(name: string): void;
  export function xuiModalClose(name: string): void;
  
  export const modalShow: typeof xuiModalShow;
  export const modalHide: typeof xuiModalHide;
  export const modalOpen: typeof xuiModalOpen;
  export const modalClose: typeof xuiModalClose;

  // Dynamic CSS
  export function xuiDynamicCSS(): void;
  export const dynamicCSS: typeof xuiDynamicCSS;

  // Core Runner
  export function xuiRun(): void;
  export const run: typeof xuiRun;

  // Application System
  export function apply(): void;

  // Main Framework Interface
  interface StyleXUI {
    run: typeof xuiRun;
    apply: typeof apply;
    
    control: {
      navbar: () => void;
      loader: typeof xuiLoadingScreen;
    };
    
    animate: {
      default: typeof xuiAnime;
      start: typeof xuiAnimeStart;
      end: typeof xuiAnimeEnd;
    };
    
    effect: {
      typewriter: typeof xuiTypeWriter;
    };
    
    reveal: {
      images: typeof xuiLazyLoadings;
      skeletons: typeof xuiHideSkeleton;
    };
    
    modal: {
      show: typeof xuiModalShow;
      hide: typeof xuiModalHide;
      open: typeof xuiModalOpen;
      close: typeof xuiModalClose;
    };
  }

  const stylexui: StyleXUI;
  export default stylexui;
}