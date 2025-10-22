# Navbar Component Update

This document summarizes the creation of a new shadcn-styled Navbar component and its integration across the application.

## New Component

### Navbar (`app/frontend/components/Navbar.tsx`)

A fully responsive, shadcn-styled navigation component with the following features:

#### Features
- **Logo/Brand**: Custom logo with "F" icon in primary color
- **Desktop Navigation**: Horizontal nav with icon + text links
- **Mobile Navigation**: Collapsible hamburger menu
- **Theme Toggle**: Integrated ThemeToggle component
- **Active States**: Highlights current page
- **Custom Actions**: Accepts children for page-specific actions
- **Responsive Design**: Mobile-first with breakpoints

#### Components Used
- `Button` - For nav links and mobile menu toggle
- `ThemeToggle` - Theme switcher
- Lucide icons: `Building2`, `MessageSquare`, `Menu`, `X`

#### Design Highlights
- Uses `bg-card` for navbar background (theme-aware)
- `border-b` for subtle separation
- Container with proper padding (px-6)
- Fixed height (h-16) for consistency
- Active state with `bg-accent` and `text-accent-foreground`
- Ghost button variant for nav links
- Mobile menu slides down on toggle

## Navigation Links

### Desktop
- Companies (Building2 icon)
- Chats (MessageSquare icon)

### Mobile
- Same links in vertical layout
- Theme toggle at bottom of mobile menu
- Closes on link click

## Integration

### Chat Pages Updated

All three chat pages now use the new Navbar:

**1. Chat Index (`/chats`)**
- Navbar with "New Chat" button as custom action
- Button appears in navbar for easy access

**2. Chat New (`/chats/new`)**
- Navbar without custom actions
- Clean, simple navigation

**3. Chat Show (`/chats/:id`)**
- Navbar with chat info in custom area
- Shows "Chat #X" and model badge
- Full-height layout (h-screen)

### Layout Structure

**Before:**
```html
<body>
  <nav><!-- ERB navbar --></nav>
  <main><!-- Inertia content --></main>
</body>
```

**After:**
```html
<body>
  <!-- Inertia content with React Navbar -->
</body>
```

Each Inertia page now includes:
```tsx
<div className="min-h-screen bg-background">
  <Navbar>{/* optional actions */}</Navbar>
  <main>{/* page content */}</main>
</div>
```

## Responsive Behavior

### Desktop (md and up)
- Horizontal nav links with icons
- Theme toggle visible
- Mobile menu button hidden
- Full navigation visible

### Mobile (< md)
- Hamburger menu button
- Nav links hidden
- Theme toggle hidden (appears in mobile menu)
- Collapsible mobile menu

## Active State Detection

Uses `window.location.pathname.startsWith(href)` to determine active page:
- `/companies` routes get highlighted on Companies link
- `/chats` routes get highlighted on Chats link

## Custom Actions (Children Prop)

The Navbar accepts children to display custom page-specific actions:

```tsx
<Navbar>
  <Button>Custom Action</Button>
</Navbar>
```

Used in Chat Index to show "New Chat" button in navbar.

## Color Scheme

- **Background**: `bg-card` (theme-aware card background)
- **Border**: `border-b` (subtle bottom border)
- **Text**: `text-foreground` (primary text color)
- **Logo**: `bg-primary` with `text-primary-foreground`
- **Links**: Ghost variant with hover states
- **Active**: `bg-accent` with `text-accent-foreground`
- **Muted**: `text-muted-foreground` for secondary text

## Accessibility

- Proper ARIA labels (`aria-label`, `aria-expanded`)
- `role="banner"` on header
- `role="navigation"` on nav elements
- Keyboard navigation support
- Focus visible states
- Screen reader friendly

## Mobile Menu Behavior

- Opens/closes on hamburger button click
- Shows/hides with conditional rendering
- Closes automatically when navigation link clicked
- Smooth transitions with Tailwind classes

## Icons

All icons from Lucide React:
- `Building2` - Companies
- `MessageSquare` - Chats
- `Menu` - Open mobile menu
- `X` - Close mobile menu

Consistent sizing: `size-4` for nav icons, `size-5` for menu icons

## Benefits Over Old Implementation

1. **Consistency**: Same navbar across all pages
2. **Responsive**: Works on all screen sizes
3. **Theme-aware**: Adapts to light/dark mode
4. **Component-based**: Reusable React component
5. **Active states**: Visual feedback for current page
6. **Accessible**: Proper ARIA attributes
7. **Modern**: shadcn design system
8. **Flexible**: Supports custom actions per page
9. **Type-safe**: Full TypeScript support
10. **Maintainable**: Single source of truth

## Files Modified

1. `app/frontend/components/Navbar.tsx` - New component
2. `app/frontend/pages/Chats/Index.tsx` - Added Navbar
3. `app/frontend/pages/Chats/New.tsx` - Added Navbar
4. `app/frontend/pages/Chats/Show.tsx` - Added Navbar
5. `app/views/layouts/application.html.erb` - Removed old ERB navbar

## Usage in Other Pages

To add the Navbar to other Inertia pages:

```tsx
import { Navbar } from '../../components/Navbar'

export default function MyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar>
        {/* Optional: custom actions */}
      </Navbar>
      
      <main className="container mx-auto p-6">
        {/* Your page content */}
      </main>
    </div>
  )
}
```

## Future Enhancements

Potential improvements:
- Add dropdown menus for sub-navigation
- Add search functionality
- Add user profile menu
- Add notifications badge
- Add breadcrumbs for deep navigation
- Add keyboard shortcuts display
- Add command palette (⌘K)

