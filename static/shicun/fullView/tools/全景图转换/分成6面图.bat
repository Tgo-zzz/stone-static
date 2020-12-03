@echo off
echo 全景图转6面图工具
echo.

IF "%~1" == "" GOTO ERROR
IF NOT EXIST "%~1" GOTO ERROR

FOR %%V in (%*) do "%~dp0\ktransform" -config=convertdroplets.config "%%~V"

GOTO DONE

:ERROR
echo.
echo 使用说明:
echo.   不要双击打开，请使用图片拖放。
echo - 把球形全景图像拖放在BAT图标，
echo   就可以分成6面立体图片.
echo.
echo.  阿福专用
echo.  QQ：10543884


:DONE
echo.
pause
