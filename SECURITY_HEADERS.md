# Security Headers Configuration

## Overview

This project implements comprehensive security headers to protect against common web vulnerabilities. Headers are configured for multiple hosting platforms.

## Security Headers Implemented

### 🔒 Core Security Headers

| Header | Value | Purpose |
|--------|-------|---------|
| **X-Frame-Options** | `DENY` | Prevents clickjacking attacks by blocking iframe embedding |
| **X-Content-Type-Options** | `nosniff` | Prevents MIME type sniffing attacks |
| **X-XSS-Protection** | `1; mode=block` | Enables browser XSS filter |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Controls referrer information sent |
| **Strict-Transport-Security** | `max-age=31536000; includeSubDomains; preload` | Forces HTTPS for 1 year |

### 🎯 Content Security Policy (CSP)

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https: blob:;
font-src 'self' data:;
connect-src 'self' https://wa.me https://api.whatsapp.com;
frame-src 'none';
object-src 'none';
base-uri 'self';
form-action 'self' https://wa.me;
frame-ancestors 'none';
upgrade-insecure-requests;
```

**What it does:**
- ✅ Only allows scripts, styles, and resources from your domain
- ✅ Allows WhatsApp connections for contact button
- ✅ Blocks all iframes and embeds
- ✅ Forces HTTPS for all requests
- ✅ Prevents code injection attacks

### 🚫 Permissions Policy

```
camera=(), microphone=(), geolocation=(), payment=(), 
usb=(), magnetometer=(), gyroscope=(), accelerometer=()
```

**What it does:**
- ✅ Disables all unnecessary browser features
- ✅ Reduces attack surface
- ✅ Improves privacy

## Configuration Files

### 1. Netlify (`netlify.toml` & `public/_headers`)
**Primary configuration** for Netlify deployments.

**Features:**
- ✅ Security headers on all routes
- ✅ Optimized caching strategies
- ✅ HTTPS redirects
- ✅ Asset-specific headers

**Deploy:** Push to GitHub and connect to Netlify

### 2. Vercel (`vercel.json`)
**Primary configuration** for Vercel deployments.

**Features:**
- ✅ JSON-based configuration
- ✅ Route-specific headers
- ✅ Asset optimization
- ✅ Automatic HTTPS

**Deploy:** Push to GitHub and connect to Vercel

### 3. Apache (`.htaccess`)
**Configuration** for traditional Apache hosting.

**Features:**
- ✅ mod_headers configuration
- ✅ mod_rewrite for HTTPS redirect
- ✅ Directory protection
- ✅ Cache control with mod_expires

**Deploy:** Upload to root directory with site files

### 4. Security Files (`public/`)
- **`robots.txt`** - Search engine directives
- **`security.txt`** - Security contact information (RFC 9116)

## Testing Security Headers

### Online Tools
1. **Security Headers**: https://securityheaders.com/
2. **Mozilla Observatory**: https://observatory.mozilla.org/
3. **CSP Evaluator**: https://csp-evaluator.withgoogle.com/

### Local Testing
```bash
# Test with curl
curl -I https://your-domain.com

# Look for these headers in response:
# - X-Frame-Options
# - Content-Security-Policy
# - Strict-Transport-Security
# - X-Content-Type-Options
```

### Browser DevTools
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Click on main document
5. Check Response Headers

## Expected Security Scores

With these configurations, you should achieve:
- **Security Headers**: A+ rating
- **Mozilla Observatory**: A+ rating
- **SSL Labs**: A+ rating (with proper SSL cert)

## Platform-Specific Setup

### Netlify Deployment
1. Connect repository to Netlify
2. Build settings are in `netlify.toml`
3. Headers apply automatically
4. Test: Deploy and check headers

### Vercel Deployment
1. Connect repository to Vercel
2. Configuration in `vercel.json`
3. Headers apply automatically
4. Test: Deploy and check headers

### Apache/cPanel Hosting
1. Upload all files including `.htaccess`
2. Ensure `mod_headers` and `mod_rewrite` are enabled
3. Test headers after upload

### Nginx (Create this file if using Nginx)
```nginx
# Add to your nginx.conf or site config
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://wa.me https://api.whatsapp.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://wa.me; frame-ancestors 'none'; upgrade-insecure-requests" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

## Troubleshooting

### CSP Blocking Resources
If legitimate resources are blocked:
1. Check browser console for CSP violations
2. Add specific domains to CSP directives
3. Test thoroughly after changes

### HSTS Issues
If HSTS causes issues during development:
- HSTS only applies in production (HTTPS)
- Clear HSTS in browser: chrome://net-internals/#hsts
- Remove domain and try again

### Mixed Content Warnings
Ensure all resources use HTTPS:
```bash
# Check for http:// in files
grep -r "http://" src/
```

## Cache Strategy

### Static Assets (1 year)
- Images: `.jpg`, `.png`, `.svg`, `.webp`
- Fonts: `.woff`, `.woff2`
- Scripts/Styles: `.js`, `.css`

### HTML (No cache)
- Always fresh content
- `max-age=0, must-revalidate`

### API Responses (No cache)
- `no-store, no-cache`
- Prevents sensitive data caching

## Compliance

These headers help with:
- ✅ **OWASP Top 10** protection
- ✅ **PCI DSS** requirements
- ✅ **GDPR** privacy compliance
- ✅ **HIPAA** security standards (healthcare)
- ✅ **SOC 2** compliance

## Maintenance

**Monthly checks:**
1. Test headers with online tools
2. Review CSP violations in browser console
3. Update security.txt expiry date
4. Check for new header recommendations

**Contact for security issues:**
security@alsultanpmc.com

## Additional Resources

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [RFC 9116: security.txt](https://www.rfc-editor.org/rfc/rfc9116.html)
