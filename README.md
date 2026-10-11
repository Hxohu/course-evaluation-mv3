# UCAS 课程与教师评价表单辅助填写扩展

这是对 [steeellar/course-evaluation](https://github.com/steeellar/course-evaluation) 中 UCAS 课程评价扩展的修改版本，保留原项目 MIT License，并针对当前 Chrome 和新版 UCAS 评价页面进行了适配。

## 修改内容与原因

- **迁移到 Manifest V3**：原清单使用 Manifest V2，当前 Chrome 已不再支持，因此改用 V3。
- **更新评价网站匹配规则**：除原来的 `jwxk.ucas.ac.cn` 外，增加 `xkcts.ucas.ac.cn`，以适配当前课程评价系统。


## 安装

1. 下载或克隆本仓库到本地，并解压（如果下载的是 ZIP）。
2. 在 Chrome 地址栏打开 `chrome://extensions`。
3. 打开右上角的“开发者模式”。
4. 点击“加载已解压的扩展程序”，选择本项目文件夹。
5. 更新文件后，在扩展管理页面点击扩展的“重新加载”，再刷新课程评价页面。

#### 打开谷歌浏览器的扩展程序
![step1](./img/step1.png)
#### 打开开发者模式
![step2](./img/step2.jpg)
#### 点击"加载已解压的的扩展程序",将下载的文件夹加载进来
![step3](./img/step3.jpg)
#### 加载成功后
![step4](./img/step4.jpg)
#### 打开课程网站的评价，可以看到如下结果
![step5](./img/result.jpg)

## 使用说明

扩展会根据页面路径区分课程评估（`evaluateCourse`）和教师评估（`evaluateTeacher`），并自动填写相应选项和意见文本。

自动生成的回答仅供草稿参考。提交前请逐项核对并根据自己的真实体验修改；扩展不会填写验证码，也不会自动点击保存或提交。

当前支持的页面域名包括：

- `xkcts.ucas.ac.cn` 的 `/evaluate/evaluateCourse/` 和 `/evaluate/evaluateTeacher/` 页面

## 来源与许可

本项目基于 [steeellar/course-evaluation](https://github.com/steeellar/course-evaluation) 修改。原项目作者和版权信息见 [LICENSE](./LICENSE)；本仓库保留原 MIT License。新增或修改部分是为适配 Manifest V3 和当前 UCAS 评价页面所作。
