@ECHO OFF

IF %1% == -h (
    Echo ****************************
    Echo ********* HXS Help *********
    Echo ****************************
    Echo * -h   Displays this menu  *
    Echo *                          *
    Echo * -s   Start hxs containers*
    Echo *                          *
    Echo * -sc  Cleans containers   *
    Echo *      and then starts     *
    Echo *                          *
    Echo * -i   Install package     *
    Echo *      inside container,   *
    Echo *      put the package     *
    Echo *      after -i            *
    Echo ****************************
    Goto End
)

IF %1% == -i (
    Echo ****************************
    Echo ******** HXS Install *******
    Echo ****************************
    Goto checkUpB
    :checkUpBR
    :: Run the install script
    docker exec -it hxs npm install %2
    Goto End
)

IF %1 == -sc (
    Echo ****************************
    Echo ********* Cleaning *********
    Echo ****************************
    docker-compose -f docker-compose.yml down --rmi 'all' -v --remove-orphans > nul 2>&1
    Echo ****************************
    Echo ********* HXS Start ********
    Echo ****************************
    :: Put the container up
    docker-compose -f docker-compose.yml up -d
    IF NOT %errorlevel% == 0 Goto ErrorTrap
    Goto End
)

IF %1 == -s (
    Echo ****************************
    Echo ********* HXS Start ********
    Echo ****************************
    Goto checkUpA
    :checkUpAR
    :: Put the container up
    docker-compose -f docker-compose.yml up -d
    IF NOT %errorlevel% == 0 Goto ErrorTrap
    Goto End
)

Goto End

:checkUpA
:: Check if docker container is running, returns error if running
docker top hxs 2>nul
IF %errorlevel% == 0 (
    Echo ****************************
    Echo *** ABORTED DUE TO ERROR ***
    Echo ****************************
    Echo *The container is already  *
    Echo *running                   *
    Echo ****************************
    Goto End
) ELSE (
    Goto checkUpAR
)

:checkUpB
:: Check if docker container is running, returns error if not running
docker top hxs 2>nul
IF NOT %errorlevel% == 0 (
    Echo ****************************
    Echo *** ABORTED DUE TO ERROR ***
    Echo ****************************
    Echo *The container is not      *
    Echo *running, run the following*
    Echo *command:                  *
    Echo *        ./hxs.bat -s      *
    Echo ****************************
    Goto End
) ELSE (
    Goto checkUpBR
)

:ErrorTrap
Echo ****************************
Echo *** ABORTED DUE TO ERROR ***
Echo ****************************

:End