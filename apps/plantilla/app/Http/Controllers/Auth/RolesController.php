<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    //
    public function index()
    {
        try {
            $roles = Role::all();
            return response()->json($roles);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener los roles',
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error al validar el rol',
                'errors' => $validator->errors(),
            ], 400);
        }

        try {

            $role = Role::create([
                'name' => $request->name,
                'guard_name' => 'api'
            ]);

            if ($request->filled('permissions')) {
                $role->syncPermissions($request->permissions);
            }

            return response()->json($role, 201);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear el rol',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $role = Role::find($id);
            $role->name = $request->name;
            $role->save();
            return response()->json($role);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el rol',
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $role = Role::find($id);
            $role->delete();
            return response()->json($role);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar el rol',
            ], 500);
        }
    }
}
