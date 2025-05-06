<?php

// app/Http/Controllers/TaskController.php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->query('status');

        $tasks = Task::when($status, function ($query, $status) {
            if ($status === 'completed') {
                return $query->where('is_completed', true);
            } elseif ($status === 'active') {
                return $query->where('is_completed', false);
            }
            return $query;
        })->orderByDesc('created_at')->get();

        return response()->json($tasks);
    }

    // store
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task = Task::create($validated);

        return response()->json($task, 201);
    }

    // show
    public function show(Task $task)
    {
        return response()->json($task);
    }

    // update
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'is_completed' => 'sometimes|boolean',
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    // delete
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, 204);
    }
}
