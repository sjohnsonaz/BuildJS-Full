@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\..\node_modules\less\bin\forever" %*
) ELSE (
  node  "%~dp0\..\..\node_modules\less\bin\forever" %*
)