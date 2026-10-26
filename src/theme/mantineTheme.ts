import {
  ActionIcon,
  Button,
  CSSVariablesResolver,
  createTheme,
  Pagination,
  rem,
  SegmentedControl,
} from '@mantine/core';

const DROPDOWN_DEFAULTS = {
  checkIconPosition: 'right' as const,
  maxDropdownHeight: 320,
  comboboxProps: {
    radius: 'lg',
    shadow: 'lg',
    offset: 6,
    transitionProps: { transition: 'pop' as const, duration: 140 },
  },
};

const SOFT_HOVER = 'hsl(var(--foreground) / 0.06)';

const ctaVars = (variant: string | undefined, color: string | undefined, prefix: 'button' | 'ai') => {
  if (color && color !== 'brand') return {};
  if (variant === undefined || variant === 'filled') {
    return {
      [`--${prefix}-bg`]: 'hsl(var(--cta))',
      [`--${prefix}-hover`]: 'hsl(var(--cta-hover))',
      [`--${prefix}-color`]: 'hsl(var(--cta-foreground))',
      [`--${prefix}-hover-color`]: 'hsl(var(--cta-foreground))',
    };
  }
  if (variant === 'default') {
    return {
      [`--${prefix}-bg`]: 'hsl(var(--card))',
      [`--${prefix}-hover`]: 'hsl(var(--muted))',
      [`--${prefix}-color`]: 'hsl(var(--foreground))',
      [`--${prefix}-bd`]: '1px solid hsl(var(--border))',
    };
  }
  if (variant === 'light') {
    return {
      [`--${prefix}-bg`]: 'hsl(var(--muted))',
      [`--${prefix}-hover`]: SOFT_HOVER,
      [`--${prefix}-color`]: 'hsl(var(--foreground))',
      [`--${prefix}-hover-color`]: 'hsl(var(--foreground))',
    };
  }
  return {};
};

export const mantineTheme = createTheme({
  primaryColor: 'brand',
  primaryShade: { light: 5, dark: 5 },
  fontFamily: "'Google Sans Flex', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  fontFamilyMonospace: "ui-monospace, 'SF Mono', Menlo, monospace",
  headings: {
    fontFamily: "'Google Sans Flex', ui-sans-serif, system-ui, sans-serif",
    fontWeight: '650',
    sizes: {
      h1: { fontSize: rem(28), lineHeight: '1.15' },
      h2: { fontSize: rem(22), lineHeight: '1.2' },
      h3: { fontSize: rem(17), lineHeight: '1.3' },
      h4: { fontSize: rem(15), lineHeight: '1.35' },
    },
  },
  defaultRadius: 'md',
  radius: { xs: rem(4), sm: rem(6), md: rem(8), lg: rem(12), xl: rem(16) },
  spacing: { xs: rem(8), sm: rem(12), md: rem(16), lg: rem(24), xl: rem(32) },
  cursorType: 'pointer',
  colors: {
    brand: ['#fff4ec', '#ffe6d3', '#ffcaa5', '#ffab72', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12'],
    dark: ['#d4d5da', '#b0b2ba', '#8a8c95', '#6b6d76', '#303137', '#222327', '#1c1d21', '#16171a', '#111214', '#0b0c0e'],
  },
  shadows: {
    sm: 'var(--shadow-soft)',
    md: 'var(--shadow-card)',
    lg: 'var(--shadow-float)',
  },
  components: {
    Loader: { defaultProps: { type: 'oval' } },
    Alert: { defaultProps: { radius: 'lg', variant: 'light' } },
    Modal: {
      defaultProps: {
        radius: 'xl',
        centered: true,
        overlayProps: { backgroundOpacity: 0.4, blur: 6 },
        transitionProps: { transition: 'pop', duration: 180 },
      },
    },
    Drawer: { defaultProps: { overlayProps: { backgroundOpacity: 0.4, blur: 6 } } },
    Menu: {
      defaultProps: {
        radius: 'lg',
        shadow: 'lg',
        offset: 6,
        transitionProps: { transition: 'pop', duration: 140 },
      },
      classNames: { dropdown: 'app-menu-dropdown', item: 'app-menu-item', label: 'app-menu-label' },
    },
    Popover: { defaultProps: { radius: 'lg', shadow: 'lg' } },
    Tooltip: { defaultProps: { radius: 'sm', openDelay: 250, withArrow: false } },
    Card: { defaultProps: { radius: 'lg', withBorder: true, padding: 'lg' } },
    Paper: { defaultProps: { radius: 'lg' } },
    Badge: { defaultProps: { radius: 'xl', variant: 'light' } },
    Switch: { defaultProps: { size: 'sm' } },
    Input: { defaultProps: { radius: 'md' } },
    TextInput: { defaultProps: { radius: 'md' } },
    PasswordInput: { defaultProps: { radius: 'md' } },
    Textarea: { defaultProps: { radius: 'md' } },
    NumberInput: { defaultProps: { radius: 'md' } },
    Select: { defaultProps: { radius: 'md', ...DROPDOWN_DEFAULTS }, classNames: { dropdown: 'app-menu-dropdown' } },
    MultiSelect: { defaultProps: DROPDOWN_DEFAULTS, classNames: { dropdown: 'app-menu-dropdown' } },
    Autocomplete: { defaultProps: { comboboxProps: DROPDOWN_DEFAULTS.comboboxProps } },
    Tabs: { defaultProps: { color: 'dark' } },
    SegmentedControl: SegmentedControl.extend({ defaultProps: { radius: 'xl' } }),
    Button: Button.extend({
      defaultProps: { radius: 'xl' },
      styles: { label: { fontWeight: 500, letterSpacing: '-0.005em' } },
      vars: (_theme, props) => ({ root: ctaVars(props.variant, props.color, 'button') }),
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: { radius: 'md', variant: 'subtle', color: 'gray' },
      vars: (_theme, props) => ({ root: ctaVars(props.variant, props.color, 'ai') }),
    }),
    Pagination: Pagination.extend({
      defaultProps: { radius: 'xl' },
      vars: () => ({
        root: {
          '--pagination-active-bg': 'hsl(var(--cta))',
          '--pagination-active-color': 'hsl(var(--cta-foreground))',
        },
      }),
    }),
  },
});

const sharedVariables = {
  '--mantine-color-body': 'hsl(var(--background))',
  '--mantine-color-text': 'hsl(var(--foreground))',
  '--mantine-color-dimmed': 'hsl(var(--muted-foreground))',
  '--mantine-color-default': 'hsl(var(--card))',
  '--mantine-color-default-hover': 'hsl(var(--muted))',
  '--mantine-color-default-color': 'hsl(var(--foreground))',
  '--mantine-color-default-border': 'hsl(var(--border))',
  '--mantine-color-placeholder': 'hsl(var(--muted-foreground))',
};

export const mantineCssVariables: CSSVariablesResolver = () => ({
  variables: {},
  light: sharedVariables,
  dark: sharedVariables,
});
