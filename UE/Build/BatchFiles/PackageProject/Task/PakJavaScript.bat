@echo off

REM Load common environment variables from BaseTask.bat
if exist BaseTask.bat call BaseTask.bat %*

set TASK_NAME=Pak JavaScript

echo.
echo.
echo *****************************************************
echo *** Running %TASK_NAME%...
echo *****************************************************

REM Set task-specific parameters
set COMMANDLET_NAME=PakJavaScript

REM Set arguments
set ARGS=-ProjectDir=%PROJECT_DIR%^
 -ArchivedDir=%ARCHIVED_DIR%^
 -ProjectName=%PROJECT_NAME%^
 -EngineDir="%ENGINE_ROOT%"^
 -FileName=JavaScript

echo %PACKAGE_TASK_EXE% %PROJECT_FILE% -Run=%COMMANDLET_NAME% %ARGS%

REM Call commandlet with parameters
call %PACKAGE_TASK_EXE% %PROJECT_FILE% -Run=%COMMANDLET_NAME% %ARGS%

set ContentJavaScript=%ARCHIVED_DIR%\%PROJECT_NAME%\Content\JavaScript
if exist %ContentJavaScript% (
    rd /s /q %ContentJavaScript%
    REM echo The folder has been deleted.
) else (
    echo %ContentJavaScript% folder does not exist.
)

REM Set error code based on success or failure
if %ERRORLEVEL% == 0 (
	echo %TASK_NAME% succeeded.
	exit /B 0
) else (
	echo %TASK_NAME% failed.
	exit /B 1
)
