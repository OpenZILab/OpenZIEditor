@echo off
chcp 65001

set EXECUTE_INIT_DATA=false

REM Load common environment variables from BaseTask.bat
call Task\BaseTask.bat %*

set TASK_NAME=Write Version

echo.
echo.
echo *****************************************************
echo *** Running %TASK_NAME%...
echo *****************************************************

REM Set task-specific parameters
set COMMANDLET_NAME=WriteVersion

REM Set arguments
set ARGS=-ProjectDir="%PROJECT_DIR%"^
 -ArchivedDir=%ARCHIVED_DIR%^
 -ProjectName=%PROJECT_NAME%^
 -EngineRoot="%ENGINE_ROOT%"^
 -ZipName=%PROJECT_NAME%_exe_%EditorVersion%.zip^
 -SharedDisk=\\AS6510T\Home\Temporary
	
echo %PACKAGE_TASK_EXE% %PROJECT_FILE% -Run=%COMMANDLET_NAME% %ARGS%

REM Call commandlet with parameters
call %PACKAGE_TASK_EXE% %PROJECT_FILE% -Run=%COMMANDLET_NAME% %ARGS%

REM Set error code based on success or failure
if %ERRORLEVEL% == 0 (
	echo %TASK_NAME% succeeded.
	exit /B 0
) else (
	echo %TASK_NAME% failed.
	exit /B 1
)