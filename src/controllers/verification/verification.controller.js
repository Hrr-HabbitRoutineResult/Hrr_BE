const getChallengeVerificationStatus = () => {
  /**
  #swagger.summary = '챌린지 인증 현황 조회 API';
  #swagger.description = '현재 참가 중인 챌린지의 인증 현황(총 인원, 인증 완료 인원, 미인증 인원)을 조회하는 API입니다.';
  #swagger.tags = ['Challenge:Verification'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <JWT_TOKEN>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['challengeId'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '3' },
    description: '챌린지 ID'
  };
  #swagger.requestBody = {
    required: false,
    description: '요청 본문 데이터는 비어 있습니다.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {}
        },
      }
    }
  };
  #swagger.responses[200] = {
    description: '챌린지 인증 현황 조회 성공',
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
                challengeInfo: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 3 },
                    name: { type: 'string', example: '2025년 개발 챌린지' },
                    challengeType: { type: 'string', example: 'basic' }
                  }
                },
                participants: {
                  type: 'object',
                  properties: {
                    total: { type: 'integer', example: 50 },
                    verified: { type: 'integer', example: 35 },
                    unverified: { type: 'integer', example: 15 }
                  }
                },
                verificationRate: { type: 'number', format: 'float', example: 0.7 }
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
                errorCode: { type: 'string', example: 'C1500' },
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
    description: '챌린지를 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Challenge not found.' }
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
const getWeeklyVerification = () => {
  /**
#swagger.summary = '이번 주 인증 현황 조회 API';
#swagger.description = '특정 챌린지에서 사용자가 이번 주 어떤 요일에 인증했는지를 조회하는 API입니다.';
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
#swagger.responses[200] = {
  description: '주간 인증 현황 조회 성공',
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
              challengeId: { type: 'string', example: '101' },
              userId: { type: 'string', example: 'user123' },
              weekStart: { type: 'string', format: 'date', example: '2025-01-06' },
              weekEnd: { type: 'string', format: 'date', example: '2025-01-12' },
              checkedDays: {
                type: 'array',
                items: { type: 'string', example: 'Monday' },
                description: '인증한 요일 목록'
              },
              message: { type: 'string', example: 'Weekly check data retrieved successfully.' }
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
              errorCode: { type: 'string', example: 'C1600' },
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
  description: '챌린지를 찾을 수 없음',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          resultType: { type: 'string', example: 'NOT_FOUND' },
          error: { type: 'string', example: 'Challenge not found.' }
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
const getSpecificVerification = () => {
  /**
  #swagger.summary = '특정 인증 상세 조회 API';
  #swagger.description = '특정 챌린지 인증의 상세 정보를 조회하는 API입니다. 본인 또는 다른 챌린저의 인증 정보를 확인할 수 있습니다.';
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
    schema: { type: 'string', example: '202' },
    description: '인증 ID'
  };
  #swagger.responses[200] = {
    description: '인증 상세 조회 성공',
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
                challengeId: { type: 'string', example: '101' },
                userId: { type: 'string', example: 'user123' },
                checkedAt: { type: 'string', format: 'date-time', example: '2025-01-06T15:00:00Z' },
                imageUrl: { type: 'string', example: 'https://example.com/uploads/checkin202.jpg' },
                description: { type: 'string', example: '오늘의 인증: 5km 러닝 완료!' },
                link: { type: 'string', example: 'https://example.com/workout-log' },
                likes: { type: 'integer', example: 42 },
                scraps: { type: 'integer', example: 10 },
                comments: { type: 'integer', example: 5 },
                isLiked: { type: 'boolean', example: true },
                isScrapped: { type: 'boolean', example: false },
                hasQuestion: { type: 'boolean', example: true },
                isFollowingAuthor: { type: 'boolean', example: true }
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
                errorCode: { type: 'string', example: 'C1700' },
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
const cameraVerification = () => {
  /**
  #swagger.summary = '챌린지 사진 인증 등록 API';
  #swagger.description = '특정 챌린지에 사진 인증을 등록하는 API입니다. (사진 업로드, 다시 찍기, 인증하기 등 처리)';
  #swagger.tags = ['Challenge:Verification'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <ACCESS_TOKEN>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.requestBody = {
    required: true,
    description: '사진 업로드를 위한 multipart/form-data 형식의 요청 데이터',
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            photoUrl: {
              type: 'string',
              format: 'binary',
              description: '업로드할 사진 파일'
            }
          },
          required: ['photoUrl']
        },
      }
    }
  };
  #swagger.responses[200] = {
    description: '사진 인증 등록 성공',
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
                message: { type: 'string', example: '사진 인증이 완료되었습니다.' },
                verifications: {
                  type: 'object',
                  properties: {
                    UserInfo: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '1' },
                        name: { type: 'string', example: '홍길동' },
                        profilePhoto: { type: 'string', example: 'https://image.com' }
                      }
                    },
                    challengeInfo: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '1' },
                        name: { type: 'string', example: '운동하는 챌린지' },
                        challengeType: { type: 'string', example: 'basic' }
                      }
                    },
                    verification: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer', example: 1 },
                        photoUrl: { type: 'string', example: 'https://photoverification.com' }
                      }
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
                errorCode: { type: 'string', example: 'C1800' },
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
            error: { type: 'string', example: 'Challenge not found.' }
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
const textVerification = () => {
  /**
  #swagger.summary = '챌린지 글 인증 등록 API';
  #swagger.description = '사용자가 챌린지 글로 인증을 등록하는 API입니다. 제목, 내용, 링크, 질문 여부 등을 포함합니다.';
  #swagger.tags = ['Challenge:Verification'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <ACCESS_TOKEN>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.requestBody = {
    required: true,
    description: '챌린지 글 인증 요청 데이터',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: { type: 'string', example: '챌린지 글로 인증하기', description: '인증 글 제목' },
            content: { type: 'string', example: '인증 글입니다!', description: '인증 글 내용' },
            textUrl: { type: 'string', example: 'https://notionverification.com', description: '인증 글의 외부 링크 URL' },
            question: { type: 'boolean', example: false, description: '질문 여부' }
          },
          required: ['title', 'content', 'textUrl', 'question']
        },
      }
    }
  };
  #swagger.responses[200] = {
    description: '글 인증 등록 성공',
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
                message: { type: 'string', example: '글 인증이 완료되었습니다.' },
                verifications: {
                  type: 'object',
                  properties: {
                    UserInfo: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '2' },
                        name: { type: 'string', example: '유엠씨' },
                        profilePhoto: { type: 'string', example: 'https://profile.com' }
                      }
                    },
                    challengeInfo: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '2' },
                        name: { type: 'string', example: '책 읽는 챌린지' },
                        challengeType: { type: 'string', example: 'basic' }
                      }
                    },
                    verification: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '2' },
                        title: { type: 'string', example: '챌린지 글로 인증하기' },
                        content: { type: 'string', example: '인증 글입니다!' },
                        textUrl: { type: 'string', example: 'https://notionverification.com' },
                        question: { type: 'boolean', example: false },
                        created_at: { type: 'string', format: 'date-time', example: '2025-01-07' }
                      }
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
                errorCode: { type: 'string', example: 'C1900' },
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
            error: { type: 'string', example: 'Challenge not found.' }
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
const getTemporaryVerification = () => {
  /**
  #swagger.summary = '챌린지 글 인증 임시저장 조회 API';
  #swagger.description = '챌린지 글 인증 작성 중 임시 저장된 내용을 조회하는 API입니다.';
  #swagger.tags = ['Challenge:Verification'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['challengeId'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '101' },
    description: '챌린지 ID'
  };
  #swagger.parameters['temporaryverificationId'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '202' },
    description: '임시 인증 ID'
  };
  #swagger.responses[200] = {
    description: '임시 저장된 글 인증 조회 성공',
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
                data: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      UserInfo: {
                        type: 'object',
                        properties: {
                          id: { type: 'string', example: '1' },
                          name: { type: 'string', example: '홍길동' },
                          profilePhoto: { type: 'string', example: 'https://image.com' }
                        }
                      },
                      TemporaryVerifications: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer', example: 1 },
                          title: { type: 'string', example: '글 인증 올립니다.' },
                          content: { type: 'string', example: '임시저장' },
                          created_at: { type: 'string', format: 'date-time', example: '2025-01-08' }
                        }
                      }
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
                errorCode: { type: 'string', example: 'C2000' },
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
    description: '임시 저장된 인증을 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Temporary verification not found.' }
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
const deleteTemporaryVerification = () => {
  /**
  #swagger.summary = '임시 저장된 글 삭제 API';
  #swagger.description = '챌린지 글 인증 작성 중 임시 저장된 내용을 삭제하는 API입니다.';
  #swagger.tags = ['Challenge:Verification'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <JWT_TOKEN>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['challengeId'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '101' },
    description: '챌린지 ID'
  };
  #swagger.parameters['temporaryverificationId'] = {
    in: 'path',
    required: true,
    schema: { type: 'string', example: '202' },
    description: '삭제할 임시 인증 ID'
  };
  #swagger.responses[200] = {
    description: '임시 저장 삭제 성공',
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
                message: { type: 'string', example: '임시저장 글이 삭제 되었습니다.' }
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
                errorCode: { type: 'string', example: 'C2100' },
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
    description: '임시 저장된 인증을 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Temporary verification not found.' }
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
  getChallengeVerificationStatus,
  getWeeklyVerification,
  getSpecificVerification,
  cameraVerification,
  textVerification,
  getTemporaryVerification,
  deleteTemporaryVerification,
};
