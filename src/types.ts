import type { ReactNode } from 'react';
import type * as ReactNative from 'react-native';

export type TransitionStyle = 'scroll' | 'curl';
export type Orientation = 'horizontal' | 'vertical';
export type OverScrollMode = 'auto' | 'always' | 'never';
export type PageScrollState = 'idle' | 'dragging' | 'settling';

export type ViewPagerOnPageScrollEvent = ReactNative.NativeSyntheticEvent<ViewPagerOnPageScrollEventData>;
export interface ViewPagerOnPageScrollEventData {
  position: number;
  offset: number;
}

export type ViewPagerOnPageSelectedEvent = ReactNative.NativeSyntheticEvent<ViewPagerOnPageSelectedEventData>;
export interface ViewPagerOnPageSelectedEventData {
  position: number;
}

export type PageScrollStateChangedNativeEvent = ReactNative.NativeSyntheticEvent<PageScrollStateChangedEvent>;
export interface PageScrollStateChangedEvent {
  pageScrollState: PageScrollState;
}

export interface ViewPagerProps {
  /**
   * Current visible page index.
   * You can also specify whether page should be changed with animation or without.
   * When pass number animated is set to true
   * Remember to keep activePage in sync with onPageSelect
   */
  activePage?: number | { page: number; animated: boolean };

  /**
   * When false, the content does not scroll.
   * The default value is true.
   */
  scrollEnabled?: boolean;

  /**
   * Executed when transitioning between pages (ether because of animation for
   * the requested page change or when user is swiping/dragging between pages)
   * The `event.nativeEvent` object for this callback will carry following data:
   *  - position - index of first page from the left that is currently visible
   *  - offset - value from range [0,1) describing stage between page transitions.
   *    Value x means that (1 - x) fraction of the page at "position" index is
   *    visible, and x fraction of the next page is visible.
   */
  onPageScroll?: (event: ViewPagerOnPageScrollEvent) => void;

  /**
   * This callback will be called once ViewPager finish navigating to selected page
   * (when user swipes between pages). The `event.nativeEvent` object passed to this
   * callback will have following fields:
   *  - position - index of page that has been selected
   */
  onPageSelected?: (event: ViewPagerOnPageSelectedEvent) => void;

  /**
   * Function called when the page scrolling state has changed.
   * The page scrolling state can be in 3 states:
   * - idle, meaning there is no interaction with the page scroller happening at the time
   * - dragging, meaning there is currently an interaction with the page scroller
   * - settling, meaning that there was an interaction with the page scroller, and the
   *   page scroller is now finishing it's closing or opening animation
   */
  onPageScrollStateChanged?: (event: PageScrollStateChangedNativeEvent) => void;

  /**
   * Determines whether the keyboard gets dismissed in response to a drag.
   *   - 'none' (the default), drags do not dismiss the keyboard.
   *   - 'on-drag', the keyboard is dismissed when a drag begins.
   */
  keyboardDismissMode?: 'none' | 'on-drag';

  /**
   * Blank space to show between pages. This is only visible while scrolling, pages are still
   * edge-to-edge.
   */
  pageMargin?: number;

  style?: ReactNative.StyleProp<ReactNative.ViewStyle>;
  /**
   * Set the number of pages that should be retained to either side
   * of the currently visible page(s). Pages beyond this limit will
   * be recreated from the adapter when needed.
   * Defaults to RecyclerView's caching strategy.
   * The given value must either be larger than 0.
   */
  offscreenPageLimit?: number;

  children: ReactNode;

  /**
   * If a parent `View` wants to prevent a child `View` from becoming responder
   * on a move, it should have this handler which returns `true`.
   *
   * `View.props.onMoveShouldSetResponderCapture: (event) => [true | false]`,
   * where `event` is a synthetic touch event as described above.
   *
   * See http://facebook.github.io/react-native/docs/view.html#onMoveShouldsetrespondercapture
   */
  onMoveShouldSetResponderCapture?: (
    event: ReactNative.GestureResponderEvent
  ) => boolean;

  /**
   * iOS only
   */
  orientation?: Orientation;
  transitionStyle?: TransitionStyle;
  showPageIndicator?: boolean;
  /**
   * Android only
   */
  overScrollMode?: OverScrollMode;
}