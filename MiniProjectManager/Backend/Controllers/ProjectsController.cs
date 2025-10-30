using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManager.Api.Data;
using ProjectManager.Api.DTOs;
using ProjectManager.Api.Models;

namespace ProjectManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProjectsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectsController(AppDbContext context)
    {
        _context = context;
    }

    private int GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.Parse(userIdClaim ?? "0");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
    {
        var userId = GetUserId();

        var projects = await _context.Projects
            .Where(p => p.UserId == userId)
            .Include(p => p.Tasks)
            .Select(p => new ProjectDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                CreatedAt = p.CreatedAt,
                TaskCount = p.Tasks.Count
            })
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDetailDto>> GetProject(int id)
    {
        var userId = GetUserId();

        var project = await _context.Projects
            .Where(p => p.Id == id && p.UserId == userId)
            .Include(p => p.Tasks)
            .FirstOrDefaultAsync();

        if (project == null)
        {
            return NotFound(new { message = "Project not found" });
        }

        var projectDto = new ProjectDetailDto
        {
            Id = project.Id,
            Title = project.Title,
            Description = project.Description,
            CreatedAt = project.CreatedAt,
            Tasks = project.Tasks.Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                DueDate = t.DueDate,
                IsCompleted = t.IsCompleted,
                CreatedAt = t.CreatedAt,
                ProjectId = t.ProjectId
            }).OrderBy(t => t.IsCompleted).ThenByDescending(t => t.CreatedAt).ToList()
        };

        return Ok(projectDto);
    }

    [HttpPost]
    public async Task<ActionResult<ProjectDto>> CreateProject([FromBody] CreateProjectDto createProjectDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userId = GetUserId();

        var project = new Project
        {
            Title = createProjectDto.Title,
            Description = createProjectDto.Description,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        var projectDto = new ProjectDto
        {
            Id = project.Id,
            Title = project.Title,
            Description = project.Description,
            CreatedAt = project.CreatedAt,
            TaskCount = 0
        };

        return CreatedAtAction(nameof(GetProject), new { id = project.Id }, projectDto);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var userId = GetUserId();

        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

        if (project == null)
        {
            return NotFound(new { message = "Project not found" });
        }

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
