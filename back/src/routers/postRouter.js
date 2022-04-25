import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { postService } from "../services/postService";

const postRouter = Router();

// create
postRouter.post('/post', loginRequired, async (req, res, next) => {
  try {
    const { title, content, tags, userId, subjectId } = req.body;

    const newPost = await postService.addPost({ title, content, tags, userId, subjectId })
    if (newPost.errorMessage) {
      throw new Error(newPost.errorMessage);
    }

    res.status(201).json({ message: 'success'});
  } catch (err) {
    next(err);
  }
});

// read
// 1. postId 로 해당 post 조회
postRouter.get('/posts/:postId', loginRequired, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postService.getPost({ postId });
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

// 2. userId 로 해당 유저의 posts 조회
postRouter.get('/posts/users/:userId', loginRequired, async (req, res, next) => {
  try {
    const { userId } = req.params;

    const posts = await postService.getPostsByUserId({ userId });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

// 3. 전체 게시글 조회
postRouter.get('/posts', loginRequired, async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

// 4. 태그 별 조회 (로직 고민중)
// router.get()

// update
postRouter.put('/posts/:postId', loginRequired, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await postService.getPost({ postId });
    if (!post) {
      const errorMessage = "Error: 해당 게시글이 존재하지 않습니다.";
      throw new Error(errorMessage);
    }

    const title = req.body.title ?? null;
    const content = req.body.content ?? null;
    const tags = req.body.tags ?? null;
    const userId = req.body.userId ?? null;
    const subjectId = req.body.subjectId ?? null;

    if (!userId || !subjectId) {
      const errorMessage = "Error: Invalid data";
      throw new Error(errorMessage);
    }

    const toUpdate = {
      title,
      content,
      tags,
      userId,
      subjectId,
    }

    const updatedPost = await postService.setPost({ postId, toUpdate });

    if (updatedPost.errorMessage) {
      throw new Error(updatedPost.errorMessage);
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
});


// delete
// 1. postId 로 해당 글 삭제
postRouter.delete('/posts/:postId', loginRequired, async (req, res, next) => {
  try {
    const { postId } = req.params;

    const result = await postService.deletePost({ postId });
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).json({ message: 'success'});
  } catch (err) {
    next(err);
  }
})

// 2. userId로 해당 유저의 글 모두 삭제
postRouter.delete('/posts/users/:userId', loginRequired, async (req, res, next) => {
  try {
    const { userId } = req.params;
  
    const result = await postService.deletePostsByUserId({ userId });
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).json({ message: 'success'});
  } catch (err) {
    next(err);
  }
})


export { postRouter };