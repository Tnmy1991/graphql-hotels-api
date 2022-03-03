const Query = {
  hotels(parent, args, { prisma }, info) {
    return prisma.hotel.findMany({
      where: {
        latitude: args.latitude,
        longitude: args.longitude
      },
    });
  },
  hotel(parent, args, { prisma }, info) {
    return prisma.hotel.findUnique({
      where: {
        id: args.id
      },
    }, info);
  },
  reviews(parent, args, { prisma }, info) {
    return prisma.review.findMany({
      where: {
        hotelId: args.id
      },
    }, info);
  }
};

export { Query as default };