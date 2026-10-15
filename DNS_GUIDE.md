# DNS Configuration Guide for nitinthapaportfoilo.dpdns.org

This guide explains how to point your DigitalPlat domain to GitHub Pages.

---

## Option 1: Using a CNAME Record

To point your domain using a CNAME record:

1. In the **DigitalPlat DNS Records** panel, click **+ Add record**.
2. Enter the following values:
   - **Type:** `CNAME`
   - **Name:** `@` (or `www` for the www subdomain)
   - **Value:** `nitinthapa30.github.io.` *(Note the dot `.` at the end to prevent DigitalPlat from appending the domain name)*
   - **TTL:** `300`
3. Click **Save** / **Add**.

> **Important Note:** In standard DNS rules, a `CNAME` record on `@` cannot coexist with `A` records. If you receive an error or conflict, delete the existing `A` records first, or use Option 2 below.

---

## Option 2: Using A Records (Recommended for Apex / Root Domain)

If DigitalPlat does not allow a CNAME on the root `@` (or if you keep the root domain), use GitHub's 4 official IP addresses:

Add these 4 records:
- **Type:** `A` | **Name:** `@` | **Value:** `185.199.108.153` | **TTL:** `300`
- **Type:** `A` | **Name:** `@` | **Value:** `185.199.109.153` | **TTL:** `300`
- **Type:** `A` | **Name:** `@` | **Value:** `185.199.110.153` | **TTL:** `300`
- **Type:** `A` | **Name:** `@` | **Value:** `185.199.111.153` | **TTL:** `300`

---

## Verification

Once configured:
1. Wait 2 to 5 minutes for DNS propagation.
2. Go to **GitHub Repository → Settings → Pages**.
3. Under **Custom domain**, verify `nitinthapaportfoilo.dpdns.org` is entered and click **Check again**.
4. Check **Enforce HTTPS** once the DNS check passes.
