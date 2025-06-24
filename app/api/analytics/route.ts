import { NextResponse } from 'next/server';

interface AnalyticsData {
  pageViews: {
    total: number;
    change: number;
    data: Array<{ date: string; views: number }>;
  };
  users: {
    total: number;
    active: number;
    change: number;
  };
  content: {
    published: number;
    drafts: number;
    totalViews: number;
  };
  performance: {
    avgLoadTime: number;
    bounceRate: number;
    conversionRate: number;
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get('range') || '7d';

  // Simulated analytics data
  const analyticsData: AnalyticsData = {
    pageViews: {
      total: 45678,
      change: 12.5,
      data: [
        { date: '2024-01-08', views: 1234 },
        { date: '2024-01-09', views: 1456 },
        { date: '2024-01-10', views: 1678 },
        { date: '2024-01-11', views: 1890 },
        { date: '2024-01-12', views: 2012 },
        { date: '2024-01-13', views: 2234 },
        { date: '2024-01-14', views: 2456 }
      ]
    },
    users: {
      total: 1234,
      active: 567,
      change: 8.3
    },
    content: {
      published: 89,
      drafts: 12,
      totalViews: 156789
    },
    performance: {
      avgLoadTime: 1.2,
      bounceRate: 23.4,
      conversionRate: 4.7
    }
  };

  return NextResponse.json(analyticsData);
}