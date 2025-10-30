using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManager.Api.Data;
using ProjectManager.Api.DTOs;
using ProjectManager.Api.Models;

namespace ProjectManager.Api.Controllers;

[ApiController]
[Route("api")]
[Authorize]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    private int GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.Parse(userIdClaim ?? "0");
    }

    [HttpPost("projects/{projectId}/tasks")]
    public async Task<ActionResult<TaskDto>> CreateTask(int projectId, [FromBody] CreateTaskDto createTaskDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userId = GetUserId();

        // Verify project belongs to user
        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == projectId && p.UserId == userId);

        if (project == null)
        {
            return NotFound(new { message = "Project not found" });
        }

        var task = new TaskItem
        {
            Title = createTaskDto.Title,
            DueDate = createTaskDto.DueDate,
            ProjectId = projectId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        var taskDto = new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            DueDate = task.DueDate,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt,
            ProjectId = task.ProjectId
        };

        return CreatedAtAction(nameof(GetTask), new { taskId = task.Id }, taskDto);
    }

    [HttpGet("tasks/{taskId}")]
    public async Task<ActionResult<TaskDto>> GetTask(int taskId)
    {
        var userId = GetUserId();

        var task = await _context.Tasks
            .Include(t => t.Project)
            .FirstOrDefaultAsync(t => t.Id == taskId && t.Project.UserId == userId);

        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }

        var taskDto = new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            DueDate = task.DueDate,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt,
            ProjectId = task.ProjectId
        };

        return Ok(taskDto);
    }

    [HttpPut("tasks/{taskId}")]
    public async Task<ActionResult<TaskDto>> UpdateTask(int taskId, [FromBody] UpdateTaskDto updateTaskDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userId = GetUserId();

        var task = await _context.Tasks
            .Include(t => t.Project)
            .FirstOrDefaultAsync(t => t.Id == taskId && t.Project.UserId == userId);

        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }

        // Update only provided fields
        if (updateTaskDto.Title != null)
        {
            task.Title = updateTaskDto.Title;
        }

        if (updateTaskDto.DueDate.HasValue)
        {
            task.DueDate = updateTaskDto.DueDate;
        }

        if (updateTaskDto.IsCompleted.HasValue)
        {
            task.IsCompleted = updateTaskDto.IsCompleted.Value;
        }

        await _context.SaveChangesAsync();

        var taskDto = new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            DueDate = task.DueDate,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt,
            ProjectId = task.ProjectId
        };

        return Ok(taskDto);
    }

    [HttpDelete("tasks/{taskId}")]
    public async Task<IActionResult> DeleteTask(int taskId)
    {
        var userId = GetUserId();

        var task = await _context.Tasks
            .Include(t => t.Project)
            .FirstOrDefaultAsync(t => t.Id == taskId && t.Project.UserId == userId);

        if (task == null)
        {
            return NotFound(new { message = "Task not found" });
        }

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
