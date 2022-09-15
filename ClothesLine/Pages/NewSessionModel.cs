using System.ComponentModel.DataAnnotations;
using System.Web;

namespace ClothesLine.Pages
{
    public class NewSessionModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public EstimationStyle EstimationStyle { get; set; } = EstimationStyle.TShirt;

        public int EstimationStyleId
        {
            get => (int)EstimationStyle;
            set => EstimationStyle = (EstimationStyle)value;
        }

        public string UrlSafeName => HttpUtility.UrlEncode(this.Name);
    }
}
