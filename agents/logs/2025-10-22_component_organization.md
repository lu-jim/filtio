# Component Organization - shadcn UI Structure

**Date**: 2025-10-22
**Type**: Refactor
**Status**: Completed

## Overview
Reorganized all shadcn UI components into the `app/frontend/components/ui/` folder following shadcn conventions, while keeping custom application components in the main `components/` folder.

## Problem
- Had duplicate components in both main `components/` folder and `ui/` subfolder
- Components were using inconsistent import paths
- shadcn components were mixed with custom application components
- Import paths were using both `@/lib/utils` and `../lib/utils` inconsistently

## Changes Made

### 1. Fixed Import Paths in ui/ Components
Updated all components in `ui/` folder to use relative imports (`../../lib/utils`) instead of alias imports (`@/lib/utils`), as per user preference:
- `button.tsx`
- `input.tsx`
- `label.tsx` (using @radix-ui version)
- `textarea.tsx`
- `field.tsx`
- `input-group.tsx`
- `separator.tsx`
- `alert-dialog.tsx`
- `badge.tsx`
- `card.tsx`
- `progress.tsx`
- `scroll-area.tsx`
- `select.tsx`

### 2. Moved shadcn Components to ui/ Folder
Moved the following shadcn components from `components/` to `components/ui/` with lowercase naming:
- `AlertDialog.tsx` → `ui/alert-dialog.tsx`
- `Badge.tsx` → `ui/badge.tsx`
- `Card.tsx` → `ui/card.tsx`
- `Collapsible.tsx` → `ui/collapsible.tsx`
- `Progress.tsx` → `ui/progress.tsx`
- `Scroll-area.tsx` → `ui/scroll-area.tsx`
- `Select.tsx` → `ui/select.tsx`

### 3. Kept Custom Components in Main Folder
These application-specific components remain in `components/`:
- `Navbar.tsx` - Application navigation
- `ThemeToggle.tsx` - Theme switcher
- `Layout.tsx` - Page layout wrapper

### 4. Resolved Duplicates
Deleted duplicate components from main folder:
- ❌ `Button.tsx` (kept `ui/button.tsx`)
- ❌ `Input.tsx` (kept `ui/input.tsx`)
- ❌ `Label.tsx` (kept `ui/label.tsx` with @radix-ui version)
- ❌ `Textarea.tsx` (kept `ui/textarea.tsx`)

### 5. Updated All Imports
Updated imports in **12 files** across the application:

**Pages:**
- `pages/companies/index.tsx`
- `pages/companies/edit.tsx`
- `pages/companies/show.tsx`
- `pages/calls/edit.tsx`
- `pages/calls/show.tsx`
- `pages/chats/Index.tsx`
- `pages/chats/New.tsx`
- `pages/chats/Show.tsx`

**Demo Files:**
- `demo/sentiment-column.tsx`
- `demo/summary-column.tsx`
- `demo/insights-column.tsx`

**Components:**
- `components/Navbar.tsx`

Changed imports from:
```typescript
import { Button } from '../../components/Button'
```

To:
```typescript
import { Button } from '../../components/ui/button'
```

## Final Directory Structure

```
app/frontend/components/
├── ui/                          # shadcn UI components (lowercase)
│   ├── alert-dialog.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── collapsible.tsx
│   ├── field.tsx
│   ├── input-group.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── progress.tsx
│   ├── scroll-area.tsx
│   ├── select.tsx
│   ├── separator.tsx
│   └── textarea.tsx
├── Layout.tsx                   # Custom app components (PascalCase)
├── Navbar.tsx
└── ThemeToggle.tsx
```

## Import Convention

### shadcn UI Components
```typescript
// From pages (2 levels up)
import { Button } from '../../components/ui/button'
import { Card, CardHeader, CardTitle } from '../../components/ui/card'

// From demo (1 level up)
import { Button } from '../components/ui/button'

// From components (same level)
import { Button } from './ui/button'
```

### Custom Components
```typescript
import { Navbar } from '../../components/Navbar'
import { ThemeToggle } from './ThemeToggle'
```

### Utilities
```typescript
// Within ui/ folder components
import { cn } from '../../lib/utils'

// From pages/demo
import { cn } from '../../lib/utils'
```

## Benefits

1. **Clear Separation**: shadcn components are clearly separated from custom components
2. **Consistent Naming**: shadcn uses lowercase, custom components use PascalCase
3. **No Duplicates**: Removed all duplicate components
4. **Standard Convention**: Follows shadcn's recommended structure
5. **Easier Maintenance**: When adding new shadcn components via CLI, they'll go to the right place

## shadcn CLI Usage

Now when running:
```bash
npx shadcn@latest add <component-name>
```

Components will be correctly added to `app/frontend/components/ui/` thanks to the configuration in:
- `components.json` (resolveAlias: "./app/frontend")
- `tsconfig.json` (paths: "@/*": ["./app/frontend/*"])
- `vite.config.ts` (alias: '@': '/app/frontend')

## Verification

- ✅ All imports updated (12 files)
- ✅ No broken imports
- ✅ Components properly organized
- ✅ Import paths use relative `../../lib/utils` as requested
- ✅ Label component uses @radix-ui version
- ✅ All duplicate files removed
- ✅ Linting errors unrelated to refactor (pre-existing)

## Notes

- The `ui/label.tsx` component uses `@radix-ui/react-label` for better accessibility
- `ui/collapsible.tsx` doesn't import `cn` utility as it doesn't need styling
- All components now use consistent relative imports for utilities
- One pre-existing TypeScript error in `pages/chats/New.tsx` (unrelated to this refactor)

