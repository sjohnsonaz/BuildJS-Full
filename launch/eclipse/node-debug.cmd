@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\..\node_modules\node-inspector\bin\node-debug.js" %*
) ELSE (
  node  "%~dp0\..\..\node_modules\node-inspector\bin\node-debug.js" %*
)