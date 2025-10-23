# 部署指南 - Netflix1026

## 🚀 快速部署步驟

### 方法一：Vercel 部署（最簡單，推薦）

1. **準備 GitHub Repository**
   ```bash
   # 初始化 Git（如果還沒有）
   git init
   
   # 添加所有檔案
   git add .
   
   # 提交變更
   git commit -m "Initial commit: Netflix1026 memory album"
   
   # 在 GitHub 上建立新的 repository
   # 然後推送程式碼
   git remote add origin https://github.com/你的用戶名/netflix1026.git
   git branch -M main
   git push -u origin main
   ```

2. **部署到 Vercel**
   - 前往 [vercel.com](https://vercel.com)
   - 點擊 "New Project"
   - 連接 GitHub 帳號
   - 選擇 `netflix1026` repository
   - 點擊 "Deploy"
   - 等待部署完成，獲得網址（例如：`https://netflix1026.vercel.app`）

### 方法二：Netlify 部署

1. **推送程式碼到 GitHub**（同上）

2. **部署到 Netlify**
   - 前往 [netlify.com](https://netlify.com)
   - 點擊 "New site from Git"
   - 連接 GitHub 並選擇 repository
   - 設定：
     - Build command: `npm run build`
     - Publish directory: `dist`
   - 點擊 "Deploy site"

### 方法三：GitHub Pages 部署

1. **推送程式碼到 GitHub**（同上）

2. **啟用 GitHub Pages**
   - 前往 repository 的 Settings
   - 滾動到 "Pages" 部分
   - 在 Source 選擇 "GitHub Actions"
   - 程式碼中的 `.github/workflows/deploy.yml` 會自動處理部署

## 🔧 部署前檢查清單

- [ ] 確保所有依賴都在 `package.json` 中
- [ ] 測試本地建構：`npm run build`
- [ ] 檢查 `vite.config.js` 配置
- [ ] 確認所有圖片和影片連結有效
- [ ] 測試音樂播放功能

## 🌐 自訂網域設定

### Vercel
1. 在 Vercel dashboard 中選擇專案
2. 前往 Settings > Domains
3. 添加您的網域
4. 按照指示設定 DNS 記錄

### Netlify
1. 在 Netlify dashboard 中選擇專案
2. 前往 Domain management
3. 添加自訂網域
4. 設定 DNS 記錄

## 📱 測試部署

部署完成後，請測試以下功能：

- [ ] 頁面載入正常
- [ ] 響應式設計在不同裝置上正常
- [ ] 影片播放功能
- [ ] 音樂播放功能
- [ ] 記憶新增功能
- [ ] 本地儲存功能

## 🔄 更新部署

每次推送程式碼到 main 分支時，部署平台會自動重新部署：

```bash
# 修改程式碼後
git add .
git commit -m "Update: 描述您的變更"
git push origin main
```

## 🛠️ 故障排除

### 常見問題

1. **建構失敗**
   - 檢查 `package.json` 中的依賴
   - 確保所有 import 路徑正確
   - 檢查 TypeScript 錯誤

2. **音樂無法播放**
   - 確保音樂 URL 是公開可訪問的
   - 檢查 CORS 設定
   - 嘗試使用不同的音樂託管服務

3. **圖片無法載入**
   - 檢查圖片 URL 是否有效
   - 確保圖片支援 HTTPS

4. **部署後頁面空白**
   - 檢查瀏覽器控制台錯誤
   - 確認建構輸出目錄正確
   - 檢查路由設定

### 聯絡支援

如果遇到問題，請檢查：
- 瀏覽器開發者工具的控制台
- 部署平台的建構日誌
- GitHub Actions 的執行日誌（如果使用 GitHub Pages）

## 📊 效能優化建議

1. **圖片優化**
   - 使用 WebP 格式
   - 設定適當的圖片尺寸
   - 啟用懶載入

2. **程式碼分割**
   - 已設定手動 chunks 分割
   - 考慮使用 React.lazy() 進行元件懶載入

3. **快取設定**
   - 設定適當的 HTTP 快取標頭
   - 使用 CDN 加速靜態資源

## 🎉 完成！

部署完成後，您將擁有一個完全功能的線上記憶相簿應用程式！
