import { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Download, RefreshCw } from 'lucide-react';

export function PWARegistration() {
    const [needRefresh, setNeedRefresh] = useState(false);
    const [offlineReady, setOfflineReady] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const updateSW = registerSW({
        onNeedRefresh() {
            setNeedRefresh(true);
        },
        onOfflineReady() {
            setOfflineReady(true);
        },
    });

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleUpdate = () => {
        updateSW();
        setNeedRefresh(false);
    };

    const handleClose = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    if (!needRefresh && !offlineReady) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Card className="w-80 shadow-lg border-2">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold">
                            {offlineReady ? 'App Ready' : 'Update Available'}
                        </CardTitle>
                        <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
                            {isOnline ? (
                                <>
                                    <Wifi className="w-3 h-3 mr-1" />
                                    Online
                                </>
                            ) : (
                                <>
                                    <WifiOff className="w-3 h-3 mr-1" />
                                    Offline
                                </>
                            )}
                        </Badge>
                    </div>
                    <CardDescription className="text-xs">
                        {offlineReady
                            ? 'Your app is now ready for offline use'
                            : 'A new version is available. Update to get the latest features.'
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="flex gap-2">
                        {needRefresh && (
                            <Button
                                onClick={handleUpdate}
                                size="sm"
                                className="flex-1"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Update
                            </Button>
                        )}
                        {offlineReady && (
                            <Button
                                onClick={handleClose}
                                size="sm"
                                variant="outline"
                                className="flex-1"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Got it
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 