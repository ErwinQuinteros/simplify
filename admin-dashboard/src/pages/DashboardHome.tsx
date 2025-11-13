import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { userService } from '@/services/userService';
import { testimonialService } from '@/services/testimonialService';
import { Users, MessageSquare, CheckCircle, Star } from 'lucide-react';

const DashboardHome = () => {
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ['users', { limit: 1 }],
    queryFn: () => userService.getUsers({ limit: 1 }),
  });

  // const { data: testimonialsData, isLoading: testimonialsLoading } = useQuery({
  //   queryKey: ['testimonials', { limit: 1 }],
  //   queryFn: () => testimonialService.getTestimonials({ limit: 1 }),
  // });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['testimonial-stats'],
    queryFn: () => testimonialService.getStatistics(),
  });

  const cards = [
    {
      title: 'Total Users',
      value: usersData?.pagination?.total || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      loading: usersLoading,
    },
    {
      title: 'Total Testimonials',
      value: stats?.total || 0,
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      loading: statsLoading,
    },
    {
      title: 'Approved',
      value: stats?.approved || 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      loading: statsLoading,
    },
    {
      title: 'Featured',
      value: stats?.featured || 0,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      loading: statsLoading,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${card.bgColor}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                {card.loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <div className="text-2xl font-bold">{card.value}</div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Testimonials Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Average Rating</span>
                <span className="text-lg font-semibold flex items-center">
                  {stats.averageRating.toFixed(1)}
                  <Star className="w-4 h-4 ml-1 text-yellow-500 fill-yellow-500" />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Pending Approval</span>
                <span className="text-lg font-semibold">{stats.pending}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardHome;