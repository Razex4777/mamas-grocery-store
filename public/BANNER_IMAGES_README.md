# Banner Images Setup

## Required Images

To complete the banner setup, you need to copy the following images from the ekomart template:

### Source Location:
```
templates/ekomart-nextjs-main/ekomart-nextjs-main/public/assets/images/banner/
```

### Images to Copy:

1. **banner-01.webp** (Main banner - grocery deals)
   - Source: `01.webp` 
   - Copy to: `public/banner-01.webp`

2. **banner-02.webp** (Secondary banner - incredible deals)
   - Source: `03.webp`
   - Copy to: `public/banner-02.webp`

### Manual Copy Instructions:

Open PowerShell in the project root and run:

```powershell
Copy-Item "templates\ekomart-nextjs-main\ekomart-nextjs-main\public\assets\images\banner\01.webp" "public\banner-01.webp"
Copy-Item "templates\ekomart-nextjs-main\ekomart-nextjs-main\public\assets\images\banner\03.webp" "public\banner-02.webp"
```

Or manually copy the files using File Explorer:
1. Navigate to `templates/ekomart-nextjs-main/ekomart-nextjs-main/public/assets/images/banner/`
2. Copy `01.webp` and rename it to `banner-01.webp` in the `public/` folder
3. Copy `03.webp` and rename it to `banner-02.webp` in the `public/` folder

## Alternative: Download from Website

If the template files are not available, you can download the images directly from:
- https://html.themewant.com/ekomart/assets/images/banner/01.webp
- https://html.themewant.com/ekomart/assets/images/banner/03.webp

Save them as `banner-01.webp` and `banner-02.webp` in the `public/` folder.
