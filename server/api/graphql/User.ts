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
      //   args: { id: nonNull(idArg()) },
      resolve(_root, args, ctx): any {
        // console.log(_root.id);
        const rootId: string = _root.id ? _root.id : "";
        return ctx.db.post.findMany({ where: { authorId: rootId } });
        // return ctx.db.post.findMany();

        // user auth then put into context to then use context.user.id insetead of args.id in the where object
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("users", {
      type: User,
      resolve(_root, args, ctx): any {
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
      resolve(_root, args, ctx): any {
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
  },
});
