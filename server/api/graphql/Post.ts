import { objectType, extendType, stringArg, nonNull, idArg } from "nexus";
import { User } from "./User";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.id("id");
    t.string("title");
    t.string("postedOn");
    t.string("body");
    t.id("authorId");
    t.boolean("published");
  },
});

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("drafts", {
      type: Post,
      async resolve(parent, args, ctx): Promise<any> {
        return await ctx.db.post.findMany({ where: { published: false } });
      },
    });
    t.list.field("posts", {
      type: "Post",
      async resolve(parent, args, ctx): Promise<any> {
        return await ctx.db.post.findMany({ where: { published: true } });
      },
    });
  },
});

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createDraft", {
      type: Post,
      args: {
        title: nonNull(stringArg()),
        postedOn: nonNull(stringArg()),
        // writtenBy: nonNull(stringArg()),
        body: nonNull(stringArg()),
        authorId: nonNull(idArg()),
      },
      async resolve(parent, args, ctx): Promise<any> {
        // author is going to be user from context
        const draft = {
          title: args.title,
          postedOn: args.postedOn,
          body: args.body,
          authorId: args.authorId,
          published: false,
        };
        return await ctx.db.post.create({ data: draft });
      },
    });
    t.field("publishDraft", {
      type: Post,
      args: {
        draftId: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx): Promise<any> {
        return await ctx.db.post.update({
          where: { id: args.draftId },
          data: {
            published: true,
          },
        });
      },
    });
    t.field("deleteDraft", {
      type: Post,
      args: {
        draftId: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx): Promise<any> {
        return await ctx.db.post.delete({
          where: {
            id: args.draftId,
          },
        });
      },
    });
  },
});
