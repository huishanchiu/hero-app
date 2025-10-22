# Hero App

一個管理各個 Hero 能力值的小專案
[📌DEMO 連結](https://hero-app-beige.vercel.app/heroes)

## 如何執行專案

#### 環境需求

- Node.js 20+
- pnpm 9+

#### 安裝與執行

```bash
# 安裝依賴
pnpm install

# 開發模式
pnpm dev

# 執行測試
pnpm test
```

## 專案架構

```bash
src/
├── api/               # API 層
│   ├── apiClient.ts   # Axios 實例配置
│   ├── CustomError.ts # 自訂義錯誤處理
│   └── heroApi.ts     # hero 相關 API
├── components/        # UI 元件
│   ├── Common/        # 通用元件（Loading, Toast, ErrorBoundary 等）
│   └── Hero/          # hero 相關元件（HeroList, HeroProfile）
├── context/           # React Context（狀態管理）
│   └── ToastProvider.tsx       # Toast 通知
├── hooks/                      # 自定義 Hooks
│   ├── useHeroData.ts          # hero 資料查詢與更新
│   └── useHeroStatPoints.ts    # 點數計算邏輯
├── pages/             # 頁面元件
│   └── HeroPage.tsx   # 主頁面
├── style/             # 頁面元件
│   └── breakPoint.ts  # 定義手機斷點
│   └── theme.emotion.ts        # 定義色彩系統
├── type/              # 型別定義
│   └── HeroType.ts    # hero 相關 type
├── utils/             # 共用函數
│   ├── isObjectShallowEqual.ts  # 物件淺比較
│   └── objectEntries.ts         # 型別安全的 Object.entries
├── test/              # 測試
│   ├── setup.ts       # Vitest 設定
│   └── testUtils.tsx  # 測試工具函數
└── main.tsx           # 應用程式進入點
```

## 架構設計理念

本專案以**可維護性**、**可擴充性**與**可測試性**為核心目標，採用**組件化架構（Component-Based Architecture）** 進行開發。透過模組化設計將可重用的元件與邏輯抽離為獨立模組，提高整個應用的彈性與可擴展性。

> ### **關注點分離（Separation of Concerns）**

將應用程式切分為不同職責的層級，確保每個模組專注於單一責任：

- **UI**：專注於畫面渲染與使用者互動（[components/](src/components/)）
- **邏輯**：將業務邏輯封裝於 Custom Hooks（[hooks/](src/hooks/)）
- **資料**：透過 API 模組與 React Query 管理資料流（[api/](src/api/)）
- **型別**：集中定義型別，確保型別安全（[type/](src/type/)）

這樣的分層設計讓每個模組的職責清晰，降低耦合度，提升可測試性與可維護性。

> ### **API 層獨立封裝**

將所有與後端溝通的邏輯集中於 `api/` 資料夾：

- **統一配置**：透過 [apiClient.ts](src/api/apiClient.ts) 建立 Axios 實例，統一管理 baseURL、timeout、interceptors 等配置
- **錯誤處理**：使用 [CustomError.ts](src/api/CustomError.ts) 自訂錯誤類別，統一錯誤訊息格式
  - 便於在 UI 層顯示一致的錯誤訊息
  - 未來擴充時易於新增錯誤類型（如權限錯誤、網路錯誤等）
- **API 模組化**：將不同功能的 API 分檔管理（如 [heroApi.ts](src/api/heroApi.ts)），未來新增其他功能時可快速擴充
- **型別安全**：所有 API 函式都明確定義回傳型別，避免執行時錯誤

> ### **資料狀態管理策略**

採用 **TanStack Query (React Query)** 管理伺服器端狀態：

- **自動快取機制**
  - 減少重複的 API 請求，提升效能與使用者體驗
  - 切換不同 Hero 時可立即顯示快取資料，再於背景更新
- **請求狀態管理**
  - 自動追蹤 `isLoading`、`isError`、`onSuccess` 狀態
  - 組件不需手動管理複雜的狀態邏輯
- **請求取消**
  - 支援 AbortController，避免使用者快速切換時產生多餘請求
  - 減少不必要的網路流量與潛在的 race condition

> ### **Custom Hooks 抽象化邏輯**

將複雜的業務邏輯與狀態管理封裝為可重用的 Custom Hooks：

- **[useHeroData.ts](src/hooks/useHeroData.ts)**
  - 封裝 Hero 資料的查詢、更新邏輯
  - 整合 React Query 的 mutation 與快取管理
- **[useHeroStatPoints.ts](src/hooks/useHeroStatPoints.ts)**
  - 封裝點數計算、驗證邏輯
  - 管理屬性點數的增減、剩餘點數計算
  - 提供還原功能，追蹤變更狀態

> ### **型別安全與工具函式**

- **型別定義集中管理**：所有型別定義統一放置於 [type/](src/type/) 資料夾
- **型別安全工具**：如 [objectEntries.ts](src/utils/objectEntries.ts) 確保 `Object.entries` 的型別正確性
- **淺比較工具**：[isObjectShallowEqual.ts](src/utils/isObjectShallowEqual.ts) 用於比較物件，優化按鈕 disabled 邏輯

> ### **共用元件設計**

將可重用的 UI 元件抽離至 [Common/](src/components/Common/) 資料夾：

- **SkeletonCard**：統一的骨架屏元件，提升載入時的使用者體驗
- **Toast**：統一的通知元件，提供一致的操作回饋
- **ErrorBoundary**：捕捉元件錯誤，避免整個應用崩潰
- **CustomModal**：統一的 popup modal，以 props 決定不同呈現內容，具備高度彈性與可重用性

## 技術選用

- **建置工具**：Vite
  - 以 vite 作為開發伺服器，讓前端能快速啟動，熱模組更新 (hot module replacement, HMR) 提供更好的開發體驗
- **語言**：TypeScript
  - 透過靜態型別檢查機制，能在開發階段即時偵測潛在錯誤，並透過明確的型別定義與介面設計，使資料流更具一致性與可預期性
- **狀態管理**：TanStack Query (React Query)
  - 可以自動處理 loading、error、success 狀態，透過內建的快取與錯誤重試機制，確保畫面資料即時同步並減少重複請求。
    同時讓組件不需再負責資料請求邏輯，提升整體程式結構的清晰度與可維護性
- **樣式**：Emotion (CSS-in-JS)
  - @emotion/styled 用於建立可重用的樣式元件，確保 UI 結構一致，以及能根據 props 改變樣式，具備高彈性與可維護性
    而 @emotion/react 支援 ThemeProvider，能統一管理顏色、字體與間距等設計系統
- **HTTP 客戶端**：Axios
  - Axios 內建 攔截器（Interceptor） 機制，能在所有請求與回應前後進行統一處理，例如附加 headers、統一錯誤格式。
    透過 request/response 轉換，可在資料進出 API 前進行格式化，讓前端邏輯更乾淨。
    同時 Axios 會自動進行 JSON 轉換，簡化資料處理過程。
    相較於原生 fetch，Axios 在 錯誤處理 上更完整，能清楚區分網路錯誤、伺服器錯誤與回應錯誤
- **測試**：Vitest + React Testing Library
  - Vitest：專案採用 Vitest 作為單元測試框架，主要因其能與 Vite 無縫整合，設定簡潔且啟動速度快。
    Vitest 基於 ESM 模組系統 運行，能充分發揮 Vite 的編譯效能，讓測試在開發環境中快速執行。
    此外，Vitest 的 API 與 Jest 高度相容，開發者可沿用既有測試知識，降低導入成本。
  - React Testing Library： 以「使用者角度」來撰寫測試，而非著重在程式實作細節。
    透過模擬實際操作（如點擊、輸入、畫面渲染等），
    測試能更真實地反映使用者體驗，確保 UI 行為符合預期。
- **程式碼品質**：ESLint + Prettier + eslint-config-prettier
  - 專案導入 ESLint 與 Prettier 作為靜態分析與格式化工具。
    ESLint 用於偵測潛在錯誤與不合規寫法，
    Prettier 則負責自動格式化程式碼，保持統一的縮排與排版規則
  - `eslint-config-prettier` 關閉 ESLint 中與 Prettier 可能衝突的規則，確保兩者能順利共存

## 註解原則

- **複雜的業務邏輯**：特殊的邊界條件處理
- **共用函式解釋**：用 JSDoc 補充參數型別及範例
- **已知的限制或問題**：標註暫時性的解決方案

## 遇到的困難與解決方法

#### 1. **Hero Profile API 的多餘請求**

- **問題**：使用者點擊 Hero A 在拿資料時快速切換到 Hero B，會造成 Hero A 的 profile api 多餘請求
- **解決**：在 `useQuery` 時將 `signal` 傳進 api 的 config，可支援切換畫面時取消原本 api

#### 2. **Hero Profile 資料與畫面不同步**

- **問題**：使用者儲存（尚未儲存完成） Hero A 時切換畫面到 Hero B，會造成 Hero A 資料更新但畫面沒更新
- **解決**：使用全屏 Loading 畫面預防使用者切換畫面

## 提升程式碼品質

1. **TypeScript**：靜態型別檢查，減少執行時錯誤
2. **ESLint + Prettier**：統一程式碼風格
3. **單元測試**：針對核心邏輯（如 `useHeroStatPoints`、`isObjectShallowEqual`）撰寫測試
4. **型別安全工具**：如 `objectEntries` 確保 `Object.entries` 的型別正確

## 進階功能

### 優化使用者體驗

1. **新增還原功能**：讓使用者可以還原點數至上次儲存結果
2. **減少使用者無效點擊**
   - 以`isObjectShallowEqual`來檢查當前的點數與上次儲存的結果是否相同，若相同則「還原」、「儲存」按鈕 disable

   - 當已經沒有剩餘點數可以新增時，「增加」按鈕 disable

3. **Loading 狀態**：利用 skeleton 、全屏 loading 畫面及數字設定為問號來表示資料讀取中
4. **未儲存提醒**：當使用者變更點數但尚未儲存，若當下想要換到其他頁面會跳出 popup 提醒使用者資料未存檔
5. **快取功能**：利用 `react-query`的快取功能讓再次點擊不同 Hero 時可以拿舊有資料，不用每次點擊都打 api
6. **Toast 通知**：操作成功/失敗時即時回饋
7. **響應式設計**：支援手機、桌面裝置

### 讓專案更加完整的功能

1. **環境變數**：針對正式及測試站建立環境變數（`.env` 檔案），將來若 api 有區分不同站別便可以快速對接，也提供 `dev:prod` script 方便在本地測試正式環境設定
2. **定義色彩系統**：讓整個網頁的色彩統一好管理
3. **CI/CD**：發 PR 時會自動檢查 lint、type 與測試，確保合進主分支的檔案品質，另外將檔案部署至 Vercel ，支援當 main 分支有改動時自動部署
