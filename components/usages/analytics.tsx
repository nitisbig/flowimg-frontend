
'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Key, TrendingUp, Calendar } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  usage: number;
  limit: number;
  requests: number;
  lastUsed: string;
  status: 'active' | 'warning' | 'exceeded';
}

const ApiKeyDashboard = () => {
  const [apiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API',
      key: 'pk_live_***************',
      usage: 0,
      limit: 10000,
      requests: 0,
      lastUsed: '2 hours ago',
      status: 'warning'
    },
    {
      id: '2',
      name: 'Development API',
      key: 'pk_dev_***************',
      usage: 0,
      limit: 5000,
      requests: 0,
      lastUsed: '10 minutes ago',
      status: 'active'
    },
    {
      id: '3',
      name: 'Testing API',
      key: 'pk_test_***************',
      usage: 0,
      limit: 1000,
      requests: 0,
      lastUsed: '1 day ago',
      status: 'exceeded'
    }
  ]);

  const totalUsage = apiKeys.reduce((sum, key) => sum + key.usage, 0);
  const totalLimit = apiKeys.reduce((sum, key) => sum + key.limit, 0);
  const totalRequests = apiKeys.reduce((sum, key) => sum + key.requests, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'exceeded':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 95) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold ">API Usage</h1>
            <p className="text-gray-500 mt-1">Monitor your API key usage and limits</p>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
              <Activity className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsage.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">
                of {totalLimit.toLocaleString()} total limit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRequests.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">across all keys</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
              <Key className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{apiKeys.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                {apiKeys.filter(k => k.status === 'active').length} healthy
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyDashboard;