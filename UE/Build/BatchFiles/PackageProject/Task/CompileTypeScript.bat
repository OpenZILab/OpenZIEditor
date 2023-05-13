@echo off

REM Load common environment variables from BaseTask.bat
if exist BaseTask.bat call BaseTask.bat %*

set TASK_NAME=Compile TypeScript

echo.
echo.
echo *****************************************************
echo *** Running %TASK_NAME%...
echo *****************************************************

REM echo %PROJECT_DIR%

set CurrentProjectDirectory=%PROJECT_DIR%

set ContentJavaScript=%CurrentProjectDirectory%\Content\JavaScript
if exist %ContentJavaScript% (
    rd /s /q %ContentJavaScript%
    REM echo The folder has been deleted.
) else (
    echo %ContentJavaScript% folder does not exist.
)


set PuertsJavaScript=%CurrentProjectDirectory%\Plugins\Puerts\Content\JavaScript
xcopy /e /i /y "%PuertsJavaScript%" "%ContentJavaScript%"


setlocal
cd /d %CurrentProjectDirectory% 
echo Compile TypeScript...
call tsc


REM Set error code based on success or failure
if %ERRORLEVEL% == 0 (
	echo %TASK_NAME% succeeded.
	exit /B 0
) else (
	echo %TASK_NAME% failed.
	exit /B 0
)

