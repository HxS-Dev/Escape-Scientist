#!/bin/bash -l

abort() {
    echo >&2 '
****************************
*** ABORTED DUE TO ERROR ***
****************************
'
    exit 1
}

trap 'abort' 1

set -e

function checkUp {
    # Check if docker container is running, returns error if running
    if [[ $1 == 1 ]]; then
        if [ "$(docker top hxs 2>/dev/null)" ]; then
        echo >&2 '
****************************
*** ABORTED DUE TO ERROR ***
****************************
*The container is already  *
*running                   *
**************************** 
'
        exit 0
        fi
    fi

    # Check if docker container is running, returns error if not running
    if [ ! "$(docker top hxs 2>/dev/null)" ]; then
    echo >&2 '
****************************
*** ABORTED DUE TO ERROR ***
****************************
*The container is not      *
*running, run the following*
*command:                  *
*        ./hxs.sh -s       *
**************************** 
'
    exit 0
    fi
}

if [[ $1 == -h || $1 == --help ]]; then
    echo >&2 '
****************************
********* HXS Help *********
****************************
* -h   Displays this menu  *
*                          *
* -s   Start hxs containers*
*                          *
* -sc  Cleans containers   *
*      and then starts     *
*                          *
* -i   Install package     *
*      inside container,   *
*      put the package     *
*      after -i            *
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
    checkUp

    # Run the install script
    docker exec -it hxs npm install ${2}

    exit 0
fi

if [[ $1 == -s || $1 == --start || $1 == -sc || $1 == --sc ]]; then
    echo >&2 '
****************************
********* HXS Start ********
****************************
'

    if [[ $1 == -sc || $1 == --sc ]]; then
        echo >&2 '
****************************
********* Cleaning *********
****************************
'
        docker-compose -f docker-compose.yml down --rmi 'all' -v --remove-orphans > /dev/null 2>&1
    else
        checkUp 1
    fi

    # Put the container up
    docker-compose -f docker-compose.yml up -d

    exit 0
fi

trap : 0