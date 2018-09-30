import { AuthApiT } from '../auth';
import { RestaurantsApiT } from '../restaurants';

export const LOADING: 'LOADING' = 'LOADING';
export const ERROR: 'ERROR' = 'ERROR';

export type ActionApiT = AuthApiT | RestaurantsApiT;

export interface ICommonState {
  error: { [actionType: string]: string | null };
  loading: { [actionType: string]: boolean };
}

export type CommonStateT = Readonly<ICommonState>;

interface LoadingAction {
  type?: typeof LOADING;
  actionType: ActionApiT;
  loading: boolean;
}

interface ErrorAction {
  type?: typeof ERROR;
  actionType: ActionApiT;
  message: string | null;
}

type AuthActions = LoadingAction | ErrorAction;

const initialState: ICommonState = {
  error: {},
  loading: {},
};

export default function reducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        error: { ...state.error, [action.actionType]: null },
        loading: { ...state.loading, [action.actionType]: action.loading as boolean },
      };

    case ERROR:
      return {
        ...state,
        error: { ...state.error, [action.actionType]: action.message as string },
      };

    default:
      return state;
  }
}

export const setLoading = ({ actionType, loading }: LoadingAction) => ({
  actionType,
  loading,
  type: LOADING,
});

export const setError = ({ actionType, message }: ErrorAction) => ({
  actionType,
  message,
  type: ERROR,
});
