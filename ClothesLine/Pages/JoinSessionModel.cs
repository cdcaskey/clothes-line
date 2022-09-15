using System.ComponentModel.DataAnnotations;
using System.Web;

namespace ClothesLine.Pages
{
    public class JoinSessionModel
    {
        [Required]
        [Display(Name = "Session ID")]
        public string SessionId { get; set; }

        [Required]
        public string Name { get; set; }

        public bool Spectating { get; set; }

        public string UrlSafeName => HttpUtility.UrlEncode(this.Name);
    }
}
