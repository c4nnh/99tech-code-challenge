import { Router } from "express";
import * as postController from "./post.controller";
import { authenticatedRequest } from "../helpers/authenticated-request.helper";
import { errorCaughtRequest } from "../helpers/error-caught-request.helper";

const router = Router();

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   authorId:
 *                     type: string
 *       401:
 *         description: Unauthorized - Invalid or missing bearer token
 */
router.get(
  "/",
  authenticatedRequest(),
  errorCaughtRequest(postController.getPosts)
);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 authorId:
 *                   type: string
 *       400:
 *         description: Bad Request - Invalid input parameters
 *       401:
 *         description: Unauthorized - Invalid or missing bearer token
 */
router.post(
  "/",
  authenticatedRequest(),
  errorCaughtRequest(postController.createPost)
);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 authorId:
 *                   type: string
 *       400:
 *         description: Bad Request - Invalid input parameters
 *       401:
 *         description: Unauthorized - Invalid or missing bearer token
 *       404:
 *         description: Post not found
 */
router.put(
  "/:id",
  authenticatedRequest(),
  errorCaughtRequest(postController.updatePost)
);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing bearer token
 *       404:
 *         description: Post not found
 */
router.delete(
  "/:id",
  authenticatedRequest(),
  errorCaughtRequest(postController.deletePost)
);

export default router;
