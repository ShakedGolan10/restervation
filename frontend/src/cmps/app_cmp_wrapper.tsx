import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../store/store.ts';
import { closeError } from '../store/system.actions.ts';
import { Loader } from './helpers/loader.tsx';
import { ErrorModal } from './helpers/error.tsx';


const AppCmpWrapper = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper = (props: P): ReactElement => {
    const isLoading = useSelector((storeState: AppStore) => storeState.systemModule.isLoading);
    const error = useSelector((storeState: AppStore) => storeState.systemModule.error);

    return (
      <>
        {isLoading && <Loader />}
        {error && <ErrorModal error={error} onClose={closeError} />}
        <WrappedComponent {...props} />
      </>
    );
  };

  return Wrapper;
};

export default AppCmpWrapper;
