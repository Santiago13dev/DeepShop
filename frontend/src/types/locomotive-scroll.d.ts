declare module 'locomotive-scroll' {
  export interface LocomotiveScrollOptions {
    el?: HTMLElement | null;
    smooth?: boolean;
    multiplier?: number;
    class?: string;
    smartphone?: {
      smooth?: boolean;
    };
    tablet?: {
      smooth?: boolean;
    };
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    update(): void;
    destroy(): void;
    stop(): void;
    start(): void;
    scrollTo(target: string | HTMLElement, options?: any): void;
    scroll: {
      instance: {
        scroll: {
          x: number;
          y: number;
        };
      };
    };
  }
}
