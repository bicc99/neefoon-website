import type { CSSProperties } from 'react';

// CSS custom properties (e.g. --c, --t, --p) are not part of the standard
// CSSProperties type. This extension lets them be passed as inline styles
// without losing type safety on the rest of the style object.
export type AqiStyle = CSSProperties & Record<`--${string}`, string | number>;
