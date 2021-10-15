import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import SummonersRift from 'pages/summoners-rift/SummonersRift';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SummonersRift />
    </QueryClientProvider>
  );
};

export default App;
