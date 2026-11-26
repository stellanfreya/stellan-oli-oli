# Stellan Oli Oli

A fan-made Olivia Rodrigo site with an animated site-wide search, a scroll-reactive concert-photo backdrop, a mood-based song finder, an Olivia-era quiz, an eight-photo diary with face-aware framing and a full-size viewer, a scrollable feed of official embedded videos, live dates, tour and holiday countdowns, member profiles, private direct messages with file and GIF sharing, online/away/do-not-disturb/offline presence modes, and a redesigned group chat with file attachments, GIF search, and reactions.

**This is an unofficial fan project and is not affiliated with Olivia Rodrigo or her team.**

## Publish

The site is published from the public `stellanfreya/stellan-oli-oli` repository.

Website: <https://stellanfreya.github.io/stellan-oli-oli/>
Repository: <https://github.com/stellanfreya/stellan-oli-oli>

## Install on Windows

Open the website in Microsoft Edge or Google Chrome and select **Install on Windows**. The browser installs Stellan Oli Oli as a standalone Progressive Web App (PWA), available from the Windows Start menu. This is a browser-installed app, not a separate `.exe` installer. If the browser does not show an install prompt, use its menu: in Edge choose **Apps → Install this site as an app**; in Chrome choose **Install page as app**.

The installed app uses the same site and requires an internet connection for sign-in, chat, and other online features. The app shell is cached for basic offline loading; large video files are not cached.

## Accounts

The site uses Supabase Auth with email confirmation and no phone verification. Favorites and playlists are stored per account under row-level security. The fan-site project URL and public publishable key are in `config.js`. Read [setup.md](setup.md) for the required Pages redirect address and email delivery setup.

## Photos

The gallery includes five local concert photos and three White House photos hosted by Wikimedia Commons. The concert photos include source and license credits; the White House photos are public-domain U.S. government works and link to their Commons source pages.
