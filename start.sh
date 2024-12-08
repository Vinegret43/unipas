#!/bin/bash
kill "$(head -n 1 server_pids)" &> /dev/null && echo "Back-end killed"
kill "$(tail -n 1 server_pids)" &> /dev/null && echo "Front-end killed"

[[ "$1" -eq "kill" ]] && exit

(
    cd back-end
    ./main.py &> /dev/null & disown
    echo "$!" > ../server_pids
    echo "Back-end started"
)

(
    cd front-end
    echo "Building front-end"
    npm run build &> /dev/null
    echo "Build done. Starting"
    npm run start &> /dev/null & disown
    echo -n "$!" >> ../server_pids
    echo "Front-end started"
)
