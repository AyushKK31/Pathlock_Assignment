using System;

namespace TaskManager.Api.Models
{
    public class TaskItem
    {
        public Guid Id { get; set; }           // Unique identifier
        public string Description { get; set; } = string.Empty; // Task description
        public bool IsCompleted { get; set; }  // Completion status
    }
}
