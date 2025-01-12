const getPopularPosts = () => {
  /**
  #swagger.summary = '게시판 인기 글 조회 API';
  #swagger.description = '게시판 별로 좋아요 순으로 인기 있는 게시글을 보여주는 API입니다.';
  #swagger.tags = ['Board'];
  #swagger.parameters['Content-Type'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'application/json' },
    description: '요청 본문의 콘텐츠 타입'
  };
  #swagger.responses[200] = {
    description: '인기 게시글 조회 성공',
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
                boards: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      boardId: { type: 'string', example: '12345' },
                      posts: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            postId: { type: 'string', example: '54321' },
                            title: { type: 'string', example: '게시글 제목 1' },
                            content: { type: 'string', example: '게시글 본문 일부 1' },
                            likes: { type: 'integer', example: 120 },
                            author: {
                              type: 'object',
                              properties: {
                                userId: { type: 'string', example: 'user123' },
                                username: { type: 'string', example: '작성자 닉네임 1' }
                              }
                            },
                            createdAt: { type: 'string', format: 'date-time', example: '2025-01-06T12:34:56Z' }
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
const getMyPosts = () => {
  /**
  #swagger.summary = '내가 작성한 글 목록 조회 API';
  #swagger.description = '사용자가 작성한 글 목록을 조회하는 API입니다.';
  #swagger.tags = ['Post'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.responses[200] = {
    description: '사용자 글 목록 조회 성공',
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
                      title: { type: 'string', example: '내가 쓴 글 제목 1' },
                      createdAt: { type: 'string', format: 'date', example: '2025-01-01' },
                      likes: { type: 'integer', example: 50 },
                      comments: { type: 'integer', example: 10 }
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
const getCommentedPosts = () => {
  /**
  #swagger.summary = '내가 댓글을 단 글 목록 조회 API';
  #swagger.description = '사용자가 댓글을 단 글 목록을 조회하는 API입니다.';
  #swagger.tags = ['Post'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.responses[200] = {
    description: '댓글 단 글 목록 조회 성공',
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
                      title: { type: 'string', example: '댓글 단 글 제목 1' },
                      createdAt: { type: 'string', format: 'date', example: '2025-01-01' },
                      likes: { type: 'integer', example: 100 },
                      comments: { type: 'integer', example: 20 }
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
const getSavedPosts = () => {
  /**
  #swagger.summary = '저장한 글 목록 조회 API';
  #swagger.description = '사용자가 저장한 글 목록을 조회하는 API입니다.';
  #swagger.tags = ['Post'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.responses[200] = {
    description: '저장한 글 목록 조회 성공',
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
                      title: { type: 'string', example: '저장한 글 제목 1' },
                      createdAt: { type: 'string', format: 'date', example: '2025-01-01' },
                      likes: { type: 'integer', example: 100 },
                      comments: { type: 'integer', example: 20 }
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
const getPostList = () => {
  /**
  #swagger.summary = '전체 게시글 목록 조회 API';
  #swagger.description = '전체 게시글 목록을 조회하는 API입니다.';
  #swagger.tags = ['Post'];
  #swagger.responses[200] = {
    description: '전체 게시글 목록 조회 성공',
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
                      title: { type: 'string', example: '게시글 제목 1' },
                      author: { type: 'string', example: '홍길동' },
                      createdAt: { type: 'string', format: 'date', example: '2025-01-01' },
                      likes: { type: 'integer', example: 100 },
                      comments: { type: 'integer', example: 10 },
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
const getPostDetail = () => {
  /**
  #swagger.summary = '게시글 상세 정보 조회 API';
  #swagger.description = '특정 게시글의 상세 정보를 조회하는 API입니다.';
  #swagger.tags = ['Post'];
  #swagger.parameters['postId'] = {
    in: 'path',
    required: true,
    schema: { type: 'integer', example: 123 },
    description: '조회할 게시글의 ID'
  };
  #swagger.responses[200] = {
    description: '게시글 상세 정보 조회 성공',
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
                    postId: { type: 'integer', example: 123 },
                    title: { type: 'string', example: '게시글 제목' },
                    content: { type: 'string', example: '게시글 내용입니다.' },
                    author: { type: 'string', example: '홍길동' },
                    createdAt: { type: 'string', format: 'date', example: '2025-01-01' },
                    likes: { type: 'integer', example: 150 },
                    comments: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          commentId: { type: 'integer', example: 1 },
                          author: { type: 'string', example: '이순신' },
                          content: { type: 'string', example: '좋은 글입니다.' },
                          createdAt: { type: 'string', format: 'date', example: '2025-01-02' }
                        }
                      }
                    },
                    saved: { type: 'integer', example: 30 }
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
    description: '게시글을 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Post not found.' }
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
const createPost = () => {
  /**
  #swagger.summary = '새 게시글 작성 API';
  #swagger.description = '새로운 게시글을 작성하는 API입니다.';
  #swagger.tags = ['Post'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['boardId'] = {
    in: 'path',
    required: true,
    schema: { type: 'integer', example: 1 },
    description: '게시판의 ID'
  };
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: { type: 'string', example: '새로운 게시글 제목' },
            content: { type: 'string', example: '게시글 내용입니다.' },
            anonymity: { type: 'boolean', example: false },
            image: {
              type: 'array',
              items: { type: 'string', example: 'http://img1.com' }
            }
          },
          required: ['title', 'content', 'anonymity']
        },
        description: '새로운 게시글 작성 요청 데이터'
      }
    }
  };
  #swagger.responses[201] = {
    description: '새 게시글 작성 성공',
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
                message: { type: 'string', example: 'Post created successfully' },
                postId: { type: 'integer', example: 123 }
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
const likePost = () => {
  /**
  #swagger.summary = '게시글 좋아요 추가 API';
  #swagger.description = '특정 게시글에 좋아요를 추가하는 API입니다.';
  #swagger.tags = ['Post'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['postId'] = {
    in: 'path',
    required: true,
    schema: { type: 'integer', example: 123 },
    description: '좋아요를 추가할 게시글의 ID'
  };
  #swagger.requestBody = {
    required: false,
    content: {
      'application/json': {
        schema: { type: 'object' },
        description: '이 요청에는 본문이 필요하지 않습니다.'
      }
    }
  };
  #swagger.responses[200] = {
    description: '게시글 좋아요 추가 성공',
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
                message: { type: 'string', example: 'Post liked successfully' }
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
    description: '게시글을 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Post not found.' }
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
const commentOnPost = () => {
  /**
  #swagger.summary = '게시글 댓글 추가 API';
  #swagger.description = '특정 게시글에 댓글을 추가하는 API입니다.';
  #swagger.tags = ['Post'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['postId'] = {
    in: 'path',
    required: true,
    schema: { type: 'integer', example: 123 },
    description: '댓글을 추가할 게시글의 ID'
  };
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            content: { type: 'string', example: '댓글 내용입니다.' }
          },
          required: ['content']
        },
        description: '댓글 내용'
      }
    }
  };
  #swagger.responses[201] = {
    description: '댓글 추가 성공',
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
                message: { type: 'string', example: 'Comment added successfully' },
                commentId: { type: 'integer', example: 456 }
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
    description: '게시글을 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Post not found.' }
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
const savePost = () => {
  /**
  #swagger.summary = '게시글 저장(스크랩) API';
  #swagger.description = '특정 게시글을 저장(스크랩)하는 API입니다.';
  #swagger.tags = ['Post'];
  #swagger.parameters['Authorization'] = {
    in: 'header',
    required: true,
    schema: { type: 'string', example: 'Bearer <access_token>' },
    description: '인증을 위한 액세스 토큰'
  };
  #swagger.parameters['postId'] = {
    in: 'path',
    required: true,
    schema: { type: 'integer', example: 123 },
    description: '저장(스크랩)할 게시글의 ID'
  };
  #swagger.requestBody = {
    required: false,
    content: {
      'application/json': {
        schema: { type: 'object' },
        description: '이 요청에는 본문이 필요하지 않습니다.'
      }
    }
  };
  #swagger.responses[200] = {
    description: '게시글 저장(스크랩) 성공',
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
                message: { type: 'string', example: 'Post saved successfully' }
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
    description: '게시글을 찾을 수 없음',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            resultType: { type: 'string', example: 'NOT_FOUND' },
            error: { type: 'string', example: 'Post not found.' }
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
  getPopularPosts,
  getMyPosts,
  getCommentedPosts,
  getSavedPosts,
  getPostList,
  getPostDetail,
  createPost,
  likePost,
  commentOnPost,
  savePost,
};
