# Company Form shadcn UI Component Integration

**Date**: 2025-10-22
**Type**: Refactor
**Status**: Completed

## Overview
Updated the company new/edit forms to use proper shadcn UI components from the `ui/` folder instead of raw HTML elements. This ensures consistent styling across the application and provides better accessibility with built-in error handling.

## Changes Made

### Modified Files

1. **app/controllers/companies_controller.rb**
   - Updated `new` action to render Inertia instead of ERB view
   - Added: `render inertia: "companies/new", props: { company: @company }`

2. **app/frontend/pages/companies/CompanyForm.tsx**
   - Replaced all raw HTML form elements with shadcn UI components
   - Added imports for: `Field`, `FieldLabel`, `FieldError`, `FieldGroup`, `Input`, `Select`, `Button`, `Card`, `CardHeader`, `CardTitle`, `CardContent`
   - Wrapped each form field in `Field` component with proper `FieldLabel` and `FieldError` handling
   - Updated all form fields to use `aria-invalid` for accessibility
   - Marked required fields with asterisks: `name`, `year`, `size`
   - Replaced custom buttons with `Button` component with appropriate variants
   - Used `Card` components for section organization

3. **app/frontend/pages/companies/new.tsx**
   - Updated `Company` interface to make `founders` optional
   - Changed `size` type from union to string for flexibility

4. **app/frontend/pages/companies/edit.tsx**
   - Updated `Company` interface to match new.tsx (founders optional, size as string)

### Deleted Files

Removed obsolete ERB views now that all company routes use Inertia:
- `app/views/companies/new.html.erb`
- `app/views/companies/edit.html.erb`
- `app/views/companies/index.html.erb`
- `app/views/companies/show.html.erb`
- `app/views/companies/_form.html.erb`

## Technical Details

### shadcn UI Component Pattern

Each form field now follows this pattern:

```tsx
<Field>
  <FieldLabel htmlFor="fieldname">Field Name *</FieldLabel>
  <Input 
    id="fieldname" 
    value={data.fieldname} 
    onChange={(e) => setData('fieldname', e.target.value)}
    aria-invalid={!!errors.fieldname}
  />
  {errors.fieldname && <FieldError>{errors.fieldname}</FieldError>}
</Field>
```

### Component Structure

- **Card**: Used for major sections (Company Information, Founders)
- **FieldGroup**: Groups related fields with grid layout
- **Field + FieldLabel + Input/Select**: Individual form controls
- **FieldError**: Displays validation errors from Inertia form
- **Button**: All buttons now use proper variants (default, secondary, destructive)

### Model Requirements

Based on `company.rb`:
- `name`: Required (marked with *)
- `year`: Required, integer between 1800 and current year (marked with *)
- `size`: Required, must be one of: 0-10, 50-100, 100-250, +250 (marked with *)
- `founders`: Optional nested attributes

## Usage

The new company view now renders as a full Inertia page with:
- Navbar preserved at the top
- Consistent shadcn styling throughout
- Proper error handling with `FieldError` components
- Accessible form controls with `aria-invalid` attributes
- Clear indication of required fields

### Creating a New Company

1. Navigate to `/companies/new`
2. Fill in required fields (Name, Founded Year, Company Size)
3. Optionally add Website, Logo URL, and Tagline
4. Click "Add Founder" to add founder information
5. Submit the form

### Editing a Company

1. Navigate to `/companies/:id/edit`
2. Same form interface as new company
3. All existing data pre-populated
4. Can add/remove founders dynamically

## Future Improvements

- Consider adding form validation before submission
- Add image upload for company logo instead of URL
- Implement autocomplete for common company sizes
- Add rich text editor for company description field

## Benefits

1. **Consistency**: All forms now use the same UI components
2. **Accessibility**: Built-in ARIA attributes and focus management
3. **Maintainability**: Centralized component styling
4. **Error Handling**: Consistent error display across all fields
5. **Type Safety**: Proper TypeScript interfaces throughout
6. **Clean Codebase**: Removed obsolete ERB views

