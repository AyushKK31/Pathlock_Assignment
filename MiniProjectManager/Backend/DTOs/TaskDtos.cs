using System.ComponentModel.DataAnnotations;

namespace ProjectManager.Api.DTOs;

public class TaskDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTime? DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public int ProjectId { get; set; }
    public decimal EstimatedHours { get; set; }
    public List<string> Dependencies { get; set; } = new();
}

public class CreateTaskDto
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    public DateTime? DueDate { get; set; }

    public decimal EstimatedHours { get; set; } = 0;

    public List<string> Dependencies { get; set; } = new();
}

public class UpdateTaskDto
{
    [StringLength(200)]
    public string? Title { get; set; }

    public DateTime? DueDate { get; set; }

    public bool? IsCompleted { get; set; }

    public decimal? EstimatedHours { get; set; }

    public List<string>? Dependencies { get; set; }
}

public class ScheduleRequestDto
{
    public List<TaskScheduleDto> Tasks { get; set; } = new();
}

public class TaskScheduleDto
{
    public string Title { get; set; } = string.Empty;
    public decimal EstimatedHours { get; set; }
    public DateTime? DueDate { get; set; }
    public List<string> Dependencies { get; set; } = new();
}

public class ScheduleResponseDto
{
    public List<string> RecommendedOrder { get; set; } = new();
}
