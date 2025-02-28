import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getStatistics() {
    const genres = await this.prisma.book.groupBy({
      by: ['genre'],
      _count: {
        genre: true,
      },
    });

    const years = await this.prisma.book.groupBy({
      by: ['published'],
      _count: {
        published: true,
      },
    });

    const priceRanges = await this.prisma.book.groupBy({
      by: ['price'],
      _count: {
        price: true,
      },
    });

    const monthlySales = await this.prisma.book.groupBy({
      by: ['published'],
      _sum: {
        sold: true,
      },
    });

    const authors = await this.prisma.book.groupBy({
      by: ['author'],
      _count: {
        author: true,
      },
    });

    return {
      genres,
      years,
      priceRanges,
      monthlySales,
      authors,
    };
  }
}