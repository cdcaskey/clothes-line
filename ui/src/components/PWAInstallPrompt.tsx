import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, X, Smartphone, Share, ArrowUp } from 'lucide-react';
import moment from 'moment';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

interface NavigatorStandalone extends Navigator {
    standalone?: boolean;
}

const PWA_PROMPT_KEY = 'pwa-prompt-dismissed';
const REMINDER_DELAY_DAYS = 2; // Show again after 2 days

export function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    // Check if prompt was recently dismissed
    const isPromptDismissed = (): boolean => {
        try {
            const dismissed = localStorage.getItem(PWA_PROMPT_KEY);
            if (!dismissed) return false;

            const dismissedDate = moment(dismissed);
            const now = moment();
            const daysDiff = now.diff(dismissedDate, 'days');

            return daysDiff < REMINDER_DELAY_DAYS;
        } catch (error) {
            console.warn('Failed to check PWA prompt dismissal:', error);
            return false;
        }
    };

    // Mark prompt as dismissed
    const markPromptDismissed = (type: 'remind-later' | 'got-it' = 'remind-later') => {
        try {
            const now = moment();
            localStorage.setItem(PWA_PROMPT_KEY, now.toISOString());

            // If user clicked "Got it", extend the reminder period
            if (type === 'got-it') {
                localStorage.setItem('pwa-prompt-got-it', 'true');
            }
        } catch (error) {
            console.warn('Failed to save PWA prompt dismissal:', error);
        }
    };

    useEffect(() => {
        // Detect iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setIsIOS(isIOSDevice);

        // Check if app is already installed/standalone
        const checkStandalone = () => {
            const standalone = window.matchMedia('(display-mode: standalone)').matches ||
                (window.navigator as NavigatorStandalone).standalone === true;
            setIsStandalone(standalone);
            setIsInstalled(standalone);
        };

        checkStandalone();

        // Listen for display mode changes
        const mediaQuery = window.matchMedia('(display-mode: standalone)');
        mediaQuery.addEventListener('change', checkStandalone);

        // Only listen for beforeinstallprompt on non-iOS devices
        if (!isIOSDevice) {
            const handleBeforeInstallPrompt = (e: Event) => {
                e.preventDefault();
                setDeferredPrompt(e as BeforeInstallPromptEvent);
                setShowPrompt(true);
            };

            const handleAppInstalled = () => {
                setIsInstalled(true);
                setShowPrompt(false);
                setDeferredPrompt(null);
            };

            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.addEventListener('appinstalled', handleAppInstalled);

            return () => {
                window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
                window.removeEventListener('appinstalled', handleAppInstalled);
                mediaQuery.removeEventListener('change', checkStandalone);
            };
        }

        return () => {
            mediaQuery.removeEventListener('change', checkStandalone);
        };
    }, []);

    // Show iOS-specific prompt after a delay if not installed and not recently dismissed
    useEffect(() => {
        if (isIOS && !isInstalled && !showPrompt && !isPromptDismissed()) {
            const timer = setTimeout(() => {
                setShowPrompt(true);
            }, 3000); // Show after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [isIOS, isInstalled, showPrompt]);

    const handleInstall = async () => {
        if (isIOS) {
            // For iOS, we can't programmatically install, so we show instructions
            return;
        }

        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setIsInstalled(true);
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = (type: 'remind-later' | 'got-it' = 'remind-later') => {
        markPromptDismissed(type);
        setShowPrompt(false);
        setDeferredPrompt(null);
    };

    if (isInstalled || !showPrompt) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <Card className="w-80 shadow-lg border-2">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-semibold flex items-center">
                            <Smartphone className="w-4 h-4 mr-2" />
                            {isIOS ? 'Add to Home Screen' : 'Install App'}
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDismiss('remind-later')}
                            className="h-6 w-6 p-0"
                        >
                            <X className="w-3 h-3" />
                        </Button>
                    </div>
                    <CardDescription className="text-xs">
                        {isIOS
                            ? 'Add this app to your home screen for quick access'
                            : 'Install this app on your device for quick and easy access when you\'re on the go.'
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                    {isIOS ? (
                        <div className="space-y-3">
                            <div className="text-xs text-muted-foreground space-y-2">
                                <p>1. Tap the <Share className="w-3 h-3 inline" /> Share button</p>
                                <p>2. Scroll down and tap "Add to Home Screen"</p>
                                <p>3. Tap "Add" to confirm</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => handleDismiss('got-it')}
                                    size="sm"
                                    variant="outline"
                                    className="flex-1"
                                >
                                    Got it
                                </Button>
                                <Button
                                    onClick={() => handleDismiss('remind-later')}
                                    size="sm"
                                    className="flex-1"
                                >
                                    Remind Later
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                onClick={handleInstall}
                                size="sm"
                                className="flex-1"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Install
                            </Button>
                            <Button
                                onClick={() => handleDismiss('remind-later')}
                                size="sm"
                                variant="outline"
                                className="flex-1"
                            >
                                Later
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 