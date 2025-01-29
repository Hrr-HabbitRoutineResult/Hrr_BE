import { StatusCodes } from 'http-status-codes';
import boardService from '../services/board.service.js';
import boardDto from '../dtos/board.dto.js';
const getBoardCategories = async (req, res, next) => {
  /**
  #swagger.summary = '게시판 카테고리 목록 조회 API';
  #swagger.description = '게시판의 카테고리 목록을 조회하는 API입니다.';
  #swagger.tags = ['Board'];
  #swagger.responses[200] = {
    description: '게시판 카테고리 목록 조회 성공',
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
                  type: 'object',
                  properties: {
                    top: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer', example: 1 },
                          name: { type: 'string', example: '운동게시판' },
                          description: { type: 'string', example: '같이 운동해요!.' },
                          status: { type: 'string', example: 'pinned' }
                        }
                      }
                    },
                    categories: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          categoryName: { type: 'string', example: '운동' },
                          boards: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                id: { type: 'integer', example: 1 },
                                name: { type: 'string', example: '운동게시판' },
                                description: { type: 'string', example: '같이 운동해요!.' },
                                status: { type: 'string', example: 'pinned' }
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
  try {
    const user_email = req.user.email;
    const user_board = await boardService.getBoardCategories(user_email);
    return res.status(StatusCodes.OK).json(user_board);
  } catch (error) {
    next(error);
  }
};

const createBoard = async (req, res, next) => {
  /**
  #swagger.summary = '게시판 생성 API';
  #swagger.description = '사용자가 새로운 게시판을 생성하는 API입니다.';
  #swagger.tags = ['Board'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.requestBody = {
    required: true,
    description: '새로운 게시판 생성 요청 데이터',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', example: '새로운 게시판 이름' },
            description: { type: 'string', example: '새로운 게시판 설명' },
            category: { type: 'string', example: '운동' }
          },
          required: ['name', 'description', 'category']
        },
      }
    }
  };
  #swagger.responses[201] = {
    description: '게시판 생성 성공',
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
                message: { type: 'string', example: 'new board created successfully' },
                data: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: '새로운 게시판 이름' },
                    description: { type: 'string', example: '새로운 게시판 설명' },
                    category: { type: 'string', example: '운동' }
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
  try {
    const new_board = await boardService.createBoard(boardDto.createBoardResponseDto(req.body));
    return res.status(StatusCodes.OK).json(new_board);
  } catch (error) {
    next(error);
  }
};

const pinBoard = async (req, res, next) => {
  /**
  #swagger.summary = '게시판 상단 고정 API';
  #swagger.description = '특정 게시판을 게시판 상단에 고정하는 API입니다.';
  #swagger.tags = ['Board'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['boardID'] = {
    in: 'path',
    required: true,
    schema: { type: 'integer', example: 1 },
    description: '게시판 ID'
  };
  #swagger.requestBody = {
    required: false,
    description: '이 요청에는 본문이 필요하지 않습니다.',
    content: {
      'application/json': {
        schema: { type: 'object' },
      }
    }
  };
  #swagger.responses[200] = {
    description: '게시판 상단 고정 성공',
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
                message: { type: 'string', example: 'Post pinned successfully' },
                boardId: { type: 'integer', example: 3 },
                status: { type: 'string', example: 'pinned' }
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
  #swagger.responses[404] = {
    description: '게시판을 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Board not found.' }
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
  try {
    const board_id = parseInt(req.params.boardId, 10);
    const board = await boardService.patchBoardPinStatus(board_id, true);
    return res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const unpinBoard = async (req, res, next) => {
  /**
  #swagger.summary = '게시판 상단 고정 해제 API';
  #swagger.description = '특정 게시판을 게시판 상단에서 고정 해제하는 API입니다.';
  #swagger.tags = ['Board'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['boardID'] = {
    in: 'path',
    required: true,
    schema: { type: 'integer', example: 1 },
    description: '게시판 ID'
  };
  #swagger.requestBody = {
    required: false,
    description: '이 요청에는 본문이 필요하지 않습니다.',
    content: {
      'application/json': {
        schema: { type: 'object' },
      }
    }
  };
  #swagger.responses[200] = {
    description: '게시판 상단 고정 해제 성공',
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
                message: { type: 'string', example: 'Post pinned successfully' },
                boardId: { type: 'integer', example: 3 },
                status: { type: 'string', example: 'pinned' }
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
  #swagger.responses[404] = {
    description: '게시판을 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Board not found.' }
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
  try {
    const board_id = parseInt(req.params.boardId, 10);
    const board = await boardService.patchBoardPinStatus(board_id, false);
    return res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};

const getBoardHotPosts = () => {
  /**
  #swagger.summary = '특정 게시판 인기 글 목록 조회 API';
  #swagger.description = '특정 게시판의 인기 글 목록을 조회하는 API입니다.';
  #swagger.tags = ['Board'];
  #swagger.parameters['boardId'] = {
    in: 'path',
    required: true,
    schema: { type: 'integer', example: 1 },
    description: '조회할 게시판의 ID'
  };
  #swagger.responses[200] = {
    description: '특정 게시판 인기 글 목록 조회 성공',
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
                      postId: { type: 'integer', example: 1 },
                      title: { type: 'string', example: 'HOT 게시글 제목 1' },
                      likes: { type: 'integer', example: 500 },
                      comments: { type: 'integer', example: 50 },
                      saved: { type: 'integer', example: 10 }
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
            error: { type: 'string', example: 'Invalid request.' }
          }
        }
      }
    }
  };
  #swagger.responses[404] = {
    description: '게시판을 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Board not found.' }
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
  getBoardCategories,
  createBoard,
  pinBoard,
  unpinBoard,
  getBoardHotPosts,
};
