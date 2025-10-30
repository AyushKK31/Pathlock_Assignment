using ProjectManager.Api.DTOs;

namespace ProjectManager.Api.Services;

public interface ISchedulerService
{
    List<string> CalculateOptimalOrder(List<TaskScheduleDto> tasks);
}

public class SchedulerService : ISchedulerService
{
    public List<string> CalculateOptimalOrder(List<TaskScheduleDto> tasks)
    {
        if (tasks == null || tasks.Count == 0)
        {
            return new List<string>();
        }

        // Build adjacency list for dependency graph
        var graph = new Dictionary<string, List<string>>();
        var inDegree = new Dictionary<string, int>();
        var taskMap = new Dictionary<string, TaskScheduleDto>();

        // Initialize all tasks
        foreach (var task in tasks)
        {
            graph[task.Title] = new List<string>();
            inDegree[task.Title] = 0;
            taskMap[task.Title] = task;
        }

        // Build the graph
        foreach (var task in tasks)
        {
            foreach (var dependency in task.Dependencies ?? new List<string>())
            {
                if (graph.ContainsKey(dependency))
                {
                    graph[dependency].Add(task.Title);
                    inDegree[task.Title]++;
                }
            }
        }

        // Topological sort using Kahn's algorithm with priority based on due dates
        var queue = new PriorityQueue<string, DateTime>();
        
        // Add tasks with no dependencies
        foreach (var task in tasks)
        {
            if (inDegree[task.Title] == 0)
            {
                var priority = task.DueDate ?? DateTime.MaxValue;
                queue.Enqueue(task.Title, priority);
            }
        }

        var result = new List<string>();

        while (queue.Count > 0)
        {
            var current = queue.Dequeue();
            result.Add(current);

            // Process all tasks that depend on the current task
            foreach (var neighbor in graph[current])
            {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0)
                {
                    var priority = taskMap[neighbor].DueDate ?? DateTime.MaxValue;
                    queue.Enqueue(neighbor, priority);
                }
            }
        }

        // Check for cycles
        if (result.Count != tasks.Count)
        {
            throw new InvalidOperationException("Circular dependency detected in tasks");
        }

        return result;
    }
}
