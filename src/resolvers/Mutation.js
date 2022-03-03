const Mutation = {
  async createHotel(parent, args, { prisma }, info) {
    const emailTaken = await prisma.hotel.findUnique({
      where: {
        email: args.data.email
      }
    });

    if (emailTaken) throw new Error("Email already in use.");

    const hotel = await prisma.hotel.create({
      data: {
        name: args.data.name,
        address: args.data.address,
        rating: args.data.rating,
        phone: args.data.phone,
        email: args.data.email,
        latitude: args.data.latitude,
        longitude: args.data.longitude,
        country: args.data.country,
        pincode: args.data.pincode,
        checkIn: args.data.checkIn,
        checkOut: args.data.checkOut,
        amenities: {
          create: {
            wifi: args.data.wifi,
            roomService: args.data.roomService,
            locker: args.data.locker,
            swimmingPool: args.data.swimmingPool,
            giftShops: args.data.giftShops,
          }
        }
      },
    }, info);

    return hotel;
  },
  async createHotelTariff(parent, args, { prisma }, info) {
    const hotel = await prisma.hotel.findUnique({
      where: {
        id: args.data.hotel
      }
    });

    if (!hotel) throw new Error("Hotel not found.");

    const tariff = await prisma.tariff.create({
      data: {
        hotelId: args.data.hotel,
        roomType: args.data.roomType,
        tariff: args.data.tariff
      },
    });

    return tariff;
  },
  async createHotelReview(parent, args, { prisma }, info) {
    const hotel = await prisma.hotel.findUnique({
      where: {
        id: args.data.hotel
      }
    });

    if (!hotel) throw new Error("Hotel not found.");

    const review = await prisma.review.create({
      data: {
        hotelId: args.data.hotel,
        reviewer: args.data.reviewer,
        comment: args.data.comment,
        rating: args.data.rating,
      },
    });

    return review;
  },
};

export { Mutation as default };