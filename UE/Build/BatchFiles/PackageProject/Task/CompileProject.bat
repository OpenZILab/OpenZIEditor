@echo off

REM Load common environment variables from BaseTask.bat
if exist BaseTask.bat call BaseTask.bat %*

set TASK_NAME=Compile Project

echo.
echo.
echo *****************************************************
echo *** Running %TASK_NAME%...
echo *****************************************************

set CLEAN=
for %%i in (%*) do (
  if "%%i"=="-clean" set CLEAN=-clean
)

rem OpenZiEditorEditor Win64 Development -Project=E:\UnrealProjects\OpenZiEditor\ReleaseEngine\OpenZiEditor\OpenZiEditor.uproject -WaitMutex -FromMsBuild
REM Set arguments
set ARGS=%PROJECT_NAME%Editor^
 %PLATFORM%^
 Development^
 -project="%PROJECT_DIR%\%PROJECT_NAME%.uproject"^
 -WaitMutex^
 -FromMsBuild^
 %CLEAN%

echo %UBT_EXE% %ARGS%

REM Call commandlet with parameters
call %UBT_EXE% %ARGS%


REM Set error code based on success or failure
if %ERRORLEVEL% == 0 (
	echo %TASK_NAME% succeeded.
	exit /B 0
) else (
	echo %TASK_NAME% failed.
	exit /B 1
)
