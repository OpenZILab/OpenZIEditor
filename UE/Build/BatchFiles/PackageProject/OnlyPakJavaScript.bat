@echo off
chcp 65001

echo %*

rem 记录脚本开始时间，转换为秒数
for /f "tokens=1-3 delims=:." %%a in ("%time%") do set /A "start_time=(((%%a*60)+1%%b %% 100)*60)+1%%c %% 100"

REM Load common environment variables from BaseTask.bat
call Task\BaseTask.bat %*

call Task\GenerateProject.bat %*
if %ERRORLEVEL% neq 0 goto Exit

call Task\CompileProject.bat %*
if %ERRORLEVEL% neq 0 goto Exit

call Task\RunDTS.bat %*
if %ERRORLEVEL% neq 0 goto Exit

call Task\ModifyTs.bat %*
if %ERRORLEVEL% neq 0 goto Exit

call Task\CompileTypeScript.bat %*
if %ERRORLEVEL% neq 0 goto Exit

call Task\RecoveryTs.bat %*
if %ERRORLEVEL% neq 0 goto Exit

call Task\CopyJavaScript.bat %*
if %ERRORLEVEL% neq 0 goto Exit

call Task\ConfuseJS.bat %*
if %ERRORLEVEL% neq 0 goto Exit

call Task\PakJavaScript.bat %*
if %ERRORLEVEL% neq 0 goto Exit



rem 计算运行时间
for /f "tokens=1-3 delims=:." %%a in ("%time%") do set /A "elapsed_time=(((%%a*60)+1%%b %% 100)*60)+1%%c %% 100-start_time"
set /A hours=elapsed_time / 3600, minutes=(elapsed_time %% 3600) / 60, seconds=elapsed_time %% 60
if %hours% lss 10 set hours=0%hours%
if %minutes% lss 10 set minutes=0%minutes%
if %seconds% lss 10 set seconds=0%seconds%


echo.
echo.
echo =====================================================
echo         运行时长:  %hours%:%minutes%:%seconds%
echo =====================================================

pause

if %ERRORLEVEL% neq 0 (
	exit /B 1
) else (
	exit /B 0
)
