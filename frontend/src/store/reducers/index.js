import { combineReducers } from 'redux';
import auth from './authReducer';
import token from './tokenReducer';
import commonInfo from './commonInfoReducer';
import generalMinyeong from './generalMinyeongReducer';
import generalKookmin from './generalKookminReducer';
import generalMinyeongPoint from './pointGeneralMinyeongReducer';
import multiChildMinyeong from './multiChildMinyeongReducer';
import multiChildKookmin from './multiChildKookminReducer';
import multiChildPoint from './pointSpecialMultiChildReducer';
import oldParentMinyeong from './oldParentMinyeongReducer';
import oldParentKookmin from './oldParentKookminReducer';
import firstInLifeMinyeong from './firstInLifeMinyeongReducer';
import firstInLifeKookmin from './firstInLifeKookminReducer';
import newlyMarriedMinyeong from './newlyMarriedMinyeongReducer';
import newlyMarriedKookmin from './newlyMarriedKookminReducer';
import newlyMarriedKookminSpecial from './newlyMarriedKookminSpecialReducer';
import newlyMarriagePoint from './pointSpecialNewlyMarriageReducer';
import oneParentPoint from './pointSpecialOneParentReducer';
import oldParentPoint from './pointSpecialOldParentReducer';
import records from './recordReducer';

const rootReducer = combineReducers({
    auth,
    token,
    commonInfo,
    generalMinyeong,
    generalKookmin,
    generalMinyeongPoint,
    multiChildMinyeong,
    multiChildKookmin,
    multiChildPoint,
    oldParentMinyeong,
    oldParentKookmin,
    oldParentPoint,
    firstInLifeMinyeong,
    firstInLifeKookmin,
    newlyMarriedKookmin,
    newlyMarriedKookminSpecial,
    newlyMarriedMinyeong,
    newlyMarriagePoint,
    oneParentPoint,
    records,
});

// const rootReducer = (state, action) => {
//     if (action.type === 'LOGOUT') {
//         return appReducer(undefined, action);
//     }

//     return appReducer(state, action);
// };

export default rootReducer;
