@echo off

REM Load common environment variables from BaseTask.bat
if exist BaseTask.bat call BaseTask.bat %*

set TASK_NAME=Package Project

echo.
echo.
echo *****************************************************
echo *** Running %TASK_NAME%...
echo *****************************************************

REM Set task-specific parameters
set COMMANDLET_NAME=BuildCookRun

set Pak=-pak
for %%i in (%*) do (
  if "%%i"=="-pak" set Pak=-pak
)

set CLEAN=
for %%i in (%*) do (
  if "%%i"=="-clean" set CLEAN=-clean
)

set NoDebugInfo=
for %%i in (%*) do (
  if "%%i"=="-nodebuginfo" set NoDebugInfo=-nodebuginfo
)

REM Set arguments
if %BUILD_TYPE%==Development (
set ARGS=-ScriptsForProject=%PROJECT_FILE%^
 -Turnkey^
 -command=VerifySdk^
 -UpdateIfNeeded^
 -EditorIO^
 -nop4^
 -utf8output^
 -nocompileeditor^
 -skipbuildeditor^
 -cook^
 -project="%PROJECT_DIR%\%PROJECT_NAME%.uproject"^
 -target="%PROJECT_NAME%"^
 -unrealexe=%UNREAL_EDITOR_CMD%^
 -platform=%PLATFORM%^
 -ddc=InstalledDerivedDataBackendGraph^
 -installed^
 -stage^
 -archive^
 -package^
 -build^
 %CLEAN%^
 -compressed^
 %Pak%^
 -prereqs^
 -archivedirectory=%ARCHIVED_DIR%^
 -clientconfig=%BUILD_TYPE%^
 -nocompile^
 %NoDebugInfo%
) else ( 
set ARGS=-ScriptsForProject=%PROJECT_FILE%^
 Turnkey^
 -command=VerifySdk^
 -platform=%PLATFORM%^
 -UpdateIfNeeded^
 -EditorIO^
 -project="%PROJECT_DIR%\%PROJECT_NAME%.uproject"^
 BuildCookRun^
 -nop4^
 -utf8output^
 -nocompileeditor^
 -skipbuildeditor^
 -cook^
 -project="%PROJECT_DIR%\%PROJECT_NAME%.uproject"^
 -target="%PROJECT_NAME%"^
 -unrealexe=%UNREAL_EDITOR_CMD%^
 -ddc=InstalledDerivedDataBackendGraph^
 -installed^
 -stage^
 -archive^
 -package^
 -build^
 %CLEAN%^
 -compressed^
 -pak^
 -prereqs^
 -archivedirectory=%ARCHIVED_DIR%^
 -clientconfig=Shipping^
 -nocompile
)

if %BUILD_TYPE%==Development (
	echo %RUN_UAT% %COMMANDLET_NAME% %ARGS%
	call %RUN_UAT% %COMMANDLET_NAME% %ARGS%
) else (
	echo %RUN_UAT% %ARGS%
	call %RUN_UAT% %ARGS%
)

REM Set error code based on success or failure
if %ERRORLEVEL% == 0 (
	echo %TASK_NAME% succeeded.
	exit /B 0
) else (
	echo %TASK_NAME% failed.
	exit /B 1
)

