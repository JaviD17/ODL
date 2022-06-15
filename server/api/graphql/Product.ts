import { objectType, extendType, stringArg, idArg, nonNull } from "nexus";

export const Product = objectType({
  name: "Product",
  definition(t) {
    t.id("id");
    t.string("collection");
    t.string("type");
    t.string("title");
    t.string("body");
    t.string("price");
    t.string("size");
    t.string("color");
  },
});

export const ProductQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("products", {
      type: Product,
      async resolve(parent, args, ctx): Promise<any> {
        return await ctx.db.product.findMany();
      },
    });
  },
});

export const ProductMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createProduct", {
      type: Product,
      args: {
        collection: nonNull(stringArg()),
        type: nonNull(stringArg()),
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
        price: nonNull(stringArg()),
        size: nonNull(stringArg()),
        color: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx): Promise<any> {
        const product = {
          collection: args.collection,
          type: args.type,
          title: args.title,
          body: args.body,
          price: args.price,
          size: args.size,
          color: args.color,
        };

        return await ctx.db.product.create({ data: product });
      },
    });
    t.nonNull.field("updateProduct", {
      type: Product,
      args: {
        id: nonNull(idArg()),
        collection: stringArg(),
        type: stringArg(),
        title: stringArg(),
        body: stringArg(),
        price: stringArg(),
        size: stringArg(),
        color: stringArg(),
      },
      async resolve(parent, args, ctx): Promise<any> {
        const product = {
          ...(args.collection && { collection: args.collection }),
          ...(args.type && { type: args.type }),
          ...(args.title && { title: args.title }),
          ...(args.body && { body: args.body }),
          ...(args.price && { price: args.price }),
          ...(args.size && { size: args.size }),
          ...(args.color && { color: args.color }),
        };

        product ? product : undefined;

        return await ctx.db.product.update({
          where: { id: args.id },
          data: product,
        });
      },
    });

    t.nonNull.field("deleteProduct", {
      type: Product,
      args: {
        id: nonNull(idArg()),
      },
      async resolve(parent, args, ctx): Promise<any> {
        return await ctx.db.product.delete({
          where: { id: args.id },
        });
      },
    });
  },
});
