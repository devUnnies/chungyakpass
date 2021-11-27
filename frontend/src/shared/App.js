import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
    Main,
    Login,
    Signup,
    AllowLogin,
    GeneralMinyeongApi,
    GeneralMinyeongAptNum,
    GeneralKookminApi,
    GeneralKookminAptNum,
    MultiChildTypeSelect,
    MultiChildMinyeongAptNum,
    MultiChildMinyeongApi,
    MultiChildKookminAptNum,
    MultiChildKookminApi,
    OldParentTypeSelect,
    OldParentKookminApi,
    OldParentKookminAptNum,
    OldParentMinyeongApi,
    OldParentMinyeongAptNum,
    FirstLifeTypeSelect,
    FirstLifeKookminAptNum,
    FirstLifeKookminApi,
    FirstLifeMinyeongAptNum,
    FirstLifeMinyeongApi,
    NewlyMarriedTypeSelect,
    NewlyMarriedKookminAptNum,
    NewlyMarriedKookminApi,
    NewlyMarriedKookminSpecialAptNum,
    NewlyMarriedKookminSpecialApi,
    NewlyMarriedMinyeongAptNum,
    NewlyMarriedMinyeongApi,
    Rank,
    AtAGlance,
    BoardMain,
    BoardView,
    PersonalRules,
    NoEmail,
    Sitemap,
    FAQ,
    MyPage,
    MultiChildPointAptNum,
    MultiChildPoint,
    OldParentPointPost,
    OldParentPoint,
    OneParentPointAptNum,
    OneParentPoint,
    NewlyMarriagePointAptNum,
    NewlyMarriagePoint,
    AddBankbook,
    AddHouse,
    SeeMember,
    AddMember,
    SeeAssets,
    SeeHistories,
    ModMember,
    AddHistory,
    AddLimit,
    ModHistory,
    ModLimit,
    AddAsset,
    ModAsset,
    SeeBankbook,
    ModBankbook,
    SeeHouse,
    ModHouse,
    RecordMain,
    RecordDetailGeneralKoomin,
    RecordDetailGeneralMinyeong,
    RecordDetailSpecialFirstLifeKookmin,
    RecordDetailSpecialFirstLifeMinyeong,
    RecordDetailSpecialNewlyMarriedKookmin,
    RecordDetailSpecialNewlyMarriedMinyeong,
    RecordDetailSpecialMultiChildKookmin,
    RecordDetailSpecialMultiChildMinyeong,
    RecordDetailSpecialOldParentsKookmin,
    RecordDetailSpecialOldParentsMinyeong,
    RecordPointMain,
    RecordPointDetailGeneralMinyeong,
    RecordPointDetailSpecialNewlyMarried,
    RecordPointDetailSpecialSingleParents,
    RecordPointDetailSpecialOldParentsMinyeong,
    RecordPointDetailSpecialOldParents,
    RecordPointDetailSpecialMultiChild,
} from '../pages';
import Header from './header/header';
import Footer from './footer/footer';
import GeneralMinyeoungPoint from '../pages/ExtraPoint/GeneralMinyeoung/GeneralMinyeoungPoint';
import GeneralMinyeoungPointPost from '../pages/ExtraPoint/GeneralMinyeoung/GeneralMinyeongPointPost';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/needLogin" component={AllowLogin} />
                    <Route path="/mypage" component={MyPage} />
                    {/* 부가 정보 */}
                    <Route path="/personalRule" component={PersonalRules} />
                    <Route path="/noEmail" component={NoEmail} />
                    <Route path="/sitemap" component={Sitemap} />
                    {/* 기초정보 관련 */}
                    <Route path="/bankbook" component={SeeBankbook} />
                    <Route path="/addBankbook" component={AddBankbook} />
                    <Route path="/modBankbook" component={ModBankbook} />
                    <Route path="/house" component={SeeHouse} />
                    <Route path="/addHouse" component={AddHouse} />
                    <Route path="/modHouse" component={ModHouse} />
                    <Route path="/members" component={SeeMember} />
                    <Route path="/addMember" component={AddMember} />
                    <Route path="/modMember" component={ModMember} />
                    <Route path="/histories" component={SeeHistories} />
                    <Route path="/addHistory" component={AddHistory} />
                    <Route path="/modHistory" component={ModHistory} />
                    <Route path="/addLimit" component={AddLimit} />
                    <Route path="/modLimit" component={ModLimit} />
                    <Route path="/assets" component={SeeAssets} />
                    <Route path="/addAsset" component={AddAsset} />
                    <Route path="/modAsset" component={ModAsset} />

                    <Route exact path="/atAGlance" component={AtAGlance} />

                    <Route
                        path="/generalMinyeong"
                        component={GeneralMinyeongApi}
                    />
                    <Route
                        path="/generalMinyeongAptNum"
                        component={GeneralMinyeongAptNum}
                    />
                    <Route
                        path="/generalKookmin"
                        component={GeneralKookminApi}
                    />
                    <Route
                        path="/generalKookminAptNum"
                        component={GeneralKookminAptNum}
                    />
                    <Route
                        path="/specialMultiChildTypeSelect"
                        component={MultiChildTypeSelect}
                    />
                    <Route
                        path="/specialMultiChildMinyeong"
                        component={MultiChildMinyeongApi}
                    />
                    <Route
                        path="/specialMultiChildMinyeongAptNum"
                        component={MultiChildMinyeongAptNum}
                    />
                    <Route
                        path="/specialMultiChildKookmin"
                        component={MultiChildKookminApi}
                    />
                    <Route
                        path="/specialMultiChildKookminAptNum"
                        component={MultiChildKookminAptNum}
                    />
                    <Route
                        path="/specialOldParentMinyeong"
                        component={OldParentMinyeongApi}
                    />
                    <Route
                        path="/specialOldParentMinyeongAptNum"
                        component={OldParentMinyeongAptNum}
                    />
                    <Route
                        path="/specialOldParentTypeSelect"
                        component={OldParentTypeSelect}
                    />
                    <Route
                        path="/specialOldParentKookmin"
                        component={OldParentKookminApi}
                    />
                    <Route
                        path="/specialOldParentKookminAptNum"
                        component={OldParentKookminAptNum}
                    />
                    <Route
                        path="/specialFirstLifeTypeSelect"
                        component={FirstLifeTypeSelect}
                    />
                    <Route
                        path="/specialFirstLifeKookminAptNum"
                        component={FirstLifeKookminAptNum}
                    />
                    <Route
                        path="/specialFirstLifeKookmin"
                        component={FirstLifeKookminApi}
                    />
                    <Route
                        path="/specialFirstLifeMinyeongAptNum"
                        component={FirstLifeMinyeongAptNum}
                    />
                    <Route
                        path="/specialFirstLifeMinyeong"
                        component={FirstLifeMinyeongApi}
                    />
                    <Route
                        path="/specialNewlyMarriedTypeSelect"
                        component={NewlyMarriedTypeSelect}
                    />
                    <Route
                        path="/specialNewlyMarriedKookminAptNum"
                        component={NewlyMarriedKookminAptNum}
                    />
                    <Route
                        path="/specialNewlyMarriedKookmin"
                        component={NewlyMarriedKookminApi}
                    />
                    <Route
                        path="/specialNewlyMarriedKookminSpecialAptNum"
                        component={NewlyMarriedKookminSpecialAptNum}
                    />
                    <Route
                        path="/specialNewlyMarriedKookminSpecial"
                        component={NewlyMarriedKookminSpecialApi}
                    />
                    <Route
                        path="/specialNewlyMarriedMinyeongAptNum"
                        component={NewlyMarriedMinyeongAptNum}
                    />
                    <Route
                        path="/specialNewlyMarriedMinyeong"
                        component={NewlyMarriedMinyeongApi}
                    />

                    {/* 순위 확인 페이지 */}
                    <Route path="/rank" component={Rank} />

                    <Route exact path="/boardView/:no" component={BoardView} />
                    <Route path="/case" component={BoardMain} />
                    <Route path="/FAQ" component={FAQ} />

                    {/* 가배점 계산기 */}
                    <Route
                        exact
                        path="/point/generalMinyeoungPost"
                        component={GeneralMinyeoungPointPost}
                    />
                    <Route
                        exact
                        path="/point/generalMinyeoung"
                        component={GeneralMinyeoungPoint}
                    />
                    <Route
                        exact
                        path="/point/multiChildAptNum"
                        component={MultiChildPointAptNum}
                    />
                    <Route
                        exact
                        path="/point/multiChild"
                        component={MultiChildPoint}
                    />
                    <Route
                        exact
                        path="/point/oneParentAptNum"
                        component={OneParentPointAptNum}
                    />
                    <Route
                        exact
                        path="/point/oneParent"
                        component={OneParentPoint}
                    />
                    <Route
                        exact
                        path="/point/newlyMarriageAptNum"
                        component={NewlyMarriagePointAptNum}
                    />
                    <Route
                        exact
                        path="/point/newlyMarriage"
                        component={NewlyMarriagePoint}
                    />
                    <Route
                        exact
                        path="/point/oldParentPost"
                        component={OldParentPointPost}
                    />
                    <Route
                        exact
                        path="/point/oldParent"
                        component={OldParentPoint}
                    />

                    {/* 기록 확인 페이지 */}
                    <Route exact path="/records" component={RecordMain} />
                    <Route
                        path="/recordsGeneralKookmin"
                        component={RecordDetailGeneralKoomin}
                    />
                    <Route
                        path="/recordsGeneralMinyeong"
                        component={RecordDetailGeneralMinyeong}
                    />
                    <Route
                        path="/recordsSpecialKookminPublicFirstLife"
                        component={RecordDetailSpecialFirstLifeKookmin}
                    />
                    <Route
                        path="/recordsSpecialMinyeongFirstLife"
                        component={RecordDetailSpecialFirstLifeMinyeong}
                    />
                    <Route
                        path="/recordsSpecialKookminPublicNewlyMarried"
                        component={RecordDetailSpecialNewlyMarriedKookmin}
                    />
                    <Route
                        path="/recordsSpecialMinyeongNewlyMarried"
                        component={RecordDetailSpecialNewlyMarriedMinyeong}
                    />
                    <Route
                        path="/recordsSpecialKookminPublicMultiChild"
                        component={RecordDetailSpecialMultiChildKookmin}
                    />
                    <Route
                        path="/recordsSpecialMinyeongMultiChild"
                        component={RecordDetailSpecialMultiChildMinyeong}
                    />
                    <Route
                        path="/recordsSpecialKookminPublicOldParents"
                        component={RecordDetailSpecialOldParentsKookmin}
                    />
                    <Route
                        path="/recordsSpecialMinyeongOldParents"
                        component={RecordDetailSpecialOldParentsMinyeong}
                    />

                    {/* 가배점 확인 페이지 */}
                    <Route
                        exact
                        path="/pointRecords"
                        component={RecordPointMain}
                    />
                    <Route
                        path="/recordsPointGeneralMinyeong"
                        component={RecordPointDetailGeneralMinyeong}
                    />

                    <Route
                        path="/recordsPointSpecialNewlyMarried"
                        component={RecordPointDetailSpecialNewlyMarried}
                    />

                    <Route
                        path="/recordsPointSpecialSingleParents"
                        component={RecordPointDetailSpecialSingleParents}
                    />

                    <Route
                        path="/recordsPointSpecialOldParents"
                        component={RecordPointDetailSpecialOldParents}
                    />

                    <Route
                        path="/recordsPointSpecialMultiChild"
                        component={RecordPointDetailSpecialMultiChild}
                    />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;
