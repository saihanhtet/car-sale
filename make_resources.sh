#!/bin/bash

# Prompt for model name
read -p "Enter the model name (e.g., Product): " model

# Check if input is empty
if [ -z "$model" ]; then
    echo "Model name cannot be empty!"
    exit 1
fi

echo "Creating Laravel resource for $model..."

# Generate migration
# php artisan make:migration create_${model,,}s_table

# Generate model with migration, controller, and factory
php artisan make:model $model -cr

# Generate factory
php artisan make:factory ${model}Factory --model=$model

# Generate seeder
php artisan make:seeder ${model}Seeder

echo "Resource generation complete! 🎉"
echo "Now edit the migration file and run: php artisan migrate"

exit 0
