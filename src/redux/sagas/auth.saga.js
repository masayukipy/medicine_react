import { put, call, takeLatest, all } from "redux-saga/effects";
import { AuthService } from "../services";
import { AuthTypes } from "../types";

const authService = new AuthService();

export function* login(action) {
  try {
    const res = yield call(authService.login, action.payload);
    console.log(res);
    if (res.error) {
      yield put({
        type: AuthTypes.LOGIN_ERROR,
        error: res.message,
      });
    } else {
      yield put({ type: AuthTypes.LOGIN_SUCCESS, data: res });
    }
  } catch (error) {
    yield put({ type: AuthTypes.LOGIN_ERROR, error });
  }
}

export function* signup(action) {
  try {
    const res = yield call(authService.signup, action.payload);
    console.log(res);
    if (res.error) {
      yield put({
        type: AuthTypes.LOGIN_ERROR,
        error: res.message,
      });
    } else {
      yield put({ type: AuthTypes.SIGNUP_SUCCESS, data: res });
    }
  } catch (error) {
    yield put({ type: AuthTypes.LOGIN_ERROR, error });
  }
}

export default function* allSaga() {
  yield all([takeLatest(AuthTypes.LOGIN_REQUEST, login),takeLatest(AuthTypes.SIGNUP_REQUEST, signup)]);
}