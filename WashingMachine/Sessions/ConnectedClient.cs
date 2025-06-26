namespace WashingMachine.Sessions
{
    public class ConnectedClient
    {
        public required string Id { get; set; }

        public required string Session { get; set; }

        public required string Name { get; set; }

        public bool Spectating { get; set; }

        public int? Estimate { get; set; }

        public SessionType? Style { get; set; }

        public bool IsCandy { get; set; }
    }
}
