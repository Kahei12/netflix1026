# Netflix1026 - 記憶相簿

一個美麗的記憶相簿應用程式，使用 React + Vite + Tailwind CSS 建構。

## 功能特色

- 🎬 影片和圖片記憶展示
- 🎵 背景音樂播放
- 📱 響應式設計
- ✨ 流暢的動畫效果
- 💾 本地儲存功能

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 部署到線上

### 方法一：使用 Vercel（推薦）

1. 將程式碼推送到 GitHub
2. 前往 [Vercel](https://vercel.com)
3. 連接 GitHub 帳號
4. 選擇此專案並部署
5. 自動獲得 HTTPS 網址

### 方法二：使用 Netlify

1. 將程式碼推送到 GitHub
2. 前往 [Netlify](https://netlify.com)
3. 連接 GitHub 並選擇專案
4. 設定建構命令：`npm run build`
5. 設定發布目錄：`dist`

### 方法三：使用 GitHub Pages

1. 在 GitHub 專案設定中啟用 Pages
2. 選擇 GitHub Actions 作為來源
3. 建立 `.github/workflows/deploy.yml` 檔案
4. 自動部署到 `https://username.github.io/repository-name`

## 專案結構

```
src/
├── components/          # React 元件
│   ├── layout/         # 佈局元件
│   ├── memories/       # 記憶相關元件
│   └── ui/             # UI 元件
├── types/              # TypeScript 類型定義
├── utils/              # 工具函數
└── App.tsx             # 主應用程式
```

## 技術棧

- **前端框架**: React 18
- **建構工具**: Vite
- **樣式**: Tailwind CSS
- **動畫**: Framer Motion
- **圖示**: Lucide React
- **語言**: TypeScript

## 授權

MIT License
