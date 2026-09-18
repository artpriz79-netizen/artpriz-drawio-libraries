# Secure ArtPriz Constructor — Cloudflare Access

This branch is prepared for a staff-only ArtPriz constructor.

## What is already implemented

- draw.io runs in **embed mode** inside the protected ArtPriz page.
- ArtPriz XML libraries are fetched from the same protected site and injected into draw.io as **inline library data**.
- Managers do not need GitHub, Google Drive, or ChatGPT access.
- Library names/titles are visible in the draw.io sidebar.
- Save downloads a local `.drawio` file.
- The current public GitHub Pages constructor on `main` remains unchanged until migration is finished.

## Required one-time Cloudflare setup

1. Create a free Cloudflare account.
2. Open **Workers & Pages → Create → Pages → Connect to Git**.
3. Connect GitHub and select:
   `artpriz79-netizen/artpriz-drawio-libraries`
4. Production branch: **secure-access**
5. Framework preset: **None**
6. Build command: leave empty
7. Build output directory: **/**
8. Deploy.

You will receive an address similar to:
`https://artpriz-constructor.pages.dev`

## Restrict access to staff

In Cloudflare Zero Trust:

1. **Access → Applications → Add an application → Self-hosted**
2. Application domain: your Pages domain (for example `artpriz-constructor.pages.dev`)
3. Add an **Allow** policy.
4. Use either:
   - specific employee email addresses, or
   - an approved email domain.
5. Identity provider: **One-time PIN** is enough for a small team.
6. Set session duration as desired.

Managers will enter their email and receive a one-time code.

## Final hardening

After Cloudflare Access is verified:

1. Change the GitHub repository visibility to **Private**.
2. Keep the Cloudflare GitHub integration authorised for this repository.
3. Disable the old public GitHub Pages site from the `main` branch.

This prevents direct public access to the XML library source as well as to the constructor UI.
