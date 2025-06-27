import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OfflineFallbackProps {
    onRetry?: () => void;
    message?: string;
}

export function OfflineFallback({ onRetry, message }: OfflineFallbackProps) {
    const navigate = useNavigate();

    const handleRetry = () => {
        if (onRetry) {
            onRetry();
        } else {
            window.location.reload();
        }
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                        <WifiOff className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                    <CardTitle className="text-xl font-semibold">You're Offline</CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                        {message || "It looks like you've lost your internet connection. Some content may not be available."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                        <p>• Your cached content is still available</p>
                        <p>• Check your internet connection</p>
                        <p>• Try refreshing the page</p>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <Button
                            onClick={handleRetry}
                            className="flex-1"
                            variant="outline"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Retry
                        </Button>
                        <Button
                            onClick={handleGoHome}
                            className="flex-1"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Go Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 