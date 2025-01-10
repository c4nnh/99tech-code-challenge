import { Request, Response } from "express";
import * as postService from "./post.service";
import { parseRequestPayload } from "../helpers/parse-request-payload";
import {
  createPostSchema,
  getPostsSchema,
  updatePostSchema,
} from "./post.schema";
import { z } from "zod";

export async function getPosts(req: Request, res: Response) {
  const dto = parseRequestPayload<z.infer<typeof getPostsSchema>>({
    schema: getPostsSchema,
    payload: req.query,
  });
  req.ctx.logger.info("getPosts", { dto });
  const data = await postService.getPosts(req.ctx, dto);
  res.status(200).send(data);
}

export async function createPost(req: Request, res: Response) {
  const dto = parseRequestPayload<z.infer<typeof createPostSchema>>({
    schema: createPostSchema,
    payload: req.body,
  });
  req.ctx.logger.info("createPost", { dto });
  const post = await postService.createPost(req.ctx, dto);
  res.status(201).send(post);
}

export async function updatePost(req: Request, res: Response) {
  const postId = req.params.id;
  const dto = parseRequestPayload<z.infer<typeof updatePostSchema>>({
    schema: updatePostSchema,
    payload: req.body,
  });
  req.ctx.logger.info("updatePost", { id: postId, dto });
  const post = await postService.updatePost(req.ctx, postId, dto);
  res.status(200).send(post);
}

export async function deletePost(req: Request, res: Response) {
  const postId = req.params.id;
  req.ctx.logger.info("deletePost", { id: postId });
  const post = await postService.deletePost(req.ctx, postId);
  res.status(200).send(post);
}
