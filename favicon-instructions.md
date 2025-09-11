# Favicon Generator

Since we can't create an actual favicon.ico file easily in this environment, here's how you can add one:

1. **Create a simple favicon**:
   - Use a favicon generator like https://favicon.io/
   - Upload a simple "K" logo or your initials
   - Download the generated files

2. **Add to your website**:
   Add these lines to the `<head>` section of index.html:
   ```html
   <link rel="icon" type="image/x-icon" href="/favicon.ico">
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
   ```

For now, we'll add a simple SVG favicon placeholder.
