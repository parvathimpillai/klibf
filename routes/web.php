<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Home'); // Your home.tsx
})->name('home');

// Route::get('/admin', function () {
//     return Inertia::render('Admin/Dashboard');
// })->middleware(['auth', 'verified'])->name('admin.dashboard');
// Route::get('/', function () {
//     return auth()->check() ? redirect('/admin') : redirect('/admin/login');
// })->name('home');

// Route::group(['middleware' => ['auth:sanctum']], function () {

//         // DASHBOARD
//         Route::get('dashboard', function () {
//             return Inertia::render('Dashboard');
//         })->name('dashboard');

//         // PROFILE
//         Route::get('/profile', array( ProfileController::class, 'edit' ))->name('profile.edit');
//         Route::patch('/profile', array( ProfileController::class, 'update' ))->name('profile.update');
//         Route::delete('/profile', array( ProfileController::class, 'destroy' ))->name('profile.destroy');
//         Route::post('profile/avatar', [ProfileController::class, 'updateAvatar'])
//             ->name('profile.avatar.update');
//         // USERS

//         Route::get('/users', [UserController::class, 'index'])->name('users.index');
//         Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
//         Route::post('/users', [UserController::class, 'store'])->name('users.store');
//         Route::get('/users/{id}', [UserController::class, 'findById'])->name('users.show');
//         Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
//         Route::patch('/users/{id}', [UserController::class, 'update'])->name('users.update');
//         // Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
//         Route::delete('/users/bulk-destroy', [UserController::class, 'bulkDestroy'])->name('users.bulk-destroy');
// });

require __DIR__ . '/auth.php';
