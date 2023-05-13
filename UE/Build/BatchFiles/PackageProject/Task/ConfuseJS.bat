@echo off

REM Load common environment variables from BaseTask.bat
if exist BaseTask.bat call BaseTask.bat %*

set TASK_NAME=Confuse JavaScript

echo.
echo.
echo *****************************************************
echo *** Running %TASK_NAME%...
echo *****************************************************

set ContentJavaScript=%ARCHIVED_DIR%\%PROJECT_NAME%\Content\JavaScript
set ConfigJson=%PROJECT_DIR%\obfuscator_config.json
if exist %ConfigJson% (
	for /r "%ContentJavaScript%" %%f in (*.js) do (
		call javascript-obfuscator "%%f" --config %ConfigJson% --output "%%f"
	)
) else (
	echo %ConfigJson% is not exist
)


@REM Set error code based on success or failure
if %ERRORLEVEL% == 0 (
    echo %TASK_NAME% succeeded.
    exit /B 0
) else (
    echo %TASK_NAME% failed.
    exit /B 0
)

