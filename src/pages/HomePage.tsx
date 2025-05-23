
import React from 'react';
import Layout from '@/components/layout/Layout';
import EventGrid from '@/components/events/EventGrid';
import { EventProvider, useEvents } from '@/contexts/EventContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ShinyText from '@/components/ui/shinytext';
import GradientText from '@/components/ui/gradientText';
const HomePage = () => {
  const { events, isLoading, pagination, setPage } = useEvents();
  const { user } = useAuth();

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins bg-gradient-to-r from-danevents-400 to-danevents-700 text-transparent bg-clip-text pb-2">
            <GradientText colors={['#ffaa40', '#9c40ff', '#ffaa40']} className='text-transparent bg-clip-text pb-2' animationSpeed={8} showBorder={false}>
                DanEvents - Find Amazing Events
            </GradientText>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find and book tickets for the best events in your area. From concerts to workshops, we've got you covered.
          </p>
          {!user && (
            <div className="pt-2">
              <Link to="/register">
                <Button size="lg" className="animate-fade-in"><ShinyText text='Get Started' disabled={false} speed={3}/></Button>
              </Link>
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold font-poppins">Upcoming Events</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-danevents-500"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No events found.</p>
            </div>
          ) : (
            <EventGrid events={events} 
                        pagination={{
                          currentPage: pagination.currentPage,
                          totalPages: pagination.totalPages
                        }}
                        onPageChange={handlePageChange} />
          )}
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
