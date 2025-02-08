<?php

namespace Database\Helpers;

use Illuminate\Database\Schema\Blueprint;

class SchemaDefinitions
{
    public static function usersTable(Blueprint $table)
    {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->rememberToken();
        $table->boolean('is_admin')->default(false);
        $table->enum('status', ['inactive', 'active'])->default('active');
        $table->string('picture')->nullable();
        $table->text('bio')->nullable();
        $table->text('address')->nullable();
        $table->string('phone')->nullable();
        $table->timestamps();
    }

    public static function makesTable(Blueprint $table)
    {
        $table->id();
        $table->string('name')->unique();
        $table->string('description')->nullable();
        $table->timestamps();
    }

    public static function fuelsTable(Blueprint $table)
    {
        $table->id();
        $table->string('name')->unique();
        $table->string('description')->nullable();
        $table->timestamps();
    }

    public static function enginesTable(Blueprint $table)
    {
        $table->id();
        $table->string('name')->unique();
        $table->string('description')->nullable();
        $table->timestamps();
    }

    public static function carsTable(Blueprint $table)
    {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('make_id')->constrained('makes')->onDelete('cascade');
        $table->foreignId('fuel_id')->constrained('fuels')->onDelete('cascade');
        $table->foreignId('engine_id')->constrained('engines')->onDelete('cascade');

        $table->string('model');
        $table->integer('registration_year');
        $table->decimal('price', 10, 2);
        $table->integer('mileage');
        $table->string('picture')->nullable();
        $table->string('transmission')->nullable();
        $table->text('description')->nullable();

        $table->enum('car_status', ['available', 'sold'])->default('available');
        $table->enum('bid_status', ['open', 'close'])->default('open');
        $table->timestamps();
    }

    public static function bidsTable(Blueprint $table)
    {
        $table->id();
        $table->foreignId('car_id')->constrained('cars')->onDelete('cascade');
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->decimal('amount', 10, 2);
        $table->timestamps();
    }

    public static function testCarTable(Blueprint $table)
    {
        $table->id();
        $table->foreignId('car_id')->constrained('cars')->onDelete('cascade');
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->date('date');
        $table->enum('status', ['pending', 'approved', 'denied'])->default('pending');
        $table->timestamps();
    }

    public static function carAppointmentTable(Blueprint $table)
    {
        $table->id();
        $table->foreignId('car_id')->constrained('cars')->onDelete('cascade');
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->date('date');
        $table->enum('status', ['pending', 'approved', 'denied'])->default('pending');
        $table->timestamps();
    }

    public static function transactionsTable(Blueprint $table)
    {
        $table->id();
        $table->foreignId('car_id')->constrained('cars')->onDelete('cascade');
        $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
        $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
        $table->decimal('final_price', 10, 2);
        $table->date('transaction_date');
        $table->timestamps();
    }

    public static function transactionsNotiTable(Blueprint $table)
    {
        $table->id();
        $table->foreignId('car_id')->constrained('cars')->onDelete('cascade');
        $table->foreignId('buyer_id')->constrained('users')->onDelete('cascade');
        $table->foreignId('seller_id')->constrained('users')->onDelete('cascade');
        $table->foreignId('transaction_id')->constrained('transactions')->onDelete('cascade');
        $table->string('message', 255)->nullable();
        $table->enum('status', ['buy', 'cancel', 'loading'])->default('loading');
        $table->timestamps();
    }
}
