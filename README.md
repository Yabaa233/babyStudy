# 英语学伴 · English Study Buddy

两人一起学英语的**静态**互助站。仓库当共同工作区，[GitHub Pages](https://pages.github.com/) 负责展示。无需登录、无需后端、无需构建。

## 功能栏目

| 页面 | 说明 | 数据文件 |
|------|------|----------|
| 首页 `index.html` | 学伴简介、本周目标、快捷入口 | `config.json` |
| 词汇本 `vocab.html` | 单词 / 释义 / 例句 / 添加人 / 日期 | `data/vocab.json` |
| 目标打卡 `goals.html` | 每周目标 + 打卡日志 | `data/goals.json`、`data/checkins.json` |
| 作文互改 `writing.html` | 作文列表与状态 | `writing/index.json` + `writing/*.html` |
| 口语话题 `speaking.html` | 对话题目与提示 | `data/speaking.json` |

## 本地预览

> **重要**：页面用 `fetch` 加载 JSON。用浏览器直接打开 `file://` 往往会失败。请用本地服务器或部署后的 Pages 地址。

```bash
cd english-study-buddy
python3 -m http.server 8080
```

浏览器打开：<http://localhost:8080>

## 启用 GitHub Pages（两人共用）

1. 把本目录推到一个 GitHub 仓库（例如 `english-study-buddy`），默认分支一般为 `main`。
2. 打开仓库 **Settings → Pages**。
3. **Build and deployment → Source** 选 **Deploy from a branch**。
4. Branch 选 `main`（或你的默认分支），文件夹选 **`/ (root)`**，点 Save。
5. 一两分钟后访问：`https://<用户名>.github.io/<仓库名>/`  
   （若仓库名是 `<用户名>.github.io`，则站点根地址就是 `https://<用户名>.github.io/`。）

## 两人如何协作

1. 仓库 **Settings → Collaborators**，把学伴加为 collaborator（或 fork + PR）。
2. 两人各自 clone，改 JSON / HTML，`git commit` 后 `git push`。
3. 习惯上：小改动直接 push 到 `main`；大改或怕冲突时开分支 + Pull Request。
4. 先改 `config.json` 里的学伴名字和本周目标，再往各数据文件里加内容。

### 约定

- **日期**：一律用 ISO 格式，例如 `2026-10-28`。
- **学伴 ID**：`A` 或 `B`（与 `config.json` 里 `partners[].id` 一致）。
- **站点标题 / 姓名**：只改 `config.json`，各页会读这份配置。

## 如何添加内容（示例）

### 1. 改学伴名字与本周目标 — `config.json`

```json
{
  "siteTitle": "English Study Buddy",
  "siteTitleZh": "英语学伴",
  "tagline": "两人一起学英语",
  "partners": [
    {
      "id": "A",
      "name": "Alex",
      "nameZh": "小艾",
      "bio": "喜欢阅读和写作。",
      "bioEn": "Loves reading and writing."
    },
    {
      "id": "B",
      "name": "Blake",
      "nameZh": "小布",
      "bio": "侧重听力和口语。",
      "bioEn": "Focuses on listening and speaking."
    }
  ],
  "weekGoal": "本周一起完成 20 个新词 + 1 篇短文互改 + 2 次口语练习"
}
```

### 2. 加单词 — `data/vocab.json`

在数组末尾追加：

```json
{
  "word": "curious",
  "meaning": "好奇的",
  "example": "She is curious about every new word.",
  "addedBy": "A",
  "date": "2026-10-28"
}
```

### 3. 改本周目标 / 勾选完成 — `data/goals.json`

- 改 `weekOf`、`shared` 文本。
- 把某项 `"done": false` 改成 `true` 表示完成。

### 4. 打卡 — `data/checkins.json`

```json
{
  "date": "2026-10-28",
  "partner": "B",
  "note": "今晚练了 15 分钟口语。"
}
```

### 5. 发作文 — `writing/`

1. 复制一篇已有 HTML（如 `writing/my-study-routine.html`），改标题与正文，Feedback 区留给学伴。
2. 在 `writing/index.json` 增加：

```json
{
  "id": "w4",
  "title": "My Favorite Place",
  "author": "B",
  "date": "2026-10-28",
  "status": "待互改",
  "file": "my-favorite-place.html"
}
```

学伴改完后：在正文页 Feedback 写评语，并把该条 `"status"` 改为 `"已互改"`。

### 6. 加口语话题 — `data/speaking.json`

```json
{
  "id": "s5",
  "title": "Hobbies",
  "titleZh": "爱好",
  "level": "A2–B1",
  "prompts": [
    "What do you usually do after work or school?",
    "Have you picked up a new hobby this year?"
  ],
  "tips": "练习频率表达：usually / once a week / every other day。"
}
```

## 目录结构

```
english-study-buddy/
├── index.html
├── vocab.html
├── goals.html
├── writing.html
├── speaking.html
├── config.json
├── README.md
├── .gitignore
├── assets/
│   ├── style.css
│   └── app.js
├── data/
│   ├── vocab.json
│   ├── goals.json
│   ├── checkins.json
│   └── speaking.json
└── writing/
    ├── index.json
    ├── my-study-routine.html
    ├── a-rainy-afternoon.html
    └── why-improve-english.html
```

## 许可

骨架示例内容可自由修改使用。换成你们自己的名字、目标和文章即可开用。
