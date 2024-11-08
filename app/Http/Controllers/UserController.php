<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\User\UserResource;
use Illuminate\Support\Facades\Redirect;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserCreateRequest;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all()->pluck('name');
        $users = User::with('roles')->paginate(10);
        // return all users paqginated with 10 users per page
        return Inertia::render(
            'Users/Index',
            [
                'users' => UserResource::collection($users),
                'roles' => $roles
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserCreateRequest $request)
    {
        // create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // store avatar
        $avatar = $request->file('avatar');
        $avatarName = $user->id.'.'.$avatar->getClientOriginalExtension();
        $avatar->storeAs('public/avatars', $avatarName);
        $user->update(['avatar' => $avatarName]);

        // assign role
        $user->assignRole($request->role);

        // send verification email
        $user->sendEmailVerificationNotification();

        return Inertia::render('Users/Index', [
            'users' => UserResource::collection(User::paginate(10)),
            'roles' => Role::all()->pluck('name'),
            'message' => 'User ' . $user->name . ' created successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // return the user with the specified id
        return Inertia::render(
            'Users/Edit',
            [
            'user_data' => new UserResource(User::find($id)),
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        // update the user with the specified id
        $user = User::find($id);
        $user->update($request->all());
        // return json  with response clear cache
        Cache::clear();
        return Inertia::render('Users/Edit', [
        'user' => new UserResource($user),
        'message' => 'User updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // get the id parameter from the request
        $id = $request->id;

        User::destroy($id);
        // return json with response
        // redirect to route('users.index'); whit message and render inertia page
        return Redirect::route('users.index', ['message' => 'User deleted successfully']);
    }

    /**
     * Find a user by ID.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function findById($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Users/Edit', [
        'user' => new UserResource($user)
        ]);
    }
}
