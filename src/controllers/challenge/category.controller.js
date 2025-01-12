const getChallengeCategory = () => {
  /**
  #swagger.summary = '챌린지 카테고리 불러오기 API';
  #swagger.description = '사용 가능한 챌린지 카테고리 목록을 불러옵니다.';
  #swagger.tags = ['Challenge'];
  #swagger.security = [{
    "BearerAuth": []
  }]
  #swagger.responses[200] = {
    description: '챌린지 카테고리 조회 성공',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "integer", example: 1 },
                  name: { type: "string", example: "운동" }
                }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[401] = {
    description: '인증 실패',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "AUTH001" },
                reason: { type: "string", example: "Access token is missing or invalid." }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
*/
};

const getWeeklyHotChallenge = () => {
  /**
    #swagger.summary = '이번 주 인기 챌린지 API';
    #swagger.description = '이번 주에 인기 있었던 챌린지 5개를 가져옵니다. 메인 화면에서 사용됩니다.';
    #swagger.tags = ['Challenge'];
    #swagger.security = [{
      "BearerAuth": []
    }]
    #swagger.responses[200] = {
      description: '이번 주 인기 챌린지 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  challenges: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "integer", example: 1 },
                        name: { type: "string", example: "5분만" },
                        description: { type: "string", example: "지각하지 않기 위해 노력하는 사람들" },
                        max_people: { type: "integer", example: 100 },
                        cur_people: { type: "integer", example: 83 },
                        duration: { type: "string", example: "4주" },
                        frequency: { type: "string", example: "주 5회" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[401] = {
      description: '인증 실패',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "AUTH001" },
                  reason: { type: "string", example: "Access token is missing or invalid." }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
   */
  return null; // 함수 내부에 코드 추가
};

export default {
  getChallengeCategory,
  getWeeklyHotChallenge,
};
