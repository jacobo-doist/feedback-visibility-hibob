#!/usr/bin/env bash
# Create a GitHub release for a version tag, with the packaged zip attached.
# Usage: scripts/release.sh v1.0.0
# Needs gh with a token (GH_TOKEN in CI). The tag must match the manifest version.
set -euo pipefail

tag=${1:?usage: scripts/release.sh <tag, e.g. v1.0.0>}
cd "$(dirname "$0")/.."

version=$(jq -r .version extension/manifest.json)
if [[ "$tag" != "v$version" ]]; then
  echo "Tag $tag does not match manifest version $version (expected v$version)." >&2
  exit 1
fi

zip=$(scripts/package.sh)
gh release create "$tag" "$zip" --title "$tag" --generate-notes
