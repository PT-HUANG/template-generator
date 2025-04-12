# 圖片模板快速產出工具

這是一個協助前端工程師快速產出 HTML 結構與 CSS 樣式的小工具，適用於處理大量圖片區塊、元件或背景圖時使用。  
使用者只需上傳圖片，即可依模板自動產生對應的程式碼，並支援一鍵複製。

## 🔧 功能特色

- 上傳多張圖片並自動產出 HTML 結構
- 提供兩種模板選擇：「背景（section）」與「元件（component）」
- 可自動依圖片尺寸換算百分比寬度，產出 CSS 樣式
- 支援 HTML/CSS 一鍵複製，快速貼入專案

## 📁 專案結構

```
index.html       // 主畫面與操作介面
index.js         // 功能邏輯與事件處理
style.css        // 頁面樣式設計
```

## 🚀 使用方式

1. 前往 [https://pt-huang.github.io/template-generator/](https://pt-huang.github.io/template-generator/)
2. 選擇「模板類型」：
   - 背景（section）：適用於全幅背景區塊
   - 元件（component）：適用於定位元件（可產生 CSS）
3. 上傳圖片（可多選）
4. 自動產出 HTML 結構
5. 若選擇「元件」模板，點擊「產生 CSS」按鈕產出 CSS 樣式
6. 點擊「複製 HTML」或「複製 CSS」即可複製到剪貼簿

## 📦 範例輸出

### HTML（背景模板）

```html
<section class="bg BG_01">
  <div class="container relative">
    <img
      class="lazy"
      data-src="./images/BG/BG_01.jpg"
      width="1200"
      height="800"
      src="./images/BG/BG_01.jpg"
    />
  </div>
</section>
```

### HTML（元件模板）

```html
<img
  class="lazy absolute component1"
  data-src="images/component1.jpg"
  width="400"
  height="300"
  src="./images/component1.jpg"
/>
```

### CSS（元件樣式）

```css
.component1 {
  width: 40%;
  top: 0%;
  left: 0%;
}
```

## 🙋‍♂️ 作者

此專案由 [pt-huang](https://github.com/pt-huang) 開發與維護。  
此工具由公司內部設計團隊開發，主要用於提升前端網頁開發效率。如有建議歡迎交流與改進 🙌
