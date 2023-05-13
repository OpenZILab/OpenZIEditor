@ECHO OFF 
::set admin
if not "%1"=="am_admin" (powershell start -verb runas '%0' am_admin & exit /b)
title SignallingWebServerKiller
::checknpm
set Pid=''
for /f "tokens=2" %%n in ('tasklist.exe /v ^| find /I "npm" ') do ( 
    if "%errorlevel%"=="1" (goto checkend) else (
        set Pid=%%n
        goto killnpm
    )
)

:killnpm
taskkill /f /t /pid %Pid%

:checkend
exit