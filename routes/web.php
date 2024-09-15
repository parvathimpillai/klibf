<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', 'dashboard');

Route::group(['middleware' => ['auth:sanctum']], function () {

        // DASHBOARD
        Route::get('dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        // PROFILE
        Route::get('/profile', array( ProfileController::class, 'edit' ))->name('profile.edit');
        Route::patch('/profile', array( ProfileController::class, 'update' ))->name('profile.update');
        Route::delete('/profile', array( ProfileController::class, 'destroy' ))->name('profile.destroy');

        // USERS
        Route::get('/users', array( UserController::class, 'create' ))->name('users.create');
        Route::get('/users', array( UserController::class, 'index' ))->name('users.index');
        Route::get('/users/{id}/', array( UserController::class, 'edit' ))->name('users.edit');
        Route::patch('/users/{id}/', array( UserController::class, 'update' ))->name('users.update');
        Route::delete('/users/{id}', array( UserController::class, 'destroy' ))->name('users.destroy');
        Route::get('/users/{id}', [UserController::class, 'findById']);
});

require __DIR__ . '/auth.php';
