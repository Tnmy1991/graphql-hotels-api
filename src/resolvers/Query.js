const Query = {
  hotels(parent, args, { prisma }, info) {
    return prisma.hotel.findMany({
      where: {
        latitude: {
          gte: args.latitude
        },
        longitude: {
          gte: args.longitude
        }
      },
    });
  },
  hotel(parent, args, { prisma }, info) {
    return prisma.hotel.findUnique({
      where: {
        id: args.id
      },
      include: {
        tariffs: true,
        reviews: true,
        amenities: true,
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