# SEO Configuration Notes

## What Was Updated

All SEO schema placeholders in `lib/seo.ts` have been filled with working values:

### Contact Information
- **Email**: `averonagencyal@gmail.com` (from your existing system)
- **Phone**: `+355-69-123-4567` (placeholder - **UPDATE THIS**)
- **Address**: Rruga e Kavajes, Tirana 1001, Albania (placeholder - **UPDATE THIS**)

### Social Media
Social media links are currently commented out. Uncomment and update when you create your social media profiles:
- Facebook
- Instagram
- LinkedIn
- Twitter/X

### Verification Codes
Google Search Console and Yandex verification codes are commented out. Add them when you:
1. Register your site with Google Search Console
2. Get the verification code
3. Uncomment the line and add your code

## What You Should Update

### 1. Phone Number (Priority: High)
Update `+355-69-123-4567` to your actual business phone in:
- `organizationSchema.contactPoint.telephone` (line 102)
- `localBusinessSchema.telephone` (line 129)

### 2. Street Address (Priority: High)
Update "Rruga e Kavajes" to your actual office address in:
- `organizationSchema.address.streetAddress` (line 89)
- `localBusinessSchema.address.streetAddress` (line 133)

### 3. Social Media Links (Priority: Medium)
When you create your social media profiles, uncomment and update the `sameAs` array (line 108-114).

### 4. Google Verification (Priority: Medium)
After setting up Google Search Console:
1. Go to Google Search Console
2. Add your property (https://averon.al)
3. Get the verification meta tag
4. Uncomment line 73 and add the verification code

### 5. Business Hours (Optional)
The schema includes opening hours (Mon-Fri, 9:00-18:00). Update if your hours are different in `localBusinessSchema.openingHoursSpecification` (line 144-150).

### 6. Geo Coordinates (Optional but Recommended)
Currently using Tirana city center coordinates (41.3275, 19.8187). For better local SEO, update to your exact office location:
1. Open Google Maps
2. Right-click your office location
3. Copy the coordinates
4. Update in both schemas (lines 97-98 and 140-142)

## Testing Your SEO

### 1. Validate Schema Markup
Test your structured data:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### 2. Check Meta Tags
- View page source and check `<meta>` tags
- Use [Meta Tags Checker](https://metatags.io/)

### 3. Social Media Preview
Test how your site appears when shared:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Files Modified

- `averon-nextjs/lib/seo.ts` - Main SEO configuration file

## Schema Types Included

✅ **Organization Schema** - Defines your company
✅ **LocalBusiness Schema** - For local search results
✅ **Website Schema** - For site-wide search
✅ **Service Schema** - Your service offerings
✅ **FAQ Schema** - Common questions (can add to FAQ page)
✅ **Breadcrumb Schema** - Navigation structure

## Next Steps for Better SEO

1. ✅ Schema markup complete
2. ⏳ Create and submit XML sitemap
3. ⏳ Create robots.txt file
4. ⏳ Add Google Analytics
5. ⏳ Set up Google Search Console
6. ⏳ Create social media profiles
7. ⏳ Build backlinks from Albanian business directories
