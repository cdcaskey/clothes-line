namespace ClothesLine.Hubs
{
    public static class SignalRMethods
    {
        public static class Session
        {
            public const string JoinSession = "JoinSession";

            public const string SetSpectating = "SetSpectating";

            public const string NotifyUpdatedClients = "NotifyUpdatedClients";

            public const string RequestData = "RequestData";

            public const string SendEstimate = "SendEstimate";
            public const string ReceiveEstimate = "ReceiveEstimate";
            public const string ShowEstimates = "ShowEstimates";
            public const string ClearEstimates = "ClearEstimates";

            public const string ToggleCandy = "ToggleCandy";
        }
    }
}
