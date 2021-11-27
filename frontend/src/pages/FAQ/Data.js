const questions = [
    {
        id: 1,
        name: (
            <>
                <strong>[공통정보입력]</strong>{' '}
                <span>자산 관련 정보 조회 방법</span>
            </>
        ),
        info: (
            <span>
                <p>
                    <strong>청약홈 → 청약자격확인 → 주택소유확인</strong>
                    <div>
                        '성명,주소, 용도, 전용면적, 공시가, 잔금지급일,
                        계약일자, 취득일자' 조회 가능
                    </div>
                </p>
                <p>
                    <strong>대법원인터넷등기소 → 부동산등기</strong>
                    <div>'부동산 매도일' 조회 가능</div>
                </p>
            </span>
        ),
    },
    {
        id: 2,
        name: (
            <>
                <strong>[공통정보입력]</strong>{' '}
                <span>월평균 소득 조회 방법</span>
            </>
        ),
        info: <span>국민건강보험 → 조회 및 발급 → 직장보험료 개인별 조회</span>,
    },
    {
        id: 3,
        name: (
            <>
                <strong>[공통정보입력]</strong>{' '}
                <span>아파트 분양 정보 조회 방법</span>
            </>
        ),
        info: <span>청약홈 → 청약일정 및 통계 → 분양정보 / 경쟁률</span>,
    },
    {
        id: 4,
        name: (
            <>
                <strong>[공통정보입력]</strong> <span>통장 정보 조회 방법</span>
            </>
        ),
        info: <span>청약홈 → 청약자격확인 → 청약통장 가입내역</span>,
    },
    {
        id: 5,
        name: (
            <>
                <strong>[공통정보입력]</strong>{' '}
                <span>청약 신청이력 조회 방법</span>
            </>
        ),
        info: <span>청약홈 → 마이페이지 → apt</span>,
    },
    {
        id: 6,
        name: (
            <>
                <strong>[공통정보입력]</strong>{' '}
                <span>청약제한사항 조회 방법</span>
            </>
        ),
        info: <span>청약홈 → 청약자격확인 → 청약제한사항확인</span>,
    },
    {
        id: 7,
        name: (
            <>
                <strong>[무주택]</strong>{' '}
                <span>무주택자 기준에 대해 정확히 알고싶습니다.</span>
            </>
        ),
        info: (
            <span>
                주택소유 여부를 판단할 때 분양권등을 갖고 있거나 주택 또는
                분양권등의 공유지분을 소유하고 있는 경우에는 주택을 소유하고
                있는 것으로 보되, 주택공급에 관한 규칙 제53조(주택소유 여부
                판정기준) 각 호의 어느 하나에 해당하는 경우에는 주택을 소유하지
                아니한 것으로 봅니다.
            </span>
        ),
    },
    {
        id: 8,
        name: (
            <>
                <strong>[세대구성원]</strong>{' '}
                <span>부양 가족으로 인정되는 기준이 무엇인가요?</span>
            </>
        ),
        info: (
            <span>
                입주자모집공고일 현재 청약신청자와 동일한 주민등록표등본에
                기재된 세대원 중 아래의 경우에 해당됩니다. 더 자세한 내용은 추후
                제공될 예정입니다.
            </span>
        ),
    },
];
export default questions;
