@echo off
chcp 65001

set EXECUTE_INIT_DATA=false

call Task\BaseTask.bat %*

set Source=%ARCHIVED_DIR%\%PROJECT_NAME%_Package_%EditorVersion%.zip
set Dest=D:\UEPack\%PROJECT_NAME%\Package
xcopy %Source% %Dest%