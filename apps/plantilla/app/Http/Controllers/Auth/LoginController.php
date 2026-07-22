<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if (! $token = auth('api')->attempt($credentials)) {
                return response()->json([
                    'message' => 'Credenciales incorrectas',
                ], 401);
            }

            $user = auth('api')->user();
            $user->unsetRelation('roles');
            $user->unsetRelation('permissions');

            return response()->json([
                'token' => $token,
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al loguearse',
            ], 500);
        }
    }

    public function logout(){
        try {
            auth('api')->logout();
            return response()->json([
                'message' => 'Usuario desconectado correctamente',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al desconectarse',
            ], 500);
        }
    }

    public function refresh()
    {
        try {
            $token = auth('api')->refresh();
            $user = auth('api')->user();
            $user->unsetRelation('roles');
            $user->unsetRelation('permissions');

            return response()->json([
                'token' => $token,
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al refrescar el token',
            ], 500);
        }
    }

    public function me()
    {
        try {
            $user = auth('api')->user();
            $user->unsetRelation('roles');
            $user->unsetRelation('permissions');

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener el usuario',
            ], 500);
        }
    }
}
