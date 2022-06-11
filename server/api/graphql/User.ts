import { objectType, extendType, stringArg, nonNull, idArg } from "nexus";
import { Post } from "./Post";

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.string("role");
    t.list.field("posts", {
      type: Post,
      async resolve(parent, args, ctx): Promise<any> {
        const parentId: string = parent.id ? parent.id : "";
        return await ctx.db.post.findMany({ where: { authorId: parentId } });
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("users", {
      type: User,
      async resolve(parent, args, ctx): Promise<any> {
        return await ctx.db.user.findMany();
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUser", {
      type: User,
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        // role: stringArg(),
      },
      async resolve(parent, args, ctx): Promise<any> {
        // const userRole = args.role ? args.role : "";
        const user = {
          name: args.name,
          email: args.email,
          password: args.password,
          //   ...(args.role && { role: args.role }),
          //   role: userRole,
        };

        return await ctx.db.user.create({ data: user });
      },
    });
    t.nonNull.field("updateUser", {
      type: User,
      args: {
        id: nonNull(idArg()),
        name: stringArg(),
        email: stringArg(),
        password: stringArg(),
      },
      async resolve(parent, args, ctx): Promise<any> {
        const user = {
          ...(args.name && { name: args.name }),
          ...(args.email && { email: args.email }),
          ...(args.password && { password: args.password }),
        };

        user ? user : undefined;

        return await ctx.db.user.update({
          where: { id: args.id },
          data: user,
        });
      },
    });
    t.nonNull.field("deleteUser", {
      type: User,
      args: {
        id: nonNull(idArg()),
      },
      async resolve(parent, args, ctx): Promise<any> {
        return await ctx.db.user.delete({ where: { id: args.id } });
      },
    });
    t.nonNull.field("authenticate", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx): Promise<any> {
        const user = await ctx.db.user.findUnique({
          where: { email: args.email },
        });
        const correctPassword = args.password == user?.password;
        // return user;
        return correctPassword ? user : "";
      },
    });
  },
});
