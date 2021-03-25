import { AnyAction } from 'redux';

import { put, takeLatest, call, select } from 'redux-saga/effects';

import collaboratorsAPI from '@API/collaborator';
import { Types, Creators } from '@reducers/collaborators';

function* deleteFeedbackRequest({ feedback }: AnyAction) {
  try {
    const { collaborators } = yield select((state) => state);

    const collaboratorId = collaborators.getIn(['collaborator', 'id']);

    const { data }: { data: Feedback } = yield call(
      collaboratorsAPI.feedback.delete,
      collaboratorId,
      feedback.id
    );

    yield put(Creators.deleteFeedbackSuccess(data));
  } catch (error) {
    yield put(Creators.deleteFeedbackError(error));
  }
}

export default function* watch() {
  yield takeLatest(Types.DELETE_FEEDBACK_REQUEST, deleteFeedbackRequest);
}
