@echo off

REM Set other common environment variables
set BUILD_TYPE=Development
REM set BUILD_TYPE=Shipping

REM Set platform variables
set PLATFORM=Win64

REM ======================================================
REM =====  The above variables are modifiable items  =====
REM ======================================================


REM Set project root directory
set PROJECT_DIR=%~dp0..\..\..\..\

REM Set project root directory
set PROJECT_NAME=
for %%i in ("%PROJECT_DIR%\*.uproject") do (
    set PROJECT_NAME=%%~ni
)

REM Convert to absolute path
for %%i in ("%~dp0..\..\..\..") do set PROJECT_DIR=%%~fi

REM Set project file path
Set PROJECT_FILE=%PROJECT_DIR%\%PROJECT_NAME%.uproject

set PACKAGE_TASK_EXE=%PROJECT_DIR%\Build\BatchFiles\Tools\PackageTask\PackageTask.exe

if not "%EXECUTE_INIT_DATA%"=="false" (
	if not exist InitBaseData.bat (
		call Task\InitBaseData.bat
	) else (
		call InitBaseData.bat
	)
)

:SkipInitData
if not exist ReadData.bat (
	call Task\ReadData.bat %PROJECT_DIR% Task\extractEditorVersion.js
) else (
	call ReadData.bat %PROJECT_DIR% extractEditorVersion.js
)

if "%PROJECT_NAME%"=="" (
	echo The PROJECT_NAME is empty, please compile the project first
	exit /B 1
)

REM Set engine root directory
if "%ENGINE_ROOT%"=="" (
	echo The ENGINE_ROOT is empty, please compile the project first
	exit /B 1
)


REM Set path to UE4Editor-Cmd.exe
set UNREAL_EDITOR_CMD="%ENGINE_ROOT%\Binaries\Win64\UnrealEditor-Cmd.exe"

REM Set path to RunUAT.bat
set RUN_UAT="%ENGINE_ROOT%\Build\BatchFiles\RunUAT.bat"

set UBT_EXE="%ENGINE_ROOT%\Binaries\DotNET\UnrealBuildTool\UnrealBuildTool.exe"

set ARCHIVED_DIR=%PROJECT_DIR%\Packages\%PLATFORM%\%BUILD_TYPE%\%EditorVersion%
