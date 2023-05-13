@echo off

set "PackageTaskData=%1\Saved\PackageTask\PackageTaskData.txt"
set "EditorVersion="
set "ENGINE_ROOT="

for /f "usebackq tokens=1,2 delims==" %%a in (%PackageTaskData%) do (
  if "%%a"=="EditorVersion" set "EditorVersion=%%b"
  if "%%a"=="ENGINE_ROOT" set "ENGINE_ROOT=%%b"
)

set InstalledBuild="%ENGINE_ROOT%\Build\InstalledBuild.txt"
if exist %InstalledBuild% (
	set InstalledEngine=true
) else (
	set InstalledEngine=false
)

echo.
echo =====================================================
echo === EditorVersion=%EditorVersion%
echo === ENGINE_ROOT=%ENGINE_ROOT%
echo === InstalledEngine=%InstalledEngine%
echo =====================================================
echo.

