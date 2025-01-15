const sendMessage = () => {
  /**
  #swagger.summary = '쪽지 전송 API';
  #swagger.description = '쪽지를 특정 사용자에게 전송하는 API입니다.';
  #swagger.tags = ['Message'];
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
  #swagger.requestBody = {
    required: true,
    description: '전송할 쪽지의 내용 및 수신자 ID',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            receivedUser_id: { type: 'integer', example: 12345 },
            content: { type: 'string', example: '안녕하세요, 쪽지를 보냅니다.' }
          },
          required: ['receivedUser_id', 'content']
        },
      }
    }
  };
  #swagger.responses[200] = {
    description: '쪽지 전송 성공',
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
                message: { type: 'string', example: '쪽지가 성공적으로 전송되었습니다.' },
                Messages: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 336 },
                      receivedUser_id: { type: 'integer', example: 12345 },
                      sendUser_id: { type: 'integer', example: 56789 },
                      content: { type: 'string', example: '안녕하세요, 쪽지를 보냅니다.' },
                      created_at: { type: 'string', format: 'date', example: '2025-01-08' }
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
            resultType: { type: 'string', example: 'FAILURE' },
            error: { type: 'string', example: 'Invalid input data.' }
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
const getMessageInbox = () => {
  /**
  #swagger.summary = '받은 쪽지 목록 조회 API';
  #swagger.description = '사용자가 받은 쪽지 목록을 조회하는 API입니다.';
  #swagger.tags = ['Message'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.responses[200] = {
    description: '받은 쪽지 목록 조회 성공',
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
                current_page: { type: 'integer', example: 1 },
                total_page: { type: 'integer', example: 5 },
                messages: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      message_id: { type: 'integer', example: 234 },
                      receivedUser_name: { type: 'string', example: '홍길동' },
                      receivedUser_profilePhoto: { type: 'string', example: 'https://profile.com' },
                      receivedUser_level: { type: 'string', example: 'Gold' },
                      title: { type: 'string', example: '안녕하세요' },
                      content: { type: 'string', example: '쪽지 입니다.' },
                      time_age: { type: 'string', example: '3시간 전' },
                      post_id: { type: 'integer', example: 456 }
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
const leaveMessage = () => {
  /**
  #swagger.summary = '쪽지함 나가기 API';
  #swagger.description = '사용자가 특정 상대와의 쪽지함을 나가는 API입니다.';
  #swagger.tags = ['Message'];
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
  #swagger.requestBody = {
    required: true,
    description: '나가려는 쪽지함의 상대방 ID',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            chat_partner_id: { type: 'integer', example: 12345 }
          },
          required: ['chat_partner_id']
        },
      }
    }
  };
  #swagger.responses[200] = {
    description: '쪽지함 나가기 성공',
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
                message: { type: 'string', example: '쪽지함을 성공적으로 나갔습니다.' }
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
            resultType: { type: 'string', example: 'FAILURE' },
            error: { type: 'string', example: 'Invalid input data.' }
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
    description: '쪽지함을 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Chat partner not found.' }
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
  sendMessage,
  getMessageInbox,
  leaveMessage,
};
