namespace ClothesLine.Hubs
{
    public class ConnectedClient
    {
        public string Id { get; set; }

        public string Session { get; set; }

        public string Name { get; set; }

        public bool Spectating { get; set; }

        public int? Estimate { get; set; }

        public EstimationStyle? Style { get; set; }

        public bool IsCandy { get; set; }
    }
}
