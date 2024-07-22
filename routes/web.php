<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User; // Add this line

Route::redirect('/', 'dashboard');


Route::get(
    '/dashboard',
    function () {
        return Inertia::render('Dashboard');
    }
)->middleware(array( 'auth', 'verified' ))->name('dashboard');

Route::middleware('auth')->group(
    function () {
        Route::get('/profile', array( ProfileController::class, 'edit' ))->name('profile.edit');
        Route::patch('/profile', array( ProfileController::class, 'update' ))->name('profile.update');
        Route::delete('/profile', array( ProfileController::class, 'destroy' ))->name('profile.destroy');
        // route to /users with User controller
        Route::get('/users', array( UserController::class, 'index' ))->name('users.index');
    }
);

require __DIR__ . '/auth.php';
