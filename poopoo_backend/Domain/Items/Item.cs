using poopoo_backend.Domain.Users;

namespace poopoo_backend.Domain.Items
{
    public class Item
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; } // foreign key to associate item with a user
        public User User { get; set; } = null!; // navigation property
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty; // dairy, vegetable, fruit, meat, grain, etc.  maybe this could be an enum
        public int Quantity { get; set; }
        public DateTime RecordedAt { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public float DetectedConfidence { get; set; } // confidence level from image recognition (0.0 - 1.0)
    }
}
