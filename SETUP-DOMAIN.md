# constructor.artpriz.com setup

The repository is prepared to serve the ArtPriz draw.io constructor.

## GitHub Pages

Repository: `artpriz79-netizen/artpriz-drawio-libraries`

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Branch: **main**.
4. Folder: **/(root)**.
5. Save.
6. Under **Custom domain**, enter: `constructor.artpriz.com`
7. Save.
8. Enable **Enforce HTTPS** when GitHub makes the option available.

## DNS

Create this DNS record for `artpriz.com`:

- Type: **CNAME**
- Host / Subdomain: **constructor**
- Target / Value: **artpriz79-netizen.github.io**
- TTL: default / automatic

Do not add the repository name to the CNAME target.

DNS propagation may take time.

## Access model

Managers open `https://constructor.artpriz.com`.
They do not need access to the GitHub account or the ArtPriz Google account.
The landing page redirects them to diagrams.net in device mode with the ArtPriz libraries preloaded.
