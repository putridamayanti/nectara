<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\LeaveTypeController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SettingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/database-test', function () {
    if (DB::connection()->getDatabaseName()) {
        return response()->json([
            'data'  => 'Database Connect Successfully ' . DB::connection()->getDatabaseName()
        ]);
    }

    return response()->json([
        'data'  => 'Database Connection Failed',
        'env'   => getenv('DB_HOST')
    ]);
});

Route::get('/install', [SettingController::class, 'install']);
Route::post('/initial-setting', [SettingController::class, 'store']);
Route::get('/', [AuthController::class, 'index'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware(['auth'])->prefix('app')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'dashboard']);
    Route::get('/profile', [AuthController::class, 'profile']);

    Route::resource('/announcement', AnnouncementController::class);
    Route::resource('/attendance', AttendanceController::class);
    Route::resource('/department', DepartmentController::class);
    Route::resource('/designation', DesignationController::class);
    Route::resource('/deposit', DepositController::class);
    Route::resource('/employee', EmployeeController::class);
    Route::resource('/expense', ExpenseController::class);
    Route::resource('/leave', LeaveController::class);
    Route::resource('/leave-type', LeaveTypeController::class);
    Route::resource('/permission', PermissionController::class);
    Route::resource('/role', RoleController::class);
    Route::resource('/user', UserController::class);
    Route::get('/report-attendance', [ReportController::class, 'report_attendance']);
    Route::get('/report-employee', [ReportController::class, 'report_employee']);
    Route::get('/report-finance', [ReportController::class, 'report_finance']);
    Route::resource('/setting', SettingController::class)->only('index', 'update');
});

