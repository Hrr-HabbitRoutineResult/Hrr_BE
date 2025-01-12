const getVerificationComments = () => {
  /**
#swagger.summary = '특정 인증 댓글 조회 API';
#swagger.description = '특정 챌린지 인증에 작성된 댓글들을 조회하는 API입니다.';
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
#swagger.responses[200] = {
  description: '댓글 조회 성공',
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
              comments: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    commentId: { type: 'string', example: 'cmt001' },
                    userId: { type: 'string', example: 'user456' },
                    username: { type: 'string', example: 'RunningBuddy' },
                    content: { type: 'string', example: '대단해요! 꾸준함이 정말 멋집니다.' },
                    createdAt: { type: 'string', format: 'date-time', example: '2025-01-06T16:00:00Z' }
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
              errorCode: { type: 'string', example: 'C1000' },
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
const postVerificationComment = () => {
  /**
  #swagger.summary = '챌린지 인증 댓글 작성 API';
  #swagger.description = '특정 챌린지 인증에 댓글을 작성하는 API입니다.';
  #swagger.tags = ['Challenge:Verification'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['Content-Type'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'application/json' },
    description: '요청 본문의 콘텐츠 타입'
  };
  #swagger.parameters['challengeId'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '123' },
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
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            content: { type: 'string', example: '이 인증 정말 좋네요!', description: '댓글 내용' },
            userId: { type: 'string', example: 'user56789', description: '댓글 작성자 ID' },
            username: { type: 'string', example: '작성자 닉네임', description: '댓글 작성자 닉네임' }
          },
          required: ['content', 'userId', 'username']
        },
        description: '댓글 작성 요청 본문 데이터'
      }
    }
  };
  #swagger.responses[201] = {
    description: '댓글 작성 성공',
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
                commentId: { type: 'string', example: 'comment12345' },
                content: { type: 'string', example: '이 인증 정말 좋네요!' },
                userId: { type: 'string', example: 'user56789' },
                username: { type: 'string', example: '작성자 닉네임' },
                createdAt: { type: 'string', format: 'date-time', example: '2025-01-08T12:34:56Z' },
                message: { type: 'string', example: '댓글이 성공적으로 작성되었습니다.' }
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
                errorCode: { type: 'string', example: 'C800' },
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
    description: '챌린지나 인증을 찾을 수 없음',
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
const updateVerificationComment = () => {
  /**
  #swagger.summary = '특정 인증 댓글 수정 API';
  #swagger.description = '특정 인증에 작성된 댓글을 수정하는 API입니다.';
  #swagger.tags = ['Challenge:Verification'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['Content-Type'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'application/json' },
    description: '요청 본문의 콘텐츠 타입'
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
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            content: { type: 'string', example: '이 인증은 정말 멋집니다!', description: '수정할 댓글 내용' }
          },
          required: ['content']
        },
        description: '댓글 수정 요청 본문 데이터'
      }
    }
  };
  #swagger.responses[200] = {
    description: '댓글 수정 성공',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'SUCCESS' },
            error: { type: 'object', nullable: true, example: null },
            data: {
              type: 'object',
              properties: {
                commentId: { type: 'string', example: 'comment12345' },
                content: { type: 'string', example: '이 인증은 정말 멋집니다!' },
                userId: { type: 'string', example: 'user56789' },
                username: { type: 'string', example: '작성자 닉네임' },
                createdAt: { type: 'string', format: 'date-time', example: '2025-01-08T12:34:56Z' },
                updatedAt: { type: 'string', format: 'date-time', example: '2025-01-08T13:00:00Z' },
                message: { type: 'string', example: '댓글이 성공적으로 수정되었습니다.' }
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
                errorCode: { type: 'string', example: 'C900' },
                reason: { type: 'string', example: 'Invalid request data.' }
              }
            },
            data: { type: 'object', nullable: true, example: null }
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
    description: '댓글을 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Comment not found.' }
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
  getVerificationComments,
  postVerificationComment,
  updateVerificationComment,
};
