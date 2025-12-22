# UI Design Context & Standards

This document serves as the "UI Expert" context for the project. It defines the styling, behavior, and aesthetic standards for the application, inspired by modern mobile-first e-commerce apps like Wildberries, Kaspi, and Ozon.

## Core Principles
1.  **Mobile-First**: Design for touch, small screens, and one-handed usage first.
2.  **Clean & Airy**: Use whitespace generously. Backgrounds should be light gray (`#f3f4f6` / `bg-gray-100`) to let white cards (`#ffffff` / `bg-white`) pop.
3.  **Platform Native Feel**: Buttons, inputs, and transitions should feel responsive and native-like.
4.  **Shadows**: Use soft, diffused shadows (`shadow-sm`, `shadow-md`) to create depth. Avoid harsh outlines.

## Typography
*   **Font Family**: System UI / Sans-serif (Inter, Roboto, SF Pro).
*   **Scale**:
    *   **H1 / Page Titles**: `text-2xl` (24px) or `text-3xl` (30px) - Font Weight: 800 (Extrabold).
    *   **H2 / Section Headers**: `text-xl` (20px) - Font Weight: 700 (Bold).
    *   **H3 / Card Titles**: `text-base` (16px) or `text-lg` (18px) - Font Weight: 600 (SemiBold).
    *   **Body Text**: `text-sm` (14px) - Font Weight: 400 (Regular).
    *   **Captions / Secondary**: `text-xs` (12px) - Font Weight: 400 (Regular), Color: `text-gray-500`.

## Spacing & Layout
*   **Page Padding (Mobile)**: `px-4` (16px).
*   **Card Padding**: `p-4` (16px) standard, `p-3` for smaller items.
*   **Gap between sections**: `mb-8` (32px) or `mb-6` (24px).
*   **Gap between grid items**: `gap-3` (12px) or `gap-4` (16px).
*   **Border Radius**:
    *   **Cards**: `rounded-2xl` (16px).
    *   **Buttons**: `rounded-xl` (12px) or `rounded-full` (for pills).
    *   **Inputs**: `rounded-xl` (12px).

## Components

### 1. Banners (Carousel)
*   **Style**: "Peek-a-boo" / Center Mode. The active slide is centered, with previous and next slides partially visible.
*   **Aspect Ratio**: Typically 16:9 or 2:1 for mobile banners.
*   **Radius**: `rounded-2xl`.
*   **Shadow**: `shadow-sm` or `shadow-md`.

### 2. Cards (Product/Brand)
*   **Background**: White (`bg-white`) on light mode, Dark Gray (`bg-dark-card`) on dark mode.
*   **Shadow**: `shadow-sm` on rest, `shadow-md` on hover (desktop).
*   **Interaction**: Clickable areas should cover the whole card.

### 3. Search Input (Fake/Trigger)
*   **Appearance**: High contrast against background. White background with gray placeholder text and search icon.
*   **Height**: `h-12` (48px) to `h-14` (56px) for easy tapping.
*   **Radius**: `rounded-2xl`.
*   **Shadow**: `shadow-sm` floating effect.

### 4. Chips / Tags (Categories)
*   **Style**: Pill shape or rounded rectangle.
*   **Background**: `bg-gray-100` (unselected), `bg-primary` (selected).
*   **Text**: `text-sm` font-medium.

## Colors (Tailwind)
*   **Primary**: Determine from `tailwind.config.js` (usually a brand color). Use for CTAs, active states.
*   **Background**: `bg-light-bg` (App Background), `bg-white` (Card Background).
*   **Text**: `text-light-text-main` (Primary), `text-gray-500` (Secondary).

## Implementation Rules
*   Use `flex` and `grid` for layouts.
*   Avoid fixed widths (`w-[300px]`) where possible; use percentages or `flex-1`.
*   Always support Dark Mode variants (e.g., `dark:bg-dark-bg`).
