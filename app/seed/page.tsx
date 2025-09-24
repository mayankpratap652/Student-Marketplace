"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const seedData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seed', { method: 'POST' });
      const result = await response.json();
      setMessage(result.message || 'Data seeded successfully!');
    } catch (error) {
      setMessage('Error seeding data');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Seed Sample Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={seedData} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Adding Data...' : 'Add Sample Listings'}
          </Button>
          {message && <p className="text-center">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}