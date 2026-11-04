# Contributing

## Develop

The extension lives in `extension/`. To try a change, load that folder in `chrome://extensions` with **Load unpacked**, then click the reload arrow on its card after each edit and reload the HiBob tab.

The icons are drawn in `store/icon.svg` and rendered to `extension/icons/` with `node store/make-icons.mjs`.

## Release

Bump `version` in `extension/manifest.json`, commit, then tag and push:

```sh
git tag v<version> && git push origin v<version>
```

The Release workflow runs `scripts/release.sh`, which checks the tag matches the manifest, builds the zip with `scripts/package.sh` and creates the GitHub release.

## Chrome Web Store

Upload the zip from the GitHub release (or build it locally with `scripts/package.sh`) in the Developer Dashboard. `store/listing.md` has the listing text and the privacy answers; the store screenshot is `store/screenshot-1280x800.png`.
