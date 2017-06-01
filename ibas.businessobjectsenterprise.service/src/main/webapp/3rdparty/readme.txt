﻿说明：
  1. 此处用来放置第三方类库。
  2. ibas-typescript框架需要以下目录，其中openui5不存在则加载sap官方发布。
     a. ./ibas：下载地址（https://github.com/color-coding/ibas-typescript/ibas/）
     b. ./openui5： 下载地址（https://github.com/color-coding/ibas-typescript/openui5/）
     c. ./openui5/resources: 下载地址（http://openui5.org/download.html）
  3. 此模块使用报表模块，需要映射reportanalysis目录到报表模块api。
     例：mklink /d reportanalysis ..\..\..\..\..\ibas.reportanalysis.service\src\main\webapp\api

  * 以上建议通过操作系统文件链接指令映射，不要拷贝物理文件。
  * 链接指令示例：
      windows: mklink /d ibas E:\MyWorks\ColorCoding\ibas-typescript\ibas
      linux： ln -s ibas /mnt/e/MyWorks/ColorCoding/ibas-typescript/ibas
