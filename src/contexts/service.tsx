import { FC, createContext, useContext } from 'react';
import Collections from '../service/client/Collections';

interface Client {
  collections: Collections;
}

interface State {
  client: Client;
}

const ServiceContext = createContext<State | null>(null);

interface ServiceProps {
  worker: Worker;
  children: React.ReactNode;
}

const ServiceProvider: FC<ServiceProps> = ({worker, children}) => {
  const client: Client = {
    collections: new Collections(worker),
  }

  return (
    <ServiceContext.Provider value={{client}}>
      {children}
    </ServiceContext.Provider>
  );
}

export const useService = (): State => {
  const state = useContext(ServiceContext);

  if (!state) {
    throw new Error('Service provider is not initialized.')
  }

  return state;
}

export default ServiceProvider;