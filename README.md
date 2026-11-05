# Freedom Church website

A plain HTML website: no build step, no framework.

| File | Page |
|---|---|
| `index.html` | Homepage |
| `im-new.html` | I'm New |
| `about.html` | About Us (vision, pastors, beliefs) |
| `kids.html` | Ministries: Freedom Kids |
| `youth.html` | Ministries: Freedom Youth |
| `site.js` | Ministries dropdown + giving pop-up |
| `images/` | All photos and logos |

## How the pop-ups work
- **Giving:** any link to `#give` opens Tithely's giving pop-up. If Tithely's script can't load, it opens Tithely in a small window instead. You can also share `freedomcco.com/#give`.
- **Church Center forms:** any form link ending in `?open-in-church-center-modal=true` opens as a pop-up (Church Center's script is in each page's `<head>`). On phones Church Center opens a new window instead.

## Deploying on Vercel
1. Put this folder's contents in a GitHub repository (the files should sit at the top level, not inside another folder).
2. In Vercel: **Add New → Project**, pick the repository, leave Framework Preset as **Other**, then **Deploy**.
3. Test on the `.vercel.app` address.
4. **Settings → Domains**: add `freedomcco.com` and `www.freedomcco.com`, then add the DNS records Vercel shows at your domain provider. Do not change the MX (email) records.

`vercel.json` turns on clean URLs, so `/about` works as well as `/about.html`.

## Editing
Each page is one HTML file. Text is plain HTML, so you can edit it in any text editor or on GitHub directly; Vercel redeploys within about a minute of each change.
