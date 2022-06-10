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
      resolve(parent, args, ctx): any {
        const parentId: string = parent.id ? parent.id : "";
        return ctx.db.post.findMany({ where: { authorId: parentId } });
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("users", {
      type: User,
      resolve(parent, args, ctx): any {
        return ctx.db.user.findMany();
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
      resolve(parent, args, ctx): any {
        // const userRole = args.role ? args.role : "";
        const user = {
          name: args.name,
          email: args.email,
          password: args.password,
          //   ...(args.role && { role: args.role }),
          //   role: userRole,
        };

        return ctx.db.user.create({ data: user });
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
      resolve(parent, args, ctx): any {
        const user = {
          ...(args.name && { name: args.name }),
          ...(args.email && { email: args.email }),
          ...(args.password && { password: args.password }),
        };

        user ? user : undefined;

        return ctx.db.user.update({
          where: { id: args.id },
          data: user,
        });
      },
    });
  },
});
