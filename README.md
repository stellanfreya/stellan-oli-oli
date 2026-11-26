# Stellan Oli Oli

A fan-made Olivia Rodrigo site with an animated site-wide search, a scroll-reactive concert-photo backdrop, a mood-based song finder, an Olivia-era quiz, an eight-photo diary with face-aware framing and a full-size viewer, a scrollable feed of official embedded videos, live dates, tour and holiday countdowns, member profiles, private direct messages with file and GIF sharing, online/away/do-not-disturb/offline presence modes, and a redesigned group chat with file attachments, GIF search, and reactions.

**This is an unofficial fan project and is not affiliated with Olivia Rodrigo or her team.**

## Publish

The site is published from the public `stellanfreya/stellan-oli-oli` repository.

Website: <https://stellanfreya.github.io/stellan-oli-oli/>
Repository: <https://github.com/stellanfreya/stellan-oli-oli>

## Windows app

Select **Download Windows App** on the website to download the Windows installer (`.exe`) from GitHub Releases. Run it to add Stellan Oli Oli to the Start menu and optionally create a desktop shortcut.

The app opens to its own desktop-only fan desk, with mood check-ins, private notes saved on that computer, and shortcuts into Oliclips, the album eras, fan chat, playlists, and tour dates. The full live fan site opens in its own app window and requires an internet connection.

To build the installer locally, run `npm ci` followed by `npm run dist:win` on Windows. Pushing a tag like `app-v1.1.0` builds and publishes the installer automatically.

## Accounts

The site uses Supabase Auth with email confirmation and no phone verification. Favorites and playlists are stored per account under row-level security. The fan-site project URL and public publishable key are in `config.js`. Read [setup.md](setup.md) for the required Pages redirect address and email delivery setup.

## Photos

The gallery includes five local concert photos and three White House photos hosted by Wikimedia Commons. The concert photos include source and license credits; the White House photos are public-domain U.S. government works and link to their Commons source pages.
