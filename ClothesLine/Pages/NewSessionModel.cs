using System.ComponentModel.DataAnnotations;

namespace ClothesLine.Pages
{
    public class NewSessionModel
    {
        [Required]
        public string Name { get; set; }
    }
}
