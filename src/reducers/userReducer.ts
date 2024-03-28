import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  VERIFY_COOKIE_REQUEST,
  VERIFY_COOKIE_SUCCESS,
  VERIFY_COOKIE_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../actions";

export interface UserState {
  loading: boolean;
  message: string | null;
  username?: string;
  error: string | null;
  user?: { username?: string; id: string };
}

const initialState: UserState = {
  loading: false,
  message: null,
  error: null,
};

export const userReducer = (
  state = initialState,
  action: { type: string; payload?: any }
): UserState => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case SIGNUP_FAILURE:
      return { ...state, loading: false, user: undefined, error: action.payload };
    case VERIFY_COOKIE_REQUEST:
      return { ...state, loading: true };
    case VERIFY_COOKIE_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case VERIFY_COOKIE_FAILURE:
      return { ...state, loading: false, error: "Verification failed" };
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, message: action.payload, error: null };
    case LOGIN_FAILURE:
      return { ...state, loading: false, message: null, error: action.payload };
    default:
      return state;
  }
};
