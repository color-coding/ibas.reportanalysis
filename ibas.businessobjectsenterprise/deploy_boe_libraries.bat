@echo off
setlocal EnableDelayedExpansion
echo ***************************************************************************
echo      deploy_boe_libraries.bat
echo                     by niuren.zhu
echo                           2017.05.16
echo  ˵����
echo     1. �ϴ�boe��jar����maven�ֿ⡣
echo     2. ���PATH������%%MAVEN_HOME%%\bin�������JAVA_HOME�����Ƿ���ȷ��
echo     3. ��^<servers^>�ڵ�����ӣ������û�����������Ҫ�����Ա���룩
echo             ^<server^>
echo               ^<id^>nexus-3rd^<^/id^>
echo               ^<username^>�û���^<^/username^>
echo               ^<password^>����^<^/password^>
echo             ^<^/server^>
echo ****************************************************************************
REM ���ò�������
SET WORK_FOLDER=%~dp0
REM �ֿ��ַ
SET REPOSITORY_URL=http://ibas.club:8877/nexus/content/repositories/thirdparty/
REM �ֿ��ʶ
SET REPOSITORY_ID=ibas
REM ����
SET GROUP_ID=com.sap.boe
REM �汾
SET VERSION=4.2.2

echo --��ʼ����Ŀ¼[%WORK_FOLDER%]
REM ����pom.dependencies.txt
@echo ^<boe.version^>%VERSION%^<^/boe.version^> >"%WORK_FOLDER%pom.dependencies.txt"
for /f %%l in ('dir /a /b "%WORK_FOLDER%*.jar"' ) do (
  echo --ע���ļ�[%%l]
  mvn deploy:deploy-file -DgroupId=%GROUP_ID% -DartifactId=%%~nl -Dversion=%VERSION% -Dpackaging=jar -Dfile="%WORK_FOLDER%%%l" -Durl=%REPOSITORY_URL% -DrepositoryId=%REPOSITORY_ID%
  REM ���ɴ��ļ�����
  @echo ^<dependency^> >>"%WORK_FOLDER%pom.dependencies.txt"
  @echo     ^<groupId^>%GROUP_ID%^<^/groupId^> >>"%WORK_FOLDER%pom.dependencies.txt"
  @echo     ^<artifactId^>%%~nl^<^/artifactId^> >>"%WORK_FOLDER%pom.dependencies.txt"
  @echo     ^<version^>^$^{boe.version^}^<^/version^> >>"%WORK_FOLDER%pom.dependencies.txt"
  @echo ^<^/dependency^> >>"%WORK_FOLDER%pom.dependencies.txt"
)
echo --�������
