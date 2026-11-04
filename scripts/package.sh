#!/usr/bin/env bash
# Package the extension as dist/feedback-visibility-hibob.zip, with
# manifest.json at the top level of the zip (the Chrome Web Store requires
# it). Unzipping on a Mac still gives a feedback-visibility-hibob folder.
set -euo pipefail

cd "$(dirname "$0")/.."
zip_path="$PWD/dist/feedback-visibility-hibob.zip"

mkdir -p dist
rm -f "$zip_path"
(cd extension && zip -qrX "$zip_path" . -x '.*' -x '*/.*')
echo "dist/feedback-visibility-hibob.zip"
