<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('tasks', TaskController::class);

// Example default route for testing purposes
Route::get('/ping', function () {
    return response()->json(['message' => 'API is working!']);
});
