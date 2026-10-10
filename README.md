# UCAS 课程与教师评价表单辅助填写扩展

这是对 [steeellar/course-evaluation](https://github.com/steeellar/course-evaluation) 中 UCAS 课程评价扩展的修改版本，保留原项目 MIT License，并针对当前 Chrome 和新版 UCAS 评价页面进行了适配。

## 修改内容与原因

- **迁移到 Manifest V3**：原清单使用 Manifest V2，当前 Chrome 已不再支持，因此改用 V3。
- **更新评价网站匹配规则**：除原来的 `jwxk.ucas.ac.cn` 外，增加 `xkcts.ucas.ac.cn`，以适配当前课程评价系统。规则不写端口号，因此可覆盖该站点的 `:8443` 地址。
- **兼容新版教师评价表单**：新版页面不再使用旧脚本写死的 `item_...` 字段名。找不到旧字段时，脚本会按页面中的单选项分组和文本框填写。
- **通知页面表单状态变化**：填写后派发 `input` 和 `change` 事件，便于页面脚本识别更新。
- **保留旧页面兼容**：如果旧版字段仍存在，脚本继续按字段名填写。

## 安装

1. 下载或克隆本仓库到本地，并解压（如果下载的是 ZIP）。
2. 在 Chrome 地址栏打开 `chrome://extensions`。
3. 打开右上角的“开发者模式”。
4. 点击“加载已解压的扩展程序”，选择本项目文件夹。
5. 更新文件后，在扩展管理页面点击扩展的“重新加载”，再刷新课程评价页面。

## 使用说明

扩展在 UCAS 课程评价页面自动填写评价选项和意见文本。评分会随机选择页面中较靠前的两个选项，文本内容也会自动生成。提交前请检查并按自己的真实体验修改；扩展不会填写验证码，也不会自动点击保存或提交。

当前支持的页面域名包括：

- `jwxk.ucas.ac.cn`
- `xkcts.ucas.ac.cn`（包括 `:8443` 端口）

## 来源与许可

本项目基于 [steeellar/course-evaluation](https://github.com/steeellar/course-evaluation) 修改。原项目作者和版权信息见 [LICENSE](./LICENSE)；本仓库保留原 MIT License。新增或修改部分是为适配 Manifest V3 和当前 UCAS 评价页面所作。
