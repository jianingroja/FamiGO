import { createContext } from 'react';

type CollectionContext = {
  collectionType: string;
  setCollectionType: Function;
};

export const CollectionContext = createContext<CollectionContext>(
  {} as CollectionContext
);
