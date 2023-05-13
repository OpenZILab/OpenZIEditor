@echo off

REM Load common environment variables from BaseTask.bat
if exist BaseTask.bat call BaseTask.bat %*

set TASK_NAME=Copy Additional Files

echo.
echo.
echo *****************************************************
echo *** Running %TASK_NAME%...
echo *****************************************************

REM Set task-specific parameters
set COMMANDLET_NAME=CopyFiles

REM Set arguments
set ARGS=-Source="%PROJECT_DIR%"^
	-Dest=%ARCHIVED_DIR%\%PROJECT_NAME%^
	-projectName=%PROJECT_NAME%^
	Config/OpenZICloudRender.json^
	Config/OpenZICloudRenderServer.json^
	Content/SkyConfig/^
	Content/JavaScript/^
	Script/^
	Information/^
	ProjectLab/DefaultProject/^
	node_modules/^
	Plugins/OpenZIEditor/Resources/^
	Plugins/OpenZIEditor/Config/ConfigTool/^
	Plugins/OpenZIAPI/Content/CsvFile/^
	Plugins/OpenZIAPI/Config/ConfigTool/
		
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