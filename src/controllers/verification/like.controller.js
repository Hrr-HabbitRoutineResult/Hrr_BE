const likeSpecificVerification = () => {
  /**
  #swagger.summary = '특정 인증 좋아요 추가/취소 API';
  #swagger.description = '특정 챌린지 인증에 좋아요를 추가하거나 취소하는 API입니다.';
  #swagger.tags = ['Challenge:Verification'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer {token}' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['challengeId'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '101' },
    description: '챌린지 ID'
  };
  #swagger.parameters['verificationId'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '456' },
    description: '인증 ID'
  };
  #swagger.requestBody = {
    required: false,
    description: '요청 본문 데이터는 비어 있습니다.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {},
        },

      }
    }
  };
  #swagger.responses[200] = {
    description: '좋아요 추가/취소 성공',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            error: { type: 'object', nullable: true, example: null },
            success: {
              type: 'object',
              properties: {
                verificationId: { type: 'string', example: '101' },
                likeId: { type: 'string', example: '202' },
                totalLikes: { type: 'integer', example: 3 },
                message: { type: 'string', example: 'Like added successfully.' }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: '잘못된 요청',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAIL' },
            error: { 
              type: 'object',
              properties: {
                errorCode: { type: 'string', example: 'C1100' },
                reason: { type: 'string', example: 'Invalid request data.' }
              }
            },
            success: { type: 'object', nullable: true, example: null }
          }
        }
      }
    }
  };
  #swagger.responses[401] = {
    description: '인증 실패',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAILURE' },
            error: { type: 'string', example: 'Unauthorized access.' }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: '챌린지 또는 인증을 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Challenge or verification not found.' }
          }
        }
      }
    }
  };
  #swagger.responses[500] = {
    description: '서버 오류',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'FAILURE' },
            error: { type: 'string', example: 'Internal server error.' }
          }
        }
      }
    }
  };
   */
};
const unlikeSpecificVerification = () => {
  /**
#swagger.summary = '특정 인증 좋아요 취소 API';
#swagger.description = '특정 인증에 추가된 좋아요를 취소하는 API입니다.';
#swagger.tags = ['Challenge:Verification'];
#swagger.parameters['Authorization'] = {
  in: 'header',
  required: true,
  schema: { type: 'string', example: 'Bearer {token}' },
  description: '인증을 위한 액세스 토큰'
};
#swagger.parameters['challengeId'] = {
  in: 'path',
  required: true,
  schema: { type: 'string', example: '101' },
  description: '챌린지 ID'
};
#swagger.parameters['verificationId'] = {
  in: 'path',
  required: true,
  schema: { type: 'string', example: '456' },
  description: '인증 ID'
};
#swagger.requestBody = {
  required: true,
  description: '좋아요 취소 요청 데이터',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          likeId: { type: 'string', example: 'like12345', description: '취소할 좋아요 ID' }
        },
        required: ['likeId']
      },
    }
  }
};
#swagger.responses[200] = {
  description: '좋아요 취소 성공',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'SUCCESS' },
          error: { type: 'object', nullable: true, example: null },
          success: {
            type: 'object',
            properties: {
              verificationId: { type: 'string', example: '202' },
              totalLikes: { type: 'integer', example: 2 },
              message: { type: 'string', example: 'Like removed successfully.' }
            }
          }
        }
      }
    }
  }
};
#swagger.responses[400] = {
  description: '잘못된 요청',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'FAIL' },
          error: { 
            type: 'object',
            properties: {
              errorCode: { type: 'string', example: 'C1200' },
              reason: { type: 'string', example: 'Invalid request data.' }
            }
          },
          success: { type: 'object', nullable: true, example: null }
        }
      }
    }
  }
};
#swagger.responses[401] = {
  description: '인증 실패',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'FAILURE' },
          error: { type: 'string', example: 'Unauthorized access.' }
        }
      }
    }
  }
};
#swagger.responses[404] = {
  description: '챌린지 또는 인증을 찾을 수 없음',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'NOT_FOUND' },
          error: { type: 'string', example: 'Challenge or verification not found.' }
        }
      }
    }
  }
};
#swagger.responses[500] = {
  description: '서버 오류',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'FAILURE' },
          error: { type: 'string', example: 'Internal server error.' }
        }
      }
    }
  }
};
 */
};

export default {
  likeSpecificVerification,
  unlikeSpecificVerification,
};
