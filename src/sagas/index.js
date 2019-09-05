import { take, call, fork, select,put  } from 'redux-saga/effects';

function* test(){
    yield put({type:'action'})
}

export default function* root(){
    yield all([
        fork(test)
    ])
}