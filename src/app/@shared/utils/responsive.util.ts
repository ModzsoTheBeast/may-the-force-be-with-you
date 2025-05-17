import { fromEvent, map, startWith } from 'rxjs';

export const BREAKPOINTS = {
  MOBILE: 600, // Mobile view breakpoint (< 600px)
  TABLET: 992, // Tablet view breakpoint (< 992px)
  DESKTOP: 992, // Desktop view breakpoint (>= 992px)
};

export enum ScreenSize {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
}

export function getCurrentScreenSize(): ScreenSize {
  const width = window.innerWidth;

  if (width < BREAKPOINTS.MOBILE) {
    return ScreenSize.MOBILE;
  } else if (width < BREAKPOINTS.TABLET) {
    return ScreenSize.TABLET;
  } else {
    return ScreenSize.DESKTOP;
  }
}

export function isMobile(): boolean {
  return window.innerWidth < BREAKPOINTS.MOBILE;
}

export function isTablet(): boolean {
  const width = window.innerWidth;
  return width >= BREAKPOINTS.MOBILE && width < BREAKPOINTS.TABLET;
}

export function isDesktop(): boolean {
  return window.innerWidth >= BREAKPOINTS.DESKTOP;
}

export function screenSizeObservable() {
  return fromEvent(window, 'resize').pipe(
    startWith(null),
    map(() => getCurrentScreenSize())
  );
}
