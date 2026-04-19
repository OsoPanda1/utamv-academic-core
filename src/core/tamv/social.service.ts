import { paginateByCursor, type PaginatedResult, type PaginationInput } from "../pagination";

export interface SocialPost {
  id: string;
  authorUserId: string;
  channelId: string;
  content: string;
  createdAt: string;
}

export class SocialService {
  private readonly posts: SocialPost[] = [];

  createPost(authorUserId: string, channelId: string, content: string): SocialPost {
    const post: SocialPost = {
      id: crypto.randomUUID(),
      authorUserId,
      channelId,
      content,
      createdAt: new Date().toISOString(),
    };
    this.posts.unshift(post);
    return post;
  }

  listChannelPosts(channelId: string, pagination: PaginationInput): PaginatedResult<SocialPost> {
    const filtered = this.posts.filter((post) => post.channelId === channelId);
    return paginateByCursor(filtered, pagination);
  }
}
