# Google Labs Inspired Design System

这份文档记录了 Kejin AI Lab 网站所采用的设计系统，灵感来源于 Google Labs 及其相关 AI 产品（如 Gemini, Bard）。

## 1. 核心理念

*   **极简主义 (Minimalism)**：大量的留白，清晰的排版，去除不必要的装饰。
*   **未来感 (Futuristic)**：使用霓虹色、玻璃拟态和柔和的渐变来传达科技感和实验性。
*   **以人为本 (Human-centric)**：使用圆角（Pill shape, Rounded corners）让界面更亲切，而非冷冰冰的直角。

## 2. 色彩系统 (Color Palette)

### 2.1 Google 品牌核心色 (Core Brand Colors)
Google 的标志性四色，用于强调和品牌识别。

| 名称 | Hex | 用途 |
| :--- | :--- | :--- |
| **Google Blue** | `#4285F4` | 链接、主按钮、强调信息 |
| **Google Red** | `#EA4335` | 错误提示、热点、强调 |
| **Google Yellow** | `#FBBC05` | 警告、高亮、装饰 |
| **Google Green** | `#34A853` | 成功状态、通过、装饰 |

### 2.2 文字与背景 (Typography & Surface)
使用深灰色而非纯黑，减少视觉疲劳，符合 Google Material Design 3 规范。

| 名称 | Hex | 用途 |
| :--- | :--- | :--- |
| **Primary Text** | `#202124` | 主标题、正文 |
| **Secondary Text** | `#5F6368` | 副标题、说明文字、元数据 |
| **Disabled** | `#DADCE0` | 不可用状态 |
| **Background** | `#FFFFFF` | 页面背景 |
| **Surface** | `#F8F9FA` | 卡片背景、分区背景 |

### 2.3 Labs 霓虹/AI 强调色 (Labs Accents)
用于营造 "Labs" 的实验氛围和 AI 的科技感。

| 名称 | Hex | 用途 |
| :--- | :--- | :--- |
| **Labs Pink** | `#FFD6F4` | 顶部 Banner 背景、柔和的高光 |
| **Labs Green** | `#30FF8F` | 核心 CTA 按钮（"Learn More"），极具辨识度的霓虹绿 |
| **Labs Purple** | `#9D85FF` | AI 生成内容、渐变强调 |
| **Labs Blue** | `#4F9DFF` | 科技感装饰 |

## 3. 视觉元素 (Visual Elements)

### 3.1 形状 (Shapes)
*   **胶囊形 (Pill Shape)**：`border-radius: 999px`。用于按钮、标签、导航链接。
*   **大圆角卡片**：`border-radius: 24px` 或 `32px`。用于内容卡片，给人现代且友好的感觉。

### 3.2 阴影与质感 (Shadows & Texture)
*   **玻璃拟态 (Glassmorphism)**：`backdrop-filter: blur(20px)` + 半透明白背景。用于导航栏和悬浮卡片，营造轻盈感。
*   **弥散光 (Glow)**：使用大半径的彩色阴影（如霓虹绿按钮的阴影），模拟发光效果。

### 3.3 字体 (Typography)
*   首选：`Google Sans`（如果可用）
*   备选：`SF Pro Display` (macOS), `Inter`, `system-ui`
*   特征：几何感强，无衬线，字重对比鲜明（标题 Bold，正文 Regular）。

## 4. 使用示例 (Usage in Tailwind)

```tsx
// 按钮示例
<button className="bg-labs-green text-google-grey-900 rounded-pill shadow-neon-green hover:shadow-neon-green-hover">
  Learn More
</button>

// 卡片示例
<div className="bg-white/80 backdrop-blur-xl rounded-4xl border border-white/40 shadow-glass">
  <h3 className="text-google-grey-900">Project Title</h3>
  <p className="text-google-grey-700">Description...</p>
</div>
```
