#!/bin/bash -l

abort() {
    echo >&2 '
****************************
*** ABORTED DUE TO ERROR ***
****************************
'
    echo "An error occurred. Exiting..." >&2
    exit 1
}

trap 'abort' 1

set -e

if [[ $1 == -h || $1 == --help ]]; then
    echo >&2 '
****************************
********* HXS Help *********
****************************
'
exit 0
fi

if [[ $1 == -i || $1 == --install ]]; then
    echo >&2 '
****************************
******** HXS Install *******
****************************
'

docker exec -it hxs sh "npm install ${2}"

exit 0
fi

if [[ $1 == -s || $1 == --start ]]; then
    echo >&2 '
****************************
********* HXS Start ********
****************************
'

docker exec -it hxs sh "npm install ${2}"

exit 0
fi

PARAMS=()
while [[ $# -gt 0 ]]; do
    p="$1"

    case $p in
    -i | -install | --install)
        envm=${2,,}
        shift
        ;;
    --no-reset-root)
        resetrootuser=0
        shift
        ;;
    *)
        # Hold for processing later
        PARAMS+=("$p")
        ;;
    esac
    shift # move to next parameter
done

trap : 0