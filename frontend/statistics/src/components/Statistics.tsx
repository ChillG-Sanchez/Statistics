import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface StatisticsData {
  genres: { genre: string; _count: { genre: number } }[];
  authors: { author: string; _count: { author: number } }[];
  priceRanges: { price: number; _count: { price: number } }[];
  monthlySales: { published: string; _sum: { sold: number } }[];
}

const Statistics: React.FC = () => {
  const [data, setData] = useState<StatisticsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/stats');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const totalBooks = data.genres.reduce((sum, genre) => sum + genre._count.genre, 0);

  const genreData = {
    labels: data.genres.map(g => `${g.genre} (${((g._count.genre / totalBooks) * 100).toFixed(2)}%)`),
    datasets: [
      {
        label: 'Books by Genre',
        data: data.genres.map(g => g._count.genre),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const authorData = {
    labels: data.authors.map(a => a.author),
    datasets: [
      {
        label: 'Books by Author',
        data: data.authors.map(a => a._count.author),
        backgroundColor: [
          'rgba(255, 159, 64, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const priceRangeData = {
    labels: data.priceRanges.map(p => `${p.price} Ft`),
    datasets: [
      {
        label: 'Books by Price Range',
        data: data.priceRanges.map(p => p._count.price),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  const monthlySalesData = {
    labels: data.monthlySales.map(m => new Date(m.published).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long' })),
    datasets: [
      {
        label: 'Books Sold per Month',
        data: data.monthlySales.map(m => m._sum.sold),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>Statistics</h2>
      <div>
        <h3>Books by Genre</h3>
        <Bar data={genreData} />
      </div>
      <div>
        <h3>Books by Author</h3>
        <Pie data={authorData} />
      </div>
      <div>
        <h3>Books by Price Range</h3>
        <Pie data={priceRangeData} />
      </div>
      <div>
        <h3>Books Sold per Month</h3>
        <Bar data={monthlySalesData} />
      </div>
    </div>
  );
};

export default Statistics;