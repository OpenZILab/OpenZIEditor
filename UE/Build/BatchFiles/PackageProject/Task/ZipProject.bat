@echo off

REM Load common environment variables from BaseTask.bat
if exist BaseTask.bat call BaseTask.bat %*

set TASK_NAME=Zip Project

echo.
echo.
echo *****************************************************
echo *** Running %TASK_NAME%...
echo *****************************************************

REM Set task-specific parameters
set COMMANDLET_NAME=ZipUtils
set ZipExe=..\Tools\7-Zip\7z.exe

REM Set arguments
set ARGS=a^
 %ARCHIVED_DIR%\%PROJECT_NAME%_Package_%EditorVersion%.zip^
 %ARCHIVED_DIR%\*

echo %ZipExe% %ARGS%

REM Call commandlet with parameters
call %ZipExe% %ARGS%

REM Set error code based on success or failure
if %ERRORLEVEL% == 0 (
	echo %TASK_NAME% succeeded.
	exit /B 0
) else (
	echo %TASK_NAME% failed.
	exit /B 1
)