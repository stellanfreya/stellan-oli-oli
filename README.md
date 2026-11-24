# Stellan Oli Oli

A fan-made Olivia Rodrigo site with an animated site-wide search, a scroll-reactive concert-photo backdrop, a mood-based song finder, an eight-photo diary with face-aware framing and a full-size viewer, an album guide, live dates, member profiles, private direct messages with file and GIF sharing, online/away/do-not-disturb/offline presence modes, and a redesigned group chat with file attachments, GIF search, and reactions.

**This is an unofficial fan project and is not affiliated with Olivia Rodrigo or her team.**

## Publish

Upload this folder's contents to the root of the public `oracle-rodrigo-fan-zine` repository, then set **Settings → Pages → Build and deployment → GitHub Actions**. A workflow in `.github/workflows/pages.yml` publishes the static site from `main`.

Expected address: <https://xilvym-code.github.io/oracle-rodrigo-fan-zine/>

## Accounts

The site uses Supabase Auth with email confirmation and no phone verification. Favorites and playlists are stored per account under row-level security. The fan-site project URL and public publishable key are in `config.js`. Read [setup.md](setup.md) for the required Pages redirect address and email delivery setup.

## Photos

The gallery includes five local concert photos and three White House photos hosted by Wikimedia Commons. The concert photos include source and license credits; the White House photos are public-domain U.S. government works and link to their Commons source pages.
