﻿namespace ClothesLine.Hubs
{
    public static class SignalRMethods
    {
        public static class Session
        {
            public const string JoinSession = "JoinSession";

            public const string NotifyUpdatedClients = "NotifyUpdatedClients";

            public const string SendEstimate = "SendEstimate";
            public const string ReceiveEstimate = "ReceiveEstimate";
        }
    }
}