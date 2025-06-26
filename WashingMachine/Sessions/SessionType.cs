using System.ComponentModel;

namespace WashingMachine.Sessions
{
    public enum SessionType
    {
        [Description("🔢 Number")]
        Number = 0,
        [Description("👕 T-Shirt")]
        TShirt,
        [Description("🍌 Fruit")]
        Fruit,
        [Description("📅 Days-ish")]
        Days
    }
}
