# MOMO 上架助手 (MOMO Product Uploader)

本專案是一個基於 React + Vite + Tailwind CSS 的商品上架輔助工具，專為 MOMO 平台設計。
主要功能包含：
- 快速生成上架所需的 Excel 檔案
- 自動打包商品圖片與 Excel 為 Zip 檔
- 簡易的變數替換功能 (如 `[長]`, `[寬]`, `[淨重]`)

## 專案位置
`c:\Users\user\Desktop\google擴充\測試git\`

## 開發與執行

### 安裝依賴
由終端機執行：
```bash
npm install
```

### 本地開發預覽
啟動本地伺服器：
```bash
npm run dev
```
瀏覽器打開 `http://localhost:5173/` (或終端機顯示的其他網址)。

### 打包發布 (Build)
產生最終靜態檔案 (位於 `dist`資料夾)：
```bash
npm run build
```

## 部署至 GitHub Pages

由於已經設定 `vite.config.js` 中的 `base: './'`，您可以直接將 `dist` 資料夾的內容部署到 GitHub Pages，或者將整個專案推送到 GitHub。

### 建議流程 (推送整個專案)

1. 初始化 Git (若尚未初始化)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. 建立 GitHub Repository 並推送
   ```bash
   git remote add origin <您的 GitHub Repo URL>
   git push -u origin main
   ```

3. 設定 GitHub Pages
   - 在 GitHub Repo 的 Settings -> Pages
   - Source 選擇 `GitHub Actions` 或手動將 `dist` 資料夾推送到 `gh-pages` 分支 (視您的 CI/CD 設定而定)。
   - 最簡單的方式是安裝 `gh-pages` 套件：
     ```bash
     npm install gh-pages --save-dev
     ```
     然後在 `package.json` 的 `scripts` 加上：
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
     ```
     最後執行 `npm run deploy` 即可一鍵部署。
