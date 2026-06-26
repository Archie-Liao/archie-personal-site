@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  Logo 字体小样 · 本地预览
echo  目录: %CD%
echo  浏览器将打开 v7 终选页；本窗口请保持运行，关闭即停止服务。
echo.
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://127.0.0.1:8765/logo-fonts/compare-v7-final.html"
python -m http.server 8765
pause
