import{j as e}from"./vendor-9B0Rq5pT.js";const a=()=>e.jsxs("div",{"trae-inspector-start-line":"6","trae-inspector-start-column":"4","trae-inspector-end-line":"130","trae-inspector-end-column":"10","trae-inspector-file-path":"src/pages/LoadingPreview.tsx","trae-inspector-static-props":"%7B%22cwd%22%3A%22%2FUsers%2Fbytedance%2FDesktop%2FTREA%2Fai_lab%2Fkejin-ai-lab%22%7D",style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100vw",backgroundColor:"#FFFBF0",color:"#2D3436",fontFamily:"'Fredoka', 'Outfit', sans-serif",flexDirection:"column",gap:"32px",position:"relative",overflow:"hidden"},children:[e.jsx("style",{"trae-inspector-start-line":"20","trae-inspector-start-column":"6","trae-inspector-end-line":"118","trae-inspector-end-column":"16","trae-inspector-file-path":"src/pages/LoadingPreview.tsx","trae-inspector-static-props":"%7B%22cwd%22%3A%22%2FUsers%2Fbytedance%2FDesktop%2FTREA%2Fai_lab%2Fkejin-ai-lab%22%7D",children:`
        .avatar-container {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(255, 255, 255, 0.8);
          position: relative;
          z-index: 10;
          box-shadow: 0 10px 25px rgba(255, 175, 204, 0.3);
          animation: float 6s ease-in-out infinite;
        }

        .glow-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 175, 204, 0.4) 0%, rgba(162, 210, 255, 0) 70%);
          z-index: 1;
          animation: breathe 3s ease-in-out infinite;
        }

        .glow-ring:nth-child(2) {
          width: 140%;
          height: 140%;
          animation-delay: -1s;
          opacity: 0.6;
        }

        .glow-ring:nth-child(3) {
          width: 180%;
          height: 180%;
          animation-delay: -2s;
          opacity: 0.3;
        }

        .loading-text {
          font-size: 18px;
          font-weight: 500;
          color: #636E72;
          letter-spacing: 1px;
          animation: pulse 2s ease-in-out infinite;
        }

        .progress-bar-container {
          width: 200px;
          height: 6px;
          background: rgba(45, 52, 54, 0.05);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .progress-bar {
          height: 100%;
          width: 30%;
          background: linear-gradient(90deg, #FFC8DD, #A2D2FF);
          border-radius: 10px;
          position: absolute;
          left: 0;
          top: 0;
          animation: progress 2s ease-in-out infinite;
        }

        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes progress {
          0% { width: 0%; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0%; left: 100%; }
        }
      `}),e.jsxs("div",{"trae-inspector-start-line":"120","trae-inspector-start-column":"6","trae-inspector-end-line":"125","trae-inspector-end-column":"12","trae-inspector-file-path":"src/pages/LoadingPreview.tsx","trae-inspector-static-props":"%7B%22cwd%22%3A%22%2FUsers%2Fbytedance%2FDesktop%2FTREA%2Fai_lab%2Fkejin-ai-lab%22%7D",className:"avatar-container",children:[e.jsx("div",{"trae-inspector-start-line":"121","trae-inspector-start-column":"8","trae-inspector-end-line":"121","trae-inspector-end-column":"41","trae-inspector-file-path":"src/pages/LoadingPreview.tsx","trae-inspector-static-props":"%7B%22cwd%22%3A%22%2FUsers%2Fbytedance%2FDesktop%2FTREA%2Fai_lab%2Fkejin-ai-lab%22%7D",className:"glow-ring"}),e.jsx("div",{"trae-inspector-start-line":"122","trae-inspector-start-column":"8","trae-inspector-end-line":"122","trae-inspector-end-column":"41","trae-inspector-file-path":"src/pages/LoadingPreview.tsx","trae-inspector-static-props":"%7B%22cwd%22%3A%22%2FUsers%2Fbytedance%2FDesktop%2FTREA%2Fai_lab%2Fkejin-ai-lab%22%7D",className:"glow-ring"}),e.jsx("div",{"trae-inspector-start-line":"123","trae-inspector-start-column":"8","trae-inspector-end-line":"123","trae-inspector-end-column":"41","trae-inspector-file-path":"src/pages/LoadingPreview.tsx","trae-inspector-static-props":"%7B%22cwd%22%3A%22%2FUsers%2Fbytedance%2FDesktop%2FTREA%2Fai_lab%2Fkejin-ai-lab%22%7D",className:"glow-ring"}),e.jsx("img",{"trae-inspector-start-line":"124","trae-inspector-start-column":"8","trae-inspector-end-line":"124","trae-inspector-end-column":"446","trae-inspector-file-path":"src/pages/LoadingPreview.tsx","trae-inspector-static-props":"%7B%22cwd%22%3A%22%2FUsers%2Fbytedance%2FDesktop%2FTREA%2Fai_lab%2Fkejin-ai-lab%22%7D",className:"avatar-img",src:"https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=3D%20pixar%20style%20cute%20cartoon%20girl%20upper%20body%20portrait%20long%20brown%20hair%20no%20bangs%20exposed%20forehead%20bright%20smile%20wearing%20plain%20beige%20scarf%20grey%20top%20background%20sea%20horizon%20above%20head%20distant%20small%20mountains%20across%20the%20sea%20soft%20lighting&image_size=square",alt:"Loading..."})]}),e.jsx("p",{"trae-inspector-start-line":"126","trae-inspector-start-column":"6","trae-inspector-end-line":"126","trae-inspector-end-column":"61","trae-inspector-file-path":"src/pages/LoadingPreview.tsx","trae-inspector-static-props":"%7B%22text%22%3A%22Loading%20Kejin%20AI%20Lab...%22%2C%22textStartLine%22%3A%22126%22%2C%22textStartColumn%22%3A%2234%22%2C%22textEndLine%22%3A%22126%22%2C%22textEndColumn%22%3A%2257%22%2C%22cwd%22%3A%22%2FUsers%2Fbytedance%2FDesktop%2FTREA%2Fai_lab%2Fkejin-ai-lab%22%7D",className:"loading-text",children:"Loading Kejin AI Lab..."}),e.jsx("div",{"trae-inspector-start-line":"127","trae-inspector-start-column":"6","trae-inspector-end-line":"129","trae-inspector-end-column":"12","trae-inspector-file-path":"src/pages/LoadingPreview.tsx","trae-inspector-static-props":"%7B%22cwd%22%3A%22%2FUsers%2Fbytedance%2FDesktop%2FTREA%2Fai_lab%2Fkejin-ai-lab%22%7D",className:"progress-bar-container",children:e.jsx("div",{"trae-inspector-start-line":"128","trae-inspector-start-column":"8","trae-inspector-end-line":"128","trae-inspector-end-column":"44","trae-inspector-file-path":"src/pages/LoadingPreview.tsx","trae-inspector-static-props":"%7B%22cwd%22%3A%22%2FUsers%2Fbytedance%2FDesktop%2FTREA%2Fai_lab%2Fkejin-ai-lab%22%7D",className:"progress-bar"})})]});export{a as default};
