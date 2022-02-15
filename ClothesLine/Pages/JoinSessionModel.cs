using System.ComponentModel.DataAnnotations;

namespace ClothesLine.Pages
{
    public class JoinSessionModel
    {
        [Required]
        [Display(Name = "Session ID")]
        public string SessionId { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
