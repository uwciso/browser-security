#!/bin/bash

SETTINGS_FILE="/dockervol/settings"

if [[ -e $SETTINGS_FILE ]]; then
  . $SETTINGS_FILE
else
  echo "Could not find $SETTINGS_FILE"
fi

if [[ -n "$FILE_BROWSER_USER" && -n "$FILE_BROWSER_PASSWORD" ]]; then
  # We're good, both are set and non-empty
  echo "Setting up environment and running filebrowser"

  mkdir editor
  pushd editor
  ln -s ../app.js ./app.js
  ln -s ../public/assets.html ./assets.html
  popd
 
  filebrowser config init
  filebrowser users add "$FILE_BROWSER_USER" "$FILE_BROWSER_PASSWORD" --perm.execute=false --perm.admin=false
  filebrowser users update admin --password=$(head /dev/urandom | tr -dc 'A-Za-z0-9@#%^-_{}' | head -c 32) --perm.execute=false
  filebrowser -a 0.0.0.0 -p 8080 -r /browser-security/editor/ &
else
  echo "To run with the filebrowser, you must set both FILE_BROWSER_USER and FILE_BROWSER_PASSWORD (preferably in $SETTINGS_FILE on a mounted volume)"
  echo "Running without filebrowser"
fi

npm run start & 
echo 'Started services'

while sleep 60; do
  jobs
done
