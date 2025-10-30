using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace TaskManager.Api.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        // In-Memory Data Store
        // Simulates a database; data will be lost when the API restarts.
        private static readonly List<TaskItem> _tasks = new List<TaskItem>
        {
            // Add a few initial tasks for testing
            new TaskItem { Id = Guid.NewGuid(), Description = "Setup the Backend API", IsCompleted = true },
            new TaskItem { Id = Guid.NewGuid(), Description = "Implement frontend task list UI", IsCompleted = false }
        };

        // GET /api/tasks - Get all tasks
        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks()
        {
            return Ok(_tasks);
        }

        // POST /api/tasks - Add a new task
        [HttpPost]
        public ActionResult<TaskItem> AddTask([FromBody] TaskItem task)
        {
            // Validation
            if (string.IsNullOrWhiteSpace(task.Description))
            {
                return BadRequest("Description is required.");
            }

            task.Id = Guid.NewGuid(); // Assign a new unique ID
            task.IsCompleted = false; // New tasks are uncompleted by default
            _tasks.Add(task);

            // Return 201 Created status with the newly created task
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        // PUT /api/tasks/{id} - Update an existing task
        [HttpPut("{id}")]
        public IActionResult UpdateTask(Guid id, [FromBody] TaskItem updatedTask)
        {
            var existingTask = _tasks.FirstOrDefault(t => t.Id == id);

            if (existingTask == null)
            {
                return NotFound();
            }

            // Update task properties
            existingTask.Description = updatedTask.Description;
            existingTask.IsCompleted = updatedTask.IsCompleted;

            return NoContent(); // 204 No Content is standard for successful update
        }

        // DELETE /api/tasks/{id} - Delete a task
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(Guid id)
        {
            var taskToRemove = _tasks.FirstOrDefault(t => t.Id == id);

            if (taskToRemove == null)
            {
                return NotFound();
            }

            _tasks.Remove(taskToRemove);

            return NoContent(); // 204 No Content is standard for successful deletion
        }
    }
}
