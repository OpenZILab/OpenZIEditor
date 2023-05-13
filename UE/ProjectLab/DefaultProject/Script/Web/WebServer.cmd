

if "%1"=="" (
set port=18892
) else (
set port=%1
)
pushd "%~dp0"
node webserver.js api=%port%
popd
