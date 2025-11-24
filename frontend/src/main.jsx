import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from '@/App';
import '@/i18n';
import { store } from '@/store';

const realtimeClient = new Ably.Realtime({
  key: import.meta.env.VITE_ABLY_PUB_SUB_KEY,
  clientId: 'melo-chart-frontend',
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AblyProvider client={realtimeClient}>
        <ChannelProvider channelName="melo-chart-song-updates">
          <App />
        </ChannelProvider>
      </AblyProvider>
    </Provider>
  </StrictMode>,
);
