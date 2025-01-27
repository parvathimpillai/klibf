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
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10); // Default to 10 if not specified

        $users = User::with('roles')
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->paginate($perPage);

        $roles = Role::all()->pluck('name');

        return Inertia::render(
            'Users/Index',
            [
                'users' => UserResource::collection($users),
                'roles' => $roles,
                'filters' => [
                    'search' => $search,
                    'per_page' => $perPage
                ]
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
    public function update(UpdateUserRequest $request) : RedirectResponse
    {
        // get id from request
        $id = $request->id;
        // get user by id
        $user = User::find($id);
        // update user
        // if email isnt the same as the current email skip the email verification
        if ($request->email !== $user->email) {
            $user->update($request->validated());
        } else {
            $user->update($request->except('email'));
        }

        return back()->with([
            'status' => 'user-updated',
            'user' => $user->fresh(),
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

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id'
        ]);

        try {
            User::whereIn('id', $request->ids)->delete();

            return redirect()->back()->with('success', 'Users deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete users');
        }
    }
}
