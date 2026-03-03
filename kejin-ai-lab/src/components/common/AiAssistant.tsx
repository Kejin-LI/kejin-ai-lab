import React, { useEffect, useRef } from 'react';
import { CozeWebSDK, WebChatClient } from '@coze/web-sdk';

interface AiAssistantProps {
  botId: string;
  title?: string;
  icon?: string;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ botId, title = "Kejin's AI Assistant", icon }) => {
  const initialized = useRef(false);
  const clientRef = useRef<WebChatClient | null>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Initialize Coze Web SDK
    const client = new CozeWebSDK.WebChatClient({
      config: {
        bot_id: botId,
      },
      componentProps: {
        title: title,
        icon: icon || 'https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/obelisk/coze/favicon.ico',
        layout: 'mobile', // Use mobile layout for better floating bubble experience
        position: {
            bottom: 24, // Keep aligned with back-to-top button
            right: 24,
        }
      },
      auth: {
          // If using OAuth or PAT, configure here. 
          // For public bots, we might use a simple token or open access depending on Coze settings.
          // This is a placeholder for token generation.
          type: 'token',
          token: 'pat_placeholder', // You need to replace this with a valid PAT or token logic
          onRefreshToken: async () => 'pat_placeholder',
      }
    });

    clientRef.current = client;
  }, [botId, title, icon]);

  return null; // The SDK injects its own UI into the DOM
};
