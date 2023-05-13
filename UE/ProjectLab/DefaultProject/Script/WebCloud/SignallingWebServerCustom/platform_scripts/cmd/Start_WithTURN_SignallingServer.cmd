@echo off
::if "%1" == "h" goto begin
::mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:::begin
::REM
::if not "%1"=="am_admin" (powershell start -verb runas '%0' am_admin & exit /b)
pushd "%~dp0"
title Start_WithTURN_SignallingServer
powershell.exe -ExecutionPolicy Unrestricted -File .\\Start_WithTURN_SignallingServer.ps1 %* --stun "%1" --turn "%2" --publicip "%3" --cirrusname "%4"
echo %1 %2 %3 %4
popd
pause