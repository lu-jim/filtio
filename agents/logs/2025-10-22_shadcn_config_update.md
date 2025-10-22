# Shadcn Configuration Update

**Date**: 2025-10-22
**Type**: Configuration Refactor
**Status**: Completed

## Overview
Updated the shadcn UI configuration to use `app/frontend/components` as the base directory instead of `src`, aligning with the project's Rails + Inertia structure.

## Problem
- Shadcn CLI was adding new components to `src/components/ui/`
- Project structure uses `app/frontend/` for all frontend code
- TypeScript path aliases were pointing to the wrong directory
- Had duplicate component locations causing confusion

## Changes Made

### Configuration Files Updated
1. **components.json**
   - Added `resolveAlias` configuration pointing to `./app/frontend`
   - This tells shadcn CLI where to resolve the `@` alias

2. **tsconfig.json**
   - Updated path alias from `"@/*": ["./src/*"]` to `"@/*": ["./app/frontend/*"]`
   - Ensures TypeScript resolves imports correctly

3. **vite.config.ts**
   - Already had correct alias (`'@': '/app/frontend'`) - no changes needed

### Directory Structure Changes
- Created `/app/frontend/components/ui/` directory
- Moved all shadcn components from `src/components/ui/` to `app/frontend/components/ui/`
- Removed the now-unused `src/` directory

### Components Moved
The following shadcn UI components were moved:
- `button.tsx`
- `field.tsx`
- `input-group.tsx`
- `input.tsx`
- `label.tsx`
- `separator.tsx`
- `textarea.tsx`

## Current Structure

```
app/frontend/
├── components/
│   ├── ui/              # shadcn UI components (lowercase)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── AlertDialog.tsx  # Custom components (PascalCase)
│   ├── Button.tsx
│   └── ...
├── lib/
│   └── utils.tsx        # cn() utility function
└── ...
```

## Usage

### Adding New shadcn Components
Now when you run:
```bash
npx shadcn@latest add <component-name>
```

Components will be added to:
- **Location**: `app/frontend/components/ui/`
- **Imports**: Use `@/components/ui/<component-name>`

### Example Import
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
```

## Path Alias Configuration Summary

| Alias | Points To | Usage |
|-------|-----------|-------|
| `@/components` | `app/frontend/components` | Custom components |
| `@/components/ui` | `app/frontend/components/ui` | shadcn components |
| `@/lib` | `app/frontend/lib` | Utility functions |
| `@/hooks` | `app/frontend/hooks` | React hooks |
| `@/utils` | `app/frontend/lib/utils` | cn() function |

## Verification

- ✅ No files importing from old `src/` path
- ✅ TypeScript path aliases updated
- ✅ Vite config aligned with new structure
- ✅ shadcn config points to correct directory
- ✅ All existing components preserved
- ✅ Old `src/` directory removed

## Notes
- The project has both lowercase shadcn components (in `ui/`) and PascalCase custom components (in `components/`)
- This is intentional - shadcn components use lowercase convention, custom components use PascalCase
- The `lib/utils.tsx` file contains the `cn()` utility used by shadcn components

## Testing Recommendation
To verify the configuration works:
```bash
npx shadcn@latest add dialog
```
The dialog component should be added to `app/frontend/components/ui/dialog.tsx`

