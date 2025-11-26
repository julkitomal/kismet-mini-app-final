import React, { createContext, useContext, useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import { FarcasterUser, FarcasterContextType } from '../types';

const FarcasterContext = createContext<FarcasterContextType>({
  user: null,
  isLoaded: false,
  isContextLoaded: false,
  isConnected: false,
});

export const useFarcaster = () => useContext(FarcasterContext);

export const FarcasterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isContextLoaded, setIsContextLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        // Attempt to load context - this promise resolves when running in a Frame
        const context = await sdk.context;
        
        if (context?.user) {
          // Access properties safely from the SDK user object
          const u = context.user as any; 
          setUser({
            fid: u.fid,
            username: u.username,
            displayName: u.displayName,
            pfpUrl: u.pfpUrl,
            location: u.location,
            custodyAddress: u.custodyAddress,
            verifications: u.verifications as string[],
          });
          setIsContextLoaded(true);
        }

        // Signal to Farcaster client that the frame is ready to be displayed
        sdk.actions.ready();
      } catch (err) {
        // SDK load failed or not in frame context - expected behavior for standard web
      } finally {
        setIsLoaded(true);
      }
    };

    if (sdk && !isLoaded) {
      load();
    }
  }, [isLoaded]);

  return (
    <FarcasterContext.Provider value={{ user, isLoaded, isContextLoaded, isConnected: !!user }}>
      {children}
    </FarcasterContext.Provider>
  );
};