@echo off

set TASK_NAME=Init Base Data

echo.
echo.
echo *****************************************************
echo *** Running %TASK_NAME%...
echo *****************************************************

REM Set task-specific parameters
set COMMANDLET_NAME=InitBaseData

call svn info %PROJECT_DIR%>"%PROJECT_DIR%\Saved\PackageTask\svninfo.txt"

REM Set arguments
set ARGS=-DataFilename="%PROJECT_DIR%\Saved\PackageTask\PackageTaskData.txt"^
 -Type=Editor
	
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