/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts}"],
  safelist: [
    {
      pattern: /.*/,
    },
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          // Base colors
          foreground: "var(--vscode-foreground)",
          background: "var(--vscode-background)",
          "editor-background": "var(--vscode-editor-background)",
          "editor-foreground": "var(--vscode-editor-foreground)",

          // Button colors (primary-like)
          "button-background": "var(--vscode-button-background)",
          "button-foreground": "var(--vscode-button-foreground)",
          "button-hover-background": "var(--vscode-button-hoverBackground)",
          "button-secondary-background":
            "var(--vscode-button-secondaryBackground)",
          "button-secondary-foreground":
            "var(--vscode-button-secondaryForeground)",

          // Input colors (secondary-like)
          "input-background": "var(--vscode-input-background)",
          "input-foreground": "var(--vscode-input-foreground)",
          "input-border": "var(--vscode-input-border)",
          "input-placeholder": "var(--vscode-input-placeholderForeground)",

          // List/selection colors
          "list-active-selection-background":
            "var(--vscode-list-activeSelectionBackground)",
          "list-active-selection-foreground":
            "var(--vscode-list-activeSelectionForeground)",
          "list-inactive-selection-background":
            "var(--vscode-list-inactiveSelectionBackground)",
          "list-inactive-selection-foreground":
            "var(--vscode-list-inactiveSelectionForeground)",
          "list-hover-background": "var(--vscode-list-hoverBackground)",
          "list-focus-background": "var(--vscode-list-focusBackground)",

          // Text colors
          "text-link-foreground": "var(--vscode-textLink-foreground)",
          "text-link-active-foreground":
            "var(--vscode-textLink-activeForeground)",
          "text-preformat-foreground": "var(--vscode-textPreformat-foreground)",
          "text-blockquote-background":
            "var(--vscode-textBlockQuote-background)",
          "text-blockquote-border": "var(--vscode-textBlockQuote-border)",

          // Status colors (semantic)
          "error-foreground": "var(--vscode-errorForeground)",
          "warning-foreground": "var(--vscode-descriptionForeground)",
          "info-foreground": "var(--vscode-foreground)",

          // Activity bar (tertiary-like)
          "activity-bar-background": "var(--vscode-activityBar-background)",
          "activity-bar-foreground": "var(--vscode-activityBar-foreground)",
          "activity-bar-border": "var(--vscode-activityBar-border)",
          "activity-bar-badge-background":
            "var(--vscode-activityBarBadge-background)",
          "activity-bar-badge-foreground":
            "var(--vscode-activityBarBadge-foreground)",

          // Side bar
          "side-bar-background": "var(--vscode-sideBar-background)",
          "side-bar-foreground": "var(--vscode-sideBar-foreground)",
          "side-bar-border": "var(--vscode-sideBar-border)",

          // Status bar
          "status-bar-background": "var(--vscode-statusBar-background)",
          "status-bar-foreground": "var(--vscode-statusBar-foreground)",
          "status-bar-border": "var(--vscode-statusBar-border)",

          // Panel
          "panel-background": "var(--vscode-panel-background)",
          "panel-border": "var(--vscode-panel-border)",

          // Tabs
          "tab-active-background": "var(--vscode-tab-activeBackground)",
          "tab-active-foreground": "var(--vscode-tab-activeForeground)",
          "tab-inactive-background": "var(--vscode-tab-inactiveBackground)",
          "tab-inactive-foreground": "var(--vscode-tab-inactiveForeground)",
          "tab-border": "var(--vscode-tab-border)",

          // Editor widgets
          "widget-background": "var(--vscode-widget-background)",
          "widget-border": "var(--vscode-widget-border)",
          "widget-shadow": "var(--vscode-widget-shadow)",

          // Focus and borders
          "focus-border": "var(--vscode-focusBorder)",
          "badge-background": "var(--vscode-badge-background)",
          "badge-foreground": "var(--vscode-badge-foreground)",

          // Progress and scrollbars
          "progress-background": "var(--vscode-progressBar-background)",
          "scrollbar-shadow": "var(--vscode-scrollbar-shadow)",
          "scrollbar-slider-background":
            "var(--vscode-scrollbarSlider-background)",
          "scrollbar-slider-hover-background":
            "var(--vscode-scrollbarSlider-hoverBackground)",
          "scrollbar-slider-active-background":
            "var(--vscode-scrollbarSlider-activeBackground)",

          // Git colors
          "git-added": "var(--vscode-gitDecoration-addedResourceForeground)",
          "git-modified":
            "var(--vscode-gitDecoration-modifiedResourceForeground)",
          "git-deleted":
            "var(--vscode-gitDecoration-deletedResourceForeground)",
          "git-untracked":
            "var(--vscode-gitDecoration-untrackedResourceForeground)",

          // Peek view
          "peek-view-background": "var(--vscode-peekViewEditor-background)",
          "peek-view-border": "var(--vscode-peekView-border)",

          // Quick picker
          "quick-picker-background": "var(--vscode-quickInput-background)",
          "quick-picker-foreground": "var(--vscode-quickInput-foreground)",
          "quick-picker-title-background":
            "var(--vscode-quickInputTitle-background)",
        },
      },
    },
  },
};
